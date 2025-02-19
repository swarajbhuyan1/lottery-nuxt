import {postLogin, getLogout, postRegister, postVerifyOtp} from '../controllers/auth.controller'

import {
    getData as getAllUser
} from '../controllers/user.controller'

import {
    getData as getAllSlotCategory,
    postRecord as postSlotCategory
} from '../controllers/slot-category.controller'


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
    {
        method: 'get',
        url : '/users',
        middleware : [],
        handler: getAllUser
    },

    {
        method: 'get',
        url : '/admin/slot-categories',
        middleware : [],
        handler: getAllSlotCategory
    },
    {
        method: 'post',
        url : '/admin/slot-categories',
        middleware : [],
        handler: postSlotCategory
    },

]

export default routes;