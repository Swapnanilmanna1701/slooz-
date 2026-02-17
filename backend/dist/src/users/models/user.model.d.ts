export declare enum Role {
    MANAGER = "MANAGER",
    STORE_KEEPER = "STORE_KEEPER"
}
export declare class UserModel {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
