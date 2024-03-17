import { Service, Inject } from 'typedi';
import models from '../../models';

export default class TestService {
    constructor() { }

    async Test() {
        return {
            data: '백엔드 요청'
        }
    }
}