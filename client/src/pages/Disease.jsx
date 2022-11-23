import React from 'react'
import { Box, Button, Container, Text, InputGroup, Input, InputRightAddon, Flex, SimpleGrid, Heading, Image } from "@chakra-ui/react";
import Pdata from '../components/Disease/Pdata';
import Padd from '../components/Disease/Padd';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const Disease = () => {
    const [PState, setPState] = useState(1);
    const PDisplay = (PState) => {
        if (PState == 2) {
            return (<Padd setPState={setPState} />);
        }
        if (PState == 1) {
            return (<Pdata PState={PState} setPState={setPState} />);
        }
    }
    const addHandler = () => {
        setPState(2);
    }
    return (
        <>
            <Box centerContent w='100vw' h='100vh' bg='#ebebeb'>
                <Navbar />
                {PDisplay(PState)}
                <Image src='add.png' position='fixed' right='4vw' top='83vh' boxSize='70px' onClick={addHandler} ></Image>
            </Box>
        </>
    )
}

export default Disease