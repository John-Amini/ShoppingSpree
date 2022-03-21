import autoBind from 'auto-bind'
import { UserRepository } from "./UserRepository";
import bcrypt from "bcryptjs";
import { LayoutService } from '../layouts/LayoutService';
import { LayoutRepository } from '../layouts/LayoutRepository';

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
        let layoutService = new LayoutService(new LayoutRepository);
        let user = await this.userRepo.create(username, email, password);
        let layout = await layoutService.makeDefault(user.id)
        return user
    }
}
