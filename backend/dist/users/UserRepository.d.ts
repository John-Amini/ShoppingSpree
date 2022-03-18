import { User, UserWithoutPassword } from "./types";
export declare class UserRepository {
    UserConn: any;
    constructor();
    findByPk(id: number): any;
    findByUsernameOrEmail(credential: string): Promise<User>;
    create(username: string, email: string, password: string): Promise<UserWithoutPassword>;
}
//# sourceMappingURL=UserRepository.d.ts.map