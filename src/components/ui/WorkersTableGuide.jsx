import React, { useState } from 'react';
import { Flex, Text, Checkbox } from '@chakra-ui/react';

// Components
import Popup from './Popup';
import EditWorkerLists from '../modals/EditWorkerLists';

const WorkersTableGuide = ({
  isChecked,
  isIndeterminate,
  handleGlobalCheck,
  checkedItems,
  tags,
  categories
}) => {
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [catModalOpen, setCatModalOpen] = useState(false);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      pl={4}
      mt={2}
      mb={1}
    >
      <Flex flex={2} alignItems={"center"} py={3}>
        <Checkbox
          isChecked={isChecked}
          isIndeterminate={isIndeterminate}
          onChange={handleGlobalCheck}
        />
        <Text
          fontWeight={"medium"}
          fontSize={14}
          ml={2}
          onClick={handleGlobalCheck}
          cursor={"pointer"}
        >
          {isChecked || isIndeterminate
            ? "Anular selección"
            : "Seleccionar todos"}
        </Text>
      </Flex>
      {checkedItems.length > 0 && (
        <Flex alignItems={"center"}>
          <Popup
            title={"Editar Etiquetas"}
            body={
              <EditWorkerLists
                data={tags.map((e) => e.id)}
                workers={checkedItems}
                type="tag"
                handleShow={setTagModalOpen}
              />
            }
            show={tagModalOpen}
            handleShow={setTagModalOpen}
          >
            <Text
              _hover={{ borderColor: "white" }}
              mr={3}
              cursor={"pointer"}
              borderRadius={8}
              fontSize={14}
              px={3}
              py={2}
              borderWidth={1}
              borderColor={"darkLight"}
              onClick={() => setTagModalOpen(true)}
            >
              Editar Etiquetas
            </Text>
          </Popup>
          <Popup
            title={"Editar categorias"}
            body={
              <EditWorkerLists
                data={categories.map((cat) => cat.id)}
                workers={checkedItems}
                type="categories"
                handleShow={setCatModalOpen}
              />
            }
            show={catModalOpen}
            handleShow={setCatModalOpen}
          >
            <Text
              _hover={{ borderColor: "white" }}
              cursor={"pointer"}
              borderRadius={8}
              fontSize={14}
              borderWidth={1}
              borderColor={"darkLight"}
              px={3}
              py={2}
              onClick={() => setCatModalOpen(true)}
            >
              Editar Categorías
            </Text>
          </Popup>
        </Flex>
      )}
    </Flex>
  );};

export default WorkersTableGuide;
