import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(input: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        sku: input.sku,
        category: input.category,
        price: input.price,
        quantity: input.quantity,
        unit: input.unit || 'pcs',
        imageUrl: input.imageUrl,
      },
    });
  }

  async update(input: UpdateProductInput) {
    const { id, ...data } = input;

    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Filter out undefined values
    const updateData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.delete({ where: { id } });
  }

  async getDashboardStats() {
    const products = await this.prisma.product.findMany();

    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalInventoryValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );
    const lowStockCount = products.filter((p) => p.quantity < 10).length;

    const categoryMap = new Map<
      string,
      { count: number; totalValue: number }
    >();
    for (const product of products) {
      const existing = categoryMap.get(product.category) || {
        count: 0,
        totalValue: 0,
      };
      categoryMap.set(product.category, {
        count: existing.count + 1,
        totalValue: existing.totalValue + product.price * product.quantity,
      });
    }

    const categoryBreakdown = Array.from(categoryMap.entries()).map(
      ([category, stats]) => ({
        category,
        count: stats.count,
        totalValue: stats.totalValue,
      }),
    );

    return {
      totalProducts,
      totalQuantity,
      totalInventoryValue,
      lowStockCount,
      categoriesCount: categoryMap.size,
      categoryBreakdown,
    };
  }
}
