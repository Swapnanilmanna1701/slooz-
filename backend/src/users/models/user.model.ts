import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum Role {
  MANAGER = 'MANAGER',
  STORE_KEEPER = 'STORE_KEEPER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles for access control',
});

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  name!: string;

  @Field(() => Role)
  role!: Role;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
