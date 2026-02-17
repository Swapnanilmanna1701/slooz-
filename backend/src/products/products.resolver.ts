import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductModel } from './models/product.model';
import { DashboardStats } from './models/dashboard-stats.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/models/user.model';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductModel])
  @UseGuards(JwtAuthGuard)
  async products(): Promise<ProductModel[]> {
    return this.productsService.findAll();
  }

  @Query(() => ProductModel)
  @UseGuards(JwtAuthGuard)
  async product(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductModel> {
    return this.productsService.findOne(id);
  }

  @Query(() => DashboardStats)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  async dashboardStats(): Promise<DashboardStats> {
    return this.productsService.getDashboardStats();
  }

  @Mutation(() => ProductModel)
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductModel> {
    return this.productsService.create(input);
  }

  @Mutation(() => ProductModel)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductModel> {
    return this.productsService.update(input);
  }

  @Mutation(() => ProductModel)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  async deleteProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductModel> {
    return this.productsService.delete(id);
  }
}
