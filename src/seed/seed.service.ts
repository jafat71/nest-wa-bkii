import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ){}

  async runSeed() {
    await this.insertNewProducts()
    return `SEED EXEC`;
  }

  private async insertNewProducts(){
    await this.productService.deleteAllProducts();

    const seedProducts = initialData.products

    const insertPromise = []

    seedProducts.forEach(product => {
      insertPromise.push(this.productService.create(product))
    });

    await Promise.all(insertPromise)

    return true;
  }

}
