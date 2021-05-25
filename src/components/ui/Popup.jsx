import React from 'react';

// Chakra
import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex
} from '@chakra-ui/react';

// Components
import Separator from './Separator';

const Popup = ({ mainButton, title, children }) => {
  const [scrollBehavior] = React.useState('inside');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen}>
        {mainButton}
      </Flex>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent bg='darkLight'>
          <ModalHeader>{title}</ModalHeader>
          <Separator />
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Enviar
            </Button>
            <Button colorScheme='red' onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
