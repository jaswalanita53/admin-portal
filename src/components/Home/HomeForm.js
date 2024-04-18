import {
  Text,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Field } from "formik";
import { useRef } from "react";

export default function HomeForm({
  handleOnclickLogin,
  buttonloading,
  emailstate,
  passwordstate,
  buttonClicked,
  LogIn
}) {
  const initialValues = {
    email: emailstate ? emailstate : "",
    password: passwordstate ? passwordstate : "",
  };
  const buttonRef = useRef(null);
  const toast = useToast();

  const variant = ["solid", "error", "left-accent", "top-accent"];
  const statuses = ["error", "success"];
  React.useEffect(() => {
    if (buttonRef.current && buttonClicked) {
      buttonRef.current.click();
    }
    (LogIn === true || LogIn === false)  &&
      toast({
        position: "top",
        title: LogIn ? `Login Successfully !!` :"`Please enter the valid details `",
        variant: variant,
        status: LogIn ? statuses[1]:statuses[0],
        isClosable: true,
        containerStyle: {
          width: "400px",
          maxWidth: "100%",
        },
      });
      // eslint-disable-next-line
  }, []);
  return (
    <Card width="100%">
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleOnclickLogin(values.email, values.password);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} style={formdiv}>
              <Center>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel
                    component={"h3"}
                    htmlFor="email"
                    textStyle={"subHeading"}
                    fontSize={{ base: "14px", sm: "15px", md: "16px" }}
                  >
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    id="email"
                    style={loginInput}
                    autoComplete="username"
                    validate={(value) => {
                      let error = "";

                      if (!value) {
                        error = "Please provide an email";
                      }
                      return error;
                    }}
                  />

                  <FormErrorMessage>{errors.email} </FormErrorMessage>
                  {/* {errorMessageState && (
                    <p style={{ margin: "0", color: "red" }}>
                      Please provide an email
                    </p>
                  )} */}
                </FormControl>{" "}
              </Center>{" "}
              <Center>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel
                    component={"h3"}
                    textStyle={"subHeading"}
                    htmlFor="password"
                    fontSize={{ base: "14px", sm: "15px", md: "16px" }}
                  >
                    Password
                  </FormLabel>
                  <Field
                    as={Input}
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    style={loginInput}
                    validate={(value) => {
                      let error = "";
                      if (!value) {
                        error = "Please provide an password";
                      }
                      return error;
                    }}
                  />{" "}
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                  {/* <p style={{ margin: "0", color: "red" }}>
                    {errorMessageState && "Please provide a password"}
                  </p> */}
                </FormControl>{" "}
              </Center>{" "}
              <Center>
                <Button
                  type="submit"
                  isLoading={buttonloading}
                  loadingText="logging in..."
                  colorScheme={"blue"}
                  variant="outline"
                  style={loginButton}
                  width="100%"
                  disabled={buttonloading}
                  // disabled={true}
                  // onClick={()=> {alert("Login disabled")}}
                  ref={buttonRef}
                >
                  {" "}
                  login{" "}
                </Button>{" "}
              </Center>{" "}
            </form>
          )}
        </Formik>
        <Center pt="15px">
          <Text width="90%" style={loginSubText}>
            {" "}
            By clicking "Log in" you confirm that you accept the{" "}
            <Link color="teal.500" href="#">
              {" "}
              Terms of Service{" "}
            </Link>{" "}
          </Text>
        </Center>{" "}
        <Center pt="15px">
          {" "}
          <Text style={loginSubText}>
            {" "}
            Forgot your password ?{" "}
            <Link color="teal.500" href="#">
              Click Here{" "}
            </Link>
          </Text>
        </Center>{" "}
      </CardBody>{" "}
    </Card>
  );
}

const loginButton = {
  backgroundColor: "#f36523",
  padding: "10px 0px",
  fontSize: "14px",
  textTransform: "uppercase",
  border: "1px solid #f36523",
  borderRadius: "20px",
  color: "white",
  maxWidth: "500px",
};
const loginInput = {
  borderColor: "#ccc",
};
const loginSubText = {
  lineHeight: "18px",
  textAlign: "center",
  fontSize: "12px",
  color: "#000",
};

const formdiv = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
