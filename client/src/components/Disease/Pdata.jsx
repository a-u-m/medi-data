import React from 'react'
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
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
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
const Pdata = (prop) => {
    const localData = JSON.parse(window.localStorage.getItem("loginState"));
    const [PData, setPData] = useState([]);
    const [Overview, setOverview] = useState({ total: 0, negative: 0, positive: 0 });
    const fetchP = async (localData) => {
        try {
            const tempP = await axios.get(
                `http://localhost:3300/disease/${localData.id}`
            );
            setPData(tempP.data);
            console.log(PData);
        } catch (err) {
            console.log(err);
        }
    };
    const POverview = async (localData) => {
        try {
            const o = await axios.get(`http://localhost:3300/test/overview/${localData.id}`);
            setOverview({ total: o.data[0][0].total, negative: o.data[2][0].negative, positive: o.data[1][0].positive })


        } catch (err) {
            console.log(err);
        }
    }
    const PDelHandler = async (disease_id) => {
        try {
            const deldata = await axios.post(
                "http://localhost:3300/disease/delete",
                { disease_id: disease_id }
            );

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchP(localData);
        // POverview(localData);
    }, [prop.PState]);

    if (PData.length == 0) {
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
                {PData[0] == 0 ? (<Box w='100vw' fontWeight='normal' mt='18rem' fontSize='lg' textAlign='center'>No Medical History Details</Box>
                ) :
                    <>
                        <Heading pl='2rem' pt='1rem' pb='1rem' fontWeight='normal' ml='37%'>Medical History</Heading>
                        <Box pl='2rem' pr='2rem' display='flex' justifyContent='center' w='100%' >

                            <Table w='71%' style={{ borderSpacing: '0 5px', borderCollapse: 'separate' }} h='40px'>

                                <Thead>
                                    <Tr bg='white' boxShadow='1px 0.5px gray' borderRadius='5px'>
                                        <Th>Disease Name</Th>
                                        <Th>Disease Type</Th>
                                        <Th >Doctor Consulted</Th>
                                        <Th >Date</Th>
                                        <Th ></Th>
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {PData.map((x) => {
                                        const {
                                            disease_id,
                                            patient_id,
                                            disease_name,
                                            disease_type,
                                            doctor_consulted,
                                            date

                                        } = x;
                                        return (
                                            <Tr key={patient_id} bg='white' boxShadow='1px  0.5px  gray' borderRadius='5px'>
                                                <Td>{disease_name}</Td>
                                                <Td>{disease_type}</Td>
                                                <Td>{doctor_consulted}</Td>
                                                <Td>{date}</Td>
                                                <Td>
                                                    {
                                                        <AiFillDelete
                                                            size="20px"
                                                            onClick={() => {
                                                                PDelHandler(disease_id);
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

export default Pdata