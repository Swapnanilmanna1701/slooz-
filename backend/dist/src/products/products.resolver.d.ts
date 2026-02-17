import { ProductsService } from './products.service';
import { ProductModel } from './models/product.model';
import { DashboardStats } from './models/dashboard-stats.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    products(): Promise<ProductModel[]>;
    product(id: string): Promise<ProductModel>;
    dashboardStats(): Promise<DashboardStats>;
    createProduct(input: CreateProductInput): Promise<ProductModel>;
    updateProduct(input: UpdateProductInput): Promise<ProductModel>;
    deleteProduct(id: string): Promise<ProductModel>;
}
