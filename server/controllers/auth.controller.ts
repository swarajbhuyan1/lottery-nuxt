import type { H3Event  } from 'h3'
import axiosWrapper from '~/utils/axios';
// import type {User, Login} from '~/types'
import axios from 'axios';
import {Login} from "~/types/login";
import {User} from "~/types/user";
import {Register} from "~/types/register";

export const postLogin = async (event : H3Event) => {
    const bodyData : Login = await readBody(event)
    try {

        const response = await axiosWrapper.post('/login', bodyData);
        if (response && response.status === 200) {

            const user = response.data?.user as User
            const token = response.data?.token
            await setUserSession(event, {
                user : {
                    ...user,
                    token : token,
                },
                loggedInAt: new Date(),
            })
        }
        return {
            ...response.data
        }
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setResponseStatus(event, error.response.status, error.response.data.message);
            return {
                error: "Error",
                message: error.response.data.message,
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

export const postRegister = async (event : H3Event) => {
    const bodyData : Register = await readBody(event)
    try {
        const response = await axiosWrapper.post('/register', bodyData);
        return {
            ...response.data
        }
    }
    catch (error) {
        console.log(error)
        return {
            message : 'error',error

        }
    }
}

export const postVerifyOtp = async (event : H3Event) => {
    const bodyData : Register = await readBody(event)
    try {
        const response = await axiosWrapper.post('/verify-otp', bodyData);
        if (response && response.status === 200) {

            const user = response.data?.user as User
            const token = response.data?.token
            await setUserSession(event, {
                user : {
                    ...user,
                    token : token,
                },
                loggedInAt: new Date(),
            })
        }
        return {
            ...response.data
        }
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setResponseStatus(event, error.response.status, error.response.data.message);
            return {
                error: "Error",
                message: error.response.data.message,
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

export const getUserData = async (event : H3Event) => {
    return await getUserSession(event)
}

export const setUserData = async (event: H3Event) => {
    try {
        const body = await readBody(event);
        const location = body.location as object;
        const location_name = body.location.name as string;

        const currentSession = await getUserSession(event);

        await replaceUserSession(event,
            {
                user: {
                    ...currentSession.user,
                    location: location,
                    location_name : location_name
                },
                loggedInAt: new Date(),
            })

        const updatedSession = await getUserSession(event);

        return {
            success: true,
            message: 'User session updated with location',
            session: updatedSession,
        };

    } catch (error) {
        return {
            success: false,
            message: 'Error updating user session',
        };
    }
};

export const getLogout = async (event : H3Event) => {
    await clearUserSession(event)
    return {
        message : "Successfull logged out"
    }
}

export default {
    postLogin,
    postRegister,
    postVerifyOtp,
    getUserData,
    getLogout,
    setUserData
}