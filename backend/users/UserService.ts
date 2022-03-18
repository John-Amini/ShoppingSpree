import autoBind from 'auto-bind'
import { UserRepository } from "./UserRepository";
import bcrypt from "bcryptjs";

export class UserService {
    constructor(private userRepo : UserRepository){
        autoBind(this);
    }

    public async login(credential:string, password: string){
        const user = await this.userRepo.findByUsernameOrEmail(credential);

        if (user && bcrypt.compareSync(password, user.hashedPassword.toString())) {
            return this.userRepo.findByPk(user.id);
        } else return null
    }

    public async signup(username: string, email: string, password: string) {
        return await this.userRepo.create(username, email, password);
    }
}
