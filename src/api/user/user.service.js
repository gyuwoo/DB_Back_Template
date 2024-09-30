import { Service, Inject } from 'typedi';
import models from '../../models';

export default class UserService {
    constructor() { }

    /**
     * 회원가입
     */
    async SignUp(userInfo) {
        try {
            const returnData = {
                status: 4095,
                data: null,
            };

            
            const { email, pw } = userInfo;

            if (!email) {
                returnData.status = 4092;
                return returnData;
            }

            if (!pw) {
                returnData.status = 4093;
                return returnData;
            }

            const testUser = await models.user.findOne({
                where: {
                    email: email,
                }
            });

            if (!testUser) {
                const user = await models.user.create({
                    email: email,
                    pw: pw
                });

                // 회원가입 성공
                returnData.status = 4091;

                returnData.data = user;
                return returnData;
            }

            returnData.status = 4094;
            return returnData;
        } catch (err) {
            console.log('[User] SignUp Service Error!' + err);
            throw err;
        }
    }

    /**
     * 로그인
     */
    async SignIn(userInfo) {
        try {
            const returnData = {
                status: 4095,
                data: null,
            };

            const { email, pw } = userInfo;

            const user = await models.user.findOne({
                where: {
                    email,
                }
            });

            if (!user) {
                returnData.status = 4092;
                return returnData;
            }

            if (user.pw != pw) {
                returnData.status = 4093;
                return returnData;
            }

            returnData.status = 4091;
            returnData.data = user;

            return returnData;
        } catch (err) {
            console.log('[User] SignIn Service Error!' + err);
            throw err;
        }
    }
}