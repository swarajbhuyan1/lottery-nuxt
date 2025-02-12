import routes from '../n-routes';

const router = createRouter();

router.get('/', defineEventHandler(async () => {
    return {
        message: 'Hello World'
    };
}));

routes.forEach(element => {
    (router as any)[element.method](element.url, defineEventHandler(element.handler));
});
export default useBase("/api", router.handler);