import {postLogin, getLogout} from '../controllers/auth.controller'

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
        method: 'get',
        url : '/logout',
        middleware : [],
        handler: getLogout
    },

]

export default routes;