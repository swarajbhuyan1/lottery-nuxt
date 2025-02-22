import { defineStore } from 'pinia';

export const useSlotCategoryStore = defineStore('slot-category', {

    actions: {
        async getData(params = {}) {
            try {
                const {data, error} = await useFetch('/api/admin/slot-categories', {
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

        async post (obj : any) {
            const response = await fetch(`/api/admin/slot-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            return response.json();
        },

    }
});