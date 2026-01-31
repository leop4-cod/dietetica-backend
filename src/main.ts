import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================
  // ✅ CORS CONFIG
  // ============================

  const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean)
    : [];

  const extraAllowed = [
    'https://nutrivida.desarrollo-software.xyz',
    'https://www.nutrivida.desarrollo-software.xyz',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // ENV
      if (envOrigins.includes(origin)) return callback(null, true);

      // Producción
      if (extraAllowed.includes(origin)) return callback(null, true);

      // Local dev
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ============================
  // ✅ AUTO ADMIN
  // ============================

  const dataSource = app.get(DataSource);
  const userRepo = dataSource.getRepository('User');

  const adminEmail = 'admin@dietetica.com';
  const adminPassword = 'Admin123*';
  const adminName = 'Administrador';

  const adminExists = await userRepo.findOne({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    const hash = await bcrypt.hash(adminPassword, 10);

    await userRepo.save({
      nombre: adminName,
      email: adminEmail,
      password: hash,
      rol: 'admin',
    });

    console.log('✅ Admin creado:', adminEmail);
  } else {
    console.log('ℹ️ Admin ya existe');
  }

  // ============================
  // ✅ START SERVER
  // ============================

  const port = process.env.PORT ?? 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 API running on port ${port}`);
}

bootstrap();
