import {
    Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import {BsChevronDown} from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { ImTable2 } from "react-icons/im";
import Header from "../components/Header/Header";
import TaxReportsTable from "../components/TaxReports/TaxReportsTable";
import React, { useState } from "react";
import moment from "moment";
import Axios from "axios";

export default function TaxReports() {
  const infoIconText = {
    color: "#3366ff",
  };
  const marginRight10 = {
    marginRight: "10px",
  };

  const customdatestyle = {
     borderRadius: "5px",
    padding: '0px 13px',
    background: 'darkgrey',
    marginTop:"2px"
    // minWidth: '180px',
    // width: '180px'
}
const [loading, setLoading] = useState(true)

const [taxesdata, settaxesdata] = React.useState()
 React.useEffect(()=>{

gettaxesdata();
},[])

async function gettaxesdata(){
    const userToken = localStorage.getItem('userToken')
    const data = { "currentDate": moment().format("YYYY-MM-DD") }
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/taxReports",
      params: data,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config)
    settaxesdata(response?.data?.data)
    if(response) setLoading(false)
}
  return (
    <>
      {/* <Header /> */}
      <Container maxW="container.xxl" backgroundColor="#ecf2f9" pb="3">
        <Flex
          py={"5"}
          px="3"
          alignItems="center"
          gap="3"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Flex alignItems="center" gap="3">
            <Heading fontSize={"lg"} width={"100%"}>
              Reports / Tax Report
            </Heading>
            <FaQuestionCircle style={infoIconText} />
          </Flex>
          <Flex gap="2">
            <Button colorScheme="blue" borderRadius={"20px"}>
              <AiOutlineMail style={marginRight10} />
              Email
            </Button>
            <Box position="relative">
              <ImTable2 style={customtableicon} />
              <Select
                placeholder="Export To"
                border={"0"}
                outline="none"
                bg="teal"
                borderRadius={"20px"}
                style={customSelect}
              >
                <option style={customoptions}>1</option>
                <option style={customoptions}>2</option>
                <option style={customoptions}>3</option>
              </Select>
            </Box>
          </Flex>
        </Flex>
        <Card mx={"3"} borderRadius={"10px"}>
          <Flex alignItems={"center"} p="4" gap="1">
            <BsChevronDown fontSize={"10px"} />{" "}
            <Text fontSize={"md"} fontWeight={"500"}>
              Filter
            </Text>
          </Flex>
          <Flex py="4" px="6" gap="5" flexWrap="wrap">
            <Box width={{ base: "100%", sm: "180px" }}>
              <Text fontSize={"sm"} fontWeight={"500"}>
                Date
              </Text>
              <Input type="date" fontSize={"sm"} style={customdatestyle} />
            </Box>

            <Box width={{ base: "100%", sm: "180px" }}>
              <Text fontSize={"sm"} fontWeight={"500"}>
                Tax / Fee
              </Text>
              <Select fontSize={"sm"} bg="darkgray" style={customdatestyle}>
                <option fontSize={"sm"}>ALL TAXES/FEES</option>
              </Select>
            </Box>

            <Box width={{ base: "100%", sm: "180px" }}>
              <Text fontSize={"sm"} fontWeight={"500"}>
                Adjustments
              </Text>
              <Select
                fontSize={"sm"}
                bg="darkgray"
                style={customdatestyle}
                width={{ base: "100%", sm: "180px" }}
              >
                <option fontSize={"sm"}>ALL TAXES/FEES</option>
              </Select>
            </Box>
          </Flex>
          <Flex justifyContent={"right"} py="2" px="6" gap="2">
            <Button colorScheme="blue" borderRadius={"20px"}>
              Apply
            </Button>
            <Button borderRadius={"20px"} bg="darkgrey">
              Clear
            </Button>
          </Flex>
        </Card>

        <Card
          borderTop="4px solid #3366ff"
          padding="10px"
          my={"5"}
          mx="3"
          overflow="auto"
        >
          <TaxReportsTable taxesdata={taxesdata} loading={loading}/>
        </Card>
      </Container>
    </>
  );
};


const customtableicon = {
  zIndex: 1,
  position: "absolute",
  top: "13px",
  left: "14px",
  fontSize: "14px",
  color: "white",
};

const customSelect = {
  padding: "5px 40px",
  fontSize: "15px",
  fontWeight: "500",
  color: "white",
  background: "teal",
};

const customoptions = {
  background: "teal",
};