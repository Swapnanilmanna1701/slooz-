import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsNumber, Min, IsString } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  @IsNotEmpty()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  unit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
