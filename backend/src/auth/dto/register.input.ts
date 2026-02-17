import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../users/models/user.model';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @Field(() => Role, { defaultValue: Role.STORE_KEEPER })
  @IsEnum(Role)
  role!: Role;
}
