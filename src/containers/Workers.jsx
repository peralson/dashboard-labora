import React, { useEffect, useState } from 'react';

// Chakra
import { Box, Flex, ListItem, Text } from '@chakra-ui/layout';
import { Checkbox, List, Button, Image } from '@chakra-ui/react';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchWorkers } from '../store/actions/workers';

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import CustomTable from '../components/ui/CustomTable';
import MultipleSelectList from '../components/ui/MultipleSelectList';
import SelectList from '../components/ui/SelectList';
import Popup from '../components/ui/Popup';
import Separator from '../components/ui/Separator';
import SideSection from '../components/ui/SideSection';

// Icon
import {
  MdShare,
  MdContentCopy,
  MdLink,
  MdKeyboardArrowRight,
} from 'react-icons/md';

const Workers = ({ fetchWorkers, workers }) => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [focusedWorker, setFocusedWorker] = useState();

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);


  // SEARCH LOGIC
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredWorkers = workers.filter((worker) => {
    if (categories.length === 0 && tags.length === 0)
      return worker.workerData.name.toLowerCase().includes(search.toLowerCase());
    if (tags.length === 0 && categories.length > 0)
      return (
        categories.every((e) => worker.categories.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    if (categories.length === 0 && tags.length > 0)
      return (
        tags.every((e) => worker.tags.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    else
      return (
        categories.every((e) => worker.categories.includes(e)) &&
        tags.every((e) => worker.tags.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
  });


  // CATEGORIES LOGIC
  const getCategories = () => {
    var categoryList = [];
    for (var i = 0; i < workers.length; i++) {
      for (var j = 0; j < workers[i].categories.length; j++) {
        if (!categoryList.includes(workers[i].categories[j])) {
          categoryList.push(workers[i].categories[j]);
        }
      }
    }
    return categoryList;
  };

  const handleCategories = (event) => {
    if (!categories.includes(event.target.name)) {
      setCategories([...categories, event.target.name]);
    } else {
      setCategories(categories.filter((e) => e !== event.target.name));
    }
  };

  // TAG LOGIC
  const getTags = () => {
    var tagList = [];
    for (var i = 0; i < workers.length; i++) {
      for (var j = 0; j < workers[i].tags.length; j++) {
        if (!tagList.includes(workers[i].tags[j])) {
          tagList.push(workers[i].tags[j]);
        }
      }
    }
    return tagList;
  };

  const handleTags = (event) => {
    if (!tags.includes(event.target.name)) {
      setTags([...tags, event.target.name]);
    } else {
      setTags(tags.filter((e) => e !== event.target.name));
    }
  };

  // CHECKBOX LOGIC
  const allChecked = checkedItems.length === workers.length;
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheck = (value) => {
    if (!checkedItems.includes(value)) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((e) => e !== value));
    }
  };

  const handleGlobalCheck = () => {
    if (checkedItems.length === 0) {
      setCheckedItems(filteredWorkers.map(({ id }) => id.toString()));
    } else {
      setCheckedItems([]);
    }
  };

  // FOCUSED WORKER LOGIC
  const handleFocusedWorker = (worker) => {
    setFocusedWorker(worker);
  };

  return (
    <>
      <Main>
        <Flex marginY={4} flexDirection='row' alignItems='stretch'>
          <SearchBar
            placeholder='Busca un trabajador'
            onChange={handleSearch}
          />
          <MultipleSelectList
            title='Categorías'
            flex='1'
            ml={2}
            current={categories}
            values={getCategories()}
            onChange={handleCategories}
          />
          <MultipleSelectList
            title='Etiquetas'
            flex='1'
            ml={2}
            current={tags}
            values={getTags()}
            onChange={handleTags}
          />
        </Flex>
        <Flex
          mb={4}
          flexDirection='row'
          alignItems='center'
          justifyContent='flex-start'
          w='100%'
          h='40px'
          pl={4}
          bg='darkLight'
          borderRadius={4}
        >
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={handleGlobalCheck}
          >
            {checkedItems.length === 0
              ? 'Seleccionar todos'
              : 'Eliminar selección'}
          </Checkbox>
          {checkedItems.length > 0 && (
            <Popup
              leftIcon={<MdShare />}
              mainButton={<Text>Compartir enlace</Text>}
              title='Compartir enlace'
            >
              <Text mb='10px'>
                Vas a invitar a tu lista a los siguientes trabajadores:
              </Text>
              <List spacing={3}>
                {workers.map(
                  (worker) =>
                    checkedItems.indexOf(worker.id.toString()) >= 0 && (
                      <ListItem key={worker.id}> - {worker.workerData.name}</ListItem>
                    )
                )}
                <Button
                  size='md'
                  height='48px'
                  width='100%'
                  bg='translucid'
                  color='grey'
                  _focus={{ borderColor: 'none' }}
                >
                  <Flex
                    w='100%'
                    justifyContent='space-between'
                    alignContent='center'
                  >
                    <MdLink /> https://wa.me/1XXXXXXXXXX? <MdContentCopy />
                  </Flex>
                </Button>
              </List>
            </Popup>
          )}
        </Flex>
        <CustomTable columns={['Nombre', 'Categoría', 'Etiquetas']}>
          {filteredWorkers.map((worker, index) => (
            <Flex
              key={index}
              p={2}
              cursor='pointer'
              onClick={() => handleFocusedWorker(worker)}
            >
              <Flex justifyContent='center' flex={1}>
                <Checkbox
                  isChecked={checkedItems.includes(worker.id.toString())}
                  name={worker.id}
                  onChange={(e) => handleCheck(e.target.name)}
                />
              </Flex>
              <Text flex={4}>{worker.workerData.name}</Text>
              <Text flex={4}>{worker.categories[0]}</Text>
              <Text flex={4}>{worker.tags[0]}</Text>
              <Box flex={2}></Box>
              <Text textAlign='right' flex={6}>
                Ver más
              </Text>
            </Flex>
          ))}
        </CustomTable>
      </Main>
      <Side>
        {focusedWorker && (
          <Flex
            w='100%'
            bg='darkLight'
            marginY={4}
            p={4}
            borderRadius={4}
            flexDirection='column'
          >
            <Flex flexDirection='row'>
              <Image
                borderRadius='full'
                boxSize='75px'
                src={focusedWorker.workerData.images.profesional}
                alt={focusedWorker.workerData.name}
              />
              <Flex
                w='100%'
                justifyContent='center'
                flexDirection='column'
                ml='10px'
              >
                <Text fontSize={24}>{focusedWorker.workerData.name}</Text>
                <Text>{focusedWorker.categories[0]}</Text>
              </Flex>
            </Flex>
            <Separator top='15px' bottom='15px' />
            <SideSection type='column' title='Contacto'>
              <Text>{focusedWorker.email}</Text>
              <Text>{focusedWorker.phone}</Text>
            </SideSection>
            <SideSection type='wrap' title='Etiquetas' onClick='clickHandler'>
              {focusedWorker.tags.map((e) => (
                <Box
                  borderRadius='4px'
                  mr='5px'
                  mb='5px'
                  key={e}
                  paddingX='20px'
                  paddingY='10px'
                  bg='dark'
                  color='white'
                >
                  {e}
                </Box>
              ))}
            </SideSection>
            {focusedWorker.history && (
              <SideSection type='row' title='Últimos trabajos'>
                {focusedWorker.history.map((e) => (
                  <Box
                    borderRadius='4px'
                    mr='5px'
                    key={e.id}
                    paddingX='20px'
                    paddingY='10px'
                    mb='10px'
                    bg='dark'
                    color='white'
                    cursor='pointer'
                    w='100%'
                  >
                    <Flex
                      w='100%'
                      flexDirection='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Text>
                        {e.data.eventName} ({e.data.category})
                      </Text>
                      <MdKeyboardArrowRight borderColor='red' />
                    </Flex>
                  </Box>
                ))}
              </SideSection>
            )}
          </Flex>
        )}
      </Side>
    </>
  );
};

const mapDispatchToProps = {
  fetchWorkers,
};

const mapStateToProps = (state) => {
  return {
    workers: state.workers.allWorkers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);
