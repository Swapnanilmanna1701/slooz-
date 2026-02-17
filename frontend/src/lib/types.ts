export enum Role {
  MANAGER = 'MANAGER',
  STORE_KEEPER = 'STORE_KEEPER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  accessToken: string;
  user: User;
}

export interface CategoryStat {
  category: string;
  count: number;
  totalValue: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalQuantity: number;
  totalInventoryValue: number;
  lowStockCount: number;
  categoriesCount: number;
  categoryBreakdown: CategoryStat[];
}
