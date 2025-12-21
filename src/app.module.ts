import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// RolesModule is removed from logic but if folder exists keeping it clean is better. 
// However, I removed the entity so I should remove the module too or just not import it.
// I will keep it in imports if it exists to avoid breaking others, but user wanted cleanup. 
// I will assumption remove RolesModule from imports here.
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';
import { AuthLogsModule } from './auth-logs/auth-logs.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NutritionPlansModule } from './nutrition-plans/nutrition-plans.module';
import { InventoryModule } from './inventory/inventory.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AddressesModule } from './addresses/addresses.module';
import { CouponsModule } from './coupons/coupons.module';
import { CartModule } from './cart/cart.module';
import { HistoryModule } from './history/history.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/dietetica_db',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    SalesModule,
    SaleDetailsModule,
    AuthLogsModule,
    ReviewsModule,
    NutritionPlansModule,
    InventoryModule,
    SuppliersModule,
    AddressesModule,
    CouponsModule,
    CartModule,
    HistoryModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

