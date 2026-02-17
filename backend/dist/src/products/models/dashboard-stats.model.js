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
exports.DashboardStats = exports.CategoryStat = void 0;
const graphql_1 = require("@nestjs/graphql");
let CategoryStat = class CategoryStat {
    category;
    count;
    totalValue;
};
exports.CategoryStat = CategoryStat;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CategoryStat.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CategoryStat.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CategoryStat.prototype, "totalValue", void 0);
exports.CategoryStat = CategoryStat = __decorate([
    (0, graphql_1.ObjectType)()
], CategoryStat);
let DashboardStats = class DashboardStats {
    totalProducts;
    totalQuantity;
    totalInventoryValue;
    lowStockCount;
    categoriesCount;
    categoryBreakdown;
};
exports.DashboardStats = DashboardStats;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalProducts", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalQuantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalInventoryValue", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStats.prototype, "lowStockCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStats.prototype, "categoriesCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CategoryStat]),
    __metadata("design:type", Array)
], DashboardStats.prototype, "categoryBreakdown", void 0);
exports.DashboardStats = DashboardStats = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardStats);
//# sourceMappingURL=dashboard-stats.model.js.map