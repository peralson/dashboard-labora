import React, { useEffect, useState } from 'react';

// Chakra
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/react';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchWorkers } from '../store/actions/workers';

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import CustomTable from '../components/ui/CustomTable';
import SelectList from '../components/ui/SelectList';

const Workers = ({
  fetchWorkers,
  workers
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [checkedItems, setCheckedItems] = useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

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

  const handleCheck = (value) => {
    
  };


  return (
    <>
      <Main>
        <Flex
          mb={4}
          flexDirection='row'
          alignItems='stretch'
          mt={4}
        >
          <SearchBar
            placeholder='Busca un trabajador'
            onChange={handleSearch}
          />
          <SelectList
            placeholder='Categorias'
            flex="1"
            ml={2}
            values={getCategories()}
            onChange={handleCategory}
          />
          <SelectList
            placeholder='Etiquetas'
            flex="1"
            ml={2}
            values={getTags()}
            onChange={handleTag}
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
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
          >Seleccionar todos</Checkbox>
        </Flex>
        <CustomTable columns={['Nombre', 'Categoría', 'Etiquetas']}>
          {filteredWorkers.map((worker, index) => (
            <Flex key={index} p={2}>
              <Flex justifyContent='center' flex={1}>
                <Checkbox
                  isChecked={checkedItems[{index}]}
                  onChange={(e) => setCheckedItems([e.target.checked, checkedItems[{index}]])}
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
