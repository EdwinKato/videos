import { ChakraProvider, Box, Grid, Text, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Videos } from './components/Videos'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid p={6}>
        <Text>Videos</Text>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Videos />
      </Grid>
    </Box>
  </ChakraProvider>
)
