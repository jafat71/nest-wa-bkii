import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-img.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    CommonModule
  ],
  exports: [
    ProductsService,
    TypeOrmModule
  ]
})
export class ProductsModule {}
