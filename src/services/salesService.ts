import { useDateUtil } from "@/utils/date"
import { useAuthentication } from "./authService"
import { apiGateway } from "@/utils/apiGateway"

export interface SalesLog {
  id: string
  date: string
  opening: number
  inward: number
  sales: number
  outward: number
  created: string
}

export const useSalesService = () => {
  const { getAuthToken } = useAuthentication()
  const { get } = apiGateway()
  const { localeDateString } = useDateUtil()

  const getSalesLog = async (): Promise<SalesLog[]> => {
    const endpoint = '/vhiw/sales-logs'

    try {
      const response = await get(endpoint, {
        headers: {
          'Authorization': `Bearer ${getAuthToken() || ''}`,
        },
      })

      const { data } = response
      if (data.length) {
        return data.map((item: SalesLog) => ({
          ...item,
          date: localeDateString(item.date),
          created: localeDateString(item.created)
        }))
      } else {
        return []
      }
    }
    catch (error) {
      console.error('Error fetching sales log:', error)
      throw error
    }
  }

  return { getSalesLog }
}
