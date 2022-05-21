import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActivitiesScreen from "./ActivitesScreen";



export default function UserMenu() {
    let navigationOrigin = useLocation();
    // initialise origin data to check if is null (in case user is coming without login)
    const originData = navigationOrigin.state;
    // if the user comes wihtout login we set the user Id to a fake one so the API doesn't fetch data
    // if there is login, we take the passed userId
    const userIdentification = ((originData === null) ? -100 : navigationOrigin.state.userId);
    let navigate = useNavigate();

    useEffect(()=>{

        if (originData === null) {
            navigate("/login");
            return;
        } 
    });


    return (
        <ActivitiesScreen userMenu={true} userNumber={userIdentification} />
    );
    

}