/* 예제 회원가입 및 로그인 service 파일 */
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

            // 구조 분해 할당을 이용하여 원하는 변수만 추출하여 사용할 수 있다.
            const { email, pw } = userInfo;

            // 프론트에서 값이 제대로 넘어오지 않을 수 있기 때문에 이에 관한
            // 에러 처리를 해준다.
            if (!email) {
                // 임이의 값을 정하여 에러 결과를 반환한다.
                returnData.status = 4092;
                return returnData;
            }

            if (!pw) {
                returnData.status = 4093;
                return returnData;
            }

            const testUser = await models.user.findOne({
                where: {
                    // 키 값과 변수 명이 같으므로 아래와 같이 콜론 없이도 사용할 수 있다.
                    // email
                    email: email,
                }
            });

            if (!testUser) {
                const user = await models.user.create({
                    email: email,
                    pw: pw
                });

                returnData.status = 4091;
                returnData.data = user;
                return returnData;
            }

            returnData.status = 4094;
            return returnData;
        } catch (err) {
            // 콘솔 메시지를 이용하여 개발자에게 어디에서 오류가 났는지 알려준다
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
                    // 변수 명과 키 값이 같기 때문에 email: email을 아래와 같이 간단하게 작성 가능하다.
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