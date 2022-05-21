import { Box, Button, Flex, FormControl, FormLabel, Text, Heading, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Select from 'react-select'
import moment from 'moment';
import LoginErrorMessage from "./LoginErrorMessage";
import NavBar from "./NavBar";
import Footer from "./Footer";
import toast, { Toaster } from 'react-hot-toast'; 
import { useNavigate } from "react-router-dom";


export default function AddActivityForm({userIdentification}) {
    
    // hook to navigate to other pages
    let navigate = useNavigate();

    const userId = userIdentification;


    const [categoryObjsFromDatabase, setCategoryObjsFromDatabase] = useState([]);
    const [categoriesOpts, updateCategoriesOpts] = useState([]);
    const [isInputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // establish activity data in the state
    const[title, updateTitle] = useState("");
    const[location, updateLocation] = useState("");
    const[category, updateCategory] = useState("");
    const[date, updateDate] = useState("");
    const[description, updateDescription] = useState("");
    const[link, updateLink] = useState("");

    
    const fetchCategories = useCallback(async () => {
        var categoryDropDownOpts = [];

        const getCategoriesEndPoint = "http://localhost:8080/api/categories";
        const response = await axios.get(getCategoriesEndPoint);
        const categoriesArray = response.data;

        // first save the raw categories objects (later the id will be used)
        setCategoryObjsFromDatabase(categoriesArray);

        for (var i = 0; i < categoriesArray.length; i++) {
            const curerntCategory = categoriesArray[i];
            // capitalise the string for the value shown to the user
            const capitalisedCategoryName = (curerntCategory.name.charAt(0).toUpperCase()) + (curerntCategory.name.slice(1))
            const opt = {
                label: capitalisedCategoryName,
                value: curerntCategory.name
            };
            categoryDropDownOpts.push(opt);
        }
        
        updateCategoriesOpts(categoryDropDownOpts);

    },[]);  


    useEffect(() => {
        // take the categories from the API when the page loads 
        // and put them in the component state
        fetchCategories();
    }, []);

    

    return (
        <VStack>
            <NavBar currentMenu={"add-event"} isSearchBar={false}  userId={userId} />
            <Heading  fontSize={"4xl"} textAlign={"center"} textColor="green.500"  > Thanks for helping! </Heading>
            <Text> After submitting the information of your event everyone will see it in a card! 🤩 </Text>
            <Flex p={"2rem"} width="full"  justifyContent="center" >
                <Box borderRadius={"2xl"}  boxShadow="lg" background={"gray.50"} p="2rem"  >
                    { isInputError && <LoginErrorMessage message={errorMessage} /> }
                    <HStack  m="1rem">
                        <FormControl id="event_title" isRequired mr="1rem" >
                            <FormLabel>Title</FormLabel>
                            <Input background={"white"} placeholder="Provide the name of the event.."  onChange={(e) => handleTitleChange(e)} />
                        </FormControl>
                        <FormControl id="event_location" isRequired  ml="1rem">
                            <FormLabel> Location </FormLabel>
                            <Input background={"white"} placeholder="Street, square, park.." onChange={(e) => handleLocationChange(e) } />
                        </FormControl>
                    </HStack>
                    <HStack  m="1rem" >
                        <FormControl id="event_category" isRequired mr="1rem" >
                            <FormLabel  > Category </FormLabel>
                            <Select options={categoriesOpts} defaultValue=""  onChange={(e) => handleCategoryeChange(e)} > </Select>
                        </FormControl>
                        <FormControl id="event_date"  isRequired  ml="1rem">
                            <FormLabel  > Date </FormLabel>
                            <Input background={"white"} placeholder="yyyy-mm-dd"  onChange={(e) => handleDateChange(e) } />
                        </FormControl>
                    </HStack>
                    <Box  m={"1rem"} >
                        <FormControl id="event_dscription"  isRequired   >
                            <FormLabel  > Description </FormLabel>
                            <Textarea  bg={"white"} placeholder="Provide a brief description of the event.."  onChange={(e) => handleDescriptionChange(e)} />
                        </FormControl>
                    </Box>
                    <Box m={"1rem"} >
                        <FormControl  id="booking_link" isRequired>
                            <FormLabel>Booking link</FormLabel>
                            <Input background={"white"} placeholder="https://example-link.com"  onChange={(e) => handleLinkChange(e)}  />
                        </FormControl>
                    </Box>
                    <HStack m={"1.2rem"} pt="1rem" justifyContent={"space-between"} >   
                        <Button  w={"5rem"} colorScheme={"red"} onClick={() => handleCancel()}  >Cancel</Button>
                        <Button  w={"5rem"}   colorScheme={"green"} onClick={() => handleSubmission()}  >Save</Button>
                    </HStack>
                </Box>
            </Flex>
            <Footer />
            <Toaster position="top-right" />
            
        </VStack>


    );

    function handleCancel() {
        // redirect user to all activities screen
        navigate("/all-activities", {state: {authorised: true, userId: userId}})

    }


    function handleSubmission() {
        // check title is provided
        if(isInfoProvided(title, "Please provide a title")) {
            updateTitle(title.trim());
        } else {
            return;
        }

        // check Location
        if (isInfoProvided(location, "Please provide a location")) {
            updateLocation(location.trim());
        } else {
            return;
        }

        //check category
        if (isInfoProvided(category, "Please select a category")) {
            updateCategory(category.trim());
        } else {
            return;
        }


        // check date format
        
        if(isDateCorrect(date)) {
            updateDate(date.trim());
        } else {
            return;
        }

        // check description
        if(isInfoProvided(description, "Please provide a description")) {
            updateDescription(description.trim());
        } else {
            return;
        }

        // check booking link
        if (isInfoProvided(link, "Please provide a booking link")) {
            updateLink(link.trim());
        } else {
            return;
        }
        
        // when previous checks pass, inject the data in the DB
        saveActivity();

    }

    // check the date format
    function isDateCorrect(dateProvided) {
        const processedDate = dateProvided.trim();
        const dateCorrect = moment(processedDate, "YYYY-MM-DD", true).isValid();
        if (!dateCorrect) {
            setErrorMessage("Please provide a date in YYYY-MM-DD format");
            setInputError(true);
        }
        return dateCorrect;
    }

    function isInfoProvided(info, errorString) {
        let isValid = true;
        const processedInfo = info.trim();
        if (processedInfo === ""){
            isValid = false;
            setErrorMessage(errorString);
            setInputError(true);

            console.log("The info checked is: " + info + " error msg: " + errorString);
        }
        return isValid;
    }

    function saveActivity() {
        // first get the category id
        var categoryId = 0;
        for (var i = 0; i < categoryObjsFromDatabase.length; i++) {
            const catName = categoryObjsFromDatabase[i].name;
            if (catName === category.toLowerCase()) {
                categoryId = categoryObjsFromDatabase[i].id;
                break;
            }
        }

        // produce the request body
        const bodyData = {
            title: title,
            description: description,
            date: date,
            location: location,
            bookingLink: link,
            categoryId: categoryId
        };

        // send the post request
        const saveActivityEndPoint = "http://localhost:8080/api/activities/add-new";
        axios.post(
            saveActivityEndPoint,
            bodyData,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            }
        ).then((response) => {
            console.log(response.data)
            toast.success("Great! you've created a new activity 😎")
            navigate("/all-activities", {state: {authorised: true, userId: userId}})
            
        })
        .catch((error) => {
            setInputError(true);
            setErrorMessage(error.response.data.message);
            toast(error.response.data.message + " 🤔")
        });
    
    }

    function handleTitleChange(e) {
        updateTitle(e.target.value.trim());

    }

    function handleCategoryeChange(e) {
        updateCategory(e.value.trim());
    }

    function handleLocationChange(e) {
        updateLocation(e.target.value.trim());
    }

    function handleDateChange(e) {
        updateDate(e.target.value.trim());
    }

    function handleDescriptionChange(e) {
        updateDescription(e.target.value.trim());
    }

    function handleLinkChange(e) {
        updateLink(e.target.value.trim());
    }

   

    
}