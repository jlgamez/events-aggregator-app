import { SimpleGrid, Box } from "@chakra-ui/react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'; 
import Card from "./Card";
import NotFound from "./NotFound";
import images from "./resources/images";



export default function ActivityGrid({ activities, isUserMenu }) {


    return (
        
        <Box m={"50px"} >
            <SimpleGrid minChildWidth={"300px"} spacingX={"50px"} spacingY={"50px"}  mb={"15rem"}  >
                {
                    activities.length === 0 ?
                    <NotFound />
                    :
                    activities.map((act) =>  <Card cardData={act} isUserMenu={isUserMenu}  imageUrl={loadRandomImg(act)}  key={act.uniqueCardId}  /> )
                }
            </SimpleGrid>
            <Toaster  position="top-right" />
        </Box>
    );


    function loadRandomImg(act) {
        let randomImgIndex;
        let imgUrl;
        // choose a random image according to category
        const categoryName = act.activity.category.name;

        if (categoryName === "music") {
            randomImgIndex = getRandomInt(0, (images.music.length - 1))
            imgUrl = images.music[randomImgIndex];
        } else if (categoryName === "sports") {
            randomImgIndex = getRandomInt(0, (images.music.length - 1));
            imgUrl = images.sports[randomImgIndex];
        } else if (categoryName === "city") {
            randomImgIndex = getRandomInt(0, (images.city.length - 1));
            imgUrl = images.city[randomImgIndex];
        } else if (categoryName === "culture") {
            randomImgIndex = getRandomInt(0, (images.culture.length - 1));
            imgUrl = images.culture[randomImgIndex];
        } else if (categoryName === "outdoors") {
            randomImgIndex = getRandomInt(0, (images.outdoors.length - 1));
            imgUrl = images.outdoors[randomImgIndex];
        }

        return imgUrl;
    }

    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }






    
}