import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './models/auth.model';
import { UserModel } from '../users/models/user.model';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(registerInput: RegisterInput): Promise<AuthPayload>;
    login(loginInput: LoginInput): Promise<AuthPayload>;
    me(user: UserModel): UserModel;
}
