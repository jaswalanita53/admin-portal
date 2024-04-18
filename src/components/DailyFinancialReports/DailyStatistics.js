import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../common/dataTables";
import { FaQuestionCircle } from 'react-icons/fa'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const DailyStatistics = ({apidata,date1,monthname,loading}) =>{

    const tabledata = [
      {
        heading: "ITEMS AND SERVICES REVENUE",
        today: "$0.00",
        monthtodate: "$0.00",
      },
      {
        heading: "PAYMENTS",
        today: `${
          loading ?
            <Skeleton /> :
            apidata?.today?.paymentForGivenDate 
        }`,
        monthtodate: `${apidata?.monthTodate?.paymentForMonthToDate}`,
      },
      {
        heading: "COMPS",
        today: "-",
        monthtodate: "-",
      },
      {
        heading: "WALK-INS",
        today: `${apidata?.today?.walkInforGivenDate}`,
        monthtodate: `${apidata?.monthTodate?.walkInforGivenDatemonthtodate}`,
      },
      {
        heading: "NUMBER OF GUESTS",
        today: `${apidata?.today.totalGuests}`,
        monthtodate: `${apidata?.monthTodate?.totalGuestsmonthtodate}`,
      },
      {
        heading: "CHECK-INS",
        today: `${apidata?.today.totalCheckIns}`,
        monthtodate: `${apidata?.monthTodate?.totalcheckInsMonthtodate}`,
      },
      {
        heading: "CHECK-OUTS",
        today: `${apidata?.today.totalCheckOuts}`,
        monthtodate: `${apidata?.monthTodate?.totalcheckOutsmonthtoDate}`,
      },
      {
        heading: "AVERAGE LOS (NIGHTS STAYED)",
        today: `${apidata?.today.avgLosForgivendate}`,
        monthtodate: `${apidata?.monthTodate?.AvgLosmonthtodate}`,
      },
      {
        heading: "AVERAGE LOS (TOTAL ROOM NIGHTS)",
        today: `${apidata?.today.avglostotalnightsgivendate}`,
        monthtodate: `${apidata?.monthTodate?.avglostotalnightsmonthtodate}`,
      },
      {
        heading: "ADR PER GUEST",
        today: `${apidata?.today.adrforgivendateperguest}`,
        monthtodate: `${apidata?.monthTodate?.adrforemonthtodateperguest}`,
      },
      {
        heading: "NO SHOWS",
        today: "0",
        monthtodate: "8",
      },
      {
        heading: "BLOCKS",
        today: "-",
        monthtodate: "-",
      },
      {
        heading: "ADJUSTMENTS",
        today: "$0.00",
        monthtodate: "$0.02",
      },
      {
        heading: "TOTAL REVENUE",
        today: `${apidata?.today.totalrevenueforgivendate}`,
        monthtodate: `${apidata?.monthTodate?.totalrevenueformonthtodate}`,
      },
      {
        heading: "",
        today: date1,
        monthtodate: monthname + " " + new Date(date1).getFullYear(),
      },
    ];

   const columnHelper = createColumnHelper();
       const columns = [
        columnHelper.accessor("heading", {
            cell: (info) => <Flex align={"center"} gap="1"><Text fontSize={"xs"}>{info.getValue()}</Text><FaQuestionCircle fontSize="12px" style={info.getValue()==="" && {"display":"none"}}/></Flex>,
            header: "",
        }),
             columnHelper.accessor("today", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "TODAY",
        }),
             columnHelper.accessor("monthtodate", {
            cell: (info) =>  <Text fontSize={"xs"}>{info.getValue()}</Text>,
            header: "MONTH TO DATE",
        })
    ]
    return (
        <>
        <Flex gap="2" mb="20px">
        <FaRegMoneyBillAlt /><Heading fontSize={"sm"}> Daily Statistics for {date1?date1:""}</Heading>
        </Flex>

         <DataTable columns={columns} data={tabledata}  tdborderX="2px solid #E2E8F0"/>
        </>
    )
}

export default DailyStatistics