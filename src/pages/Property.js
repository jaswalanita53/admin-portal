import React, { useState, useEffect } from 'react'
import { 
        ChakraProvider, FormControl, Text, FormLabel, Input, Button, Card, CardBody, Container,
        Select, Heading, Grid, GridItem, Tabs, TabList, TabPanels, Tab, 
        TabPanel, Flex, Divider, useDisclosure
    } from "@chakra-ui/react";
import Axios from 'axios';
import SimpleTable from "./SimpleTable";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from "../assets/css/dashboard.module.css"
import RoomCards from '../components/Settings/RoomCards';
import RoomTable from '../components/Settings/RoomTable';
import FadeLoader from "react-spinners/FadeLoader";
import NewAccomodationModal from '../components/Property/NewAccomodationModal';

const boldText = {
    fontWeight: "bold",
};

function Property() {
    const [roomData, setRoomData] = useState();
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    // GET ACCOMODATION DATA FROM DATABASE

    const getRooms = async () => {
        console.log("ghetRooms is run")
        const userToken = localStorage.getItem("userToken");
        const config = {
            method: "get",
            url: process.env.REACT_APP_API_URL + "/Admin/getRooms",
            headers: {
                Authorization: "Bearer " + userToken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
        };
        const response = await Axios(config);
        if (response) {
            console.log(response.data.data)
            const data = response.data.data.map((room) => {

                return {
                    accomodation: room.description, abbreviation: room.abbreviation?room.abbreviation:"NDD", unit: room.totalNumberOfRooms, beds: 'N/A', total: room.totalNumberOfRooms, id: room._id, price: room.pricePerNight, roomType: room.roomName, totalPrice: room.totalPrice
                }
            })
            setRoomData(data)
            setLoading(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const headers = ["ACCOMODATION", "ACCOMODATION ABBREVIATION", "UNITS", "DORM BEDS PER ROOM", "TOTAL ACCOMODATION", "Price", "Action"];

    useEffect(() => {
        getRooms()
    }, [])

    useEffect(()=>{
        getRooms()
    },[isOpen])
    return (
        <>
            {/* <Header /> */}
            <ChakraProvider>
                <Container maxW="container.xxl" px="10" backgroundColor="#ecf2f9" padding="0 2.5rem 2.5rem 2.5rem" >
                    <Tabs>
                        <Flex align="center" pb="5" position="sticky" top="60px" zIndex="docked" backgroundColor="#ecf2f9" >
                            <Heading size="md" className="headingPanel" mr="10">
                                Property
                            </Heading>
                            <TabList borderRadius="2rem" bg="#DDE0E4" marginTop="15px">
                                <Tab
                                    _selected={{
                                        bg: "white", // Set active tab background color to white
                                        color: "blue.500", // Set active tab text color to blue
                                        borderRadius: "30px",
                                        margin: "5px"
                                    }} >
                                    Profile
                                </Tab>
                                <Tab
                                    _selected={{
                                        bg: "white",
                                        color: "blue.500", borderRadius: "30px",
                                        margin: "5px"
                                    }}
                                >
                                    Amenities
                                </Tab>
                                <Tab
                                    _selected={{
                                        bg: "white",
                                        color: "blue.500", borderRadius: "30px",
                                        margin: "5px"
                                    }}
                                >
                                    Accommodations
                                </Tab>
                                <Tab
                                    _selected={{
                                        bg: "white",
                                        color: "blue.500", borderRadius: "30px",
                                        margin: "5px"
                                    }}
                                >
                                    Sources
                                </Tab>
                                <Tab
                                    _selected={{
                                        bg: "white",
                                        color: "blue.500", borderRadius: "30px",
                                        margin: "5px"
                                    }}
                                >
                                    Policies
                                </Tab>
                            </TabList>
                        </Flex>
                        <Card borderTop="4px solid #3366ff" overflow={"auto"}>
                            <CardBody minW="1200px">
                                <TabPanels>
                                    <TabPanel>
                                        <Heading size="md" mb="5">Property  Profile</Heading>
                                        <Text size="md" fontSize="sm" mb="5" css={boldText}>PROPERTY CONTACT INFO </Text>
                                        <form onSubmit={handleSubmit}>
                                            <Grid templateColumns="repeat(2, 1fr)" gap={20}>
                                                <GridItem colSpan={1}>
                                                    {/* Select for Properties */}
                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Property Type</FormLabel>
                                                        <Select placeholder="Select Property Type" mb="2">
                                                            <option value="hotel">Hotel</option>
                                                            <option value="house">House</option>
                                                            <option value="apartment">Apartment</option>
                                                            {/* Add more property options as needed */}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">Property Name</FormLabel>
                                                        <Input type="text" mb="2" placeholder="Enter your name" />
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">Property Email</FormLabel>
                                                        <Input type="email" mb="2" placeholder="Enter your email" />
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">First Name</FormLabel>
                                                        <Input type="text" mb="2" placeholder="David" />
                                                    </FormControl>
                                                </GridItem>

                                                <GridItem colSpan={1}>


                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Property Phone</FormLabel>
                                                        <Input type="tel" mb="2" placeholder="210 456 567" />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Website</FormLabel>
                                                        <Input type="text" mb="2" placeholder="Enter your phone number" />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Last Name</FormLabel>
                                                        <Input type="url" mb="2" placeholder="Enter your website" />
                                                    </FormControl>


                                                </GridItem>
                                            </Grid>
                                            {/* Horizontal Line */}
                                            <Divider orientation="horizontal" mt="5" mb="5" />
                                            <Text size="md" fontSize="sm" mb="5" css={boldText}>PROPERTY ADDRESS </Text>
                                            <Grid templateColumns="repeat(2, 1fr)" gap={20}>
                                                <GridItem colSpan={1}>
                                                    {/* Select for Properties */}
                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Country</FormLabel>
                                                        <Select  mb="2" placeholder="Select your country">
                                                            <option value="usa">United States</option>
                                                            <option value="canada">Canada</option>
                                                            {/* Add more country options as needed */}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">Apt, suit, floor, etc.</FormLabel>
                                                        <Input  mb="2" type="text" placeholder="" />
                                                    </FormControl>

                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">State, Province</FormLabel>
                                                        <Input  mb="2" type="text" placeholder="Texas" />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel mb="0" mt="2">Street Address</FormLabel>
                                                        <Input  mb="2" type="text" placeholder="4236, Rittiman Road" />
                                                    </FormControl>
                                                </GridItem>

                                                <GridItem colSpan={1}>


                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2"> City</FormLabel>
                                                        <Input  mb="2" type="tel" placeholder="San Antario" />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Postal/Zip Code</FormLabel>
                                                        <Input  mb="2" type="text" placeholder="78123" />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel mb="0" mt="2">Last Name</FormLabel>
                                                        <Input  mb="2" type="url" placeholder="Enter your website" />
                                                    </FormControl>


                                                </GridItem>
                                            </Grid>
                                            <Button type="submit" colorScheme="blue" mt="5">
                                                Update
                                            </Button>
                                        </form>

                                    </TabPanel>
                                    <TabPanel>
                                        <Heading size="md">Sources</Heading>
                                    </TabPanel>
                                    <TabPanel>
                                        <Flex justifyContent="space-between"  >
                                            <Button className={styles.button} mb="5" background="#32c0a0" color="#fff" borderRadius="10px" fontSize="12px"
                                            onClick={onOpen}
                                             > NEW ACCOMODATION TYPE </Button>
                                            <p fontSize='md' mb="5" style={{ 'background': '#f5f5f5', 'color': '#000', 'border-radius': '10px', 'margin-bottom': '20px', 'border': '1px solid #e9e1e1', 'padding': '10px 9px', 'text-align': 'justify' }} ><b>Tip:</b> You can click and drag accomodation types to reorder them </p>
                                            {isOpen && <NewAccomodationModal isOpen={isOpen} onClose={onClose} />}
                                        </Flex>


                                        <DndProvider backend={HTML5Backend}>
                                            <div>
                                                {loading ?
                                                    <>
                                                        <div className='dataloading'>
                                                            <FadeLoader color="#38B2AC" />
                                                        </div>
                                                    </>
                                                    : (
                                                        roomData && <SimpleTable headers={headers} roomsData={roomData} getRooms={getRooms} />)}
                                            </div>
                                        </DndProvider>

                                        <RoomCards />
                                        <RoomTable />

                                    </TabPanel>
                                    <TabPanel>
                                    </TabPanel>
                                    <TabPanel>
                                        <Heading size="md">Policies</Heading>
                                    </TabPanel>
                                </TabPanels>

                            </CardBody>
                        </Card>
                    </Tabs>

                </Container>
            </ChakraProvider>
        </>
    )
}

export default Property