import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/layout';

// Context
import { SelectedWorker } from '../context/SelectedItemContext';

// Lib
import { getTagsAndCategoriesFromWorker } from '../lib/workers';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchWorkers } from '../store/actions/workers';
import { fetchTags } from '../store/actions/tags';
import { fetchCategories } from '../store/actions/categories';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SideBoxContainer from '../components/ui/SideBoxContainer';
import SearchBar from '../components/ui/SearchBar';
import WorkersTableGuide from '../components/ui/WorkersTableGuide';
import WorkersTable from '../components/ui/WorkersTable';
import MultipleSelectList from '../components/ui/MultipleSelectList';
import WorkerSide from '../components/ui/WorkerSide';
import BeCurious from '../components/ui/BeCurious';
import AccentButton from '../components/ui/AccentButton';
import Documentation from '../components/main/Documentation';
import Popup from '../components/ui/Popup';
import LoadingSpinner from "../components/ui/LoadingSpinner";
import NoContent from "../components/ui/NoContent";
import ShareLink from '../components/modals/ShareLink';
import CreateTags from '../components/modals/CreateTags';

const Workers = ({
  fetchWorkers,
  workers,
  fetchTags,
  tags,
  fetchCategories,
  categories,
}) => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const { currentTags, currentCategories } =
    getTagsAndCategoriesFromWorker(workers);

  const [workersError, setWorkersError] = useState(null);
  const [workersLoading, setWorkersLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [createTagModalOpen, setCreateTagModalOpen] = useState(false);


  useEffect(() => {
    (async () => {
      setWorkersError(null);
      if (workers.length === 0) {
        setWorkersLoading(true);
      }
      try {
        await fetchWorkers();
        await fetchTags();
        await fetchCategories();
      } catch (error) {
        setWorkersError(error.message);
      } finally {
        setWorkersLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWorkers, fetchTags, fetchCategories]);

  // SEARCH & FILTER LOGIC
  const [search, setSearch] = useState('');
  const [displayFilters, setDisplayFilters] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const totalFilters = filterCategories.length + filterTags.length;

  const handleCategories = (event) => {
    if (!filterCategories.includes(event.target.name)) {
      setFilterCategories([...filterCategories, event.target.name]);
    } else {
      setFilterCategories(
        filterCategories.filter((cat) => cat !== event.target.name)
      );
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
    if (filterCategories.length === 0 && filterTags.length === 0) {
      return worker.workerData.name
        .toLowerCase()
        .includes(search.toLowerCase());
    }

    if (filterTags.length === 0 && filterCategories.length > 0) {
      return (
        filterCategories.every((cat) => worker.categories.find(workerCat => cat === workerCat.data.name)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategories.length === 0 && filterTags.length > 0) {
      return (
        filterTags.every((tag) => worker.tags.find(workerTag => tag === workerTag.data.name)) &&
        worker.workerData.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      filterCategories.every((cat) => worker.categories.find(workerCat => cat === workerCat.data.name)) &&
      filterTags.every((tag) => worker.tags.find(workerTag => tag === workerTag.data.name)) &&
      worker.workerData.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // CHECKBOX LOGIC
  const [checkedItems, setCheckedItems] = useState([]);
  const allChecked = checkedItems.length === workers.length;
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheck = (worker) => {
    if (!checkedItems.includes(worker)) {
      setCheckedItems([...checkedItems, worker]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.id !== worker.id));
    }
  };

  const handleGlobalCheck = () => {
    if (checkedItems.length === 0) {
      setCheckedItems(filteredWorkers.map((worker) => worker));
    } else {
      setCheckedItems([]);
    }
  };

  // TAG & CATEGORIES LOGIC

  return (
    <SelectedWorker.Provider value={{ selectedWorker, setSelectedWorker }}>
      <Main>
        <TopMain pb={workers.length !== 0 ? 0 : 3}>
          <Flex>
            <SearchBar
              placeholder={"Busca trabajadores por su nombre"}
              onChange={(event) => setSearch(event.target.value)}
            />
            {workers.length !== 0 && (
              <>
                <Flex
                  borderRadius={8}
                  _hover={{ cursor: "pointer" }}
                  borderWidth={1}
                  borderColor={"translucid"}
                  bg={(displayFilters || totalFilters > 0) && "darkLight"}
                  ml={2}
                  alignItems={"center"}
                  px={4}
                  onClick={() => setDisplayFilters(!displayFilters)}
                >
                  <Text fontSize={14}>
                    {!displayFilters
                      ? totalFilters > 0
                        ? `Filtros (${totalFilters})`
                        : "Filtros"
                      : "Cerrar"}
                  </Text>
                </Flex>
                <Popup
                  title={"Crear etiquetas"}
                  body={<CreateTags />}
                  show={createTagModalOpen}
                  handleShow={setCreateTagModalOpen}
                >
                  <AccentButton onClick={() => setCreateTagModalOpen(true)}>
                    Crear etiquetas
                  </AccentButton>
                </Popup>
              </>
            )}
            <Popup
              title={"Invitar trabajadores"}
              body={
                <ShareLink
                  categories={categories.map((cat) => cat.id)}
                  tags={tags.map((tag) => tag.id)}
                />
              }
              show={shareModalOpen}
              handleShow={setShareModalOpen}
            >
              <AccentButton onClick={() => setShareModalOpen(true)}>
                Invitar trabajadores
              </AccentButton>
            </Popup>
          </Flex>
          {displayFilters && (
            <Flex mt={2} alignItems={"center"}>
              {currentCategories.length !== 0 && (
                <MultipleSelectList
                  title={`Categor??as${
                    filterCategories.length > 0
                      ? ` (${filterCategories.length})`
                      : ""
                  }`}
                  bg={filterCategories.length !== 0 && "darkLight"}
                  current={filterCategories}
                  values={currentCategories.map((e) => e.data.name)}
                  onChange={handleCategories}
                />
              )}
              {currentTags.length !== 0 && (
                <MultipleSelectList
                  title={`Etiquetas${
                    filterTags.length > 0 ? ` (${filterTags.length})` : ""
                  }`}
                  ml={2}
                  bg={filterTags.length !== 0 && "darkLight"}
                  current={filterTags}
                  values={currentTags.map((e) => e.data.name)}
                  onChange={handleTags}
                />
              )}
              {totalFilters !== 0 && (
                <Flex flex={1} justifyContent={"flex-end"}>
                  <Text
                    color={"red.full"}
                    fontSize={14}
                    ml={2}
                    borderRadius={8}
                    _hover={{ bg: "red.smooth" }}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={"translucid"}
                    px={4}
                    py={2}
                    onClick={() => {
                      setFilterCategories([]);
                      setFilterTags([]);
                      setDisplayFilters(false);
                    }}
                  >
                    Deshacer filtros
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
          {workers.length !== 0 && (
            <WorkersTableGuide
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              handleGlobalCheck={handleGlobalCheck}
              checkedItems={checkedItems}
              tags={tags}
              categories={categories}
            />
          )}
        </TopMain>
        {workersLoading && <LoadingSpinner />}
        {workersError && (
          <Text textAlign={"center"} py={10}>
            Ha ocurrido un error
          </Text>
        )}
        {!workersLoading && !workersError && workers.length !== 0 && (
          <WorkersTable
            filteredWorkers={filteredWorkers}
            checkedItems={checkedItems}
            handleCheck={handleCheck}
          />
        )}
        {!workersLoading && !workersError && workers.length === 0 && (
          <NoContent
            what={"trabajadores"}
            how={
              "Empieza invitando trabajadores a tus listas, luego ser??n estos a los que les llegar??n tus ofertas de empleo"
            }
            otherComponent={(
              <Popup
                title={"Invitar trabajadores"}
                body={
                  <ShareLink
                    categories={categories.map((cat) => cat.id)}
                    tags={tags.map((tag) => tag.id)}
                  />
                }
                show={shareModalOpen}
                handleShow={setShareModalOpen}
              >
                <AccentButton py={5} px={6} mt={6} onClick={() => setShareModalOpen(true)}>
                  Invitar trabajadores
                </AccentButton>
              </Popup>
            )}
          />
        )}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            {!selectedWorker && (
              <BeCurious
                text={"Prueba a seleccionar a uno o varios trabajadores"}
              />
            )}
            {selectedWorker && <WorkerSide data={selectedWorker} />}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedWorker.Provider>
  );
};

const mapDispatchToProps = {
  fetchWorkers,
  fetchTags,
  fetchCategories,
};

const mapStateToProps = (state) => {
  return {
    workers: state.workers.allWorkers,
    tags: state.tags.allTags,
    categories: state.categories.allCategories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);
