import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchPastProjects } from '../store/actions/projects';
import { fetchContracts } from '../store/actions/contracts';
import { fetchPayrolls } from '../store/actions/payrolls';
import { fetchContractTemplates } from '../store/actions/contracts';

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import Documentation from '../components/main/Documentation';
import BeCurious from '../components/ui/BeCurious';
import SearchBar from '../components/ui/SearchBar';
import ManageProjects from './innerContainers/ManageProjects';
import ManageContracts from './innerContainers/ManageContracts';
import ManagePayrolls from './innerContainers/ManagePayrolls';
import ManageTemplates from './innerContainers/ManageTemplates';

const CustomTab = (props) => {
  return (
    <Box
      w='auto'
      h='auto'
      py={2}
      px={3}
      mr={4}
      cursor='pointer'
      bg={props.active ? 'translucid' : 'darkLight'}
      {...props}
      color='white'
      borderRadius={8}
      onClick={props.onClick}
    >
      {props.title}
    </Box>
  );
};

const Manage = ({
  fetchPastProjects,
  pastProjects,
  fetchContracts,
  contracts,
  fetchPayrolls,
  payrolls,
  fetchContractTemplates,
  contractTemplates,
}) => {
  const [search, setSearch] = useState('');
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    <ManageProjects data={pastProjects} />,
    <ManageContracts data={contracts} />,
    <ManagePayrolls data={payrolls} />,
    <ManageTemplates data={contractTemplates}/>,
  ];

  useEffect(() => {
    (async () => {
      setProjectsError(null);
      if (pastProjects.length === 0) {
        setLoadingProjects(true);
      }
      try {
        await fetchPastProjects();
      } catch (error) {
        setProjectsError(error.message);
      } finally {
        setLoadingProjects(false);
      }
    })();

    (async () => {
      await fetchContracts();
    })();

    (async () => {
      await fetchPayrolls();
    })();

    (async () => {
      await fetchContractTemplates();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchPastProjects,
    fetchContracts,
    fetchPayrolls,
    fetchContractTemplates,
  ]);
  console.log('manage contracts: ', contracts)

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Main>
        <Box
          zIndex={100}
          position={'sticky'}
          top={0}
          pt={4}
          width={'100%'}
          bg={'dark'}
          pb={2.5}
        >
          <SearchBar
            placeholder='Busca proyectos, nóminas, contratos...'
            onChange={handleSearch}
          />
        </Box>
        <Flex flexDirection='row' w='100%' my={4}>
          <CustomTab
            title='Proyectos'
            active={selectedTab === 0}
            onClick={() => setSelectedTab(0)}
          />
          <CustomTab
            title='Contratos'
            active={selectedTab === 1}
            onClick={() => setSelectedTab(1)}
          />
          <CustomTab
            title='Nóminas'
            active={selectedTab === 2}
            onClick={() => setSelectedTab(2)}
          />
          <CustomTab
            title='Plantillas'
            active={selectedTab === 3}
            onClick={() => setSelectedTab(3)}
          />
        </Flex>
        {tabs[selectedTab]}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <Box p={4} w={'100%'} borderRadius={8} bg={'darkLight'}>
            {
              <BeCurious
                text={'Prueba a seleccionar a uno o varios trabajadores'}
              />
            }
          </Box>
        </SideSticky>
      </Side>
    </>
  );
};

const mapDispatchToProps = {
  fetchPastProjects,
  fetchContracts,
  fetchPayrolls,
  fetchContractTemplates,
};

const mapStateToProps = (state) => {
  return {
    pastProjects: state.projects.pastProjects,
    contracts: state.contracts.contracts,
    payrolls: state.payrolls.payrolls,
    contractTemplates: state.contracts.contractTemplates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
