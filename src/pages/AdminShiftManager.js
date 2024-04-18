import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, useFormik } from "formik";
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Box,
  FormErrorMessage,
  useDisclosure,
  Input,
  Flex,
  Card,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// import Axios from "axios";
import Header from "../components/Header/Header";
import { DataTable } from "../common/dataTables";
import { createColumnHelper } from "@tanstack/react-table";
import EmployeeInfoModal from "../components/AdminShiftManager/EmployeeInfoModal";
import moment from "moment";

export default function AdminShiftManager({ storyBookProps }) {
  // ****************this is for add work/edit work modal*******************
  const { isOpen, onOpen, onClose } = useDisclosure();
const [buttonloading, setButtonLoading] = useState(false)
  // ************************This is for add employee modal  *************************
  const {
    isOpen: isAddEmployeeModalOpen,
    onOpen: addEmployeeModalOnOpen,
    onClose: addEmployeeModalOnClose,
  } = useDisclosure();

  const ShiftSaveButtonRef = React.useRef(null)
 
   storyBookProps?.shiftManagerModalSaveClickedWithEmptyField && ShiftSaveButtonRef?.current?.click();
 

  // ************************This is for a modal which displays employee info   *************************
  const {
    isOpen: employeeInfoIsOpen,
    onOpen: employeeInfoOnOpen,
    onClose: employeeInfoOnClose,
  } = useDisclosure();

  const [date, setDate] = useState("");
  const toast = useToast();
  const [tabledata2, setTabledata2] = useState([]);
  const [columndata2, setColumndata2] = useState([])


  const [tabledata, setTableData] = useState([{}]);
  const addemployeebuttonref=React.useRef(null);
  const [index, setIndex] = useState();
  const [starttime, setStarttime] = useState("09:00");
  const [endTime, setEndtime] = useState("05:00");
  const [work, setWork] = useState();
  const [loading, setloading] = useState(false);

const [initialValuesShiftModal, setinitialValuesShiftModal] = useState({
  formWork:"",
  formStarttime:"",
  formEndtime:""
})
  let employees = ["employee1", "employee2", "employee3", "employee4", "employee5"]
  const emptydata = employees.map((value, index) => {
    return {
      employeeName: value,
      monday: index%2==0?"+":{
        startTime:"09:00",
        endTime:"06:00",
        work:"Management"
      },
      tuesday: index % 2 == 0 ?  {
        startTime: "10:00",
        endTime: "07:00",
        work: "Security"
      }: "+", 
      wednesday: index % 2 == 0 ? "+" : {
        startTime: "09:00",
        endTime: "06:00",
        work: "Cooking"
      },
      thursday: index % 2 == 0 ? {
        startTime: "11:00",
        endTime: "08:00",
        work: "Cleaning"
      } : "+", 
      friday: index % 2 == 0 ? "+" : {
        startTime: "08:00",
        endTime: "06:00",
        work: "Maintenance"
      }, 
      saturday: index % 2 == 0 ? {
        startTime: "11:00",
        endTime: "08:00",
        work: "Accounting"
      } : "+",
      sunday: index % 2 == 0 ? "+" : {
        startTime: "11:00",
        endTime: "08:00",
        work: "Shopping"
      }  ,
    }
  })

  const emptydata2 = [...emptydata,{
    employeeName: 'employee6',
    monday: "+",
    tuesday: "+",
    wednesday: "+",
    thursday: "+",
    friday: "+",
    saturday: "+",
    sunday: "+"
  }]



  // const [isDateSet, setIsDateSet] = useState(false);
  const [num, setnum] = useState(0);

  const handlenextweek = () => {
    setloading(true)
    setnum(num + 7);
    fetchschedule();
    let days1 = {};
    days1[days?.monday] = "+";
    days1[days.tuesday] = "+";
    days1[days.wednesday] = "+";
    days1[days.thursday] = "+";
    days1[days.friday] = "+";
    days1[days.saturday] = "+";
    days1[days.sunday] = "+";

  };
  const handlePreviousWeek = () => {
    setloading(true);
    setnum(num - 7);
  };

  const setdata = (value) => {
    setIndex(value.row.index);
    setStarttime(value.getValue().startTime);
    setEndtime(value.getValue().endTime);
    setWork(value.getValue().work);
    setDate(days[value?.column?.id]);
  };

  const openmodal = async (value) => {
    setdata(value);
    onOpen();
    setinitialValuesShiftModal({
      formWork: value.getValue().work,
      formStarttime: value.getValue().startTime,
      formEndtime: value.getValue().endTime,
    });
  };

  // *******************************this code is for setting the header dates with weekday name  inside the table ********************
  // let weekday = new Date().toDateString().split(" ")[0];

  let [days, setDays] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  // let [datestate, setDateState] = useState({})
  let [datestate, setDateState] = useState({
    todaydate: moment().add(num, "days").format("l"),

    nextDay: moment()
      .add(num + 1, "days")
      .format("l"),

    next2ndDay: moment()
      .add(num + 2, "days")
      .format("l"),

    next3rdDay: moment()
      .add(num + 3, "days")
      .format("l"),

    next4thDay: moment()
      .add(num + 4, "days")
      .format("l"),
    next5thDay: moment()
      .add(num + 5, "days")
      .format("l"),
    next6thDay: moment()
      .add(num + 6, "days")
      .format("l"),
    previousDay: moment()
      .add(num - 1, "days")
      .format("l"),
    previous2ndDay: moment()
      .add(num - 2, "days")
      .format("l"),
    previous3rdDay: moment()
      .add(num - 3, "days")
      .format("l"),
    previous4thDay: moment()
      .add(num - 4, "days")
      .format("l"),
    previous5thDay: moment()
      .add(num - 5, "days")
      .format("l"),
    previous6thDay: moment()
      .add(num - 6, "days")
      .format("l"),
  });

  useEffect(() => {
    setDateState({
      todaydate: moment().add(num, "days").format("l"),
      nextDay: moment()
        .add(num + 1, "days")
        .format("l"),
      next2ndDay: moment()
        .add(num + 2, "days")
        .format("l"),
      next3rdDay: moment()
        .add(num + 3, "days")
        .format("l"),
      next4thDay: moment()
        .add(num + 4, "days")
        .format("l"),
      next5thDay: moment()
        .add(num + 5, "days")
        .format("l"),
      next6thDay: moment()
        .add(num + 6, "days")
        .format("l"),
      previousDay: moment()
        .add(num - 1, "days")
        .format("l"),
      previous2ndDay: moment()
        .add(num - 2, "days")
        .format("l"),
      previous3rdDay: moment()
        .add(num - 3, "days")
        .format("l"),
      previous4thDay: moment()
        .add(num - 4, "days")
        .format("l"),
      previous5thDay: moment()
        .add(num - 5, "days")
        .format("l"),
      previous6thDay: moment()
        .add(num - 6, "days")
        .format("l"),
    });
  }, [num, storyBookProps?.dontRunApis===false]);


  useEffect(()=>{
    fetchschedule(days);
  }, [days, storyBookProps?.dontRunApis===false])

 useEffect(()=>{
    let d = new Date();
    let day = new Date(d.setDate(d.getDate() + num)).getDay();
    switch (day) {
      case 1:
        {
          setDays({
            monday: datestate?.todaydate,
            tuesday: datestate?.nextDay,
            wednesday: datestate?.next2ndDay,
            thursday: datestate?.next3rdDay,
            friday: datestate?.next4thDay,
            saturday: datestate?.next5thDay,
            sunday: datestate?.next6thDay,
          });
        }
        break;
      case 2:
        {
          setDays({
            monday: datestate?.previousDay,
            tuesday: datestate?.todaydate,
            wednesday: datestate?.nextDay,
            thursday: datestate?.next2ndDay,
            friday: datestate?.next3rdDay,
            saturday: datestate?.next4thDay,
            sunday: datestate?.next5thDay,
          });
        }
        break;
      case 3:
        {
          setDays({
            monday: datestate?.previous2ndDay,
            tuesday: datestate?.previousDay,
            wednesday: datestate?.todaydate,
            thursday: datestate?.nextDay,
            friday: datestate?.next2ndDay,
            saturday: datestate?.next3rdDay,
            sunday: datestate?.next4thDay,
          });
        }
        break;

      case 4:
        {
          setDays({
            monday: datestate?.previous3rdDay,
            tuesday: datestate?.previous2ndDay,
            wednesday: datestate?.previousDay,
            thursday: datestate?.todaydate,
            friday: datestate?.nextDay,
            saturday: datestate?.next2ndDay,
            sunday: datestate?.next3rdDay,
          });
        }
        break;
      case 5:
        {
          setDays({
            monday: datestate?.previous4thDay,
            tuesday: datestate?.previous3rdDay,
            wednesday: datestate?.previous2ndDay,
            thursday: datestate?.previousDay,
            friday: datestate?.todaydate,
            saturday: datestate?.nextDay,
            sunday: datestate?.next2ndDay,
          });
        }
        break;
      case 6:
        {
          setDays({
            monday: datestate?.previous5thDay,
            tuesday: datestate?.previous4thDay,
            wednesday: datestate?.previous3rdDay,
            thursday: datestate?.previous2ndDay,
            friday: datestate?.previousDay,
            saturday: datestate?.todaydate,
            sunday: datestate?.nextDay,
          });
        }
        break;
      case 7:
        {
          setDays({
            monday: datestate?.previous6thDay,
            tuesday: datestate?.previous5thDay,
            wednesday: datestate?.previous4thDay,
            thursday: datestate?.previous3rdDay,
            friday: datestate?.previous2ndDay,
            saturday: datestate?.previousDay,
            sunday: datestate?.todaydate,
          });
        }
        break;
      default: {
        setDays({
          monday: datestate?.todaydate,
          tuesday: datestate?.nextDay,
          wednesday: datestate?.next2ndDay,
          thursday: datestate?.next3rdDay,
          friday: datestate?.next4thDay,
          saturday: datestate?.next5thDay,
          sunday: datestate?.next6thDay,
        });
      }
    }

 }, [datestate, !storyBookProps?.dontRunApis])

  const columnHelper = createColumnHelper();

  const previousWeekcolumns =[
    columnHelper.accessor("employeeName", {
      cell: (info) => <p style={customEmployeeName}>{info?.getValue()}</p>,
      header: "Employee Name",
    }),
    columnHelper.accessor("monday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/3/2023 Monday",
    }),
    columnHelper.accessor("tuesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/4/2023 Tuesday",
    }),
    columnHelper.accessor("wednesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/5/2023 Wednesday",
    }),
    columnHelper.accessor("thursday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/6/2023 Thursday",
    }),
    columnHelper.accessor("friday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/7/2023 Friday",
    }),
    columnHelper.accessor("saturday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/8/2023 Saturday",
    }),
    columnHelper.accessor("sunday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/9/2023 Sunday",
    }),
  ]

  const nextWeekColumns = [
    columnHelper.accessor("employeeName", {
      cell: (info) => <p style={customEmployeeName}>{info?.getValue()}</p>,
      header: "Employee Name",
    }),
    columnHelper.accessor("monday", {
      cell: (info) =>
       <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/17/2023 Monday",
    }),
    columnHelper.accessor("tuesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/18/2023 Tuesday",
    }),
    columnHelper.accessor("wednesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/19/2023 Wednesday",
    }),
    columnHelper.accessor("thursday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/20/2023 Thursday",
    }),
    columnHelper.accessor("friday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/21/2023 Friday",
    }),
    columnHelper.accessor("saturday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/22/2023 Saturday",
    }),
    columnHelper.accessor("sunday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/23/2023 Sunday",
    }),
  ]

  const emptyColumns = [
    columnHelper.accessor("employeeName", {
      cell: (info) => 
      <p style={customEmployeeName}>{info?.getValue()}</p>,
      header: "Employee Name",
    }),
    columnHelper.accessor("monday", {
      cell: (info) => 
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/10/2023 Monday",
    }),
    columnHelper.accessor("tuesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/11/2023 Tuesday",
    }),
    columnHelper.accessor("wednesday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/12/2023 Wednesday",
    }),
    columnHelper.accessor("thursday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/13/2023 Thursday",
    }),
    columnHelper.accessor("friday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/14/2023 Friday",
    }),
    columnHelper.accessor("saturday", {
      cell: (info) =>
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
            <span
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                  }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>,
      header: "7/15/2023 Saturday",
    }),
    columnHelper.accessor("sunday", {
    cell:  (info) => 
        <Box position="relative" style={info?.getValue() === "+" ? tdnone : tdstyle}>
          {info?.getValue() === "+" ? (
          <span
            style={customPlus}
            cursor="pointer"
          >
            +
          </span>
        ) : (
          <>
            <span>
              <DeleteIcon
                style={closeIconStyle}
              />
            </span>
            <span>
              <EditIcon
                style={editIconStyle}
              />
            </span>
            <p>
              {`${info?.getValue()?.startTime} - ${info?.getValue()?.endTime
                }`}
            </p>
            <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
          </>
        )}
        </Box>,
      header: "7/16/2023 Sunday",
    }),
  ]
  // let employees = ["employee1","employee2","employee3","employee4","employee5"]
  // const emptydata = employees.map((value,index)=>{
  //   return {
  //     employeeName:value,
  //     monday:"+",
  //     tuesday:"+",
  //     wednesday:"+",
  //     thursday:"+",
  //     friday:"+",
  //     saturday:"+",
  //     sunday: "+"
  //   }
  // })

  const columns = [
    columnHelper.accessor("employeeName", {
      cell: (info) => info?.getValue(),
      header: "Employee Name",
      id: "employeeName",
    }),

    columnHelper.accessor(String(days.monday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days?.monday} {moment(days?.monday).format("dddd")}
        </>
      ),
      id: "monday",
    }),
    columnHelper.accessor(String(days.tuesday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.tuesday} {moment(days.tuesday).format("dddd")}
        </>
      ),
      id: "tuesday",
    }),
    columnHelper.accessor(String(days.wednesday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.wednesday} {moment(days.wednesday).format("dddd")}
        </>
      ),
      id: "wednesday",
    }),
    columnHelper.accessor(String(days.thursday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.thursday} {moment(days.thursday).format("dddd")}
        </>
      ),
      id: "thursday",
    }),
    columnHelper.accessor(String(days.friday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.friday} {moment(days.friday).format("dddd")}
        </>
      ),
      id: "friday",
    }),
    columnHelper.accessor(String(days.saturday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.saturday} {moment(days.saturday).format("dddd")}
        </>
      ),
      id: "saturday",
    }),
    columnHelper.accessor(String(days.sunday), {
      cell: (info) => (
        <Box
          position="relative"
          draggable
          onDragStart={(e) => {
            setdata(info);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            e.preventDefault();

            ondropfunction(
              info.row.index,
              days[info?.column?.id],
              starttime,
              endTime,
              work,
              index,
              date
            );
          }}
          style={info?.getValue() === "+" ? tdnone : tdstyle}
        >
          {info?.getValue() === "+" ? (
            <span
              onClick={() => {
                openmodal(info);
              }}
              style={customPlus}
              cursor="pointer"
            >
              +
            </span>
          ) : (
            <>
              <span>
                <DeleteIcon
                  style={closeIconStyle}
                  onClick={() => {
                    rundeletecell(info.row.index, days[info?.column?.id]);
                  }}
                />
              </span>
              <span>
                <EditIcon
                  style={editIconStyle}
                  onClick={() => {
                    openmodal(info);
                  }}
                />
              </span>
              <p>
                {`${info?.getValue()?.startTime} - ${
                  info?.getValue()?.endTime
                }`}
              </p>
              <p style={{ fontWeight: "500" }}>{info?.getValue()?.work}</p>{" "}
            </>
          )}
        </Box>
      ),
      header: (
        <>
          {days.sunday} {moment(days.sunday).format("dddd")}
        </>
      ),
      id: "sunday",
    }),
  ];

  function rundeletecell(index2, column2) {
    setTableData(
      tabledata.map((item, index1) => {
        if (index1 === index2) {
          return {
            ...item,
            [column2]: "+",
          };
        } else {
          return item;
        }
      })
    );
  }

  const ondropfunction = async (
    droppedindex,
    droppedcolumn,
    startTime1,
    endTime1,
    work1,
    draggedIndex,
    draggedColumn
  ) => {
    setTableData(
      tabledata.map((item, index) => {
        if (index === droppedindex) {
          if (
            draggedColumn === droppedcolumn ||
            draggedIndex === droppedindex
          ) {
            return {
              ...item,
              [draggedColumn]: "+",
              [droppedcolumn]: {
                startTime: startTime1,
                endTime: endTime1,
                work: work1,
              },
            };
          }
          return {
            ...item,
            [droppedcolumn]: {
              startTime: startTime1,
              endTime: endTime1,
              work: work1,
            },
          };
        }

        if (index === draggedIndex) {
          return {
            ...item,
            [draggedColumn]: "+",
          };
        }

        return item;
      })
    );
  };

  function changedata(work1, starttime1, endTime1, date) {
  
    setTableData(
      tabledata.map((item, index1) => {
        if (index1 === index) {
          return {
            ...item,
            [date]: {
              startTime: starttime1,
              endTime: endTime1,
              work: work1,
            },
          };
        } else {
          return item;
        }
      })
    );
    onClose();
  }

  const runstorefunction = () => {
 
    let datatosend = [];
    tabledata.map((value) => {
  
      let data = {
        [days?.monday]: value?.[days?.monday],
        [days?.tuesday]: value?.[days?.tuesday],
        [days?.wednesday]: value?.[days?.wednesday],
        [days?.thursday]: value?.[days?.thursday],
        [days?.friday]: value?.[days?.friday],
        [days?.saturday]: value?.[days?.saturday],
        [days?.sunday]: value?.[days?.sunday],
        _id: value._id,
      };
      datatosend.push(data);
    });

    const userToken = localStorage.getItem("userToken");
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/admin/createschedule",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
        // Add more headers as needed
      },
      data: {
        datatosend,
        days,
      },
    })
      .then((response) => {
        toast({
          title: `data updated successfully`,
          status: "success",
          isClosable: true,
          duration: 2000,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  
  React.useEffect(() => {
    setloading(true);
    storyBookProps?.isAddEmployeeOpen && addEmployeeModalOnOpen();
    storyBookProps?.SaveSchedulebuttonClicked && toast({
      title: `data updated successfully`,
      status: "success",
      isClosable: true,
    });
      storyBookProps?.showAddWork && onOpen();
      storyBookProps?.shouldShiftModalInputsBeFilled&&setinitialValuesShiftModal({
        formWork: storyBookProps?.shiftModalProps?.work,
        formStarttime: storyBookProps?.shiftModalProps?.startTime,
        formEndtime: storyBookProps?.shiftModalProps?.endTime,
      });

    if(storyBookProps?.emptytable) {
      setTabledata2(emptydata);
      setColumndata2(emptyColumns)
    }

    if(storyBookProps?.showEmptydata2) {
      setTabledata2(emptydata2);
      setColumndata2(emptyColumns)  
    } 
    
    if(storyBookProps?.shownextWeekcolumns) {
      setTabledata2(emptydata2)  
      setColumndata2(nextWeekColumns)
    } 

    if(storyBookProps?.showpreviousWeekcolumns ) {
      setTabledata2(emptydata2)
      setColumndata2(previousWeekcolumns)
    }

    if (storyBookProps?.showOnlyOneTableData) {
      setColumndata2(emptyColumns)
      setTabledata2([...emptydata, {
        employeeName: 'employee6',
        monday: "+",
        tuesday: "+",
        wednesday: "+",
        thursday: "+",
        friday: "+",
        saturday: "+",
        sunday: storyBookProps?.dataProps==="+"?"+":{
          startTime: storyBookProps?.dataProps?.startTime,
          endTime: storyBookProps?.dataProps?.endTime,
          work: storyBookProps?.dataProps?.work
        }
      }])
    }
    storyBookProps?.employeeFolioOpen && employeeInfoOnOpen()
  }, []);

    storyBookProps?.addemployeeEmptySubmit && addemployeebuttonref?.current?.click()




  const fetchschedule = (value) => {
    const userToken = localStorage.getItem("userToken");
  
    if (value?.monday) {
      axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/admin/getSchedule",
        params: value,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Header": "*",
        },
      })
        .then((response) => {
          setTableData(prepareData(response?.data?.data?.datatosend));
          setloading(false);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
  };

  const [empId, setEmpId] = React.useState("");
  const handleEmployeeInfoModal = (value) => {
    setEmpId(value);
    employeeInfoOnOpen();
  };
  const prepareData = (value) => {
    let newvalue = [];

    value.forEach((item) => {
      let data = {
        [days?.monday]: item[days?.monday],
        [days.tuesday]: item[days.tuesday],
        [days.wednesday]: item[days.wednesday],
        [days.thursday]: item[days.thursday],
        [days.friday]: item[days.friday],
        [days.saturday]: item[days.saturday],
        [days.sunday]: item[days.sunday],
      };

      data["employeeName"] = (
        <p
          style={customEmployeeName}
          onClick={() => {
            handleEmployeeInfoModal(item.employeeType._id);
          }}
        >
          {item.employeeType.name}
        </p>
      );
      data["employeeId"] = item.employeeType._id;
      data["_id"] = item["_id"];
      newvalue.push(data);
    });

    return newvalue;
  };

  const storeEmployee = (values) => {
    const data = {
      employeedata: {
        name: values.employeeName,
        age: values.age,
        gender: values.gender,
        job: values.job,
        datehired: values.datehired,
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/addEmployee`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then(function (response) {
  
        fetchschedule(days);
        addEmployeeModalOnClose();
        setButtonLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container maxW="container.xxl" p="0">
      {/* <Header /> */}
      <Card
        display={"flex"}
        flexDirection={"row"}
        m={{ base: "5", sm: "10" }}
        p="5"
        justifyContent={{ base: "space-around", sm: "right" }}
        gap="5"
        borderTop="5px solid #3366ff"
        // fontSize={{ base:"xs" }}
      >
        <Button
          colorScheme="blue"
          onClick={() => {
            // runstorefunction();
            addEmployeeModalOnOpen();
          }}
          fontSize={{ base: "14px", md: "18px" }}
        >
          Add Employee
        </Button>

        <Button
          colorScheme="blue"
          onClick={() => {
            runstorefunction();
          }}
          fontSize={{ base: "14px", md: "18px" }}
        >
          Save Schedule
        </Button>
      </Card>
      <Card
        // m="10"
        p="5"
        m={{ base: "5", sm: "10" }}
        overflow="auto"
        id="asdajsd"
        // borderTop="5px solid #3366ff"
      >
        {
        storyBookProps?.emptytable ? <DataTable
            columns={columndata2}
            data={tabledata2}
            tdborderX="1px"
            borderColor="#F5F6F7"
            shouldbordershow={"true"}
        />
        :
        <DataTable
          columns={columns}
          data={tabledata}
          tdborderX="1px"
          borderColor="#F5F6F7"
          shouldbordershow={"true"}
          loading={loading}
        />}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Shift Manager</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={initialValuesShiftModal}
                onSubmit={(values) => {
                  // alert(JSON.stringify(values, null, 2));
                  changedata(
                    values.formWork,
                    values.formStarttime,
                    values.formEndtime,
                    date
                  );
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isInvalid={!!errors.formWork && touched.formWork}
                    >
                      <FormLabel pb="1" pt="2" fontSize={"xs"}>
                        Change Work Assigned/Assign Work
                      </FormLabel>
                      <Field
                        as={Input}
                        // value={work}
                        type="text"
                        name="formWork"
                        id="formWork"
                        fontSize={"xs"}
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please enter a work";
                          }
                          return error;
                        }}
                        // onChange={(e) =>
                        //   // changedata(e.target.value)
                        //   setWork(e.target.value)
                        // }
                      />
                      <FormErrorMessage>{errors.formWork}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.formStarttime && touched.formStarttime
                      }
                    >
                      <FormLabel pb="1" pt="2" fontSize={"xs"}>
                        Add Start Time
                      </FormLabel>
                      <Field
                        as={Input}
                        type="time"
                        name="formStarttime"
                        id="formStarttime"
                        fontSize={"xs"}
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please enter a starting Time";
                          }
                          return error;
                        }}
                        // onChange={(e) =>
                        //   // changedata(e.target.value)
                        //   console.log(e.target.value,"asdh")
                        // }
                      />
                      <FormErrorMessage>
                        {errors.formStarttime}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.formEndtime && touched.formEndtime}
                    >
                      <FormLabel pb="1" pt="2" fontSize={"xs"}>
                        Add End Time
                      </FormLabel>
                      <Field
                        as={Input}
                        type="time"
                        name="formEndtime"
                        id="formEndtime"
                        fontSize={"xs"}
                        validate={(value) => {
                          let error;
                          if (!value) {
                            error = "Please enter a ending Time";
                          }
                          return error;
                        }}
                        // onChange={(e) =>
                        //   // changedata(e.target.value)
                        //   setWork(e.target.value)
                        // }
                      />
                      <FormErrorMessage>{errors.formEndtime}</FormErrorMessage>
                    </FormControl>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="ghost"
                        type="submit"
                        ref={ShiftSaveButtonRef}
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

        <Modal
          isOpen={isAddEmployeeModalOpen}
          onClose={addEmployeeModalOnClose}
          size={{ base: "100px", sm: "sm", md: "md" }}
        >
          <ModalOverlay />
          <ModalContent borderTop="5px solid #3366ff">
            <ModalHeader>Employee Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  employeeName: storyBookProps?.storydata?.name ? storyBookProps?.storydata?.name :"",
                  age: storyBookProps?.storydata?.age ? storyBookProps?.storydata?.age:"",
                  gender: storyBookProps?.storydata?.gender ? storyBookProps?.storydata?.gender:"",
                  job: storyBookProps?.storydata?.job ? storyBookProps?.storydata?.job:"",
                  datehired: storyBookProps?.storydata?.Dateofhiring ? storyBookProps?.storydata?.Dateofhiring :"",
                }}
                onSubmit={(values) => {
                  setButtonLoading(true)
                  storeEmployee(values);
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
                        // onChange={(e) =>
                        //   // changedata(e.target.value)
                        //   setWork(e.target.value)
                        // }
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
                      <FormErrorMessage mt="1">
                        {errors.gender}
                      </FormErrorMessage>
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
                        type="submit"
                        colorScheme="green"
                        variant="outline"
                        ref={addemployeebuttonref}
                        disabled={buttonloading}
                        isLoading={buttonloading}
                        loadingText='Saving'
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

        <Modal
          onClose={employeeInfoOnClose}
          size={"xl"}
          isOpen={employeeInfoIsOpen}
          mx="10"
        >
          <ModalOverlay />
          <ModalContent borderTop="5px solid #3366ff">
            <ModalHeader>Employee Folio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EmployeeInfoModal empId={empId} monday={days.monday} storybook={storyBookProps}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={employeeInfoOnClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
      <Card
        justifyContent="space-between"
        // borderTop="5px solid #3366ff"
        display="flex"
        flexDirection="row"
        p="5"
        m={{ base: "5", sm: "10" }}
      >
        <Button
          onClick={handlePreviousWeek}
          colorScheme="teal"
          variant="outline"
          fontSize={{ base: "14px", md: "18px" }}
        >
          Previous week
        </Button>
        <Button
          onClick={handlenextweek}
          colorScheme="teal"
          variant="outline"
          fontSize={{ base: "14px", md: "18px" }}
        >
          Next Week
        </Button>
      </Card>
    </Container>
  );
}

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

const closeIconStyle = {
  fontSize: "12px ",
  position: "absolute ",
  right: "1px",
  top: "5px",
  color: "red",
  cursor: "pointer ",
  zIndex: 99,
};

const editIconStyle = {
  fontSize: "12px ",
  position: "absolute ",
  right: "18px",
  top: "5px",
  color: "blue",
  cursor: "pointer ",
  zIndex: 99,
};

const customPlus = {
  cursor: "pointer",
};

const customgenderselect = {
  padding: "8px 20px",
  border: "1px solid #CBD5E0",
  borderRadius: "8px",
  width: "150px",
};

const customEmployeeName = {
  textDecoration: "underline",
  color: "deepskyblue",
  cursor: "pointer",
  width: "120px",
};

const todayday = {
  background: "lightblue",
  color: "white",
  padding: "5px",
};
