'use client'
import React from 'react'
import { Box, Skeleton } from '@mui/material'

const SkeletonDataGridTable = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
      padding={1}
    >
      <Box width="100%" display="flex" gap={2} padding={0} margin={0}>
        <Skeleton width="100%" height={40} animation="wave" variant="rounded" />
        <Skeleton width="100%" height={40} animation="wave" variant="rounded" />
        <Skeleton width="100%" height={40} animation="wave" variant="rounded" />
        <Skeleton width="100%" height={40} animation="wave" variant="rounded" />
      </Box>
      <Box flex={1} width="100%" display="flex">
        <Skeleton
          width="100%"
          height="100%"
          animation="wave"
          variant="rounded"
        />
      </Box>
      <Box width="100%" display="flex">
        <Skeleton width="100%" height={40} animation="wave" variant="rounded" />
      </Box>
    </Box>
  )
}

export default SkeletonDataGridTable
