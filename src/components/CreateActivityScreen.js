import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddActivityForm from "./AddActivityForm";



export default function CreateActivityScreen() {
    let navigationOrigin = useLocation();
    // initialise origin data to check if is null (in case user is coming without login)
    const originData = navigationOrigin.state;
    // if the user comes wihtout login we set the user Id to a fake one so the API doesn't fetch data
    // if there is login, we take the passed userId
    const userIdentification = ((originData === null) ? -100 : navigationOrigin.state.userId);
    let navigate = useNavigate();
    


    useEffect(() => {
            if (originData === null) {
                navigate("/login");
                return;
            } 
        }
    );

    // show the all-activities screen when the user is logged in
    return (
        <AddActivityForm userIdentification={userIdentification}/>
    );


}