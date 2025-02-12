import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    actions: {
        async login(obj: { email?: string; mobile?: string; password: string }) {
            try {
                const payload: Record<string, string> = { password: obj.password };

                if (obj.email) {
                    payload.email = obj.email;
                } else if (obj.mobile) {
                    payload.mobile = obj.mobile;
                }

                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();
                const headers = response.headers;
                const status = response.status;

                if (response.ok) {
                    return { data, headers, status };
                } else {
                    throw { data, headers, status };
                }
            } catch (error) {
                console.error("Login error:", error);

                if (typeof error === "object" && error !== null) {
                    throw {
                        data: (error as any).data || {},
                        headers: (error as any).headers || {},
                        status: (error as any).status || 500,
                    };
                } else {
                    throw { data: {}, headers: {}, status: 500 };
                }
            }
        },



        async logout () {
            return await new Promise(async (resolve, reject) => {
                await fetch('/api/logout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async (response) => resolve(await response.json())).catch(reject);
            });
        }
    }
});