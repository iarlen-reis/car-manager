'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import MenuTools from '@/components/MenuTools/MenuTools'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/utils/api'
import { formateDate } from '@/utils/formatDate'
import useColumns from '@/hooks/useColumns'
import DataGridTable from '@/components/DataGridTable/DataGridTable'
import DriverModal from '@/components/Modals/DriverModal'

interface IDriver {
  id: number
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

const Condutores = () => {
  const { driverColumns } = useColumns()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [driver, setDriver] = useState<IDriver | null>(null)
  const queryClient = useQueryClient()

  // get all driver: busca todos condutores
  const { data: drivers, isLoading } = useQuery(['drivers'], async () => {
    const response = await api.get<IDriver[]>('/condutor')

    response.data.map(
      (driver) =>
        (driver.vencimentoHabilitacao = formateDate(
          driver.vencimentoHabilitacao,
        )),
    )

    return response.data
  })

  // create a new driver: Criar um novo condutor
  const { mutate: createDriver } = useMutation(
    (driver: IDriver) => api.post('/Condutor', driver),
    {
      onSuccess: (data) => {
        const driver = JSON.parse(data.config.data) as IDriver

        driver.vencimentoHabilitacao = formateDate(driver.vencimentoHabilitacao)

        const driverOlds = queryClient.getQueryData<IDriver[]>(['drivers'])

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

        const oldDrivers = queryClient.getQueryData<IDriver[]>(['drivers'])

        const newDrivers = oldDrivers?.filter((driver) => driver.id !== id)

        queryClient.setQueryData(['drivers'], newDrivers)

        setIsOpenModal(false)
      },
    },
  )

  // get a driver: Buscando um condutor
  const { mutate: searchDriver } = useMutation(
    (id: number) => api.get<IDriver>(`/condutor/${id}`),
    {
      onSuccess: (data) => {
        if (data.data) {
          setDriver(data.data)
          setIsOpenModal(true)
        }
      },
    },
  )

  // update a driver: Atualiza um condutor
  const { mutate: updateDriver } = useMutation(
    (
      driverUpdated: Pick<
        IDriver,
        'id' | 'categoriaHabilitacao' | 'vencimentoHabilitacao'
      >,
    ) => api.put(`/condutor/${driverUpdated.id}`, driverUpdated),
    {
      onSuccess: (data) => {
        const driverUpdated = JSON.parse(data.config.data) as IDriver

        const oldDrivers = queryClient.getQueryData<IDriver[]>(['drivers'])

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
        setIsOpenModal(false)
      },
    },
  )

  const handleShow = () => {
    setIsOpenModal(!isOpenModal)
    setDriver(null)
  }
  const handleOpenModal = () => {
    setDriver(null)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={2}>
      <MenuTools
        description="Página de condutores"
        textButton="novo condutor"
        handleOpenModal={handleShow}
      />
      <DataGridTable
        columns={driverColumns}
        rows={drivers}
        loading={isLoading}
        handleShow={searchDriver}
        handleDelete={deleteDriver}
        handleOpenModal={handleOpenModal}
      />
      <DriverModal
        handleModal={handleShow}
        isOpen={isOpenModal}
        deleteDriver={deleteDriver}
        createDriver={createDriver}
        driver={driver}
        updateDriver={updateDriver}
      />
    </Box>
  )
}

export default Condutores
