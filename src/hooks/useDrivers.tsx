import { IDriverProps } from '@/@types/modals/driverModalTypes'
import { api } from '@/utils/api'
import { formateDate } from '@/utils/formatDate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

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
      },
    },
  )

  // update a driver: Atualiza um condutor
  const { mutate: updateDriver } = useMutation(
    (
      driverUpdated: Pick<
        IDriverProps,
        'id' | 'categoriaHabilitacao' | 'vencimentoHabilitacao'
      >,
    ) => api.put(`/condutor/${driverUpdated.id}`, driverUpdated),
    {
      onSuccess: (data) => {
        const driverUpdated = JSON.parse(data.config.data) as IDriverProps

        const oldDrivers = queryClient.getQueryData<IDriverProps[]>(['drivers'])

        const newDrivers = oldDrivers?.map((driver) => {
          if (driver.id === driverUpdated.id) {
            driver.categoriaHabilitacao = driverUpdated.categoriaHabilitacao
            driver.vencimentoHabilitacao = formateDate(
              driverUpdated.vencimentoHabilitacao,
            )
          }
          return driver
        })
        queryClient.setQueryData(['drivers'], newDrivers)
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
