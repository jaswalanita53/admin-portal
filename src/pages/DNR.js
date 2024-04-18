import {
  Box,
  Button,
  Container,
  Select,
  useDisclosure,
  Card,
  CardBody,
  Link,
  Grid,
  GridItem,
  Heading

} from "@chakra-ui/react";
import { FaDownload, FaPrint, FaSearch } from 'react-icons/fa';
import { createColumnHelper } from "@tanstack/react-table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import Header from "../components/Header/Header";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Axios from "axios";
import { useState } from "react";
import moment from 'moment';
import { DataTable } from '../common/dataTables.js';

function DNR() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [countryList, setCountryList] = useState();
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = React.useState()
  const [dnr, setDnr] = React.useState()
  const [roomsDetails, setRoomsDetails] = React.useState([])
  const [id, setId] = React.useState("")
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()


  React.useEffect(() => {
    getcountries();
    setLoading(true)
    getDnrBookings();
  }, []);

  const getcountries = async () => {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/countries/all",
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      setCountryList(response.data.data);
    }
  };

  const addSingleGuestNotAllowed = async (values) => {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "post",
      data: values,
      url: process.env.REACT_APP_API_URL + "/addGuestNotAllowed",
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      setCountryList(response.data.data);
      setLoading(false);
    }
  };


  async function getDnrBookings() {
    const userToken = localStorage.getItem('userToken')
    const data = {}
    const config = {
      method: 'get',
      url: process.env.REACT_APP_API_URL + '/admin/getDnrBookings',
      params: data,
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    }
    const response = await Axios(config)
    if (response.status)
      setData1(response?.data.data)
    let result = new Promise((resolve, reject) => {
      setRoomsDetails(prepareRowsDataFromTable(response?.data.data.reverse()))
      resolve(true)
    })
    if (result) {
      setLoading(false)
    }
  }

  const prepareRowsDataFromTable = (data) => {
    const tmpRows = []
    data?.map((row, index) => {
      let dateDiff = moment(row?.checkOutDate).diff(moment(row?.checkInDate), 'days');
      let linkUrl = '/admin/reservation/view/' + row?.userInfo._id
      tmpRows.push({
        "id": row?.userInfo._id,
        "key": index + 1,
        "roomName": <Link href={linkUrl} color={'blue.500'} target="_self">{row?.bookingID}</Link>,
        "firstName": row?.userInfo?.firstName,
        'lastName': row?.userInfo?.lastName,
        "dateBooked": moment(row?.bookingDate).format("MMMM DD,YYYY"),
        "roomNumber": "dbl(" + row?.roomNumber + ")",
        "arrivalDate": moment(row?.checkInDate).format("MMMM DD,YYYY"),
        "departureDate": moment(row?.checkOutDate).format("MMMM DD,YYYY"),
        "noOfNights": dateDiff,
        "totalPrice": row?.totalPrice,
        "status": row?.bookingStatus,
        "dnrStatus": row?.userInfo?.isAddedToDnr,
        editDnr: '-'


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
      cell: (info) => info.getValue().toFixed(3),
      header: "TOTAL PRICE",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "STATUS",
      meta: {
        isNumeric: false
      }
    }),

    columnHelper.accessor("dnrStatus", {
      cell: (info) => <p>{info.getValue() === true ? "Added" : "Not Added"}</p>,
      header: "DNR STATUS",
      meta: {
        isNumeric: false
      }
    }),
    columnHelper.accessor("editDnr", {
      cell: (info) => <AiOutlineEdit onClick={() => { onOpenEdit(); setId(info.row.original.id); setDnr(info.row.original.dnrStatus === true ? true : false) }} cursor='pointer' color="blue" />,
      header: "EDIT DNR",
      meta: {
        isNumeric: false
      }
    }),
  ];

  const handleAddRemoveGuest = async (value) => {
    onCloseEdit();
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "post",
      data: {
        id,
        "dnr": value
      },
      url: process.env.REACT_APP_API_URL + "/addGuestNotAllowed",
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      getDnrBookings();
    }
  }


  return (
    <div style={menuItemSection}>
      {/* <Header /> */}
      <Container
        maxW="container.xxl"
        px="0"
        height="calc(100vh)"
        backgroundColor="#ecf2f9"
        className="p-10"
      >
        <Box className="mx-20 text-right"
        // backgroundColor="white" 
        >
          <Button colorScheme="blue" onClick={onOpen}>
            Do Not Rent
          </Button>

          <Card borderTop='5px solid #3366ff' height={'600px'} overflow={'auto'} className="mt-5">
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
              <Box mt="4">
                <DataTable columns={columns} data={roomsDetails} shouldbordershow={true} />
              </Box>
            </CardBody>
          </Card>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Not Allowed Guests</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: Number,
                  country: "",
                }}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                  setLoading(true);
                  addSingleGuestNotAllowed(values);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl
                        isInvalid={!!errors.firstName && touched.firstName}
                      >
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <Field
                          as={Input}
                          id="firstName"
                          name="firstName"
                          type="text"
                          variant="filled"
                          validate={(value) => {
                            let error;

                            if (!value) {
                              error = "Please enter a First Name";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.lastName && touched.lastName}
                      >
                        <FormLabel htmlFor="email">Last Name</FormLabel>
                        <Field
                          as={Input}
                          id="lastName"
                          name="lastName"
                          type="text"
                          variant="filled"
                          validate={(value) => {
                            let error;

                            if (!value) {
                              error = "Please enter a Last Name";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          variant="filled"
                          validate={(value) => {
                            let error;

                            if (!value) {
                              error = "Please enter an email";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                      >
                        <FormLabel htmlFor="phoneNumber">
                          Phone Number
                        </FormLabel>
                        <Field
                          as={Input}
                          id="phoneNumber"
                          name="phoneNumber"
                          type="number"
                          variant="filled"
                          validate={(value) => {
                            let error;

                             if (String(value).length != 10) {
                              error = "Phone number must contain 10 characters";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>
                          {errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={!!errors.country && touched.country}
                      >
                        <FormLabel htmlFor="country">Country</FormLabel>
                        <Field
                          as={Select}
                          id="country"
                          name="country"
                          type="number"
                          variant="filled"
                          validate={(value) => {
                            let error;
                            if (!value) {
                              error = "Please select a country";
                            }
                            return error;
                          }}
                        >
                          {countryList?.map((country) => (
                            <option value={country.name}>{country.name}</option>
                          ))}
                        </Field>
                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                      </FormControl>

                      <Button
                        type="submit"
                        isLoading={loading}
                        loadingText="Adding Guest to Not Allowed List..."
                        colorScheme="purple"
                        width="full"
                      >
                        Add Guest to Not Allowed List
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add/Remove Guest DNR</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {dnr === false ? "Do you want to add this guest to Do Not Rent" : "Do you want to remove the guest from Do Not Rent"}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={() => handleAddRemoveGuest(!dnr)}>{dnr === false ? "Add Guest" : "Remove Guest"}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
}
const menuItemSection = {
  padding: "0px",
};
export default DNR;

