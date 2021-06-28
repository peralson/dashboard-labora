import React, { useState, useEffect } from 'react';
import { Text, Flex, Box, Grid } from "@chakra-ui/react";

// Custom
import { SelectedCompany } from '../context/SelectedItemContext'
import { connect } from "react-redux";
import { fetchCompany } from '../store/actions/company'

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Logout from "../components/main/Logout";
import Side from "../components/main/Side";
import SideSticky from "../components/main/SideSticky";
import SideBoxContainer from "../components/ui/SideBoxContainer";
import BeCurious from "../components/ui/BeCurious";
import TopHeaderBar from "../components/ui/TopHeaderBar";
import Separator from "../components/ui/Separator";
import Documentation from "../components/main/Documentation";
import CompanyMain from "../components/company/CompanyMain";
import BlockContainer from "../components/company/BlockContainer";
import LegalRepSide from "../components/company/LegalRepSide";
import LegalCompanySide from '../components/company/LegalCompanySide';
import ContactSide from '../components/company/ContactSide';
import LegalPicker from '../components/company/LegalPicker';

const Company = ({ company, fetchCompany }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null)
    if (company.id) setLoading(false)
    fetchCompany()
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SelectedCompany.Provider value={{ value, setValue }}>
      <Main>
        <TopMain>
          <TopHeaderBar>
            {loading
              ? "Cargando empresa..."
              : error
                ? "Ha ocurrido un error"
                : "Empresa"}
          </TopHeaderBar>
        </TopMain>
        {!loading && !error && (
          <Box mt={4}>
            <CompanyMain
              general={company.companyData.general}
              contact={company.companyData.contact}
            />
            <BlockContainer
              title={"General"}
              desc={
                "Información general utilizada para dar tramite a los procesos legales como la generación de contratos."
              }
            >
              <LegalPicker
                name={"Datos de contacto"}
                desc={"Email y teléfono"}
              />
              <LegalPicker
                name={"Datos de empresa"}
                desc={"Domicilio, CIF, ..."}
              />
              <LegalPicker
                name={"Representante legal"}
                desc={"Nombre, DNI, ..."}
              />
            </BlockContainer>
            <Separator top={8} bottom={6} />
            <BlockContainer
              title={"Administradores"}
              cta={"Crear nuevo"}
              onClick={() => {}}
              desc={
                "Autoriza personal de tu empresa a gestionar los procesos de creación de ofertas y contratación de personal."
              }
            ></BlockContainer>
            <Separator top={8} bottom={6} />
            <BlockContainer
              title={"Trabajadores"}
              cta={"Editar"}
              onClick={() => {}}
              desc={
                "Categorías habilitadas la empresa para el desarrollo de sus actividades."
              }
            >
              <Grid templateColumns={"1fr 1fr 1fr 1fr"} w={"100%"} gap={4}>
                {company.categories.map((category, index) => (
                  <Flex
                    key={index}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={category.enabled ? "white" : "darkLight"}
                    py={6}
                  >
                    <Text fontSize={14} textAlign={"center"}>
                      {category.data.name}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </BlockContainer>
            <Separator top={8} bottom={6} />
            <Box px={4}>
              <Logout />
            </Box>
          </Box>
        )}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            {!value && (
              <BeCurious text={"Selecciona alguna oferta de este proyecto"} />
            )}
            {value === "Datos de empresa" && (
              <LegalCompanySide legalData={company.companyData.legalData} />
            )}
            {value === "Representante legal" && (
              <LegalRepSide repData={company.companyData.repData} />
            )}
            {value === "Datos de contacto" && (
              <ContactSide contact={company.companyData.contact} />
            )}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedCompany.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company.company,
  };
};

const mapDispatchToProps = {
  fetchCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);