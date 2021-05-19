import React, { useEffect, useState } from 'react';

// Chakra
import { Box, Flex, Text } from '@chakra-ui/layout';

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

const Workers = ({ fetchWorkers }) => {
  const workers = useSelector((state) => state.workers.allWorkers);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredWorkers = workers.filter((worker) => {
    if(category === '')
      return (
        worker.name.toLowerCase().includes(search.toLowerCase())
      
      );
    else{
      return (
        worker.categories.includes(category) &&  worker.name.toLowerCase().includes(search.toLowerCase())
      )
    }
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
          <Box
            w='130px'
            ml={2}
            h='100%'
            borderRadius='4px'
            bg='darkLight'
          ></Box>
        </Flex>
        <CustomTable columns={['Nombre', 'Categoría', 'Etiquetas']}>
          {filteredWorkers.map((worker, index) => (
            <Flex key={index} p={2}>
              <Box flex={1}></Box>
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