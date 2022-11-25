import React from 'react'
import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Text,
    InputGroup,
    Input,
    InputRightAddon,
    Flex,
    SimpleGrid,
    Heading,
    Image, Stack, FormControl, Textarea,
    HStack
} from "@chakra-ui/react";
import axios from 'axios';
import CardA from '../UI/CardA';
const Padd = (prop) => {
    const [newP, setnewP] = useState({ disease_id: "", disease_name: "", doctor_consultes: "", date: "", disease_type: "" });
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const PHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const temp = { ...newP, [name]: value };
        setnewP(temp);
    }
    const submitHandler = async () => {
        try {
            await axios.post(`http://localhost:3300/disease/add/${localData.id}`, { ...newP, disease_id: Date.now() });
            prop.setPState(1);

        } catch (err) {
            console.log(err);
        }
    }
    const cancelHandler = () => {
        prop.setPState(1);

    }

    return (
        <>
            <Container centerContent >

                <CardA style="flex flex-col p-7 justify-between mt-20">

                    <Heading size='md' mb='2rem' fontWeight='normal' color='black'> Add Disease Details</Heading>
                    <Input placeholder='Disease Name' size='lg' bg='white' name='disease_name' onChange={PHandler} m='5px' border='1px' borderColor='black' />
                    <HStack>
                        <Input placeholder='Disease Type' size='lg' bg='white' name='disease_type' onChange={PHandler} m='5px' border='1px' borderColor='black' />
                        <Input size='lg' bg='white' name='date' onChange={PHandler} m='5px' border='1px' borderColor='black' type="datetime-local" />

                    </HStack>

                    <Input placeholder='Doctor Consulted' size='lg' bg='white' name='doctor_consulted' onChange={PHandler} m='5px' border='1px' borderColor='black' />
                    <HStack display='flex' justifyContent='center'>
                        <Button bgColor='black' color='white' onClick={submitHandler}>Submit</Button>
                        <Button bgColor='black' color='white' onClick={cancelHandler}>Cancel</Button>
                    </HStack>

                </CardA>
            </Container>



        </>
    )

}

export default Padd