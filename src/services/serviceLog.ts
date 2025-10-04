export const getServiceLog = async (): Promise<ServiceLog[]> => {
  const baseUrl = import.meta.env.VITE_API_URL

  return fetch(`${baseUrl}/sales-logs`)
    .then((response) => response.json())
    .then((data) => {
      return data.map((item: ServiceLog) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        created: new Date(item.created).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
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
