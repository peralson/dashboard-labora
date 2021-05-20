import React, { useEffect, useState } from 'react';

// Chakra
import { Box, Flex, ListItem, Text } from '@chakra-ui/layout';
import { Checkbox, List, Button } from '@chakra-ui/react';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchWorkers } from '../store/actions/workers';
import { useSelector } from 'react-redux';

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import CustomTable from '../components/ui/CustomTable';
import SelectList from '../components/ui/SelectList';
import Popup from '../components/ui/Popup';

// Icon
import { MdShare, MdContentCopy, MdLink } from 'react-icons/md';

const Workers = ({ fetchWorkers }) => {
  const workers = useSelector((state) => state.workers.allWorkers);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // SEARCH LOGIC
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredWorkers = workers.filter((worker) => {
    if (category === '' && tag === '')
      return worker.name.toLowerCase().includes(search.toLowerCase());
    if (tag === '')
      return (
        worker.categories.includes(category) &&
        worker.name.toLowerCase().includes(search.toLowerCase())
      );

    if (category === '')
      return (
        worker.tags.includes(tag) &&
        worker.name.toLowerCase().includes(search.toLowerCase())
      );
    else
      return (
        worker.categories.includes(category) &&
        worker.tags.includes(tag) &&
        worker.name.toLowerCase().includes(search.toLowerCase())
      );
  });

  // CATEGORIES LOGIC
  const getCategories = () => {
    let categories = [];
    for (var i = 0; i < workers.length; i++) {
      for (var j = 0; j < workers[i].categories.length; j++) {
        if (!categories.includes(workers[i].categories[j])) {
          categories.push(workers[i].categories[j]);
        }
      }
    }
    return categories;
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // TAG LOGIC
  const getTags = () => {
    let tags = [];
    for (var i = 0; i < workers.length; i++) {
      for (var j = 0; j < workers[i].tags.length; j++) {
        if (!tags.includes(workers[i].tags[j])) {
          tags.push(workers[i].tags[j]);
        }
      }
    }
    return tags;
  };

  const handleTag = (event) => {
    setTag(event.target.value);
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

  console.log('list:', checkedItems);

  return (
    <>
      <Main>
        <Flex
          mb={4}
          flexDirection='row'
          alignItems='stretch'
          justifyContent='space-between'
          w='100%'
          h='35px'
          mt={4}
        >
          <SearchBar
            placeholder='Busca un trabajador'
            onChange={handleSearch}
          />
          <Box w='130px' ml={2} h='100%' borderRadius='4px' bg='darkLight'>
            <SelectList
              placeholder='Categorias'
              values={getCategories()}
              onChange={handleCategory}
            />
          </Box>
          <Box w='130px' ml={2} h='100%' borderRadius='4px' bg='darkLight'>
            <SelectList
              placeholder='Etiquetas'
              values={getTags()}
              onChange={handleTag}
            />
          </Box>
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
                      <ListItem key={worker.id}> - {worker.name}</ListItem>
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
            <Flex key={index} p={2}>
              <Flex justifyContent='center' flex={1}>
                <Checkbox
                  isChecked={checkedItems.includes(worker.id.toString())}
                  name={worker.id}
                  onChange={(e) => handleCheck(e.target.name)}
                />
              </Flex>
              <Text flex={4}>{worker.name}</Text>
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
      <Side></Side>
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
