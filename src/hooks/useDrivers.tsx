import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { IDriverProps } from '@/@types/modals/driverModalTypes'
import { IUseDriverProps } from '@/@types/hooks/IUseDriversTypes'

import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import { formateDate } from '@/utils/formatDate'

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
        queryClient.invalidateQueries(['drivers'])
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

        driverUpdated.catergoriaHabilitacao = driverUpdated.categoriaHabilitacao

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
