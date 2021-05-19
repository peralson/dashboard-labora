import React, { useEffect } from 'react';

// Chakra
import { Box, Flex, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux'
import { fetchWorkers } from '../store/actions/workers'

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import CustomTable from '../components/ui/CustomTable';
import Separator from '../components/ui/Separator';

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
    <>
      <Main>
        <Box position="sticky" top={0} pt={4} width="100%" bg="dark">
          <Flex flexDirection='row' justifyContent="space-between">
            <SearchBar placeholder="Busca un trabajador" onChange={handleSearch} />
            <Box w="120px" ml={2} borderRadius="4px" bg='darkLight'></Box>
            <Box w="120px" ml={2} borderRadius="4px" bg='darkLight'></Box>
          </Flex>
          <Separator top={4} />
        </Box>
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
      <Side>
        
      </Side>
    </>
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
