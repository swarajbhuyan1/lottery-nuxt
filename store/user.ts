import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {

    actions: {
        async getData(params = {}) {
            try {
                const {data, error} = await useFetch('/api/users', {
                    method: 'GET',
                    query: params
                });
                if (error.value) {
                    console.error('Fetch error:', error.value);
                    throw error.value;
                }
                return data.value;
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        },

    }
});