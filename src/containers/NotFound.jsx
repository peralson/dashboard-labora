import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

// PNG
import monstruito from '../assets/img/monstruito.png'

const NotFound = () => {
  const { currentUser } = useAuth()

  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} px={4}>
        <Image src={monstruito} alt={"Monstruito"} w={"160px"} />
        <Text mb={2} fontSize={30} fontWeight={"bold"}>Pues vaya...</Text>
        <Text color={"grey.dark"} fontSize={19} mb={6}>No hemos podido entrontrar lo que buscas.</Text>
        <Link to="/">
            <Text color={"accent"}>{currentUser ? "Volver a Ofertas" : "Volver a Login"}</Text>
        </Link>
    </Flex>
  )
}

export default NotFound
