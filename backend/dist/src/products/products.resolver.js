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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const product_model_1 = require("./models/product.model");
const dashboard_stats_model_1 = require("./models/dashboard-stats.model");
const create_product_input_1 = require("./dto/create-product.input");
const update_product_input_1 = require("./dto/update-product.input");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_model_1 = require("../users/models/user.model");
let ProductsResolver = class ProductsResolver {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async products() {
        return this.productsService.findAll();
    }
    async product(id) {
        return this.productsService.findOne(id);
    }
    async dashboardStats() {
        return this.productsService.getDashboardStats();
    }
    async createProduct(input) {
        return this.productsService.create(input);
    }
    async updateProduct(input) {
        return this.productsService.update(input);
    }
    async deleteProduct(id) {
        return this.productsService.delete(id);
    }
};
exports.ProductsResolver = ProductsResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.ProductModel]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)(() => product_model_1.ProductModel),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Query)(() => dashboard_stats_model_1.DashboardStats),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.Role.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "dashboardStats", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.ProductModel),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.ProductModel),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.ProductModel),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.Role.MANAGER),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "deleteProduct", null);
exports.ProductsResolver = ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_model_1.ProductModel),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
//# sourceMappingURL=products.resolver.js.map