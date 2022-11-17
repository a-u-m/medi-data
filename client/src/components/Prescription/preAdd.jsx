import React from 'react'
import { useState } from 'react';
import addIcon from "../../assets/add.png";
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
const PreAdd = (prop) => {
    const [newPre, setnewPre] = useState({ prescription_id: "", course_title: "", medication: "", course_duration: "", intervals: "", comment: "" });
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const preHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const temp = { ...newPre, [name]: value };
        setnewPre(temp);
    }
    const submitHandler = async () => {
        try {
            await axios.post(`http://localhost:3300/prescription/add/${localData.id}`, { ...newPre, prescription_id: Date.now() });
            prop.setpreState(1);
        } catch (err) {
            console.log(err);
        }
    }
    const cancelHandler = () => {
        prop.setpreState(1);

    }

    return (
        <>
            <Container centerContent>

                <CardA style="flex flex-col p-7 justify-between ">

                    <Heading size='md' mb='2rem' fontWeight='normal' color='black'> Add Prescription Details</Heading>
                    <Input placeholder='Course Title' size='lg' bg='white' name='course_title' onChange={preHandler} m='5px' border='1px' borderColor='black' />
                    <Input placeholder='Medication' size='lg' bg='white' name='medication' onChange={preHandler} m='5px' border='1px' borderColor='black' />
                    <Input placeholder='Course Duration' size='lg' bg='white' name='course_duration' onChange={preHandler} type='number' m='5px' border='1px' borderColor='black' />
                    <Input placeholder='Intervals' size='lg' bg='white' name='intervals' onChange={preHandler} m='5px' border='1px' borderColor='black' />
                    <Textarea placeholder='Comment' size='lg' bg='white' name='comment' onChange={preHandler} m='5px' border='1px' borderColor='black' />
                    <HStack display='flex' justifyContent='center'>
                        <Button bgColor='black' color='white' onClick={submitHandler}>Submit</Button>
                        <Button bgColor='black' color='white' onClick={cancelHandler}>Cancel</Button>


                    </HStack>

                </CardA>
            </Container>



        </>
    )
}

export default PreAdd;