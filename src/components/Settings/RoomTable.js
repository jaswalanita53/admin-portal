import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import moment from 'moment';
import FadeLoader from "react-spinners/FadeLoader";
import Axios from 'axios'

const RoomTable = () => {

    const [tabledata, setTableData] = useState([]);
    const [reservationNumber, setReservationNumber] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTodayBookedRoomsData = async () => {
        const userToken = localStorage.getItem('userToken')
        const data = { "currentDate": moment().format("YYYY-MM-DD") }
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getTodayBookedRooms',
            params: data,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }
        setLoading(true);
        const response = await Axios(config)
        setTableData(response.data.data.result);
        setReservationNumber(response.data.data.result2);
        setLoading(false);
    }
    useEffect(() => {
        getTodayBookedRoomsData()
    }, [])
    return (
        <TableContainer borderColor="#E2E8F0" borderWidth="1px" borderRadius="5" padding='0 5px 5px 5px' mt="12" height="400px" overflowY="auto">
            <Table variant='simple'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead position="sticky" top={0} marginTop="0" zIndex="1" backgroundColor="#f7fafc">
                    <Tr>
                        <Th>Room Type</Th>
                        <Th>Room Number</Th>
                        <Th>Status</Th>
                        <Th>Price Per Night</Th>
                        <Th>Reservation Number</Th>
                        <Th>Next Check-In Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loading ?
                        <>
                            <Tr>
                                <Td colSpan="7">
                                    <div className='dataloading'>
                                        <FadeLoader color="#38B2AC" />
                                    </div>
                                </Td>
                            </Tr>
                        </>
                        :
                        <>
                            {
                                tabledata.length > 0 &&
                                tabledata.map((table, index) =>
                                    <>
                                        {
                                            table.roomData.occupiedRoomNumbersArray.map((room, index) =>
                                                <Tr key={String(index)}>
                                                    <Td>{table?.roomName}</Td>
                                                    <Td>{room}</Td>
                                                    <Td>Booked</Td>
                                                    <Td>{table.roomExtraData[0].defaultPrice}</Td>
                                                    <Td>
                                                        {

                                                            reservationNumber.map((res) =>
                                                                res.bookedRoomNumbers.includes(room) && res._id
                                                            )}
                                                    </Td>
                                                    <Td>N/A</Td>
                                                </Tr>
                                            )
                                        }
                                        {
                                            table.roomData.availableRoomsNumbersArray.map((room, index) =>
                                                <Tr key={String(index)}>
                                                    <Td>{table?.roomName}</Td>
                                                    <Td>{room}</Td>
                                                    <Td>Available</Td>
                                                    <Td>{table.roomExtraData[0].defaultPrice}</Td>
                                                    <Td>
                                                        N/A

                                                    </Td>


                                                    <Td>N/A</Td>
                                                </Tr>
                                            )
                                        }
                                    </>

                                )
                            }
                        </>}
                </Tbody>

            </Table>
        </TableContainer>
    )
}

export default RoomTable