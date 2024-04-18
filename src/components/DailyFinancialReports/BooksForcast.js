import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Flex, Heading, Text } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../common/dataTables";
import { FaQuestionCircle } from 'react-icons/fa'

const BooksForcast = (props) =>{
    let monthyear =  props?.monthname + " " + new Date(props?.date1).getFullYear()
    const data = [
        {
            "heading":"TOTAL ROOMS SOLD",
            "data":`${props?.data?.totalRoomsOccupiedformonth} Rooms(${props?.data?.occupancyForWholeMonth} %)`
        },
        {
            "heading":"ADR",
            "data":`${props?.data?.AdrForWholeMonth}`
        },
           {
            "heading":"REVPAR",
            "data":`${props?.data?.revparForWholeMonth}`
        },
         {
             "heading":"ROOM REVENUE",
            "data": `${props?.data?.totalRoomRevenueWholeMonth}`,
            // "footer":"asdasdasdsadssa"
        },

]

       const columnHelper = createColumnHelper();
       const columns = [
        columnHelper.accessor("heading", {
            cell: (info) => <Flex align={"center"} gap="1"><Text fontSize={"xs"}>{info.getValue()}</Text><FaQuestionCircle fontSize="12px" style={info.getValue()==="" && {"display":"none"}}/></Flex>,
            header: "",
          
        }),
             columnHelper.accessor("data", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "",
            // footer: info => info.column.id,
        })
    ]
    return (
    <>
        <Flex gap="2" mb="20px">
        <FaRegMoneyBillAlt /><Heading fontSize={"sm"}> On the Books Forecast - {monthyear}</Heading>
        </Flex>
         <DataTable columns={columns} data={data} tdborderX="2px solid #E2E8F0"/>
    </>)
}

export default BooksForcast;