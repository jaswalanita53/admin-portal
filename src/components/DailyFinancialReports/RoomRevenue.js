import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Flex, Heading, Text } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../common/dataTables";
import { FaQuestionCircle } from 'react-icons/fa'

const RoomRevenue = (props) =>{

    const data = [
        {
            "heading":"ADR",
            "today":`${props?.data?.today.adrforgivendate}`,
            "monthtodate":`${props?.data?.monthToDate?.AdrMonthToDate}`
        },
        {
            "heading":"REVPAR",
            "today":`${props?.data?.today.revpargivendate}`,
            "monthtodate":`${props?.data?.monthToDate?.revparForMonthToDate}`
        },
           {
            "heading":"ROOM REVENUE",
            "today":`${props?.data?.today?.roomrevenue}`,
            "monthtodate":`${props?.data?.monthToDate?.totalRoomRevenueMonthtoDate}`
        },
         {
             "heading":"",
            "today": `${props?.date1}`,
            "monthtodate":`${props?.monthname +" "+ new Date(props.date1).getFullYear()}`
        }
]

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
        <FaRegMoneyBillAlt /><Heading fontSize={"sm"}> Room Revenue </Heading>
        </Flex>
         <DataTable columns={columns} data={data} tdborderX="2px solid #E2E8F0"/>
    </>)
}

export default RoomRevenue;