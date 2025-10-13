import { useDateUtil } from "@/utils/date"
import { useAuthentication } from "./authService"
import { apiGateway } from "@/utils/apiGateway"
import { MonthFormat } from "@/types/common"
import type { SalesLog } from "@/types/sales"

export const useSalesService = () => {
  const { getAuthToken } = useAuthentication()
  const { get, put, post } = apiGateway()
  const { localeDateString } = useDateUtil()
  const endpoint = '/vhiw/sales-logs'

  const getSalesLog = async (): Promise<SalesLog[]> => {
    try {
      const response = await get(endpoint, {
        headers: {
          'Authorization': `Bearer ${getAuthToken() || ''}`,
        },
      })

      const { data, message } = response
      if (data.length) {
        return data.map((item: SalesLog) => ({
          ...item,
          date: localeDateString(item.date, MonthFormat.LONG)
        }))
      } else {
        throw message
      }
    }
    catch (error) {
      throw error
    }
  }

  const updateSalesLog = async (id: string, salesLog: SalesLog) => {
    try {
      const url = endpoint + "/" + id

      const response = await put(url, {
        headers: {
          'Authorization': `Bearer ${getAuthToken() || ''}`,
        },
      }, salesLog)

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

  const createSalesLog = async (salesLog: SalesLog) => {
    try {
      const response = await post(endpoint, {
        headers: {
          'Authorization': `Bearer ${getAuthToken() || ''}`,
        },
      }, salesLog)

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

  return { getSalesLog, updateSalesLog, createSalesLog }
}
