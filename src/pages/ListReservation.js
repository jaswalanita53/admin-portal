import * as React from 'react'
import { FormControl, FormLabel, Button, Card, CardBody, Grid, GridItem, Container, Heading, Select, Input, Box, Link, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from '../common/dataTables.js';
import moment from 'moment';
import { FaDownload, FaPrint, FaSearch } from 'react-icons/fa';
import styles from "../assets/css/ListReservations.module.css"
import { AiOutlineDelete } from "react-icons/ai"
import { AlertDialog ,AlertDialogFooter,  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import LoadSpinner from '../common/LoadSpinner.js';
import { useNavigate } from 'react-router-dom';

function ListReservation() {
    const navigate = useNavigate();
    const [roomsDetails, setRoomsDetails] = React.useState([])  
    const [delId, setDeleteId] = React.useState("")
    const [data1, setData1] = React.useState()
    const [loading, setLoading] =React.useState(false)
    const cancelRef = React.useRef()
    const [isbuttonloading, setisbuttonloading] = React.useState(false)
    const [dateStates, setdateStates] = React.useState({ dateBooked: "", arrivalDate:"" , departureDate:"" });
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    async function getAllBookings() {
        const userToken = localStorage.getItem('userToken')
        const data = {}
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getAllBookings',
            params: data,
            headers: {
                'Authorization': 'Bearer '+ userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }
        const response = await Axios(config)
        if (response.status)
        
        setData1(response.data.data)
        let result = new Promise((resolve, reject)=>{
                setRoomsDetails(prepareRowsDataFromTable(response.data.data.reverse()))
                resolve(true)
        })
        if(result){
            setLoading(false)
            setisbuttonloading(false)
            onCloseDelete()
        }
    }

    const prepareRowsDataFromTable = (data) => {
        const tmpRows = []
        data.map((row, index) => {
            let dateDiff = moment(row.checkOutDate).diff(moment(row.checkInDate), 'days');
            let linkUrl = '/admin/reservation/view/' + row.userInfo._id
            tmpRows.push({
                "id": row.userInfo._id,
                "key": index + 1,
                "roomName": row.userInfo.firstName + " " + row.userInfo.lastName,
                "firstName": <Link href={linkUrl} color={'blue.500'} target="_self">{row.userInfo.firstName}</Link>,
                'lastName': row.userInfo.lastName,
                "dateBooked": moment(row.bookingDate).format("MMMM DD,YYYY"),
                "roomNumber": "dbl(" + row.roomNumber + ")",
                "arrivalDate": moment(row.checkInDate).format("MMMM DD,YYYY"),
                "departureDate": moment(row.checkOutDate).format("MMMM DD,YYYY"),
                "noOfNights": dateDiff,
                "totalPrice": row.totalPrice,
                "status": row.bookingStatus,
                "source": "-",

            })
        })
        return tmpRows;
    }

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("roomName", {
            cell: (info) => info.getValue(),
            header: "RESERVATION",
        }),
        columnHelper.accessor("firstName", {
            cell: (info) => info.getValue(),
            header: "NAME",
        }),
        columnHelper.accessor("lastName", {
            cell: (info) => info.getValue(),
            header: "SURNAME",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("dateBooked", {
            cell: (info) => info.getValue(),
            header: "DATE BOOKED",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("roomNumber", {
            cell: (info) => info.getValue(),
            header: "ROOM NUMBER(S)",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("arrivalDate", {
            cell: (info) => info.getValue(),
            header: "CHECK-IN",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("departureDate", {
            cell: (info) => info.getValue(),
            header: "CHECK-OUT",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("noOfNights", {
            cell: (info) => info.getValue(),
            header: "NIGHTS",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("totalPrice", {
            cell: (info) => info.getValue(),
            header: "TOTAL PRICE",
        }),
        columnHelper.accessor("status", {
            cell: (info) => info.getValue(),
            header: "STATUS",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("source", {
            cell: (info) => <AiOutlineDelete onClick={() => { setDeleteId(info.row.id); onOpenDelete(); }}  cursor='pointer' color="red" />,
            header: "SOURCE",
            meta: {
                isNumeric: false
            }
        }),
    ];


    const deleteplan = async (id1) => {
            setisbuttonloading(true)
            const id = data1[+delId]._id
            const userToken = localStorage.getItem('userToken')
            const config = {
            method: 'delete',
            url: process.env.REACT_APP_API_URL + '/admin/deleteBooking',
            data: {
                id: id,
            },
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }

      Axios(config).then((response)=>{
          if (response.status) {
              getAllBookings();
            }
        }).catch((error)=>{
            console.log(error)
            onCloseDelete();
        })
    }

    const data = [
      {
        heading: "Date Booked",
        placeholder: "dateBooked",
      },
      {
        heading: "Check-In",
        placeholder: "arrivalDate",
      },
      {
        heading: "Check-Out",
        placeholder: "departureDate",
      },
    ];

        
function runsearch(){
   let filteredRoomDetails = []
   roomsDetails.forEach((value)=>{
        if (
          value.arrivalDate == dateStates.arrivalDate ||
          value.departureDate == dateStates.departureDate ||
          value.dateBooked == dateStates.dateBooked
        ) {
          filteredRoomDetails.push(value);

        }
        })
    setRoomsDetails(filteredRoomDetails)
}

React.useEffect(() => {
    setLoading(true)
    getAllBookings();
}, [])

    return (
        <>{
            loading ? (<LoadSpinner isLoading={loading} />) :
            (
                <>
            {/* <Header /> */}
            <Container maxW="container.xxl" px={{ base:'5',sm:'10' }} my={5} backgroundColor="#ecf2f9"  >

                <Grid templateColumns="repeat(1, 1fr)">
                    <GridItem w='100%' pt={'5'}>
                        <Grid templateColumns="repeat(2,1fr)" className={styles.firstLine}>
                            <GridItem>
                                <Heading size='lg'>Reservations</Heading>
                            </GridItem>
                            <GridItem display={'flex'} justifyContent={'end'} width={{base:"100%",sm:"fit-content"}}>
                                <Button background='#32c0a0' color='#fff' borderRadius='10px' fontSize="12px"  
                                // onClick={() => window.location.href = "/admin/reservation/create"}
                                onClick={() =>{navigate("/admin/reservation/create")}}
                                 width={{base:"100%",sm:"fit-content"}}>CREATE NEW RESERVATION</Button>
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem overflow="auto">
                        <Card variant={"outline"} my={4}>
                            <CardBody px="0">
                                <Grid px='5' py='5' templateColumns='repeat(6 , 1fr)' gap={2} className={styles.secondLine}>
                                    {
                                        data.map((value,index)=>
                                        <GridItem  className={styles.samewidth}>
                                        <FormControl>
                                            <FormLabel fontSize="xs" ps="1" borderRadius="3px">
                                                <b>{value.heading}</b></FormLabel>
                                            <Input type="date" placeholder={value.placeholder} fontSize="12px" fontWeight="500" onChange={(e)=>{
                                                setdateStates({
                                                  ...dateStates,
                                                  [value.placeholder]: moment(e.target.value).format("MMMM DD,YYYY"),
                                                })
                                            }}/>
                                        </FormControl>
                                        </GridItem>
                                        )
                                    }
                                    {/* <GridItem  className={styles.samewidth}>
                                        <FormControl>
                                            <FormLabel fontSize="xs" ps="1" borderRadius="3px"><b>Check-In</b></FormLabel>
                                            <Input type="date" placeholder='checkIn' fontSize="12px" fontWeight="500" />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem className={styles.samewidth}>
                                        <FormControl>
                                            <FormLabel fontSize="xs" ps="1" borderRadius="3px"><b>Check-Out</b></FormLabel>
                                            <Input type="date" placeholder='checkOut' fontSize="12px" fontWeight="500" />
                                        </FormControl>
                                    </GridItem> */}
                                    <GridItem className={styles.samewidth}>
                                        <FormControl>
                                            <FormLabel fontSize="xs" ps="1" borderRadius="3px" display={'flex'}><b>Reservation Source</b> </FormLabel>
                                            <Select bg='#e5e5e5' borderColor='#e5e5e5' fontSize="12px" fontWeight="600" placeholder='Select All Channels'>
                                                <optgroup label="Direct">
                                                    <option color='#ccc' value='Website/Booking Engine'>Website/Booking Engine</option>
                                                    <option color='#ccc' value='>Walk-In'>Walk-In</option>
                                                    <option color='#ccc' value='Phone'>Phone</option>
                                                    <option color='#ccc' value='Email'>Email</option>
                                                    <option color='#ccc' value='Tax Exemption - Deleted'>Tax Exemption - Deleted</option>
                                                    <option color='#ccc' value='Pet Fee - Deleted'>Pet Fee - Deleted</option>
                                                    <option color='#ccc' value='No Cleaning fee - Deleted'>No Cleaning fee - Deleted</option>
                                                    <option color='#ccc' value='Web - Inactive'>Web - Inactive</option>
                                                    <option color='#ccc' value='Red Planet Direct - Inactive'>Red Planet Direct - Inactive</option>
                                                    <option color='#ccc' value='Mobile App - Inactive'>Mobile App - Inactive</option>
                                                    <option color='#ccc' value='Reb Planet Website - Inactive'>Reb Planet Website - Inactive</option>
                                                    <option color='#ccc' value='Blank Source - Inactive'>Blank Source - Inactive</option>
                                                </optgroup>
                                                <optgroup label="Wholeslaer">
                                                    <option color='#ccc' value='Default Corporate Client'>Default Corporate Client</option>
                                                    <option color='#ccc' value='MG Holiday'>MG Holiday</option>
                                                </optgroup>
                                                <optgroup label="OTA">
                                                    <option color='#ccc' value='Default OTA'>Default OTA</option>
                                                    <option color='#ccc' value='Airbnb (API)'>Airbnb (API)</option>
                                                    <option color='#ccc' value='Booking.com(Hotel Collect Booking'>Booking.com(Hotel Collect Booking)</option>
                                                    <option color='#ccc' value='Booking.com(Channel Collect Booking'>Booking.com(Channel Collect Booking)</option>
                                                    <option color='#ccc' value='Expedia(Channel Collect Booking)'>Expedia(Channel Collect Booking)</option>
                                                    <option color='#ccc' value='Expedia(Hotel Collect Booking)'>Expedia(Hotel Collect Booking)</option>
                                                </optgroup>
                                                <optgroup label="Corporate Client">
                                                    <option color='#ccc' value='Default Travel Agent'>Default Travel Agent</option>
                                                    <option color='#ccc' value='Air Asia'>Air Asia</option>
                                                    <option color='#ccc' value='COMP Stay - Inactive'>COMP Stay - Inactive</option>
                                                    <option color='#ccc' value='Corporate Clients - Inactive'>Corporate Clients - Inactive</option>
                                                    <option color='#ccc' value='Owner -Inactive'>Owner -Inactive</option>
                                                    <option color='#ccc' value='Travel Agent'>Travel Agent</option>
                                                </optgroup>
                                                <optgroup label="Travel Agent">
                                                    <option color='#ccc' value='Default Wholesaler'>Default Wholesaler</option>
                                                    <option color='#ccc' value='Dida Travel'>Dida Travel</option>
                                                </optgroup>
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem className={styles.samewidth}>
                                        <FormControl>
                                            <FormLabel fontSize="xs" ps="1" borderRadius="3px" display={'flex'}><b>Status</b></FormLabel>
                                            <Select bg='#e5e5e5' borderColor='#e5e5e5' fontSize="12px" fontWeight="600" placeholder='Select All Channels'>
                                                <option color='#ccc' value='Confirmed'>Confirmed</option>
                                                <option color='#ccc' value='CofirmedPending'>Cofirmed Pending</option>
                                                <option color='#ccc' value='Cancelled'>Cancelled</option>
                                                <option color='#ccc' value='InHouse'>In - House</option>
                                                <option color='#ccc' value='DefaultWholesaler'>Default Wholesaler</option>
                                                <option color='#ccc' value='NoShow'>No - Show</option>
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem display={'flex'} alignItems='center' w="100%" pt="5" className={`${styles.samewidth} ${styles.searchcard}`}>
                                        <FormControl>
                                            <Button w="100%" bg='#e5e5e5' fontWeight="600" borderColor='#e5e5e5' className={styles.searchbutton} onClick={()=>{ runsearch() }}><FaSearch />Search</Button>
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                            </CardBody>
                        </Card>
                        <Card borderTop='5px solid #3366ff' height={'500px'} overflow={'auto'}>
                            <CardBody>
                                <Card py={'1'}>
                                    <CardBody>
                                        <Grid templateColumns='repeat(2 , 1fr)'>
                                            <GridItem>
                                                <Heading size="sm">Reservations</Heading>
                                            </GridItem>
                                            <GridItem display={'flex'} justifyContent={'end'} alignItems={'center'}>
                                                <Box p='1'>
                                                    <FaDownload />
                                                </Box>
                                                <Box p='1'>
                                                    <FaPrint />
                                                </Box>
                                            </GridItem>
                                        </Grid>
                                    </CardBody>
                                </Card>
                                <DataTable columns={columns} data={roomsDetails} pt='20px' />
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Container>
            <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent mx="10px">
                        <AlertDialogHeader fontSize='lg' fontWeight='400'>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDelete}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteplan} ml={3} isLoading={isbuttonloading} loadingText='Deleting...'    disabled={isbuttonloading}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            </>
            )
        }
        </>
    )
}

export default ListReservation