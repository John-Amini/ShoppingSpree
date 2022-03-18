import { UserRepository } from "./UserRepository";
export declare class UserService {
    private userRepo;
    constructor(userRepo: UserRepository);
    login(credential: string, password: string): Promise<any>;
    signup(username: string, email: string, password: string): Promise<import("./types").UserWithoutPassword>;
}
//# sourceMappingURL=UserService.d.ts.map