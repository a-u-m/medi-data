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


                <Stack bg='teal.300' p='2rem' borderRadius="10px" display='flex' justifyContent='center' >
                    <Heading size='md' mb='2rem'>Please enter all the details</Heading>
                    <Input placeholder='Course Title' size='lg' bg='white' name='course_title' onChange={preHandler} />
                    <Input placeholder='Medication' size='lg' bg='white' name='medication' onChange={preHandler} />
                    <Input placeholder='Course Duration' size='lg' bg='white' name='course_duration' onChange={preHandler} type='number' />
                    <Input placeholder='Intervals' size='lg' bg='white' name='intervals' onChange={preHandler} />
                    <Textarea placeholder='Comment' size='lg' bg='white' name='comment' onChange={preHandler} />
                    <HStack display='flex' justifyContent='center'>
                        <Button bgColor='blue.400' color='white' onClick={submitHandler}>Submit</Button>
                        <Button bgColor='blue.400' color='white' onClick={cancelHandler}>Cancel</Button>


                    </HStack>

                </Stack>

            </Container>



        </>
    )
}

export default PreAdd;