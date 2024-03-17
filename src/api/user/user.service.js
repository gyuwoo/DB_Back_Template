/* 예제 회원가입 및 로그인 service 파일 */
import { Service, Inject } from 'typedi';
import models from '../../models';

export default class UserService {
    constructor() { }

    /**
     * 회원가입
     */
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

    /**
     * 로그인
     */
    async SignIn() {
        return await models.user.findOne({
            where: {
                email: 'test'
            }
        });
    }
}