import { useState, useEffect } from 'react'
import { api } from '@/utils/api'

export function useFetch<T = unknown>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = (await api.get('/cliente')).data

        setData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getClients()
  }, [])

  return { data, loading }
}
