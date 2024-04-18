import * as React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Container,
  Heading,
  Select,
  Stack,
  Input,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { addscanidresponse } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBed,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import Axios from "axios";
import { useParams } from "react-router-dom";
import StepNavigation from "../components/stepNavigation.js";
import ReservationDetails from "../components/ReservationDetails/reservationDetails";
import ConfirmPayment from "../components/confirmPayment.js";
import moment from "moment";
import styles from "../assets/css/NewReservation.module.css";
import LoadSpinner from "../common/LoadSpinner";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllRoomNamesApi } from "../apiService/newReservation.js";

export default function NewReservation() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const toast = useToast();
  const variant = ["solid", "error", "left-accent", "top-accent"];
  const statuses = ["error", "success"];
  const [checkInDate, setCheckInDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  const [checkOutDate, setCheckOutDate] = React.useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const [checkAvailabilityRooms, setCheckAvailability] = React.useState([]);
  const [roomAvailability, setRoomAvailability] = React.useState(false);
  const [noOdAdults, setNoOfAdults] = React.useState(1);
  const [noOfchildren, setNoOfChildren] = React.useState(0);
  const [noOfRooms, setNoOfRooms] = React.useState({
    "Double Non Smoking": 0,
    "Double Smoking": 0,
    Deluxe: 0,
    Twin: 0,
  });
  const [selectedRoomsArr, setSelectedRooms] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState([]);
  const labelArray = ["Availability", "Details", "Payment"];
  const [currentStep, updateCurrentStep] = React.useState(1);
  const [selectSource, setSelectSource] = React.useState(false);
  const [sources, setSources] = React.useState("");
  const [isConfirmAndPayActivate, setIsConfirmAndPayActivate] =
    React.useState(false);
  const [reservationDetail, setReservationDetailForm] = React.useState([]);
  const [primaryGuestFirstName, setPrimaryGuestFirstName] = React.useState("");
  const [primaryGuestLastName, setPrimaryGuestLastName] = React.useState("");
  const [primaryGuestEmailAddress, setPrimaryGuestEmailAddress] =
    React.useState("");
  const [guestPrimaryDateOfBirth, setGuestPrimaryDateOfBirth] =
    React.useState("");
  const [primaryGuestPhone, setPrimaryGuestPhone] = React.useState("");
  const [guestPrimaryGender, setGuestPrimaryGender] = React.useState("");
  const [guestPrimaryTaxID, setGuestPrimaryTaxID] = React.useState("");
  const [guestPrimaryCompanyName, setGuestPrimaryCompanyName] =
    React.useState("");
  const [guestPrimaryCompanyTaxId, setGuestPrimaryCompanyTaxId] =
    React.useState("");
  const [guestPrimaryAddress1, setGuestPrimaryAddress1] = React.useState("");
  const [guestPrimaryAddress2, setGuestPrimaryAddress2] = React.useState("");
  const [guestPrimaryCity, setGuestPrimaryCity] = React.useState("");
  const [guestPrimaryCountry, setGuestPrimaryCountry] = React.useState("");
  const [guestPrimaryState, setGuestPrimaryState] = React.useState("");
  const [guestPrimaryZipCode, setGuestPrimaryZipCode] = React.useState("");
  const [guestPrimaryGuestDocument, setGuestPrimaryGuestDocument] =
    React.useState("");
  const [guestPrimaryDocumentNumber, setGuestPrimaryDocumentNumber] =
    React.useState("");
  const [guestPrimaryDocumentIssueDate, setGuestPrimaryDocumentIssueDate] =
    React.useState("");
  const [
    guestPrimaryDocumentIssuingCountry,
    setGuestPrimaryDocumentIssuingCountry,
  ] = React.useState("");
  const [
    guestPrimaryDocumentExpirationDate,
    setGuestPrimaryDocumentExpirationDate,
  ] = React.useState("");
  const [estimatedArrivalTime, setEstimatedArrivalTime] = React.useState("");
  const [updatedReservation, setUpdatedReservation] = React.useState("");
  const [mangePlanArr, setManagePlanArr] = React.useState({});
  const [loader, setLoader] = React.useState(false);
  const [buttonloading, setbuttonloading] = React.useState(false);
  const [guestCountry, setGuestCountry] = React.useState()
  const [guestPrimaryEmail, setGuestPrimaryEmail] = React.useState()
  const reservationDetailsProps = {
    guestPrimaryEmail,
    setGuestPrimaryEmail,
    isConfirmAndPayActivate,
    selectedRoomsArr,
    totalPrice,
    setIsConfirmAndPayActivate,
    reservationDetail,
    setReservationDetailForm,
    primaryGuestFirstName,
    setPrimaryGuestFirstName,
    primaryGuestLastName,
    setPrimaryGuestLastName,
    primaryGuestEmailAddress,
    setPrimaryGuestEmailAddress,
    guestPrimaryDateOfBirth,
    setGuestPrimaryDateOfBirth,
    primaryGuestPhone,
    setPrimaryGuestPhone,
    guestPrimaryGender,
    setGuestPrimaryGender,
    guestPrimaryTaxID,
    setGuestPrimaryTaxID,
    guestPrimaryCompanyName,
    setGuestPrimaryCompanyName,
    guestPrimaryCompanyTaxId,
    setGuestPrimaryCompanyTaxId,
    guestPrimaryAddress1,
    setGuestPrimaryAddress1,
    guestPrimaryAddress2,
    setGuestPrimaryAddress2,
    guestPrimaryCity,
    setGuestPrimaryCity,
    guestPrimaryCountry,
    setGuestPrimaryCountry,
    guestPrimaryState,
    setGuestPrimaryState,
    guestPrimaryZipCode,
    setGuestPrimaryZipCode,
    guestPrimaryGuestDocument,
    setGuestPrimaryGuestDocument,
    guestPrimaryDocumentNumber,
    setGuestPrimaryDocumentNumber,
    guestPrimaryDocumentIssueDate,
    setGuestPrimaryDocumentIssueDate,
    guestPrimaryDocumentIssuingCountry,
    setGuestPrimaryDocumentIssuingCountry,
    guestPrimaryDocumentExpirationDate,
    setGuestPrimaryDocumentExpirationDate,
    estimatedArrivalTime,
    setEstimatedArrivalTime,
    guestCountry,
    setGuestCountry,
  };
  let scanIddata = useSelector((state) => state?.counter?.scanidresponse);

  const getAllRoomNames = async () => {
    const result = await getAllRoomNamesApi();
    let data = {}
    result.data.forEach(res => data[res] = 0)
    setNoOfRooms(data)
  }

  // React.useEffect(()=>{
  //   console.log("this is run")
  //   getAllRoomNames();
  // },[])


  React.useEffect(() => {
    checkAvailability();
    setSelectSource(false);
    setCheckAndPlans();
  }, [sources != ""]);

  React.useEffect(() => {
    if (params.id) {
      getReservationById();
    }
    checkIfCofirmButtonEnable();
  }, [!isConfirmAndPayActivate]);

  React.useEffect(() => {
    dispatch(addscanidresponse({}));
  }, []);

  async function setCheckAndPlans() {
    const userToken = localStorage.getItem("userToken");
    const data = {};
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getAllRatesAndPlans",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setManagePlanArr(response.data.data);
    }
  }

  async function getReservationById() {
    const userToken = localStorage.getItem("userToken");
    const data = { id: params.id };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getReservationById",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      const { data } = response.data;
      setUpdatedReservation(data);
      setSources(data?.source);
      setCheckInDate(data?.checkInDate);
      setCheckOutDate(data?.checkOutDate);
      setPrimaryGuestFirstName(data?.userInfo?.firstName);
      setPrimaryGuestLastName(data?.userInfo?.lastName);
      setPrimaryGuestEmailAddress(data?.userInfo?.emailAddress);
      setGuestPrimaryDateOfBirth("");
      setPrimaryGuestPhone(data?.userInfo?.phoneNumber);
      setGuestPrimaryGender("");
      setGuestPrimaryTaxID("");
      setGuestPrimaryCompanyName("");
      setGuestPrimaryCompanyTaxId("");
      setGuestPrimaryAddress1(data?.userInfo?.billingAddress?.address1);
      setGuestPrimaryAddress2(data?.userInfo?.billingAddress?.address2);
      setGuestPrimaryCity(data?.userInfo?.country);
      setGuestPrimaryCountry(data?.userInfo?.country);
      setGuestPrimaryState(data?.userInfo?.billingAddress?.state);
      setGuestPrimaryZipCode(data?.userInfo?.billingAddress?.zipcode);
      setGuestPrimaryGuestDocument("");
      setGuestPrimaryDocumentNumber("");
      setGuestPrimaryDocumentIssueDate("");
      setGuestPrimaryDocumentIssuingCountry("");
      setGuestPrimaryDocumentExpirationDate("");
      setEstimatedArrivalTime("");
      const newObject = {
        id: data._id,
        roomName: data.roomsInfo[0]?.roomName,
        roomPrice: data.totalPrice,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        noOfNights: moment(data.checkOutDate).diff(data.checkInDate, "days"),
        noOdAdults: data.noOfAdults,
        noOfchildren: data.noOfChildren,
        noOfRooms: data.noOfRooms,
        source: data.sources,
      };
      setTotalPrice([...totalPrice, { roomPrice: parseInt(data.totalPrice) }]);
      setSelectedRooms([...selectedRoomsArr, newObject]);
    }
  }
  function updateStep(step) {
    updateCurrentStep(step);
  }

  function checkSourceSelector(event) {
    setSources(event);
    setSelectSource(false);
  }

  async function completedReservation() {
    setbuttonloading(true);
    const userToken = localStorage.getItem("userToken");
    let grandTotal = totalPrice.reduce((a, b) => a + b.roomPrice, 0);

    let totalTax = totalPrice.reduce((a, b) => a + b.roomPrice, 0) / 7;
    let totalFees = totalPrice.reduce((a, b) => a + b.roomPrice, 0) / 10;

    const billingAddress = {
      zipcode: guestPrimaryZipCode,
      address1: guestPrimaryAddress1,
      address2: guestPrimaryAddress2,
      city: guestPrimaryCity,
      state: guestPrimaryState,
      country: guestPrimaryCountry,
      email: guestPrimaryEmail
    };

    const additionalGuest = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
    };
    const userBasicInformation = {
      firstName: primaryGuestFirstName,
      lastName: primaryGuestLastName,
      emailAddress: primaryGuestEmailAddress,
      phoneNumber: primaryGuestPhone,
      country: guestPrimaryCountry,
      billingAddress,
    };

    const selectedRoom = [];
    let totalRooms = 0;
    selectedRoomsArr.forEach((value, index) => {
      selectedRoom.push({ id: value.id, noOfRooms: value.noOfRooms });
      totalRooms = totalRooms + value.noOfRooms;
    });
    // get current date using moment
    const roomDetails = {
      roomKeys: selectedRoom,
      noOfRooms: totalRooms,
      noOfPerson: parseInt(
        selectedRoomsArr[0].noOdAdults + selectedRoomsArr[0].noOfchildren
      ),
      noOfAdults: parseInt(selectedRoomsArr[0].noOdAdults),
      noOfChildren: parseInt(selectedRoomsArr[0].noOfchildren),
      fairPrice: "",
      discount: "0",
      roomTotal: grandTotal * selectedRoomsArr[0].noOfNights,
      totalTax: totalTax,
      totalFees: totalFees,
      totalPrice:
        grandTotal * selectedRoomsArr[0].noOfNights + totalTax + totalFees,
      bookingStatus: "confirmed",
      paymentStatus: "pending",
      bookingDate: moment().format("YYYY-MM-DD"),
      checkInDate: selectedRoomsArr[0].checkInDate,
      checkOutDate: selectedRoomsArr[0].checkOutDate,
      totalDays: selectedRoomsArr[0].noOfNights,
      source: sources,
      isWalkIn: true,
    };

    const data = {
      userBasicInformation,
      additionalGuest,
      ...roomDetails,
      scanIddata,
    };


    let hotelBookingMessage =
      "Congratulations! Your hotel booking has been successfully confirmed. Here are the details of your reservation: on date " +
      selectedRoomsArr[0].checkInDate +
      ". Please ensure that you have a valid ID and the credit card used for booking upon check -in. If you have any questions or need further assistance, please contact the hotel directly at support@qubedliving.com . We look forward to hosting you at our hotel and wish you a pleasant stay!. Thank you for choosing us. \nBest regards \nQubed";
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "/admin/createReservation",
      data: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };

    const response = await Axios(config);
    if (response.status === 200) {
      console.log("response",response)
      setbuttonloading(false);
      if (response.status) {
        sendSMS({
          body: hotelBookingMessage,
          to: primaryGuestPhone,
        });
        sessionStorage.setItem("isLogin", true);
        toast({
          position: "top",
          title: response.data.message,
          variant: variant,
          status: statuses[1],
          duration: 1000,
          isClosable: true,
          containerStyle: {
            width: "400px",
            maxWidth: "100%",
          },
        });
        // window.location.href = '/';
        // navigate("/admin/dashboard");
      } else {
        toast({
          position: "top",
          title: response.data.message,
          variant: variant,
          status: statuses[0],
          duration: 1000,
          isClosable: true,
          containerStyle: {
            width: "400px",
            maxWidth: "100%",
          },
        });
      }
    }
  }

  function selectAccommodationRoom(value) {
    console.log(value.pricePerNight)
    console.log(value.roomName)
    let roomPrice =
      value.pricePerNight * (noOfRooms?.[value?.roomName] === 0
        ? 1
        : noOfRooms?.[value?.roomName])
    var date1 = moment(checkInDate);
    var date2 = moment(checkOutDate);
    let diffDate = date2.diff(date1, "days");
    const newObject = {
      id: value._id,
      roomName: value.roomName,
      roomPrice: roomPrice,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      noOfNights: diffDate,
      noOdAdults: noOdAdults,
      noOfchildren: noOfchildren,
      noOfRooms: noOfRooms?.[value?.roomName] === 0 ? 1 : noOfRooms?.[value?.roomName],
      source: sources,
    };
    setTotalPrice([...selectedRoomsArr, { roomPrice: parseInt(roomPrice) }]);
    setSelectedRooms([...selectedRoomsArr, newObject]);
  }
  async function checkAvailability() {
    const userToken = localStorage.getItem("userToken");
    if (sources !== "") {
      const data = { startDate: checkInDate, endDate: checkOutDate };
      const config = {
        method: "get",
        url: process.env.REACT_APP_API_URL + "/admin/checkAvailability",
        params: data,
        headers: {
          Authorization: "Bearer " + userToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      };
      await getAllRoomNames()
      const response = await Axios(config);
      if (response) {
        setCheckAvailability(response.data.data);
        setRoomAvailability(response.data.data.roomAvailability);
      }
    } else {
      setSelectSource(true);
    }
  }
  async function sendSMS(data) {
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "/admin/sendSMSToClient",
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
    }
  }
  function deleteAvailability(id) {
    setSelectedRooms([
      ...selectedRoomsArr.slice(0, id),
      ...selectedRoomsArr.slice(id + 1, selectedRoomsArr.length),
    ]);
    setTotalPrice([
      ...totalPrice.slice(0, id),
      ...totalPrice.slice(id + 1, totalPrice.length),
    ]);
  }

  const checkIfCofirmButtonEnable = () => {
    let response = [];
    if (!isConfirmAndPayActivate) {
      response.push("true");
    }
    if (currentStep === labelArray.length) {
      response.push("true");
    }
    return response.length > 0 ? true : false;
  };

  return (
    <>
      {/* <Header /> */}
      <Grid
        sx={{
          maxHeight: selectedRoomsArr.length > 0 ? "72vh" : "81vh",
          overflow: "auto",
        }}
      >
        <Container
          maxW="container.2xxl"
          backgroundColor="#ecf2f9"
          height={"100%"}
          overflow="auto"
          px={{ base: "0", sm: "5" }}
        >
          <Grid
            px={"5"}
            py="5"
            templateColumns="repeat(2 , 1fr)"
            className={styles.firstline}
          >
            <GridItem>
              <Stack direction="row" spacing={1} style={mainContentSection}>
                <Heading size="lg">New Reservation</Heading>
              </Stack>
            </GridItem>
            <GridItem className={styles.firstlinesecondchild}>
              <StepNavigation
                labelArray={labelArray}
                currentStep={currentStep}
                updateStep={updateStep}
              ></StepNavigation>
            </GridItem>
          </Grid>
          {currentStep === 1 && (
            <Box mt={"3"} mb={"8"}>
              <Card variant={"outline"}>
                <CardBody>
                  <Grid
                    px="5"
                    py="5"
                    templateColumns="repeat(6 , 1fr)"
                    gap={6}
                    className={styles.cardParent}
                  >
                    <GridItem className={styles.card}>
                      <FormControl isInvalid={selectSource}>
                        <FormLabel
                          fontSize="xs"
                          ps="1"
                          borderRadius="3px"
                          display={"flex"}
                        >
                          Select Source <Text color={"red"}>*</Text>
                        </FormLabel>
                        <Select
                          onChange={(e) => {
                            setLoader(true);
                            checkSourceSelector(e.target.value);
                          }}
                          bg="#e5e5e5"
                          borderColor="#e5e5e5"
                          value={sources}
                          fontSize="12px"
                          fontWeight="600"
                          placeholder="NONE SELECTED"
                        >
                          <optgroup label="Direct">
                            <option color="#ccc" value="web">
                              Web
                            </option>
                            <option color="#ccc" value="Red Planet Direct">
                              Red Planet Direct
                            </option>
                            <option color="#ccc" value="Mobile App">
                              Mobile App
                            </option>
                            <option color="#ccc" value="Reb Planet Website">
                              Reb Planet Website
                            </option>
                            <option color="#ccc" value="Blank Source">
                              Blank Source
                            </option>
                          </optgroup>
                          <optgroup label="Third Party">
                            <option
                              color="#ccc"
                              value="Default Corporate Client"
                            >
                              Default Corporate Client
                            </option>
                            <option color="#ccc" value="Anthem Group">
                              Anthem Group
                            </option>
                            <option color="#ccc" value="Travel Agent">
                              Travel Agent
                            </option>
                          </optgroup>
                          <optgroup label="Corporate Client">
                            <option color="#ccc" value="Default OTA">
                              Default OTA
                            </option>
                            <option color="#ccc" value="Airbnb (API)">
                              Airbnb (API)
                            </option>
                            <option
                              color="#ccc"
                              value="Booking.com(Channel Collect Booking"
                            >
                              Booking.com(Channel Collect Booking)
                            </option>
                            <option
                              color="#ccc"
                              value="Expedia(Channel Collect Booking)"
                            >
                              Expedia(Channel Collect Booking)
                            </option>
                            <option
                              color="#ccc"
                              value="Expedia(Hotel Collect Booking)"
                            >
                              Expedia(Hotel Collect Booking)
                            </option>
                            <option
                              color="#ccc"
                              value="Booking.com(Channel Collect Booking)"
                            >
                              Booking.com(Channel Collect Booking)
                            </option>
                          </optgroup>
                          <optgroup label="Travel Agent">
                            <option color="#ccc" value="Default Travel Agent">
                              Default Travel Agent
                            </option>
                            <option
                              color="#ccc"
                              value="Adventure International Tours, Inc"
                            >
                              Adventure International Tours, Inc.
                            </option>
                          </optgroup>
                          <optgroup label="Wholesaler">
                            <option color="#ccc" value="Default Wholesaler">
                              Default Wholesaler
                            </option>
                            <option color="#ccc" value="Dida Travel">
                              Dida Travel
                            </option>
                          </optgroup>
                        </Select>
                        {selectSource && (
                          <FormErrorMessage>
                            Please Select Source
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.card}>
                      <FormControl>
                        <FormLabel fontSize="xs" ps="1" borderRadius="3px">
                          Check-In
                        </FormLabel>
                        <Input
                          type="date"
                          value={checkInDate}
                          placeholder="checkIn"
                          fontSize="12px"
                          onChange={(e) => setCheckInDate(e.target.value)}
                          fontWeight="500"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.card}>
                      <FormControl>
                        <FormLabel fontSize="xs" ps="1" borderRadius="3px">
                          Check-Out
                        </FormLabel>
                        <Input
                          type="date"
                          value={checkOutDate}
                          placeholder="checkOut"
                          fontSize="12px"
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          fontWeight="500"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.card}>
                      <FormControl>
                        <FormLabel fontSize="xs" ps="1" borderRadius="3px">
                          Allotment Block
                        </FormLabel>
                        <Select
                          bg="#e5e5e5"
                          borderColor="#e5e5e5"
                          fontSize="12px"
                          fontWeight="600"
                          placeholder="NONE SELECTED"
                        ></Select>
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.card}>
                      <FormControl>
                        <FormLabel fontSize="xs" ps="1" borderRadius="3px">
                          Promo code
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="Promo Code"
                          fontSize="12px"
                          fontWeight="500"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      display={"flex"}
                      alignItems="center"
                      w="100%"
                      pt="5"
                      className={`${styles.card} ${styles.searchcard}`}
                    >
                      <FormControl>
                        <Button
                          w="100%"
                          bg="#e5e5e5"
                          fontWeight="600"
                          borderColor="#e5e5e5"
                          onClick={() => checkAvailability()}
                          className={styles.searchButton}
                        >
                          <FaSearch />
                          Search
                        </Button>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
              <Grid
                px={{ base: "0", lg: "10" }}
                py="5"
                templateColumns="repeat(1 , 1fr)"
              >
                <GridItem>
                  <Card borderTop="5px solid #3366ff">
                    <CardBody p="0">
                      <Grid
                        templateColumns="repeat(7 , 1fr)"
                        className={styles.main}
                      >
                        <GridItem
                          colSpan={{ base: "7", lg: "2" }}
                          borderRight="1px solid #e5e5e5"
                          className={styles.mainleft}
                        >
                          <Stack
                            marginTop="-2px"
                            borderRadius="3px 0px 0px 0px"
                            background={"#3366ff"}
                          >
                            <Heading fontSize={"md"} p="4" color="white">
                              ACCOMMODATIONS
                            </Heading>
                          </Stack>
                          {selectedRoomsArr.length == 0 ? (
                            <Stack
                              width="100%"
                              pt="6"
                              alignItems="center"
                              paddingBottom="35px"
                              justifyContent={"center"}
                            >
                              <Box
                                background={"#cfcfcf"}
                                p="17"
                                borderRadius="60px"
                              >
                                <FaBed fontSize={"40px"} color={"white"} />
                              </Box>
                              <Box w="50%" textAlign={"center"}>
                                <Heading size={"xs"}>
                                  {" "}
                                  Add accommodations to start your reservation{" "}
                                </Heading>
                              </Box>
                            </Stack>
                          ) : (
                            <>
                              {selectedRoomsArr.map((value, key) => (
                                <Grid
                                  templateColumns="repeat(4 , 1fr)"
                                  p="15px 30px"
                                  borderBottom={"2px solid #e5e5e5"}
                                  key={String(key)}
                                >
                                  <GridItem colSpan={3}>
                                    <Text fontSize="xs" fontWeight={"600"}>
                                      {value.roomName} - ${value.roomPrice} (x{" "}
                                      {value.noOfRooms})
                                    </Text>
                                    <Text fontSize="xs">
                                      {value.checkInDate} - {value.checkOutDate}
                                    </Text>
                                    <Text fontSize="xs">
                                      {value.noOdAdults} Adult
                                    </Text>
                                    <Text fontSize="xs">
                                      {value.noOfchildren} Children,{" "}
                                      {value.noOfNights} Nights
                                    </Text>
                                  </GridItem>
                                  <GridItem
                                    onClick={(e) => {
                                      deleteAvailability(key);
                                    }}
                                    display={"flex"}
                                    justifyContent={"end"}
                                  >
                                    <FaTimesCircle />
                                  </GridItem>
                                </Grid>
                              ))}
                            </>
                          )}
                        </GridItem>
                        <GridItem colSpan={{ base: "7", lg: "5" }}>
                          <Grid
                            ps="3"
                            templateColumns="repeat(6 , 1fr)"
                            gap={6}
                            pt="3"
                            pe="3"
                            className={styles.selectboxes}
                          >
                            <GridItem colSpan={"3"}>
                              <FormControl
                                display={"flex"}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <FormLabel
                                  fontSize="xs"
                                  ps="1"
                                  borderRadius="3px"
                                  fontWeight={"700"}
                                >
                                  Display:
                                </FormLabel>
                                <Select
                                  bg="#e5e5e5"
                                  borderColor="#e5e5e5"
                                  fontSize="12px"
                                  fontWeight="600"
                                  placeholder="NONE SELECTED"
                                  className={styles.select}
                                ></Select>
                              </FormControl>
                            </GridItem>
                            <GridItem colSpan={"3"}>
                              <FormControl
                                display={"flex"}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <FormLabel
                                  fontSize="xs"
                                  ps="1"
                                  borderRadius="3px"
                                  fontWeight={"700"}
                                >
                                  Select Accommodations:
                                </FormLabel>
                                <Select
                                  bg="#e5e5e5"
                                  borderColor="#e5e5e5"
                                  fontSize="12px"
                                  fontWeight="600"
                                  placeholder="NONE SELECTED"
                                  className={styles.select}
                                ></Select>
                              </FormControl>
                            </GridItem>
                          </Grid>
                          {!roomAvailability ? (
                            loader ? (
                              <LoadSpinner />
                            ) : (
                              <Stack
                                width="100%"
                                pt="10"
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <Box
                                  background={"#cfcfcf"}
                                  p="17"
                                  borderRadius="60px"
                                >
                                  <FaBed fontSize={"40px"} color={"white"} />
                                </Box>
                                <Box w="50%" textAlign={"center"}>
                                  <Heading size={"xs"}>
                                    {" "}
                                    Add accommodations to start your reservation
                                  </Heading>
                                </Box>
                              </Stack>
                            )
                          ) : (
                            <Stack>
                              <Card
                                borderTop="5px solid #3366ff"
                                borderLeft="1px solid #e5e5e5"
                                borderRight="1px solid #e5e5e5"
                                borderBottom="1px solid #e5e5e5"
                                margin={"5"}
                              >
                                <Heading fontSize={"md"} p="4">
                                  Availability
                                </Heading>
                                <TableContainer>
                                  <Table size="sm">
                                    <Thead>
                                      <Tr className="bgx-search-availability-box">
                                        <Th>TYPE</Th>
                                        <Th>STARTING FROM</Th>
                                        <Th>CHECK-IN</Th>
                                        <Th>CHECK-OUT</Th>
                                        <Th>AVAILABLE</Th>
                                        <Th colSpan={"2"}>ADULT</Th>
                                        <Th>CHILD</Th>
                                        <Th>QUANTITY</Th>
                                        <Th></Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {checkAvailabilityRooms?.roomsAvailable.map(
                                        (value, index) => (
                                          <Tr
                                            className="bgx-search-availability-box-table-row"
                                            key={
                                              "roomsAvailable" + String(index)
                                            }
                                          >
                                            <td>
                                              <b>{value.roomName}</b>
                                            </td>
                                            <td className={customaligncenter}>
                                              ${value.pricePerNight}
                                            </td>
                                            <td>{checkInDate}</td>
                                            <td>{checkOutDate}</td>
                                            <td>{value.totalNumberOfRooms}</td>
                                            <td colSpan={"2"}>
                                              <Select
                                                size="xs"
                                                style={tableSelectorBox}
                                                placeholder="Adults"
                                                onChange={(e) =>
                                                  setNoOfAdults(e.target.value)
                                                }
                                              >
                                                {[
                                                  ...Array(
                                                    value?.maximumOccupancy -
                                                    noOfchildren
                                                  ),
                                                ].map((index, key) => (
                                                  <option
                                                    value={key + 1}
                                                    key={"Adults" + String(key)}
                                                  >
                                                    {key + 1}
                                                  </option>
                                                ))}
                                              </Select>
                                            </td>
                                            <td>
                                              <Select
                                                size="xs"
                                                style={tableSelectorBox}
                                                placeholder="Child"
                                                onChange={(e) => {
                                                  setNoOfChildren(
                                                    e.target.value
                                                  );
                                                }}
                                              >
                                                {[
                                                  ...Array(
                                                    value?.maximumOccupancy -
                                                    noOdAdults +
                                                    1
                                                  ),
                                                ].map((index, key) => (
                                                  <option
                                                    value={key}
                                                    key={
                                                      "children" + String(key)
                                                    }
                                                  >
                                                    {key}
                                                  </option>  
                                                ))}
                                              </Select>
                                            </td>
                                            <td>
                                              <Select
                                                size="xs"
                                                style={tableSelectorBox}
                                                placeholder="rooms"
                                                onChange={(e) => {
                                                  setNoOfRooms({
                                                    ...noOfRooms,
                                                    [value.roomName]:
                                                      +e.target.value,
                                                  });
                                                }}
                                              >
                                                {[
                                                  ...Array(
                                                    value?.totalNumberOfRooms -
                                                    noOdAdults +
                                                    1
                                                  ),
                                                ].map((index, key) => (
                                                  <option
                                                    key={key + 1}
                                                    value={key + 1}
                                                  >
                                                    {key + 1}
                                                  </option>
                                                ))}
                                              </Select>
                                            </td>
                                            <td>
                                              <Button
                                                type="button"
                                                colorScheme="messenger"
                                                size="sm"
                                                onClick={() =>
                                                  selectAccommodationRoom(value)
                                                }
                                              >
                                                {" "}
                                                Add{" "}
                                              </Button>
                                            </td>
                                          </Tr>
                                        )
                                      )}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Card>
                            </Stack>
                          )}
                        </GridItem>
                        <GridItem
                          colSpan={2}
                          borderRight="1.5px solid #8e8888"
                        ></GridItem>
                      </Grid>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </Box>
          )}
          {currentStep === 2 && (
            <ReservationDetails pb={"6"} {...reservationDetailsProps} />
          )}
          {currentStep === 3 && (
            <ConfirmPayment pb={"6"} {...reservationDetailsProps} />
          )}
        </Container>
      </Grid>

      <Grid
        templateColumns="repeat(1 , 1fr)"
        position={"fixed"}
        width={"100%"}
        bottom={0}
        textAlign="end"
      >
        <GridItem display={"flex"} justifyContent="end" background={"#e5e5e5"}>
          <Box px={{ base: "2", sm: "3", md: "5" }} py="2">
            <Text fontSize={{ base: "xs", sm: "sm" }}>Subtotal</Text>
            <Text textAlign="left" fontSize={{ base: "xs", sm: "sm" }}>
              ${totalPrice.reduce((a, b) => a + b.roomPrice, 0)}
            </Text>
          </Box>
          <Box px={{ base: "2", sm: "3", md: "5" }} py="2">
            <Text fontSize={{ base: "xs", sm: "sm" }}>Fees</Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} textAlign="left">
              ${(totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10) / 100}
            </Text>
          </Box>
          <Box px={{ base: "2", sm: "3", md: "5" }} py="2">
            <Text fontSize={{ base: "xs", sm: "sm" }}>VAT</Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} textAlign="left">
              $
              {(
                (totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7) /
                100
              ).toFixed(0)}
            </Text>
          </Box>
          <Box px={{ base: "2", sm: "3", md: "5" }} py="2">
            <Text fontSize={{ base: "xs", sm: "sm" }} className={styles.left}>
              Grand Total
            </Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} textAlign="left">
              $
              {totalPrice.reduce((a, b) => a + b.roomPrice, 0) +
                (totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7) / 100 +
                (totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10) / 100}
            </Text>
          </Box>
          <Box px={{ base: "2", sm: "3", md: "5" }} py="2">
            <Text fontSize={{ base: "xs", sm: "sm" }} className={styles.left}>
              Suggested Deposit
            </Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} textAlign="left">
              $
              {totalPrice.reduce((a, b) => a + b.roomPrice, 0) +
                (totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 7) / 100 +
                (totalPrice.reduce((a, b) => a + b.roomPrice, 0) * 10) / 100}
            </Text>
          </Box>
          <Box
            px={{ base: "2", sm: "3", md: "5" }}
            py="2"
            background={"#d4d4d4"}
          >
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              fontWeight={"600"}
              className={styles.left}
            >
              Balance Due
            </Text>
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              textAlign="left"
              fontWeight={"600"}
            >
              $0,00
            </Text>
          </Box>
        </GridItem>
        {selectedRoomsArr.length > 0 && (
          <Grid templateColumns="repeat(2 , 1fr)">
            <GridItem
              display={"flex"}
              justifyContent="start"
              background={"#363636"}
              px={3}
              py={3}
            >
              {currentStep !== 3 ? (
                <Button
                  colorScheme="messenger"
                  size="sm"
                  fontSize={"xs"}
                  borderRadius={"30px"}
                  isDisabled={currentStep === 1}
                  onClick={() => updateStep(currentStep - 1)}
                >
                  <FaAngleLeft pe={2} /> Previous Step
                </Button>
              ) : (
                <Button
                  colorScheme="messenger"
                  size="sm"
                  fontSize={"xs"}
                  borderRadius={"30px"}
                  isDisabled={currentStep === 1}
                  onClick={() => updateStep(2)}
                >
                  <FaAngleLeft pe={2} /> Previous Step
                </Button>
              )}
            </GridItem>
            <GridItem
              display={"flex"}
              justifyContent="end"
              background={"#363636"}
              px={3}
              py={3}
            >
              {currentStep === 1 && (
                <Button
                  colorScheme="messenger"
                  size="sm"
                  fontSize={"xs"}
                  borderRadius={"30px"}
                  isDisabled={currentStep === labelArray.length}
                  onClick={() => updateStep(currentStep + 1)}
                >
                  Next Step <FaAngleRight ps={2} />
                </Button>
              )}
              {currentStep === 2 && (
                <Button
                  colorScheme="messenger"
                  size="sm"
                  fontSize={"xs"}
                  borderRadius={"30px"}
                  isDisabled={checkIfCofirmButtonEnable()}
                  onClick={() => updateStep(3)}
                >
                  Confirm & Pay <FaAngleRight ps={2} />
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  colorScheme="messenger"
                  size="sm"
                  fontSize={"xs"}
                  borderRadius={"30px"}
                  onClick={() => completedReservation()}
                  isLoading={buttonloading}
                  loadingText="Confirming Reservation..."
                >
                  Confirm Reservation
                  <FaAngleRight ps={2} />
                </Button>
              )}
            </GridItem>
          </Grid>
        )}
      </Grid>
    </>
  );
}

const mainContentSection = {
  alignItems: "baseline",
};
const tableSelectorBox = {
  width: "95px",
  height: "37px",
  background: "#e5e5e5",
  borderColor: "#e5e5e5",
};

const customaligncenter = {
  textAlign: "center"
}