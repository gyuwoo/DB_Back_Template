import { Service, Inject } from 'typedi';

export default class UserService {
    constructor() {}

    async SignUp() {
        return {
            data: 'SignUp'
        };
    }
}