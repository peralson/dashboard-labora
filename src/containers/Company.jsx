import React from 'react';
import { Flex } from "@chakra-ui/react";

// Custom
import { useAuth } from "../context/AuthContext";

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import DeleteButton from "../components/ui/DeleteButton";

const Company = ({ history }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Main>
        <Flex w={"100%"} my={10}>
          <DeleteButton onDelete={handleLogout} type={"la oferta"}>
            Cerrar sesión
          </DeleteButton>
        </Flex>
      </Main>
      <Side></Side>
    </>
  );
};

export default Company;
