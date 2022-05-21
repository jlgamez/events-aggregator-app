import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    VStack,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
  import { Icon } from '@chakra-ui/react';
  import LoginErrorMessage from './LoginErrorMessage';
import axios from 'axios';
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';



export default function RegistrationForm() {
    // navigation hook
    let navigate = useNavigate();

    // state variables
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUpError, setIsSignUpError] = useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

    // keep track of the input data
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


  return (
    
    <VStack>
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} >
        <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up to <br/>
            <Text textColor={"green.500"} >Activify</Text>
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
                for the best Barcelona experience ✌️
            </Text>
        </Stack>
        <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}>
            {isSignUpError && <LoginErrorMessage message={signUpErrorMessage} />}
            <Stack spacing={4}>
                <Box>
                <FormControl id="firstName" isRequired>
                    <FormLabel>Your Name</FormLabel>
                    <Input type="text" placeholder="Pau Gasol" onChange={(event) => handleChangeName(event)} />
                </FormControl>
                </Box>
            <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="example@email.com" onChange={(event) => handleChangeEmail(event)}/>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input type={showPassword ? "text" : "password"} placeholder="*******" onChange={(event) => handleChangePassword(event)} />
                <InputRightElement h={"full"}>
                    <Button
                    variant={"ghost"}
                    onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <Icon as={AiFillEye} /> : <Icon  as={AiFillEyeInvisible}/>}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
                <Button type="submit" loadingText="Submitting" size="lg" bg={"green.500"} color={"white"} _hover={{  background: "green.300" }}  onClick={(event) => handleSignUpBtnClick(event)}>
                Sign up
                </Button>
            </Stack>
            <Stack pt={6}>
                <Text align={"center"}>
                Already a user? <Link color={"blue.400"} onClick={() => navigate("/login")}  >Login</Link>
                </Text>
            </Stack>
            </Stack>
        </Box>
        </Stack>
    </Flex>
    <Toaster  position="top-right"  />
    <Footer></Footer>

</VStack>
    
        
  );

    function handleSignUpBtnClick(event) {
      event.preventDefault();
      attemptRegistration();
    }
  
  
    function attemptRegistration() {
      const signUpEndPoint = "http://localhost:8080/api/users/register";
      const data = JSON.stringify(
          {
              "name": name,
              "email": email,
              "password": password
          }
      );

      axios.post(
          signUpEndPoint,
          data,
          {
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }
      ).then((response) => {
          let usr = response.data.userId;
          toast.success("Welcome " + response.data.name + " 🥳 Enjoy the city ")
          navigate("/all-activities", {state: {authorised: true, userId: usr, isUserMenu: false}});
      })
      .catch((error) => {
          
          setIsSignUpError(true);
          setSignUpErrorMessage(error.response.data.message)
      });
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }
  
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
  




}