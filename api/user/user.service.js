import { Service, Inject } from 'typedi';

export default class UserService {
    constructor() {}

    async SignUp() {
        return {
            data: '"/user/signup get 요청 들어 옴"'
        };
    }
}