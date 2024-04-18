import * as React from 'react'
import { FormControl, FormLabel, Button, Card, CardBody, Grid, GridItem, Container, Heading, Select, Flex, Spinner,Text } from "@chakra-ui/react";
import Axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Header from '../components/Header/Header'
import { DataTable } from '../common/dataTables.js';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function ManageMaintanance() {
      const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();
    const navigate = useNavigate();
    const [propertiesDetails, setPropertiesDetails] = React.useState([])
    const [roomsDetails, setRoomsDetails] = React.useState([])
    const [roomsType, setRoomTypes] = React.useState([])
    const [loading, setLoading] =React.useState(false)
    const [buttonLoading, setButtonloading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        getAllProperties();
        getRoomsType();
    }, [])
    async function handleRoomTypes(data1) {
        setButtonloading(true)
        const userToken = localStorage.getItem('userToken')
        const data = { "propertyKey": data1.selectproperty, "roomTypes": data1.roomtype }
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getRoomsTypeById',
            params: data,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        const response = await Axios(config)
        if (response.status) {
            let data = []
            response.data.data.forEach((value, index) => {
                data.push({
                    'roomName': value.roomName,
                    'roomType': value.roomType,
                    'condition': ['Clean', 'Dirty'],
                    'roomStatus': "Vacant",
                    "arrivalTime": "-",
                    "arrivalDate": '-',
                    'departureDate': '-',
                    'frontDeskStatus': '-',
                    'assignedTo': ['abc', 'bcd', 'def'],
                    'doNotDisturb': false,
                    'accomodationComment': "there is my first text."
                })
            })
            setRoomsDetails(data)
        }
                setButtonloading(false)
        
    }
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("roomName", {
            cell: (info) => info.getValue(),
            header: "ROOM",
        }),
        columnHelper.accessor("roomType", {
            cell: (info) => info.getValue(),
            header: "TYPE"
        }),
        columnHelper.accessor("condition", {
            cell: (info) => <Select 
            fontSize = 'sm' > 
             <option disabled={true} selected>Select option</option>
         
             {
                    info.getValue().map((index, value) => (
                <option value={value} >{index}</option>
            ))}</Select>,
            header: "CONDITION",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("roomStatus", {
            cell: (info) => info.getValue(),
            header: "ROOM STATUS",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("arrivalDate", {
            cell: (info) => info.getValue(),
            header: "ARRIVAL DATE",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("departureDate", {
            cell: (info) => info.getValue(),
            header: "DEPARTURE DATE",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("frontdeskStatus", {
            cell: (info) => info.getValue(),
            header: "FRONTDESK STATUS",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("assignedTo", {
            cell: (info) => <Select  fontSize = 'sm' > 
            <option disabled={true} selected> Select option </option>
            {
                    info.getValue().map((index, value) => (
                <option value={value}>{index}</option>
            ))}</Select>,
            header: "ASSIGNED TO",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("doNotDisturb", {
            cell: (info) => info.getValue(),
            header: "DO NOT DISTURB",
        }),
        columnHelper.accessor("accommodationComments", {
            cell: (info) => info.getValue(),
            header: "ACCOMMODATION COMMENTS",
            meta: {
                isNumeric: false
            }
        }),
    ];
    async function getRoomsType() {
        const userToken = localStorage.getItem('userToken')
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getRoomsType',
            params: {},
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        const response = await Axios(config);
        if (response.status) {
            setRoomTypes(response.data.data)
            setLoading(false)
        }
    }
    async function getAllProperties() {
        const userToken = localStorage.getItem('userToken')
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getAllProperties',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }
        const response = await Axios(config)
        if (response.status) {
            setPropertiesDetails(response.data.data)
        }
    }
    return (
        <>
            {/* <Header /> */}
            <Container maxW="container.xxl">
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <GridItem w='100%' pt="6" >
                        <Flex flexWrap="wrap" justifyContent="space-between" height="fit-content" rowGap="20px" columnGap="30px">
                            <GridItem display="flex" alignItems="center">
                                <Heading size='lg'>Manage Maintenance</Heading>
                            </GridItem>
                            <GridItem display={"flex"} justifyContent="end" >
                                <Button background='#3366ff' color='#fff' borderRadius='10px' fontSize="12px" 
                                 onClick={() =>{navigate("/admin/reservation/createMaintenance")}}
                                // onClick={(e) => window.location.href = "/admin/reservation/createMaintenance"}
                                >Create Maintenance</Button>
                            </GridItem>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Card border="1px solid #ccc" style={loginStyleContainer}>
                            <CardBody>
                                <Flex justifyContent="space-between" alignItems="flex-end" gap="20px" flexWrap="wrap">
                                    <GridItem  minW="250px" flex="30%">
                                        <FormControl>
                                            <FormLabel ml="2" fontSize={'xs'}>Property</FormLabel>
                                            <Select placeholder= "Select Properties" icon={loading?<Spinner />:""}  fontSize={'sm'} 
                                            // onChange={(e) => }
                                            {...register("selectproperty",{required:true})}
                                            >
                                                
                                                {
                                                    propertiesDetails?.map((value, index) => (
                                                        <option value={value?.id} key={index}>{value?.propertyName}</option>
                                                    ))
                                                }
                                            </Select>
                                                {errors.selectproperty && (
                                                <Text color="red" fontSize="xs">
                                                Please select a Property
                                                </Text>
                                            )}
                                        </FormControl>
                                    </GridItem>
                                    <GridItem  minW="250px" flex="30%">
                                        <FormControl>
                                            <FormLabel ml="2" fontSize={'xs'}>Rooms Type</FormLabel>
                                            <Select placeholder=" Select Rooms Type" 
                                            icon = {loading ? < Spinner / > : ""}
                                            fontSize = {'sm'}
                                            {...register("roomtype",{required:true})}
                                            >
                                                {
                                                    roomsType?.map((value, index) => (
                                                        <option value={value?._id} key={index}>{value?.roomType}</option>
                                                    ))
                                                }
                                            </Select>
                                             {errors.roomtype && ( 
                                                <Text color="red" fontSize="xs">
                                                    Please select a Roomtype
                                                </Text>
                                                )}
                                        </FormControl>
                                    </GridItem>
                                    <GridItem  minW="250px" maxW={{base:"100%", sm:"50%"}} flex="30%">
                                        <Button width="100%" background='#32c0a0' color='#fff' onClick={handleSubmit(handleRoomTypes)} borderRadius='7px'
                                         isLoading={buttonLoading}
                                         loadingText = 'Searching...'
                                         
                                        >Search</Button>
                                    </GridItem>
                                </Flex>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem overflow="auto" border="1px solid #ccc">
                        <Card boxShadow="none">
                            <CardBody>
                                <DataTable columns={columns} data={roomsDetails} pt='20px' />
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Container>
        </>
    )
}

const loginStyleContainer = {
    boxShadow: "2px 2px 2px 2px #dbdcdd"
}
export default ManageMaintanance