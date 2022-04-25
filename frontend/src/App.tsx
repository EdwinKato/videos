import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Videos } from "./components/Videos"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid p={6}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Videos />
      </Grid>
    </Box>
  </ChakraProvider>
)
