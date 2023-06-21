import { IVehiclesProps } from '@/@types/modals/vehiclesModalTypes'
import { api } from '@/utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IUseVehiclesProps } from '@/@types/hooks/IUseVehiclesTypes'

const useVehicles = (): IUseVehiclesProps => {
  const [vehicle, setVehicle] = useState<IVehiclesProps | null>(null)
  const queryClient = useQueryClient()

  // get all vehicles: Busca todos veiculos
  const { data: vehicles, isLoading: loadingVehicles } = useQuery(
    ['vehicles'],
    async () => {
      const response = await api.get<IVehiclesProps[]>('/veiculo')

      return response.data
    },
    {
      staleTime: 30000,
    },
  )

  // get a vehicle: Busca um veiculo
  const { mutate: searchVehicle } = useMutation(
    (id: number) => api.get<IVehiclesProps>(`/veiculo/${id}`),
    {
      onSuccess: (data) => {
        const vehicle = data.data as IVehiclesProps

        setVehicle(vehicle)
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  // create a vehicle: Cria um veiculo
  const { mutate: createVehicle } = useMutation(
    (vehicle: IVehiclesProps) => api.post('/veiculo', vehicle),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['vehicles'])
        toast.success('Veículo adicionado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )
  // update a vehicle: Atualiza um veiculo
  const { mutate: updateVehicle } = useMutation(
    (vehicle: IVehiclesProps) => api.put(`/veiculo/${vehicle.id}`, vehicle),
    {
      onSuccess: (data) => {
        const vehicleUpdated = JSON.parse(data.config.data) as IVehiclesProps

        const oldVehicles = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])

        const newVehicles = oldVehicles?.map((vehicle) => {
          if (vehicle.id === vehicleUpdated.id) {
            vehicle = vehicleUpdated
          }
          return vehicle
        })
        queryClient.setQueryData(['vehicles'], newVehicles)
        toast.success('Veículo atualizado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  // delete a vehicle: Deleta um veiculo
  const { mutate: deleteVehicle } = useMutation(
    (id: number) =>
      api.delete(`/veiculo/${id}`, {
        data: {
          id,
        },
      }),
    {
      onSuccess: (data) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id

        const oldVehicles = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])

        const newVehicles = oldVehicles?.filter((vehicle) => vehicle.id !== id)

        queryClient.setQueryData(['vehicles'], newVehicles)
        toast.success('Veículo deletado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente mais tarde.')
      },
    },
  )

  return {
    vehicles,
    vehicle,
    createVehicle,
    searchVehicle,
    updateVehicle,
    deleteVehicle,
    setVehicle,
    loadingVehicles,
  }
}

export default useVehicles
