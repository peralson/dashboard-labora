import React, { useEffect } from 'react';

// Chakra
import { Box, Flex, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux'
import { fetchWorkers } from '../store/actions/workers'

// Components
import PageGrid from '../components/main/PageGrid';
import Menu from '../components/main/Menu';
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import CustomTable from '../components/ui/CustomTable';

const Workers = ({
  fetchWorkers,
  workers
}) => {
  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  const handleSearch = e => {
    console.log(e.target.value);
  }

  return (
    <PageGrid>
      <Menu />
      <Main>
        <Flex mb={4} flexDirection='row' alignItems="stretch" justifyContent="space-between" w='100%' h='35px'>
          <SearchBar placeholder='Busca un trabajador' onChange={handleSearch} />
          <Box w='120px' ml={2} h='100%' borderRadius="4px" bg='darkLight'></Box>
          <Box w='120px' ml={2} h='100%' borderRadius="4px" bg='darkLight'></Box>
        </Flex>
        <CustomTable columns={['Nombre', 'Categoría', 'Etiquetas']}>
          {workers.map((worker, index) => (
            <Flex key={index} p={2}>
              <Box flex={1}></Box>
              <Text flex={4}>{worker.name}</Text>
              <Text flex={4}>{worker.categories[0]}</Text>
              <Text flex={4}>{worker.tags[0]}</Text>
              <Box flex={2}></Box>
              <Text textAlign="right" flex={6}>Ver más</Text>
            </Flex>
          ))}
        </CustomTable>
      </Main>
      <Side></Side>
    </PageGrid>
  );
};

const mapDispatchToProps = {
  fetchWorkers
}

const mapStateToProps = state => {
  return {
    workers: state.workers.allWorkers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workers);
