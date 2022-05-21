import { Badge, Box, Button, HStack, Image, Text, Icon, IconButton, Center, Flex, } from "@chakra-ui/react";
import {MdLocationOn} from 'react-icons/md';
import {BsCalendarCheck, BsFillBookmarkStarFill} from 'react-icons/bs'
import {FaTrashAlt} from 'react-icons/fa';
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'; 




export default function Card({cardData, isUserMenu, imageUrl}) {

    const [userActivityMenu] = useState(isUserMenu);
    const [displayCard, updateDisplayCard] = useState(true);
    const [bookmarked, setBookmarked] = useState(false); 



    return(
        <Center>
            {
                displayCard &&
                <Box m={"20px"} w={"300px"}rounded="20px"  overflow={"hidden"} boxShadow="2xl" bg={"gray.50"}_hover={{ transform: 'scale(1.1)', transition: "all 0.2s ease-in-out"}} >
                <Image  src={imageUrl} alt="card image" />
                <Box p={"25px"}  >
                    <Box>
                        <HStack justify={"space-between"}>
                            <Badge colorScheme={selectCategoryColor()} variant="subtle" rounded={"lg"} px="2" > {cardData.activity.category.name.toUpperCase()} </Badge>
                            {
                                userActivityMenu
                                ? <IconButton icon={<FaTrashAlt />} variant={"outline"} size={"sm"} colorScheme={"red"} onClick={() => handleDeleteButtonClick()}></IconButton>
                                : <IconButton icon={<BsFillBookmarkStarFill />} variant={"outline"} size={"sm"} colorScheme={"pink"} bg={ bookmarked && "pink.100" } onClick={() => handleBookMarkClick()}></IconButton>
                            }
                        </HStack>
                        <Text mt={"10px"} mb={"10px"} textTransform="uppercase" fontWeight={"bold"} fontSize={"small"} >
                            {cardData.activity.title}
                        </Text>
                        <Text fontSize="smaller" fontWeight={"normal"} noOfLines={[2,3]}>
                            {cardData.activity.description}
                        </Text>
                    </Box>
                    
                    <Box mt={"20px"} >
                        <HStack mb={"5px"} justify={"left"}>
                            <Icon as={MdLocationOn} color={"gray.400"} boxSize={"22px"}></Icon>
                            <Text fontSize="smaller" color={"gray.500"}>
                                {cardData.activity.location}
                            </Text>
                        </HStack>
                        <HStack mt={"5px"} ml={"3px"} justify={"left"}>
                            <Icon as={BsCalendarCheck} color={"gray.400"} boxSize={"17px"}></Icon>
                            <Text fontSize="smaller" color={"gray.500"}>
                                {cardData.activity.date}
                            </Text>
                        </HStack>
                        <Flex mt={"30px"} flexDirection="row" justifyContent={"center"} >
                            <Button size={"md"} colorScheme={userActivityMenu ? "orange" : "teal" } onClick={() => handleBookBtnClick()} >Book</Button>
                        </Flex>
                    </Box>
                </Box>    
            </Box>
            
            }
            <Toaster  position="top-right"  />    
        </Center>
    );



    function handleBookBtnClick() {
        const bookUrl = cardData.activity.bookingLink;
        window.open(bookUrl, "_blank")
    }

    function selectCategoryColor() {
        const categoryName = cardData.activity.category.name;

        if (categoryName === "music") {
            return "purple";
        } else if (categoryName === "sports"){
            return "blue";
        } else if(categoryName === "culture") {
            return "orange";
        } else if (categoryName === "outdoors"){
            return "green";
        } else if (categoryName === "city") {
            return "teal"
        }
    }

    function handleDeleteButtonClick() {
        const userActivityId = cardData.userActivityId;
        const deleteUserActivityEndPoint = "http://localhost:8080/api/user-activities/delete?userActivityId=" + userActivityId;

        // request to delete current user activity
        axios.delete(
            deleteUserActivityEndPoint, 
            {
                headers: {
                    Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
              }
            }
        
        ).then((response) => {
            console.log(response.data);
            updateDisplayCard(false);
        })
        .catch((error) => console.log(error.response.data));

    }

    function handleBookMarkClick() {
        // if card is bookmarked already, throw a toaster
        if (bookmarked) {
            toast.error("You have already bookmarked this activity");
            return;
        }

        const saveUserActivityEndPoint = "http://localhost:8080/api/user-activities/add-new";
        const activityId = cardData.activity.id;
        const userId = cardData.requestor.requestorId;
        
        const requestBody = JSON.stringify({
            "userId": userId,
            "activityId": activityId
        });

        // post request to save a new user activiry
        axios.post(
            saveUserActivityEndPoint, 
            requestBody,
            {
                headers: {
                    Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
              }
            }
        
        ).then((response) => console.log(response.data))
        .catch((error) => console.log(error.response.data));
        // change background color of the button to indicate it's bookemarked
        setBookmarked(true);

    }

    
    





}