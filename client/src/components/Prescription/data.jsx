import React from 'react'
import axios from "axios";
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
    Image, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { useEffect } from 'react';
import { useState } from 'react';
const Data = (prop) => {
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const [preData, setpreData] = useState([]);
    const fetchPre = async (localData) => {
        try {
            const tempPre = await axios.get(`http://localhost:3300/prescription/${localData.id}`);
            setpreData(tempPre.data);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPre(localData);
    }, [prop.preState])
    if (preData.length == 0) {
        return (<>
            <Heading>Loading</Heading>
        </>)
    }
    else {
        return (
            <>
                {preData[0] == 0 ? <Heading>No data</Heading> :
                    <Box className='border-[3px] border-black rounded-lg' >
                        <Table variant='striped' colorScheme='gray' size='lg'>
                            <TableCaption>Prescription Record</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Course Title</Th>
                                    <Th>Medication</Th>
                                    <Th>Course Duration</Th>
                                    <Th>Intervals</Th>
                                    <Th>Comment</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {preData.map((x) => {
                                    const { patient_id, course_title, medication, course_duration, intervals, comment } = x;
                                    return (
                                        <Tr key={patient_id}>
                                            <Td>{course_title}</Td>
                                            <Td>{medication}</Td>
                                            <Td>{course_duration}</Td>
                                            <Td>{intervals}</Td>
                                            <Td>{comment}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                }
            </>
        )
    }
}
export default Data;