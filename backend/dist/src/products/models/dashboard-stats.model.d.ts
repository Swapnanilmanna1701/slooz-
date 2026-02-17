export declare class CategoryStat {
    category: string;
    count: number;
    totalValue: number;
}
export declare class DashboardStats {
    totalProducts: number;
    totalQuantity: number;
    totalInventoryValue: number;
    lowStockCount: number;
    categoriesCount: number;
    categoryBreakdown: CategoryStat[];
}
