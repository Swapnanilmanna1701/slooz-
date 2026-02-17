import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String)
  sku!: string;

  @Field(() => String)
  category!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  quantity!: number;

  @Field(() => String)
  unit!: string;

  @Field(() => String, { nullable: true })
  imageUrl!: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
