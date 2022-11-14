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
            return (<Data preState={preState} />);
        }
    }
    const addHandler = () => {
        setpreState(2);
    }
    return (
        <>
            <Navbar />
            <Container centerContent>
                <Heading m='3rem'>Drugs Prescription</Heading>
                {preDisplay(preState)}
                <Image src='add.png' position='absolute' right='5rem' top='39rem' boxSize='70px' onClick={addHandler} ></Image>
            </Container>
        </>
    )
}
export default Prescription