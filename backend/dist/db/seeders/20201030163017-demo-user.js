'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'demo@user.io',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password'),
            },
            {
                email: faker.internet.email(),
                username: 'FakeUser1',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'FakeUser2',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users', {
            username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
        }, {});
    })
};
//# sourceMappingURL=20201030163017-demo-user.js.map