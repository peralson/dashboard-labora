import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Redux & Actions
import { connect } from "react-redux";
import { fetchPastProjects } from "../store/actions/projects";
import { fetchContracts } from "../store/actions/contracts";
import { fetchPayrolls } from "../store/actions/payrolls";
import { fetchTemplates } from "../store/actions/templates";

// Context
import { SelectedItemManage } from "../context/SelectedItemContext";

// Components
import Main from "../components/main/Main";
import Side from "../components/main/Side";
import SideSticky from "../components/main/SideSticky";
import SideBoxContainer from "../components/ui/SideBoxContainer";
import Documentation from "../components/main/Documentation";
import BeCurious from "../components/ui/BeCurious";
import SearchBar from "../components/ui/SearchBar";
import CustomTab from "../components/ui/CustomTab";
import PayrollSide from "../components/ui/PayrollSide";
import ContractSide from "../components/ui/ContractSide";

// Inner Containers
import ManageProjects from "./innerContainers/manage/ManageProjects";
import ManageContracts from "./innerContainers/manage/ManageContracts";
import ManagePayrolls from "./innerContainers/manage/ManagePayrolls";
import ManageTemplates from "./innerContainers/manage/ManageTemplates";

const Manage = ({
  fetchPastProjects,
  pastProjects,
  fetchContracts,
  contracts,
  fetchPayrolls,
  payrolls,
  fetchTemplates,
  templates,
}) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemManage, setSelectedItemManage] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    (async () => {
      setError(null)
      try {
        await fetchPastProjects();
        await fetchContracts();
        await fetchPayrolls();
        await fetchTemplates();
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPastProjects, fetchContracts, fetchPayrolls, fetchTemplates]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredPastProjects = pastProjects.filter((project) => (
    project.name.toLowerCase().includes(search) ||
    project.direction.toLowerCase().includes(search) ||
    project.offers.some((offer) => offer.name.toLowerCase().includes(search))
  ));

  const filteredContracts = contracts.filter((contract) => (
    contract.category.toLowerCase().includes(search) ||
    contract.worker.name.toLowerCase().includes(search)
  ));

  const filteredPayrolls = payrolls.filter((payroll) => (
    payroll.category.toLowerCase().includes(search) ||
    payroll.worker.name.toLowerCase().includes(search) ||
    payroll.event.toLowerCase().includes(search)
  ));

  const filteredTemplates = templates.filter((template) => (
    template.category.toLowerCase().includes(search) ||
    template.type.toLowerCase().includes(search)
  ));

  const tabs = [
    <ManageProjects data={filteredPastProjects} />,
    <ManageContracts data={filteredContracts} />,
    <ManagePayrolls data={filteredPayrolls} />,
    <ManageTemplates data={filteredTemplates} />,
  ];

  return (
    <SelectedItemManage.Provider
      value={{ selectedItemManage, setSelectedItemManage }}
    >
      <Main>
        <Box
          zIndex={100}
          position={"sticky"}
          top={0}
          pt={4}
          width={"100%"}
          bg={"dark"}
          pb={2.5}
        >
          <SearchBar
            placeholder={"Busca por nombre, dirección, localización..."}
            onChange={handleSearch}
          />
        </Box>
        <Flex flexDirection={"row"} w={"100%"} my={4}>
          <CustomTab
            title="Proyectos"
            active={selectedTab === 0}
            onClick={() => setSelectedTab(0)}
          />
          <CustomTab
            title="Contratos"
            active={selectedTab === 1}
            onClick={() => setSelectedTab(1)}
          />
          <CustomTab
            title="Nóminas"
            active={selectedTab === 2}
            onClick={() => setSelectedTab(2)}
          />
          <CustomTab
            title="Plantillas"
            active={selectedTab === 3}
            onClick={() => setSelectedTab(3)}
          />
        </Flex>
        {!loading && !error && tabs[selectedTab]}
        {!loading && error && <Text>Ha ocurrido un error</Text>}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            {selectedItemManage && selectedItemManage.type && (
              <ContractSide data={selectedItemManage} />
            )}
            {selectedItemManage && !selectedItemManage.type && (
              <PayrollSide data={selectedItemManage} />
            )}
            {!selectedItemManage && (
              <BeCurious
                text={
                  "Prueba a seleccionar alguna solicitud o una oferta de algún proyecto"
                }
              />
            )}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedItemManage.Provider>
  );
};

const mapDispatchToProps = {
  fetchPastProjects,
  fetchContracts,
  fetchPayrolls,
  fetchTemplates,
};

const mapStateToProps = (state) => {
  return {
    pastProjects: state.projects.pastProjects,
    contracts: state.contracts.contracts,
    payrolls: state.payrolls.payrolls,
    templates: state.templates.templates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
