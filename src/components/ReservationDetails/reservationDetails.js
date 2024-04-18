
import React from 'react';
import Axios from 'axios';
import { Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, GridItem, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import styles from "./reservationDetails.module.css"
import CheckID from '../CheckId';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";

export default function ReservationDetails(props) {
    const { setIsConfirmAndPayActivate, reservationDetail, setReservationDetailForm, primaryGuestFirstName, setPrimaryGuestFirstName,
        primaryGuestLastName, setPrimaryGuestLastName,
        primaryGuestEmailAddress, setPrimaryGuestEmailAddress,
        guestPrimaryDateOfBirth, setGuestPrimaryDateOfBirth,
        primaryGuestPhone, setPrimaryGuestPhone,
        estimatedArrivalTime, setEstimatedArrivalTime,
        guestPrimaryGender, setGuestPrimaryGender,
        guestPrimaryTaxID, setGuestPrimaryTaxID,
        guestPrimaryCompanyName, setGuestPrimaryCompanyName,
        guestPrimaryCompanyTaxId, setGuestPrimaryCompanyTaxId,
        guestPrimaryAddress1, setGuestPrimaryAddress1,
        guestPrimaryAddress2, setGuestPrimaryAddress2,
        guestPrimaryCity, setGuestPrimaryCity,
        guestPrimaryCountry, setGuestPrimaryCountry,
        guestPrimaryState, setGuestPrimaryState,
        guestPrimaryZipCode, setGuestPrimaryZipCode,
        guestPrimaryEmail,setGuestPrimaryEmail,
        guestCountry, setGuestCountry,
        guestPrimaryGuestDocument, setGuestPrimaryGuestDocument,
        guestPrimaryDocumentNumber, setGuestPrimaryDocumentNumber,
        guestPrimaryDocumentIssueDate, setGuestPrimaryDocumentIssueDate,
        guestPrimaryDocumentIssuingCountry, setGuestPrimaryDocumentIssuingCountry,
        guestPrimaryDocumentExpirationDate, setGuestPrimaryDocumentExpirationDate
    } = props
    const allFieldsAreFilled =
      primaryGuestFirstName != "" &&
      primaryGuestLastName != "" &&
      primaryGuestEmailAddress != "" &&
      primaryGuestPhone != "" &&
      guestCountry != "" &&
      guestPrimaryAddress1 != "" &&
      guestPrimaryAddress2 != "" &&
      guestPrimaryCity != "" &&
      guestPrimaryCountry != "" &&
      guestPrimaryState != "" &&
      guestPrimaryZipCode != "" &&
      guestPrimaryEmail != ""

    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const [primaryGuestEmailValidError, setPrimaryGuestEmailValidError] = React.useState(false)
    const [primaryGuestEmailAddressError, setPrimaryGuestEmailAddressError] = React.useState(false)
    const [primaryGuestLastNameError, setPrimaryGuestLastNameError] = React.useState(false)
    const [primaryGuestFirstNameError, setPrimaryGuestFirstNameError] = React.useState(false)
    const [primaryGuestPhoneNumberError, setPrimaryGuestPhoneNumberError] = React.useState(false)
    const [primaryGuestPhoneNumberValidError, setPrimaryGuestPhoneNumbeValidError] = React.useState(false)
    const [countries, setCountries] = React.useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [errors, setErrors] = React.useState({
      country: false,
      billingAddress1: false,
      billingAddress2: false,
      city: false,
      biilingCountry:false,
      state:false,
      zipCode:false,
      guestPrimaryEmail:false
    });

    React.useEffect(() => {
        getCountries()
    }, [])


    async function getCountries() {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/countries/all',
            params: {},
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*',
            }
        }
        const response = await Axios(config);
        if (response.status) {
            setCountries(response.data.data)
        }
    }
    function handleFirstNameChange(event) {
        
        setPrimaryGuestFirstName(event)
        
            event===""
            ? setPrimaryGuestFirstNameError(true)
            : setPrimaryGuestFirstNameError(false)

    }
    function handleLastNameChange(event) {
        if (event == "") {
            setPrimaryGuestLastNameError(true)
            return;
        }

        setPrimaryGuestLastNameError(false)
        setPrimaryGuestLastName(event)
    }
    function handleEmailChange(event) {
        if (event == "") {
            // setPrimaryGuestEmailValidError(false)
            // setPrimaryGuestEmailAddressError(true)
            // return
        } else {
            setPrimaryGuestEmailAddressError(false)
            if (!emailRegEx.test(event)) {
                setPrimaryGuestEmailValidError(true)
                return
            }
        }
        // setPrimaryGuestEmailAddress(event)
    }
    // function for handle phone number
    function handlePhoneChange(event) {
       setPrimaryGuestPhone(event);
        if (event == "") {
            setPrimaryGuestPhoneNumbeValidError(false)
            setPrimaryGuestPhoneNumberError(true)
            return
        } else {
            setPrimaryGuestPhoneNumberError(false)
            if (event.length >= 10) {
                setPrimaryGuestPhoneNumbeValidError(false)
            } else {
                setPrimaryGuestPhoneNumbeValidError(true)
            }

        }
       
    }
    React.useEffect(() => {
        if (allFieldsAreFilled) {
            setReservationDetailForm({
              primaryGuestFirstName,
              primaryGuestLastName,
              primaryGuestEmailAddress,
              guestPrimaryDateOfBirth,
              guestCountry,
              guestPrimaryTaxID,
              primaryGuestPhone,
              guestPrimaryTaxID,
              guestPrimaryCompanyName,
              guestPrimaryCompanyTaxId,
              guestPrimaryCity,
              guestPrimaryCountry,
              guestPrimaryGuestDocument,
              guestPrimaryDocumentNumber,
              guestPrimaryDocumentIssueDate,
              estimatedArrivalTime,
              guestPrimaryState,
              guestPrimaryZipCode,
              guestPrimaryGender,
              guestPrimaryAddress1,
              guestPrimaryAddress2,
              guestPrimaryDocumentIssuingCountry,
              guestPrimaryDocumentExpirationDate,
              guestPrimaryEmail,
            });
            setIsConfirmAndPayActivate(true)
        } else {
            setIsConfirmAndPayActivate(false)
        }
                                
    }, [allFieldsAreFilled])  // eslint-disable-line react-hooks/exhaustive-deps
  

  
    return (
      <Box>
        <Text
          fontSize={"sm"}
          fontWeight={"600"}
          ps={"5"}
          pb={"3"}
          borderBottom={"2px solid #e5e5e5"}
          m={"4"}
        >
          RESERVATION DETAILS
        </Text>
        <Stack width={"100%"}>
          <Card borderTop="4px solid #3366ff">
            <CardBody>
              <form>
                <Box gap={6} className={styles.mainParent}>
                  <GridItem colSpan={"3"}>
                    <Text fontSize={"sm"} fontWeight={"600"}>
                      RESERVATION INFORMATION
                    </Text>
                  </GridItem>

                  <GridItem className={styles.samewidth}>
                    <FormControl>
                      <FormLabel fontSize={"xs"}>
                        Estimated Arrival Time
                      </FormLabel>
                      <Input
                        type="time"
                        fontSize={"xs"}
                        onChange={(e) =>
                          setEstimatedArrivalTime(e.target.value)
                        }
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={"3"}>
                    <Text fontSize={"sm"} fontWeight={"600"}>
                      PRIMARY GUEST INFORMATION
                    </Text>
                  </GridItem>
                  <GridItem colSpan={"3"} className={styles.sameLine}>
                    <GridItem className={styles.samewidth}>
                      <FormControl isInvalid={primaryGuestFirstNameError}>
                        <FormLabel fontSize={"xs"} display={"flex"}>
                          First Name
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="First Name"
                          fontSize={"xs"}
                          value={primaryGuestFirstName}
                          onChange={(e) =>
                            handleFirstNameChange(e.target.value)
                          }
                        />
                        {primaryGuestFirstNameError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter First Name
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl isInvalid={primaryGuestLastNameError}>
                        <FormLabel fontSize={"xs"} display={"flex"}>
                          Last Name
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={primaryGuestLastName}
                          onChange={(e) => handleLastNameChange(e.target.value)}
                        />
                        {primaryGuestLastNameError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter Last Name
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl
                        isInvalid={
                          primaryGuestEmailAddressError ||
                          primaryGuestEmailValidError
                        }
                      >
                        <FormLabel fontSize={"xs"} display={"flex"}>
                          Email
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="email"
                          placeholder="Basic usage"
                          value={primaryGuestEmailAddress}
                          fontSize={"xs"}
                          onChange={(e) => {
                            setPrimaryGuestEmailAddress(e.target.value);
                            e.target.value === ""
                              ? setPrimaryGuestEmailValidError(true)
                              : setPrimaryGuestEmailValidError(false);
                          }}
                        />
                        {primaryGuestEmailAddressError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter Email Address
                          </FormHelperText>
                        )}
                        {primaryGuestEmailValidError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter the Valid Email Address
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl
                        isInvalid={
                          primaryGuestPhoneNumberError ||
                          primaryGuestPhoneNumberValidError
                        }
                      >
                        <FormLabel fontSize={"xs"} display={"flex"}>
                          Phone
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          value={primaryGuestPhone}
                          fontSize={"xs"}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                        {primaryGuestPhoneNumberError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter Phone Number
                          </FormHelperText>
                        )}
                        {primaryGuestPhoneNumberValidError && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Enter the Valid Phone Number
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Country
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Select
                          type="text"
                          placeholder=""
                          fontSize={"xs"}
                          value={guestCountry}
                          onChange={(e) => {
                            setGuestCountry(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  country: true,
                                })
                              : setErrors({
                                  ...errors,
                                  country: false,
                                });
                          }}
                        >
                          <option> </option>
                          {countries.map((value, index) => (
                            <option value={value.name} key={String(index)}>
                              {value.name}
                            </option>
                          ))}
                        </Select>
                        {errors.country && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Select a Country
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>Date Of Birth</FormLabel>
                        <Input
                          type="date"
                          placeholder="Date of Birth"
                          value={guestPrimaryDateOfBirth}
                          fontSize={"xs"}
                          onChange={(e) =>
                            setGuestPrimaryDateOfBirth(e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>Gender</FormLabel>
                        <Select
                          placeholder="N/A"
                          fontSize={"xs"}
                          value={guestPrimaryGender}
                          onChange={(e) =>
                            setGuestPrimaryGender(e.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Guest Tax ID Number
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryTaxID}
                          onChange={(e) => setGuestPrimaryTaxID(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>Company Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryCompanyName}
                          onChange={(e) =>
                            setGuestPrimaryCompanyName(e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Company Tax Id Number
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryCompanyTaxId}
                          onChange={(e) =>
                            setGuestPrimaryCompanyTaxId(e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                  </GridItem>

                  <GridItem colSpan={"3"}>
                    <Text fontSize={"sm"} fontWeight={"600"}>
                      BILLING ADDRESS
                    </Text>
                  </GridItem>
                  <GridItem colSpan={"3"} className={styles.sameLine}>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Address 1
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryAddress1}
                          onChange={(e) => {
                            setGuestPrimaryAddress1(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  billingAddress1: true,
                                })
                              : setErrors({
                                  ...errors,
                                  billingAddress1: false,
                                });
                          }}
                        />
                        {errors.billingAddress1 && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill Address 1
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Address 2
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryAddress2}
                          onChange={(e) => {
                            setGuestPrimaryAddress2(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  billingAddress1: true,
                                })
                              : setErrors({
                                  ...errors,
                                  billingAddress1: false,
                                });
                          }}
                        />
                        {errors.billingAddress2 && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill Address 2
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          City
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryCity}
                          onChange={(e) => {
                            setGuestPrimaryCity(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  city: true,
                                })
                              : setErrors({
                                  ...errors,
                                  city: false,
                                });
                          }}
                        />
                        {errors.city && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill City
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Country
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Select
                          placeholder=" "
                          fontSize={"xs"}
                          value={guestPrimaryCountry}
                          onChange={(e) => {
                            setGuestPrimaryCountry(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  biilingCountry: true,
                                })
                              : setErrors({
                                  ...errors,
                                  biilingCountry: false,
                                });
                          }}
                        >
                          {/* <option value='Male'>Male</option> */}
                          {/* <option value='Female'>Female</option> */}
                          {countries.map((value, index) => (
                            <option value={value.name} key={String(index)}>
                              {value.name}
                            </option>
                          ))}
                        </Select>
                        {errors.city && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Select a country
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          State/Region
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="N/A"
                          fontSize={"xs"}
                          value={guestPrimaryState}
                          onChange={(e) => {
                            setGuestPrimaryState(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  state: true,
                                })
                              : setErrors({
                                  ...errors,
                                  state: false,
                                });
                          }}
                        >
                          {/* <option value="Male">Male</option> */}
                          {/* <option value="Female">Female</option> */}
                        </Input>
                        {errors.state && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill a State
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Postal/Zip Code
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryZipCode}
                          onChange={(e) => {
                            setGuestPrimaryZipCode(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  zipCode: true,
                                })
                              : setErrors({
                                  ...errors,
                                  zipCode: false,
                                });
                          }}
                        />
                        {errors.zipCode && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill a Zip Code
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"} display="flex">
                          Billing Email
                          <Text ps={1} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryEmail}
                          onChange={(e) => {
                            setGuestPrimaryEmail(e.target.value);
                            e.target.value === ""
                              ? setErrors({
                                  ...errors,
                                  guestPrimaryEmail: true,
                                })
                              : setErrors({
                                  ...errors,
                                  guestPrimaryEmail: false,
                                });
                          }}
                        />
                        {errors.guestPrimaryEmail && (
                          <FormHelperText fontSize={"xs"} color={"red"}>
                            Please Fill a Email Address
                          </FormHelperText>
                        )}
                      </FormControl>
                    </GridItem>
                  </GridItem>
                  <GridItem colSpan={"3"}>
                    <Text fontSize={"sm"} fontWeight={"600"}>
                      GUEST DOCUMENT
                    </Text>
                  </GridItem>
                  <GridItem colSpan={"3"} className={styles.sameLine}>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>Type of Document</FormLabel>
                        <Select
                          placeholder="N/A"
                          fontSize={"xs"}
                          value={guestPrimaryGuestDocument}
                          onChange={(e) =>
                            setGuestPrimaryGuestDocument(e.target.value)
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>Document Number</FormLabel>
                        <Input
                          placeholder="Basic usage"
                          fontSize={"xs"}
                          value={guestPrimaryDocumentNumber}
                          onChange={(e) =>
                            setGuestPrimaryDocumentNumber(e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Document Issue Date
                        </FormLabel>
                        <Input
                          type="date"
                          placeholder="Date of Birth"
                          value={guestPrimaryDocumentIssueDate}
                          fontSize={"xs"}
                          onChange={(e) =>
                            setGuestPrimaryDocumentIssueDate(e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Document Issuing Country
                        </FormLabel>
                        <Select
                          placeholder=" "
                          fontSize={"xs"}
                          value={guestPrimaryDocumentIssuingCountry}
                          onChange={(e) =>
                            setGuestPrimaryDocumentIssuingCountry(
                              e.target.value
                            )
                          }
                        >
                          {/* <option value='Male'>Male</option> */}
                          {/* <option value='Female'>Female</option> */}
                          {countries.map((value, index) => (
                            <option value={value.name} key={String(index)}>
                              {value.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Document Expiration Date
                        </FormLabel>
                        <Input
                          type="date"
                          placeholder="Date of Birth"
                          value={guestPrimaryDocumentExpirationDate}
                          fontSize={"xs"}
                          onChange={(e) =>
                            setGuestPrimaryDocumentExpirationDate(
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem className={styles.samewidth}>
                      <FormControl>
                        <FormLabel fontSize={"xs"}>
                          Upload Your Id for check
                        </FormLabel>
                        <Input
                          type="button"
                          // placeholder="Date of Birth"
                          // value={guestPrimaryDocumentExpirationDate}
                          fontSize={"xs"}
                          value="Upload"
                          onClick={onOpen}
                        />
                      </FormControl>
                    </GridItem>
                  </GridItem>
                </Box>
              </form>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent height="80vh">
                  <ModalHeader>DVS Application</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody height="100%" overflow={"auto"}>
                    <CheckID onClose={onClose} isOpen={isOpen} />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    );
}

