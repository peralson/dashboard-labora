import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchPastProjects } from '../store/actions/projects';
import { fetchContracts } from '../store/actions/contracts';
import { fetchPayrolls } from '../store/actions/payrolls';
import { fetchTemplates } from '../store/actions/templates';

// Context
import { SelectedItemManage } from '../context/SelectedItemContext'

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import Documentation from '../components/main/Documentation';
import BeCurious from '../components/ui/BeCurious';
import SearchBar from '../components/ui/SearchBar';
import CustomTab from '../components/ui/CustomTab';
import ContractSide from '../components/ui/ContractSide';

// Inner Containers
import ManageProjects from './innerContainers/ManageProjects';
import ManageContracts from './innerContainers/ManageContracts';
import ManagePayrolls from './innerContainers/ManagePayrolls';
import ManageTemplates from './innerContainers/ManageTemplates';



const Manage = ({
  fetchPastProjects,
  pastProjects,
  fetchContracts,
  contracts,
  fetchPayrolls,
  payrolls,
  fetchTemplates,
  templates
}) => {
  const [search, setSearch] = useState('');
  const { selectedItemManage } = useContext(SelectedItemManage)
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    <ManageProjects data={pastProjects} />,
    <ManageContracts data={contracts} />,
    <ManagePayrolls data={payrolls} />,
    <ManageTemplates data={templates}/>,
  ];

  useEffect(() => {
    (async () => {
      await fetchPastProjects();
    })();

    (async () => {
      await fetchContracts();
    })();

    (async () => {
      await fetchPayrolls();
    })();

    (async () => {
      await fetchTemplates();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchPastProjects,
    fetchContracts,
    fetchPayrolls,
    fetchTemplates
  ]);

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
          {/* {selectedItemManage && selectedItemManage.offerData && (
              <PayrollSide data={selectedItemManage} />
            )} */}
            {selectedItemManage && selectedItemManage.pdf && (
              <ContractSide data={selectedItemManage} />
            )}
            {!selectedItemManage && <BeCurious text={"Prueba a seleccionar alguna solicitud o una oferta de algún proyecto"} />}
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
  fetchTemplates
};

const mapStateToProps = (state) => {
  return {
    pastProjects: state.projects.pastProjects,
    contracts: state.contracts.contracts,
    payrolls: state.payrolls.payrolls,
    templates: state.templates.templates
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
