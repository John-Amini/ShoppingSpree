import supertest from 'supertest'
import {SuperTest, Test} from 'supertest'
import { expect } from 'chai'
import app from '../app'

describe('User Endpoint',() => {
    let request: SuperTest<Test>

    before(() => {
        request = supertest(app);
    })

    const username = Math.random().toString()
    const email = `${Math.random().toString()}@domain.com`;

    it('should allow users to signup', async () => {
        const res =
            await request
                .post("/api/users")
                .send({
                    username: username,
                    email: email,
                    password: "something",
                });

        expect(res.body.user.username).to.be.eq(username);
        expect(res.body.user.email).to.be.eq(email);

    })

    it('should allow users to login - username', async () => {

        const res =
            await request
                .post("/api/session")
                .send({
                    credential: username,
                    password: "something",
                });

        expect(res.body.user.username).to.be.eq(username);
        expect(res.body.user.email).to.be.eq(email);
        
    })

    it('should allow users to login - email', async () => {

        const res =
            await request
                .post("/api/session")
                .send({
                    credential: email,
                    password: "something",
                });

        expect(res.body.user.username).to.be.eq(username);
        expect(res.body.user.email).to.be.eq(email);

    })
})
