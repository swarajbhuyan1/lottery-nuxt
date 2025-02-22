import type { H3Event  } from 'h3'
import axiosWrapper from '~/utils/axios';
// import type {User, Login} from '~/types'
import axios from 'axios';
import { getQuery } from 'h3';
import {Register} from "~/types/register";
export const getData = async (event: H3Event) => {
    try {
        const axiosWrapper = event.context.axios;

        const query = getQuery(event);
        const response = await axiosWrapper.get('/admin/slot-categories',{
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

export const postRecord = async (event : H3Event) => {
    const bodyData = await readBody(event)
    try {
        const axiosWrapper = event.context.axios;
        const response = await axiosWrapper.post('/admin/slot-categories', bodyData);

        return {
            ...response.data
        }
    } catch (error) {
        console.log(error)
        return {
            message : 'error',error

        }
    }
}
export default {
    getData,
    postRecord
}