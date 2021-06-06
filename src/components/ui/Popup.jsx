import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";

const Popup = ({ body, title, children, show, handleShow }) => {
  return (
    <>
      <Flex onClick={() => handleShow(true)}>{children}</Flex>

      <Modal
        closeOnOverlayClick={false}
        isOpen={show}
        onClose={() => handleShow(false)}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent bg="darkLight" p={4}>
          <Text fontSize={19} mb={4} fontWeight={"bold"}>
            {title}
          </Text>
          <ModalCloseButton _focus={{ borderWidth: 0 }} />
          {body}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
