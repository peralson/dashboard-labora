import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import Popup from "./Popup";

const AreYourSure = ({ onDelete, type }) => (
  <Flex alignItems={"flex-start"} flexDirection={"column"}>
    <Text mb={6} flex={1}>
      Esta acción no es reversible. Si borras{type ? ` ${type}` : ""}, no podrás
      volver atrás.
    </Text>
    <Text
      py={2}
      px={3}
      borderRadius={10}
      fontSize={14}
      cursor={"pointer"}
      bg="red.smooth"
      color={"red"}
      onClick={onDelete}
    >
      Estoy seguro, borrar{type ? ` ${type}` : ""}
    </Text>
  </Flex>
);

const DeleteButton = ({ onDelete, children, type }) => {
  const [open, setOpen] = useState(false);;;
  return (
    <Popup
      title={"¿Estas seguro?"}
      body={<AreYourSure onDelete={onDelete} type={type} />}
      show={open}
      handleShow={setOpen}
    >
      <Text
        py={2}
        px={3}
        borderRadius={10}
        fontSize={14}
        cursor={"pointer"}
        _hover={{ bg: "red.smooth" }}
        color={"red"}
      >
        {children}
      </Text>
    </Popup>
  );
};

export default DeleteButton;
