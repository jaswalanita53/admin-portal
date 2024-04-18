import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Collapse } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, useToast,
    TableContainer,
} from '@chakra-ui/react'
import { Button, Card, CardBody, Grid, FormErrorMessage, GridItem, Heading, Stack, Box, FormControl, FormLabel, Input, Flex, Radio, RadioGroup, } from "@chakra-ui/react";
import { tableData } from './assets/tabledata';
import { FaAngleDown, FaRegSquareMinus, FaRegSquarePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { Formik, Field, useFormikContext } from "formik";
import { add, format } from 'date-fns';
import Axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import Swal from 'sweetalert2';

const TabsCom = ({ props }) => {
    const toast = useToast();
    const [selectedTab, setSelectedTab] = useState('Double Non Smoking Room');
    const [editMode, seteditMode] = useState(false)
    const [dataLoading, setDataLoading] = useState(false);
    const [dataEditLoading, setDataEditLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const [tabData, setTabData] = useState(null);
    const [modalData, setmodalData] = useState(null)
    const userToken = localStorage.getItem("userToken");
    let currentDate = new Date()
    let yesterday = new Date(currentDate)
    yesterday.setDate(yesterday.getDate() + 1)
    let minDate = format(yesterday, 'yyyy-MM-dd');

    const [startDate, setEStartDate] = useState(minDate)
    const [endDate, setEndDate] = useState(minDate);


    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setShow(false);
        seteditMode(false);
        setdata(dummydata);
        // fetchIntervals();
    }

    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        setEndDate(selectedValue)
    }

    const fetchIntervals = async () => {
        try {
            const config = {
                method: 'get',
                params: { selectedTab: selectedTab },
                url: process.env.REACT_APP_API_URL + '/admin/getInterval',
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Header': '*',
                }
            };
            // Set loading to true when starting the request
            setDataLoading(true)

            const response = await Axios(config);
            if (response === undefined) {
                setTabData([]);
            } else {
                setTabData(response.data.data);
            }
            // Set loading to false when the request is completed (success or failure)
            setDataLoading(false)
        } catch (error) {
            // Set loading to false in case of an error
            setDataLoading(false)
        }
    };


    useEffect(() => {
        fetchIntervals();
    }, [selectedTab])


    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
    const [show, setShow] = useState(false)
    const handleAccordionToggle = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };

    const dummydata = {
        intervalName: "",
        startDate: "",
        endDate: "",
        minLos: 0,
        maxLos: 0,
        commonPrice: 0,
        sun: 100,
        mon: 100,
        tue: 100,
        wed: 100,
        thu: 100,
        fri: 100,
        sat: 100,
        selectedTab: selectedTab,
        editId: ''
    }

    const [data, setdata] = useState(dummydata);
    const [radios, setRadios] = useState({
        closedToArrival: false,
        closedToDeparture: false
    })
    // const { values } = useFormikContext();

    const changeData = (e) => {
        setRadios({
            ...radios,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (e) =>{
        setdata({ ...data, intervalName: e.target.value});
    }


    const handleAfterSubmit = async (data1) => {
        const userToken = localStorage.getItem('userToken')
        const combineData = {
            ...data1,
            ...radios,
            selectedTab,
        }

        // runApi
        let apiUrl = process.env.REACT_APP_API_URL + '/admin/saveInterval';

        // Check if in edit mode and update the API URL
        if (editMode) {
            apiUrl = process.env.REACT_APP_API_URL + '/admin/updateInterval';
        }


        const config = {
            method: 'post',
            url: apiUrl,
            data: combineData,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        try {
            setAddLoading(true);
            const response = await Axios(config);
            if (response.status) {
                toast({
                    position: 'top',
                    title: response.data.message,
                    duration: 1000,
                    isClosable: true,
                    containerStyle: {
                        width: '400px',
                        maxWidth: '100%',
                    },
                })
            }
            setdata(dummydata)
            setShow(false)
            fetchIntervals();
            setAddLoading(false);
        } catch (error) {
            setAddLoading(false);
        }

    }

    const editInterval = async (editId, selectedTab) => {
        const config = {
            method: 'get',
            params: { selectedTab: selectedTab, editId: editId },
            url: process.env.REACT_APP_API_URL + '/admin/editInterval',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        try {

            setDataEditLoading(true);
            const response = await Axios(config);
            setmodalData(response?.data?.data[0]);
            setdata({
                intervalName: response?.data?.data[0].intervalName,
                startDate: response?.data?.data[0].startDate,
                endDate: response?.data?.data[0].endDate,
                minLos: response?.data?.data[0].minLos,
                maxLos: response?.data?.data[0].maxLos,
                commonPrice: response?.data?.data[0].commonPrice,
                editId: response?.data?.data[0].intervalName,
                sun: response?.data?.data[0].sun,
                mon: response?.data?.data[0].mon,
                tue: response?.data?.data[0].tue,
                wed: response?.data?.data[0].wed,
                thu: response?.data?.data[0].thu,
                fri: response?.data?.data[0].fri,
                sat: response?.data?.data[0].sat,
            })
            setShow(true)
            seteditMode(true)
            setDataEditLoading(false)
            // setLoading(false)
            // window.scrollTo({ top: 5, behavior: 'smooth' });
        } catch (error) {
            setDataEditLoading(false)
        }

    }


    const addHandler = () => {
        setdata(dummydata);
        setDataEditLoading(true);
        setTimeout(() => {
            setDataEditLoading(false);
            setShow(true);
        }, 1000);
        seteditMode(false)
    }

    const isEmpty = (value) => value === "" || value === 0;
    const areAllPropertiesEmpty = (obj, excludedValues) => {
        for (const key in obj) {
            if (!excludedValues.includes(key) && isEmpty(obj[key])) {
              return true; // If any property is empty or 0, return true
            }
          }
        return false; // All properties are empty
      };


    const copyHandler = () =>{
        const excludedValues = ["editId", "commonPrice"];
        const isDataEmpty = areAllPropertiesEmpty(data, excludedValues);
        if(!isDataEmpty){
            const jsonString = JSON.stringify(data);
            navigator.clipboard.writeText(jsonString)
            .then(() => {
              toast({
                position: 'top',
                title: "Intervel copied successfully",
                duration: 1000,
                isClosable: true,
                containerStyle: {
                  width: '400px',
                  maxWidth: '100%',
                },
              });
            })
            .catch((error) => {
             //
            });
        }
        else {
            toast({
                position: 'top',
                title: "Please add and fill in the interval first.",
                duration: 1000,
                isClosable: true,
                containerStyle: {
                    width: '400px',
                    maxWidth: '100%',
                },
            });
        }
    }

    const editHandler = (editId) => {
        editInterval(editId, selectedTab);
    }


    const deleteInterval = async (deleteId, selectedTab) => {
        const config = {
            method: 'post',
            params: { selectedTab: selectedTab, deleteId: deleteId },
            url: process.env.REACT_APP_API_URL + '/admin/deleteInterval',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        try {
            setDeleteLoading(true);
            setLoadingStates((prevLoadingStates) => ({ ...prevLoadingStates, [deleteId]: true }));
            const response = await Axios(config);

            if (response.status) {
                toast({
                    position: 'top',
                    title: response.data.message,
                    duration: 1000,
                    isClosable: true,
                    containerStyle: {
                        width: '400px',
                        maxWidth: '100%',
                    },
                })
                fetchIntervals();
            }
            setDeleteLoading(false);
            setLoadingStates((prevLoadingStates) => ({ ...prevLoadingStates, [deleteId]: false }));

        } catch (error) {
            setDeleteLoading(false);
            setLoadingStates((prevLoadingStates) => ({ ...prevLoadingStates, [deleteId]: false }));
        }

    }
    const handleDelete = (deleteId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will want to remove this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteInterval(deleteId, selectedTab)
                //   Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            }
        });


    }


    const handleInputChange = (event, setValues) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setValues((prevValues) => ({...prevValues,[name]: newValue}));
        setdata((prevValues) => ({...prevValues,[name]: newValue}));
    };



    return (
        <Tabs>
            <TabList>
                <Tab className="custom-tab"
                 key={'Double Non Smoking Room'} 
                onClick={() => handleTabClick('Double Non Smoking Room')}
                >Double Non Smoking Room</Tab>
                <Tab className="custom-tab" key={'Double Smoking Room'} onClick={() => handleTabClick('Double Smoking Room')}>Double Smoking Room</Tab>
                <Tab className="custom-tab" key={'Deluxe Room'} onClick={() => handleTabClick('Deluxe Room')}>Deluxe Room</Tab>
                <Tab className="custom-tab" key={'Twin Room'} onClick={() => handleTabClick('Twin Room')}>Twin Room</Tab>
            </TabList>

            <Heading size="md" className="headingPanel" color='#4a5568' mb="3" mt="3">
                DATE RANGES, RATES AND RESTRICTIONS
            </Heading>

            <Grid templateColumns={'repeat(1,1fr)'}>
                <GridItem pb={3}>
                    <Button onClick={() => addHandler()} background='#32c0a0' color='#fff' borderRadius='20px' fontSize="12px" mr="3"><FaPlus color="#fff" px={2} /> <span>ADD INTERVAL</span>
                    </Button>
                    <Button onClick={() => copyHandler()}  background='#DDE0E4' color='#4a5568' borderRadius='20px' fontSize="12px"><span>COPY INTERVAL</span> <FaAngleDown color="#4a5568" px={2} />
                    </Button>
                </GridItem>
            </Grid>
            {dataEditLoading ?
                <> <Card borderTop="4px solid #3366ff" overflow={"auto"} >
                    <CardBody >

                        <div className='dataloading'>
                            <FadeLoader color="#38B2AC" />
                        </div>

                    </CardBody>
                </Card>
                </>
                :
                <>
                    {
                        show ?
                            <> <Card borderTop="4px solid #3366ff" overflow={"auto"} >
                                <CardBody minW="1200px">
                                    <Formik
                                        initialValues={data}
                                        onSubmit={(values) => {
                                            handleAfterSubmit(values)
                                        }}
                                       
                                    >
                                        {({ handleSubmit, errors, touched ,setValues }) => (
                                            <form onSubmit={handleSubmit} >
                                                <Flex justify="space-between" w="70%">
                                                    <FormControl w="40%" mt="4" isInvalid={!!errors.intervalName && touched.intervalName}>
                                                        <FormLabel htmlFor="intervalName">Interval Name</FormLabel>
                                                        <Field
                                                            as={Input}
                                                            id="intervalName"
                                                            name="intervalName"
                                                            type="text"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value.length < 3) {
                                                                    error = "Please enter an Interval Name";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.intervalName}</FormErrorMessage>
                                                    </FormControl>


                                                    <FormControl mt="4" w="25%" isInvalid={!!errors.startDate && touched.startDate}>
                                                        <FormLabel htmlFor="startDate">Start Date</FormLabel>
                                                        <Field as={Input}
                                                            type="date"
                                                            id="startDate"
                                                            name="startDate"
                                                            min={minDate}
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            onSelect={(event) => handleDateChange(event)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value.length === 0) {
                                                                    error = "Please enter a Start Date";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                                                    </FormControl>

                                                    <FormControl mt="4" w="25%" isInvalid={!!errors.endDate && touched.endDate} >
                                                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="date"
                                                            id="endDate"
                                                            name="endDate"
                                                            min={endDate}
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value.length === 0) {
                                                                    error = "Please enter a End Date";
                                                                }
                                                                return error;
                                                            }} />
                                                        <FormErrorMessage>{errors.endDate}</FormErrorMessage>
                                                    </FormControl>
                                                </Flex>
                                                <Flex justify="space-between" w="70%">
                                                    <FormControl w="20%" mt="4" isInvalid={!!errors.minLos && touched.minLos}>
                                                        <FormLabel htmlFor="minLos">Min LOS</FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="number"
                                                            placeholder="1"
                                                            name="minLos"
                                                            id="minLos"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0) {
                                                                    error = "Please enter a Minimum Length of stay";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.minLos}</FormErrorMessage>
                                                    </FormControl>

                                                    <FormControl mt="4" w="20%" isInvalid={!!errors.maxLos && touched.maxLos}>
                                                        <FormLabel htmlFor='maxLos'>Max LOS</FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="Number"
                                                            placeholder="1"
                                                            name="maxLos"
                                                            id="maxLos"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            // validate={(value) => {
                                                            //     let error;
                                                            //     if (value === 0) {
                                                            //         error = "Please enter a Maximum Length of stay";
                                                            //     }
                                                            //     return error;
                                                            // }} 
                                                            />
                                                        <FormErrorMessage>{errors.maxLos}</FormErrorMessage>
                                                    </FormControl>

                                                    <FormControl mt="4" w="25%" >
                                                        <FormLabel>Closed To Arrival</FormLabel>
                                                        <RadioGroup defaultValue={modalData?.closedToArrival.toString() ?? 'false'}>
                                                            <Stack spacing='24px' direction="row">
                                                                <Radio
                                                                    value="true"
                                                                    name="closedToArrival"
                                                                    onChange={changeData}
                                                                    // onChange={(event) => handleInputChange(event, setValues)}
                                                                >Yes</Radio>
                                                                <Radio
                                                                    value="false"
                                                                    name="closedToArrival"
                                                                    onChange={changeData}>No</Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormControl mt="4" w="25%">
                                                        <FormLabel>Closed To Departure</FormLabel>
                                                        <RadioGroup defaultValue={modalData?.closedToDeparture.toString() ?? 'false'}>

                                                            <Stack spacing='24px' direction="row">
                                                                <Radio
                                                                    value="true"

                                                                    name="closedToDeparture"
                                                                    onChange={changeData}
                                                                >Yes</Radio>

                                                                <Radio name="closedToDeparture" value="false" onChange={changeData} >No</Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Flex>
                                                <Flex justify="space-between" w="80%">
                                                    <FormControl w="20%" mt="4" mr="2" isInvalid={!!errors.commonPrice && touched.commonPrice}>
                                                        <FormLabel htmlFor='commonPrice'>Price </FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="Number"
                                                            name="commonPrice"
                                                            // value={modalData?.commonPrice}
                                                            id="maxLos"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                        />
                                                        <FormErrorMessage>{errors.commonPrice}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl w="20%" mt="4"  >
                                                        <FormLabel >Apply To All </FormLabel>
                                                        <ApplyAll />
                                                    </FormControl>
                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.sun && touched.sun} >
                                                        <FormLabel htmlFor='sun'>SUN </FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="Number"
                                                            name="sun"
                                                            id="sun"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for sunday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.sun}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl w="10%" mt="4" mr="2"
                                                        isInvalid={!!errors.mon && touched.mon}>
                                                        <FormLabel htmlFor="mon">MON </FormLabel>
                                                        <Field as={Input} type="Number"
                                                            name="mon" id="mon"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for mon";
                                                                }
                                                                return error;
                                                            }} />

                                                        <FormErrorMessage>{errors.mon}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.tue && touched.tue}>
                                                        <FormLabel htmlFor="tue">TUE </FormLabel>
                                                        <Field as={Input}
                                                            type="Number"
                                                            name="tue" id="tue"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for Tuesday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.tue}</FormErrorMessage>
                                                    </FormControl>

                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.wed && touched.wed} >
                                                        <FormLabel htmlFor="wed">WED </FormLabel>
                                                        <Field
                                                            as={Input}
                                                            type="Number"
                                                            name="wed"
                                                            id="wed"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for Wednesday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.tue}</FormErrorMessage>
                                                    </FormControl>

                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.thu && touched.thu}>
                                                        <FormLabel htmlFor='thu'> THUR </FormLabel>

                                                        <Field as={Input}
                                                            type="Number"
                                                            name="thu"
                                                            id="thu"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for Wednesday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.thu}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.fri && touched.fri}>
                                                        <FormLabel htmlFor="fri">FRI </FormLabel>

                                                        <Field as={Input}
                                                            type="Number"
                                                            name="fri"
                                                            id="fri"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for Friday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.fri}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl w="10%" mt="4" mr="2" isInvalid={!!errors.sat && touched.sat}>
                                                        <FormLabel>SAT </FormLabel>
                                                        <Field as={Input}
                                                            name="sat"
                                                            type="Number"
                                                            id="sat"
                                                            onChange={(event) => handleInputChange(event, setValues)}
                                                            validate={(value) => {
                                                                let error;
                                                                if (value === 0 || value === "") {
                                                                    error = "Please enter a Price for Saturday";
                                                                }
                                                                return error;
                                                            }}
                                                        />
                                                        <FormErrorMessage>{errors.sat}</FormErrorMessage>
                                                    </FormControl>
                                                </Flex>

                                                <FormControl mt="4" w="100%" display="flex" justifyContent="flex-end" >
                                                    <Button background={addLoading ? "#cecece" : "#32c0a0"} color='#fff' borderRadius='20px' fontSize="12px" mr="3" type="submit">
                                                        {addLoading ?
                                                            <>
                                                                <div className='addloading'>
                                                                    <FadeLoader color="#38B2AC" />
                                                                </div> </> :
                                                            <span>{editMode ? 'UPDATE INTERVAL' : 'SAVE INTERVAL'}</span>
                                                        }
                                                    </Button>
                                                    <Button onClick={() => setShow(false)} background='#cecece' color='#fff' borderRadius='20px' fontSize="12px" mr="3"> <span>CANCEL</span>
                                                    </Button>
                                                </FormControl>
                                            </form>
                                        )}
                                    </Formik>
                                </CardBody>
                            </Card>
                            </> : null
                    }
                </>
            }
            <TabPanels>
                <TabPanel paddingLeft="0" paddingRight="0" >
                    <Card borderTop="4px solid #3366ff" overflow={"auto"}>
                        <CardBody minW="1200px">
                            <Heading size="md" color='#4a5568' className="headingPanel" mb="7">
                                Intervals
                            </Heading>
                            <TableContainer height="400px" overflowY="auto">
                                <Table variant='simple' className='baserate-table'>
                                    <Thead position="sticky" top={0} marginTop="0" zIndex="docked" backgroundColor="#f7fafc">
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>start date</Th>
                                            <Th>end date</Th>
                                            <Th>min los</Th>
                                            <Th>max los</Th>
                                            <Th>days of week</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {/* {tableData.map((rowData, index) => ( */}
                                        {dataLoading ?
                                            <Tr>
                                                <Td colSpan="7">
                                                    <div className='dataloading'>
                                                        <FadeLoader color="#38B2AC" />
                                                    </div>
                                                </Td>
                                            </Tr>

                                            : <>
                                                {tabData && tabData.length > 0 ? (<>
                                                    {tabData?.map((rowData, index) => (
                                                        <React.Fragment key={index}>
                                                            <Tr>
                                                                <Td>
                                                                    <div className='' style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '4px' }}>
                                                                        {openAccordionIndex === index ? (
                                                                            <FaRegSquareMinus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        ) : (
                                                                            <FaRegSquarePlus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        )}
                                                                        <span>{rowData.intervalName}</span>

                                                                    </div>
                                                                </Td>
                                                                <Td>{rowData.startDate}</Td>
                                                                <Td>{rowData.endDate}</Td>
                                                                <Td>{rowData.minLos}</Td>
                                                                <Td>{rowData.maxLos}</Td>
                                                                <Td>Sun, Mon, Tue, Wed, Thu, Fri, Sat</Td>
                                                                <Td>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} mr="3" onClick={() => editHandler(rowData.intervalName)}>
                                                                        <FaEdit fontSize="16px" />
                                                                    </Button>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} onClick={() => handleDelete(rowData.intervalName)}>
                                                                        {loadingStates[rowData.intervalName] && deleteLoading ?
                                                                            <>
                                                                                <div className='deletloading'>
                                                                                    <FadeLoader color="#38B2AC" />
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <TiDelete fontSize="16px" />
                                                                        }

                                                                    </Button>


                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td colSpan={7}>
                                                                    <Collapse in={openAccordionIndex === index}>
                                                                        <Box p="4" borderWidth="1px" borderRadius="md">
                                                                            <ul className='baseRate'>
                                                                                <li>Sun <span>${rowData.sun}</span></li>
                                                                                <li>Mon <span>${rowData.mon}</span></li>
                                                                                <li>Tues <span>${rowData.tue}</span></li>
                                                                                <li>Wed <span>${rowData.wed}</span></li>
                                                                                <li>Thur <span>${rowData.thu}</span></li>
                                                                                <li>Fri <span>${rowData.fri}</span></li>
                                                                                <li>Sat <span>${rowData.sat}</span></li>

                                                                            </ul>
                                                                        </Box>
                                                                    </Collapse>
                                                                </Td>
                                                            </Tr>
                                                        </React.Fragment>
                                                    ))}
                                                </>)
                                                    :
                                                    <Tr>
                                                        <Td colSpan="7">
                                                            <div>No data</div>
                                                        </Td>
                                                    </Tr>

                                                }
                                            </>}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel paddingLeft="0" paddingRight="0">
                    <Card borderTop="4px solid #3366ff" overflow={"auto"}>
                        <CardBody minW="1200px">
                            <Heading size="md" color='#4a5568' className="headingPanel" mb="7">
                                Intervals
                            </Heading>
                            <TableContainer height="400px" overflowY="auto">
                                <Table variant='simple' className='baserate-table'>
                                    <Thead  position="sticky" top={0} marginTop="0" zIndex="docked" backgroundColor="#f7fafc">
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>start date</Th>
                                            <Th>end date</Th>
                                            <Th>min los</Th>
                                            <Th>max los</Th>
                                            <Th>days of week</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        {/* {tableData.map((rowData, index) => ( */}
                                        {dataLoading ?
                                            <Tr>
                                                <Td colSpan="7">
                                                    <div className='dataloading'>
                                                        <FadeLoader color="#38B2AC" />
                                                    </div>
                                                </Td>
                                            </Tr>

                                            : <>
                                                {tabData && tabData.length > 0 ? (<>
                                                    {tabData?.map((rowData, index) => (
                                                        <React.Fragment key={index}>
                                                            <Tr>
                                                                <Td>
                                                                    <div className='' style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '4px' }}>
                                                                        {openAccordionIndex === index ? (
                                                                            <FaRegSquareMinus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        ) : (
                                                                            <FaRegSquarePlus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        )}
                                                                        <span>{rowData.intervalName}</span>

                                                                    </div>
                                                                </Td>
                                                                <Td>{rowData.startDate}</Td>
                                                                <Td>{rowData.endDate}</Td>
                                                                <Td>{rowData.minLos}</Td>
                                                                <Td>{rowData.maxLos}</Td>
                                                                <Td>Sun, Mon, Tue, Wed, Thu, Fri, Sat</Td>
                                                                <Td>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} mr="3" onClick={() => editHandler(rowData.intervalName)} >
                                                                        <FaEdit fontSize="16px" />
                                                                    </Button>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} onClick={() => handleDelete(rowData.intervalName)}>
                                                                        {loadingStates[rowData.intervalName] && deleteLoading ?
                                                                            <>
                                                                                <div className='deletloading'>
                                                                                    <FadeLoader color="#38B2AC" />
                                                                                </div> </> :
                                                                            <TiDelete fontSize="16px" />
                                                                        }
                                                                    </Button>

                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td colSpan={7}>
                                                                    <Collapse in={openAccordionIndex === index}>
                                                                        <Box p="4" borderWidth="1px" borderRadius="md">
                                                                            <ul className='baseRate'>
                                                                                <li>Sun <span>${rowData.sun}</span></li>
                                                                                <li>Mon <span>${rowData.mon}</span></li>
                                                                                <li>Tues <span>${rowData.tue}</span></li>
                                                                                <li>Wed <span>${rowData.wed}</span></li>
                                                                                <li>Thur <span>${rowData.thu}</span></li>
                                                                                <li>Fri <span>${rowData.fri}</span></li>
                                                                                <li>Sat <span>${rowData.sat}</span></li>

                                                                            </ul>
                                                                        </Box>
                                                                    </Collapse>
                                                                </Td>
                                                            </Tr>
                                                        </React.Fragment>
                                                    ))}
                                                </>)
                                                    :
                                                    <Tr>
                                                        <Td colSpan="7">
                                                            <div>No data</div>
                                                        </Td>
                                                    </Tr>

                                                }
                                            </>}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel paddingLeft="0" paddingRight="0">
                    <Card borderTop="4px solid #3366ff" overflow={"auto"}>
                        <CardBody minW="1200px">
                            <Heading size="md" color='#4a5568' className="headingPanel" mb="7">
                                Intervals
                            </Heading>
                            <TableContainer height="400px" overflowY="auto">
                                <Table variant='simple' className='baserate-table'>
                                    <Thead  position="sticky" top={0} marginTop="0" zIndex="docked" backgroundColor="#f7fafc">
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>start date</Th>
                                            <Th>end date</Th>
                                            <Th>min los</Th>
                                            <Th>max los</Th>
                                            <Th>days of week</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {/* {tableData.map((rowData, index) => ( */}
                                        {dataLoading ?
                                            <Tr>
                                                <Td colSpan="7">
                                                    <div className='dataloading'>
                                                        <FadeLoader color="#38B2AC" />
                                                    </div>
                                                </Td>
                                            </Tr>

                                            : <>
                                                {tabData && tabData.length > 0 ? (<>
                                                    {tabData?.map((rowData, index) => (
                                                        <React.Fragment key={index}>
                                                            <Tr>
                                                                <Td>
                                                                    <div className='' style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '4px' }}>
                                                                        {openAccordionIndex === index ? (
                                                                            <FaRegSquareMinus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        ) : (
                                                                            <FaRegSquarePlus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        )}
                                                                        <span>{rowData.intervalName}</span>

                                                                    </div>
                                                                </Td>
                                                                <Td>{rowData.startDate}</Td>
                                                                <Td>{rowData.endDate}</Td>
                                                                <Td>{rowData.minLos}</Td>
                                                                <Td>{rowData.maxLos}</Td>
                                                                <Td>Sun, Mon, Tue, Wed, Thu, Fri, Sat</Td>
                                                                <Td>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} mr="3" >
                                                                        <FaEdit fontSize="16px" onClick={() => editHandler(rowData.intervalName)} />
                                                                    </Button>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} onClick={() => handleDelete(rowData.intervalName)}>
                                                                        {loadingStates[rowData.intervalName] && deleteLoading ?
                                                                            <>
                                                                                <div className='deletloading'>
                                                                                    <FadeLoader color="#38B2AC" />
                                                                                </div> </> :
                                                                            <TiDelete fontSize="16px" />
                                                                        }
                                                                    </Button>

                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td colSpan={7}>
                                                                    <Collapse in={openAccordionIndex === index}>
                                                                        <Box p="4" borderWidth="1px" borderRadius="md">
                                                                            <ul className='baseRate'>
                                                                                <li>Sun <span>${rowData.sun}</span></li>
                                                                                <li>Mon <span>${rowData.mon}</span></li>
                                                                                <li>Tues <span>${rowData.tue}</span></li>
                                                                                <li>Wed <span>${rowData.wed}</span></li>
                                                                                <li>Thur <span>${rowData.thu}</span></li>
                                                                                <li>Fri <span>${rowData.fri}</span></li>
                                                                                <li>Sat <span>${rowData.sat}</span></li>

                                                                            </ul>
                                                                        </Box>
                                                                    </Collapse>
                                                                </Td>
                                                            </Tr>
                                                        </React.Fragment>
                                                    ))}
                                                </>)
                                                    :
                                                    <Tr>
                                                        <Td colSpan="7">
                                                            <div>No data</div>
                                                        </Td>
                                                    </Tr>

                                                }
                                            </>}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </TabPanel>
                <TabPanel paddingLeft="0" paddingRight="0">
                    <Card borderTop="4px solid #3366ff" overflow={"auto"}>
                        <CardBody minW="1200px">
                            <Heading size="md" color='#4a5568' className="headingPanel" mb="7">
                                Intervals
                            </Heading>
                            <TableContainer height="400px" overflowY="auto">
                                <Table variant='simple' className='baserate-table'>
                                    <Thead  position="sticky" top={0} marginTop="0" zIndex="docked" backgroundColor="#f7fafc">
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>start date</Th>
                                            <Th>end date</Th>
                                            <Th>min los</Th>
                                            <Th>max los</Th>
                                            <Th>days of week</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {/* {tableData.map((rowData, index) => ( */}
                                        {dataLoading ?

                                            <Tr>
                                                <Td colSpan="7">
                                                    <div className='dataloading'>
                                                        <FadeLoader color="#38B2AC" />
                                                    </div>
                                                </Td>
                                            </Tr>

                                            : <>
                                                {tabData && tabData.length > 0 ? (
                                                    tabData?.map((rowData, index) => (
                                                        <React.Fragment key={index}>
                                                            <Tr>
                                                                <Td>
                                                                    <div className='' style={{ 'display': 'flex', 'alignItems': 'center', 'gap': '4px' }}>
                                                                        {openAccordionIndex === index ? (
                                                                            <FaRegSquareMinus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        ) : (
                                                                            <FaRegSquarePlus onClick={() => handleAccordionToggle(index)} cursor="pointer" />
                                                                        )}
                                                                        <span>{rowData.intervalName}</span>

                                                                    </div>
                                                                </Td>
                                                                <Td>{rowData.startDate}</Td>
                                                                <Td>{rowData.endDate}</Td>
                                                                <Td>{rowData.minLos}</Td>
                                                                <Td>{rowData.maxLos}</Td>
                                                                <Td>Sun, Mon, Tue, Wed, Thu, Fri, Sat</Td>
                                                                <Td>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} mr="3" >
                                                                        <FaEdit fontSize="16px" onClick={() => editHandler(rowData.intervalName)} />
                                                                    </Button>
                                                                    <Button backgroundColor="#E5E5E5" px={2} colorScheme="gray" size="sm" isDisabled={false} onClick={() => handleDelete(rowData.intervalName)}>
                                                                        {loadingStates[rowData.intervalName] && deleteLoading ?
                                                                            <>
                                                                                <div className='deletloading'>
                                                                                    <FadeLoader color="#38B2AC" />
                                                                                </div> </> :
                                                                            <TiDelete fontSize="16px" />
                                                                        }
                                                                    </Button>

                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td colSpan={7}>
                                                                    <Collapse in={openAccordionIndex === index}>
                                                                        <Box p="4" borderWidth="1px" borderRadius="md">
                                                                            <ul className='baseRate'>
                                                                                <li>Sun <span>${rowData.sun}</span></li>
                                                                                <li>Mon <span>${rowData.mon}</span></li>
                                                                                <li>Tues <span>${rowData.tue}</span></li>
                                                                                <li>Wed <span>${rowData.wed}</span></li>
                                                                                <li>Thur <span>${rowData.thu}</span></li>
                                                                                <li>Fri <span>${rowData.fri}</span></li>
                                                                                <li>Sat <span>${rowData.sat}</span></li>

                                                                            </ul>
                                                                        </Box>
                                                                    </Collapse>
                                                                </Td>
                                                            </Tr>
                                                        </React.Fragment>
                                                    ))
                                                ) :

                                                    <Tr>
                                                        <Td colSpan="7">
                                                            <div>No data</div>
                                                        </Td>
                                                    </Tr>

                                                }
                                            </>}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </TabPanel>
            </TabPanels>
            {/* {loading && <p>loading...</p>} */}
        </Tabs>
    )
}



const ApplyAll = () => {
    const formik = useFormikContext();
    const handleApplyAll = (value) => {

        let commonPriceValue = formik.values.commonPrice
        const fieldsToApply = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

        // Update the values of the specified fields with commonPriceValue
        const updatedValues = fieldsToApply.reduce((acc, fieldName) => {
            acc[fieldName] = commonPriceValue;
            return acc;
        }, {});

        // Set the updated values in Formik
        formik.setValues({
            ...formik.values,
            ...updatedValues,
        });
    }
    return (<Button onClick={handleApplyAll}>Apply</Button>)
}
export default TabsCom