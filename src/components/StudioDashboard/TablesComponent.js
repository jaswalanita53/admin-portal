import React from 'react'
import { Card, CardBody, Grid, GridItem, Heading, Stack, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import styles from "../../assets/css/dashboard.module.css"
import { FaFile, FaPrint, FaSyncAlt } from 'react-icons/fa';
import { DataTable } from '../../common/dataTables';

const TablesComponent = ({ tableprops }) => {
  const { columns, data, handlePrintReservations, setRefreshList, refreshList, bookingColumn, bookingsDetails, tomorrowArrivalsDetailsColumn, tomorrowArrivalDetails, departureColumns, departureDetails, tomorrowDepartureDetailsColumn, tomorrowDepartureDetails } = tableprops

  return (
    <div>   <Grid
      templateColumns="repeat(2, 1fr)"
      pt="5"
      gap={5}
      className={styles.row1}
    >
      <GridItem className={styles.inner} id='copytext'>
        <Card borderTop="4px solid #3366ff" width="100%" overflow="auto">
          <CardBody>
            <Grid templateColumns="repeat(3,1fr)">
              <GridItem
                colSpan={2}
                display="flex"
                alignItems="center"
                id='gridHeading'
              >
                <Heading fontSize="lg">Reservations</Heading>
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="end"
              >
                <Stack direction="row" gap={3}>
                  <FaPrint onClick={() => { handlePrintReservations() }} />
                  <FaSyncAlt
                    cursor="pointer"
                    onClick={() => setRefreshList(!refreshList)}
                  />
                  <FaFile />
                </Stack>
              </GridItem>
            </Grid>
            <Grid variant="unstyled" pt="4">
              <GridItem>
                <Tabs variant="unstyled">
                  <TabList id='tabList'>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      Arrivals{" "}
                    </Tab>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      {" "}
                      Departures
                    </Tab>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      Stayovers
                    </Tab>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      In-House Guests
                    </Tab>
                  </TabList>

                  <TabPanels padding="0px" id='innerTabListToday'>
                    <TabPanel padding="0px">
                      <Tabs >
                        <TabList border="none" >
                          <Tab fontWeight="500" fontSize="sm" >
                            Today
                          </Tab>
                          <Tab fontWeight="500" fontSize="sm" >
                            Tomorrow
                          </Tab>
                        </TabList>
                        <TabPanels  >
                          <TabPanel
                            pt="5"
                            px="0"
                            style={dataTableContainer2}

                          >
                            <DataTable
                              // searchBox={true}
                              columns={bookingColumn}
                              data={bookingsDetails}
                              pt="20px"
                            />
                          </TabPanel>
                          <TabPanel
                            pt="5"
                            px="0"
                            style={dataTableContainer}
                          >
                            <DataTable
                              // searchBox={true}
                              columns={tomorrowArrivalsDetailsColumn}
                              data={tomorrowArrivalDetails}
                              pt="20px"
                            />
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>
                    <TabPanel padding="0px">
                      <Tabs>
                        <TabList border="none">
                          <Tab fontWeight="500" fontSize="sm">
                            Today
                          </Tab>
                          <Tab fontWeight="500" fontSize="sm">
                            Tomorrow
                          </Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel
                            pt="5"
                            px="0"
                            style={dataTableContainer}
                          >
                            <DataTable
                              // searchBox={true}
                              columns={departureColumns}
                              data={departureDetails}
                              pt="20px"
                            />
                          </TabPanel>
                          <TabPanel
                            pt="5"
                            px="0"
                            style={dataTableContainer}
                          >
                            <DataTable
                              // searchBox={true}
                              columns={tomorrowDepartureDetailsColumn}
                              data={tomorrowDepartureDetails}
                              pt="20px"
                            />
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>
                    <TabPanel padding="0px">
                      <Tabs pt="0">
                        <TabList border="none">
                          <Tab fontWeight="500" fontSize="sm">
                            Today
                          </Tab>
                          <Tab fontWeight="500" fontSize="sm">
                            Tomorrow
                          </Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel
                            style={dataTableContainer} className='stayOverTodayTable'
                            pt="0"
                            mt="3"
                          >
                            <DataTable
                              columns={columns}
                              data={data}
                              pt="0"
                            />
                          </TabPanel>
                          <TabPanel
                            style={dataTableContainer} className='stayOverTodayTable'
                            pt="0"
                            mt="3"
                          >
                            <DataTable
                              columns={columns}
                              data={data}
                              pt="0"
                            />
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>
                    <TabPanel
                      style={dataTableContainer}
                      pt="0"
                      mt="3"

                    >
                      <Grid templateColumns="repeat(3, 1fr)" gap={6} position='sticky' top='0'
                        zIndex="1"
                        backgroundColor="#f7fafc"
                      // id="innerInHouseGuest"
                      >
                        <GridItem w="100%" px="3">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            73
                          </Heading>
                          <Text fontSize="xs" pt="2" pb="2" fontWeight="500">
                            GUESTS
                          </Text>
                        </GridItem>
                        <GridItem w="100%">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            73
                          </Heading>
                          <Text fontSize="xs" pt="2" fontWeight="500">
                            ADULTS
                          </Text>
                        </GridItem>
                        <GridItem w="100%">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            0
                          </Heading>
                          <Text fontSize="xs" pt="2" fontWeight="500">
                            CHILDREN
                          </Text>
                        </GridItem>
                      </Grid>
                      <div className='stayOverInHouseTable' >
                        <DataTable
                          columns={columns}
                          data={data}
                          pt="20px"
                        />
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </GridItem>
            </Grid>

          </CardBody>
        </Card>
      </GridItem>
      <GridItem className={styles.inner}>
        <Card borderTop="4px solid #3366ff">
          <CardBody>
            <Grid templateColumns="repeat(3,1fr)">
              <GridItem
                colSpan={2}
                display="flex"
                alignItems="center"
              >
                <Heading fontSize="lg">Today's Activity</Heading>
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="end"
              >
                <Stack direction="row" gap={3}>
                  <FaSyncAlt
                    cursor="pointer"
                    onClick={() => setRefreshList(!refreshList)}
                  />
                </Stack>
              </GridItem>
            </Grid>
            <Grid variant="unstyled" pt="4">
              <GridItem>
                <Tabs variant="unstyled">
                  <TabList>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      Sales
                    </Tab>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      Cancellations
                    </Tab>
                    <Tab
                      _selected={{ color: "#000", bg: "#ececec" }}
                      fontSize="xs"
                    >
                      OverBookings
                    </Tab>
                  </TabList>

                  <TabPanels
                    padding="0px"
                    paddingTop="10px"
                    paddingBottom="10px"
                  >
                    <TabPanel
                      padding="0px"
                      style={dataTableContainer}

                    >
                      <Grid templateColumns="repeat(3, 1fr)" gap={6} position='sticky' top='0' zIndex="1" backgroundColor="#f7fafc">
                        <GridItem w="100%" px="3"  >
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            0
                          </Heading>
                          <Text fontSize="xs" pt="2" pb="2" fontWeight="500">
                            BOOKED TODAY
                          </Text>
                        </GridItem>
                        <GridItem w="100%">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            0
                          </Heading>
                          <Text fontSize="xs" pt="2" fontWeight="500">
                            ROOM NIGHTS
                          </Text>
                        </GridItem>
                        <GridItem w="100%">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            $0
                          </Heading>
                          <Text fontSize="xs" pt="2" fontWeight="500">
                            REVENUE
                          </Text>
                        </GridItem>
                      </Grid>
                      <Stack className='stayOverBookingTable'>
                        <DataTable
                          columns={columns}
                          data={data}
                          pt="20px"
                        />
                      </Stack>
                    </TabPanel>
                    <TabPanel style={dataTableContainer} padding="0px">
                      <Grid templateColumns="repeat(3, 1fr)" gap={6} position='sticky' top='0' zIndex="1" backgroundColor="#f7fafc">
                        <GridItem w="100%" px="3" colSpan="2">
                          <Heading
                            fontSize="xl"
                            color="#eb4c00"
                            fontWeight="500"
                          >
                            0
                          </Heading>
                          <Text fontSize="xs" pt="2" pb="2" fontWeight="500">
                            CANCELLATIONS
                          </Text>
                        </GridItem>
                        <GridItem w="100%">
                          <Heading
                            fontSize="xl"
                            color="#3366ff"
                            fontWeight="500"
                          >
                            ₱0,00
                          </Heading>
                          <Text fontSize="xs" pt="2" fontWeight="500">
                            LOST
                          </Text>
                        </GridItem>
                      </Grid>
                      <Stack className='stayOverBookingTable'>
                        <DataTable
                          columns={columns}
                          data={data}
                          pt="20px"
                        />
                      </Stack>
                    </TabPanel>
                    <TabPanel
                      style={dataTableContainer}
                      padding="0px"
                    >
                      <Grid templateColumns="repeat(1, 1fr)" gap={6} position='sticky' top='0' zIndex="1" backgroundColor="#f7fafc">
                        <GridItem w="100%" px="3" colSpan="2">
                          <Heading
                            fontSize="xl"
                            color="#eb4c00"
                            fontWeight="500"
                          >
                            0
                          </Heading>
                          <Text fontSize="xs" pt="2" pb="2" fontWeight="500">
                            ROOM TYPES OVERBOOKED
                          </Text>
                        </GridItem>
                      </Grid>
                      <Stack className='stayOverBookingTable'>
                        <DataTable
                          columns={columns}
                          data={data}
                          pt="20px"
                        />
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </GridItem>
            </Grid>

          </CardBody>
        </Card>
      </GridItem>
    </Grid></div>
  )
}


const dataTableContainer = {
  height: '290px',
  overflow: 'auto',
  width: '100%'
}
const dataTableContainer2 = {
  height: '255px',
  overflow: 'auto'
}
export default TablesComponent