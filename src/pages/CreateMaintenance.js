import * as React from "react";
import {
  Container,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Select,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Axios from "axios";
import Header from "../components/Header/Header";
import LoadSpinner from "../common/LoadSpinner.js";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function CreateMaintenance() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm();


  const toast = useToast();
  const variant = ["solid", "error", "left-accent", "top-accent"];
  const statuses = ["error", "success"];
  const [propertiesDetails, setPropertiesDetails] = React.useState([]);
  const [selectedProperties, setSelectedProperty] = React.useState("");
  const [selectedRoomType, setSelectedRoomType] = React.useState("");
  const [roomsNumber, setRoomsNumber] = React.useState([]);
  const [roomArr, setRoomArr] = React.useState([]);
  const [roomsInMaintenance, setRoomInMaintenance] = React.useState([]);
  const [roomsType, setRoomTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isRoomNumberLoading, setIsRoomNumberLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    getAllProperties();
    getRoomsType();
  }, []);

  async function getAllProperties() {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getAllProperties",
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setPropertiesDetails(response.data.data);
    }
  }
  async function getRoomsType() {
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getRoomsType",
      params: {},
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response.status) {
      setRoomTypes(response.data.data);
    }
    setLoading(false);
  }
  function handleRoomType(event) {
    setIsRoomNumberLoading(true);
    setSelectedRoomType(event);
    getRoomNumberById(event);
  }
  const onSubmit = async (data) => {
    // event.preventDefault();
    const userToken = localStorage.getItem('userToken')
    let formData = {
      'propertyId': data.selectProperty,
      'roomTypeId': data.roomtype,
      'roomNumber': data.roomNumber,
      // 'createdAt': new Date().toISOString().split('T')[0],
    }
    const config = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + '/admin/createMaintenance',
      params: formData,
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Header': '*',
      }
    }
    const response = await Axios(config);
    if (response.status) {

      toast({
        position: 'top',
        title: response.data.message,
        variant: variant,
        status: statuses[1],
        duration: 1000,
        isClosable: true,
        containerStyle: {
          width: '400px',
          maxWidth: '100%',
        },
      })
      // window.location.href = '/admin/mangeMaintenance';
      navigate('/admin/mangeMaintenance');
    } else {
      toast({
        position: 'top',
        title: response.data.message,
        variant: variant,
        status: statuses[0],
        duration: 1000,
        isClosable: true,
        containerStyle: {
          width: '400px',
          maxWidth: '100%',
        },
      })
    }
  };
  async function getRoomNumberById(event) {
    const params = { roomTypeId: event };
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "/admin/getRoomsTypeByTypeId",
      params: params,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    };
    const response = await Axios(config);
    if (response?.data.status) {
      const { checkMaintenance, roomDetails } = response.data?.data;
      setRoomInMaintenance(checkMaintenance);

      let room = [];
      Array.apply(null, { length: roomDetails?.totalNumberOfRooms }).map(
        (value, index) => {
          room.push(index + 1);
        }
      );

      setRoomArr([...room]);
      // setGetRoomsTypeById()
      setIsRoomNumberLoading(false);
    }
  }



  const checkIfRoomIsInMaintenanceMode = (index) => {
    return roomsInMaintenance.some((room) => room.roomNumber == index + 1);
  };
  return (
    <Container maxW="container.xxl" p="0">
      {/* <Header /> */}

      {
        <Stack>
          <Grid templateColumns="repeat(1,1fr)">
            <GridItem w="100%" py={10} px={10}>
              <Heading size="lg" fontWeight="700">
                Create Maintenance
              </Heading>
            </GridItem>
            <GridItem>
              <Card variant={"outline"} my={4}>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      px="5"
                      py="5"
                      templateColumns="repeat(3 , 1fr)"
                      gap={6}
                    >
                      <GridItem>
                        <FormControl>
                          <FormLabel ml="2" fontSize={"xs"}>
                            Property
                          </FormLabel>
                          <Select
                            icon={loading ? <Spinner /> : ""}
                            placeholder="Select Properties"
                            fontSize={"sm"}
                            {...register("selectProperty", { required: true })}
                          >
                            {propertiesDetails?.map((value, index) => (
                              <option value={value?.id} key={index}>
                                {value?.propertyName}
                              </option>
                            ))}
                          </Select>
                          {errors.selectProperty && (
                            <Text color="red" fontSize="xs">
                              Please select a property
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel ml="2" fontSize={"xs"}>
                            Rooms Type
                          </FormLabel>
                          <Select
                            icon={loading ? <Spinner /> : ""}
                            placeholder="Select Rooms Type"

                            name="firstname"

                            fontSize={"sm"}
                            {...register("roomtype", {
                              required: true
                            })}
                            onChange={(e) => { handleRoomType(e.target.value) }}
                          >

                            {roomsType?.map((value, index) => (
                              <option value={value?._id} key={index}>
                                {value?.roomType}
                              </option>
                            ))}
                          </Select>
                          {errors.roomtype && (
                            <Text color="red" fontSize="xs">
                              Please select a roomType
                            </Text>
                          )}

                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel ml="2" fontSize={"xs"}>
                            Room Number
                          </FormLabel>
                          <Select
                            Select
                            icon={isRoomNumberLoading ? <Spinner /> : ""}
                            placeholder="Select Room Number"
                            fontSize={"sm"}
                            // onChange = {
                            //     (e) => setRoomsNumber(e.target.value)
                            // }
                            {...register("roomNumber", { required: true })}
                          >
                            {roomArr?.map((value, index) => (
                              <option
                                value={index}
                                key={index}
                                disabled={checkIfRoomIsInMaintenanceMode(index)}
                              >
                                {value}
                                {checkIfRoomIsInMaintenanceMode(index) && (
                                  <Text fontSize={"xs"} color={"red"}>
                                    {" "}
                                    Room in Maintenance mode
                                  </Text>
                                )}
                              </option>
                            ))}
                          </Select>
                          {errors.roomNumber && (
                            <Text color="red" fontSize="xs">
                              Please select a roomNumber
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem
                        display={"flex"}
                        alignItems="end"
                        w="100%"
                        colSpan={3}
                        pt="5"
                      >
                        <FormControl textAlign={"end"}>
                          <Button
                            bg="#2879ff"
                            fontSize={"xs"}
                            color={"white"}
                            fontWeight="600"
                            borderColor="#2879ff"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Create Maintenance
                          </Button>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </Stack>
      }
    </Container>
  );
}
