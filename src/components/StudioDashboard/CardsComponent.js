import React from 'react';
import { Grid } from '@chakra-ui/react';
import styles from "../../assets/css/dashboard.module.css";
import DashboardCard from '../../components/DashboardCard/DashboardCard.js';
import { FaBed, FaMoneyBill, FaRegBell, FaSignOutAlt } from 'react-icons/fa';

const CardsComponent = ({ dashboardDetails }) => {
  return (
    <div>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        className={styles.cardsparent}
      >
        <DashboardCard
          cardColor='#0671c6'
          text="ARRIVALS"
          total={dashboardDetails?.totalArrivals}
          // total={0}
          icon={<FaRegBell />}
          totalcolor="#fff"
        />
        <DashboardCard
          cardColor='#00a3ff'
          text="DEPARTURES"
           total={dashboardDetails?.totalDeparture}
          // total={0}
          icon={<FaSignOutAlt />}
          totalcolor="#fff"
        />
        <DashboardCard
          cardColor='#71d2fe'
          text="ACCOMMODATIONS BOOKED"
           total={dashboardDetails?.totalAccommodationBooked}
          // total={0}
          totalcolor="#fff"
        />
        <DashboardCard
          cardColor='#81E6D9'
          icon={<FaBed />}
          text="STAYOVERS"
          subtext1="Transient"
           subtext1Val={dashboardDetails?.stayoversTransient}
          // subtext1Val={0}
          subtext2="Group"
          subtext2Val={dashboardDetails?.stayoversGroup}
          // subtext2Val={0}
         total={dashboardDetails?.stayoversTransient + dashboardDetails?.stayoversGroup}
          // total={0}
          totalcolor="#fff"
        />
        <DashboardCard
          cardColor='#38B2AC'
          text="OCCUPANCY"
           total={dashboardDetails?.totalOccupancy}
          // total={0}
          totalcolor="#fff"
          percentage={(dashboardDetails?.totalOccupancy / dashboardDetails?.totalRooms) * 100}
        />
        <DashboardCard
          cardColor='#2C7A7B'
          text="TONIGHT'S RATE"
           total="100$"
          // total={0}
          totalcolor="#fff"
          icon={<FaMoneyBill />}
        />
      </Grid></div>
  )
}

export default CardsComponent