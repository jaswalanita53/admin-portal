import * as React from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { memo } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
    Grid,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    CheckboxGroup,
    Stack,
    Checkbox,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
} from '@chakra-ui/react';
import styles from "./ModalContent.module.css"

 function BasicUsage(props) {
    const {isbuttonloading} = props
    const [weekDays, setWeekDays] = React.useState(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])
     const [selectedweekdays, setSelectedWeekDays] = React.useState([]);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

       React.useEffect(()=>{
           setValue("discountValue", props?.data?.discountValue)
            setValue("planName", `${props?.data?.planName?props?.data?.planName:""}`)
            setValue("startdate", props?.data?.startdate?props?.data?.startdate:"")
            setValue("enddate", props?.data?.enddate? props?.data?.enddate:"")
            // setValue("minLos", props?.data?.minLos? +props?.data?.minLos:"")
            setValue("minLos", props?.data?.minLos)
          
            // setValue("maxLos", props?.data?.maxLos? +props?.data?.maxLos:"")
            setValue("maxLos", props?.data?.maxLos)
            setValue("cutOFf", props?.data?.cutOFf)
            //  ? +props?.data?.cutOFf:"")
            // setValue("lastMinuteBooking", props?.data?.lastMinuteBooking ? +props?.data?.lastMinuteBooking:"");
            setValue("lastMinuteBooking", props?.data?.lastMinuteBooking)
            setValue("discountType", props?.data?.discountType?props?.data?.discountType:"")
         

           
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[props.data])

    //  React.useEffect(() => {
    //  setSelectedWeekDays(props?.data?.selectedNumberOfWeeks)
    //  }, [props.data.selectedNumberOfWeeks])

    const onSubmit = async (data) => {
        props.setisbuttonloading(true)
        const userToken = localStorage.getItem('userToken')
        let newData = [];
        newData.push(data)
        let id =  props?.data?._id
        if(props?.data?._id){
            newData.push(id)
        }
        const config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/admin/savePlanAndPackages',
            data: newData,
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }

        Axios(config).then(function(response){
            if(response.status){
                props.getAllRatesAndPlan();
            }
        }).catch(function(error){
            console.log(error)
        })
    };
    return (
        <>
            <Modal isOpen={props.isOpen} size={'xl'} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent className={styles.modal}>
                    <ModalHeader>Create Rate & Plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns='repeat(2,1fr)' gap={6} pt={3}>
                            <GridItem colSpan={'2'}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Rate Plan Name</FormLabel>
                                    <Input fontSize={'xs'} placeholder="Rate Plan Name" {...register("planName", { required: true })} />
                                    {errors.planName && <Text style={{ "color": "red" }} fontSize={'xs'} >PlanName is required</Text>}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Start Date</FormLabel>
                                    <Input type="date" fontSize={'xs'}  {...register("startdate", { required: true })}  />
                                    {errors.startdate && <Text style={{ "color": "red" }} fontSize={'xs'} >Start Date is required</Text>}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'} >End Date</FormLabel>
                                    <Input type="date" fontSize={'xs'} {...register("enddate", { required: true })} />
                                    {errors.enddate && <Text style={{ "color": "red" }} fontSize={'xs'} >End Date is required</Text>}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Minimum Length of Stay</FormLabel>
                                    <NumberInput size={'sm'} step={1} defaultValue={0} min={1} max={30}>
                                        <NumberInputField fontSize={'xs'} placeholder={'Minimum Length of Stay'} {...register("minLos", { required: true })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    {errors.minLos && <Text style={{ "color": "red" }} fontSize={'xs'} >Minimum Length Of Stay is Required</Text>}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Maximum Length of Stay</FormLabel>
                                    <NumberInput size={'sm'} step={1} defaultValue={0} min={1} max={30}>
                                        <NumberInputField placeholder={'Maximum Length of Stay'} fontSize={'xs'} {...register("maxLos", { required: true })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    {errors.maxLos && <Text style={{ "color": "red" }} fontSize={'xs'} >Maximum Length Of Stay is Required</Text>}
                                </FormControl>
                            </GridItem>
                            {/* <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Cut Off</FormLabel>
                                    <NumberInput size={'sm'} step={1} defaultValue={0} min={1} max={30}>
                                        <NumberInputField placeholder={'Cut Off'}  fontSize={'xs'} {...register("cutOFf", { required: false })} />
                                        <NumberInputStepper >
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </GridItem> */}
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Last Minute Booking</FormLabel>
                                    <NumberInput size={'sm'} step={1} defaultValue={0} min={1} max={30} fontSize={'xs'}>
                                        <NumberInputField placeholder={'Last Minute Booking'} fontSize={'xs'}  {...register("lastMinuteBooking", { required: false })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </GridItem>
                             <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Discount Type</FormLabel>
                                    {/* <NumberInput size={'sm'} step={1} >
                                        <Select placeholder={'Discount type'}  fontSize={'xs'} {...register("percentageDiscount", { required: true })} />
                                        <NumberInputStepper >
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput> */}
                                    <Select placeholder='Type of discount' size={'sm'} {...register("discountType", { required: true })}> 
                                        <option value='%' size={'sm'} selected={props?.data?.discountType==="%"}>%</option>
                                        <option value='$' size={'sm'} selected={props?.data?.discountType==="$"}>$</option>
                                    </Select>
                                    {errors.discountType && <Text style={{ "color": "red" }} fontSize={'xs'} >Discount type is required</Text>}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={{base:"2",sm:"1"}}>
                                <FormControl>
                                    <FormLabel pb="1" pt="2" fontSize={'xs'}>Discount value</FormLabel>
                                    <NumberInput size={'sm'} step={1} fontSize={'xs'}>
                                        <NumberInputField placeholder={'Discount value'} fontSize={'xs'}  {...register("discountValue", { required: true })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                                      {errors.discountValue && <Text style={{ "color": "red" }} fontSize={'xs'} >Discount value is Required</Text>}
                                </FormControl>
                            </GridItem>
                            {/* add a text field to for a % discount and add a text field for a $ discount to the create a rate/plan form. Make sure this rate is shown on the booking site */}
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel pb="1" pt="1" fontSize={'xs'}>Days Of Week</FormLabel>
                                    <CheckboxGroup fontSize={'xs'} colorScheme='green' defaultValue={props.data.selectedNumberOfWeeks}>
                                        <Stack spacing={[1, 5]} direction={['column', 'row']} className={styles.weeks}>
                                            {weekDays.map((report, index) => (
                                                <Checkbox size={'md'} value={report} {...register("selectedNumberOfWeeks", { required: true })} className={styles.checks} 
                                                // defaultChecked={selectedweekdays?.includes(report)}
                                                // defaultChecked
                                                > {report}</Checkbox>
                                            ))
                                            }
                                        </Stack>
                                    </CheckboxGroup>
                                    {errors.selectedNumberOfWeeks && <Text style={{ "color": "red" }} fontSize={'xs'} >No Of Week is required</Text>}
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    <ModalFooter className={styles.buttonDiv}>
                        <Button variant='ghost' fontSize={'sm'} colorScheme='grey' size='sm' mr={3} px={'2'} py={'2'} onClick={()=>{
                            props.onClose()
                            }} className={styles.closeButton}>
                            Close
                        </Button>
                        <Button fontSize={'sm'} colorScheme='blue' size='sm' px={'2'} py={'2'} onClick={handleSubmit(onSubmit)} disabled={isbuttonloading} className={styles.saveButton} isLoading={isbuttonloading} loadingText="Saving..." ref={props.plansaveref}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default memo(BasicUsage)