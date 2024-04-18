import * as React from 'react'
import { Button, Card, CardBody, Container, Grid, GridItem, Heading, Stack, Link, Box, useDisclosure } from "@chakra-ui/react";
import Axios from 'axios';
import { FaPlus, FaQuestionCircle } from "react-icons/fa";
import SearchBar from "../components/ManagePlans/SearchBar";
import BasicUsage from "../components/ModalContent/ModalContent";
import { DataTable } from "../common/dataTables";
import { createColumnHelper } from "@tanstack/react-table";
import { AiOutlineDelete } from "react-icons/ai"
import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import LoadSpinner from '../common/LoadSpinner.js';
import { Text } from '@chakra-ui/react'
import NewFormComponent from '../components/ManagePlans/NewFormComponent.js';
// import FirstLine from '../components/ManagePlans/firstLine.js';


export default function ManagePlans({ storyBookProps }) {
    const columnHelper = createColumnHelper();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const cancelRef = React.useRef()
    const [reportAndPlanArr, setReportAndPlan] = React.useState()
    const [modalData, setModalData] = React.useState({
        editmodalopened: false,
        data: storyBookProps?.shoulddatashow ? storyBookProps?.data : []
    })
    const [delId, setDeleteId] = React.useState("")
    const [loading, setLoading] = React.useState()
    const [isbuttonloading, setisbuttonloading] = React.useState(false)
    const [searchbarinput, setSearchBarinput] = React.useState("")
    const [filteredtable, setfilteredTable] = React.useState("")
    const [showNewFormComponent, setShowNewFormComponent] = React.useState(false)
    const newItemRef = React.useRef(null)
    let nameref = React.useRef(null)

    React.useEffect(() => {
        !storyBookProps?.shouldPlanModalOpen && setLoading(true)
        // !!storyBookProps?.shouldPlanModalOpen && 
        getAllRatesAndPlan()
        storyBookProps?.shouldDeleteModalShow && onOpenDelete();

        storyBookProps?.showWeekly2data && nameref?.current?.click();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (storyBookProps?.shouldPlanModalOpen) {
            newItemRef?.current?.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const plansaveref = React.useRef(null)
    storyBookProps?.isSaveButtonClicked && plansaveref?.current?.click()
    React.useEffect(() => {
        if (!isOpen && !isOpenDelete) {
            setModalData({
                ...modalData,
                data: storyBookProps?.shoulddatashow ? storyBookProps?.data : []
            }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isOpenDelete])

    const deleteplan = async (id1) => {
        setisbuttonloading(true)
        const id = reportAndPlanArr[+delId]._id
        const userToken = localStorage.getItem('userToken')
        const config = {
            method: 'delete',
            url: process.env.REACT_APP_API_URL + '/admin/deletePlanAndPackage',
            data: {
                id: id
            },
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': "Application/json"
            }
        }

        Axios(config).then((response) => {
            if (response.status) {
                getAllRatesAndPlan()
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    const departureColumns = [

        columnHelper.accessor("planName", {
            cell: (info) => <Link ref={nameref} onClick={async () => {
                let result = await new Promise((res, rej) => {
                    setModalData({
                        data: reportAndPlanArr[+info.row.id],
                        editmodalopened: true,
                    })
                    res("done")
                })
                if (result) {
                    onOpen()
                }
            }}
            >{info.getValue()}</Link>,
            header: "NAME",
        }),

        columnHelper.accessor("startdate", {
            cell: (info) => info.getValue(),
            header: "START DATE"
        }),

        columnHelper.accessor("enddate", {
            cell: (info) => info.getValue(),
            header: "END DATE",
            meta: {
                isNumeric: false
            }
        }),

        columnHelper.accessor("minLos", {
            cell: (info) => info.getValue(),
            header: "MIN LOS",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("maxLos", {
            cell: (info) => info.getValue(),
            header: "MAX LOS",
            meta: {
                isNumeric: false
            }
        }),

        columnHelper.accessor("lastMinuteBooking", {
            cell: (info) => info.getValue(),
            header: "LAST MINUTE BOOKING",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("selectedNumberOfWeeks", {
            cell: (info) => <Box display={'flex'}> {info.getValue().map((index, value) => (
                '<Text key={String(value)}>' + { index } + '</Text>'
            ))}</Box>,
            cell: (info) => info.getValue(),
            header: "DAYS OF WEEK",
            meta: {
                isNumeric: false
            }
        }),

        columnHelper.accessor("discountType", {
            cell: (info) => info.getValue(),
            header: "Discount Type",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("discountValue", {
            cell: (info) => info.getValue(),
            header: "Discount value",
            meta: {
                isNumeric: false
            }
        }),
        columnHelper.accessor("delete", {
            cell: (info) => <AiOutlineDelete onClick={() => { setDeleteId(info.row.id); onOpenDelete(); }} cursor='pointer' color="red" />,
            header: "Delete",
        }),
    ]


    const getAllRatesAndPlan = React.useCallback(async () => {

        const userToken = localStorage.getItem('userToken')
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/admin/getAllRatesAndPlans',
            params: [],
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }
        const response = await Axios(config)
        if (response.status) {
            setReportAndPlan(response?.data?.data)
            setLoading(false)
            setisbuttonloading(false)
            !storyBookProps?.shouldDeleteModalShow && onCloseDelete();
            !storyBookProps?.shouldPlanModalOpen && onClose()
            setSearchBarinput("")
            setfilteredTable(response?.data?.data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isOpenDelete])

    const setdatanullopenmodal = (cb) => {
        setModalData({
            ...modalData,
            data: storyBookProps?.shoulddatashow ? storyBookProps?.data : []
        }
        )
        cb()
    }

    React.useEffect(() => {
        let newArray = reportAndPlanArr?.filter((value) => {
            if (value.planName.includes(searchbarinput)) return value
        }
        )
        setfilteredTable(newArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchbarinput])

    return (
        <>
            {loading &&
                (<LoadSpinner isLoading={loading} />)}
            {!loading &&
                <>
                    {/* <Header /> */}
                    <Container maxW='container.xxl' backgroundColor="#ecf2f9">
                        <Grid templateColumns={'repeat(1,1fr)'} pt={'14'}>
                            {/* <FirstLine /> */}
                            <Stack direction='row' alignItems="center">
                                <Text fontSize='25px' as='b' >Rates and Availability / Rate Plans & Packages </Text>
                                <FaQuestionCircle style={infoIconText} />
                            </Stack>
                            <Text fontSize='11px' > You can create speacial rate plans and packages(such as discounted daily rates or service upsells) by clicking the NEW RATE PLAN button below. Rate plan and packages can be craeted for any time period or day of the week and with length of stay limitations, among other restrictions. </Text>
                            <Text fontSize='12px' as='b' marginTop={2}> Where can I use these rate plans?</Text>
                            <Stack direction='row' alignItems="center">
                                <Text fontSize='12px'> -NEW! OTAs/ Distribution Channels</Text><FaQuestionCircle fontSize='10' />
                            </Stack>
                            <Text fontSize='12px'>-Reservations booked on your property's website (via the booking engine)</Text>
                            <Text fontSize='12px'>-Manual reservations created in this system</Text>
                            <Stack gap="10px" marginY="20px" padding="15px" border="1px solid blue" borderRadius="10px" backgroundColor="#EBF0FF" >
                                <Text fontSize='12px'>Rate plan form fields marked with can be sent to select OTAs/channels once rate are mapped and if supported by the channel.</Text>
                                <Text fontSize='12px'>Click here to learn about channel rate plan mapping/syncing and which channels support this feature.</Text>
                            </Stack>
                            <GridItem pb={4}>
                                <Button background='#32c0a0' color='#fff' borderRadius='30px' fontSize="12px" onClick={() => {
                                    // setdatanullopenmodal(onOpen);
                                    setShowNewFormComponent(true);
                                }} ref={newItemRef}><FaPlus color="#fff" px={2} /> <span>NEW RATE PLAN</span>
                                </Button>
                            </GridItem>

                            {showNewFormComponent && <NewFormComponent onOpen={onOpen} setdatanullopenmodal={setdatanullopenmodal} />}
                            <GridItem overflow={"auto"}>
                                <Card borderTop='4px solid #3366ff' overflow={"auto"}>
                                    <CardBody minW="1200px">
                                        <Stack direction='row' spacing={1} style={mainContentSection}>
                                            <Heading size='md'>Rate Plan & Packages</Heading><FaQuestionCircle pt="6" style={infoIconText} />
                                        </Stack>
                                        <SearchBar setSearchBarinput={setSearchBarinput}
                                            searchbarinput={searchbarinput}
                                            reportAndPlanArr={reportAndPlanArr}
                                        />
                                        <BasicUsage isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={modalData.data} isbuttonloading={isbuttonloading} getAllRatesAndPlan={getAllRatesAndPlan} setisbuttonloading={setisbuttonloading} plansaveref={plansaveref} />
                                        <Box pt={'5'}>
                                            {filteredtable && <DataTable columns={departureColumns} data={filteredtable} pt='20px' searchBox={false} />}
                                        </Box>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </Grid>
                    </Container>
                    <AlertDialog
                        isOpen={isOpenDelete}
                        leastDestructiveRef={cancelRef}
                        onClose={onCloseDelete}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent mx="10px">
                                <AlertDialogHeader fontSize='lg' fontWeight='400'>
                                    {/* Delete */}
                                    Are you sure? You can't undo this action afterwards.
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onCloseDelete}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={deleteplan} ml={3} isLoading={isbuttonloading} loadingText='Deleting...' disabled={isbuttonloading}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
            }
        </>
    )
}

const infoIconText = {
    color: '#3366ff',
}
const mainContentSection = {
    alignItems: 'baseline'
}

