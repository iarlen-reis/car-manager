import { IVehiclesProps } from '@/@types/modals/vehiclesModalTypes'
import { api } from '@/utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface IUseVehiclesProps {
  vehicles: IVehiclesProps[] | undefined
  vehicle: IVehiclesProps | null
  loadingVehicles: boolean
  createVehicle: (vehicle: IVehiclesProps) => void
  searchVehicle: (id: number) => void
  updateVehicle: (vehicle: IVehiclesProps) => void
  deleteVehicle: (id: number) => void
  setVehicle: (state: IVehiclesProps | null) => void
}

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
  )

  // get a vehicle: Busca um veiculo
  const { mutate: searchVehicle } = useMutation(
    (id: number) => api.get<IVehiclesProps>(`/veiculo/${id}`),
    {
      onSuccess: (data) => {
        const vehicle = data.data as IVehiclesProps

        setVehicle(vehicle)
      },
    },
  )

  // create a vehicle: Cria um veiculo
  const { mutate: createVehicle } = useMutation(
    (vehicle: IVehiclesProps) => api.post('/veiculo', vehicle),
    {
      onSuccess: (data) => {
        const vehicle = JSON.parse(data.config.data) as IVehiclesProps

        const vehiclesOlds = queryClient.getQueryData<IVehiclesProps[]>([
          'vehicles',
        ])
        if (vehiclesOlds) {
          const newVehicles = [
            ...vehiclesOlds,
            {
              ...vehicle,
              id: vehiclesOlds.length,
            },
          ]

          queryClient.setQueryData(['vehicles'], newVehicles)
        }
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
