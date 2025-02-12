import {postLogin, getLogout, postRegister, postVerifyOtp} from '../controllers/auth.controller'

type HttpMethod = 'get' | 'post' | 'put' | 'delete';
interface RouteElement {
    method: HttpMethod;
    url: string;
    handler: any;
    middleware: Array<any>;
}

export const routes:RouteElement[] = [
    {
        method: 'post',
        url : '/login',
        middleware : [],
        handler: postLogin
    },
    {
        method: 'post',
        url : '/register',
        middleware : [],
        handler: postRegister
    },
    {
        method: 'post',
        url : '/verify-otp',
        middleware : [],
        handler: postVerifyOtp
    },
    {
        method: 'get',
        url : '/logout',
        middleware : [],
        handler: getLogout
    },

]

export default routes;