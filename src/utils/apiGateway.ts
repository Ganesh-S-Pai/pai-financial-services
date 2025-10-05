import { useCommonStore } from "@/stores/common";
import { useRedirect } from "@/utils/redirect";

export const apiGateway = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const { redirect } = useRedirect();
    const commonStore = useCommonStore();

    const httpRequest = async (endpoint: string, method: string, body?: unknown, options: RequestInit = {}) => {
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
            const response = await fetch(`${baseUrl}${endpoint}`, config);

            if (response.status === 401 || response.status === 403) {
                console.warn("API Gateway: Unauthorized (token invalid or expired).");
                localStorage.removeItem('token')
                redirect("/login");
                commonStore.addToast({
                    message: 'Session expired!',
                    color: 'error'
                });
                throw new Error("Unauthorized - session expired");
            }

            return response.json();
        }
        catch (error) {
            console.error(`Error during ${method} request to ${endpoint}:`, error);
            throw error;
        }
    }

    const get = async (endpoint: string, options: RequestInit = {}) => httpRequest(endpoint, 'GET', undefined, options)

    const post = async (endpoint: string, body: unknown, options: RequestInit = {}) => httpRequest(endpoint, 'POST', body, options)

    const put = async (endpoint: string, body: unknown, options: RequestInit = {}) => httpRequest(endpoint, 'PUT', body, options)

    const del = async (endpoint: string, options: RequestInit = {}) => httpRequest(endpoint, 'DELETE', undefined, options)

    return { get, post, put, del };
}