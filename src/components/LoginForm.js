import React from 'react';
import LoginErrorMessage from './LoginErrorMessage';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast';



export default function LoginForm() {
  // navigate hook to redirect the user to the activities screen
  let navigate = useNavigate();

  // credentials state var
  const [credentials, setCredentials] = useState({
    userEmail: "",
    password: ""
  });

  // login erro state var
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  

  return (
    <VStack>
      <Flex p={50} width="full" align="center" justifyContent="center" minH={"100vh"}>
        <Box p={"50px"} pt="30px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center" >
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form>
                {isLoginError && <LoginErrorMessage message={loginErrorMessage} />}
                <FormControl isRequired="true">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" placeholder="example@email.com" onChange={(event) => handleChangeUserEmail(event)}   onKeyDown={(event) => handleKeyDown(event)} />
                </FormControl>
                <FormControl mt={6} isRequired="true">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="*******" onChange={(event) => handleChangePassword(event)}  onKeyDown={(event) => handleKeyDown(event)} />
                </FormControl>
              </form>
              <Button width="full" mt={8} type="submit" colorScheme="green" variant="solid" onClick={(event) => handleSubmitCredentials(event)}>
                  Login
              </Button>
              <Stack pt={6}>
                  <Text align={"center"}>
                  Need an account? <Link color={"blue.400"} onClick={() => navigate("/register")} >Sign up</Link>
                  </Text>
              </Stack>
          </Box>
        </Box>
    </Flex>
    <Toaster position="top-right" />
    <Footer></Footer>
  </VStack>
      
);

function handleKeyDown(e) {
  (e.key === "Enter") && login();
}



function handleChangeUserEmail(event) {
  // keep track of email value in input
  setCredentials(
    {
      userEmail: event.target.value,
      password: credentials.password
    }
  );
}

function handleChangePassword(event) {
  // keep track of password value in input
  setCredentials(
    {
      userEmail: credentials.userEmail,
      password: event.target.value
    }
  );
}

function handleSubmitCredentials(event) {
  event.preventDefault();
  login();
}

function login() {
  const lgnEndPoint = "http://localhost:8080/api/login";
  const data = JSON.stringify(credentials);

  axios.post(
    lgnEndPoint, 
    data, 
    {
      headers: {
        Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }}).then((response) => {
        let usr = response.data.userId;
        let userName = response.data.userName;
        navigate("/all-activities", {state: {authorised: true, userId: usr}});
        toast.success("Welcome " + userName + " 🥳 Enjoy the city!")
      })
    .catch((error) => {
      setIsLoginError(true);
      setLoginErrorMessage(error.response.data.message);
    });
  
  }

}









  