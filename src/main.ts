import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (envOrigins.includes(origin)) return callback(null, true);
      if (/^http:\/\/localhost:517\d$/.test(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  // Crear admin automático
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

    console.log(' Admin creado:', adminEmail);
  } else {
    console.log(' Admin ya existe');
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
