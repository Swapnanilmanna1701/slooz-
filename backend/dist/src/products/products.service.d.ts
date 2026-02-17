import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        sku: string;
        category: string;
        price: number;
        quantity: number;
        unit: string;
        imageUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        sku: string;
        category: string;
        price: number;
        quantity: number;
        unit: string;
        imageUrl: string | null;
    }>;
    create(input: CreateProductInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        sku: string;
        category: string;
        price: number;
        quantity: number;
        unit: string;
        imageUrl: string | null;
    }>;
    update(input: UpdateProductInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        sku: string;
        category: string;
        price: number;
        quantity: number;
        unit: string;
        imageUrl: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        sku: string;
        category: string;
        price: number;
        quantity: number;
        unit: string;
        imageUrl: string | null;
    }>;
    getDashboardStats(): Promise<{
        totalProducts: number;
        totalQuantity: number;
        totalInventoryValue: number;
        lowStockCount: number;
        categoriesCount: number;
        categoryBreakdown: {
            category: string;
            count: number;
            totalValue: number;
        }[];
    }>;
}
