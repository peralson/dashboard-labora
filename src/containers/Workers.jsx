import React, { useEffect, useState, useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { SelectedWorker } from '../context/SelectedItemContext'

// Lib
import { getTagsAndCategoriesFromWorker } from '../lib/workers'

// Redux & Actions
import { connect } from 'react-redux';
import { fetchWorkers } from '../store/actions/workers';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SearchBar from '../components/ui/SearchBar';
import WorkersTableGuide from '../components/ui/WorkersTableGuide';
import WorkersTable from '../components/ui/WorkersTable';
import MultipleSelectList from '../components/ui/MultipleSelectList';
import WorkerSide from '../components/ui/WorkerSide';
import BeCurious from '../components/ui/BeCurious';
import AccentButton from '../components/ui/AccentButton';
import Documentation from '../components/main/Documentation';

const Workers = ({ fetchWorkers, workers }) => {
  const { selectedWorker } = useContext(SelectedWorker);
  const { tags, categories } = getTagsAndCategoriesFromWorker(workers);

  const [workersError, setWorkersError] = useState(null);
  const [workersLoading, setWorkersLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setWorkersError(null)
      if (workers.length === 0) {
        setWorkersLoading(true)
      }
      try {
        await fetchWorkers()
      } catch (error) {
        setWorkersError(error.message)
      } finally {
        setWorkersLoading(false)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWorkers])

  // SEARCH & FILTER LOGIC
  const [search, setSearch] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTags, setFilterTags] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategories = (event) => {
    if (!filterCategories.includes(event.target.name)) {
      setFilterCategories([...filterCategories, event.target.name]);
    } else {
      setFilterCategories(filterCategories.filter((e) => e !== event.target.name));
    }
  };

  const handleTags = (event) => {
    if (!filterTags.includes(event.target.name)) {
      setFilterTags([...filterTags, event.target.name]);
    } else {
      setFilterTags(filterTags.filter((e) => e !== event.target.name));
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    if (filterCategories.length === 0 && filterTags.length === 0)
      return worker.workerData.name
        .toLowerCase()
        .includes(search.toLowerCase());
    if (filterTags.length === 0 && filterCategories.length > 0)
      return (
        filterCategories.every((e) => worker.categories.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    if (filterCategories.length === 0 && filterTags.length > 0)
      return (
        filterTags.every((e) => worker.tags.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    else
      return (
        filterCategories.every((e) => worker.categories.includes(e)) &&
        filterTags.every((e) => worker.tags.includes(e)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
  });

  // CHECKBOX LOGIC
  const [checkedItems, setCheckedItems] = useState([]);
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
    console.log(checkedItems);
    if (checkedItems.length === 0) {
      setCheckedItems(filteredWorkers.map(({ id }) => id));
    } else {
      setCheckedItems([]);
    }
  };

  return (
    <>
      <Main>
        <TopMain pb={0}>
          <Flex>
            <SearchBar
              placeholder='Busca un trabajador'
              onChange={handleSearch}
            />
            {categories.length !== 0 && (
              <MultipleSelectList
                title='Categorías'
                ml={2}
                current={filterCategories}
                values={categories}
                onChange={handleCategories}
              />
            )}
            {tags.length !== 0 && (
              <MultipleSelectList
                title='Etiquetas'
                ml={2}
                current={filterTags}
                values={tags}
                onChange={handleTags}
              />
            )}
            <AccentButton>Invitar trabajadores</AccentButton>
          </Flex>
          <WorkersTableGuide
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            handleGlobalCheck={handleGlobalCheck}
          />
        </TopMain>
        {workersLoading
          ? <Text>Cargando...</Text>
          : workersError
            ? <Text>Ha ocurrido un error</Text>
            : (
          <WorkersTable
            filteredWorkers={filteredWorkers}
            checkedItems={checkedItems}
            handleCheck={handleCheck}
          />
        )}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <Box p={4} w={"100%"} borderRadius={8} bg={"darkLight"}>
            {!selectedWorker && <BeCurious text={"Prueba a seleccionar a uno o varios trabajadores"} />}
            {selectedWorker && <WorkerSide data={selectedWorker} />}
          </Box> 
        </SideSticky>
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
