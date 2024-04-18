import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "../../common/dataTables";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { EditIcon } from "@chakra-ui/icons";
import { Formik, Field, useFormik } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

export default function EmployeeInfoModal(props) {
  const [topHeaderColspan, setTopHeaderColspan] = useState([{
    heading:"",
    colspan:0
  }])

  useEffect(()=>{
    if(props?.storybook?.employeeFolioOpen){
      settabledata(props?.storybook?.employeeData)
      let columns2 = [];
      let data2 = {}
      setTopHeaderColspan([{
        heading: "PREVIOUS RESERVATIONS",
        colspan: props?.storybook?.Previousreservations?.length
      }])
      props?.storybook?.Previousreservations.forEach((item) => {
        data2[item[0]] = item[1];
        columns2.push(
          columnHelper.accessor(item[0], {
            cell: (info) => (
              <Box
                position="relative"
                style={info?.getValue() === "+" ? tdnone : tdstyle}
              >
                {info?.getValue() === "+" ? (
                  <span style={customPlus} cursor="pointer">
                    No work assigned
                  </span>
                ) : (
                  <>
                    <p>
                      {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                        }`}
                    </p>
                    <p style={{ fontWeight: "500" }}>
                      {info?.getValue()?.work}
                    </p>{" "}
                  </>
                )}
              </Box>
            ),
            header: item[0],
          })
        );
      });
      setTable2({
        columns: columns2,
        table: [data2]
      })
    }

    setcolumnsstate(columns);
  }, [props?.storybook?.employeeFolioOpen])

  const [columnsstate, setcolumnsstate] = useState([]);
  const [table2, setTable2] = useState({
    columns:[],
    table:[]
  })
  // **************this code is for edit modal****************
  const {
    isOpen: isAddEmployeeModalOpen,
    onOpen: addEmployeeModalOnOpen,
    onClose: addEmployeeModalOnClose,
  } = useDisclosure();

  const [loading, setloading] = React.useState(false);
  const formik = useFormik({});

  const toast = useToast();

  let empId = props?.empId;
  let date = props.monday;
  let userToken = localStorage.getItem("userToken");
  let data = {
    empId,
    date,
  };
  const [tabledata, settabledata] = React.useState([]);
  const columnHelper = createColumnHelper();
  let columns = [
    columnHelper.accessor("name", {
      cell: (info) => info?.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("age", {
      cell: (info) => info?.getValue(),
      header: "Age",
    }),
    columnHelper.accessor("job", {
      cell: (info) => info?.getValue(),
      header: "Job",
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info?.getValue(),
      header: "Gender",
    }),
    columnHelper.accessor("datehired", {
      cell: (info) => info?.getValue(),
      header: "Date Hired",
    }),
    // columnHelper.accessor("", {
    //   cell: (info) => (
    //     <EditIcon
    //       cursor="pointer"
    //       onClick={() => {
    //         addEmployeeModalOnOpen();
    //       }}
    //     />
    //   ),
    //   header: "Edit ",
    // }),
  ];

  const getEmployeeDetails = () => {
    setloading(true);
    let config = {
      headers: {
        Authorization: "Bearer " + userToken,
      },
      params: {
        data,
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/admin/getEmployeedetails", config)

      .then((response) => {
        settabledata(preparetable(response?.data?.data));
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
      });
  };

  const preparetable = (table) => {
    let newtable = [];
    table.forEach((value) => {
      let data = {
        name: value?.name,
        age: value?.age,
        job: value?.job,
        gender: value?.gender,
        datehired: moment(value?.datehired).format("DD-MMMM-YYYY"),
        DateHired: value?.datehired,
      };

      let columns2 = [];
      let data2 = {}
      setTopHeaderColspan([{
        heading:"PREVIOUS RESERVATIONS",
        colspan:value.scheduledata.length
      }])
      value.scheduledata.forEach((item) => {
        data2[item[0]] = item[1];
        columns2.push(
          columnHelper.accessor(item[0], {
            cell: (info) => (
              <Box
                position="relative"
                style={info?.getValue() === "+" ? tdnone : tdstyle}
              >
                {info?.getValue() === "+" ? (
                  <span style={customPlus} cursor="pointer">
                    No work assigned
                  </span>
                ) : (
                  <>
                    <p>
                      {`${info?.getValue()?.startTime} - ${
                        info?.getValue()?.endTime
                      }`}
                    </p>
                    <p style={{ fontWeight: "500" }}>
                      {info?.getValue()?.work}
                    </p>{" "}
                  </>
                )}
              </Box>
            ),
            header: item[0],
          })
        );
      });

      setTable2({
        columns: columns2,
        table:[data2]
      })

      newtable.push(data);
      setcolumnsstate(columns);
    });

    return newtable;
  };

  React.useEffect(() => {
    getEmployeeDetails();
  }, []);

  const editEmployee = (values) => {
    const config = {
      method: "put",
      url: process.env.REACT_APP_API_URL + "/admin/editEmployee",
      data: {
        id: props.empId,
        name: values.employeeName,
        age: values.age,
        gender: values.gender,
        job: values.job,
        datehired: values.datehired,
      },
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    Axios(config)
      .then((response) => {
        if (response.data.status) {
          toast({
            title: "Sucess",
            description: response.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          getEmployeeDetails();
          addEmployeeModalOnClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxW="container.xxl" p="0">
      {/* <Header /> */}
      <Box p="10" overflow="auto" id="asdajsd">
        <DataTable
          columns={columnsstate}
          data={tabledata}
          tdborderX="1px"
          borderColor="#F5F6F7"
          shouldbordershow={"true"}
          loading={loading}
        />
      </Box>

      <Box p="10" overflow="auto" id="asdajsd">
        <DataTable
          columns={table2?.columns}
          data={table2?.table}
          tdborderX="1px"
          borderColor="#F5F6F7"
          shouldbordershow={"true"}
          topheader={topHeaderColspan}
          showtopheader={true}
        />
      </Box>

      <Modal isOpen={isAddEmployeeModalOpen} onClose={addEmployeeModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                employeeName: tabledata[0]?.name,
                age: tabledata[0]?.age,
                gender: tabledata[0]?.gender,
                job: tabledata[0]?.job,
                datehired: tabledata[0]?.DateHired,
              }}
              onSubmit={(values) => {
                // alert(JSON.stringify(values, null, 2));
                // storeEmployee(values);
                editEmployee(values);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    isInvalid={!!errors.employeeName && touched.employeeName}
                  >
                    <FormLabel mb="1" mt="4" fontSize={"xs"}>
                      Employee Name
                    </FormLabel>
                    <Field
                      as={Input}
                      // value={work}
                      type="text"
                      name="employeeName"
                      id="employeeName"
                      fontSize={"xs"}
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = "Please enter Employee Name";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage mt="1">
                      {errors.employeeName}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.age && touched.age}>
                    <FormLabel mb="1" mt="4" fontSize={"xs"}>
                      Enter Age
                    </FormLabel>
                    <Field
                      as={Input}
                      type="number"
                      name="age"
                      id="age"
                      fontSize={"xs"}
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = "Please enter Age";
                        }
                        return error;
                      }}
                      // onChange={(e) =>
                      //   // changedata(e.target.value)
                      //   setWork(e.target.value)
                      // }
                    />
                    <FormErrorMessage mt="1">{errors.age}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.gender && touched.gender}>
                    <FormLabel mb="1" mt="4" fontSize={"xs"}>
                      Add Gender
                    </FormLabel>
                    <Field
                      as="select"
                      style={customgenderselect}
                      name="gender"
                      id="gender"
                      fontSize={"xs"}
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = "Please provide a gender";
                        }
                        return error;
                      }}
                      // onChange={(e) =>
                      //   // changedata(e.target.value)
                      //   setWork(e.target.value)
                      // }
                    >
                      <option></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <FormErrorMessage mt="1">{errors.gender}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.job && touched.job}>
                    <FormLabel mb="1" mt="4" fontSize={"xs"}>
                      Job
                    </FormLabel>
                    <Field
                      as={Input}
                      // value={work}
                      type="text"
                      name="job"
                      id="job"
                      fontSize={"xs"}
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = "Please enter a Job";
                        }
                        return error;
                      }}
                      // onChange={(e) =>
                      //   // changedata(e.target.value)
                      //   setWork(e.target.value)
                      // }
                    />
                    <FormErrorMessage mt="1">{errors.job}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.datehired && touched.datehired}
                  >
                    <FormLabel mb="1" mt="4" fontSize={"xs"}>
                      Date of hiring
                    </FormLabel>
                    <Field
                      as={Input}
                      // value={work}
                      type="date"
                      name="datehired"
                      id="datehired"
                      fontSize={"xs"}
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = "Please enter date of hiring";
                        }
                        return error;
                      }}
                      // onChange={(e) =>
                      //   // changedata(e.target.value)
                      //   setWork(e.target.value)
                      // }
                    />
                    <FormErrorMessage mt="1">
                      {errors.datehired}
                    </FormErrorMessage>
                  </FormControl>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={addEmployeeModalOnClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="ghost"
                      type="submit"
                      // onClick={() => {
                      //   changedata(work, starttime, endTime);
                      // }}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

const customgenderselect = {
  padding: "8px 20px",
  border: "1px solid #CBD5E0",
  borderRadius: "8px",
  width: "150px",
};
const customPlus = {
  cursor: "pointer",
};

const tdstyle = {
  border: "2px solid #90DDAD",
  borderRadius: "10px 0 0px 10px",
  background: "#CBF9D9",
  padding: "2px 10px 10px",
  cursor: "grab",
  width: "150px",
};
const tdnone = {
  textAlign: "center",
  color: "gray",
};
