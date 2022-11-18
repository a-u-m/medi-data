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

const Tadd = (prop) => {
    const [newT, setnewT] = useState({ Test_id: "", Test_title: "", Treatment_provider: "", date: "", cost: "", Doctor_name: "", Result: "" });
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const THandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const temp = { ...newT, [name]: value };
        setnewT(temp);
    }
    const submitHandler = async () => {
        try {
            await axios.post(`http://localhost:3300/test/add/${localData.id}`, { ...newT, Test_id: Date.now() });
            prop.setTState(1);
        } catch (err) {
            console.log(err);
        }
    }
    const cancelHandler = () => {
        prop.setTState(1);

    }

    return (
        <>
            <Container centerContent >

                <CardA style="flex flex-col p-7 justify-between mt-20">

                    <Heading size='md' mb='2rem' fontWeight='normal' color='black'> Add Medical Test Details</Heading>
                    <Input placeholder='Test Title' size='lg' bg='white' name='Test_title' onChange={THandler} m='5px' border='1px' borderColor='black' />
                    <HStack>
                        <Input placeholder='Treatment Provider' size='lg' bg='white' name='Treatment_provider' onChange={THandler} m='5px' border='1px' borderColor='black' />
                        <Input size='lg' bg='white' name='date' onChange={THandler} m='5px' border='1px' borderColor='black' type="datetime-local" />

                    </HStack>

                    <Input placeholder='Doctor name' size='lg' bg='white' name='Doctor_name' onChange={THandler} m='5px' border='1px' borderColor='black' />
                    <Input placeholder='Result' size='lg' bg='white' name='Result' onChange={THandler} m='5px' border='1px' borderColor='black' />
                    <Input placeholder='Cost' size='lg' bg='white' name='cost' onChange={THandler} m='5px' border='1px' borderColor='black' />
                    <HStack display='flex' justifyContent='center'>
                        <Button bgColor='black' color='white' onClick={submitHandler}>Submit</Button>
                        <Button bgColor='black' color='white' onClick={cancelHandler}>Cancel</Button>


                    </HStack>

                </CardA>
            </Container>



        </>
    )
}

export default Tadd