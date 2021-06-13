import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';

// Context
import {
  SelectedItemManage,
  SelectedManageSide,
} from '../context/SelectedItemContext';

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SideBoxContainer from '../components/ui/SideBoxContainer';
import TopMain from "../components/main/TopMain";
import Documentation from '../components/main/Documentation';
import BeCurious from '../components/ui/BeCurious';
import SearchBar from '../components/ui/SearchBar';
import CustomTab from '../components/ui/CustomTab';
import PayrollSide from '../components/ui/PayrollSide';
import PastProjectSide from '../components/ui/PastProjectSide';
import ContractSide from '../components/ui/ContractSide';

// Guides
import ProjectsGuide from './innerContainers/manage/guides/ProjectsGuide'
import ContractsGuide from './innerContainers/manage/guides/ContractsGuide'
import PayrollsGuide from './innerContainers/manage/guides/PayrollsGuide'

// Inner Containers
import ManageProjects from './innerContainers/manage/ManageProjects';
import ManageContracts from './innerContainers/manage/ManageContracts';
import ManagePayrolls from './innerContainers/manage/ManagePayrolls';
import ManageTemplates from './innerContainers/manage/ManageTemplates';

const Manage = () => {
  const [search, setSearch] = useState('');
  const [selectedItemManage, setSelectedItemManage] = useState(null);
  const [selectedManageSide, setSelectedManageSide] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Proyectos pasados");

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <SelectedItemManage.Provider
      value={{ selectedItemManage, setSelectedItemManage }}
    >
      <SelectedManageSide.Provider
        value={{ selectedManageSide, setSelectedManageSide }}
      >
        <Main>
          <TopMain borderBottomWidth={0} pb={0}>
            <SearchBar
              placeholder={"Busca por nombre, dirección, localización..."}
              onChange={handleSearch}
            />
            <Flex w={"100%"} mt={4}>
              <CustomTab selectedTab={selectedTab} onClick={() => setSelectedTab("Proyectos pasados")}>
                Proyectos pasados
              </CustomTab>
              <CustomTab selectedTab={selectedTab} onClick={() => setSelectedTab("Contratos")}>
                Contratos
              </CustomTab>
              <CustomTab selectedTab={selectedTab} onClick={() => setSelectedTab("Nóminas")}>
                Nóminas
              </CustomTab>
              <CustomTab selectedTab={selectedTab} onClick={() => setSelectedTab("Plantillas")} mr={0}>
                Plantillas
              </CustomTab> 
            </Flex>
            {selectedTab === "Proyectos pasados" && <ProjectsGuide />}
            {selectedTab === "Contratos" && <ContractsGuide />}
            {selectedTab === "Nóminas" && <PayrollsGuide />}
          </TopMain>
          {selectedTab === "Proyectos pasados" && <ManageProjects search={search} />}
          {selectedTab === "Contratos" && <ManageContracts search={search} />}
          {selectedTab === "Nóminas" && <ManagePayrolls search={search} />}
          {selectedTab === "Plantillas" && <ManageTemplates search={search} />}
        </Main>
        <Side>
          <SideSticky>
            <Documentation />
            <SideBoxContainer>
              {selectedManageSide === "contracts" && (
                <ContractSide data={selectedItemManage} />
              )}
              {selectedManageSide === "payrolls" && (
                <PayrollSide data={selectedItemManage} />
              )}
              {selectedManageSide === "projects" && (
                <PastProjectSide data={selectedItemManage} />
              )}
              {!selectedManageSide && (
                <BeCurious
                  text={
                    "Selecciona cualquier elemento para ver más información del mismo."
                  }
                />
              )}
            </SideBoxContainer>
          </SideSticky>
        </Side>
      </SelectedManageSide.Provider>
    </SelectedItemManage.Provider>
  );
};

export default Manage;
