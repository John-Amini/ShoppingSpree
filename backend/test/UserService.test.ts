import {UserRepository} from '../users/UserRepository'
import { UserService } from '../users/UserService';
import { expect } from 'chai'

describe('User Flow',() => {
    let userService : UserService;

    before(() => {
        const userRepo = new UserRepository();
        userService = new UserService(userRepo);
    })

    const signupRandomUser = async () => {
        const username = Math.random().toString()
        const email = `${Math.random().toString()}@domain.com`;
        const user = await userService.signup(username.toString(), email, "helloworld");

        return { username, email, password: 'helloworld', createdUser: user };
    }

    it('should allow users to signup', async () => {

        const { username, email, password, createdUser } = await signupRandomUser();

        expect(createdUser.username).to.be.eq(username);
        expect(createdUser.email).to.be.eq(email);
    })

    it('should allow users to login', async () => {

        const { username, email, password } = await signupRandomUser();

        const signup = await userService.login(username.toString(), password);

        expect(signup?.username).to.be.eq(username);
        expect(signup?.email).to.be.eq(email);
    })
})
