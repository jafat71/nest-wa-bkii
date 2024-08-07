import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get("/deleted")
  findAllDeleted() {
    return this.productsService.findAllDeleted();
  }

  @Get("/tags")
  findAllTags() {
    return this.productsService.findAllTags();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
      await this.productsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<void> {
      await this.productsService.restore(id);
  }
}
