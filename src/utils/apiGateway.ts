
import { useApiInterceptors } from "./apiInterceptors";

export const apiGateway = () => {
    const baseUrl = import.meta.env.VITE_API_URL;

    const { requestInterceptor, responseInterceptor } = useApiInterceptors()

    const httpRequest = async (endpoint: string, method: string, options: RequestInit = {}, body?: unknown) => {
        try {
            const config: RequestInit = requestInterceptor(method, options, body)

            const response = await fetch(`${baseUrl}${endpoint}`, config);

            responseInterceptor(response)

            return response.json();
        }
        catch (error) {
            throw error;
        }
    }

    const get = async (endpoint: string, options: RequestInit = {}) => httpRequest(endpoint, 'GET', options)

    const post = async (endpoint: string, options: RequestInit = {}, body: unknown) => httpRequest(endpoint, 'POST', options, body)

    const put = async (endpoint: string, options: RequestInit = {}, body: unknown) => httpRequest(endpoint, 'PUT', options, body)

    const del = async (endpoint: string, options: RequestInit = {}) => httpRequest(endpoint, 'DELETE', options)

    return { get, post, put, del };
}