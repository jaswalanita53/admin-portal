import React, { useState } from 'react';
import { Container,  Heading,  } from "@chakra-ui/react";
import {  FaQuestionCircle } from "react-icons/fa";
import "../../assets/css/custom.css"
import { description1,description2 } from './assets/description';
import TabsCom from './Tabs';
import FadeLoader from "react-spinners/FadeLoader";
const BaseRate = () => {
    const [loading, setIsloading] = useState(false)
    let props = {loading, setIsloading}

    
  const handleTabsComLoaded = () => {
    // Callback function to update the loading state
    setIsloading(false);
  };
    return (
        
            <div className="wrapper-main" >
                {   
                loading ? 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <FadeLoader color="#38B2AC" />
                </div>
                 :
                <Container maxW='container.xxl' p={10} backgroundColor="#ecf2f9">
                    <Heading size="lg" alignItems='center' display="flex" className="headingPanel" gap={2} color='#000' mb="4">
                        <span>Rates and Availability / Base Rates</span> <FaQuestionCircle pt="6" fontSize="12px" color='#3366ff' />
                    </Heading>
                    <p style={{ 'color': '#000', 'fontSize': '12px' }} >{description1}</p>
                    <p style={{ 'color': '#000', 'fontSize': '12px', 'marginBottom': '20px' }}><b>Important:</b> {description2}<a href='' style={{ 'color': '#3366ff' }}>Click here for more information</a></p>
                  <TabsCom props={props}/>
                </Container>
                }
            </div>
        )
}
export default BaseRate;
