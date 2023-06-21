import { api } from '@/utils/api'
import { formateDate } from '@/utils/formatDate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IDisplacementsProps } from '@/@types/modals/displacementModalTypes'

import { IUseDisplacementsProps } from '@/@types/hooks/IUseDisplacementTypes'

export const useDisplacements = (): IUseDisplacementsProps => {
  const [displacement, setDisplacement] = useState<IDisplacementsProps | null>(
    null,
  )
  const queryClient = useQueryClient()

  // get all displacements: Buscar todos deslocamentos
  const { data: displacements, isLoading: displacementsLoading } = useQuery(
    ['displacements'],
    async () => {
      const response = await api.get<IDisplacementsProps[]>('/deslocamento')

      response.data.map(
        (displacement) =>
          (displacement.inicioDeslocamento = formateDate(
            displacement.inicioDeslocamento,
          )),
      )

      response.data.map(
        (displacement) =>
          (displacement.fimDeslocamento = formateDate(
            displacement.fimDeslocamento,
          )),
      )

      return response.data
    },
    {
      staleTime: 30000,
    },
  )

  // create a displacement: inicia um deslocamento
  const { mutate: createDisplacement } = useMutation(
    (displacement: IDisplacementsProps) =>
      api.post('/deslocamento/IniciarDeslocamento', displacement),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['displacements'])

        toast.success('deslocamento iniciado com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro, tente novamente.')
      },
    },
  )

  // get a displacement: Buscar um deslocamento
  const { mutate: searchDisplacement } = useMutation(
    (id: number) => api.get(`/deslocamento/${id}`),
    {
      onSuccess: (data) => {
        const displacement = data.data as IDisplacementsProps

        setDisplacement(displacement)
      },
    },
  )

  // update a displacement: Atualiza um deslocamento
  const { mutate: updateDisplacement } = useMutation(
    (displacement: IDisplacementsProps) =>
      api.put(
        `/deslocamento/${displacement.id}/EncerrarDeslocamento`,
        displacement,
      ),
    {
      onSuccess: (data) => {
        const displacementUpdated = JSON.parse(
          data.config.data,
        ) as IDisplacementsProps

        displacementUpdated.fimDeslocamento =
          formateDate(displacementUpdated.fimDeslocamento) + 1

        displacementUpdated.inicioDeslocamento =
          formateDate(displacementUpdated.inicioDeslocamento) + 1

        const displacementsOlds = queryClient.getQueryData<
          IDisplacementsProps[]
        >(['displacements'])

        const newsDisplacements = displacementsOlds?.map((displacement) =>
          displacement.id === displacementUpdated.id
            ? displacementUpdated
            : displacement,
        )

        queryClient.setQueryData(['displacements'], newsDisplacements)
        toast.success('Deslocamento encerrado com sucesso!')
      },
    },
  )

  const { mutate: deleteDisplacement } = useMutation(
    (id: number) =>
      api.delete(`/deslocamento/${id}`, {
        data: {
          id,
        },
      }),
    {
      onSuccess: (data) => {
        const parsedData = JSON.parse(data.config.data)
        const id = parsedData.id as number

        const oldsDisplacements = queryClient.getQueryData<
          IDisplacementsProps[]
        >(['displacements'])

        const newsDisplacements = oldsDisplacements?.filter(
          (displacement) => displacement.id !== id,
        )

        queryClient.setQueryData(['displacements'], newsDisplacements)
        toast.success('Deslocamento deletado com sucesso!')
      },
    },
  )

  return {
    displacements,
    displacementsLoading,
    createDisplacement,
    displacement,
    searchDisplacement,
    setDisplacement,
    updateDisplacement,
    deleteDisplacement,
  }
}
