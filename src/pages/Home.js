import * as React from "react";
import {
  Text,
  Center,
  useToast,
  Image,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import HomeForm from "../components/Home/HomeForm";
import { useDispatch } from "react-redux";
import { addState } from "../features/counter/counterSlice";
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const variant = ["solid", "error", "left-accent", "top-accent"];
  const statuses = ["error", "success"];
  const [buttonloading, setbuttonLoading] = React.useState(false)

  const handleOnclickLogin = async (email, password) => {
    setbuttonLoading(true);
    //   try {
    //     const options = {
    //       method: 'POST',
    //       headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Headers': '*',
    //         'Content-Type': 'application/json', // Specify the content type as JSON
    //         // Add any additional headers if required
    //       },
    //       body: JSON.stringify({email, password}), // Convert the data to JSON format
    //     };
    //     fetch(`${API_URL}/admin/login`, options)
    //     .then(response => {
    //       if (!response.ok) {
    //         handleLoginFailure('Please enter valid details');
    //       }   
    //       return response.json();
    //     })
    //     .then(data => {
    //       console.log('Response:', data);
    //       if(data.status===true)
    //       handleLoginSuccess(data.data);
    //       else if(data.status===false){
    //         console.log("this is run")
    //         handleLoginFailure('Wrong Credentials');
    //       }
    //     })
    //     .catch(error => {
    //       handleLoginFailure('Something went wrong. Please try again.');
    //       console.error('Error:', error);
    //     });
    //   } finally {
    //     setbuttonLoading(false);
    //   }
    // };

    // const handleLoginSuccess = (userData) => {
    //  window.location.href = '/admin/dashboard';
    // console.log("userdata",userData)
    // const stringifiesdata = JSON.stringify(userData.user);
    // localStorage.setItem('userBasicInformation', stringifiesdata);
    // dispatch(addState(stringifiesdata));
    // localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Q3NTMzZDAwOGYyYjM4NDEzMjZiZTIiLCJpYXQiOjE3MDc0ODM2NDJ9.5gdV05BK6nXH303ze2a7Wj5M6GVlPtwQYaxecDgtJrg")
    sessionStorage.setItem('isLogin', true);
    showToast('Login Successfully !!', 'success');
    navigate("/admin/dashboard");
    // };

  }

  const handleLoginFailure = (message) => {
    showToast(message, 'error');
  };

  const showToast = (title, status) => {
    toast({
      position: "top",
      title: title,
      variant: variant,
      status: status === "success" ? statuses[1] : statuses[0],
      duration: 1000,
      isClosable: true,
      containerStyle: {
        width: "400px",
        maxWidth: "100%",
      },
    });
  };


  //   const config = {
  //     method: "post",
  //     url: process.env.REACT_APP_API_URL + "/admin/login",
  //     data: data,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //     },
  //   };
  //   const response = await Axios(config);
  //   if(response){
  //   if (response.status === 200) {
  //     setbuttonLoading(false)
  //     if (response.data.status) {
  //       window.location.href="/admin/dashboard"
  //       localStorage.setItem(
  //         "userBasicInformation",
  //         JSON.stringify(response.data.data.user)
  //       );
  //       const stringifiesdata = JSON.stringify(response.data.data.user);
  //       dispatch(addState(stringifiesdata));

  //       localStorage.setItem("userToken", response.data.data.token);
  //       sessionStorage.setItem("isLogin", true);

  //       toast({
  //         position: "top",
  //         title: `Login Successfully !!`,
  //         variant: variant,
  //         status: statuses[1],
  //         duration: 1000,
  //         isClosable: true,
  //         containerStyle: {
  //           width: "400px",
  //           maxWidth: "100%",
  //         },
  //       });
  //     } else {
  //       toast({
  //         position: "top",
  //         title: `Please enter the valid details `,
  //         variant: variant,
  //         status: statuses[0],
  //         duration: 1000,
  //         isClosable: true,
  //         containerStyle: {
  //           width: "400px",
  //           maxWidth: "100%",
  //         },
  //       });
  //     }
  //   }
  // }
  // };
  return (
    <Container maxW="container.xxl" px="0" height="calc(100vh)">
      <Grid templateColumns="repeat(1 , 1fr)" style={loginContainer}>
        <GridItem style={main} mx={{ base: "5px", md: "15px" }}>
          <Center>
            <Image
              w={{ base: "150px", sm: "180px", md: "210px" }}
              textAlign="center"
              src="assets/images/qubed_logo.svg"
            />
          </Center>
          <Center>
            <Text
              ms="8px"
              component={"h3"}
              textStyle={"subHeading"}
              fontSize={{ base: "14px", sm: "16px", lg: "18px" }}
            >
              Log in to your account{" "}
            </Text>{" "}
          </Center>
          <Center>
            <HomeForm
              // credentials={credentials}
              // handleChange={handleChange}
              handleOnclickLogin={handleOnclickLogin}
              buttonloading={buttonloading}
            // setCredentials={setCredentials}
            />

          </Center>
        </GridItem>{" "}
      </Grid>{" "}
    </Container>
  );
}

const loginContainer = {
  backgroundColor: "#f1f3fa",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: 'center'
}

const main = {
  height: 'fit-content',
  width: "fit-content",
  display: "flex",
  flexDirection: 'column',
  gap: "20px",
}
