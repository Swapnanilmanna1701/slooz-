import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './models/auth.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserModel } from '../users/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthPayload> {
    const result = await this.authService.register(registerInput);
    return {
      accessToken: result.accessToken,
      user: {
        ...result.user,
        role: result.user.role as unknown as import('../users/models/user.model').Role,
      },
    };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    const result = await this.authService.login(loginInput);
    return {
      accessToken: result.accessToken,
      user: {
        ...result.user,
        role: result.user.role as unknown as import('../users/models/user.model').Role,
      },
    };
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: UserModel): UserModel {
    return user;
  }
}
