import { Box, Heading, VStack, Text, Flex, Button, Icon,  } from "@chakra-ui/react";
import { ImPower } from 'react-icons/im';
import {GiSpiderBot, GiVintageRobot} from 'react-icons/gi';
import { FaAddressCard, FaPowerOff } from 'react-icons/fa';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

 



export default function MainPage() {
    // navigation hook
    let navigate = useNavigate();

    return(
        <Flex  flexDirection={"colunn"} width="full" justifyContent={"center"} bg={"orange.100"}  >
            <VStack width={"inherit"}  >
                <Box mt={"5rem"} p="2rem" >
                    <Heading textAlign={"center"} lineHeight={"short"} fontSize="5xl" textColor={"gray.800"}  > 
                        The best Barcelona experience is <br />
                        <Text textColor={"green.500"}>
                            on Activify
                        </Text>
                    </Heading>
                    <Flex flexDir={"row"} justifyContent="center" fontWeight="semibold">
                        <Text textAlign={"center"}  maxW={"45rem"} p="2rem" textColor={"gray.600"} >
                        Barcelona is is open for you. Come and get the best it has to offer!
                        Wether you just moved in to Barcelona or are here just for vacations, you will  connect with the city at the deepest level with Activify. We scan Barcelona's culture, sports, clubs and much more and bring it all to you.
                        </Text>
                    </Flex>
                    <Flex flexDirection={"row"} justifyContent="center">
                        <Button mr={"1rem"} width="8rem" bg={"green.500"} color={"white"} _hover={{ bg: '#00cc99', transform: 'scale(1.1)'}} onClick={() => handleLoginClick()} >Log in</Button>
                        <Button ml={"1rem"} width="8rem" bg={"green.500"} color={"white"} _hover={{ bg: '#00cc99', transform: 'scale(1.1)'}} onClick={() => handleLearnMoreClick()} >Learn more</Button>
                    </Flex>
                </Box>
                <Box bg={"gray.800"} width="full" pt={"2rem"}  >
                    <Flex flexDir={"row"} justify={"space-around"} pb="8rem" >
                        <VStack >
                            <Icon as={ImPower} color="gray.100" boxSize={"3rem"} > </Icon>
                            <Box maxW={"14rem"} m={"1rem"} >
                                <Text textAlign="center" fontSize={"1.2rem"} fontWeight="bold" lineHeight={"2rem"} textColor="green.500" >
                                    One site to rule them all 
                                </Text >
                                <Text textAlign={"center"} textColor="gray.100" >
                                    All the hidden activities in the Barcelona with a couple clicks. With Activify, all the city life is in one place.
                                </Text>
                            </Box>
                        </VStack>
                        <VStack>
                            <Icon as={GiSpiderBot} color="gray.100" boxSize={"3rem"} > </Icon>
                            <Box maxW={"14rem"} m={"1rem"} >
                                <Text textAlign="center" fontSize={"1.2rem"} fontWeight="bold" lineHeight={"2rem"} textColor="green.500" >
                                    Powered by bots
                                </Text>
                                <Text textAlign={"center"} textColor="gray.100">
                                    Our python spies crawl Barcelona's cyberspace to bring you the latest events.
                                    Leverage the web-scraping technology to stay up to date.
                                </Text>
                            </Box>
                        </VStack>
                        <VStack>
                            <Icon as={FaAddressCard} color="gray.100" boxSize={"3rem"} > </Icon>
                            <Box maxW={"14rem"} m={"1rem"} >
                                <Text textAlign="center" fontSize={"1.2rem"} fontWeight="bold" lineHeight={"2rem"} textColor="green.500" >
                                    Visualise the city life
                                </Text>
                                <Text textAlign={"center"} textColor="gray.100">
                                    All relevant information is in beautifully designed cards so you'll never miss out on what Barcelona has to offer.
                                </Text>
                            </Box>
                        </VStack>
                    </Flex>
                    <VStack mb={"3rem"}>
                        <Text mb={"2rem"} textAlign={"center"} textColor={"green.500"} fontSize="3rem" fontWeight={"bold"}  >
                            Ready to discover the city? 🤟
                        </Text>
                        <Button  leftIcon={<FaPowerOff />} h="4rem" width={"8rem"} _hover={{transform: "scale(1.2)"}} onClick={() => handleSignUpClick()} >Sign up! </Button>
                    </VStack>
                    <Footer  />
                </Box>
                
            </VStack>
        </Flex>
            
    );

    function handleLoginClick() {
        navigate("/login");
    }

    function handleLearnMoreClick() {
        window.open("https://es.wikipedia.org/wiki/Barcelona", "_blank");
    }

    function handleSignUpClick() {
        navigate("/register");
    }
}