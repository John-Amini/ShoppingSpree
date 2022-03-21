import db from "../db/models";
import bcrypt from "bcryptjs";
import { User, UserWithoutPassword } from "./types";

export class UserRepository {

    UserConn = db.User;
    constructor() {
    }

    public findByPk(id: number) : Promise<UserWithoutPassword> {
        return this.UserConn.scope('currentUser').findByPk(id);
    }

    public async findByUsernameOrEmail(credential: string): Promise<User> {
        const { Op } = require('sequelize');
        const user = await this.UserConn.scope('loginUser').findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential,
                },
            },
        });

        return user
    }

    public async create(username:string, email:string, password: string): Promise<UserWithoutPassword>{
      const hashedPassword = bcrypt.hashSync(password);
      const user = await this.UserConn.create({
        username,
        email,
        hashedPassword,
      });

        return await this.UserConn.scope('currentUser').findByPk(user.id)
    }
}
