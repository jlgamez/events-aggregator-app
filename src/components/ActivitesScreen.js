import { Box, } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useCallback} from "react";
import ActivityGrid from "./ActivityGrid";
import Footer from "./Footer";
import NavBar from "./NavBar";



export default function ActivitiesScreen({userMenu, userNumber}) {

    // get authorised, userId, and isUserMenu params set in an object from 
    // previous component with useLocation hook
    let userId = userNumber;
    const isUserMenu = userMenu;
    

    // state variable
    const [activities, setActivities] = useState([]);
    

    // declare fetchig data function before the useEffect so it can be called by useEffect
    const fetchData = useCallback(async () => {
        var endPoint = "http://localhost:8080/api";
        
        if (isUserMenu) {
            endPoint += "/user-activities/?userId=" + userId;
        } else {
            endPoint += "/activities";
        }
        const response = await axios.get(
            endPoint,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            }
        );
        const activitiesFromApi = response.data;
        // adapt activities data for card rendering and set them in the component state
        const addaptedActivities = addaptActivities(activitiesFromApi);
        console.log(addaptedActivities)
        setActivities(addaptedActivities);
    }, [])

    useEffect(() => {
        // take the data from the API when the page loads 
        // and put them in the component state
        fetchData();
    }, []);
    
    
    return (
        <Box >
            <NavBar 
                currentMenu={ isUserMenu ? "user" : "all"} 
                isSearchBar={true} 
                afterSearchDo={(newActivities) => handleSearchFromNavBar(newActivities)}
                userId={userId}
            >
            </NavBar>
            {
                <ActivityGrid activities={activities} isUserMenu={isUserMenu} />
                
            }
            
            <Footer></Footer>
        </Box>
        
    );


    // function to update the ActivitiesScreen state 
    //( in this case the array of activities to render as cards)
    // this handler function is passed to the child comp (<NavBar />) 
    // from that child comp the funtion is called after a search is done

    function handleSearchFromNavBar(newArrayOfActivities) {
        // first if the search result is no activities found, exit the function
        if (newArrayOfActivities.length === 0) {
            return;
        }

        //  adapt the activities coming from the search result
        const addaptedNewActivities = addaptActivities(newArrayOfActivities);
        // update the state with the new activites (the component will re-render)
        setActivities(addaptedNewActivities);

    }

    

    function addaptActivities(activitiesList) {
        var adaptedActivities = [];
        // Addapt each activity object to include a "requestorId"
        // (the userId of the user that has the session) 
        // and a "requestorEmail" user email when visualising the user menu
        var requestor = {};
        //add userId to requestor object
        requestor.requestorId = userId;
       

        for (let i = 0; i < activitiesList.length; i++) {
            const currentAct = activitiesList[i];
            var activityData = {};

            if (isUserMenu) {
                // add userEmail to requestor object
                requestor.requestorEmail = currentAct.user.email; 
                // (access the activity data at the "activity" object in the API response)
                activityData = currentAct.activity;

            } else {
                // (access the activity data directly at the API response object)
                activityData = currentAct;
            } 

            // provide the final activity object (with a unique id to be displayed in cards)
            var modifiedAct = {
                uniqueCardId: i,
                requestor: requestor,
                activity: activityData
            };

            // if we are in user menu add the userActivityId to the activity object
            if (isUserMenu) {
                modifiedAct.userActivityId = currentAct.id;
            }
            
            // append the adapted activity object to the list of data
            adaptedActivities.push(modifiedAct)
        }
    
        return adaptedActivities;
    }


    
}