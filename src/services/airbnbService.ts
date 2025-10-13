import { apiGateway } from "@/utils/apiGateway"
import { useAuthentication } from "./authService"
import type { Airbnb, Statement } from "@/types/airbnb"


export const useAirbnbService = () => {
    const { get, post, put, del } = apiGateway()
    const { getAuthToken } = useAuthentication()

    const baseEndpoint = '/airbnb/statement'

    const getAirbnbData = async (page: number, limit: number, search: string): Promise<Airbnb> => {
        let url = baseEndpoint + "?"
        if (page) url += `page=${page}`
        if (limit) url += `&limit=${limit}`
        if (search) url += `&search=${search}`

        try {
            const response = await get(url, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            })

            const { data, status, message } = response
            if (status === "success") {
                return data
            } else {
                throw message
            }
        }
        catch (error) {
            throw error
        }
    }

    const addStatement = async (statement: Statement) => {
        try {
            const response = await post(baseEndpoint, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            }, statement)

            const { data, message } = response
            if (data) {
                return data
            } else {
                throw message
            }
        }
        catch (error) {
            throw error
        }
    }

    const updateStatement = async (id: string, statement: Statement) => {
        try {
            const url = baseEndpoint + "/" + id

            const response = await put(url, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            }, statement)

            const { data, message } = response
            if (data) {
                return data
            } else {
                throw message
            }
        }
        catch (error) {
            throw error
        }
    }

    const deleteStatement = async (id: string) => {
        try {
            if (!id) return

            const url = baseEndpoint + "/" + id

            const response = await del(url, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            })

            const { data, message } = response
            if (data) {
                return data
            } else {
                throw message
            }
        }
        catch (error) {
            throw error
        }
    }

    return { getAirbnbData, addStatement, updateStatement, deleteStatement }
}