import { Flex, Heading, Text } from "@chakra-ui/react"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../common/dataTables";

const TaxReportsTable = (props) =>{

    const data1 = [
      {
        taxes: "San Antonio",
        amount: props?.taxesdata?.["San Antonio"]?.AMOUNT,
        mtd: props?.taxesdata?.["San Antonio"]?.MTD,
        totalrevenuecolumn:
          props?.taxesdata?.["San Antonio"]["TAXABLE REVENUE COLUMN"],
        taxablerevenuecolumn:
          props?.taxesdata?.["San Antonio"]["TOTAL REVENUE COLUMN"],
      },
      {
        taxes: "Bexar Tax",
        amount: props?.taxesdata?.["Bexar Tax"].AMOUNT,
        mtd: props?.taxesdata?.["Bexar Tax"].MTD,
        totalrevenuecolumn:
          props?.taxesdata?.["Bexar Tax"]["TAXABLE REVENUE COLUMN"],
        taxablerevenuecolumn:
          props?.taxesdata?.["Bexar Tax"]["TOTAL REVENUE COLUMN"],
      },
    ];

       const columnHelper = createColumnHelper();
       const columns1 = [
        columnHelper.accessor("taxes", {
            cell: (info) => <Text  gap="1"  align={"left"} width="150px" fontSize={"xs"}>{info.getValue()}</Text>,
            header: "TAXES",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">TOTAL</Text>,
        }),
             columnHelper.accessor("amount", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "AMOUNT",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$90.09</Text>,
        }),
             columnHelper.accessor("mtd", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "MTD",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        }),
         columnHelper.accessor("totalrevenuecolumn", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "TOTAL REVENUE COLUMN",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        }),
        columnHelper.accessor("taxablerevenuecolumn", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "TAXABLE REVENUE COLUMN",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        })
    ]


        const data2 = [
          {
            fees: "Taxes Tax",
            amount: props?.taxesdata?.["Taxes Tax"]["TOTAL REVENUE COLUMN"],
            mtd: props?.taxesdata?.["Taxes Tax"].MTD,
            totalrevenuecolumn:
              props?.taxesdata?.["Taxes Tax"]["TAXABLE REVENUE COLUMN"],
            taxablerevenuecolumn:
              props?.taxesdata?.["Taxes Tax"]["TOTAL REVENUE COLUMN"],
          },
          {
            fees: "Pet Fee Non Refundable",
            amount:
              props?.taxesdata?.["Pet Fee Non Refundable"]["TOTAL REVENUE COLUMN"],
            mtd: props?.taxesdata?.["Pet Fee Non Refundable"].MTD,
            totalrevenuecolumn:
              props?.taxesdata?.["Pet Fee Non Refundable"][
                "TAXABLE REVENUE COLUMN"
              ],
            taxablerevenuecolumn:
              props?.taxesdata?.["Pet Fee Non Refundable"]["TOTAL REVENUE COLUMN"],
          },
          {
            fees: "Damages & Repairs",
            amount:
              props?.taxesdata?.["Damages & Repairs"]["TOTAL REVENUE COLUMN"],
            mtd: props?.taxesdata?.["Damages & Repairs"].MTD,
            totalrevenuecolumn:
              props?.taxesdata?.["Damages & Repairs"]["TAXABLE REVENUE COLUMN"],
            taxablerevenuecolumn:
              props?.taxesdata?.["Damages & Repairs"]["TOTAL REVENUE COLUMN"],
          },
          {
            fees: "Late Fees",
            amount: props?.taxesdata?.["Late Fees"]["TOTAL REVENUE COLUMN"],
            mtd: props?.taxesdata?.["Late Fees"].MTD,
            totalrevenuecolumn:
              props?.taxesdata?.["Late Fees"]["TAXABLE REVENUE COLUMN"],
            taxablerevenuecolumn:
              props?.taxesdata?.["Late Fees"]["TOTAL REVENUE COLUMN"],
          },
        ];         



           const columns2 = [
        columnHelper.accessor("fees", {
            cell: (info) => <Text align={"left"} gap="1" width="150px"  fontSize={"xs"}>{info.getValue()}</Text>,
            header: "TAXES",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">TOTAL</Text>,
        }),
             columnHelper.accessor("amount", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "AMOUNT",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$90.09</Text>,
        }),
             columnHelper.accessor("mtd", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "MTD",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        }),
         columnHelper.accessor("totalrevenuecolumn", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "TOTAL REVENUE COLUMN",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        }),
        columnHelper.accessor("taxablerevenuecolumn", {
            cell: (info) =>  <Text fontSize={"xs"}  paddingStart={"4px"}>{info.getValue()}</Text>,
            header: "TAXABLE REVENUE COLUMN",
            footer: info => <Text fontWeight={"600"} textAlign={"left"} fontSize={"13.5px"} color="grey">$1155.57</Text>,
        })
    ]

    const data3 = [
      {
        footer1: 'Grand Totals',
        footer2: "$90.35",
        footer3: "$2423.33",
        footer4: "$2423.33",
        footer5: "$2423.33",
      },
    ];

 const columns3 = [
   columnHelper.accessor("footer1", {
     header: <p style={{ visibility: "hidden" }}>TAXESasdasdasdsads</p>,
     cell: (info) => (
       <Text fontSize={"xs"} paddingStart={"4px"}>
         {info.getValue()}
       </Text>
     ),
   }),
   columnHelper.accessor("footer2", {
     header: <p style={{ visibility: "hidden" }}>AMOUNT</p>,
     cell: (info) => (
       <Text fontSize={"xs"} paddingStart={"4px"}>
         {info.getValue()}
       </Text>
     ),
   }),
   columnHelper.accessor("footer3", {
     header: <p style={{ visibility: "hidden" }}>MTD</p>,
     cell: (info) => (
       <Text fontSize={"xs"} paddingStart={"4px"}>
         {info.getValue()}
       </Text>
     ),
   }),
   columnHelper.accessor("footer4", {
     header: <p style={{ visibility: "hidden" }}>TOTAL REVENUE COLUMN</p>,
     cell: (info) => (
       <Text fontSize={"xs"} paddingStart={"4px"}>
         {info.getValue()}
       </Text>
     ),
   }),
   columnHelper.accessor("footer5", {
     header: <p style={{ visibility: "hidden" }}>TAXABLE REVENUE COLUMN</p>,
     cell: (info) => (
       <Text fontSize={"xs"} paddingStart={"4px"}>
         {info.getValue()}
       </Text>
     ),
   }),
 ];

    return (
        <>
        <Flex gap="2" my="10px">
        <FaRegMoneyBillAlt /><Heading fontSize={"sm"}> Tax Reports</Heading>
        </Flex>
        <Flex gap="4" flexDirection={"column"}>
          <DataTable columns={columns1} data={data1} tdp="6px" tdborderX="2px solid #E2E8F0" loading={props.loading}/>
        {!props?.loading &&
        <>
          <DataTable columns={columns2} data={data2} tdp="6px" tdborderX="2px solid #E2E8F0" />
          <DataTable columns={columns3} data={data3} tdp="6px" tdborderX="2px solid #E2E8F0" />
        </>}
        </Flex>
        </>
    )
}

export default TaxReportsTable



// FInd out about tax reports page
