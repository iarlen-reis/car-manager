import { useState, useEffect } from 'react'
import { api } from '@/utils/api'

interface IClient {
  id: number
  nome: string
  numeroDocumento: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
}

interface IUseFetchClientsProps {
  clients: IClient[]
  loading: boolean
}

export const useFetchClients = (): IUseFetchClientsProps => {
  const [clients, setClients] = useState<IClient[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = (await api.get<IClient[]>('/cliente')).data

        setClients(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getClients()
  }, [])

  return { clients, loading }
}
