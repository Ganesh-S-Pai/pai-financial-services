import { useAuthStore } from "@/stores/auth";
import { useCommonStore } from "@/stores/common";
import { useRouterUtil } from "@/utils/router";

export const useApiInterceptors = () => {
    const { replace } = useRouterUtil();
    const authStore = useAuthStore();
    const commonStore = useCommonStore()

    const requestInterceptor = (method: string, options: RequestInit = {}, body: unknown = undefined) => {
        try {
            const config: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            };
            if (body) {
                config.body = JSON.stringify(body);
            }
            return config;
        }
        catch (error) {
            throw error;
        }
    }

    const responseInterceptor = async (response: Response) => {
        try {
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401 || response.status === 403) {
                    replace("/login");
                    authStore.token = undefined
                    authStore.userId = undefined
                    if (authStore.userId)
                        throw new Error("Unauthorized - session expired");
                }
                throw new Error(errorData.message)
            }
        }
        catch (error) {
            commonStore.addToast({
                message: error as string,
                color: 'error'
            });
            throw error;
        }
    }

    return { requestInterceptor, responseInterceptor }
}