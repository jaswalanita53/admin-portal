import React from 'react'
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box } from '@chakra-ui/react';
import { tabledata } from './tableAssets/data';
const IntervalTable = () => {


    return (
        <Box paddingY="20px">
            <TableContainer >
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>None Available</TableCaption>
                    <Thead>
                        <Tr>{
                            tabledata && tabledata?.headers?.map((heading, index) =>
                                <Th key={index}>{heading}</Th>
                            )
                        }
                        </Tr>
                    </Thead>
                    {/* <Tbody>
                       <td></td>
                    </Tbody> */}
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </TableContainer></Box>
    )
}

export default IntervalTable