import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Chart } from "react-google-charts";
import {FaRegMoneyBillAlt} from "react-icons/fa"
import axios from "axios"

const App = ({data, date1}) => {
  const dataday = [
  ["Task", "Hours per Day"],
  ["Blocks and Holds", data?.todaydata?.percentageofroomsinmaintenance],
  ["Occupancy",  data?.todaydata?.percentageofRoomsBooked],
  ["Availability",data?.todaydata?.availableRooms], // CSS-style declaration
];

  const datamonth = [
  ["Task", "Hours per Day"],
  ["Blocks and Holds", +data?.wholemonthdata?.percentageofroomsinmaintenance],
  ["Occupancy",  +data?.wholemonthdata?.percentageofRoomsBooked],
  ["Availability",+data?.wholemonthdata?.availableRooms], // CSS-style declaration
];


const options = {
  title: date1,
  pieHole: 0.5,
  is3D: false,
};

let monthyear =  new Date().toDateString().split(" ")[1] + " " + new Date().toDateString().split(" ")[3]

const options2 = {
  title: monthyear,
  pieHole: 0.5,
  is3D: false,
};


  return (
    <>
     <Flex margin="20px" gap="2">
        <FaRegMoneyBillAlt /><Heading fontSize={"sm"}> Occupancy Rate</Heading>
      </Flex>
      <hr/ >
    <Box 
    zIndex={"4"}
    >
     
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={dataday}
      options={options}
      />
      <hr />
      <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={datamonth}
      options={options2}
      />
      </Box>
      </>
  );
}

export default App