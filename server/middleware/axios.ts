import axiosWrapper from '~/utils/axios';
export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event);
    const token : string = user?.token;
    const axiosInstance = axiosWrapper.createAxiosInstance(token);
    event.context.axios = axiosInstance;
});