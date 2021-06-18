import React from "react";
import { Text, Flex } from "@chakra-ui/react";

// Custom
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout().then(() => history.push("/login"));
  };

  return (
    <Flex w={"100%"} my={10}>
      <Text
        onClick={handleLogout}
        fontSize={14}
        color={"red.full"}
        cursor={"pointer"}
        _hover={{ bg: "red.smooth" }}
        borderRadius={8}
        py={1}
        px={2}
      >
        Cerrar sesión
      </Text>
    </Flex>
  );
};

export default Logout;
