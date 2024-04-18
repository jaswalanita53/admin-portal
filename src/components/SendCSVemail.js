import Axios from "axios";
import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

 import { Formik, Form, Field, ErrorMessage } from "formik";

const SendCSVemail = ({ csvdata2, reportName, onClose }) => {
  const [email, setEmail] = React.useState("");
//   const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const sendEmail = async (emailAddress) => {
    const csvContent = csvdata2?.map((row) => row.join(",")).join("\n");
    // const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    const url = process.env.REACT_APP_API_URL + `/admin/sharecsv`;
    Axios({
      method: "POST",
      url: url,
      params: {
        csvContent,
        reportName,
        emailAddress,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        ContentType: "multipart/form-data",
      },
    })
      .then((res) => {
        toast({
          title: "Email sent successfully.",
          description: res.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err,
          status: "failure",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const initialRef = React.useRef(null);

  return (
    <ModalContent>
      <ModalHeader>Enter the reciever's email</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            // alert(JSON.stringify(values, null, 2));
            sendEmail(values.email);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  validate={(value) => {
                    let error;
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                      error = "Please enter an email in the correct format";
                      return error;
                  }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="purple" width="full" mt="4">
                Send
              </Button>
            </form>
          )}
        </Formik>
      </ModalBody>

      <ModalFooter>
        {/* <Button
          colorScheme="blue"
          mr={3}
          onClick={() => {
            sendEmail(email);
          }}
        >
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button> */}
      </ModalFooter>
    </ModalContent>
  );
};

export default SendCSVemail;
