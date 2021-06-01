import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Text
} from '@chakra-ui/react';

const Popup = ({ body, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Flex onClick={() => setIsOpen(true)}>
        {children}
      </Flex>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent bg='darkLight' p={4}>
          <Text fontSize={19} mb={4} fontWeight={"bold"}>
            {title}
          </Text>
          <ModalCloseButton _focus={{ borderWidth: 0 }}  />
          {body}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
