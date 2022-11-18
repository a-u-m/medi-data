import React from 'react'
import { Box, Button, Container, Text, InputGroup, Input, InputRightAddon, Flex, SimpleGrid, Heading, Image } from "@chakra-ui/react";
import Data from '../components/Prescription/data';
import PreAdd from '../components/Prescription/preAdd';
import { useState } from 'react';
import Navbar from '../components/Navbar';
const Prescription = () => {
    const [preState, setpreState] = useState(1);
    const preDisplay = (preState) => {
        if (preState == 2) {
            return (<PreAdd setpreState={setpreState} />);
        }
        if (preState == 1) {
            return (<Data preState={preState} setpreState={setpreState} />);
        }
    }
    const addHandler = () => {
        setpreState(2);
    }
    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
                <Container centerContent  >
                    <Heading m='3rem' fontWeight='normal'>Drugs Prescription</Heading>
                    {preDisplay(preState)}
                    <Image src='add.png' position='fixed' right='4vw' top='83vh' boxSize='70px' onClick={addHandler} ></Image>
                </Container>
            </div>
        </>
    )
}
export default Prescription