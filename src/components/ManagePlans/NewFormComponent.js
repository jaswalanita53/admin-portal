import React, { useState } from 'react'
import { Button, Card, CardBody, Container, GridItem, Heading, Text, Radio, Stack, Box, useDisclosure } from "@chakra-ui/react";
import { Input, Select, Flex } from '@chakra-ui/react'
import { FaPlus, FaQuestionCircle } from "react-icons/fa";
import "./NewFormComponent.module.css"
import Ckeditor from './Ckeditor';
import IntervalTable from './IntervalTable';
import { ModalClick } from './ModalClick';

const NewFormComponent = ({ onOpen, setdatanullopenmodal }) => {
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
    const [isSave,setIsSave]=useState(false)
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        ratePlanNamePublic: "",
        ratePlanNamePublicSelect: "",
        ratePlanNamePrivate: "",
        ratePlanNamePrivateSelect: "",
    })

    console.log("formdata", formData)

    const [formError, setFormError] = useState({
        ratePlanNamePublicError: "",
        ratePlanNamePublicSelectError: "",
        ratePlanNamePrivateError: "",
        ratePlanNamePrivateSelectError: "",
    })

    const ckeditorinfo = {
        "info1": "What does the package include? E.g. Breakfast, shuttle, etc",
        "info2": "POLICIES"
    }

    const checkForm = () => {
        if (formData.ratePlanNamePublic === "") {
            console.log("hello")
            setFormError({
                ...formError,
                ratePlanNamePublicError: "Rate Plan Public Name is required.",
            })
        }
        if (formData.ratePlanNamePrivate === "") {
            setFormError({
                ...formError,
                ratePlanNamePrivateError: "Rate Plan Private Name is required."
            })
        }
    }

    return (

        <GridItem overflow={"auto"} marginBottom="10px">
            <Card borderTop='4px solid #3366ff' overflow={"auto"}>
                <CardBody >
                    <Container maxW='100%' display="flex" gap="25px" flexDirection="column">
                        <Heading textTransform={"uppercase"} as='h5' size='sm' >create new rate plan</Heading>
                        <Stack direction={'row'} maxWidth="100%">
                            <Stack minWidth="50%">
                                <FaQuestionCircle fontSize='10' /><Text fontSize='10px' as='b' marginTop={2} >Rate Plan Name (Public)</Text>
                                <Flex gap="2">
                                    <Box width="70%">
                                        <Input placeholder='Rate Plan Name (Public)' border="0" onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                "ratePlanNamePublic": e.target.value
                                            })
                                        }} />
                                        <Text color="red" fontSize="10px" marginTop="2px">{formError.ratePlanNamePublicError}</Text>
                                    </Box>
                                    <Select placeholder='Select option' width="30%" onChange={(e) => {
                                        console.log(e.target.value)
                                    }}>
                                        <option value='English'>English</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </Flex>
                            </Stack>
                            <Stack minWidth="50%">
                                <FaQuestionCircle fontSize='10' /> <Text fontSize='10px' as='b' marginTop={2} >Rate Plan Name (Private)</Text>
                                <Flex gap="2">
                                    <Box width="70%">
                                        <Input placeholder='Rate Plan Name (Private)' border="0" onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                "ratePlanNamePrivate": e.target.value
                                            })
                                        }}
                                        />
                                        <Text color="red" fontSize="10px" marginTop="2px">{formError.ratePlanNamePrivateError}</Text>
                                    </Box>
                                    <Select placeholder='Select option' width="30%">
                                        <option value='English'>English</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </Flex>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems="center" >
                            <Text fontSize='10px' as='b' >Is this a derived rate plan?</Text>
                            <Radio value='1' >Yes</Radio>
                            <Radio value='2' fontSize='10px'>No</Radio>
                        </Stack>
                        <Stack direction={'row'} alignItems="center">
                            <Text fontSize='10px' as='b'>Promotion code?</Text>
                            <Radio value='1' fontSize='10px'>Yes</Radio>
                            <Radio value='2' fontSize='10px'>No</Radio>
                        </Stack>
                        <Text fontSize='10px' as='b' >For the Booking Engine Only: Unless a promotion code is set, all rate plans and packages will be visible to all prospective guests,in addition to your bas rates.</Text>
                        <Heading size='xs' fontWeight='500' fontSize={13} >Do you have any add-ons included in this rate plan/package?</Heading>
                        <Select placeholder='Nothing selected' size='xs' backgroundColor={'lightgrey'} border='0' width={500} />

                        <Box>
                            <Heading size='xs' fontWeight='500' fontSize={13} marginBottom="1">Which sources is the rate plan available for?</Heading>
                            <Flex flexDirection="column" gap="2">
                                <Text fontSize={12}>Source selection only applies to reservations created manually in this system or booked via the Cloudbeds Booking Engine. Selecting an OTA in this dropdown only allows you to manually create new reservations with this rate plan.</Text>
                                <Text fontSize={12}> To display this rate plan on your Cloudbeds Booking Engine, you must select website / Booking Engine from the dropdown.</Text>
                                <Select placeholder='17 of 17 selected' size='xs' backgroundColor={'lightgrey'} border='0' width={500} />
                            </Flex>
                        </Box>
                        <Flex flexDirection="column" gap="1">
                            <Heading as='h5' size='sm'>INCLUSIONS</Heading>
                            <Ckeditor info={ckeditorinfo.info1} />
                        </Flex>
                        <Ckeditor info={ckeditorinfo.info2} />
                        {/* this is the image div  */}
                        <Flex paddingY="30px" gap="15" borderTop="1px solid darkgray" borderBottom="1px solid darkgray" flexDirection="column" >
                            <Heading size='xs' fontWeight='500' fontSize={14} textTransform='UpperCase'>Image</Heading>
                            <Flex gap="5" alignItems="center" >

                                <ModalClick onOpen2={onOpen2} isOpen2={isOpen2} 
                                onClose2={onClose2} setImageUrl={setImageUrl} 
                                imageUrl={imageUrl} setIsSave={setIsSave} 
                                isSave={isSave} />

                                <Text width="130px" color="darkgray" fontSize="13px"> Image Dimentions: 300px * 165px </Text>
                                {imageUrl && isSave &&
                                    <Box width="150px" height="150px" border="0.5px solid gray" padding="5px">
                                        <img src={imageUrl} alt="this is selected image" style={{ width: "100%", height: "100%", objectFit: "cover", border: "1px solid gray" }} />
                                    </Box>
                                }
                            </Flex>
                        </Flex>
                        <Box flexDirection='column' gap="3" display="flex">
                            <Heading size='xs' fontWeight='500' fontSize={13} textTransform='UpperCase'>Availability</Heading>
                            <Text fontSize={12}> Add atleast ONE interval in order to save this rate plan.</Text>
                            <Button background='#32c0a0' color='#fff' borderRadius='30px' fontSize="12px" width="fit-content" className="button" paddingX="5"
                                onClick={
                                    // async
                                    () => {
                                        // let check = await checkForm();
                                        // if(check) 
                                        // setdatanullopenmodal(onOpen)
                                        checkForm()
                                    }}>
                                <FaPlus color="#fff" px={2} />
                                ADD INTERVAL
                            </Button>
                            {/* <NewTest text="hhello focus"/> */}
                        </Box>
                        <Card borderTop='4px solid #3366ff' overflow={"auto"}>
                            <CardBody>
                                <Heading as='h5' size='sm'>
                                    Intervals <span color="red">*</span>
                                </Heading>

                                <IntervalTable />
                            </CardBody>
                        </Card>
                    </Container>
                </CardBody>
            </Card >
        </GridItem>

    )
}
export default NewFormComponent;