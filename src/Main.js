import { Container, Flex } from '@chakra-ui/react'
import 'react-virtualized/styles.css'
import { StarDataTable } from './StarDataTable'

export const Main = ({starsData}) => {

  return (
    <Flex as="main" role="main" direction="column" flex="1" py="6" >
      <Container flex="1">
      <div style={{ height: 800 }}>
        <StarDataTable starsData={starsData}/>
      </div>
      </Container>
    </Flex>
  )

  
}
