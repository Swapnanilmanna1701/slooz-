"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async create(input) {
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
    async update(input) {
        const { id, ...data } = input;
        const existing = await this.prisma.product.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const updateData = {};
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
    async delete(id) {
        const existing = await this.prisma.product.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.prisma.product.delete({ where: { id } });
    }
    async getDashboardStats() {
        const products = await this.prisma.product.findMany();
        const totalProducts = products.length;
        const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
        const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
        const lowStockCount = products.filter((p) => p.quantity < 10).length;
        const categoryMap = new Map();
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
        const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, stats]) => ({
            category,
            count: stats.count,
            totalValue: stats.totalValue,
        }));
        return {
            totalProducts,
            totalQuantity,
            totalInventoryValue,
            lowStockCount,
            categoriesCount: categoryMap.size,
            categoryBreakdown,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map