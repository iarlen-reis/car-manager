import { api } from '@/utils/api'
import { formateDate } from '@/utils/formatDate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IDisplacementsProps {
  id: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

interface IUseDisplacementsProps {
  displacements: IDisplacementsProps[] | undefined
  displacement: IDisplacementsProps | null
  displacementsLoading: boolean
  createDisplacement: (displacement: IDisplacementsProps) => void
  searchDisplacement: (id: number) => void
  setDisplacement: (state: IDisplacementsProps | null) => void
  updateDisplacement: (displacement: IDisplacementsProps) => void
  deleteDisplacement: (id: number) => void
}

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
  )

  // create a displacement: inicia um deslocamento
  const { mutate: createDisplacement } = useMutation(
    (displacement: IDisplacementsProps) =>
      api.post('/deslocamento/IniciarDeslocamento', displacement),
    {
      onSuccess: (data) => {
        const displacement = JSON.parse(data.config.data) as IDisplacementsProps

        displacement.inicioDeslocamento = formateDate(
          displacement.inicioDeslocamento,
        )

        const displacementsOlds = queryClient.getQueryData<
          IDisplacementsProps[]
        >(['displacements'])
        if (displacementsOlds) {
          const newdisplacements = [
            ...displacementsOlds,
            {
              ...displacement,
              id: displacementsOlds.length,
            },
          ]

          queryClient.setQueryData(['displacements'], newdisplacements)
        }
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
