import React from 'react'
import { Box, Button, Grid, GridItem, Heading, Stack, UnorderedList, ListItem } from '@chakra-ui/react';
import styles from "../../assets/css/dashboard.module.css"
import moment from 'moment';
import { Link } from "react-router-dom"
import { FaPrint, FaQuestionCircle, FaSyncAlt } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const FirstComponent = () => {
  const navigate = useNavigate();
  const [refreshList, setRefreshList] = React.useState(false);

  const state = { currentDateTime: moment().format("MMMM DD,YYYY")};

  const handlePrint = () => {
    window.print();
  }
  
  return (
    <div>
      <Grid
        p="10"
        templateColumns="repeat(2 , 1fr)"
        className={styles.firstline}
      >
        <GridItem className={styles.dateparent}>
          <Stack direction="row" spacing={1} style={mainContentSection}>
            <Heading className={styles.date}>
              {state.currentDateTime}
            </Heading>
            <FaQuestionCircle pt="5" style={infoIconText} />
          </Stack>
        </GridItem>
        <GridItem style={{ display: "flex", verticalAlign: "middle" }}>
          <UnorderedList style={ulstyle}>
            <ListItem className={styles.navItems}> <Link to="/admin/ratesAndInventory"
            // onClick={onOpen}
            >Rates and Inventory</Link></ListItem>
            <ListItem className={styles.navItems}> <NavLink to="/admin/promotions">Promotions</NavLink></ListItem>
            <ListItem className={styles.navItems}> <NavLink to="#">Manage Reservations</NavLink></ListItem>
            <ListItem className={styles.navItems}> <NavLink to="#">Accounting</NavLink></ListItem>
            <ListItem className={styles.navItems}> <NavLink to="#">Property Information</NavLink></ListItem>
          </UnorderedList>
        </GridItem>
        <GridItem className={styles.secondchild}>
          <Box className={styles.printParent}>
            <Button className={styles.smallButton}
              onClick={() => { handlePrint() }}
            >
              <FaPrint />
            </Button>
            <Button className={styles.smallButton}>
              <FaSyncAlt
                cursor="pointer"
                onClick={() => setRefreshList(!refreshList)}
              />
            </Button>
          </Box>
          <Button
            background="#32c0a0"
            color="#fff"
            borderRadius="10px"
            fontSize="12px"
            // onClick={() =>
            //   (window.location.href = "/admin/reservation/create")
            // }
            onClick={() => { navigate("/admin/reservation/create") }}
            className={styles.button}
          >
            CREATE NEW RESERVATION
          </Button>
          <Button
            background="#3366ff"
            color="#fff"
            borderRadius="10px"
            fontSize="12px"
            // onClick={() =>
            //   (window.location.href = "/admin/mangeMaintenance")
            // }
            onClick={() => { navigate("/admin/mangeMaintenance") }}
            className={styles.button}
          >
            Manage Maintenance
          </Button>
          <Button
            background="#32c0a0"
            color="#fff"
            borderRadius="10px"
            fontSize="12px"
            // onClick={() =>
            //   (window.location.href = "/admin/Property")
            // }
            onClick={() => { navigate("/admin/Property") }}
            className={styles.button}
          >
            Settings
          </Button>
        </GridItem>
      </Grid>
    </div>
  )
}
const mainContentSection = {
  alignItems: 'baseline'
}

const infoIconText = {
  color: '#3366ff',
}
const ulstyle = {
  display: "flex",
  gap: "25px",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  margin: 0
}

export default FirstComponent