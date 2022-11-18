import React from "react";
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
const Data = (prop) => {
  const localData = JSON.parse(window.localStorage.getItem("loginState"));
  const [preData, setpreData] = useState([]);
  const fetchPre = async (localData) => {
    try {
      const tempPre = await axios.get(
        `http://localhost:3300/prescription/${localData.id}`
      );
      setpreData(tempPre.data);
      console.log(preData);
    } catch (err) {
      console.log(err);
    }
  };
  const preDelHandler = async (prescription_id) => {
    console.log(prescription_id);

    try {
      const deldata = await axios.post(
        "http://localhost:3300/prescription/delete",
        { pre_id: prescription_id }
      );
      console.log(deldata.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPre(localData);
  }, [prop.preState]);

  if (preData.length == 0) {
    return (
      <>
        <Box display="flex" justifyContent="center">
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
        {preData[0] == 0 ? (
          <Heading fontWeight='normal' mt='11rem' fontSize='lg'>No Prescription Details</Heading>
        ) : (
          <Box className="border-[3px] border-black rounded-lg">
            <Table variant="striped" colorScheme="teal" size="lg">
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
                  const {
                    prescription_id,
                    patient_id,
                    course_title,
                    medication,
                    course_duration,
                    intervals,
                    comment,
                  } = x;
                  return (
                    <Tr key={patient_id}>
                      <Td>{course_title}</Td>
                      <Td>{medication}</Td>
                      <Td>{course_duration}</Td>
                      <Td>{intervals}</Td>
                      <Td>{comment}</Td>
                      <Td>
                        {
                          <AiFillDelete
                            size="20px"
                            onClick={() => {
                              preDelHandler(prescription_id);
                            }}
                          />
                        }
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        )}
      </>
    );
  }
};
export default Data;