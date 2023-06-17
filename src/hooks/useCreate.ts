import { api } from '@/utils/api'
import { useState } from 'react'

interface IUseCreateClientProps<T> {
  error: boolean
  createData: (client: T) => void
  loading: boolean
}

export const useCreate = <T = unknown>(): IUseCreateClientProps<T> => {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const createData = async (client: T) => {
    try {
      setLoading(true)

      await api.post('/cliente', client)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { error, createData, loading }
}
