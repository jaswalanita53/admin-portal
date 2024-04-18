import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Container,
  Heading,
  Select,
  Text,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import Header from "../components/Header/Header";
import { DataTable } from "../common/dataTables.js";
import { useParams } from "react-router-dom";
import LoadSpinner from "../common/LoadSpinner.js";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function changeStatusRoom(value, Id) {
  alert(Id);
  alert(value);
}

function ViewReservation() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [userInformation, setUserInformation] = React.useState({});
  const [accommodationsArr, setAccommodations] = React.useState([]);

  const [previousStayUser, setPreviousStayUser] = React.useState([]);
  const [totalNumberOfCount, setTotalNumberOfCount] = React.useState(0);
  const [guestInfo, setGuestInfo] = React.useState([{}]);
  const TopHeaderGuestInfo = [
    {
      heading: "Guest Info",
      colspan: 6,
    },
    {
      heading: "Billing Info",
      colspan: 7,
    },
    {
      heading: "Scanned Data",
      colspan: 12,
    },
  ];

  React.useEffect(() => {
    getAccommodationById();
    getUserById();
    getPreviousStayByUserId();
    setLoading(true);
    getGuestInfo();
    //  eslint-disable-next-line
  }, []);

  async function getGuestInfo() {
    const userToken = localStorage.getItem("userToken");
    const data = { userId: params.id };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getGuestDetails",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      let responsedata = response?.data?.data[0];
      setGuestInfo([
        {
          guestid: responsedata?._id,
          firstName: responsedata?.firstName,
          lastName: responsedata?.lastName,
          email: responsedata?.emailAddress,
          phoneNumber: responsedata?.phoneNumber,
          country: responsedata?.country,
          billingZipCode: responsedata?.billingAddress?.zipcode,
          billingAddress1: responsedata?.billingAddress?.address1,
          billingAddress2: responsedata?.billingAddress?.address2,
          billingCity: responsedata?.billingAddress?.city,
          billingState: responsedata?.billingAddress?.state,
          billingCountry: responsedata?.billingAddress?.country,
          billingEmail: responsedata?.billingAddress?.email,
        },
      ]);

      if (responsedata?.scannedIdData) {
        let scanneddata = JSON.parse(responsedata?.scannedIdData);
        let data = {
          scannedCountry: scanneddata ? scanneddata?.document?.country : "",
          privateName: scanneddata ? scanneddata?.document?.privateName : "",
          scannedFamilyName: scanneddata
            ? scanneddata?.document?.familyName
            : "",
          scannedAddress: scanneddata ? scanneddata?.document?.address : "",
          scannedZip: scanneddata ? scanneddata?.document?.zip : "",
          documentStatus: scanneddata
            ? scanneddata?.documentVerificationResult?.statusString
            : "",
          geoContinent: scanneddata ? scanneddata?.geolocation?.continent : "",
          geoCountry: scanneddata ? scanneddata?.geolocation?.country : "",
          geoState: scanneddata ? scanneddata?.geolocation?.state : "",
          geoTimeZone: scanneddata ? scanneddata?.geolocation?.timeZone : "",
          latitude: scanneddata ? scanneddata?.geolocation?.latitude : "",
          longitude: scanneddata ? scanneddata?.geolocation?.longitude : "",
        };
        setGuestInfo([{ ...guestInfo, data }]);
      } else {
      }
    }
  }
  async function getUserById() {
    const userToken = localStorage.getItem("userToken");
    const data = { userId: params.id };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getUserById",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setUserInformation(response.data.data);
      getRewardsByUserId();
    }
  }
  async function getRewardsByUserId() {
    const userToken = localStorage.getItem("userToken");
    const data = { userId: params.id };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getRewardsByUserId",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setTotalNumberOfCount(
        response.data.data.reduce(
          (a, b) =>
            a + moment(b.checkOutDate).diff(moment(b.checkInDate), "days"),
          0
        )
      );
    }
  }

  async function getPreviousStayByUserId() {
    const userToken = localStorage.getItem("userToken");
    const data = { userKey: params.id };
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_URL +
        "/admin/reservation/getPreviousStayByUserId",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      if (response.data.data === "no data exists") {
        setPreviousStayUser([]);
      } else if (response?.data?.data.length === 1)
        setPreviousStayUser(prepareRowsDataFromTableSingle(response.data.data));
      else if (response?.data?.data.length > 1)
        setPreviousStayUser(prepareRowsDataFromTable(response.data.data));
      setLoading(false);
    }
  }
  async function getAccommodationById() {
    const userToken = localStorage.getItem("userToken");
    const data = { userId: params.id };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getAccommodationById",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      if (response?.data?.data.length === 1)
        setAccommodations(prepareRowsDataFromTableSingle(response?.data?.data));
      if (response?.data?.data.length > 1)
        setAccommodations(prepareRowsDataFromTable(response?.data?.data));
      setLoading(false);
    }
  }

  const prepareRowsDataFromTableSingle = (data) => {
    const tmpRows = [];

    let row = data[0];
    tmpRows.push({
      bookingID: row?.bookingID,
      guestName: row?.userInfo?.firstName + " " + row?.userInfo?.lastName,

      dateBooked: moment(row?.bookingDate).format("MMMM DD-YYYY"),
      roomNumber: "dbl(" + row?.roomNumber + ")",
      checkInDate: moment(row?.checkInDate).format("MM-DD-YYYY"),
      checkOutDate: moment(row?.checkOutDate).format("MM-DD-YYYY"),
      noOfPerson: row?.noOfPerson,
      noOfNights: row?.totalDays,
      totalPrice: (+row?.totalPrice).toFixed(3),
      bookingStatus: row?.bookingStatus,
      paymentStatus: row?.paymentStatus,
    });
    return tmpRows;
  };

  const prepareRowsDataFromTable = (data) => {
    const tmpRows = [];

    data?.map((row) => {
      // let dateDiff = moment(row.checkOutDate).diff(moment(row.checkInDate), 'days');
      tmpRows.push({
        // "id": row._id,
        // "key": index + 1,
        // "roomName": row.roomsInfo.roomName,
        bookingID: row?.bookingID,
        guestName: row?.userInfo?.firstName + " " + row?.userInfo?.lastName,
        // 'lastName': row.userInfo.lastName,
        dateBooked: moment(row?.bookingDate).format("MMMM DD-YYYY"),
        roomNumber: "dbl(" + row?.roomNumber + ")",
        // "arrivalAndDeparture": moment(row.checkInDate).format("MM-DD-YYYY") + "/" + moment(row.checkOutDate).format("MM-DD-YYYY"),
        checkInDate: moment(row?.checkInDate).format("MM-DD-YYYY"),
        checkOutDate: moment(row?.checkOutDate).format("MM-DD-YYYY"),

        // occupied: (
        //   <Switch
        //     size="lg"
        //     onChange={(e) => {
        //       changeStatusRoom(e.target.checked, row._id);
        //     }}
        //   />
        // ),
        noOfPerson: row?.noOfPerson,
        noOfNights: row?.totalDays,
        totalPrice: (+row?.totalPrice).toFixed(3),
        bookingStatus: row?.bookingStatus,
        paymentStatus: row?.paymentStatus,
      });
    });

    return tmpRows;
  };

  const columnHelper = createColumnHelper();

  const guestInfoColumns = [
    columnHelper.accessor("guestid", {
      cell: (info) => info.getValue(),
      header: "GUEST ID",
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: "FIRST NAME",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: "LAST NAME",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (info) => info.getValue(),
      header: "Phone Number",
    }),
    columnHelper.accessor("country", {
      cell: (info) => info.getValue(),
      header: "Country",
    }),
    columnHelper.accessor("billingZipCode", {
      cell: (info) => info.getValue(),
      header: "Zip Code",
    }),
    columnHelper.accessor("billingAddress1", {
      cell: (info) => info.getValue(),
      header: "Address 1",
    }),
    columnHelper.accessor("billingAddress2", {
      cell: (info) => info.getValue(),
      header: "Address 2",
    }),
    columnHelper.accessor("billingCity", {
      cell: (info) => info.getValue(),
      header: "City",
    }),
    columnHelper.accessor("billingState", {
      cell: (info) => info.getValue(),
      header: "State",
    }),
    columnHelper.accessor("billingCountry", {
      cell: (info) => info.getValue(),
      header: "Country",
    }),
    columnHelper.accessor("billingEmail", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("scannedCountry", {
      cell: (info) => info.getValue(),
      header: "Scanned Country",
    }),
    columnHelper.accessor("privateName", {
      cell: (info) => info.getValue(),
      header: "Scanned Name",
    }),
    columnHelper.accessor("scannedFamilyName", {
      cell: (info) => info.getValue(),
      header: "Family Name",
    }),
    columnHelper.accessor("scannedAddress", {
      cell: (info) => info.getValue(),
      header: "Scanned Address",
    }),
    columnHelper.accessor("scannedZip", {
      cell: (info) => info.getValue(),
      header: "Scanned Zip",
    }),
    columnHelper.accessor("documentStatus", {
      cell: (info) => info.getValue(),
      header: "Document Status",
    }),
    columnHelper.accessor("geoContinent", {
      cell: (info) => info.getValue(),
      header: "GEO Continent ",
    }),
    columnHelper.accessor("geoCountry", {
      cell: (info) => info.getValue(),
      header: "GEO Country ",
    }),
    columnHelper.accessor("geoState", {
      cell: (info) => info.getValue(),
      header: "GEO State",
    }),
    columnHelper.accessor("geoTimeZone", {
      cell: (info) => info.getValue(),
      header: "GEO TimeZone",
    }),
    columnHelper.accessor("latitude", {
      cell: (info) => info.getValue(),
      header: "Latitude",
    }),
    columnHelper.accessor("longitude", {
      cell: (info) => info.getValue(),
      header: "Longitude",
    }),
  ];

  const folioColumns = [
    columnHelper.accessor("bookingID", {
      cell: (info) => info.getValue(),
      header: "Booking Id",
    }),
    columnHelper.accessor("guestName", {
      cell: (info) => info.getValue(),
      header: "Guest Name",
    }),
    columnHelper.accessor("dateBooked", {
      cell: (info) => info.getValue(),
      header: "Booking Date",
    }),
    columnHelper.accessor("roomNumber", {
      cell: (info) => info.getValue(),
      header: "Room Number",
    }),
    columnHelper.accessor("checkInDate", {
      cell: (info) => info.getValue(),
      header: "Check In",
    }),
    columnHelper.accessor("checkOutDate", {
      cell: (info) => info.getValue(),
      header: "Check Out",
    }),
    columnHelper.accessor("noOfNights", {
      cell: (info) => info.getValue(),
      header: "Nights ",
    }),
    columnHelper.accessor("totalPrice", {
      cell: (info) => info.getValue(),
      header: "Total Price",
    }),
    columnHelper.accessor("bookingStatus", {
      cell: (info) => info.getValue(),
      header: "Booking Status",
    }),
    columnHelper.accessor("paymentStatus", {
      cell: (info) => info.getValue(),
      header: "Payment Status",
    }),
  ];
  const accommodationColumn = [
    columnHelper.accessor("bookingID", {
      cell: (info) => info.getValue(),
      header: "RES ID",
    }),
    columnHelper.accessor("guestName", {
      cell: (info) => info.getValue(),
      header: "TYPE",
    }),
    columnHelper.accessor("guestName", {
      cell: (info) => info.getValue(),
      header: "GUEST",
      meta: {
        isNumeric: false,
      },
    }),
    columnHelper.accessor("arrivalAndDeparture", {
      cell: (info) => info.getValue(),
      header: "ARRIVAL/DEPARTURE",
      meta: {
        isNumeric: false,
      },
    }),
    columnHelper.accessor("noOfNights", {
      cell: (info) => info.getValue(),
      header: "Nights",
      meta: {
        isNumeric: false,
      },
    }),
    columnHelper.accessor("totalPrice", {
      cell: (info) => info.getValue(),
      header: "TOTAL",
    }),
    columnHelper.accessor("occupied", {
      cell: (info) => info.getValue(),
      header: "OCCUPIED",
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
      //  { console.log("info",info)}
        <Menu>
          <MenuButton as={Button}>
            <FaEllipsisV /> 
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={(e) => {
                window.location.href =
                  "/admin/reservation/edit/" + info.getValue();
              }}
              // onClick={(e) =>{navigate(`/admin/reservation/edit/${info.getValue()}`)}}
            >
              Edit Reservation
            </MenuItem>
            <MenuItem>View on Calender</MenuItem>
            <MenuItem>Delete Accommodations</MenuItem>
          </MenuList>
        </Menu>
      ),
      header: "EDIT",
      meta: {
        isNumeric: false,
      },
    }),
  ];

  return (
    <>
      {/* <Header /> */}
      <Container maxW="container.xxl" backgroundColor="#ecf2f9">
        {!loading && (
          <Grid templateColumns="repeat(1, 1fr)" gap={6} px={10} py={5}>
            <GridItem w="100%" h="10" pt="8" py={"3"}>
              <Grid templateColumns="repeat(2,1fr)">
                <GridItem>
                  <Heading size="lg">
                    {userInformation?.firstName && userInformation?.firstName}{" "}
                    {userInformation?.lastName && userInformation.lastName}
                  </Heading>
                  <Text color={"#999"} fontWeight={"500"}>
                    {accommodationsArr[0]?.bookingID}
                  </Text>
                </GridItem>
                <GridItem display={"flex"} justifyContent={"end"}>
                  <Select
                    placeholder="Select Status"
                    value={accommodationsArr[0]?.bookingStatus}
                    size="md"
                    fontSize={"sm"}
                    background={"white"}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="confirmationPending">
                      Confirmation Pending
                    </option>
                    <option value="Canceled">Canceled</option>
                    <option value="inHouse">In-House</option>
                    <option value="checkedOut">Checked Out</option>
                    <option value="noShow">No-Show</option>
                  </Select>
                  <Select
                    placeholder="- Select Guest Status -"
                    size="md"
                    fontSize={"sm"}
                    background={"white"}
                  >
                    <option value="">Not Allowed to Stay</option>
                  </Select>
                  <Select
                    placeholder="Actions"
                    size="md"
                    fontSize={"sm"}
                    background={"white"}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem w="100%" py={5} overflow={"auto"}>
              <Card>
                <CardBody>
                  <Grid templateColumns="repeat(4 , 1fr)">
                    <GridItem
                      colSpan={"3"}
                      display={"flex"}
                      px={"2"}
                      py={"2"}
                      gap={3}
                    >
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Check-In
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          {accommodationsArr[0]?.checkInDate}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Check-Out
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          {accommodationsArr[0]?.checkOutDate}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Nights
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          {accommodationsArr[0]?.noOfNights}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Reservation Date
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          {accommodationsArr[0]?.dateBooked}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Guests
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          {accommodationsArr[0]?.noOfPerson}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Source
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          Web
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size={"sm"} fontWeight={"500"}>
                          Rate Plan(s)
                        </Heading>
                        <Text fontSize={"xs"} fontWeight={"300"}>
                          Base Rate
                        </Text>
                      </Stack>
                    </GridItem>
                    <GridItem display={"flex"} alignItems={"center"}>
                      <Stack py={"3"}>
                        <Heading size={"md"}>
                          Balance Due $ {accommodationsArr[0]?.totalPrice}
                        </Heading>
                      </Stack>
                      <Stack ps={4}>
                        <Heading size={"md"}>
                          Rewards {totalNumberOfCount}
                        </Heading>
                      </Stack>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
              <Card mt={"5"} borderTop="5px solid #3366ff" overflow={"auto"}>
                <CardBody>
                  <Tabs>
                    <TabList>
                      <Tab fontSize={"sm"}>Accommodations</Tab>
                      <Tab fontSize={"sm"}>Folio</Tab>
                      <Tab fontSize={"sm"}>Guest Details</Tab>
                      <Tab fontSize={"sm"}>Credit Cards</Tab>
                      <Tab fontSize={"sm"}>Notes (0)</Tab>
                      <Tab fontSize={"sm"}>Documents</Tab>
                      <Tab fontSize={"sm"}>Reservation Activity</Tab>
                      <Tab fontSize={"sm"}>Email Messages</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Stack py={"3"}>
                          <DataTable
                            columns={accommodationColumn}
                            data={accommodationsArr}
                          />
                        </Stack>
                      </TabPanel>
                      <TabPanel>
                        <DataTable
                          columns={folioColumns}
                          data={previousStayUser}
                        />
                      </TabPanel>
                      <TabPanel>
                        <DataTable
                          columns={guestInfoColumns}
                          data={guestInfo}
                          showtopheader={"true"}
                          topheader={TopHeaderGuestInfo}
                          shouldbordershow="true"
                          tdborderX="1px"
                          borderColor="#e2e8f0"
                        />
                      </TabPanel>
                      <TabPanel>
                        <p>four!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>five!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>six!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>seven!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>eight!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        )}
        {loading && <LoadSpinner isLoading={loading} />}
      </Container>
    </>
  );
}

export default ViewReservation;