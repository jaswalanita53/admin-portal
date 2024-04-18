import {
  Button,
  useDisclosure,
  Select,
  Container,
  Heading,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import Header from "../components/Header/Header";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,       
} from "@chakra-ui/react";        

import React, { useMemo } from "react";
import { Formik, Field } from "formik";        
import Axios from "axios";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import CalendarComponent from "../components/RatesAndInventory/CalendarComponent";
import moment from "moment";

export default function RatesAndinventoy() {
  const toast = useToast();
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenchild,
    onOpen: onOpenchild,
    onClose: onClosechild,
  } = useDisclosure();
  const {
    isOpen: isOpenAdjustRates,
    onOpen: onOpenAdjustRates,
    onClose: onCloseAdjustRates,
  } = useDisclosure();

  const [roomType, setRoomType] = useState({
    name: "",
    errorMessage: "",
  });

  const [roomCostData, setRoomCostsdata] = useState()
  const [loading, setLoading] = React.useState({
    roomsAndPrice: false,
    adjustRates: false,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onOpenchild();
  };

  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
    startDateErrorMessage: "",
    endDateErrorMessage: "",
  });

  async function setRoomsPrice(data) {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "/admin/setRoomsPrice",
      data: { data },
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };

    const response = await Axios(config);
    if (response.status) {
      const RatesAndInventoryRoomType = localStorage.getItem("RatesAndInventoryRoomType");
      fetch30daysdata(RatesAndInventoryRoomType)
      onClosechild();
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading({
        roomsAndPrice: false,
        adjustRates: false,
      });
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function raisePriceAccordingtoOccupancy(data) {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "/admin/setRoomsPriceOccupancy",
      data: { data },
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.data.status) {
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onCloseAdjustRates();
      onClosechild();
      setLoading({
        roomsAndPrice: false,
        adjustRates: false,
      });
      setLoading({
        roomsAndPrice: false,
        adjustRates: false,
      });
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const [roomsType, setRoomTypes] = useState([]);

  async function getRoomsType() {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getRoomsType",
      params: {},
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setRoomTypes(response.data.data);
    }
  }

  React.useEffect(() => {
    getRoomsType();
  }, []);

  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  const handleRatesAndPlansClick = () => {
    if (value.endDate === "") {
      setValue({
        ...value,
        endDateErrorMessage: "Please enter a startDate and an endDate",
      });
    }

    if (roomType.name === "") {
      setRoomType({ ...roomType, errorMessage: "Please select a roomtype" });
    } else onOpenchild();
  };

  const fetch30daysdata = async (roomType111) => {
    if (roomType111) {
      
      localStorage.setItem('RatesAndInventoryRoomType', roomType111);
      let todayDateStr = moment().format("YYYY-MM-DD")
      let after30daysDay = moment().add(30, 'days').format("YYYY-MM-DD")
      let data = {
        roomType: roomType111,
        startDate: todayDateStr,
        endDate: after30daysDay
      }
      const userToken = localStorage.getItem("userToken");
      const config = {
        method: "post",
        url: process.env.REACT_APP_API_URL + "/admin/fetch30DaysData",
        data: { data },
        headers: {
          Authorization: "Bearer " + userToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Header": "*",
        },
      };
      const response = await Axios(config);

      if (response.status) {
        setRoomCostsdata(response.data.data[0]["datesPrice"])
        onClosechild();
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading({
          roomsAndPrice: false,
          adjustRates: false,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <div>
      {/* <Header /> */}
      <Container
        maxW="container.xxl"
        px="0"
        // height="calc(100vh)"
        backgroundColor="#ecf2f9"
        className="p-10"
      >
        <div className="mx-5 p-10 h-fit" backgroundColor="#FFFFFF">
          <Heading as="h2" size="lg" className="mb-2">
            Rates and Inventory Page
          </Heading>
          <Box className="flex my-4 justify-between flex-wrap ">
            <Box className="gap-2 flex-wrap ">
              <InputGroup className="mb-2">
                <InputLeftAddon children=" StartDate:" />
                <Input
                  type="text"
                  placeholder="Selected StartDate:"
                  value={value.startDate}
                />
              </InputGroup>
              <InputGroup className="mb-1">
                <InputLeftAddon children=" EndDate:" />
                <Input
                  type="text"
                  placeholder="Selected EndDate:"
                  value={value.endDate}
                />
              </InputGroup>
              <p className="text-red-500">{value.endDateErrorMessage}</p>
              <br />

              <Box width={"600px"}>
                <Select
                  placeholder="Please select a roomType"
                  onChange={(e) => {
                      setRoomType({ name: e.target.value, errorMessage: "" })
                      fetch30daysdata(e.target.value)
                    }
                  }
                  className="text-blue-500"
                >
                  {roomsType.map((value) => (
                    <option value={value.roomType}>{value.roomType}</option>
                  ))}
                </Select>
                <p className="text-red-500">{roomType.errorMessage}</p>
              </Box>
            </Box>
            <Box className="flex gap-x-2 mt-4">
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={handleRatesAndPlansClick}
              >
                Rates And Plans
              </Button>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={onOpenAdjustRates}
              >
                Adjust Rates
              </Button>
            </Box>
          </Box>
          {/* <Datepicker 
          value={value} 
          onChange={handleValueChange} 
          primaryColor={"fuchsia"}  
          border
          />  */}

          <CalendarComponent setValue={setValue} value={value} roomCostData={roomCostData} />
        </div>

        <Modal isOpen={isOpenchild} onClose={onClosechild}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rooms and price</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  pricetype: "",
                  priceTobeAdded: 0,
                }}
                onSubmit={(values) => {
                  setLoading({
                    ...loading,
                    roomsAndPrice: true,
                  });

                  let data = {
                    startDate: value.startDate,
                    endDate: moment(value.endDate).subtract(1, 'days').format('YYYY-MM-DD'),
                    selectedRoomType: roomType.name,
                    selectedPriceType: values.pricetype,
                    enteredPrice: values.priceTobeAdded,
                  };

                  setRoomsPrice(data);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isInvalid={!!errors.pricetype && touched.pricetype}
                    >
                      <FormLabel htmlFor="pricetype" className="mt-4">
                        Select a price type
                      </FormLabel>
                      <Field
                        as={Select}
                        id="pricetype"
                        name="pricetype"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please select a price type";
                          }

                          return error;
                        }}
                      >
                        <option></option>
                        <option value="$">$</option>
                        <option value="%">%</option>
                      </Field>
                      <FormErrorMessage>{errors.pricetype}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.priceTobeAdded && touched.priceTobeAdded
                      }
                    >
                      <FormLabel htmlFor="priceTobeAdded" className="mt-4">
                        Enter a price to be added to the previous price
                      </FormLabel>
                      <Field
                        type="number"
                        id="priceTobeAdded"
                        name="priceTobeAdded"
                        className="p-2.5 px-4 border"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please Enter price to be added";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>
                        {errors.priceTobeAdded}
                      </FormErrorMessage>
                    </FormControl>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClosechild}>
                        Close
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="pink"
                        variant="solid"
                        isLoading={loading.roomsAndPrice}
                        loadingText="Saving"
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenAdjustRates} onClose={onCloseAdjustRates}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adjust Rates</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Formik
                initialValues={{
                  occupancy: 0,
                  raisedPrice: 0,
                  nextNumberOfDays: 0,
                  raisedPriceType: "",
                }}
                onSubmit={(values) => {
                  setLoading({
                    ...loading,
                    adjustRates: true,
                  });
                  let data = {
                    occupancy: values.occupancy,
                    raisedPrice: values.raisedPrice,
                    raisedPriceType: values.raisedPriceType,
                    nextNumberOfDays: values.nextNumberOfDays,
                    createdAt: new Date().toISOString().split("T")[0],
                  };
                  raisePriceAccordingtoOccupancy(data);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isInvalid={!!errors.occupancy && touched.occupancy}
                    >
                      <FormLabel htmlFor="occupancy" className="mt-4">
                        Occupancy
                      </FormLabel>
                      <Field
                        id="occupancy"
                        name="occupancy"
                        className="p-2.5 px-4 border"
                        type="number"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please Enter the occupancy";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.occupancy}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.raisedPrice && touched.raisedPrice}
                    >
                      <FormLabel htmlFor="password" className="mt-4">
                        Price to be raised
                      </FormLabel>
                      <Field
                        id="raisedPrice"
                        name="raisedPrice"
                        className="p-2.5 px-4 border"
                        type="number"
                        variant="filled"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please Enter the Price to be raised";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.raisedPrice}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.raisedPriceType && touched.raisedPriceType
                      }
                    >
                      <FormLabel htmlFor="raisedPriceType" className="mt-4">
                        Price Type
                      </FormLabel>
                      <Field
                        as="Select"
                        id="raisedPriceType"
                        name="raisedPriceType"
                        className="p-2.5 px-4 border"
                        variant="filled"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please Enter the Price type";
                          }
                          return error;
                        }}
                      >
                        <option></option>
                        <option value="$">$</option>
                        <option value="%">%</option>
                      </Field>
                      <FormErrorMessage>
                        {errors.raisedPriceType}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.nextNumberOfDays && touched.nextNumberOfDays
                      }
                    >
                      <FormLabel htmlFor="nextNumberOfDays" className="mt-4">
                        Next Number of days
                      </FormLabel>
                      <Field
                        id="nextNumberOfDays"
                        name="nextNumberOfDays"
                        type="number"
                        className="p-2.5 px-4 border"
                        variant="filled"
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please Enter the Next number of days";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>
                        {errors.nextNumberOfDays}
                      </FormErrorMessage>
                    </FormControl>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={onCloseAdjustRates}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="pink"
                        variant="solid"
                        isLoading={loading.adjustRates}
                        loadingText="Saving"
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
}
