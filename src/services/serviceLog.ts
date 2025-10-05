import { localeDateString } from "@/utils/date"

export const getServiceLog = async (): Promise<ServiceLog[]> => {
  const baseUrl = import.meta.env.VITE_API_URL
  // const baseUrl = import.meta.env.VITE_API_LOCAL_URL

  return fetch(`${baseUrl}/sales-logs`)
    .then((response) => response.json())
    .then((data) => {
      return data.map((item: ServiceLog) => ({
        ...item,
        date: localeDateString(item.date),
        created: localeDateString(item.created)
      }))
    })
    .catch((error) => {
      console.error('Error fetching service log:', error)
      throw error
    })
}

export interface ServiceLog {
  id: string
  date: string
  opening: number
  inward: number
  sales: number
  outward: number
  created: string
}
