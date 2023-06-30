import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import SidebarLayout from "./components/SidebarLayout"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SidebarLayout children={undefined} />
  </ChakraProvider>
)
