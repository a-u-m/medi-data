import React from 'react'
import { Box, Button, Container, Text, InputGroup, Input, InputRightAddon, Flex, SimpleGrid, Heading, Image } from "@chakra-ui/react";
import Tdetails from '../components/Test/Tdata';
import Tadd from '../components/Test/Tadd';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const Test = () => {
    const [TState, setTState] = useState(1);
    const TDisplay = (TState) => {
        if (TState == 2) {
            return (<Tadd setTState={setTState} />);
        }
        if (TState == 1) {
            return (<Tdetails TState={TState} setTState={setTState} />);
        }
    }
    const addHandler = () => {
        setTState(2);
    }
    return (
        <>
            <Box centerContent w='100vw' h='100vh' bg='#ebebeb'>
                <Navbar />
                {TDisplay(TState)}
                <Image src='add.png' position='fixed' right='4vw' top='83vh' boxSize='70px' onClick={addHandler} ></Image>
            </Box>
        </>
    )
}
export default Test