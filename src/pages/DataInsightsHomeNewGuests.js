import * as React from "react";
import Axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import { getFormattedDate } from "../common/functions/index";
import { saveAs } from "file-saver";
import LoadSpinner from "../common/LoadSpinner.js";
import {
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Container,
  Stack,
  Grid,
  GridItem,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Heading,
  Box,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Card,
  CardHeader,
  Flex,
  CardBody,
  InputGroup,
  InputRightElement,
  Checkbox,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import Header from "../components/Header/Header";
import {
  FaBars,
  FaFilter,
  FaInfoCircle,
  FaPlus,
  FaQuestionCircle,
  FaSearch,
  FaSlidersH,
  FaTable,
  FaTimes,
} from "react-icons/fa";
import moment from "moment";
import { DataTable } from "../common/dataTables.js";
import { ChevronDownIcon } from "@chakra-ui/icons";

import SendCSVemail from "../components/SendCSVemail"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';



export default function DataInsightsHome() {
  const navigate = useNavigate();
    const initialRef = React.useRef(null);
  const [tableColumnsFlexDesign, setTableColumnsFlexDesign] = React.useState(0);
  const [mainColoumnFlexDesign, setMainColoumnFlexDesign] = React.useState(5);
  const [tableColumnFlexView, setTableColumnsFlexView] = React.useState("none");
  const [tableColumnFlexSubView, setTableColumnFlexSubView] =
    React.useState("none");
  const [selectedTablecolumn, setSelectedTableColumn] = React.useState([]);
  const [reportValue, setReportValue] = React.useState([]);
  const [reportManageMentData, setReportManagementDate] = React.useState("");
  const [grandTotal, setGrandTotal] = React.useState();
  const columnHelper = createColumnHelper();
  const [mainColoumnFlexDesignView, setMainColoumnFlexDesignView] =
    React.useState("flex");
  const [csvData, setCsvData] = React.useState("");
  const [autoRefresh, setAutoRefresh] = React.useState(false);
  const [isgetSummaryReporttobeshown, setIsGetSummaryReportToBeShown] =
    React.useState(false);
  const [csvdata2, setcsvdata2] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [topheader, setTopHeader] = React.useState();
  const [showtopheader, setShowtopheader] = React.useState(false);
  const [shouldbordershow, setShouldBorderShow] = React.useState(false);
  const [noOfRows, setNoOfRows] = React.useState(0);
  const [reportName, setReportName] = React.useState("")
 const { isOpen, onOpen, onClose } = useDisclosure();


  React.useEffect(() => {
    let reportValueArr = JSON.parse(localStorage.getItem("reportsValue"));
    setReportValue(...reportValue, reportValueArr);
    setReportName(reportValueArr["reportName"]);
    if (reportValueArr["reportTypeVal"] === "Monthly Report") {
      getMonthlyDetails();
    } else if (reportValueArr["reportTypeVal"] === "Quarterly Report") {
      getQuaterlyReport();
    } else if (reportValueArr["reportTypeVal"] === "Summary Report") {
      getSummaryReport();
      setIsGetSummaryReportToBeShown(true);
    } else if (reportValueArr["reportTypeVal"] === "Monthly Tax Report") {
      getMonthlyTaxReports();
    } else if (reportValueArr["reportTypeVal"] === "Monthly Sales Report") {
      getMonthlySalesReports();
    } else if(reportValueArr["reportTypeVal"] === "Manager Report"){
      getManagerReport();
    }
    else{
      getDashboardDetails();
    }
  }, []);

  const [summarycolumns, setsummarycolumns] = React.useState([]);
  const [summarytabledata, setsummarytabledata] = React.useState([]);
  const [dummytable, setdummytable] = React.useState()
  function downloadCSV() {
    const csvContent = csvdata2?.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  }

  async function getManagerReport() {
    let weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    setIsGetSummaryReportToBeShown(true);
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/getRevenueData`,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      let result = response.data.data
      setLoading(false)
      let t2heading = Object.keys(result.Forcast.Mon);
   
      let headings = ['Today','Period To Date','Year To Date','Last Year Today','Last Year PTD','Last Year YTD'];
      let dummydata = []
      dummydata.push(['',''].concat(headings));

      (Object.keys(result.Revenue.Today)).forEach((item,index)=>{
        let data = [];
        if(index>0){
          data.push('');
        }
        else{
          data.push('Revenue');
        }
        data.push(item);
        headings.forEach(heading=>{
          data.push(result["Revenue"][heading][item].toFixed(2))
        })
        dummydata.push(data);
      });
      (Object.keys(result.Payment.Today)).forEach((item,index)=>{
        let data = [];
        if(index>0){
          data.push('');
        }
        else{
          data.push('Payment');
        }
        data.push(item);
        headings.forEach(heading=>{
          data.push(result["Payment"][heading][item]);
        }
        )
        dummydata.push(data);
      });

        (Object.keys(result["Room Inventory"]["Today"])).forEach((item,index)=>{
          let data = [];
          if(index>0){
            data.push('');
          }
          else{
            data.push('Room Inventory');
          }
        data.push(item);
          headings.forEach(heading=>{
          data.push(+result["Room Inventory"][heading][item]).toFixed(2)
          })
        dummydata.push(data);
      }
        );

        
          (Object.keys(result["Guest Activity"]["Today"])).forEach((item,index)=>{
            let data = []
            if (index>0) {
              data.push('')
            }
            else{
              data.push('Guest Activity')
            }
               
          data.push(item)
            headings.forEach(heading=>{
            data.push(result["Guest Activity"][heading][item].toFixed(2))
            })
            dummydata.push(data)
       
            });

            (Object.keys(result["Statistics"]["Today"])).map((item,index)=>{
              let data = []
              if (index>0) {
                data.push('')
              }
              else{
                data.push('Statistics')
              }  
              data.push(item) 
              headings.map(heading=>{
                data.push(result["Statistics"][heading][item].toFixed(2))
              })
              dummydata.push(data)
            });
          
          dummydata.push(['','','','','','','','','','',''])
          
          let data = []
          t2heading.forEach(t2heading=>{data.push(t2heading === "Date" ? "Forcast": t2heading)});
          dummydata.push(data);
            
            (weekdays).forEach(value=>{
              let data =[];
              t2heading.forEach(t2h=>
                {
                data.push( t2h==="Date"?result.Forcast[value][t2h]: result.Forcast[value][t2h].toFixed(2))
               }
              );
             dummydata.push(data)
            });
            setcsvdata2(dummydata);


      let dummytablemanagerdata = <TableContainer >
  <Table variant='simple' minWidth="800px">
   
    <Thead>
      <Tr>
        <Th></Th>
        <Th></Th>
        {headings.map(heading=>(<Th isNumeric>{heading}</Th>))}
      </Tr>
    </Thead>
    <Tbody>
     
      
        {
        (Object.keys(result.Revenue.Today)).map((item,index)=>(
          <Tr>
              {index === 0 && <Td rowspan="9" borderRight="1px" borderColor="#EDF2F7">Revenue</Td>}
        <Td>{item}</Td>
          {headings.map(heading=>(
          <Td isNumeric>{result["Revenue"][heading][item].toFixed(2)}
        </Td>))}
        </Tr>
        ))}

        {
        (Object.keys(result.Payment.Today)).map((item,index)=>(
          <Tr>
              { index === 0 && <Td rowspan="4" borderRight="1px" borderColor="#EDF2F7">Payment</Td> }
        <Td>{item}</Td>
          {headings.map(heading=>(
          <Td isNumeric>{result["Payment"][heading][item]}
        </Td>))}
        </Tr>
        ))}

        {
        (Object.keys(result["Room Inventory"]["Today"])).map((item,index)=>(
          <Tr>
              { index === 0 && <Td rowspan="7" borderRight="1px" borderColor="#EDF2F7">Room Inventory</Td> }
        <Td>{item}</Td>
          {headings.map(heading=>(
          <Td isNumeric>{(+result["Room Inventory"][heading][item]).toFixed(2)}
        </Td>))}
        </Tr>
        ))
        }
       
      {
        (Object.keys(result["Guest Activity"]["Today"])).map((item,index)=>(
          <Tr>
              { index === 0 && <Td rowspan="8" borderRight="1px" borderColor="#EDF2F7">Guest Activity</Td> }
        <Td>{item}</Td>
          {headings.map(heading=>(
          <Td isNumeric>{result["Guest Activity"][heading][item].toFixed(2)}
        </Td>))}
        </Tr>
        ))
        }

  {
        (Object.keys(result["Statistics"]["Today"])).map((item,index)=>(
          <Tr>
              { index === 0 && <Td rowspan="10" borderRight="1px" borderColor="#EDF2F7">Statistics</Td> }
        <Td>{item}</Td>
          {headings.map(heading=>(
          <Td isNumeric>{result["Statistics"][heading][item].toFixed(2)}
        </Td>))}
        </Tr>
        ))
        }
     
  
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>

  <Table className="mt-10">
  <TableCaption>Manager's Report</TableCaption>
    <Thead borderTop="1px" borderColor="#EDF2F7">
      <Tr>
        {t2heading.map(t2heading=>(<Th>{t2heading === "Date" ? "Forcast":t2heading}</Th>))}
      </Tr>
    </Thead>
    <Tbody>
      {
        (weekdays).map(value=>
          <Tr>
            {
              t2heading.map(t2h=>
              <Td>
              {t2h==="Date"?result.Forcast[value][t2h]: result.Forcast[value][t2h].toFixed(2)}
              </Td>
              )
            }
          </Tr>
        )
      }
    </Tbody>
  </Table>
</TableContainer>
      setdummytable(dummytablemanagerdata)
      setReportManagementDate(dummydata);
  }
}

  async function getMonthlyTaxReports() {
    setIsGetSummaryReportToBeShown(true);
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/monthlytaxreport/${data}`,
      // params:data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      setLoading(false);
    }

    let tabledata = [
      columnHelper.accessor("id", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "#",
      }),
      columnHelper.accessor("date", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Date",
      }),
      columnHelper.accessor("chargebeforetaxes", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Charge Total(before taxes)",
      }),
      columnHelper.accessor("kstandard", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "K-Standard",
      }),
      columnHelper.accessor("single", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Single",
      }),
      columnHelper.accessor("queen", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Queen",
      }),
      columnHelper.accessor("weeklySingle", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Weekly Single",
      }),
      columnHelper.accessor("standard", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Standard",
      }),
      columnHelper.accessor("newtaxtype", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "New Tax Type",
      }),
      columnHelper.accessor("kingsuiteweekly", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "King Suite Weekly",
      }),
      columnHelper.accessor("doubledaily", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Double Daily",
      }),
      columnHelper.accessor("doubleweekly", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Double Weekly",
      }),
      columnHelper.accessor("singleQueenDaily", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Single Queen Daily",
      }),
      columnHelper.accessor("singleQueenWeekly", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Single Queen Weekly",
      }),
      columnHelper.accessor("taxTotal", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Tax Total",
      }),
      columnHelper.accessor("taxExemptTotal", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Tax Exempt Total",
      }),
    ];
    setsummarycolumns(tabledata);
    let data2 = [];
    let data3 = [
      [
        "#",
        "Date",
        "Charge Total(before taxes)",
        "K-Standard",
        "Single",
        "Queen",
        "Weekly Single",
        "Standard",
        "New Tax Type",
        "King Suite Weekly",
        "Double Daily",
        "Double Weekly",
        "Single Queen Daily",
        "Single Queen Weekly",
        "Tax Total",
        "Tax Exempt Total",
      ],
    ];

    let grandtotal = 0;
    setNoOfRows(response.data.data.length);
    response.data.data.map((value, index) => {
      let data1 = {
        id: 1 + index,
        date: value?.date,
        chargebeforetaxes: value.chargebeforetaxes,
        kstandard: value.chargebeforetaxes,
        single: value.single,
        queen: value.queen,
        weeklySingle: value.weeklySingle,
        standard: value.standard,
        newtaxtype: value.newtaxtype,
        kingsuiteweekly: value.kingsuiteweekly,
        doubledaily: value.doubledaily,
        doubleweekly: value.doubleweekly,
        singleQueenDaily: value.singleQueenDaily,
        singleQueenWeekly: value.singleQueenWeekly,
        taxTotal: value.taxTotal,
        taxExemptTotal: value.taxExemptTotal,
      };
      grandtotal = grandtotal + +value.chargebeforetaxes;
      data3.push([
        1 + index,
        value.date,
        value.chargebeforetaxes,
        value.chargebeforetaxes,
        value.single,
        value.queen,
        value.weeklySingle,
        value.standard,
        value.newtaxtype,
        value.kingsuiteweekly,
        value.doubledaily,
        value.doubleweekly,
        value.singleQueenDaily,
        value.singleQueenWeekly,
        value.taxTotal,
        value.taxExemptTotal,
      ]);
      data2.push(data1);
    });
    setGrandTotal(grandtotal + "(Charges before taxes)");
    setsummarytabledata(data2);
    setReportManagementDate(data2);
    setcsvdata2(data3);
    setShowtopheader(true);
    setShouldBorderShow(true);
  }

  async function getSummaryReport() {
    setIsGetSummaryReportToBeShown(true);
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/summaryreport/${data}`,
      // params:data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      setLoading(false);
    }
    setsummarycolumns([
      columnHelper.accessor("id", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "#",
      }),
      columnHelper.accessor("SellingDate", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Selling Date",
      }),
      columnHelper.accessor("Bookings", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Bookings",
      }),
      columnHelper.accessor("RevPAR", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "RevPAR",
      }),
      columnHelper.accessor("ADR", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "ADR",
      }),
      columnHelper.accessor("RoomChargesBeforeTax", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Room Charges (before taxes)",
      }),
      columnHelper.accessor("AllCharges", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "All Charges",
      }),
      columnHelper.accessor("AllPayments", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "All Payments",
      }),
      columnHelper.accessor("Balance", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Balance",
      }),
    ]);
    let data2 = [];
    let data3 = [
      [
        "#",
        "Selling Date",
        "Bookings",
        "RevPAR",
        "ADR",
        "Room Charges (before taxes)",
        "All Charges",
        "All Payments",
        "Balance",
      ],
    ];
    let grandtotaldata = 0;
    response.data.data.map((value, index) => {
      let data1 = {
        id: index + 1,
        SellingDate: value?.SellingDate,
        Bookings: value?.Bookings,
        RevPAR: value?.RevPAR,
        ADR: value?.ADR,
        RoomChargesBeforeTax: value?.RoomChargesBeforeTax,
        AllCharges: value?.AllCharges,
        AllPayments: value?.AllPayments,
        Balance: value?.Balance,
      };
      grandtotaldata = grandtotaldata + +value?.Balance;
      data3.push([
        index + 1,
        value?.SellingDate,
        value?.Bookings,
        value?.RevPAR,
        value?.ADR,
        value?.RoomChargesBeforeTax,
        value?.AllCharges,
        value?.AllPayments,
        value?.Balance,
      ]);
      data2.push(data1);
    });
    setGrandTotal(grandtotaldata);
    setsummarytabledata(data2);
    setcsvdata2(data3);
    setReportManagementDate(data2);
  }

  async function getMonthlySalesReports() {
    setIsGetSummaryReportToBeShown(true);
    const userToken = localStorage.getItem("userToken");
    const data = moment().format("YYYY-MM-DD");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + `/admin/monthlysalesreport/${data}`,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) {
      setLoading(false);
    }

    setsummarycolumns([
      columnHelper.accessor("name", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Name",
      }),
      columnHelper.accessor("description", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Description",
      }),
      columnHelper.accessor("_", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "",
      }),
      columnHelper.accessor("percentage", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "%",
      }),
      columnHelper.accessor("nights", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Nights",
      }),
      columnHelper.accessor("room", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Room",
      }),
      columnHelper.accessor("other", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Other",
      }),
      columnHelper.accessor("tax", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Tax",
      }),
      columnHelper.accessor("total", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Total (with Taxes)",
      }),
      columnHelper.accessor("payment", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Payment",
      }),
      columnHelper.accessor("balance", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Balance",
      }),

      columnHelper.accessor("cancel", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Cancel %",
      }),

      columnHelper.accessor("avgstay", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "Avg Stay",
      }),

      columnHelper.accessor("adr", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "ADR",
      }),
      columnHelper.accessor("revpar", {
        cell: (info) => (
          <Text fontSize={"xs"} fontWeight={"500"}>
            {info.getValue()}
          </Text>
        ),
        header: "REV PAR",
      }),
    ]);
    let data2 = [];
    let data3 = [
      [
        "Room",
        " ",
        "Bookings",
        " ",
        " ",
        "Net Revenue",
        " ",
        " ",
        " ",
        " ",
        " ",
        "Statistics",
        " ",
        " ",
        " ",
      ],
      [
        "Name",
        "Description",
        "",
        "%",
        "Nights",
        "Room",
        "Other",
        "Tax",
        "Total (with Taxes)",
        "Payment",
        "Balance",
        "Cancel %",
        "Avg Stay",
        "ADR",
        "RevPar",
      ],
    ];

    setNoOfRows(response.data.data.length);
    let grandTotal = 0;
    response.data.data.map((value) => {
      let data1 = {
        name: value?.name,
        description: value?.description,
        _: value?._,
        percentage: value?.percentage,
        nights: value?.nights,
        room: value?.room,
        other: value?.other,
        tax: value?.tax,
        total: value?.total,
        payment: value?.payment,
        balance: value?.balance,
        cancel: value?.cancel,
        avgstay: value?.avgstay,
        adr: value?.adr,
        revpar: value?.revpar,
      };
      grandTotal = grandTotal + +value.balance;
      data3.push([
        value?.name,
        value?.description,
        value?._,
        value?.percentage,
        value?.nights,
        value?.room,
        value?.other,
        value?.tax,
        value?.total,
        value?.payment,
        value?.balance,
        value?.cancel,
        value?.avgstay,
        value?.adr,
        value.revpar,
      ]);
      data2.push(data1);
    });
    setGrandTotal(grandTotal);
    setsummarytabledata(data2);
    setReportManagementDate(data2);
    setcsvdata2(data3);
    setTopHeader([
      {
        heading: "Room",
        colspan: 2,
      },
      {
        heading: "Bookings",
        colspan: 3,
      },
      {
        heading: "Net Revenue",
        colspan: 6,
      },
      {
        heading: "Statistics",
        colspan: 4,
      },
    ]);
    setShowtopheader(true);
    setShouldBorderShow(true);
  }
  React.useEffect(() => {
    setCsvData(summarytabledata);
  }, [summarytabledata]);

  async function getQuaterlyReport() {
    const userToken = localStorage.getItem("userToken");
    const data = { currentDate: moment().format("YYYY-MM-DD") };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsQuaterly",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) setLoading(false);
    if (response.status) {
      const sumOfTotalPrice = response.data.data.todayBookings.reduce(
        (a, b) => a + parseFloat(b.totalPrice),
        0
      );
      setGrandTotal(sumOfTotalPrice);
      setReportManagementDate(
        prepareRowsDataFromTable(response.data.data.todayBookings)
      );
      setCsvData(prepareRowsDataFromTable(response.data.data.todayBookings));
    }
  }
  async function handleSavedReports() {
    const userToken = localStorage.getItem("userToken");
    const data = {
      reportName: reportValue.reportTypeVal,
      reportType: reportValue.reportName,
      reportDescription: reportValue.reportDescription,
      report: (reportName === "Manager Report"?reportManageMentData:[...reportManageMentData]),
    };
    const config = {
      method: "post",
      url: process.env.REACT_APP_API_URL + "/admin/saveBookingReports",
      data: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };

    const response = await Axios(config);
    if (response.status)
      // window.location.href = "/admin/insights/builder/reports";
      navigate("/admin/insights/builder/reports");
  }
  
  async function getMonthlyDetails() {
    const userToken = localStorage.getItem("userToken");
    const data = { currentDate: moment().format("YYYY-MM-DD") };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsByMonth",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response) setLoading(false);
    if (response.status) {
      const sumOfTotalPrice = response.data.data.todayBookings.reduce(
        (a, b) => a + parseFloat(b.totalPrice),
        0
      );
      setGrandTotal(sumOfTotalPrice);
      setReportManagementDate(
        prepareRowsDataFromTable(response.data.data.todayBookings)
      );
      setCsvData(prepareRowsDataFromTable(response.data.data.todayBookings));
    }
  }
  async function getDashboardDetails() {
    const userToken = localStorage.getItem("userToken");
    const data = { currentDate: moment().format("YYYY-MM-DD") };
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getBookingsByDate",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);

    if (response) setLoading(false);
    if (response.status) {
      const sumOfTotalPrice = response.data.data.todayBookings.reduce(
        (a, b) => a + parseFloat(b.totalPrice),
        0
      );
      setGrandTotal(sumOfTotalPrice);
      setReportManagementDate(
        prepareRowsDataFromTable(response.data.data.todayBookings)
      );
    }
  }
  const prepareRowsDataFromTable = (data) => {
    const tmpRows = [];
    let data3 = [
      [
        "#",
        "NAME",
        "EMAIL",
        "PHONE",
        "ADDITIONAL GUEST",
        "ROOM DETAIL",
        "ROOM NUMBER",
        "BILLING ADDRESS",
        "CHECK IN DATE",
        "CHECK OUT DATE",
        "PRICE",
      ],
    ];
    data.map((row, index) => {
      let roomDetails = "";
      row.roomsInfo.map((value, index) => {
        roomDetails +=
          value.roomName + "( x " + row.roomKeys[index].noOfRooms + ") - ";
      });
      tmpRows.push({
        id: index + 1,
        firstName: `${row.userInfo?.firstName} ${row.userInfo?.lastName}`,
        emailAddress: row.userInfo?.emailAddress,
        phoneNumber: row.userInfo?.phoneNumber,
        additionalGuest: `${row.additionalGuest?.firstName} ${row.additionalGuest?.lastName} - ${row.additionalGuest?.emailAddress} - ${row.additionalGuest.phoneNumber}`,
        roomDetails: roomDetails,
        roomNumber: row?.roomNumber,
        billingAddress: `${row.userInfo?.billingAddress.address1} ${row.userInfo?.billingAddress?.address2} - ${row.userInfo?.billingAddress?.city} , ${row.userInfo?.billingAddress?.state} - ${row.userInfo?.country} , ${row.userInfo?.billingAddress?.zipcode}`,
        checkInDate: getFormattedDate(row.checkInDate),
        checkOutDate: getFormattedDate(row.checkOutDate),
        totalPrice: `$ ${row?.totalPrice}`,
      });
      data3.push([
        `"${index + 1}"`,
        `"${row.userInfo?.firstName} ${row.userInfo?.lastName}"`,
        `"${row.userInfo?.emailAddress}"`,
        `"${row.userInfo?.phoneNumber}"`,
        `" ${row.additionalGuest?.firstName} ${row.additionalGuest?.lastName} - ${row.additionalGuest?.emailAddress} - ${row.additionalGuest.phoneNumber}"`,
        `"${roomDetails}"`,
        `"${row?.roomNumber}"`,
        `"${row.userInfo?.billingAddress.address1} ${row.userInfo?.billingAddress?.address2} - ${row.userInfo?.billingAddress?.city} , ${row.userInfo?.billingAddress?.state} - ${row.userInfo?.country} , ${row.userInfo?.billingAddress?.zipcode}"`,
        `"${getFormattedDate(row.checkInDate)}"`,
        `"${getFormattedDate(row.checkOutDate)}"`,
        `"$ ${row?.totalPrice}"`,
      ]);
    });
    setcsvdata2(data3);
    return tmpRows;
  };
  const reports = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <Text fontSize={"xs"} fontWeight={"500"}>
          {info.getValue()}
        </Text>
      ),
      header: "#",
    }),
    columnHelper.accessor("firstName", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "NAME",
    }),
    columnHelper.accessor("emailAddress", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "EMAIL",
    }),

    columnHelper.accessor("phoneNumber", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "PHONE",
    }),
    columnHelper.accessor("additionalGuest", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "ADDITIONAL GUEST",
    }),
    columnHelper.accessor("roomDetails", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "ROOM DETAIL",
    }),
    columnHelper.accessor("roomNumber", {
      cell: (info) => (
        <Text fontSize={"xs"} fontWeight={"500"}>
          {info.getValue()}
        </Text>
      ),
      header: "ROOM NUMBER",
    }),
    columnHelper.accessor("billingAddress", {
      cell: (info) =>
        info
          .getValue()
          .split("-")
          .map((value) => (
            <Text fontSize={"xs"} fontWeight={"500"}>
              {value}
            </Text>
          )),
      header: "BILLING ADDRESS",
    }),
    columnHelper.accessor("checkInDate", {
      cell: (info) => (
        <Text fontSize={"xs"} fontWeight={"500"}>
          {info.getValue()}
        </Text>
      ),
      header: "CHECK IN DATE",
    }),
    columnHelper.accessor("checkOutDate", {
      cell: (info) => (
        <Text fontSize={"xs"} fontWeight={"500"}>
          {info.getValue()}
        </Text>
      ),
      header: "CHECK OUT DATE",
    }),
    columnHelper.accessor("totalPrice", {
      cell: (info) => (
        <Text fontSize={"xs"} fontWeight={"500"}>
          {info.getValue()}
        </Text>
      ),
      header: "PRICE",
    }),
  ];

  const handleSelectedTableColumn = (event, value, index) => {
    if (event) {
      setSelectedTableColumn([...selectedTablecolumn, value]);
    } else {
      setSelectedTableColumn([
        ...selectedTablecolumn.slice(0, index),
        ...selectedTablecolumn.slice(index + 1, selectedTablecolumn.length),
      ]);
    }
  };
  const { leftDrawerOnOpen, setLeftDrawerOnOpen } = React.useState(false);
  const btnRef = React.useRef();
  const handleTableColumnsOnClick = () => {
    setTableColumnsFlexDesign("1");
    setMainColoumnFlexDesign("4");
    setTableColumnsFlexView("block");
  };

  

  const [tableColumns, setTableColumns] = React.useState({
    guest: [
      "Guest Address",
      "Guest Address Line 2",
      "Guest Date of Birth",
      "Guest City",
      "Guest Document Expiration Date",
      "Guest Document Issue Date",
      "Guest Document Issuing Country",
      "Guest Document Issuing Country Code",
      "Guest Document Number",
      "Guest Document Type",
      "Guest Email",
      "Guest First Name",
      "Guest Full Name",
      "Guest Gender",
      "Guest Mobile Phone Number",
      "Guest Postal/Zip Code",
      "Guest Residence Country",
      "Guest State",
      "Guest Status Level",
      "Guest Surname",
      "Opt-In for Marketting Emails",
      "Primary Guest Flag",
      "Repeat Guest Flag",
      "Property Check-In Time",
      "Property Check-Out Time",
      "Property Id",
      "Property Name",
      "Booking Date Time - UTC",
      "Booking Date Time - Property",
      "Cancellation Date Time - UTC",
      "Cancellation Date Time - Property",
      "Check-In Date",
      "Check-Out Date",
      "Reservation Date",
      "Reservation Status",
      "Third Party Confirmation Number",
      "Duration of Stay",
      "Reservation room numbers",
    ],
  });

  const handleTableColumnCloseOnclick = () => {
    setTableColumnsFlexDesign("0");
    setMainColoumnFlexDesign("5");
    setTableColumnsFlexView("none");
  };
  const handleTableColumnFlexSubView = () => {
    setTableColumnFlexSubView("block");
  };
  const handleTableColumnFlexSubViewClose = () => {
    setTableColumnFlexSubView("none");
  };
  const handleMainColumnFlexDesignView = () => {
    setMainColoumnFlexDesignView("none");
  };

  return (
    <Container maxW="container.xxl" p="0">
      {/* <Header /> */}
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"70px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem py="2" area={"header"}>
          <Grid templateColumns="repeat(5, 1fr)" borderBottom="1px solid #ccc">
            <GridItem colSpan={2}>
              <Box display="flex" alignItems="center">
                <Heading
                  fontSize="md"
                  pl="6"
                  fontFamily="Poppins,sans-serif"
                  color="blue.500"
                  fontWeight={300}
                >
                  {" "}
                  Saved Reports &gt;{" "}
                </Heading>
                <Text fontSize={"md"} fontWeight={300} pl={1}>
                  {" "}
                  {reportValue?.reportName}{" "}
                </Text>
              </Box>
              <Box
                pl="6"
                pt={1}
                display="flex"
                w="100"
                alignItems="center"
                pb={2}
              >
                <FaQuestionCircle fontSize={"xs"} />
                <Text pl={2} fontSize={"xs"}>
                  Report Type : {reportValue?.reportTypeVal}
                </Text>
              </Box>
            </GridItem>
            <GridItem
              colStart={6}
              colEnd={6}
              display="flex"
              justifyContent="end"
            >
              <>
                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="email-alerts"
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                  />
                  <FormLabel
                    htmlFor="email-alerts"
                    mb="0"
                    pl={"2"}
                    fontSize={"xs"}
                  >
                    Auto Refresh
                  </FormLabel>
                </FormControl>
                <Box display="flex" alignItems="center" pr="3" gap={3}>
                  <Button
                    colorScheme="gray"
                    fontSize={"xs"}
                    onClick={(e) => {
                      handleSavedReports();
                    }}
                  >
                    Save
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      fontSize={"xs"}
                      rightIcon={<ChevronDownIcon />}
                    >
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        fontSize={"sm"}
                        onClick={() => {
                          downloadCSV();
                        }}
                      >
                        <CSVLink fontSize={"xs"} data={csvData}>
                          Download CSV
                        </CSVLink>
                      </MenuItem>
                      <MenuItem fontSize={"sm"} onClick={onOpen}>
                        Share report
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem mt="3" area={"nav"}>
          <Stack
            display="flex"
            background="#fff"
            borderRight={"1px solid #e2e8f0"}
            alignItems={"center"}
            pt={5}
            justifyContent={"center"}
          >
            <Box py={5}>
              <FaTable />
            </Box>
            <Box py={5}>
              <FaBars onClick={handleTableColumnsOnClick} />
            </Box>
            <Box py={5}>
              <FaFilter />
            </Box>
            <Box py={5}>
              <FaSlidersH />
            </Box>
          </Stack>
        </GridItem>
        <GridItem mt="1" area={"main"} display={"flex"}>
          <Stack flex={tableColumnsFlexDesign} display={tableColumnFlexView}>
            <Box display={"flex"} alignItems="center" py={3}>
              <Box flex={3} display={"flex"}>
                <Heading
                  pr="2"
                  fontSize="md"
                  pl="2"
                  fontFamily="Poppins,sans-serif"
                  fontWeight={500}
                >
                  {" "}
                  Table Outline
                </Heading>{" "}
                <FaQuestionCircle pt={3} fontSize={"xs"} />
              </Box>
              <Text
                color={"#000"}
                display={"flex"}
                onClick={handleTableColumnCloseOnclick}
                justifyContent={"end"}
                flex={1}
                pr={6}
              >
                <FaTimes />
              </Text>
            </Box>

            <Box display={"flex"} alignItems="center" py={3}>
              <Box flex={3} display={"flex"}>
                <Heading
                  pr="2"
                  fontSize="sm"
                  pl="2"
                  fontFamily="Poppins,sans-serif"
                  fontWeight={500}
                >
                  {" "}
                  COLUMNS
                </Heading>{" "}
                <FaQuestionCircle pt={3} fontSize={"xs"} />
              </Box>
              <Box
                flex={1}
                display={"flex"}
                justifyContent={"center"}
                onClick={handleTableColumnFlexSubView}
                pr={4}
                color="blue.500"
              >
                <Text color="blue.500" fontSize={"sm"}>
                  ADD{" "}
                </Text>{" "}
                <FaPlus fontSize={"xs"} style={tableColumnAddIcon} />
              </Box>
            </Box>
            <Stack
              flex={1}
              display={tableColumnFlexSubView}
              className="toggle-tooltip-after"
              style={addTableColumnView}
            >
              <Card maxW="md">
                <CardHeader px="3">
                  <Flex spacing="2">
                    <Box>
                      <Heading fontSize={"md"} fontWeight={"400"}>
                        Add columns
                      </Heading>
                    </Box>
                    <Text
                      color={"#000"}
                      display={"flex"}
                      onClick={handleTableColumnFlexSubViewClose}
                      justifyContent={"end"}
                      flex={1}
                      pr={2}
                    >
                      <FaTimes />
                    </Text>
                  </Flex>
                </CardHeader>
                <CardBody px="2">
                  <InputGroup>
                    <Input placeholder="Search" />
                    <InputRightElement
                      children={<FaSearch color="green.500" />}
                    />
                  </InputGroup>
                  <Box px="2" py="3" style={addTableGuestList}>
                    <Text fontSize={"md"} my="3" fontWeight={"600"}>
                      Guest
                    </Text>
                    {tableColumns.guest.map((value, index) => (
                      <Checkbox
                        onChange={(e) =>
                          handleSelectedTableColumn(
                            e.target.checked,
                            value,
                            index
                          )
                        }
                        fontSize="12px"
                        fontWeight={"300"}
                      >
                        {value}
                      </Checkbox>
                    ))}
                  </Box>
                </CardBody>
              </Card>
            </Stack>
            <Box display={"flex"} alignItems="center" py={3}>
              <Box flex={3} display={"flex"}>
                <Heading
                  pr="2"
                  fontSize="sm"
                  pl="2"
                  fontFamily="Poppins,sans-serif"
                  fontWeight={500}
                >
                  {" "}
                  GROUP ROWS
                </Heading>{" "}
                <FaQuestionCircle pt={3} fontSize={"xs"} />
              </Box>
              <Box
                flex={1}
                display={"flex"}
                justifyContent={"center"}
                pr={4}
                color="blue.500"
              >
                <Text color="blue.500" fontSize={"sm"}>
                  ADD{" "}
                </Text>{" "}
                <FaPlus fontSize={"sm"} style={tableColumnAddIcon} />
              </Box>
            </Box>
            <Box display={"flex"} alignItems="center" py={3}>
              <Box flex={3} display={"flex"}>
                <Heading
                  pr="2"
                  fontSize="sm"
                  pl="2"
                  fontFamily="Poppins,sans-serif"
                  fontWeight={500}
                >
                  {" "}
                  GROUP COLUMNS{" "}
                </Heading>{" "}
                <FaQuestionCircle pt={3} fontSize={"xs"} />
              </Box>
              <Box
                flex={1}
                display={"flex"}
                justifyContent={"center"}
                pr={4}
                color="blue.500"
              >
                <Text color="blue.500" fontSize={"sm"}>
                  ADD{" "}
                </Text>{" "}
                <FaPlus fontSize={"sm"} style={tableColumnAddIcon} />
              </Box>
            </Box>
          </Stack>
          <Stack flex={mainColoumnFlexDesign} mt={2}>
            <Box
              width="100%"
              display={mainColoumnFlexDesignView}
              alignItems="center"
              pl={3}
              py={7}
              style={addNewGuestNotificationButton}
            >
              <Box flex={3} display={"flex"}>
                <FaInfoCircle fontSize={"xs"} />
                <Text pl={2} fontSize={"xs"}>
                  Start by adding fields to the columns!
                </Text>
              </Box>
              <Text
                color={"#000"}
                display={"flex"}
                justifyContent={"end"}
                onClick={handleMainColumnFlexDesignView}
                flex={1}
                pr={6}
              >
                <FaTimes />
              </Text>
            </Box>
            {() => {
              if (reportManageMentData.length == 0) {
                <Box pt={7} pl={3}>
                  <Text fontSize={"sm"} pt={3}>
                    To start, use the sidebar to navigate between the table
                    outline and filters.
                  </Text>
                  <UnorderedList style={addNewGuestUnorderedList} pt={3}>
                    <ListItem Key={1} mb="4" display="flex" alignItems="center">
                      <FaBars />
                      <Text pl={2} fontSize={"xs"}>
                        <b>Table Outline.</b> Add columns and group rows to
                        summarize your metrics. You can group columns and rows
                        to create a pivot table.
                      </Text>
                    </ListItem>
                    <ListItem Key={1} display="flex" alignItems="center">
                      <FaFilter />
                      <Text pl={2} fontSize={"xs"}>
                        <b>Filters.</b> Add filters to narrow your results.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>;
              }
            }}
            <Box pt={7} pl={3}>
              <Grid templateColumns="repeat(4, 1fr)">
                <GridItem colSpan={2}>
                  <Text fontSize={"xs"} style={addTotalNoOfRecords}>
                    # of Records : {noOfRows}{" "}
                  </Text>
                </GridItem>
                <GridItem colSpan={2} textAlign="end">
                  <Text fontSize={"xs"} style={addGrandTotalView}>
                    Grand Total - Sum : ${grandTotal}
                  </Text>
                </GridItem>
              </Grid>

              {loading ? (
                <>
                <LoadSpinner loading={loading} />
             
                </>
              ) : (
                <>
                  {isgetSummaryReporttobeshown ? (

                    <>
                    
               {dummytable ? dummytable :<DataTable
                      searchBox={false}
                      columns={summarycolumns}
                      data={summarytabledata}
                      topheader={topheader}
                      showtopheader={showtopheader}
                      pt="20px"
                      headerborder={shouldbordershow}
                      shouldbordershow={shouldbordershow}
                      tdborderX={"1px"}
                      borderColor="#e2e8f0"
                    /> }
                    </>
                  ) : (
                    <>
                    <DataTable
                      searchBox={false}
                      columns={reports}
                      data={reportManageMentData}
                      pt="20px"
                    />
                 
                    </>
                  )}
                </>
              )}
            </Box>
          
          </Stack>
        </GridItem>
      </Grid>
      <div>
      
      </div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <SendCSVemail csvdata2={csvdata2} reportName={reportName} onClose={onClose}/>
      </Modal>
    </Container>
  );
}
const addNewGuestNotificationButton = {
  borderColor: "#e0e5ec",
  background: "#d1f1ff",
};
const addNewGuestUnorderedList = {
  listStyle: "none",
};
const tableColumnAddIcon = {
  width: "100%",
  fontSize: "15px",
  paddingTop: "3px",
};
const addTableColumnView = {
  position: "relative",
  left: "100%",
  top: "-10%",
  width: "300px",
  maxHeight: "400px",
  boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 22%)",
  zIndex: "9999",
};
const addTableGuestList = {
  overflow: "scroll",
  maxHeight: "256px",
};
const addGrandTotalView = {
  paddingRight: "35px",
  textAlign: "end",
  paddingBottom: "15px",
};
const addTotalNoOfRecords = {
  textAlign: "left",
  paddingLeft: "15px",
  paddingBottom: "15px",
};
