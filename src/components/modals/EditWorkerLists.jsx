import React, { useState } from 'react';
import { Flex, Text, Box, Grid, Checkbox } from "@chakra-ui/react";

// Redux & Actions
import { connect } from 'react-redux';
import { editTags } from '../../store/actions/tags';
import { editCategories } from '../../store/actions/categories';

// Components
import ErrorMessage from '../ui/ErrorMessage'

const EditWorkerLists = ({
  data,
  workers,
  type,
  handleShow,
  editTags,
  editCategories,
}) => {
  const title = type === "tag" ? "Etiquetas" : "Categorías";
  const [selectedItems, setSelectedItems] = useState([]);
  const [option, setOption] = useState("Añadir");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isValid = option && selectedItems.length > 0

  const handleItems = (event) => {
    if (!selectedItems.includes(event.target.name)) {
      setSelectedItems([...selectedItems, event.target.name]);
    } else {
      setSelectedItems(selectedItems.filter((e) => e !== event.target.name));
    }
  };

  const handleSubmit = async () => {
    if (isValid) {
      setError(null)
      setLoading(true);
      const userList = workers.map((e) => e.id);
      const action = option === 'Añadir' ? 'update' : 'remove';
      const dispatch = type === 'tag' ? editTags : editCategories;

      try {
        await dispatch(action, userList, selectedItems);
        handleShow(false);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      {error && (
        <ErrorMessage
          title={"Ha ocurrido un error"}
          onClose={() => setError(null)}
          noMargin
          mb={4}
        />
      )}
      <Text fontSize={12} color={"primary"}>
        TRABAJADORES A EDITAR
      </Text>
      {workers.length === 1 && (
        <Text fontSize={14}>
          {workers[0].workerData.name}
        </Text>
      )}
      {workers.length === 2 && (
        <Text fontSize={14}>
          {workers[0].workerData.name} y {workers[1].workerData.name}
        </Text>
      )}
      {workers.length > 2 && (
        <Text fontSize={14}>
          {workers[0].workerData.name}, {workers[1].workerData.name} y {workers.length - 2} más
        </Text>
      )}
      <Grid my={4} templateColumns={"1fr 1fr"} gap={2}>
        <Text
          textAlign={"center"}
          _hover={{ borderColor: 'white' }}
          cursor={'pointer'}
          borderRadius={8}
          fontWeight={"bold"}
          borderWidth={2}
          fontSize={14}
          borderColor={option === "Añadir" ? "white" : "translucid"}
          px={3}
          py={2}
          onClick={() => setOption("Añadir")}
        >
          Añadir
        </Text>
        <Text
          textAlign={"center"}
          _hover={{ borderColor: 'white' }}
          cursor={'pointer'}
          borderRadius={8}
          fontWeight={"bold"}
          borderWidth={2}
          fontSize={14}
          borderColor={option === "Eliminar" ? "white" : "translucid"}
          px={3}
          py={2}
          onClick={() => setOption("Eliminar")}
        >
          Eliminar
        </Text>
      </Grid>
      <Text fontWeight={"bold"} mb={3}>
        Selecciona {title}
      </Text>
      <Grid templateColumns={"1fr 1fr"} gap={2}>
        {data.map((item, index) => (
          <Flex key={index}>
            <Checkbox name={item.name} onChange={handleItems} />
            <Text ml={2} flex={1}>
              {item.name}
            </Text>
          </Flex>
        ))}
      </Grid>
      <Flex mt={4} justifyContent={"flex-end"}>
        <Flex
          _hover={{ cursor: isValid && "pointer" }}
          bg={"accent"}
          borderRadius={8}
          fontWeight={"bold"}
          fontSize={14}
          alignItems={"center"}
          px={4}
          py={2}
          opacity={!isValid && 0.6}
          onClick={isValid ? handleSubmit : undefined}
        >
          {loading
            ? `Editando ${title.toLowerCase()}...`
            : `Editar ${title.toLowerCase()}`
          }
        </Flex>
      </Flex>
    </Box>
  );
};

const mapDispatchToProps = {
  editTags,
  editCategories,
};

export default connect(null, mapDispatchToProps)(EditWorkerLists);
