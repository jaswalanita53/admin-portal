import * as React from 'react';
import Axios from 'axios';
import { createColumnHelper } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import LoadSpinner from "../common/LoadSpinner.js";
import {
    Container, Stack, Grid, GridItem, Text, Button,
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
    useDisclosure,
    Modal,
    ModalOverlay,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";

import { CSVLink } from "react-csv";
import Header from '../components/Header/Header'
import { FaBars, FaFilter, FaInfoCircle, FaPlus, FaQuestionCircle, FaSearch, FaSlidersH, FaTable, FaTimes } from 'react-icons/fa';
import { DataTable } from '../common/dataTables.js';
import { ChevronDownIcon } from '@chakra-ui/icons';
import SendCSVemail from '../components/SendCSVemail.js';
   
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
} from '@chakra-ui/react'


export default function DataInsightsHomeSavedGuests() {
    const initialRef = React.useRef(null);
    const [tableColumnsFlexDesign, setTableColumnsFlexDesign] = React.useState(0)
    const [mainColoumnFlexDesign, setMainColoumnFlexDesign] = React.useState(5)
    const [tableColumnFlexView, setTableColumnsFlexView] = React.useState('none')
    const [tableColumnFlexSubView, setTableColumnFlexSubView] = React.useState('none')
    const [selectedTablecolumn, setSelectedTableColumn] = React.useState([])
    const [reportValue, setReportValue] = React.useState([])
    const [reportManageMentData, setReportManagementDate] = React.useState('')
    const [grandTotal, setGrandTotal] = React.useState();
    const columnHelper = createColumnHelper();
    const [mainColoumnFlexDesignView, setMainColoumnFlexDesignView] = React.useState('flex')
    const [csvData, setCsvData] = React.useState('');
    const [autoRefresh, setAutoRefresh] = React.useState(false);
    const params = useParams()
    const [csvdata2, setcsvdata2] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [noOfrows, setNumberOfRows] = React.useState(0)
    // const [tableColumns, setTableColumns] = React.useState()
    const [tabledata, setTableData ] = React.useState([])
      const [topheader, setTopHeader] = React.useState();
      const [showtopheader, setShowtopheader] = React.useState(false);
      const [shouldbordershow, setShouldBorderShow] = React.useState(false);
       const { isOpen, onOpen, onClose } = useDisclosure();
         const [reportName, setReportName] = React.useState("");
         const [managerTable,setManagertable] = React.useState([])

    React.useEffect(() => {
        let reportId = params.id;
        getReportById(reportId);
    }, []);

    async function getReportById(id) {
      const userToken = localStorage.getItem("userToken");
      const getReportDetail = JSON.parse(localStorage.getItem("reportsValue"));
      const data = { reportId: id };

      const config = {
        method: "get",
        url: process.env.REACT_APP_API_URL + "/admin/getReportById",
        params: data,
        headers: {
          Authorization: "Bearer " + userToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      };
      const response = await Axios(config);
      if (response.data.status) {
        setLoading(false);
        if(response.data.data.reportName ==="Manager Report"){  
          let table = 
          <TableContainer >
          <Table variant='simple' minWidth="800px">
           
            <Thead>
              <Tr>
                { response.data.data.report[0].map(heading => 
                <Th isNumeric>{heading}</Th>)
                }
              </Tr>
            </Thead>
                
                <Tbody>
                { response.data.data.report.map((heading,index) =>{
                  if(index > 0){
                    <Tr>
                      {
                        heading.map(data=>{
                          <Td isNumeric>{heading}</Td>
                        })
                      }
                    </Tr>
                  }
                  } 
                )}   
                </Tbody>
          </Table>
        
          <Table className="mt-10">
          <TableCaption>Manager's Report</TableCaption>
            <Thead borderTop="1px" borderColor="#EDF2F7">
              <Tr>
                {/* {t2heading.map(t2heading=>(<Th>{t2heading === "Date" ? "Forcast":t2heading}</Th>))} */}
              </Tr>
            </Thead>
            <Tbody>
             
            </Tbody>
          </Table>
        </TableContainer>
         
         setManagertable(table)

        }else{
        setNumberOfRows(response.data.data.report.length);
          setReportValue(...reportValue, {
            reportTypeVal: response.data.data?.reportName,
            reportName: response.data.data?.reportType,
            reportDescription: response?.data?.data?.reportDescription,
          });
          setReportName(response.data.data?.reportName);
        if (response.data.data.reportType === "Summary Report") {
          let data3 = [
            [
              "#",
              "SellingDate",
              "Bookings",
              "RevPAR",
              "ADR",
              "RoomChargesBeforeTax",
              "AllCharges",
              "AllPayments",
              "Balance",
            ]
          ];

          let rowColumns = [
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
              header: "Room Charges Before Tax",
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
          ];
          let grandTotal = 0
          let data2 = []
          response?.data?.data?.report.map((value,index)=>{
                let data1 = {
                  id: index + 1,
                  ADR: value.ADR,
                  AllCharges: value.AllCharges,
                  AllPayments: value.AllPayments,
                  Balance: value.Balance,
                  Bookings: value.Bookings,
                  RevPAR: value.RevPAR,
                  RoomChargesBeforeTax: value.RoomChargesBeforeTax,
                  SellingDate: value.SellingDate,
                };
                grandTotal = grandTotal + +value.AllCharges
            data2.push(data1)
            data3.push([
              index + 1,
              value.SellingDate,
              value.Bookings,
              value.RevPAR, 
              value.ADR,
              value.RoomChargesBeforeTax,
              value.AllCharges,
              value.AllPayments,
              value.Balance,
            ]);                
          })
      
          setTableColumns(rowColumns);
          setTableData(data2)
          setcsvdata2(data3);
          setGrandTotal(grandTotal);
        }
        else if (response.data.data.reportType === "Monthly Sales Report") {
          
              setTableColumns([
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

              
              let grandTotal = 0;
              response.data.data.report.map((value) => {
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
              setTableData(data2);
              setcsvdata2(data3);
              setGrandTotal(grandTotal);
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
        }else if(response.data.data.reportType ==="Monthly Tax Report"){
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

    setTableColumns(tabledata);
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
 
    response.data.data.report.map((value, index) => {
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
    setTableData(data2);
    setReportManagementDate(data2);
    setcsvdata2(data3);
    setShowtopheader(true);
    setShouldBorderShow(true);
        } 
        else {
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
                  .map((value, index) => (
                    <Text
                      fontSize={"xs"}
                      fontWeight={"500"}
                      key={String(index) + String(value.slice(0, 5))}
                    >
                      {value}
                    </Text>
                  )),

              header: "GUEST INFORMATION",
            }),
            columnHelper.accessor("additionalGuest", {
              cell: (info) =>
                info
                  .getValue()
                  .split("-")
                  .map((value, index) => (
                    <Text
                      fontSize={"xs"}
                      fontWeight={"500"}
                      key={String(index) + String(value.slice(0, 5))}
                    >
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
                  .map((value, index) => (
                    <Text
                      fontSize={"xs"}
                      fontWeight={"500"}
                      key={String(index) + String(value.slice(0, 5))}
                    >
                      {value}
                    </Text>
                  )),
              header: "ROOM DETAIL",
            }),
            columnHelper.accessor("billingAddress", {
              cell: (info) =>
                info
                  .getValue()
                  .split("-")
                  .map((value, index) => (
                    <Text
                      fontSize={"xs"}
                      fontWeight={"500"}
                      key={String(index) + String(value.slice(0, 5))}
                    >
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

          setTableColumns(reports);
          let data3 = [
            [
              "#",
              "GUEST INFORMATION",
              "ADDITIONAL GUEST",
              "ROOM DETAIL",
              "BILLING ADDRESS",
              "CHECK IN DATE",
              "CHECK OUT DATE",
              "PRICE",
            ],
          ];

          response?.data?.data?.report?.map((value) => {
            let data2 = [
              `"${value.id}"`,
              `"${value.firstName}"`,
              `"${value.additionalGuest}"`,
              `"${value.roomDetails}"`,
              `"${value.billingAddress}"`,
              `"${value.checkInDate}"`,
              `"${value.checkOutDate}"`,
              `"${value.totalPrice}"`,
            ];

            data3.push(data2);
          });

          setcsvdata2(data3);
          setNumberOfRows(response.data.data.report.length);
          let sumOfTotalPrice = response.data.data.report.reduce(
            (a, b) => a + parseFloat(b.totalPrice.split(" ")[1]),
            0
          );
          let sumOfTotalPriceWithTax;
          if (getReportDetail?.branchValue == "Texas") {
            sumOfTotalPriceWithTax =
              sumOfTotalPrice + (sumOfTotalPrice * 7) / 100;
          } else {
            sumOfTotalPriceWithTax =
              sumOfTotalPrice + (sumOfTotalPrice * 7) / 100;
          }
          setGrandTotal(sumOfTotalPriceWithTax);
          setReportManagementDate(response.data.data.report);
          setCsvData(response.data.data.report);
          setCsvData((csvData) => [
            ...response.data.data.report,
            ...[
              {
                id: "",
                userInformation: "",
                additionalGuest: "",
                roomDetails: "",
                checkInDate: "",
                checkOutDate: "",
                billingAddress: "",
                totalPrice: "$" + sumOfTotalPrice,
              },
            ],
          ]);

        
        }
      }}
    }


  
    const handleSelectedTableColumn = (event, value, index) => {
        if (event) {
            setSelectedTableColumn([...selectedTablecolumn, value])
        } else {
            setSelectedTableColumn([
                ...selectedTablecolumn.slice(0, index),
                ...selectedTablecolumn.slice(index + 1, selectedTablecolumn.length)
            ]);
        }
    }
    const { leftDrawerOnOpen, setLeftDrawerOnOpen } = React.useState(false)
    const btnRef = React.useRef()
    const handleTableColumnsOnClick = () => {
        setTableColumnsFlexDesign("1")
        setMainColoumnFlexDesign("4")
        setTableColumnsFlexView('block')
    }
    // const [getReportsVal,setRepot]
    // React.useEffect(() => {
    //     getReportsVal = localStorage.getItem('')   
    //   }, [])
    const [tableColumns, setTableColumns] = React.useState({
        "guest": ["Guest Address", "Guest Address Line 2", "Guest Date of Birth", "Guest City", "Guest Document Expiration Date", "Guest Document Issue Date", "Guest Document Issuing Country", "Guest Document Issuing Country Code", "Guest Document Number", "Guest Document Type", "Guest Email", "Guest First Name", "Guest Full Name", "Guest Gender", "Guest Mobile Phone Number", "Guest Postal/Zip Code", "Guest Residence Country", "Guest State", "Guest Status Level", "Guest Surname", "Opt-In for Marketting Emails", "Primary Guest Flag", "Repeat Guest Flag", "Property Check-In Time", "Property Check-Out Time", "Property Id", "Property Name", "Booking Date Time - UTC", "Booking Date Time - Property", "Cancellation Date Time - UTC", "Cancellation Date Time - Property", "Check-In Date", "Check-Out Date", "Reservation Date", "Reservation Status", "Third Party Confirmation Number", "Duration of Stay", "Reservation room numbers"]
    })

    const handleTableColumnCloseOnclick = () => {
        setTableColumnsFlexDesign("0")
        setMainColoumnFlexDesign("5")
        setTableColumnsFlexView('none')
    }
    const handleTableColumnFlexSubView = () => {
        setTableColumnFlexSubView('block')
    }
    const handleTableColumnFlexSubViewClose = () => {
        setTableColumnFlexSubView('none')
    }
    const handleMainColumnFlexDesignView = () => {
        setMainColoumnFlexDesignView('none');
    }

     function downloadCSV() {
   
        const csvContent = csvdata2?.map((row) => row.join(',')).join("\n");
    // 
   
       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    

       saveAs(blob, "data.csv");
     }

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
            <Grid
              templateColumns="repeat(5, 1fr)"
              borderBottom="1px solid #ccc"
            >
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
                    Saved Reports &gt;
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
                          {/* <CSVLink fontSize={"xs"} data={csvData}> */}
                          Download CSV
                          {/* </CSVLink> */}
                        </MenuItem>
                        <MenuItem onClick={onOpen}>Share report</MenuItem>
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
                      {tableColumns?.guest?.map((value, index) => (
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
                      <ListItem
                        Key={1}
                        mb="4"
                        display="flex"
                        alignItems="center"
                      >
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
                      # of Records : {noOfrows}{" "}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} textAlign="end">
                    <Text fontSize={"xs"} style={addGrandTotalView}>
                      Grand Total - Sum : ${grandTotal}
                    </Text>
                  </GridItem>
                </Grid>
                {loading ? (
                  <LoadSpinner loading={loading} />
                ) : 
                  (
                    managerTable.length>0? managerTable:<DataTable
                    searchBox={false}
                    columns={tableColumns}
                    data={
                      tabledata.length === 0 ? reportManageMentData : tabledata
                    }
                    topheader={topheader}
                    showtopheader={showtopheader}
                    pt="20px"
                    headerborder={shouldbordershow}
                    shouldbordershow={shouldbordershow}
                    tdborderX={"1px"}
                    borderColor="#e2e8f0"
                  />
                )}
              </Box>
            </Stack>
          </GridItem>
        </Grid>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <SendCSVemail
            csvdata2={csvdata2}
            reportName={reportName}
            onClose={onClose}
          />
        </Modal>
      </Container>
    );
}
const addNewGuestNotificationButton = {
    borderColor: '#e0e5ec',
    background: '#d1f1ff'
}
const addNewGuestUnorderedList = {
    listStyle: 'none'
}
const tableColumnAddIcon = {
    width: "100%",
    fontSize: "15px",
    paddingTop: "3px",
}
const addTableColumnView = {
    position: "relative",
    left: "100%",
    top: "-10%",
    width: "300px",
    maxHeight: "400px",
    boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 22%)",
    zIndex: "9999"
}

const addTableGuestList = {
    overflow: 'scroll',
    maxHeight: "256px"
}

const addGrandTotalView = {
    paddingRight: "35px",
    textAlign: "end",
    paddingBottom: "15px"
}

const addTotalNoOfRecords = {
    textAlign: 'left',
    paddingLeft: '15px',
    paddingBottom: '15px'
}