import React ,{useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
import { Formik, Field } from "formik";
import { createAccomodation } from '../../apiService/property';

const NewAccomodationModal = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null);
  const toast = useToast()
  const [buttonLoading, setButtonLoading] = useState(false)

  const displayToast = (title, description, status, duration) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: duration,
      isClosable: true,
    })
  }
  const handleAddAccomodation = async (accomodationData) => {
    console.log("accomodationData", accomodationData);
    setButtonLoading(true)
    let data = await createAccomodation(accomodationData)
    console.log("data", data)
    if (data?.statusCode === 200) {
      setButtonLoading(false)
      onClose();
      displayToast("Save Success", data?.message, "success", 2000)
    }
    else {
      setButtonLoading(false)
      onClose();
      if (data.errCode === 11000)
        displayToast("Save Error", "Accomodation Name Already exists", "error", 2000)
    }
  }
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new accomodation</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              accomodationName: "",
              accomodationAbvr: "",
              units: 50,
              dormBedsPerRoom: 1,
              totalAccomodations: 50,
              price: 100
            }}
            onSubmit={(values) => {
              // alert(JSON.stringify(values, null, 2));
              handleAddAccomodation(values)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody pb={6}>

                  <FormControl isInvalid={!!errors.accomodationName && touched.accomodationName}>
                    <FormLabel htmlFor="accomodationName">Accomodation Name</FormLabel>
                    <Field
                      as={Input}
                      id="accomodationName"
                      name="accomodationName"
                      type="text"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value.length < 2) {
                          error = "Accomodation Name must contain at least 2 character";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.accomodationName}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.accomodationAbvr && touched.accomodationAbvr} >
                    <FormLabel htmlFor="accomodationAbvr">Accomodation Abbreviation</FormLabel>
                    <Field
                      as={Input}
                      id="accomodationAbvr"
                      name="accomodationAbvr"
                      type="text"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value.length < 1) {
                          error = "Accomodation Abbreviation must contain at least 1 character";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.accomodationAbvr}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.units && touched.units} >
                    <FormLabel htmlFor="units">Units</FormLabel>
                    <Field
                      as={Input}
                      id="units"
                      name="units"
                      type="Number"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value === 0 || value === "") {
                          error = "Please Enter number of units";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.units}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.dormBedsPerRoom && touched.dormBedsPerRoom} >
                    <FormLabel htmlFor="dormBedsPerRoom">Dorm Beds Per Room</FormLabel>
                    <Field
                      as={Input}
                      id="dormBedsPerRoom"
                      name="dormBedsPerRoom"
                      type="Number"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value === 0 || value === "") {
                          error = "Please Enter Dorm Beds Per Room";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.dormBedsPerRoom}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.totalAccomodations && touched.totalAccomodations} >
                    <FormLabel htmlFor="totalAccomodations">Total Accomodations</FormLabel>
                    <Field
                      as={Input}
                      id="totalAccomodations"
                      name="totalAccomodations"
                      type="Number"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value === 0 || value === "") {
                          error = "Please Enter Total Accomodation Beds Per Room";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.totalAccomodations}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.price && touched.price} >
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Field
                      as={Input}
                      id="price"
                      name="price"
                      type="Number"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (value === 0 || value === "") {
                          error = "Please enter price in dollars";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} type="submit"  isLoading={buttonLoading}  loadingText='Saving...'>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewAccomodationModal