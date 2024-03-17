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
                const UserServiceInstance = Container.get(UserService);
                const data = await UserServiceInstance.SignUp();

                return res.status(200).json(data);
            } catch (err) {
                return res.status(500).json({
                    data: 'error!'
                })
            }
        }
    },

    /**
     * 회원가입
     */
    {
        path: '/user/signin',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                const UserServiceInstance = Container.get(UserService);
                const data = await UserServiceInstance.SignIn();

                return res.status(200).json(data);
            } catch (err) {
                return res.status(500).json({
                    data: 'error!'
                })
            }
        }
    },
]