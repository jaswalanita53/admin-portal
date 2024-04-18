import * as React from 'react'
import { Container, Stack } from '@chakra-ui/react';
import moment from 'moment';
import LoadSpinner from '../common/LoadSpinner.js';
import styles from "../assets/css/dashboard.module.css"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import data from "../components/StudioDashboard/assets/tabledata";
import { bookingColumn, columns, departureColumns, tomorrowArrivalsDetailsColumn, tomorrowDepartureDetailsColumn } from '../components/StudioDashboard/assets/tableColumns.js';
import { fatchAvailableOccupiedHoldTodayfunction, fetchDashboardDetails, fetchRevenueOf14DaysMonthly, fetchTomorrowDetails } from '../apiService/dashboard'
import FirstComponent from '../components/StudioDashboard/FirstComponent.js';
import CardsComponent from '../components/StudioDashboard/CardsComponent.js';
import GraphsComponent from '../components/StudioDashboard/GraphsComponent.js';
import BarGraphs from '../components/StudioDashboard/BarGraphs.js';
import TablesComponent from '../components/StudioDashboard/TablesComponent.js';
const _ = require('lodash');

function Dashboard() {
  const [revenue, setRevenue] = React.useState({total: 0,outlook: 0 })
  const location = useLocation();
  const [dataCharts, setDataCharts] = React.useState([])
  const [dashboardDetails, setDashboardDetails] = React.useState({})
  const [occupancyData, setOccupancy] = React.useState({})
  const [bookingsDetails, setBookingsDetails] = React.useState({})
  const [departureDetails, setDepartureDetails] = React.useState({})
  const [tomorrowDepartureDetails, setTomorrowDepartureDetails] = React.useState({})
  const [tomorrowArrivalDetails, setTomorrowArrivalDetails] = React.useState({})
  const [refreshList, setRefreshList] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [netRevenue, setNetRevenue] = React.useState([]);
  const [graphSize, setGraphSize] = React.useState()

  const getAvailableOccupiedHoldTodayfunction = async () => {
    const data = { "id": moment().format("YYYY-MM-DD") }
    try {
      const response = await fatchAvailableOccupiedHoldTodayfunction(data);
      console.log("getAvailableOccupiedHoldTodayfunction", response);
      if (response)
      setOccupancy({ ...response.data })
    } catch (error) {
      // Handle error as needed
    }
  };

  const getRevenueOf14DaysMonthly = async () => {
    const data = [];
    try {
      const response = await fetchRevenueOf14DaysMonthly(data);
      console.log("getRevenueOf14DaysMonthly", response);
      if (response) {
        const data = response?.data
        let currentMonthRevenue = data?.dayArray?.reduce((a, b) => a + parseInt(b?.totalPrice), 0)
        let revenueDataOf14Days = [];
        let revenueData = data?.dayArray?.map((value, index) => {
          revenueDataOf14Days.push({
            'name': value?.day, "US$": parseInt(value?.totalPrice), "totalRoomsRented": data?.roomsonrentdata[index], "adrData": data?.adrdata[index]
          })
          return { 'name': value.day, 'US$': parseInt(value.totalPrice), 'amountEarned': parseInt(value.totalPrice) }
        })
        setNetRevenue(revenueDataOf14Days)
        setRevenue({
          ...revenue,
          total: currentMonthRevenue,
          outlook: data?.dayArray?.reduce((a, b) => a + parseInt(b.totalPrice), 0) / currentMonthRevenue * 100
        })
        setDataCharts(revenueData)
      }
    } catch (error) {
      // Handle error as needed
    }
  };

  const getTomorrowDetails = async () => {
    const data = { "currentDate": moment().add(1, 'days').format("YYYY-MM-DD") }
    try {
      const response = await fetchTomorrowDetails(data);
      console.log("getTomorrowDetails", response);
      if (response)
      setTomorrowArrivalDetails(prepareRowsDataFromTable(response.data.todayBookings))
      setTomorrowDepartureDetails(prepareRowsDataFromTable(response.data.totalDepartureDetails))
    } catch (error) {
      // Handle error as needed
    }
  };

  const getDashboardDetails = async () => {
    const data = { "currentDate": moment().format("YYYY-MM-DD") }
    try {
      const response = await fetchDashboardDetails(data);
      console.log("getDashboardDetails", response);
      if (response)
      setDashboardDetails(prevState => {
        if (!_.isEqual(response.data, prevState)) {
          setBookingsDetails(prepareRowsDataFromTable(response.data.todayBookings, "todayBooking"))
          setDepartureDetails(prepareRowsDataFromTable(response.data.totalDepartureDetails))
          return { ...response.data }
        } else {
          return prevState;
        }
      })
      setLoading(false)
    } catch (error) {
      // Handle error as needed
    }
  };

  const handlePrintReservations = () => {
    const gridHeadingValue = document.getElementById('gridHeading')?.outerHTML || '';
    const tabListValue = document.getElementById('tabList')?.outerHTML || '';
    const innerTabListTodayValue = document.getElementById('innerTabListToday')?.outerHTML || '';
    const innerInHouseGuestValue = document.getElementById('innerInHouseGuest')?.outerHTML || '';
    const innerInHouseGuestTableValue = document.getElementById('innerInHouseGuestTable')?.outerHTML || '';
    const tableValue = document.getElementById('stayOverTable')?.outerHTML || '';
    const printContent = `
      <html>
        <head>
          <title>Print Reservations</title>
        </head>
        <body>
          ${gridHeadingValue}
          ${tabListValue}
          ${innerTabListTodayValue}
          ${innerInHouseGuestValue}
          ${innerInHouseGuestTableValue}
          ${tableValue}
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);

  }

  const prepareRowsDataFromTable = (data, str = 'default') => {
    const tmpRows = []
    data?.map((row, index) => {
      let linkUrl = '/admin/reservation/view/' + row.userInfo._id
      tmpRows.push({
        "id": index + 1,
        "key": index + 1,
        "userName": <Link href={linkUrl} color={'blue.500'} target="_self"> {row.userInfo.firstName} {row.userInfo.lastName} </Link>,
        "configuration": row.bookingID,
        "noOfRooms": "dbl(" + row.roomNumber + ")",
        "bookingStatus": row.bookingStatus,
        "last4digits": row?.cardDetails?.[0]?.data.transactionResponse?.accountNumber ? row?.cardDetails?.[0]?.data.transactionResponse?.accountNumber : '',
        "exp_month": row?.cardDetails?.[0]?.data.month ? row?.cardDetails?.[0]?.data.month : "",
        "exp_year": row?.cardDetails?.[0]?.data.year ? row?.cardDetails?.[0]?.data.year : '',
        "brand": row?.cardDetails?.[0]?.data.transactionResponse?.accountType ? row?.cardDetails?.[0]?.data.transactionResponse?.accountType : '',
        "country": row?.userInfo?.billingAddress?.country ? row?.userInfo?.billingAddress?.country : ''
      })
    })
    return tmpRows;
  }

  const data1 = [
    {
      name: '',
      occupied: occupancyData?.percentageofRoomsBooked,
      available: occupancyData?.availableRooms,
      undermaintenance: occupancyData?.percentageofroomsinmaintenance
    },
  ];

  const data2 = [
    {
      name: '',
      clean: occupancyData.percentageofRoomsBooked,
      available: occupancyData.availableRooms,
      undermaintenance: occupancyData.percentageofroomsinmaintenance
    },
  ];

  let graphsprops = { graphSize, netRevenue, revenue, dataCharts }
  const barGraphProps = { graphSize, data1, data2 }
  const tableprops = { columns, data, handlePrintReservations, setRefreshList, refreshList, bookingColumn, bookingsDetails, tomorrowArrivalsDetailsColumn, tomorrowArrivalDetails, departureColumns, departureDetails, tomorrowDepartureDetailsColumn, tomorrowDepartureDetails }

  useEffect(() => {
    getTomorrowDetails();
    getRevenueOf14DaysMonthly();
    getAvailableOccupiedHoldTodayfunction();
  }, [refreshList, dashboardDetails]);

  useEffect(() => {
    getDashboardDetails();
    const interval = setInterval(() => {
      if (location.pathname === "/admin/dashboard") {
        getDashboardDetails();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [location.pathname])

  useEffect(() => {
    setLoading(true)
    if (window.innerWidth < 1105) {
      setGraphSize(window.innerWidth - 150)
    }
    else
      setGraphSize(window.innerWidth / 2 - 150)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1105) {
        setGraphSize(window.innerWidth - 150)
      }
      else
        setGraphSize(window.innerWidth / 2 - 150)
    });
  })

  return (
    <div style={menuItemSection}>
    <Container maxW="container.2xxl" pb="10" backgroundColor="#ecf2f9">
      {!loading && (
        <>
          <FirstComponent />
          <Stack px="10" className={styles.secondLine}>
            <CardsComponent dashboardDetails={dashboardDetails} />
            <GraphsComponent graphsprops={graphsprops} />
            <BarGraphs barGraphProps={barGraphProps} />
            <TablesComponent tableprops={tableprops} />
          </Stack>
        </>
      )}
      {loading && <LoadSpinner isLoading={loading} />}
    </Container>
  </div>
  );
}

const menuItemSection = {
  padding: '0px',
}

export default Dashboard
