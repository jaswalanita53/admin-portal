import * as React from 'react';
import { Box, Card, CardBody, FormControl, FormLabel, Grid, GridItem, Heading, Select, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaUser } from 'react-icons/fa';
export default function ConfirmPayment(props) {
    const { isConfirmAndPayActivate,selectedRoomsArr,totalPrice, setIsConfirmAndPayActivate, reservationDetail, setReservationDetailForm, primaryGuestFirstName, setPrimaryGuestFirstName00} = props
    return (
        <Box mb={"12"}>
            <Text fontSize={"sm"} fontWeight={'600'} ps={'5'} pb={'3'} borderBottom={'2px solid #e5e5e5'} m={'4'}>RESERVATION DETAILS</Text>
            <Grid templateColumns={{base:"repeat(1,1fr)",lg:"repeat(3,1fr) 300px"}} gap={8} px={5}>
                <GridItem colSpan={{lg:'3'}} width={{base:"100%",lg:"unset" }} overflow="auto">
                    <Card borderTop='4px solid #3366ff' minWidth="550px">
                        <CardBody>
                            <Grid templateColumns='repeat(1,1fr)'>
                                <GridItem pb={'5'}>
                                    <Text fontSize={'sm'} fontWeight={'600'}>Reservation Summary</Text>
                                </GridItem>
                                <GridItem display={'flex'} border={'1px solid #e5e5e5'} px={'2'} py={'2'} gap={3}>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Check-In</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{selectedRoomsArr[0].checkInDate}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Check-Out</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{selectedRoomsArr[0].checkOutDate}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Nights</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{selectedRoomsArr[0].noOfNights}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Reservation Date</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{selectedRoomsArr[0].checkInDate}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Source</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{selectedRoomsArr[0].source}</Text>
                                    </Stack>
                                </GridItem>
                                <GridItem display={'flex'} borderBottom={'1px solid #e5e5e5'} px={'2'} py={'2'} gap={10}>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Guest</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.primaryGuestFirstName } {reservationDetail.primaryGuestLastName}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Email</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.primaryGuestEmailAddress}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Phone</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.primaryGuestPhone}</Text>
                                    </Stack>
                                </GridItem>
                                <GridItem display={'flex'} borderBottom={'1px solid #e5e5e5'} px={'2'} py={'2'} gap={10}>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Country</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryCountry ? reservationDetail.guestPrimaryCountry : "-"}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Address 1</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>-{reservationDetail.guestPrimaryAddress1 ? reservationDetail.guestPrimaryAddress1 : "-"}</Text>
                                    </Stack>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>Address 2</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryAddress2 ? reservationDetail.guestPrimaryAddress2 : "-"}</Text>
                                    </Stack>
                                </GridItem>
                                <GridItem display={'flex'} borderBottom={'1px solid #e5e5e5'} px={'2'} py={'2'} gap={10}>
                                    <Stack >
                                        <Heading size={'xs'} fontWeight={'500'}>City</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryCountry ? reservationDetail.guestPrimaryCountry : "-"}</Text>
                                    </Stack>
                                    <Stack>
                                        <Heading size={'xs'} fontWeight={'500'}>State/Region</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryCity ? reservationDetail.guestPrimaryCity : "-"}</Text>
                                    </Stack>
                                    <Stack>
                                        <Heading size={'xs'} fontWeight={'500'}>Postal Code</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryZipCode ? reservationDetail.guestPrimaryZipCode : "-"}</Text>
                                    </Stack>
                                </GridItem>
                                <GridItem display={'flex'} borderBottom={'1px solid #e5e5e5'} px={'2'} py={'2'} gap={10}>
                                    <Stack>
                                        <Heading size={'xs'} fontWeight={'500'}>Estimated Arrival Time</Heading>
                                        <Text fontSize={'xs'} fontWeight={'300'}>{reservationDetail.guestPrimaryCountry ? reservationDetail.guestPrimaryCountry : "-"}</Text>
                                    </Stack>
                                </GridItem>
                            </Grid>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem overflow="auto">
                    <Card borderTop='4px solid #3366ff' minWidth="300px">
                        <CardBody>
                            <Text fontSize={'xs'} py={'3'}>Total</Text>
                            <Grid templateColumns='repeat(2,1fr)'>
                                <GridItem><Text fontSize={'xs'} py={'3'}>Subtotal</Text></GridItem>
                                <GridItem textAlign={'end'}> <Text fontSize={'xs'} py={'3'}>${totalPrice.reduce((a, b) => a + b.roomPrice, 0)}</Text></GridItem>
                                <GridItem> <Text fontSize={'xs'} py={'3'}>Service Charge</Text></GridItem>
                                <GridItem textAlign={'end'}><Text fontSize={'xs'} py={'3'}>${totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10/100}</Text></GridItem>
                                <GridItem> <Text fontSize={'xs'} py={'3'}>VAT</Text></GridItem>
                                <GridItem textAlign={'end'}><Text fontSize={'xs'} py={'3'}>${(totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7/100).toFixed(0)}</Text></GridItem>
                                <GridItem> <Text fontSize={'xs'} py={'3'}>Grand Total</Text></GridItem>
                                <GridItem textAlign={'end'}><Text fontSize={'xs'} py={'3'}>${totalPrice.reduce((a, b) => a + b.roomPrice, 0) + totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10/100 + totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7/100}</Text></GridItem>
                                <GridItem><Text fontSize={'xs'} py={'3'}>Suggested Deposit</Text></GridItem>
                                <GridItem textAlign={'end'}><Text fontSize={'xs'} py={'3'}>{totalPrice.reduce((a, b) => a + b.roomPrice, 0) + totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10/100 + totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7/100}</Text></GridItem>
                                <GridItem><Text fontSize={'xs'} py={'3'}>Balance Due</Text></GridItem>
                                <GridItem textAlign={'end'}><Text fontSize={'xs'} py={'3'}>$0,00</Text></GridItem>
                            </Grid>
                        </CardBody>
                    </Card>
                    <Box background={'#32C0A0'} minWidth="300px">
                        <Text fontSize={'md'} color={'#fff'} fontWeight={'500'} py={'3'} px={'2'}>Payment Information</Text>
                    </Box>
                    <Card>
                        <CardBody>
                            <FormControl>
                                <FormLabel fontSize={'xs'}>Payment Type</FormLabel>
                                <Select placeholder='N/A' fontSize={'xs'}>
                                    <option value='not-payed'>Do not Collect Payment</option>
                                    <option value='Credit-card'>Credit Card</option>
                                    <option value='cash'>Cash</option>
                                    <option value='Cash5-0110010Cash'>Cash 5-01 10010 Cash</option>
                                    <option value='others'>Payment: Credit Card 5-12 11109 Credit Card and Other Pay</option>
                                </Select>
                            </FormControl>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={{lg:'4'}} overflow={"auto"}>
                    <Card borderTop='4px solid #3366ff'>
                        <CardBody overflow="auto">
                            <Text fontSize={'lg'} fontWeight={'600'}>Accommodations Summary</Text>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>TYPE</Th>
                                        <Th>GUEST</Th>
                                        <Th>ARRIVAL/DEPARTURE</Th>
                                        <Th>GUESTS</Th>
                                        <Th>NIGHTS</Th>
                                        <Th>TOTAL</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td ><Text fontSize={'xs'}>{selectedRoomsArr[0].roomName ? selectedRoomsArr[0].roomName : "-"}</Text></Td>
                                        <Td><Text fontSize={'xs'}>{reservationDetail.primaryGuestFirstName } {reservationDetail.primaryGuestLastName}</Text></Td>
                                        <Td><Text fontSize={'xs'}>{selectedRoomsArr[0].checkInDate} - {selectedRoomsArr[0].checkOutDate}</Text></Td>
                                        <Td>
                                            <Text display={'flex'} fontSize={'xs'}>
                                                <FaUser px={'3'} />{selectedRoomsArr[0].noOdAdults}
                                                <FaUser px={'3'} />{selectedRoomsArr[0].noOfchildren}
                                            </Text>
                                        </Td>
                                        <Td>{selectedRoomsArr[0].noOfRooms}</Td>
                                        <Td>${totalPrice.reduce((a, b) => a + b.roomPrice, 0)} </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    )
}