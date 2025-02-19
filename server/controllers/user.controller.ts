import type { H3Event  } from 'h3'
import axiosWrapper from '~/utils/axios';
// import type {User, Login} from '~/types'
import axios from 'axios';
import { getQuery } from 'h3';
export const getData = async (event: H3Event) => {
    try {
        const axiosWrapper = event.context.axios;

        const query = getQuery(event);
        const response = await axiosWrapper.get('/admin/users',{
            params : query
        });
        console.log(response);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setResponseStatus(event, error.response.status, error.response.data.message);
            return {
                error: "Error",
                message: error.response.data.error,
                status: error.response.status
            };

        } else {
            setResponseStatus(event, 500, "Unexpected error");
            return {
                error: "Unexpected error",
                message: "Something went wrong. Please try again later.",
                status: 500,
            };
        }
    }

}
export default {
    getData,
}