import React from 'react'
import {
    Box, Button, Container, Text, InputGroup, Input, InputRightAddon, Flex, SimpleGrid, Heading, Image, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Select,
    VStack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
const Tdetails = (prop) => {
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const [TData, setTData] = useState([]);
    const [Overview, setOverview] = useState({ total: 0, negative: 0, positive: 0 });
    const fetchT = async (localData) => {
        try {
            const tempT = await axios.get(
                `http://localhost:3300/test/${localData.id}`
            );
            setTData(tempT.data);
        } catch (err) {
            console.log(err);
        }
    };
    const TOverview = async (localData) => {
        try {
            const o = await axios.get(`http://localhost:3300/test/overview/${localData.id}`);
            setOverview({ total: o.data[0][0].total, negative: o.data[2][0].negative, positive: o.data[1][0].positive })


        } catch (err) {
            console.log(err);
        }
    }
    const TDelHandler = async (Test_id) => {
        try {
            const deldata = await axios.post(
                "http://localhost:3300/test/delete",
                { Test_id: Test_id }
            );

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const selectHandler = async (e) => {
        try {
            if (e.target.value === 'option1') {
                const temp = await axios.get(`http://localhost:3300/test/recent/${localData.id}`);
                setTData(temp.data);
            }
            else if (e.target.value === 'option2') {
                const temp = await axios.get(`http://localhost:3300/test/positive/${localData.id}`);
                setTData(temp.data);

            }
            else if (e.target.value === 'option3') {
                const temp = await axios.get(`http://localhost:3300/test/negative/${localData.id}`);
                setTData(temp.data);
            }


        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        fetchT(localData);
        TOverview(localData);
    }, [prop.TState]);

    if (TData.length == 0) {
        return (
            <>
                <Box display="flex" justifyContent="center" mt='6rem'>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        mt="25vh"
                    >
                        <svg
                            className="animate-spin h-5 w-5 mr-3 bg-[black]"
                            viewBox="0 0 24 24"
                        ></svg>
                        loading
                    </Box>
                </Box>
            </>
        );
    } else {
        return (
            <>
                {TData[0] == 0 ? (<Box w='100vw' fontWeight='normal' mt='18rem' fontSize='lg' textAlign='center'>No Medical Test Details</Box>
                ) :
                    <>
                        <Heading pl='2rem' pt='1rem' pb='1rem' fontWeight='normal'>Medical Test</Heading>


                        <Box pl='2rem' pr='2rem' display='flex' justifyContent='space-between' w='100%' >
                            <VStack w='28%' h={['40vh', '30vh', '25vh']}>
                                <Select placeholder='Select option' w='100%' bg='white' onClick={selectHandler}>
                                    <option value='option1' >Most recent</option>
                                    <option value='option2'>Positive</option>
                                    <option value='option3'>Negative</option>
                                </Select>

                                <Box bg='white' borderRadius='5px' w='100%' p='10px'>
                                    <Heading fontWeight='normal' fontSize='xl' m='5px'>Overview</Heading>
                                    <Text ml='5px' mt='0.5rem' fontWeight='medium'>Total Number of Medical Tests: {Overview.total}</Text>
                                    <Text ml='5px' mt='0.5rem' fontWeight='medium'>Total Number of Positive Results: {Overview.positive}</Text>
                                    <Text ml='5px' mt='0.5rem' fontWeight='medium'>Total Number of Negative Results: {Overview.negative}</Text>

                                </Box>

                            </VStack>





                            <Table w='71%' style={{ borderSpacing: '0 5px', borderCollapse: 'separate' }} h='40px'>

                                <Thead>
                                    <Tr bg='white' boxShadow='1px 0.5px gray' borderRadius='5px'>
                                        <Th>Test Title</Th>
                                        <Th>Treatment Provider</Th>
                                        <Th >Doctor Name</Th>
                                        <Th >Result</Th>
                                        <Th >Cost</Th>
                                        <Th >Date</Th>
                                        <Th ></Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {TData.map((x) => {
                                        const {
                                            Test_id,
                                            patient_id,
                                            Test_title,
                                            Treatment_provider,
                                            cost,
                                            Doctor_name,
                                            date,
                                            Result
                                        } = x;
                                        return (
                                            <Tr key={patient_id} bg='white' boxShadow='1px  0.5px  gray' borderRadius='5px'>
                                                <Td>{Test_title}</Td>
                                                <Td>{Treatment_provider}</Td>
                                                <Td>{Doctor_name}</Td>
                                                <Td>{Result}</Td>
                                                <Td>{cost}</Td>
                                                <Td>{date}</Td>
                                                <Td>
                                                    {
                                                        <AiFillDelete
                                                            size="20px"
                                                            onClick={() => {
                                                                TDelHandler(Test_id);
                                                            }}
                                                        />
                                                    }
                                                </Td>
                                            </Tr>
                                        );
                                    })}

                                </Tbody>
                            </Table>

                        </Box></>}

            </>

        )
    }

}

export default Tdetails