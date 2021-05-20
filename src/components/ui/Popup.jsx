import React from 'react';

// Chakra
import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// Components
import Separator from './Separator';

const Popup = ({ mainButton, leftIcon, title, children }) => {
  const [scrollBehavior] = React.useState('inside');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        ml='40px'
        bg='transparent'
        h='25px'
        outline='none'
        colorScheme='ghost'
        _focus={{ borderColor: 'none' }}
        onClick={onOpen}
        leftIcon={leftIcon}
      >
        {mainButton}
      </Button>

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
            <Button colorScheme='red'>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
