import { IDriverProps } from '@/@types/modals/driverModalTypes'
import { api } from '@/utils/api'
import { formateDate } from '@/utils/formatDate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IUseDriverProps {
  drivers: IDriverProps[] | undefined
  driver: IDriverProps | null
  driversLoading: boolean
  createDriver: (driver: IDriverProps) => void
  updateDriver: (driver: IDriverProps) => void
  searchDriver: (id: number) => void
  deleteDriver: (id: number) => void
  setDriver: (state: IDriverProps | null) => void
}

export const useDrivers = (): IUseDriverProps => {
  const [driver, setDriver] = useState<IDriverProps | null>(null)
  const queryClient = useQueryClient()

  // get all driver: busca todos condutores
  const { data: drivers, isLoading: driversLoading } = useQuery(
    ['drivers'],
    async () => {
      const response = await api.get<IDriverProps[]>('/condutor')

      response.data.map(
        (driver) =>
          (driver.vencimentoHabilitacao = formateDate(
            driver.vencimentoHabilitacao,
          )),
      )

      return response.data
    },
    {
      staleTime: 30000,
    },
  )

  // get a driver: Buscando um condutor
  const { mutate: searchDriver } = useMutation(
    (id: number) => api.get<IDriverProps>(`/condutor/${id}`),
    {
      onSuccess: (data) => {
        if (data.data) {
          setDriver(data.data)
        }
      },
    },
  )

  // create a new driver: Criar um novo condutor
  const { mutate: createDriver } = useMutation(
    (driver: IDriverProps) => api.post('/Condutor', driver),
    {
      onSuccess: (data) => {
        const driver = JSON.parse(data.config.data) as IDriverProps

        driver.vencimentoHabilitacao = formateDate(driver.vencimentoHabilitacao)

        const driverOlds = queryClient.getQueryData<IDriverProps[]>(['drivers'])

        if (driverOlds) {
          const newClients = [
            ...driverOlds,
            {
              ...driver,
              id: driverOlds.length,
              catergoriaHabilitacao: driver.categoriaHabilitacao,
            },
          ]

          queryClient.setQueryData(['drivers'], newClients)
        }
        toast.success('Condutor adicionado com sucesso!')
      },
    },
  )

  // update a driver: Atualiza um condutor
  const { mutate: updateDriver } = useMutation(
    (driverUpdated: IDriverProps) =>
      api.put(`/condutor/${driverUpdated.id}`, driverUpdated),
    {
      onSuccess: (data) => {
        const driverUpdated = JSON.parse(data.config.data) as IDriverProps

        driverUpdated.vencimentoHabilitacao = formateDate(
          driverUpdated.vencimentoHabilitacao,
        )

        const oldDrivers = queryClient.getQueryData<IDriverProps[]>(['drivers'])

        const newDrivers = oldDrivers?.map((driver) =>
          driver.id === driverUpdated.id ? driverUpdated : driver,
        )

        queryClient.setQueryData(['drivers'], newDrivers)
        toast.success('Condutor atualizado com sucesso!')
      },
    },
  )

  // delete a driver: Deleta um condutor
  const { mutate: deleteDriver } = useMutation(
    (id: number) =>
      api.delete(`/condutor/${id}`, {
        data: {
          id,
        },
      }),
    {
      onSuccess: (data) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id

        const oldDrivers = queryClient.getQueryData<IDriverProps[]>(['drivers'])

        const newDrivers = oldDrivers?.filter((driver) => driver.id !== id)

        queryClient.setQueryData(['drivers'], newDrivers)
        toast.success('Condutor removido com sucesso!')
      },
    },
  )
  return {
    drivers,
    driversLoading,
    driver,
    searchDriver,
    setDriver,
    createDriver,
    updateDriver,
    deleteDriver,
  }
}
