import { Service, Inject } from 'typedi';
import models from '../../models';

export default class UserService {
    constructor() { }

    async SignUp() {
        try {
            const testUser = await models.user.findOne({
                where: {
                    id: 1,
                }
            });

            if (!testUser) {
                await models.user.create({
                    email: 'test',
                    pw: 'test'
                });

                return '회원가입 성공';
            }

            return '회원 존재';
        } catch (err) {
            throw err;
        }
    }

    async SignIn() {
        return await models.user.findOne({
            where: {
                email: 'test'
            }
        });
    }
}