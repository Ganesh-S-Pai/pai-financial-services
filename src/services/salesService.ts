import { localeDateString } from "@/utils/date"
import { useAuthentication } from "./authService"

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

  const getSalesLog = async (): Promise<SalesLog[]> => {
    const baseUrl = import.meta.env.VITE_API_URL

    return fetch(`${baseUrl}/vhiw/sales-logs`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken() || ''}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.map((item: SalesLog) => ({
          ...item,
          date: localeDateString(item.date),
          created: localeDateString(item.created)
        }))
      })
      .catch((error) => {
        console.error('Error fetching sales log:', error)
        throw error
      })
  }

  return { getSalesLog }
}
