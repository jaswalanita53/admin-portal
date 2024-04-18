
import React, { useState } from 'react'
import { Container, Box, Input, Heading } from '@chakra-ui/react'
import TableComponent from './TableComponent'
const PaymentComp = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container p="4" maxW="container.2xxl" backgroundColor="#ecf2f9">
      <Box backgroundColor="#fff" p="5" borderRadius="5" borderColor="#3366ff">
          <Heading as='h3' size='lg' p="3" display={'flex'} >
            Payments
            <Input  marginLeft='70%'
              className='paymentinput'
              type="text"
              placeholder="Search customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Heading>
        <TableComponent searchQuery={searchQuery}/>
      </Box>
    </Container>
  )
}

export default PaymentComp