import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import Axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";

const TableComponent = (props) => {
    const [tableData, setTableData] = React.useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPaymentInfo = async () => {
        const userToken = localStorage.getItem('userToken')
        // const data = { "currentDate": moment().add(1, 'days').format("YYYY-MM-DD") }
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getPaymentInfo',
            //   params: data,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }
        setLoading(true);
        const response = await Axios(config);
        setTableData(response.data.data);
        setLoading(false);
    }


    React.useEffect(() => {
        getPaymentInfo()
    }, [])

    useEffect(() => {
        // Filter data based on search query
        if (props.searchQuery) {
            if (tableData?.length > 0) {
                const filtered = tableData.filter((booking) => {
                    const userInfo = booking.userInfo[0]; // Assuming userInfo is an array with at least one element
                    const firstNameMatch = userInfo.firstName && userInfo.firstName.toLowerCase().includes(props?.searchQuery.toLowerCase());
                    const lastNameMatch = userInfo.lastName && userInfo.lastName.toLowerCase().includes(props?.searchQuery.toLowerCase());
                    return firstNameMatch || lastNameMatch;
                });
                setFilteredData(filtered);
            }
        } else {
            setFilteredData([]);
        }
    }, [props.searchQuery, tableData]);





    return (

        <TableContainer borderColor="#E2E8F0" borderWidth="1px" borderRadius="5" padding="0" height="440px" overflowY="auto">
            <Table variant='simple'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead position="sticky" top={0} marginTop="0" zIndex="docked" backgroundColor="#f7fafc">
                    <Tr>
                        <Th>Payment ID</Th>
                        <Th>Customer Name</Th>
                        <Th isNumeric>Payment Amount</Th>
                        <Th>Payment Date</Th>
                        <Th>Status</Th>
                        <Th>Card</Th>
                        <Th>Reservation</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loading ?
                        <Tr>
                            <Td colSpan="7">
                                <div className='dataloading'>
                                    <FadeLoader color="#38B2AC" />
                                </div>
                            </Td>
                        </Tr>
                        : <>
                            {filteredData.length > 0 ?
                                <>
                                    {
                                        filteredData?.map((row, index) =>
                                            <Tr key={String(index)}>
                                                <Td>{index + 1}</Td>
                                                <Td>{row?.userInfo[0].firstName + ' ' + row?.userInfo[0].lastName}</Td>
                                                <Td isNumeric>{row?.totalPrice}</Td>
                                                <Td>{row?.bookingDate}</Td>
                                                <Td>{row?.paymentStatus}</Td>
                                                <Td>{row?.responseData ? row?.responseData[0]?.data?.transactionResponse?.accountNumber : ''}</Td>
                                                <Td>{row?.bookingID}</Td>

                                            </Tr>
                                        )

                                    }
                                </>
                                :
                                <>
                                    {
                                        tableData?.map((row, index) =>
                                            <Tr key={String(index)}>
                                                <Td>{index + 1}</Td>
                                                <Td>{row?.userInfo[0].firstName + ' ' + row?.userInfo[0].lastName}</Td>
                                                <Td isNumeric>{row?.totalPrice}</Td>
                                                <Td>{row?.bookingDate}</Td>
                                                <Td>{row?.paymentStatus}</Td>
                                                <Td>{row?.responseData ? row?.responseData[0]?.data?.transactionResponse?.accountNumber : ''}</Td>
                                                <Td>{row?.bookingID}</Td>

                                            </Tr>
                                        )

                                    } </>
                            }
                        </>}

                </Tbody>

            </Table>
        </TableContainer>
    )
}

export default TableComponent