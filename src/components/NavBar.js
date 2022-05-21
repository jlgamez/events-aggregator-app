import { Box, HStack, IconButton, Input, Icon, VStack, Button, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiFillHome } from 'react-icons/ai'
import Select from 'react-select';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";




export default function NavBar({currentMenu, isSearchBar, afterSearchDo, userId }) {
    // navigate hook to travel to other component routes
    let navigate = useNavigate();

    // options for the user drop down menu
    const options = {
        user: { label: "My activities", value: "My activities"},
        all: { label: "All activities", value: "All activities"},
        createEvent: {label: "Create activity", value: "Create activity"},
        signOut: { label: "Sign out", value: "Sign out"}
    };
        
    // state vatiables
    const [menu] = useState(currentMenu);
    const [displaySearchBar] = useState(isSearchBar);
    const user = userId;
    const [searchBarValue, updateSearchBarValue] = useState("");



    return(
        <Box  width={"full"}  pl="2rem" pt="0.5rem" pr="2rem" pb={"1rem"} bg={"gray.800"} >
            <HStack justify={displaySearchBar ? "space-around" : "space-between"} >
                <IconButton icon={<AiFillHome />}   boxSize={"3rem"} onClick={() => handleHomeBtnClick()} ></IconButton>
                {
                    displaySearchBar &&
                    <Flex flexDirection={"row"} width={"50rem"} alignItems="center" >
                        <InputGroup>
                        <Input backgroundColor={"white"}  m={"1rem"}   onChange={(event) => handleChageSearchBar(event)}  onKeyDown={(event) => handleKeyDown(event)} placeholder="Search events by keywords or category..." />
                        <InputRightElement h={"full"} >
                            <Button id="keyword_search_btn" onClick={() => handleSearchClick(true)} >
                                <Icon  as={BsSearch} />
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        
                        <VStack m={"1rem"} >
                            <Button  id = "category_search_btn" colorScheme={"green"} size="md" onClick={() => handleSearchClick(false)} >Category search</Button>
                        </VStack>
                    </Flex>
                }
                <Box width="14rem" bg={"inherit"} >
                    <HStack>
                        <Icon as={FaUserCircle}  color="white" boxSize="2.5rem" ></Icon>
                        <Select  
                            defaultValue={() => setMenuValue()} 
                            options={[options.all, options.user, options.createEvent, options.signOut]}  
                            onChange={(event) => handleMenuSelectChange(event.value)} >
                        </Select>
                    </HStack>
                </Box>
            </HStack>
        </Box>
    );


    // set value in user dropdown
    function setMenuValue() {
        if (menu === "user") {
            return options.user;
        }

        if (menu === "all") {
            return options.all;
        }

        if (menu === "signOut") {
            return options.signOut;
        }

        if (menu === "add-event") {
            return options.createEvent;
        }
    }

    function handleKeyDown(e) {
        (e.key === "Enter") && handleSearchClick(true);
    }


    function handleSearchClick(isKeywordSearch) {
        // exit function if the value in the search bar is empty
        // for sets of strings that contain empty strs, the API will remove those
        if (searchBarValue.trim().length === 0) {
            return;
        }

        // depending on wether the user is searching activities or his own activities
        // the end point varies
        var endPoint = "http://localhost:8080/api"
        if (menu === "user") {
            endPoint += "/user-activities";
        } else if (menu === "all") {
            endPoint += "/activities";
        }
        
        // depending on value of isKeywordSearch the search will
        // be against a different endpoint and the name of the array
        // containing the terms will be different
    
        
        if (isKeywordSearch) {
            endPoint += "/search-by-keywords";
            (menu === "user") && (endPoint += "?userId=" + user)
            const keywordsArray = splitInputInWords(searchBarValue);
            const searchData = {
                "keywords": keywordsArray
            };
            performSearch(endPoint, searchData);

        } else {
            endPoint += "/search-by-categories";
            (menu === "user") && (endPoint += "?userId=" + user)
            const keywordsArray = splitInputInWords(searchBarValue);
            const searchData = {
                "categories": keywordsArray
            };
            performSearch(endPoint, searchData);
        }
    }


    function performSearch(searchEndPoint, data) {

        axios.post(
            searchEndPoint,
            data,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
              }
        ).then((response) => {
            console.log(response.data)
            // update parent state with new activities
            afterSearchDo(response.data);
        })
        .catch((error) => console.log(error.response.data.message));

    }

    function splitInputInWords(string) {
        const initialWordsArray = string.split(" ");
        var finalWordsArray = [];

        for (var i = 0; i < initialWordsArray.length; i++) {
            const w = initialWordsArray[i];
            if (w !== "") {
                finalWordsArray.push(w);
            }
        }
        
        console.log(finalWordsArray);
        return finalWordsArray;
    }

    function handleChageSearchBar(event) {
        updateSearchBarValue(event.target.value);
    }

    function handleMenuSelectChange(selectedMenu) {
        if(selectedMenu === "My activities") {
            navigate("/user-menu", {state: {authorised: true, userId: user}});
        } else if (selectedMenu ==="All activities") {
            navigate("/all-activities", {state: {authorised: true, userId: user}});
        } else if (selectedMenu === "Create activity") {
            navigate("/create-activity", {state: {authorised: true, userId: user}});
        } else if (selectedMenu === "Sign out") {
            navigate("/");
        }

    }

    function handleHomeBtnClick() {
        navigate("/all-activities",  {state: {authorised: true, userId: user}})

    }



    

}