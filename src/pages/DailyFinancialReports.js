import { FaQuestionCircle } from "react-icons/fa";
import Header from "../components/Header/Header";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { ImTable2 } from "react-icons/im";
import axios from "axios";
import { saveAs } from "file-saver";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import styles from "../assets/css/DailyFinancialReports.module.css";
import LoadSpinner from "../common/LoadSpinner.js";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Card,
  Container,
  Flex,
  Heading,
  Select,
  position,
  Box,
} from "@chakra-ui/react";

import PieChartComponent from "../components/DailyFinancialReports/PieChartComponent";
import DailyStatistics from "../components/DailyFinancialReports/DailyStatistics";
import RoomRevenue from "../components/DailyFinancialReports/RoomRevenue";
import BooksForcast from "../components/DailyFinancialReports/BooksForcast";
 import { Formik, Form, Field, ErrorMessage } from "formik";
 import Axios from "axios";


export default function DailyFinancialReports({ storyBookProps })  {
  const initialRef = React.useRef(null);
   const sendButtonRef = React.useRef(null)

  const toast = useToast();
  const [date1, setDate] = React.useState(
    new Date().toISOString().split("T")[0]
  )
 const [initialvaluesState, setInitialValueState] = React.useState({
  email:"",
  reporttype:""
 })
const [loading,setLoading] = React.useState(true)
  let monthname = new Date(date1);
  monthname = String(monthname).split(" ")[1];

  const [apidata, setapidata] = React.useState();

  const [csvdatatosend, setCsvdatatosend] = React.useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {

    setTimeout(() => {
      storyBookProps?.sendButtonClicked&&sendButtonRef.current.click();
      // Click the button after a delay
    }, 500); // Adjust the delay as needed
  return () => {
    clearTimeout(); // Cleanup any pending timeouts when component unmounts
  };

  }, [isOpen]);


  React.useEffect(() => {
    getdata(date1);
  }, [date1]);






 



  React.useEffect(() => {
    storyBookProps?.ShouldEmailModalOpen && onOpen()
    if(storyBookProps?.shouldDataBeFilled)
      setInitialValueState(storyBookProps?.data)
    storyBookProps?.showEmailSuccessToast && toast({
      title: "Email sent successfully.",
      description: "Email Send Successfully to provided Email",
      status: "success",
      isClosable: true,
    });
   
  }, [storyBookProps])

 const sendEmail = async (emailAddress, reportName, csvdatatosend ) => {
   const csvContent = csvdatatosend?.map((row) => row.join(",")).join("\n");
   const url = process.env.REACT_APP_API_URL + `/admin/sharecsv`;
   Axios({
     method: "POST",
     url: url,
     params: {
       csvContent,
       reportName,
       emailAddress,
     },
     headers: {
       Authorization: "Bearer " + localStorage.getItem("userToken"),
       ContentType: "multipart/form-data",
     },
   })
     .then((res) => {
       toast({
         title: "Email sent successfully.",
         description: res.data.message,
         status: "success",
         duration: 2000,
         isClosable: true,
       });

       onClose();
     })
     .catch((err) => {
       toast({
         title: "Error",
         description: err,
         status: "failure",
         duration: 2000,
         isClosable: true,
       });
     });
 };

  const getdata = async (d) => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/dailyfinancialreports`,
      params: {id:d},
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await axios(config);

    setapidata(response?.data?.data);
    // setcsvdata2(response.data.data);
    setLoading(false)
    // const csvContent = csvdata2.map(row => row.join(',')).join('\n');
    //  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    //saveAs(blob, 'data.csv');
  };

  const infoIconText = {
    color: "#3366ff",
    // marginRight:"20px"
  };
  const marginRight10 = {
    marginRight: "10px",
  };

  const tableselected =[
  "occupancy_rate",
  "daily_statistics",
  "room_revenue",
  "books_forcast"
  ];

 useEffect(()=>{
  //  && prepareDownloadCsv("daily_statistics")
    storyBookProps?.isDailyStatisticsSelected && 
    downloadCSV([
     ["", "TODAY", "MONTH TO DATE"],
     ["ITEMS AND SERVICES REVENUE", "0.00", "0.00"],
     [
       "PAYMENTS",
       storyBookProps?.statistics?.today?.paymentForGivenDate,
       storyBookProps?.statistics?.monthTodate?.paymentForMonthToDate,
     ],
     ["COMPS", "-", "-"],
     [
       "WALK-INS",
       storyBookProps?.statistics?.today?.walkInforGivenDate,
       storyBookProps?.statistics?.monthTodate?.walkInforGivenDatemonthtodate,
     ],
     [
       "NUMBER OF GUESTS",
       storyBookProps?.statistics?.today?.totalGuests,
       storyBookProps?.statistics?.monthTodate?.totalGuestsmonthtodate,
     ],
     [
       "CHECK-INS",
       storyBookProps?.statistics?.today?.totalCheckIns,
       storyBookProps?.statistics?.monthTodate?.totalcheckInsMonthtodate,
     ],
     [
       "CHECK-OUTS",
       storyBookProps?.statistics?.today?.totalCheckOuts,
       storyBookProps?.statistics?.monthTodate?.totalcheckOutsmonthtoDate,
     ],
     [
       "AVERAGE LOS (NIGHTS STAYED)",
       storyBookProps?.statistics?.today?.avgLosForgivendate,
       storyBookProps?.statistics?.monthTodate?.AvgLosmonthtodate,
     ],
     [
       "AVERAGE LOS (TOTAL ROOM NIGHTS)",
       storyBookProps?.statistics?.today?.avglostotalnightsgivendate,
       storyBookProps?.statistics?.monthTodate?.avglostotalnightsmonthtodate,
     ],
     [
       "ADR PER GUEST",
       storyBookProps?.statistics?.today?.adrforgivendateperguest,
       storyBookProps?.statistics?.monthTodate?.adrforemonthtodateperguest,
     ],
     ["NO SHOWS", "0", "0"],
     ["BLOCKS", "-", "-"],
     ["ADJUSTMENTS", "$0.00", "$0.02"],
     [
       "TOTAL REVENUE",
       storyBookProps?.statistics?.today?.totalrevenueforgivendate,
       storyBookProps?.statistics?.monthTodate?.totalrevenueformonthtodate,
     ],
     ["", date1, monthname + " " + new Date(date1).getFullYear()],
   ])
 }, [storyBookProps?.isDailyStatisticsSelected])

  function downloadCSV(csvdata2) {
   
    const csvContent = csvdata2?.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  }

  function prepareDownloadCsv(value,email, emailAddress){
    if(value === "occupancy_rate"){
      let data = [
        [
          "occupancy",
          "Available Rooms",
          "Percentage Of Rooms Booked",
          "Percentage Of Rooms In Maintenance",
        ],
        [
          "Today Data",
          apidata.occupancy.todaydata.availableRooms,
          apidata.occupancy.todaydata.percentageofRoomsBooked,
          apidata.occupancy.todaydata.percentageofroomsinmaintenance,
        ],
        [
          "Whole Month Data",
          apidata.occupancy.wholemonthdata.availableRooms,
          apidata.occupancy.wholemonthdata.percentageofRoomsBooked,
          apidata.occupancy.wholemonthdata.percentageofroomsinmaintenance,
        ],
      ];

    //  setcsvdata2(data);
    if (email === "sendcsvemail"){
      // setCsvdatatosend(data)
      sendEmail(emailAddress, value, data)
    }
    else downloadCSV(data);
    }
    else if (value === "daily_statistics") {
      let data = [
        ["", "TODAY", "MONTH TO DATE"],
        ["ITEMS AND SERVICES REVENUE", "0.00", "0.00"],
        [
          "PAYMENTS",
          apidata?.statistics?.today?.paymentForGivenDate,
          apidata?.statistics?.monthTodate?.paymentForMonthToDate,
        ],
        ["COMPS", "-", "-"],
        [
          "WALK-INS",
          apidata?.statistics?.today?.walkInforGivenDate,
          apidata?.statistics?.monthTodate?.walkInforGivenDatemonthtodate,
        ],
        [
          "NUMBER OF GUESTS",
          apidata?.statistics?.today?.totalGuests,
          apidata?.statistics?.monthTodate?.totalGuestsmonthtodate,
        ],
        [
          "CHECK-INS",
          apidata?.statistics?.today?.totalCheckIns,
          apidata?.statistics?.monthTodate?.totalcheckInsMonthtodate,
        ],
        [
          "CHECK-OUTS",
          apidata?.statistics?.today?.totalCheckOuts,
          apidata?.statistics?.monthTodate?.totalcheckOutsmonthtoDate,
        ],
        [
          "AVERAGE LOS (NIGHTS STAYED)",
          apidata?.statistics?.today?.avgLosForgivendate,
          apidata?.statistics?.monthTodate?.AvgLosmonthtodate,
        ],
        [
          "AVERAGE LOS (TOTAL ROOM NIGHTS)",
          apidata?.statistics?.today?.avglostotalnightsgivendate,
          apidata?.statistics?.monthTodate?.avglostotalnightsmonthtodate,
        ],
        [
          "ADR PER GUEST",
          apidata?.statistics?.today?.adrforgivendateperguest,
          apidata?.statistics?.monthTodate?.adrforemonthtodateperguest,
        ],
        ["NO SHOWS", "0", "0"],
        ["BLOCKS", "-", "-"],
        ["ADJUSTMENTS", "$0.00", "$0.02"],
        [
          "TOTAL REVENUE",
          apidata?.statistics?.today?.totalrevenueforgivendate,
          apidata?.statistics?.monthTodate?.totalrevenueformonthtodate,
        ],
        ["", date1, monthname + " " + new Date(date1).getFullYear()],
      ];
      //  setcsvdata2(data);
    if (email === "sendcsvemail") {
      // setCsvdatatosend(data)
      sendEmail(emailAddress, value, data);
    } else downloadCSV(data);
    } 
    else if (value === "room_revenue") {
      let data = [
        ["", "TODAY", "MONTH TO DATE"],
        [
          "REVPAR",
          apidata.roomRevenue.today.revpargivendate,
          apidata.roomRevenue.monthToDate.revparForMonthToDate,
        ],
        [
          "ADR",
          apidata.roomRevenue.today.adrforgivendate,
          apidata.roomRevenue.monthToDate.AdrMonthToDate,
        ],
        [
          "ROOM REVENUE",
          apidata.roomRevenue.today.roomrevenue,
          apidata.roomRevenue.monthToDate.totalRoomRevenueMonthtoDate,
        ],
        ["", date1, monthname + " " + new Date(date1).getFullYear()],
      ];

      // setcsvdata2(data);
       if (email === "sendcsvemail") {
         // setCsvdatatosend(data)
         sendEmail(emailAddress, value, data);
       } else downloadCSV(data);
    } else if (value === "books_forcast") {
      let data = [
        [
          "TOTAL ROOMS SOLD",
          `"${apidata.booksForecast.totalRoomsOccupiedformonth} (${apidata.booksForecast.occupancyForWholeMonth} %)"`,
        ],
        ["ADR", apidata.booksForecast.AdrForWholeMonth],
        ["REVPAR", apidata.booksForecast.revparForWholeMonth],
        ["ROOM REVENUE", apidata.booksForecast.totalRoomRevenueWholeMonth],
      ];
      // setcsvdata2(data);
 if (email === "sendcsvemail") {
   // setCsvdatatosend(data)
   sendEmail(emailAddress, value, data);
 } else downloadCSV(data);
    }
  }


  return (
    <>
      {/* <Header /> */}
      {loading ? (
        <LoadSpinner isLoading={loading} />
      ) : (
        <Container
          maxW="container.xxl"
          backgroundColor="#ecf2f9"
          className={styles.container}
        >
          <Flex
            // p={"5"}
            py="5"
            px={{ base: "2", md: "5" }}
            alignItems="center"
            gap="2"
            justifyContent="space-between"
            flexWrap={"wrap"}
            className={styles.header}
          >
            <Flex alignItems="center" className={styles.headerchild1}>
              <Heading
                fontSize={{ base: "md", sm: "lg" }}
                className={styles.heading}
              >
                Daily financial Reports page
                <FaQuestionCircle style={infoIconText} width={"15px"} />
              </Heading>
              <Input
                type="date"
                outline="none"
                className={styles.date}
                fontSize={"sm"}
                onChange={(e) => setDate(e.target.value)}
                value={date1}
              />
            </Flex>
            <Flex gap="2" className={styles.headerchild2}>
              <Button colorScheme="blue" borderRadius={"20px"} onClick={onOpen}>
                <AiOutlineMail style={marginRight10} />
                Email
              </Button>
              {/* <Button> */}
              <Box position="relative">
                <ImTable2 style={customtableicon} />
                <Select
                  fontSize={"sm"}
                  border="0"
                  placeholder="Download CSV"
                  cursor={"pointer"}
                
                  style={customSelect}
                    defaultValue={storyBookProps?.isDailyStatisticsSelected?"daily_statistics":""}
                  onChange={(e) => {
                    prepareDownloadCsv(e.target.value);
                  }}
               
                  bg="teal"
                  borderRadius={"20px"}
                  color="black"
                >
                  {tableselected.map((value) => (
                    <option value={value} style={customoptions}>
                      {value}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
          </Flex>

          <Flex
            gap="4"
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            pb="5"
          >
            <Card borderTop="4px solid #3366ff" className={styles.cards}>
              <PieChartComponent data={apidata?.occupancy} date1={date1} />
            </Card>
            <Card
              borderTop="4px solid #3366ff"
              padding="20px"
              className={styles.cards}
            >
              <DailyStatistics
                apidata={apidata?.statistics}
                date1={date1}
                monthname={monthname}
                loading={loading}
              />
            </Card>
            <Card
              borderTop="4px solid #3366ff"
              padding="20px"
              className={styles.cards}
            >
              <RoomRevenue
                data={apidata?.roomRevenue}
                date1={date1}
                monthname={monthname}
              />
            </Card>
            <Card
              borderTop="4px solid #3366ff"
              padding="20px"
              className={styles.cards}
            >
              <BooksForcast
                data={apidata?.booksForecast}
                date1={date1}
                monthname={monthname}
              />
            </Card>
          </Flex>

          <Modal 
          initialFocusRef={initialRef} 
         
          isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter the reciever's email</ModalHeader>
              <ModalCloseButton />
                <ModalBody pb={6}>
                <Formik
                    initialValues={initialvaluesState}
                    onSubmit={(values) => {
                    // alert(JSON.stringify(values, null, 2));
                    // sendEmail(values.email, values.reporttype);
                    prepareDownloadCsv(values.reporttype, "sendcsvemail", values.email);
                  }}
                >
                  {({ handleSubmit, errors, touched, onChange }) => (
                    <form onSubmit={handleSubmit}>
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
                            if (
                              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                              )
                            )
                              error =
                                "Please enter an email in the correct format";
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.reporttype && touched.reporttype}
                        mt="3"
                      >
                        <FormLabel>Select Report Type</FormLabel>
                        <Field
                          as="select"
                          type="select"
                          name="reporttype"
                          id="reporttype"
                          validate={(value) => {
                            let error;
                            if (value === "")
                              error = "Please select a report type";
                            return error;
                          }}
                          // onChange={handleChange}
                        >
                          <option></option>
                          {tableselected.map((value) => (
                            <option value={value} style={modalselect}>
                              {value}
                            </option>
                          ))}
                        </Field>
                        <FormErrorMessage>{errors.reporttype}</FormErrorMessage>
                      </FormControl>

                      <Button
                        ref={sendButtonRef}
                        id="submitbutton"
                        type="submit"
                        colorScheme="purple"
                        width="full"
                        mt="4"
                      >
                        Send
                      </Button>
                    </form>
                  )}
                </Formik>
              </ModalBody>

              <ModalFooter>
                {/* <Button
          colorScheme="blue"
          mr={3}
          onClick={() => {
            sendEmail(email);
          }}
        >
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      )}
    </>
  );
};

const customtableicon = {
  zIndex:1,
  position:"absolute",
  top: "13px",
  left: "14px",
  fontSize: "14px",
  color: "white"
}

const customSelect = {
     padding: "5px 40px",
    fontSize: "15px",
    fontWeight: "500",
    color: "white",
    background:"teal"
}

const customoptions = {
  background:"teal"
}

const modalselect = {
      "border":"1px solid grey",
    "borderRadius": "5px",
    "padding": "8px"
}
