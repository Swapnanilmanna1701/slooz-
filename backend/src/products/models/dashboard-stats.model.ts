import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class CategoryStat {
  @Field()
  category!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalValue!: number;
}

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalProducts!: number;

  @Field(() => Int)
  totalQuantity!: number;

  @Field(() => Float)
  totalInventoryValue!: number;

  @Field(() => Int)
  lowStockCount!: number;

  @Field(() => Int)
  categoriesCount!: number;

  @Field(() => [CategoryStat])
  categoryBreakdown!: CategoryStat[];
}
