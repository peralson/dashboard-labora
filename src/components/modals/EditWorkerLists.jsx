import React, { useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import MultipleSelectList from '../ui/MultipleSelectList';

// Redux & Actions
import { connect } from 'react-redux';
import { editTags } from '../../store/actions/tags';
import { editCategories } from '../../store/actions/categories';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { Checkbox } from '@chakra-ui/react';

const EditWorkerLists = ({
  data,
  workers,
  type,
  handleShow,
  editTags,
  editCategories,
}) => {
  const title = type === 'tag' ? 'Etiquetas' : 'Categorías';
  const [selectedItems, setSelectedItems] = useState([]);
  const [option, setOption] = useState('');
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);

  const handleItems = (event) => {
    if (!selectedItems.includes(event.target.name)) {
      setSelectedItems([...selectedItems, event.target.name]);
    } else {
      setSelectedItems(selectedItems.filter((e) => e !== event.target.name));
    }
  };

  const handleOption = (e) => {
    setOption(e.target.name);
  };

  const handleSubmit = async () => {
    const userList = workers.map((e) => e.id);
    // setError(null);
    if (option && selectedItems.length > 0) {
      const action = option === 'Añadir' ? 'update' : 'remove';
      setLoading(true);
      if (type === 'tag') {
        await editTags(action, userList, selectedItems);
      } else {
        await editCategories(action, userList, selectedItems);
      }
      setLoading(false);
      handleShow(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Box>
      <Text mb='10px'>
        Editar {title.toLowerCase()} de los trabajadores seleccionados
      </Text>
      <Flex w='100%' direction='row'>
        <Flex
          flex={1}
          direction='column'
          bg='translucid'
          mr={2}
          p={2}
          borderRadius={10}
        >
          {workers.map((worker) => (
            <Text key={worker.id}>{worker.workerData.name}</Text>
          ))}
        </Flex>
        <Flex flex={1} w='100%' direction='column'>
          <MultipleSelectList
            title={option ? option : 'Acción'}
            bg={'darkLight'}
            borderColor={'translucid'}
            current={option}
            values={['Añadir', 'Eliminar']}
            onChange={handleOption}
          />
          <Flex direction='column' m={2}>
            {data.map((e) => (
              <Flex key={e}>
                <Checkbox name={e} onChange={handleItems} />
                <Text ml={2} flex={1} fontSize={14}>
                  {e}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex mt={4} justifyContent={'flex-end'}>
        <Flex
          _hover={{ cursor: 'pointer' }}
          bg={'accent'}
          borderRadius={8}
          fontWeight='bold'
          fontSize={14}
          mr={2}
          alignItems={'center'}
          px={4}
          py={2}
          onClick={handleSubmit}
        >
          Aceptar
        </Flex>
        <Flex
          _hover={{ cursor: 'pointer' }}
          bg={'red'}
          borderRadius={8}
          fontWeight='bold'
          fontSize={14}
          mr={2}
          alignItems={'center'}
          px={4}
          py={2}
          onClick={() => handleShow(false)}
        >
          Cancelar
        </Flex>
      </Flex>
      <AlertDialog isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent bg='darkLight'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Error
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex flexDirection='column'>
                <Text>{!option && 'Debes seleccionar una acción'}</Text>
                <Text>
                  {selectedItems.length <= 0 &&
                    'Debes seleccionar uno o varios elementos'}
                </Text>
              </Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button bg='translucid' onClick={() => setIsOpen(false)}>
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

const mapDispatchToProps = {
  editTags,
  editCategories,
};
const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkerLists);
