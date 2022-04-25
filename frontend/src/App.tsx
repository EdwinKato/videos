import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Videos } from './components/Videos'
import { Video } from './components/Video'
import { Edit } from './components/Edit'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid p={6}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Routes>
          <Route path="/" element={<Videos />} />
          <Route path="videos/:videoId" element={<Video />} />
          <Route path="/videos/:videoId/edit" element={<Edit />} />
        </Routes>
      </Grid>
    </Box>
  </ChakraProvider>
)
