/* 예제 회원가입 및 로그인 controller 파일 */
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
                // 콘솔 메시지를 이용하여 개발자에게 어떤 컨트롤러로 진입했는지 알려준다
                // (에러 발생 시 마지막 접근 API를 알기 위함)
                console.log('[User SignUp Controller Enter]');
                const UserServiceInstance = Container.get(UserService);
                const userInfo = req.body;
                const data = await UserServiceInstance.SignUp(userInfo);

                /**
                 * 4091: 회원가입 성공
                 * 4092: 이메일 없음
                 * 4093: 비밀번호 없음
                 * 4094: 회원 존재
                 */
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

                /*
                    결과에 따른 메시지를 같이 보내 프론트에서 어떤 에러가 났는지 확실하게 알 수 있게 해준다.
                    아래와 같이 응답을 보내면 프론트에선 다음과 같은 데이터를 전달받는다. (회원가입 성공 했다고 가정)
                    {
                        message: '회원가입 성공',
                        status: 4091,
                        data: {
                            email: '1234',
                            pw: '1234
                        }
                    }
                */
                return res.status(200).json({
                    message,
                    ...data,
                });
            } catch (err) {
                // 에러가 났을 경우를 대비하여 try-catch문을 이용하여 확실하게 에러 처리를 한다.
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

                /**
                 * 4091: 로그인 성공
                 * 4092: 회원이 존재하지 않음
                 * 4093: 비밀번호 틀림
                 */
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