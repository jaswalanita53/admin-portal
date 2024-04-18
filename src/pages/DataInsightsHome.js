import * as React from "react";
import Axios from "axios";
import { useLocation, NavLink } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
  Button,
  Accordion,
  AccordionItem,
  useDisclosure,
  AccordionButton,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Center,
  Select,
  Heading,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { getFormattedDate } from "../common/functions/index";
import Header from "../components/Header/Header";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCalendarCheck,
  FaCloud,
  FaDollarSign,
  FaFile,
  FaPaperPlane,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import { trimString, trimString10 } from "../common/functions/index.js";
import styles from "../assets/css/DataInsightsHome.module.css";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

export default function DataInsightsHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false)
  const [size, setSize] = React.useState("");
  const location = useLocation();
  const {
    isOpen: rightDrawerOpen,
    onOpen: rightDrawerOnOpen,
    onClose: rightDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const {
    isOpen: automationmodalOpen,
    onOpen: automationModalOnOpen,
    onClose: automationmodalOnClose,
  } = useDisclosure();

  const reportsType = [
    "Daily Management Report",
    "Manager Report",
    "Monthly Report",
    "Quarterly Report",
    "Summary Report",
    "Monthly Sales Report",
    "Monthly Tax Report",
  ]

  const handleClick = (newSize) => {
    setSize(newSize);
    rightDrawerOnOpen();
  };

  const [propertyInformation, setPropertyInformation] = React.useState([]);
  const states = ["Florida", "Texas"];
  const [savedReports, setSavedReports] = React.useState([]);
  const [automatedReports, setAutomatedReports] = React.useState([]);
  const [clickedAutoMatedReport, setClickedAutomatedReport] = React.useState("")
  const daysOfWeek =[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [isdataInsightsShowing, setIsdataInsightsShowing] =
    React.useState(true);

  React.useEffect(() => {
    getSavedReports();
    getAutomatedReports();
    getPropertyInformation();
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        setIsdataInsightsShowing(false);
      }
    });
  });

  async function getPropertyInformation() {
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/properties/all",
      data: {},
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    let response = await Axios(config);
    if (response.data.status) {
      setPropertyInformation(response.data.data);
    }
  }
  async function getSavedReports() {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getSavedReports",
      data: {},
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    let response = await Axios(config);

    if (response.status) setSavedReports(response.data.data);
  }
  async function getAutomatedReports() {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getAutomatedReports",
      data: {},
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    let response = await Axios(config);

    if (response.status) setAutomatedReports(response.data.data);
  }

  const samechilddata = [
    {
      icon: <FaCalendarCheck />,
      title: "Reservations Report Grouped by Booking Date",
      description:
        "Reservations report Grouped by Booking Date. Includes basic Reservation parameters.Reservations report Grouped by Booking Date. Includes basic Reservation parameters.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Checking-Out Today",
      description: "List for check out, collecting balances and cleaning.",
    },
    {
      icon: <FaDollarSign />,
      title: "Transaction Report with Details Broken Out",
      description: "A highly detailed transaction report.",
    },
    {
      icon: <FaDollarSign />,
      title: "Adjustments Report",
      description: "Adjustment Report - Current and Prior Calendar month.",
    },
    {
      icon: <FaDollarSign />,
      title: "Voids and Refunds",
      description:
        "Grouping Row by Void Flag and Refund Flag with columns that provide transaction details.",
    },
    {
      icon: <FaFile />,
      title: "Credit notes report",
      description: "A report on all issued Credit notes.",
    },
    {
      icon: <FaFile />,
      title: "Invoices and credit notes report with details",
      description:
        "A report on all invoices and credit notes with information about all transactions included in each one of them",
    },
    {
      icon: <FaFile />,
      title: "Invoices and credit notes report",
      description: "A report on all issued invoices and credit notes.",
    },
  ];

  let toast = useToast();

  const setloadingfn = (data) =>{
    setLoading(data)
  }
  const handleAutomateEmailDailyManagement = async (values) => {
    const userToken = localStorage.getItem("userToken");
    const data = {
      currentDate: moment().format("YYYY-MM-DD"),
    };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsByDate",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
   
    dailyormonthly(response, values)

    setloadingfn(false)
  };


  const dailyormonthly = async(response, values) =>{

    const tmpRows = [];
    let data3 = [
      [
        "#",
        "NAME",
        "EMAIL",
        "PHONE",
        "ADDITIONAL GUEST",
        "ROOM DETAIL",
        "ROOM NUMBER",
        "BILLING ADDRESS",
        "CHECK IN DATE",
        "CHECK OUT DATE",
        "PRICE",
      ],
    ];
    if (response) {
      response.data.data.todayBookings.map((row, index) => {
        let roomDetails = "";
        row.roomsInfo.map((value, index) => {
          roomDetails +=
            value.roomName + "( x " + row.roomKeys[index].noOfRooms + ") - ";
        });

        tmpRows.push({
          id: index + 1,
          firstName: `${row.userInfo?.firstName} ${row.userInfo?.lastName}`,
          emailAddress: row.userInfo?.emailAddress,
          phoneNumber: row.userInfo?.phoneNumber,
          additionalGuest: `${row.additionalGuest?.firstName} ${row.additionalGuest?.lastName} - ${row.additionalGuest?.emailAddress} - ${row.additionalGuest.phoneNumber}`,
          roomDetails: roomDetails,
          roomNumber: row?.roomNumber,
          billingAddress: `${row.userInfo?.billingAddress.address1} ${row.userInfo?.billingAddress?.address2} - ${row.userInfo?.billingAddress?.city} , ${row.userInfo?.billingAddress?.state} - ${row.userInfo?.country} , ${row.userInfo?.billingAddress?.zipcode}`,
          checkInDate: getFormattedDate(row.checkInDate),
          checkOutDate: getFormattedDate(row.checkOutDate),
          totalPrice: `$ ${row?.totalPrice}`,
        });
        data3.push([
          `"${index + 1}"`,
          `"${row.userInfo?.firstName} ${row.userInfo?.lastName}"`,
          `"${row.userInfo?.emailAddress}"`,
          `"${row.userInfo?.phoneNumber}"`,
          `" ${row.additionalGuest?.firstName} ${row.additionalGuest?.lastName} - ${row.additionalGuest?.emailAddress} - ${row.additionalGuest.phoneNumber}"`,
          `"${roomDetails}"`,
          `"${row?.roomNumber}"`,
          `"${row.userInfo?.billingAddress.address1} ${row.userInfo?.billingAddress?.address2} - ${row.userInfo?.billingAddress?.city} , ${row.userInfo?.billingAddress?.state} - ${row.userInfo?.country} , ${row.userInfo?.billingAddress?.zipcode}"`,
          `"${getFormattedDate(row.checkInDate)}"`,
          `"${getFormattedDate(row.checkOutDate)}"`,
          `"$ ${row?.totalPrice}"`,
        ]);
      });
    }

    csvSchedule(values, data3, tmpRows)
  }

  const handleAutomateEmailMonthly = async(values) =>{
    const userToken = localStorage.getItem("userToken");
    const data = { currentDate: moment().format("YYYY-MM-DD") };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsByMonth",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      }
    };
    const response = await Axios(config);
    dailyormonthly(response,values)
    setloadingfn(false)
  }

  const handleAutomateEmailQuaterly = async(values) =>{
    const userToken = localStorage.getItem("userToken");
    const data = { currentDate: moment().format("YYYY-MM-DD") };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsQuaterly",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    dailyormonthly(response, values)
    setloadingfn(false)
  }

  const handleAutomateEmailSummary = async(values) =>{
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/summaryreport/${data}`,
   
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    let data2 = [];
    let data3 = [
      [
        "#",
        "Selling Date",
        "Bookings",
        "RevPAR",
        "ADR",
        "Room Charges (before taxes)",
        "All Charges",
        "All Payments",
        "Balance",
      ],
    ];
    response.data.data.map((value, index) => {
      let data1 = {
        id: index + 1,
        SellingDate: value?.SellingDate,
        Bookings: value?.Bookings,
        RevPAR: value?.RevPAR,
        ADR: value?.ADR,
        RoomChargesBeforeTax: value?.RoomChargesBeforeTax,
        AllCharges: value?.AllCharges,
        AllPayments: value?.AllPayments,
        Balance: value?.Balance,
      };
      data2.push(data1)
      data3.push([
        `"${index + 1}"`,
        `"${value?.SellingDate}"`,
        `"${value?.Bookings}"`,
        `"${value?.RevPAR}"`,
        `"${value?.ADR}"`,
        `"${value?.RoomChargesBeforeTax}"`,
        `"${value?.AllCharges}"`,
        `"${value?.AllPayments}"`,
        `"${value?.Balance}"`,
      ]);
    });
    
    csvSchedule(values, data3, data2)
    setloadingfn(false)
  }

  const handleAutomateMonthlySales = async (values) => {
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/monthlysalesreport/${data}`,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    let data2 = [];
    let data3 = [
      [
        "Room",
        " ",
        "Bookings",
        " ",
        " ",
        "Net Revenue",
        " ",
        " ",
        " ",
        " ",
        " ",
        "Statistics",
        " ",
        " ",
        " ",
      ],
      [
        "Name",
        "Description",
        "",
        "%",
        "Nights",
        "Room",
        "Other",
        "Tax",
        "Total (with Taxes)",
        "Payment",
        "Balance",
        "Cancel %",
        "Avg Stay",
        "ADR",
        "RevPar",
      ],
    ];
    response.data.data.map((value) => {
      let data1 = {
        name: value?.name,
        description: value?.description,
        _: value?._,
        percentage: value?.percentage,
        nights: value?.nights,
        room: value?.room,
        other: value?.other,
        tax: value?.tax,
        total: value?.total,
        payment: value?.payment,
        balance: value?.balance,
        cancel: value?.cancel,
        avgstay: value?.avgstay,
        adr: value?.adr,
        revpar: value?.revpar,
      };
      data3.push([
        value?.name,
        value?.description,
        value?._,
        value?.percentage,
        value?.nights,
        value?.room,
        value?.other,
        value?.tax,
        value?.total,
        value?.payment,
        value?.balance,
        value?.cancel,
        value?.avgstay,
        value?.adr,
        value.revpar,
      ]);
      data2.push(data1);
    });
    csvSchedule(values, data3, data2)

    const url = values.id ? `${process.env.REACT_APP_API_URL}/admin/editcsvSchedule` : `${process.env.REACT_APP_API_URL}/admin/sharecsvSchedule`
    setloadingfn(false)
  }

  const handleAutomateMonthlyTax = async(values) => {
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/monthlytaxreport/${data}`,
      // params:data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);

    let data2 = [];
    let data3 = [
      [
        "#",
        "Date",
        "Charge Total(before taxes)",
        "K-Standard",
        "Single",
        "Queen",
        "Weekly Single",
        "Standard",
        "New Tax Type",
        "King Suite Weekly",
        "Double Daily",
        "Double Weekly",
        "Single Queen Daily",
        "Single Queen Weekly",
        "Tax Total",
        "Tax Exempt Total",
      ],
    ];

    response.data.data.map((value, index) => {
      let data1 = {
        id: 1 + index,
        date: value?.date,
        chargebeforetaxes: value.chargebeforetaxes,
        kstandard: value.chargebeforetaxes,
        single: value.single,
        queen: value.queen,
        weeklySingle: value.weeklySingle,
        standard: value.standard,
        newtaxtype: value.newtaxtype,
        kingsuiteweekly: value.kingsuiteweekly,
        doubledaily: value.doubledaily,
        doubleweekly: value.doubleweekly,
        singleQueenDaily: value.singleQueenDaily,
        singleQueenWeekly: value.singleQueenWeekly,
        taxTotal: value.taxTotal,
        taxExemptTotal: value.taxExemptTotal,
      };
      data3.push([
        1 + index,
        value.date,
        value.chargebeforetaxes,
        value.chargebeforetaxes,
        value.single,
        value.queen,
        value.weeklySingle,
        value.standard,
        value.newtaxtype,
        value.kingsuiteweekly,
        value.doubledaily,
        value.doubleweekly,
        value.singleQueenDaily,
        value.singleQueenWeekly,
        value.taxTotal,
        value.taxExemptTotal,
      ]);
      data2.push(data1);
    });

    csvSchedule(values, data3, data2)
    setloadingfn(false)
  }

  const csvSchedule = (values, data3, data2) =>{
    const url = values.id ? `${process.env.REACT_APP_API_URL}/admin/editcsvSchedule` : `${process.env.REACT_APP_API_URL}/admin/sharecsvSchedule`
    Axios({
      method: "POST",
      url: url,
      data: {
        csvContent: data3?.map((row) => row.join(",")).join("\n"),
        values: values,
        bodydata: {
          reportName: values.reportName,
          reportType: values.reportType,
          reportDescription: values.emailBody,
          report: data2,
        },
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        ContentType: "multipart/form-data",
      },
    }).then(async (res) => {
      toast({
        title: "Task Scheduled Successfully.",
        description: res.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      getAutomatedReports()
      automationmodalOnClose();
    });
  }
  
  return (
    <Container maxW="container.xxl" p="0">
      {/* <Header /> */}
      <Stack>
        <Grid templateColumns="repeat(12 , 1fr)" position="relative">
          {isdataInsightsShowing && (
            <GridItem className={styles.leftmenu}>
              <Card>
                <CardBody px="2" py="2" borderBottom="1px solid #d3d2d2">
                  <Grid templateColumns="repeat(3, 1fr)">
                    <GridItem colSpan={2} display="flex" alignItems="center">
                      <Text fontSize="xs" fontWeight={500} padding="11px">
                        DATA INSIGHTS
                      </Text>
                    </GridItem>
                    <GridItem colStart={3} colEnd={4} textAlign="end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsdataInsightsShowing(false);
                        }}
                      >
                        <FaAngleDoubleLeft />
                      </Button>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
              <Card>
                <CardBody px="1" py="0">
                  <UnorderedList style={headerMenuItems}>
                    <ListItem style={headerMenuItemsList} key={1.1}>
                      <FaPaperPlane style={headerMenuListIcon} />
                      Home
                    </ListItem>
                    <ListItem style={headerMenuItemsList} key={1.2}>
                      <FaCloud style={headerMenuListIcon} />
                      Qubed Reports
                    </ListItem>
                    <ListItem style={headerMenuItemsList1} key={1.3}>
                      <Accordion allowToggle>
                        <AccordionItem style={acordionItemsList}>
                          <AccordionButton
                            fontSize="13px"
                            p="1"
                         
                          >
                            <NavLink
                              to="/admin/insights/builder/reports"
                              className={({ isActive, isPending }) =>
                                isPending
                                  ? "pending"
                                  : isActive
                                  ? `${styles.active}`
                                  : ""
                              }
                              style={navLinkStyle}
                            >
                              <Center>
                                <FaSave style={headerMenuListIcon} />
                                Saved Reports
                              </Center>
                            </NavLink>
                          </AccordionButton>
                          <AccordionPanel py={3}>
                            <UnorderedList style={headerMenuItemsInner}>
                              <ListItem key={1.31}>
                                Custom Reservations
                              </ListItem>
                            </UnorderedList>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </ListItem>
                    <ListItem style={headerMenuItemsList} key={1.4}>
                      <FaPaperPlane style={headerMenuListIcon} />
                      Subscriptions
                    </ListItem>
                    <ListItem fontSize="13px" key={1.5}>
                      <NavLink
                        to="/admin/automated-report"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? `${styles.active}`
                            : ""
                        }
                        style={navLinkStyle}
                      >
                        <FaSave style={headerMenuListIcon} />
                        Saved Jobs
                      </NavLink>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
            </GridItem>
          )}

          {!isdataInsightsShowing && (
            <GridItem className={styles.leftmenu1}>
              <Box
                borderBottom="1px solid #d3d2d2"
                w="100%"
                borderRight=".5px solid #d3d2d2"
                borderRadius="6px"
                px="2"
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsdataInsightsShowing(true);
                  }}
                  w="100%"
                  my="8px"
                >
                  <FaAngleDoubleRight />
                </Button>
              </Box>

              <UnorderedList style={headerMenuItemsother} className={styles.ul}>
                <ListItem style={headerMenuItemsListother} key={2.1}>
                  <FaPaperPlane style={headerMenuListIconother} />
                </ListItem>
                <ListItem style={headerMenuItemsListother} key={2.2}>
                  <FaCloud style={headerMenuListIconother} />{" "}
                </ListItem>
                <ListItem key={2.3}>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton
                        fontSize="13px"
                        style={accordianButtonStyleother}
                      >
                        <Center>
                          <FaSave style={headerMenuListIconother} />
                        </Center>
                      </AccordionButton>
                      <AccordionPanel py={3}>
                        <UnorderedList style={headerMenuItemsInnerother}>
                          <ListItem fontSize="12px" key={2.31}>
                            Custom Reservations
                          </ListItem>
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </ListItem>
                <ListItem style={headerMenuItemsListother} key={2.4}>
                  <FaPaperPlane style={headerMenuListIconother} />
                </ListItem>
              </UnorderedList>
            </GridItem>
          )}

          {isdataInsightsShowing && (
            <GridItem
              className={
                isdataInsightsShowing
                  ? styles.leftmenusmallshow
                  : styles.leftmenusmall
              }
            >
              <Box
                borderBottom="1px solid #d3d2d2"
                w="100%"
                borderRight=".5px solid #d3d2d2"
                borderRadius="6px"
                px="2"
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsdataInsightsShowing(false);
                  }}
                  w="100%"
                  my="8px"
                >
                  <FaAngleDoubleLeft />
                </Button>
              </Box>
              <UnorderedList style={headerMenuItemsother} className={styles.ul}>
                <ListItem style={headerMenuItemsListother} key={3.1}>
                  <FaPaperPlane style={headerMenuListIconother} />
                </ListItem>
                <ListItem style={headerMenuItemsListother} key={3.2}>
                  <FaCloud style={headerMenuListIconother} />{" "}
                </ListItem>
                <ListItem key={3.3}>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton
                        fontSize="13px"
                        style={accordianButtonStyleother}
                      >
                        <Center>
                          <FaSave style={headerMenuListIconother} />
                        </Center>
                      </AccordionButton>
                      <AccordionPanel py={3}>
                        <UnorderedList style={headerMenuItemsInnerother}>
                          <ListItem fontSize="12px" key={3.31}>
                            Custom Reservationsss 
                          </ListItem>
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </ListItem>
                <ListItem style={headerMenuItemsListother} key={3.4}>
                  <FaPaperPlane style={headerMenuListIconother} />
                </ListItem>
                <ListItem key={3.5}>
                <FaSave style={headerMenuListIconother} />
                </ListItem>
              </UnorderedList>
            </GridItem>
          )}

          <GridItem colSpan={11} className={styles.second}>
            <Grid
              templateColumns="repeat(6, 1fr)"
              borderBottom="1px solid #ccc"
            >
              <GridItem colSpan={3} display="flex" alignItems="center">
                <Text
                  fontSize="md"
                  pl="2"
                  fontWeight={300}
                  className={styles.data}
                >
                  Data Insights Home
                </Text>
              </GridItem>
              <GridItem
                colStart={6}
                colEnd={6}
                display="flex"
                justifyContent="end"
              >
                <>
                  <Button
                    onClick={() => handleClick("md")}
                    key={size}
                    fontSize="xs"
                    m={2}
                  >
                    Manage
                  </Button>

                  <Drawer
                    onClose={rightDrawerOnClose}
                    isOpen={rightDrawerOpen}
                    size={size}
                  >
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader
                        fontSize={"lg"}
                        fontWeight="400"
                        backgroundColor="#efefef"
                      >
                        MANAGE DATA INSIGHTS
                      </DrawerHeader>
                      <DrawerBody>
                        <Text pb="3" pt="2" fontSize={"xs"}>
                          START OF THE WEEK
                        </Text>
                        <Select placeholder="Select option">
                          {daysOfWeek.map((day, index) => (
                            <option value={index} key={index}>
                              {day}
                            </option>
                          ))}
                        </Select>
                      </DrawerBody>
                      <DrawerFooter borderTopWidth="1px">
                        <Button colorScheme="teal">Save</Button>
                        <Button
                          variant="outline"
                          mr={3}
                          onClick={rightDrawerOnClose}
                        >
                          Cancel
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(11,1fr)" className={styles.parent1}>
              <Flex className={styles.parent1childmain}>
                <GridItem colStart={2} colEnd={6} className={styles.child}>
                  <Heading fontSize={"md"} fontWeight={"500"}>
                    WELCOME TO DATA INSIGHTS
                  </Heading>
                  <Text fontSize={"xs"} fontWeight={"300"} mt="2">
                    Quebed’ Data Insights is the all-new, best-in-class
                    hospitality analytics platform created to satisfy your
                    unique reporting needs. You’ll find a set of curated reports
                    published by us and other customization features on this
                    home screen. This is a free product preview. Our goal is to
                    get external feedback in order to improve our products and
                    make them better for you. Let us know what you think via the
                    Feedback & Ideas page and stay tuned for more Quebed Reports
                    & new functionalities here!
                  </Text>
                </GridItem>
                <GridItem colStart={6} colEnd={11} className={styles.child}>
                  <Image
                    src="https://front.cloudbeds.com/mfd-reporting/img/welcome-to-cloudbeds-banner-bg.0aec3e90.png"
                    alt="Dan Abramov"
                  />
                </GridItem>
              </Flex>
              <GridItem colStart={2} colEnd={5} className={styles.createNew}>
                <Stack
                  direction={["column", "rreceow"]}
                  onClick={modalOnOpen}
                  spacing="32px"
                  p="2"
                  border="1px solid #e5e5e5"
                  className={styles.createNewchild}
                >
                  <Box w="40px" h="40px" bg="yellow.200">
                    <Button>
                      <FaPlus />
                    </Button>
                  </Box>
                  <Box className="mt0">
                    <Heading
                      fontSize="md"
                      fontWeight={400}
                      color="blue.500"
                      cursor={"pointer"}
                    >
                      Create New Report
                    </Heading>
                    <Text fontSize="xs">Table and Visualization</Text>
                  </Box>
                </Stack>
                <Stack
                  direction={["column", "rreceow"]}
                  onClick={()=>{
                    setClickedAutomatedReport("");
                    automationModalOnOpen()
                  }
                }
                  spacing="32px"
                  p="2"
                  border="1px solid #e5e5e5"
                  className={styles.createNewchild}
                >
                  <Box w="40px" h="40px" bg="yellow.200">
                    <Button>
                      <FaPlus />
                    </Button>
                  </Box>
                  <Box className="mt0">
                    <Heading
                      fontSize="md"
                      fontWeight={400}
                      color="blue.500"
                      cursor={"pointer"}
                    >
                      Create New Automation
                    </Heading>
                    <Text fontSize="xs">Table and Visualization</Text>
                  </Box>
                </Stack>
              </GridItem>
            </Grid>
            <Grid
              templateColumns={{
                base: "repeat(1,1fr)",
                sm: "repeat(2,1fr)",
                lg: "repeat(3,1fr)",
              }}
              gap={3}
              my="30px"
              mx="60px"
              display="flex"
              flexDirection="column"
            >
              <Heading fontWeight={600} fontSize={"md"} mb="20px">
                RECENTLY PUBLISHED
              </Heading>
              <Grid
                templateColumns={{
                  base: "repeat(1,1fr)",
                  sm: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                gap={3}
                className={styles.parentofchilds}
              >
                {samechilddata.map((value, index) => (
                  <>
                    <GridItem className={styles.secondchild}>
                      <Stack
                        direction={["column", "row"]}
                        spacing="32px"
                        p="2"
                        border="1px solid #e5e5e5"
                        className={styles.flexrow}
                      >
                        <Box style={reservationCenterIcon}>{value.icon}</Box>
                        <Box
                          style={reservationInlineContainer}
                          className={styles.margintop0}
                        >
                          <Heading
                            fontSize="md"
                            fontWeight={600}
                            color="blue.500"
                            style={reservationContainerNewReport}
                          >
                            {value.title}
                          </Heading>
                          <Text fontSize="xs">
                            {trimString(`${value.description}`, 50)}
                          </Text>
                        </Box>
                      </Stack>
                    </GridItem>
                  </>
                ))}
              </Grid>
            </Grid>
            {location.pathname !== "/admin/automated-report" ? (
              <>
                <Grid className={styles.heading}>
                  <Heading fontWeight={600} fontSize={"md"} w="fit-content">
                    {" "}
                    SAVED REPORTS
                  </Heading>
                </Grid>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  my={2}
                  mx="60px"
                  gap={3}
                  className={styles.parentofchilds}
                >
                  {savedReports.map((value, index) => (
                    <GridItem className={styles.secondchild} key={index}>
                      <Stack
                        // onClick={(e) =>
                        //   (window.location.href =
                        //     "/admin/insights/builder/reports/" + value._id)
                        // }
                        onClick={() =>{navigate(`/admin/insights/builder/reports/${ value._id}`)}}
                        
                        direction={["column", "row"]}
                        spacing="32px"
                        p="2"
                        border="1px solid #e5e5e5"
                        className={styles.flexrow}
                      >
                        <Box style={reservationCenterIcon}>
                          <FaFile />
                        </Box>
                        <Box
                          style={reservationInlineContainer}
                          className={styles.margintop0}
                        >
                          <Heading
                            fontSize="md"
                            fontWeight={600}
                            color="blue.500"
                            style={reservationContainerNewReport}
                          >
                            {value.reportName}
                          </Heading>
                          <Text fontSize="xs">
                            {trimString(value.reportDescription, 50)}
                          </Text>
                        </Box>
                      </Stack>
                    </GridItem>
                  ))}
                </Grid>
              </>
            ) : (
              <>
                <Grid className={styles.heading}>
                  <Heading fontWeight={600} fontSize={"md"} w="fit-content">
                    {" "}
                    AUTOMATED REPORTS
                  </Heading>
                </Grid>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  my={2}
                  mx="60px"
                  gap={3}
                  className={styles.parentofchilds}
                >
                  {automatedReports.map((value, index) => (
                    <GridItem className={styles.secondchild} key={index}>
                      <Stack
                        direction={["column", "row"]}
                        spacing="32px"
                        p="2"
                        border="1px solid #e5e5e5"
                        className={styles.flexrow}
                      >
                        <Box style={reservationCenterIcon}>
                          <FaFile />
                        </Box>
                        <Box
                          style={reservationInlineContainer}
                          className={styles.margintop0}
                        >
                          <Heading
                            fontSize="md"
                            fontWeight={600}
                            color="blue.500"
                            style={reservationContainerNewReport}
                            onClick={()=>{
                              setClickedAutomatedReport(value)
                              automationModalOnOpen()
                            }
                            }
                          >

                            {value.reportName}
                          </Heading>
                          <Text fontSize="xs">
                            {"(" + value.data.report.reportType + ")"}
                          </Text>
                          <Text fontSize="xs">
                            {trimString10(
                              value.data.report.reportDescription,
                              35
                            )}
                          </Text>
                        </Box>
                      </Stack>
                    </GridItem>
                  ))}
                </Grid>
              </>
            )}
          </GridItem>
        </Grid>
      </Stack>
      <Modal isOpen={modalOpen} size={"xl"} onClose={modalOnClose}>
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader
            fontSize={"md"}
            fontWeight={400}
            borderBottom="1px solid #e5e5e5"
          >
            NEW REPORT
          </ModalHeader>
          <ModalCloseButton />
          {/* <form> */}

          <Formik
            initialValues={{
              propertytype: "",
              branch: "",
              reportType: "",
              reportName: "",
              reportDescription: "",
            }}
            onSubmit={(values) => {

              localStorage.setItem(
                "reportsValue",
                JSON.stringify({
                  propertyValue: values.propertytype,
                  branchValue: values.branch,
                  reportName: values.reportName,
                  reportTypeVal: values.reportType,
                  reportDescription: values.reportDescription,
                })
              );

              // window.location.href = "/admin/insights/builder/reports/new/guests";
              navigate("/admin/insights/builder/reports/new/guests");
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <Text fontSize={"xs"} fontWeight={"300"} mt="2">
                      Start building the report by selecting the report type and
                      view. The report type controls the scope of data available
                      in the report. For example: if you have chosen Financial
                      Transactions as your report type, then the fields and
                      filters available will relate to financial data. If you
                      have chosen Guests as your report type, then your filters
                      will have guest details, etc.
                    </Text>
                    <Grid templateColumns="repeat(2,1fr)" gap={6} pt={3}>
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                  
                          isInvalid={
                            !!errors.propertytype && touched.propertytype
                          }
                        >
                          <FormLabel pt="2"  fontSize={"sm"}>
                            PROPERTY TYPE
                          </FormLabel>
                          <Field
                            as="select"
                            name="propertytype"
                            id="propettytype"
                            placeholder="Select option"
                            fontSize={"xs"}
                            style={customtextArea}
                        
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a property type";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {propertyInformation.map((report, index) => (
                              <option
                                value={report._id}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report.propertyName}
                              </option>
                            ))}
                          </Field>
                          {/* {propertyInformationErr && (
                            <FormErrorMessage>
                              Please Select Property Type.
                            </FormErrorMessage>
                          )} */}
                          <FormErrorMessage>
                            {errors.propertytype}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                    
                        <FormControl
                          isInvalid={!!errors.branch && touched.branch}
                        >
                          <FormLabel pt="2" fontSize={"sm"} htmlFor="branch">
                            SELECT BRANCH
                          </FormLabel>
                          <Field
                            as="select"
                            placeholder="Select Branch"
                            fontSize={"xs"}
                            style={customtextArea}
                           
                            name="branch"
                            id="branch"
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {states.map((report, index) => (
                              <option
                                value={report}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report}
                              </option>
                            ))}
                          </Field>
                          {/* {selectedBranchValueErr && (
                            <FormErrorMessage>
                              Please Select Branch Type.
                            </FormErrorMessage>
                          )} */}
                          <FormErrorMessage>{errors.branch}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      {/* <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl isInvalid={selectedBranchValueErr}>
                          <FormLabel pb="3" pt="2" fontSize={"sm"}>
                            SELECT BRANCH
                          </FormLabel>
                          <Select
                            placeholder="Select Branch"
                            fontSize={"xs"}
                            onChange={handleBranchName}
                          >
                            {states.map((report, index) => (
                              <option value={report} key={index}>
                                {report}
                              </option>
                            ))}
                          </Select>
                          {selectedBranchValueErr && (
                            <FormErrorMessage>
                              Please Select Branch Type.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </GridItem> */}
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                      
                          isInvalid={!!errors.reportType && touched.reportType}
                        >
                          <FormLabel
                            pt="2"
                            fontSize={"sm"}
                            htmlFor="reportType"
                          >
                            REPORTS TYPE
                          </FormLabel>
                          <Field
                            as="select"
                            name="reportType"
                            id="reportType"
                            style={customtextArea}
                      
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {reportsType.map((report, index) => (
                              <option
                                value={report}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report}
                              </option>
                            ))}
                          </Field>

                          <FormErrorMessage>
                            {errors.reportType}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          isInvalid={!!errors.reportName && touched.reportName}
                        >
                          <FormLabel
                            htmlFor="reportName"
                            pt="2"
                            fontSize={"sm"}
                          >
                            REPORT NAME
                          </FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name="reportName"
                            id="reportName"
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                            // onChange={handleReportName}
                          />
                          {/* {reportNameErr && ( */}
                          <FormErrorMessage>
                            {errors.reportName}
                          </FormErrorMessage>
                          {/* )} */}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={2} my="2">
                        <FormControl
                          isInvalid={
                            !!errors.reportDescription &&
                            touched.reportDescription
                          }
                        >
                          <FormLabel
                            htmlFor="reportDescription"
                            pt="2"
                            fontSize={"sm"}
                          >
                            REPORT DESCRIPTION
                          </FormLabel>
                          <Field
                            as="textarea"
                          
                            style={customtextArea}
                            name="reportDescription"
                            id="reportDescription"
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                          
                                error = "Please provide a report description";
                              }
                              return error;
                            }}
                          
                          />
                          <FormErrorMessage>
                            {errors.reportDescription}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                    </Grid>

                    <GridItem colSpan={2} my="2" display="flex">
                      <Stack w="100%">
                        <Grid pb="3" pt="2" fontSize={"xs"}>
                          <Text
                            display="flex"
                            alignItems="center"
                            fontSize={"sm"}
                            color="white"
                            background="blue.500"
                          >
                            <Image
                              src={
                                window.location.origin +
                                "/assets/images/analyticFile.png"
                              }
                              mr={2}
                            />
                            More report types are coming!
                          </Text>
                        </Grid>
                      </Stack>
                    </GridItem>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="sm"
                      type="submit"
                   
                      colorScheme="blue"
                      mr={3}
                    >
                      Create
                    </Button>
                    <Button variant="outline" size="sm" onClick={modalOnClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </Formik>

          {/* </form> */}
        </ModalContent>
      </Modal>

      {/* ********************************this is the automation modal********************************** */}
      <Modal
        isOpen={automationmodalOpen}
        size={"xl"}
        onClose={automationmodalOnClose}
      >
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader
            fontSize={"md"}
            fontWeight={400}
            borderBottom="1px solid #e5e5e5"
          >
            NEW REPORT
          </ModalHeader>
          <ModalCloseButton />
          {/* <form> */}

          <Formik
            initialValues={
              clickedAutoMatedReport.csvdata ?
              {   
                  id: clickedAutoMatedReport._id,
                  propertytype: clickedAutoMatedReport.values.propertytype,
                  branch: clickedAutoMatedReport.values.branch, 
                  reportType: clickedAutoMatedReport.values.reportType,
                  reportName: clickedAutoMatedReport.values.reportName,
                  emailDistritributionList: clickedAutoMatedReport.values.emailDistritributionList,
                  time: clickedAutoMatedReport.values.time,
                  subject: clickedAutoMatedReport.values.subject, 
                  weekdays: clickedAutoMatedReport.values.weekdays,
                  emailBody: clickedAutoMatedReport.values.emailBody
              }:
              {
              propertytype: "",
              branch: "",
              reportType: "",
              reportName: "",
              emailDistritributionList: "",
              time: "",
              subject: "",
              weekdays: [],
              emailBody: "",
            }}
            onSubmit={(values) => {
              setloadingfn(true)
              if (values.reportType === "Daily Management Report") {
                handleAutomateEmailDailyManagement(values);
              }
             else if (values.reportType === "Monthly Report" ){
                handleAutomateEmailMonthly(values);
              }
              else if (values.reportType === "Quarterly Report") {
                handleAutomateEmailQuaterly(values);
              }
              else if (values.reportType === "Summary Report") {
                handleAutomateEmailSummary(values);
              }
              else if (values.reportType === "Monthly Sales Report") {
                handleAutomateMonthlySales(values);
              }
              else if (values.reportType === "Monthly Tax Report") {
                handleAutomateMonthlyTax(values);
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <Text fontSize={"xs"} fontWeight={"300"} mt="2">
                      Start building the report by selecting the report type and
                      view. The report type controls the scope of data available
                      in the report. For example: if you have chosen Financial
                      Transactions as your report type, then the fields and
                      filters available will relate to financial data. If you
                      have chosen Guests as your report type, then your filters
                      will have guest details, etc.
                    </Text>
                    <Grid templateColumns="repeat(2,1fr)" gap={6} pt={3}>
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                         
                          isInvalid={
                            !!errors.emailDistritributionList &&
                            touched.emailDistritributionList
                          }
                        >
                          <FormLabel pt="2" fontSize={"sm"}>
                            EMAIL DISTRIBUTION LIST
                          </FormLabel>
                          <Field
                            as="input"
                            name="emailDistritributionList"
                            id="emailDistritributionList"
                      
                            fontSize={"xs"}
                            style={customtextArea}
                            // onChange={handlePropertyName}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please enter an email";
                              }
                              return error;
                            }}
                          />

                          <FormErrorMessage>
                            {errors.emailDistritributionList}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                     
                          isInvalid={!!errors.time && touched.time}
                        >
                          <FormLabel pt="2" fontSize={"sm"}>
                            TIME
                          </FormLabel>
                          <Field
                            // as="date"
                            name="time"
                            id="datetimevalue"
                            type="time"
                            fontSize="14.5px"
                    
                            style={customtextArea}
                      
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please provide an time";
                              }
                              return error;
                            }}
                          />

                          <FormErrorMessage>{errors.time}</FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={2} my="2">
                        <FormControl
            
                        >
                          <FormLabel pt="2" fontSize={"sm"}>
                            DAYS OF WEEK
                          </FormLabel>
                          <Flex>
                            {[
                              "SUN",
                              "MON",
                              "TUE",
                              "WED",
                              "THU",
                              "FRI",
                              "SAT",
                            ].map((value, index) => (
                              <>
                                <Field
                                  id="datetimevalue"
                                  type="checkbox"
                                  fontSize="14.5px"
                                  name="weekdays"
                                  style={customtextArea}
                                  value={value}
                          
                                />
                                {value}
                              </>
                            ))}
                          </Flex>


                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          // isInvalid={propertyInformationErr}
                          isInvalid={!!errors.subject && touched.subject}
                        >
                          <FormLabel pt="2" fontSize={"sm"}>
                            SUBJECT
                          </FormLabel>
                          <Field
                            as="input"
                            name="subject"
                            id="subject"
                            // placeholder="Select option"
                            fontSize={"xs"}
                            style={customtextArea}
                            // onChange={handlePropertyName}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please enter a subject";
                              }
                              return error;
                            }}
                          />

                          <FormErrorMessage>{errors.subject}</FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      {/* <input type=""/> */}
                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          
                          isInvalid={
                            !!errors.propertytype && touched.propertytype
                          }
                        >
                          <FormLabel pt="2" fontSize={"sm"}>
                            PROPERTY TYPE
                          </FormLabel>
                          <Field
                            as="select"
                            name="propertytype"
                            id="propettytype"
                            placeholder="Select option"
                            fontSize={"xs"}
                            style={customtextArea}
                            // onChange={handlePropertyName}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a property type";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {propertyInformation.map((report, index) => (
                              <option
                                value={report._id}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report.propertyName}
                              </option>
                            ))}
                          </Field>
                          {/* {propertyInformationErr && (
                            <FormErrorMessage>
                              Please Select Property Type.
                            </FormErrorMessage>
                          )} */}
                          <FormErrorMessage>
                            {errors.propertytype}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          isInvalid={!!errors.branch && touched.branch}
                        >
                          <FormLabel pt="2" fontSize={"sm"} htmlFor="branch">
                            SELECT BRANCH
                          </FormLabel>
                          <Field
                            as="select"
                            placeholder="Select Branch"
                            fontSize={"xs"}
                            style={customtextArea}
                            // onChange={handleBranchName}
                            name="branch"
                            id="branch"
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {states.map((report, index) => (
                              <option
                                value={report}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report}
                              </option>
                            ))}
                          </Field>
                          {/* {selectedBranchValueErr && (
                            <FormErrorMessage>
                              Please Select Branch Type.
                            </FormErrorMessage>
                          )} */}
                          <FormErrorMessage>{errors.branch}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          // isInvalid={reportTypeValErr}
                          isInvalid={!!errors.reportType && touched.reportType}
                        >
                          <FormLabel
                            pt="2"
                            fontSize={"sm"}
                            htmlFor="reportType"
                          >
                            REPORTS TYPE
                          </FormLabel>
                          <Field
                            as="select"
                            name="reportType"
                            id="reportType"
                            style={customtextArea}
                            // placeholder="Select option"
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                          >
                            <option></option>
                            {reportsType.map((report, index) => (
                              <option
                                value={report}
                                key={index}
                                fontSize={"xs"}
                              >
                                {report}
                              </option>
                            ))}
                          </Field>

                          <FormErrorMessage>
                            {errors.reportType}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: "2", sm: "1" }}>
                        <FormControl
                          isInvalid={!!errors.reportName && touched.reportName}
                        >
                          <FormLabel
                            htmlFor="reportName"
                            pt="2"
                            fontSize={"sm"}
                          >
                            REPORT NAME
                          </FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name="reportName"
                            id="reportName"
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                                error = "Please select a Branch";
                              }
                              return error;
                            }}
                          
                          />
                       
                          <FormErrorMessage>
                            {errors.reportName}
                          </FormErrorMessage>
                          {/* )} */}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2} my="2">
                        <FormControl
                          isInvalid={!!errors.emailBody && touched.emailBody}
                        >
                          <FormLabel htmlFor="emailBody" pt="2" fontSize={"sm"}>
                            EMAIL BODY
                          </FormLabel>
                          <Field
                            as="textarea"
                            // placeholder="Add Description"
                            style={customtextArea}
                            name="emailBody"
                            id="emailBody"
                            fontSize={"xs"}
                            validate={(value) => {
                              let error;
                              if (!value) {
                             
                                error = "Please provide an email body ";
                              }
                              return error;
                            }}
                          />
                          <FormErrorMessage>
                            {errors.emailBody}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                    </Grid>

                    <GridItem colSpan={2} my="2" display="flex">
                      <Stack w="100%">
                        <Grid pb="3" pt="2" fontSize={"xs"}>
                          <Text
                            display="flex"
                            alignItems="center"
                            fontSize={"sm"}
                            color="white"
                            background="blue.500"
                          >
                            <Image
                              src={
                                window.location.origin +
                                "/assets/images/analyticFile.png"
                              }
                              mr={2}
                            />
                            More report types are coming!
                          </Text>
                        </Grid>
                      </Stack>
                    </GridItem>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="sm"
                      type="submit"
                      // onClick={handleNewReportOnClick}
                      isLoading={loading}
                      colorScheme="blue"
                      loadingText='Creating'
                      mr={3}
                    >
                      Create
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={automationmodalOnClose}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </Formik>

          {/* </form> */}
        </ModalContent>
      </Modal>
      {/* **********************************automation modal ends************************************** */}
    </Container>
  );
}
const reservationInlineContainer = {
  marginInlineStart: "10px",
  width: "180px",
};
const reservationContainerNewReport = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  cursor: "pointer",
  color: "rgb(0 0 0)",
};
const reservationCenterIcon = {
  width: "37px",
  height: "36px",
  background: "rgb(0 0 0)",
  display: "flex",
  color: "#fff",
  alignItems: "center",
  justifyContent: "center",
  padding: "11px",
  borderRadius: "49px",
};
const accordianButtonStyle = {
  background: "#0c0c0c",
  margin: "1px",
  padding: "13px 17px",
  color: "#fff",
};

const accordianButtonStyleother = {
  background: "#0c0c0c",
  margin: "1px",
  color: "#fff",
  padding: "15px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};
const headerMenuItems = {
  listStyle: "none",
  padding: "0px",
  margin: "0px",
   
};
const headerMenuItemsother = {
  listStyle: "none",
  padding: "0px",
  margin: "0px",
  borderRight: ".5px solid #d3d2d2",
  borderRadius: "6px",
};
const headerMenuItemsInner = {
  listStyle: "none",
  padding: "revert",
  margin: "0px",
};
const headerMenuItemsInnerother = {
  listStyle: "none",
  margin: "0px",
};
const leftAccordianDrawerStyle = {
  width: "372px",
  marginTop: "8px",
  overflow: "auto",
  display: "block",
  opacity: 1,
  height: "auto",
  position: "absolute",
  left: "0px",
  minHeight: "88.5vh",
  top: "64px",
  maxHeight: "88.5vh",
  background: "#fff",
  zIndex: "99999",
};
const headerMenuItemsList = {
  display: "flex",
  fontSize: "13px",
  padding: "10px",
  cursor: "pointer",
};
const headerMenuItemsList1 = {
  padding: "0px 14px",
  display: "flex",
  fontSize: "13px",
  borderBottom: "1px solid #e1dcdc",
};
const headerMenuItemsListother = {
  padding: "15px",
  display: "flex",
  fontSize: "13px",
  justifyContent: "center",
  borderBottom: "1px solid #e1dcdc",
};
const headerMenuListIcon = {
  marginRight: "22px",
  fontSize: "16px",
};
const navLinkStyle = {
  display: "flex",
  width: "100%",
  padding: "10px",
  // color: "white",
  borderBottom: "1px solid #e1dcdc",
};
const activeNav = {
  background: "black",
  color: "rgb(255, 255, 255)",
};
const headerMenuListIconother = {
  fontSize: "16px",
};

const acordionItemsList = {
  margin: " 0px -17px",
  borderBottomWidth: "0px",

  borderTopWidth: "0px",
  borderColor: "#fff",
  overflowAnchor: "none",
  width: "324px",
};

const customtextArea = {
  padding: "7px",
  width: "100%",
  // border: "1px solid #8080803d",
  borderRadius: "5px",
};
