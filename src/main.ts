import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
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
