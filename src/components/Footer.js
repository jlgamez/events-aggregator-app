import { Box, HStack, VStack, Text, Link, Flex, Badge, Heading, Container} from "@chakra-ui/react";





export default function Footer() {

    return (
        <VStack width={"full"}  bg="blackAlpha.900" p={"2rem"} >
            <HStack justify={"space-around"} width="inherit"  pb={"3rem"}>
                <VStack align={"start"}>
                    <Text color={"green.500"} fontWeight="extrabold" >About us </Text>
                    <Link color={"white"}>The company</Link>
                    <Flex flexDirection={"row"}  >
                        <Link color={"white"}>Latest features     </Link>
                        <Badge ml={"1rem"} variant="subtle" rounded={"lg"} px="2" colorScheme={"purple"} > New </Badge>
                    </Flex>
                    
                    <Link color={"white"}>The team (it's actually one person)</Link>
                    <Link color={"white"}>Contact </Link>
                </VStack>
                <VStack   align={"start"}> 
                    <Text color={"green.500"} fontWeight="extrabold" >Support </Text> 
                    <Link  color={"white"} > Help Center </Link>
                    <Link color={"white"} >Learning center </Link>
                    <Link color={"white"} >Useful tutorials </Link>
                    <Link color={"white"} >Privacy policy </Link>
                    
                </VStack >
                <VStack   align={"start"}> 
                    <Text color={"green.500"} fontWeight="extrabold" >Follow us </Text> 
                    <Link  color={"white"} > Facebook </Link>
                    <Link color={"white"} >Instagram </Link>
                    <Link color={"white"} > Twitter </Link>
                    <Link color={"white"} > We will never have TikTok </Link>
                </VStack >
                <Heading textAlign={"center"} textColor={"green.500"}> Activify 👍</Heading>
            </HStack>
            
            <Box width={"full"} mt="5rem" padding="3rem" borderTop={"1px"}  borderTopColor={"gray.500"}>
                <Text textAlign={"center"} textColor="gray.300" fontWeight={"bold"} > © 2022 José Luis Gámez. All rights reserved </Text>
            </Box>
            
        </VStack>
            
    );
}