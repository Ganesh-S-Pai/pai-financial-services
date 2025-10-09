import { useDateUtil } from "@/utils/date"
import { useAuthentication } from "./authService"
import { apiGateway } from "@/utils/apiGateway"
import { MonthFormat } from "@/types/common"

export interface SalesLog {
  id: string
  date: string
  opening: number
  inward: number
  sales: number
  outward: number
  physical: number
  system: number
  difference: number
  created_at: string
  updated_at: string
}

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
      console.error('Error fetching sales log:', error)
      throw error
    }
  }

  const updateSalesLog = async (id: string, salesLog: SalesLog) => {
    try {
      const url = endpoint + "/" + id

      const response = await put(url, salesLog, {
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
      console.error('Error updating sales log data:', error)
      throw error
    }
  }
  
  const createSalesLog = async (salesLog: SalesLog) => {
    try {
      const response = await post(endpoint, salesLog, {
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
      console.error('Error creating sales log data:', error)
      throw error
    }
  }

  return { getSalesLog, updateSalesLog, createSalesLog }
}
