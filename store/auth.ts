import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        registeredUser: {
            email: "",
            mobile: "",
            password: "",
            name: "",
            password_confirmation: "",
            otp_method: "",
            referral_code: ""
        }
    }),
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

        async register (obj : any) {
            const response = await fetch(`/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            this.registeredUser.email = obj.email || "";
            this.registeredUser.mobile = obj.mobile || "";
            this.registeredUser.password = obj.password || "";
            this.registeredUser.password_confirmation = obj.password_confirmation || "";
            this.registeredUser.otp_method = obj.otp_method || "";
            this.registeredUser.referral_code = obj.referral_code || "";
            return response.json();
        },


        async verifyOtp (obj : any) {
            try {
                const response = await fetch(`/api/verify-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });

                const data = await response.json();
                const headers = response.headers;
                const status = response.status;

                if (response.ok) {
                    return { data, headers, status };
                } else {
                    throw { data, headers, status };
                }

            }catch (error) {
                console.error("Otp error:", error);

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