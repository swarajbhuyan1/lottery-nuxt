import routes from '../n-routes';
export default defineEventHandler(async (event) => {
    const middlewareName = 'auth';
    const url = getRequestURL(event);
    const { pathname } = new URL(url);
    const authenticatedRoutes = routes.filter((r) => r.middleware.includes(middlewareName),[]).map((r) => `/api/${r.url}`);
    // console.log("pathname", authenticatedRoutes);
    if(authenticatedRoutes.length > 0){
        // console.log("pathnamex", authenticatedRoutes);
        const protectedRoutes = authenticatedRoutes;
        for (let i = 0; i < protectedRoutes.length; i++) {
            const r = protectedRoutes[i];
            if (pathname === r) {
                await requireUserSession(event);
            }
        }
    }

});
