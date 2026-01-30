import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NutritionPlan } from '../nutrition-plans/schemas/nutrition-plan.schema';
import { Review } from '../reviews/schemas/review.schema';
import { HistoryLog } from '../history/schemas/history.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);
    const userRepo = dataSource.getRepository(User);
    const categoryRepo = dataSource.getRepository(Category);
    const productRepo = dataSource.getRepository(Product);
    const productsService = app.get(ProductsService);
    const nutritionPlanModel = app.get<Model<NutritionPlan>>(getModelToken(NutritionPlan.name));
    const reviewModel = app.get<Model<Review>>(getModelToken(Review.name));
    const historyModel = app.get<Model<HistoryLog>>(getModelToken(HistoryLog.name));

    const adminEmail = 'admin@nutrivida.local';
    const clientEmail = 'cliente@nutrivida.local';

    let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
    if (!adminUser) {
      const hashed = await bcrypt.hash('admin123', 10);
      adminUser = await userRepo.save(
        userRepo.create({
          nombre: 'Administrador',
          email: adminEmail,
          password: hashed,
          telefono: '1122334455',
          rol: 'admin',
        })
      );
    }

    let clientUser = await userRepo.findOne({ where: { email: clientEmail } });
    if (!clientUser) {
      const hashed = await bcrypt.hash('cliente123', 10);
      clientUser = await userRepo.save(
        userRepo.create({
          nombre: 'Cliente Demo',
          email: clientEmail,
          password: hashed,
          telefono: '1199887766',
          rol: 'cliente',
        })
      );
    }

    const categoryCount = await categoryRepo.count();
    if (categoryCount === 0) {
      const categories = [
        {
          nombre: 'Comida saludable',
          descripcion: 'Opciones nutritivas para tu dia a dia.',
          image_url:
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Planes para bajar de peso',
          descripcion: 'Planes guiados y balanceados para perder peso.',
          image_url:
            'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Nutricion deportiva',
          descripcion: 'Suplementos y energia para entrenar mejor.',
          image_url:
            'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Control de azucar',
          descripcion: 'Productos y planes para balancear glucosa.',
          image_url:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Digestión',
          descripcion: 'Opciones ligeras y faciles de digerir.',
          image_url:
            'https://images.unsplash.com/photo-1506086679525-9b114e1ca7dc?auto=format&fit=crop&w=1200&q=80',
        },
      ];
      await categoryRepo.save(categories);
    }

    const productCount = await productRepo.count();
    if (productCount === 0) {
      const categories = await categoryRepo.find();
      const categoryByName = new Map(categories.map((cat) => [cat.nombre, cat.id]));

      const products = [
        {
          nombre: 'Avena integral premium',
          descripcion: 'Avena rica en fibra para desayunos energizantes.',
          precio: 8.5,
          stock: 120,
          categoria_id: categoryByName.get('Comida saludable'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Granola sin azucar',
          descripcion: 'Granola natural con frutos secos y semillas.',
          precio: 10.9,
          stock: 90,
          categoria_id: categoryByName.get('Comida saludable'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Proteina vegetal',
          descripcion: 'Mezcla de proteinas vegetales para recuperacion.',
          precio: 28.0,
          stock: 60,
          categoria_id: categoryByName.get('Nutricion deportiva'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Te verde detox',
          descripcion: 'Infusion antioxidante para apoyo metabolico.',
          precio: 6.2,
          stock: 140,
          categoria_id: categoryByName.get('Control de azucar'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Semillas de chia',
          descripcion: 'Fuente natural de omega 3 y fibra.',
          precio: 7.4,
          stock: 180,
          categoria_id: categoryByName.get('Digestión'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Barritas proteicas',
          descripcion: 'Snack saludable con alto contenido proteico.',
          precio: 12.0,
          stock: 75,
          categoria_id: categoryByName.get('Nutricion deportiva'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Mix de frutos secos',
          descripcion: 'Almendras, nueces y arandanos sin azucar.',
          precio: 14.5,
          stock: 95,
          categoria_id: categoryByName.get('Comida saludable'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Pan integral artesanal',
          descripcion: 'Pan con granos enteros y bajo indice glucemico.',
          precio: 5.8,
          stock: 110,
          categoria_id: categoryByName.get('Planes para bajar de peso'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Yogur griego light',
          descripcion: 'Yogur alto en proteina y bajo en grasa.',
          precio: 4.2,
          stock: 130,
          categoria_id: categoryByName.get('Planes para bajar de peso'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
        },
        {
          nombre: 'Batido verde',
          descripcion: 'Smoothie con espinaca, manzana y jengibre.',
          precio: 9.3,
          stock: 80,
          categoria_id: categoryByName.get('Digestión'),
          activo: true,
          image_url:
            'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80',
        },
      ];

      for (const product of products) {
        if (!product.categoria_id) continue;
        await productsService.create(product as any);
      }
    }

    const nutritionPlanCount = await nutritionPlanModel.countDocuments();
    if (nutritionPlanCount === 0) {
      await nutritionPlanModel.insertMany([
        {
          userId: clientUser.id,
          objetivo: 'Plan perdida de peso',
          calorias_diarias: 1600,
          recomendaciones: ['Hidratacion constante', 'Reducir azucares refinados'],
          imageUrl:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        },
        {
          userId: clientUser.id,
          objetivo: 'Plan hipertrofia',
          calorias_diarias: 2400,
          recomendaciones: ['Proteina en cada comida', 'Descanso adecuado'],
          imageUrl:
            'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80',
        },
        {
          userId: clientUser.id,
          objetivo: 'Plan control diabeticos',
          calorias_diarias: 1800,
          recomendaciones: ['Control de porciones', 'Fibra diaria'],
          imageUrl:
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        },
      ]);
    }

    const reviewCount = await reviewModel.countDocuments();
    if (reviewCount === 0) {
      const products = await productRepo.find();
      if (products.length > 0) {
        await reviewModel.insertMany([
          {
            productId: products[0].id,
            userId: clientUser.id,
            rating: 5,
            comentario: 'Excelente calidad y sabor, recomendado.',
          },
          {
            productId: products[1]?.id ?? products[0].id,
            userId: clientUser.id,
            rating: 4,
            comentario: 'Buen producto, entrega rapida.',
          },
          {
            productId: products[2]?.id ?? products[0].id,
            userId: clientUser.id,
            rating: 5,
            comentario: 'Ideal para complementar el plan nutricional.',
          },
        ]);
      }
    }

    const appointmentCount = await historyModel.countDocuments({ tipo: 'appointment' });
    if (appointmentCount === 0) {
      await historyModel.insertMany([
        {
          userId: clientUser.id,
          tipo: 'appointment',
          cita_fecha: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          motivo: 'Consulta inicial de habitos alimenticios',
          estado: 'pendiente',
          especialista: 'Lic. Paula Rivas',
        },
        {
          userId: clientUser.id,
          tipo: 'appointment',
          cita_fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          motivo: 'Seguimiento plan nutricional',
          estado: 'confirmada',
          especialista: 'Lic. Gonzalo Perez',
        },
      ]);
    }
  } finally {
    await app.close();
  }
}

seed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seed completado');
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Seed fallido', err);
    process.exit(1);
  });
