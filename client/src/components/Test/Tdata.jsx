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
} from "@chakra-ui/react";
const Tdata = () => {
    return (
        <>
            <Heading pl='2rem' pt='1rem' pb='1rem' fontWeight='normal'>Medical Test</Heading>
            <Box pl='2rem' pr='2rem' display='flex' justifyContent='space-between' w='100%' >
                <Box w='28%' h='300px' bg='white' borderRadius='5px'>
                </Box>
                <Table w='71%' style={{ borderSpacing: '0 5px', borderCollapse: 'separate' }}>

                    <Thead>
                        <Tr bg='white'>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr bg='white'>
                            <Td mt='2rem'>inches</Td>
                            <Td mt='2rem'>millimetres (mm)</Td>
                            <Td mt='2rem' isNumeric>25.4</Td>
                        </Tr>
                        <Tr bg='white'>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr bg='white'>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>

                </Table>

            </Box>
        </>

    )
}

export default Tdata