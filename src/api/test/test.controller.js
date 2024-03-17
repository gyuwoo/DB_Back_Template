import TestService from "./test.service";
import { Container } from 'typedi';

export default [
    /**
     * 회원가입
     */
    {
        path: '/test',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                const TestServiceInstance = Container.get(TestService);
                const data = await TestServiceInstance.Test();

                return res.status(200).json(data);
            } catch (err) {
                return res.status(500).json({
                    data: 'error!'
                })
            }
        }
    },
]