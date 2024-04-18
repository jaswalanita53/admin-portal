import React, { useState } from 'react'
import {
  Grid, Container, Stack, Button, GridItem, Input, InputGroup, InputLeftElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon, CalendarIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { FaPlusCircle, FaBed, FaRegBell, FaRegUserCircle, FaMicrosoft, FaPercent, FaChartBar, FaUserAlt, FaUsers, FaCoins, FaConciergeBell, FaBroom, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai"
import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { FaGear } from "react-icons/fa6";


function Header() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('qubed');

  const handleOnclickLogout = () => {
    sessionStorage.removeItem('isLogin')
    localStorage.removeItem("userBasicInformation");
    localStorage.removeItem("userToken");
    // window.location.href = '/admin/dashboard';
    navigate('/');
  }


  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    if (selectedOption === 'qubed') {
      navigate('/admin/dashboard');
    } else if (selectedOption === 'studio') {
      navigate('/studio/dashboard');
    }
  };

  return (
    <Container maxW="container.xxl" style={headerContainer}>
      <Grid templateColumns="repeat(4 , 1fr)">
        <GridItem style={headerMenuItem} className="header-menu">
          <Accordion allowToggle>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    {!isExpanded ? (
                      <HamburgerIcon fontSize="21px" />
                    ) : (
                      <SmallCloseIcon fontSize="21px" />
                    )}
                  </AccordionButton>
                  <AccordionPanel
                    pb={4}
                    className={styles.leftAccordianDrawerStyle}
                  >
                    <UnorderedList style={headerMenuItems}>
                      <ListItem style={headerMenuItemsList}>
                        <Link
                          to="/admin/dashboard"
                          style={headerMenuItemsList}
                        >
                          <FaMicrosoft style={headerMenuListIcon} />
                          Dashboard
                        </Link>
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <CalendarIcon style={headerMenuListIcon} />
                        Calender
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <Link
                          to="/admin/reservation/list"
                          style={headerMenuItemsList}
                        >
                          <FaBed style={headerMenuListIcon} />
                          Reservations
                        </Link>
                      </ListItem>

                      <ListItem style={headerMenuItemsList}>
                        <Accordion allowToggle>
                          <AccordionItem style={acordionItemsList}>
                            <h2>
                              <AccordionButton>
                                <FaGear style={headerMenuListIcon} />
                                {/* <FaChartBar style={headerMenuListIcon} /> */}
                                <Box
                                  as="span"
                                  fontSize="15px"
                                  flex="1"
                                  textAlign="left"
                                >

                                  Settings
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={2}>
                              <UnorderedList style={headerMenuItems} ps="7">
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/Property"

                                  >
                                    Property
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/dashboard"

                                  >
                                    Users
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/dashboard"
                                  >
                                    System
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Email
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/payment"
                                  >
                                    Payments
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Products
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Guests
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Booking Engine
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Distribution
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Marketpace
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Logs
                                </ListItem>
                              </UnorderedList>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </ListItem>

                      <ListItem style={headerMenuItemsList}>
                        <Accordion allowToggle>
                          <AccordionItem style={acordionItemsList}>
                            <h2>
                              <AccordionButton>
                                <FaPercent style={headerMenuListIcon} />
                                <Box
                                  as="span"
                                  flex="1"
                                  fontSize="15px"
                                  textAlign="left"
                                >
                                  Rates And Availability
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <UnorderedList style={headerMenuItems} ps="7">
                                <Link to="/admin/baserate">
                                  <ListItem style={headerMenuItemsList}>
                                    Base Rates
                                  </ListItem>
                                </Link>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/Manage/Plans"
                                    style={headerMenuItemsList}
                                  >
                                    Rate Plans & Packages
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Availability Matrix
                                </ListItem>
                              </UnorderedList>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <Accordion allowToggle>
                          <AccordionItem style={acordionItemsList}>
                            <h2>
                              <AccordionButton>
                                <FaChartBar style={headerMenuListIcon} />
                                <Box
                                  as="span"
                                  fontSize="15px"
                                  flex="1"
                                  textAlign="left"
                                >
                                  Reports
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={2}>
                              <UnorderedList style={headerMenuItems} ps="7">
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/insights/builder/reports"
                                    style={headerMenuItemsList}
                                  >
                                    Data Insights
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/insights/builder/dailyfinancailreports"
                                    style={headerMenuItemsList}
                                  >
                                    Daily Financial Reports
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/insights/builder/taxreports"
                                    style={headerMenuItemsList}
                                  >
                                    Tax Reports
                                  </Link>
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Favourites
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Production Reports
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Financial Reports
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Daily Activity Reports
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Government & Police Reports
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Stock Inventory Report
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Market Insights
                                </ListItem>
                              </UnorderedList>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </ListItem>
                      <hr m="3" />

                      <ListItem style={headerMenuItemsList}>
                        <Accordion allowToggle>
                          <AccordionItem style={acordionItemsList}>
                            <h2>
                              <AccordionButton pb={2}>

                                <FaUserAlt style={headerMenuListIcon} />

                                <Box
                                  as="span"
                                  flex="1"
                                  fontSize="15px"
                                  textAlign="left"
                                >
                                  Guests
                                </Box>

                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel py="0">
                              <UnorderedList style={headerMenuItems} ps="7">

                                <ListItem style={headerMenuItemsList}>
                                  <Link
                                    to="/admin/DNR"
                                    style={headerMenuItemsList}
                                  >
                                    TODAY'S GUEST
                                  </Link>
                                </ListItem>

                              </UnorderedList>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </ListItem>
                      {/* <ListItem style={headerMenuItemsList}>
                          <FaUserAlt style={headerMenuListIcon} />
                          Guests
                        </ListItem> */}
                      <ListItem style={headerMenuItemsList}>
                        <FaUsers style={headerMenuListIcon} />
                        Group
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <Accordion allowToggle>
                          <AccordionItem style={acordionItemsList}>
                            <h2>
                              <AccordionButton>
                                <FaCoins style={headerMenuListIcon} />
                                <Box
                                  as="span"
                                  fontSize="15px"
                                  flex="1"
                                  textAlign="left"
                                >
                                  Cash Drawer
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <UnorderedList style={headerMenuItems} ps="7">
                                <ListItem style={headerMenuItemsList}>
                                  Close Cash Drawer
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Create / Modify Cash Drawers
                                </ListItem>
                                <ListItem style={headerMenuItemsList}>
                                  Access Open Drawers
                                </ListItem>
                              </UnorderedList>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <FaConciergeBell style={headerMenuListIcon} />
                        House Account
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <FaBroom style={headerMenuListIcon} />
                        houseKeeping
                      </ListItem>
                      <ListItem style={headerMenuItemsList}>
                        <FaChartPie style={headerMenuListIcon} />
                        PIE
                        <ListItem style={headerMenuItemsList}>
                        </ListItem>
                        <AiFillSchedule style={headerMenuListIcon} />
                        <Link
                          to="/admin/adminShiftManager"
                          style={headerMenuItemsList}
                        >
                          {" "}
                          Admin shift manager{" "}
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
          {/* <Link href="/admin/dashboard">
            <Image
              w="100px"
              paddingLeft="18px"
              textAlign="center"
              src={
                window.location.origin +
                "/assets/images/qubed_header_logo.svg"
              }
              className={styles.logo}
            />
          </Link> */}
          <Box marginLeft="10px">
            <select id="dropdown" value={selectedValue} onChange={handleChange}>
              <option value="qubed">QUBED</option>
              <option value="studio">Studio 210</option>
            </select>
          </Box>
        </GridItem>
        <GridItem colSpan="2" className={styles.headerSearchContainer}>
          <InputGroup>
            <InputLeftElement
              ps="3"
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              placeholder="Search reservation, guests, and more"
              className={styles.headerSearchContainerInput}
              size="sm"
              py="2"
            />
          </InputGroup>
        </GridItem>
        <GridItem className={styles.headerSearchContainerright}>
          <Stack
            direction="row"
            spacing={1}
            textAlign="center "
            pr="2"
            borderRight="1px solid #e2e8f0"
            className={styles.plusicondiv}
          >
            <Button colorScheme="white" p="1" variant="ghost">
              <FaPlusCircle style={headerIconPlusCircle} />
            </Button>
            <Button colorScheme="white" p="1" variant="ghost">
              <CalendarIcon style={headerIconCalenderCircle} />
            </Button>
            <Button colorScheme="white" p="1" variant="ghost">
              <FaBed style={headerIconBedCircle} />
            </Button>
          </Stack>
          <Stack direction="row" pl="2">
            <Button colorScheme="white" p="1" variant="ghost">
              <FaRegBell style={headerIconCalenderCircle} />
            </Button>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <FaRegUserCircle style={headerIconBedCircle} />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  className={styles.rightAccordianDrawerStyle}
                >
                  <UnorderedList style={headerMenuItems}>
                    <ListItem
                      onClick={handleOnclickLogout}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <FaSignOutAlt style={headerMenuListIcon} />
                      LogOut
                    </ListItem>
                    <ListItem
                      // onClick={() =>
                      //   (window.location.href = "/admin/Property")
                      // }
                      onClick={() => { navigate('/admin/Property') }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <FaGear style={headerMenuListIcon} />
                      Settings
                    </ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
        </GridItem>
        <GridItem className={styles.rightToggle}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <AccordionIcon className={styles.accorIcon} />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                padding="6px"
                bg="white"
                zIndex="10000"
                position="absolute"
                border="1px solid #e2e8f0"
                className={styles.rightAccordion}
              >
                <Button colorScheme="white" p="1" variant="ghost">
                  <FaPlusCircle style={headerIconPlusCircle} />
                </Button>
                <Button colorScheme="white" p="1" variant="ghost">
                  <CalendarIcon style={headerIconCalenderCircle} />
                </Button>
                <Button colorScheme="white" p="1" variant="ghost">
                  <FaBed style={headerIconBedCircle} />
                </Button>
                <Button colorScheme="white" p="1" variant="ghost">
                  <FaRegBell style={headerIconCalenderCircle} />
                </Button>
                <Accordion allowToggle>
                  <AccordionItem borderBottom={"0"}>
                    <AccordionButton
                      className={styles.headerMenuListIconIntoggle}
                      py="2.5"
                    >
                      <FaRegUserCircle style={headerIconBedCircle} />
                    </AccordionButton>
                    <AccordionPanel
                      pb={4}
                      className={styles.rightAccordianDrawerStyle}
                    >
                      <UnorderedList style={headerMenuItems}>
                        <ListItem
                          style={headerMenuItemsList}
                          onClick={handleOnclickLogout}
                          cursor="pointer"
                        >
                          <FaSignOutAlt className={styles.logout} />
                          LogOut
                        </ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </Container>
  );
}
const headerContainer = {
  borderBottom: '1px solid #e5e5e5',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: '#fff'
}
const headerMenuItem = {
  padding: '10px 0px',
  display: 'flex',
  alignItems: 'center',
}


const headerIconPlusCircle = {
  color: '#3366ff',
  fontSize: '18px'
}
const headerIconCalenderCircle = {
  fontSize: '18px'
}
const headerIconBedCircle = {
  fontSize: '18px'
}

const headerMenuItems = {
  listStyle: 'none',
  marginLeft: 0
}
const headerMenuItemsList = {
  padding: '11px 0px',
  display: 'flex',
  fontSize: '14px',
  alignItems: 'center'

}
const headerMenuListIcon = {
  marginRight: "22px",
  fontSize: '20px',
}
const acordionItemsList = {
  margin: ' 0px -17px',
  borderBottomWidth: '0px',
  borderTopWidth: '0px',
  borderColor: '#fff',
  overflowAnchor: 'none',
  width: '324px'
}

export default Header