import UserService from "./user.service";
import { Container } from 'typedi';

export default [
    /**
     * 회원가입
     */
    {
        path: '/user/signup',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                
                console.log('[User SignUp Controller Enter]');
                const UserServiceInstance = Container.get(UserService);
                const userInfo = req.body;
                const data = await UserServiceInstance.SignUp(userInfo);

                let message = '';
                switch (data.status) {
                    case 4091:
                        message = '회원가입 성공';
                        break;
                    case 4092:
                        message = '이메일 없음';
                        break;
                    case 4093:
                        message = '비밀번호 없음';
                        break;
                    case 4094:
                        message = '회원 존재';
                        break;
                    default:
                        message = '알 수 없는 오류 발생!';
                        break;
                }

                return res.status(200).json({
                    message,
                    ...data,
                });
            } catch (err) {
                return res.status(500).json({
                    message: err,
                })
            }
        }
    },

    /**
     * 로그인
     */
    {
        path: '/user/signin',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[User SignIn Controller Enter]');
                const UserServiceInstance = Container.get(UserService);
                const userInfo = req.body;
                const data = await UserServiceInstance.SignIn(userInfo);

                let message = '';
                switch (data.status) {
                    case 4091:
                        message = '로그인 성공';
                        break;
                    case 4092:
                        message = '회원이 존재하지 않음';
                        break;
                    case 4093:
                        message = '비밀번호 틀림';
                        break;
                    default:
                        message = '알 수 없는 오류 발생!';
                        break;
                }

                return res.status(200).json({
                    message,
                    ...data,
                });
            } catch (err) {
                return res.status(500).json({
                    message: err,
                })
            }
        }
    },
]