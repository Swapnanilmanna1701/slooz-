import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsNumber, Min, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  category!: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price!: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  quantity!: number;

  @Field({ defaultValue: 'pcs' })
  @IsOptional()
  @IsString()
  unit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
