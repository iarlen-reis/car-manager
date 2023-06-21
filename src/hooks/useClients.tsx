import { IClientProps } from '@/@types/modals/clientModalTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IUseClientsProps } from '@/@types/hooks/IUseClientsTypes'

export const useClients = (): IUseClientsProps => {
  const queryClient = useQueryClient()
  const [client, setClient] = useState<IClientProps | null>(null)

  // get all clients: Busca todos clientes
  const { data: clientes, isLoading: clientsLoading } = useQuery(
    ['clients'],
    async () => {
      const response = await api.get<IClientProps[]>('/cliente')

      return response.data
    },
    {
      staleTime: 30000,
    },
  )

  // create a new client: Cria um novo cliente
  const { mutate: createClient, isLoading: isLoadingCreate } = useMutation(
    (client: IClientProps) => api.post('/cliente', client),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['clients'])
        toast.success('Cliente criado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  // update a client: Atualiza um cliente.
  const { mutate: updateClient } = useMutation(
    (updatedClient: IClientProps) =>
      api.put(`/cliente/${updatedClient.id}`, updatedClient),
    {
      onSuccess: (data, updatedClient) => {
        const clientUpdated = JSON.parse(data.config.data)

        queryClient.setQueryData<IClientProps[] | undefined>(
          ['clients'],
          (oldData) => {
            if (oldData) {
              return oldData.map((client: IClientProps) =>
                client.id === clientUpdated.id ? clientUpdated : client,
              )
            }
            return oldData
          },
        )
        toast.success('Cliente atualizado com sucesso!')
      },
    },
  )

  // delete a client: Deleta um cliente
  const { mutate: deleteClient } = useMutation(
    (id: number) => {
      return api.delete(`Cliente/${id}`, {
        data: { id },
      })
    },
    {
      onSuccess: (data, variables) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id
        const oldClients = queryClient.getQueryData<IClientProps[]>(['clients'])

        if (oldClients) {
          const newClients = oldClients?.filter((client) => client.id !== id)

          queryClient.setQueryData(['clients'], newClients)
        }
        toast.success('Cliente deletado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  // get a client: busca um cliente
  const { mutate: clientSearch } = useMutation(
    (id: number) => {
      return api.get<IClientProps>(`/cliente/${id}`)
    },
    {
      onSuccess: (data) => {
        if (data.data) {
          setClient(data.data)
        } else {
          setClient(null)
        }
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  return {
    clientes,
    client,
    clientsLoading,
    createClient,
    isLoadingCreate,
    updateClient,
    deleteClient,
    clientSearch,
    setClient,
  }
}
