import React, { useState, useEffect } from 'react'
import { Box, Card, CardHeader, CardFooter, Heading, Text, Flex } from '@chakra-ui/react'
import moment from 'moment'
import Axios from 'axios'
const RoomCards = () => {
    const [roomData, setRoomData] = useState()

    const getRoomsData = async () => {
        try {
            const userToken = localStorage.getItem("userToken");
            const url = `${process.env.REACT_APP_API_URL}/admin/getBookedRoomsInfo`;
            const data = { checkInDate: moment().format("YYYY-MM-DD") };
            const config = {
                method: "get",
                url: url,
                params: data,
                headers: {
                    Authorization: "Bearer " + userToken,
                },
            };
            const response = await Axios(config);
            console.log(response.data.data)
            setRoomData(response.data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getRoomsData()
    }, [])

    return (
        <Box backgroundColor="white" className='mt-10' borderRadius="10px" borderColor="#DDE0E4" >
            <Flex className='gap-4' justifyContent="space-between">
                {
                    roomData?.map((row,index) =>
                        <Card key={index} p="5">
                            <CardHeader>
                                <Heading size='md'>{row?.roomName}</Heading>
                            </CardHeader>
                            <CardFooter className='flex gap-6' >
                                <Text width="90px" fontWeight="bold" >Booked Rooms: {row?.totalRoomsBookedOfThisType}</Text>
                                <Text width="90px" fontWeight="bold" >Available Rooms: {row.totalRooms  - row?.totalRoomsBookedOfThisType}</Text>
                            </CardFooter>
                        </Card>
                    )
                }
            </Flex>
        </Box>
    )
}

export default RoomCards