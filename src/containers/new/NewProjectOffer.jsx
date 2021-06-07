import React, { useState, useReducer } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { createProjectOffer } from "../../store/actions/projects";

// Custom
import { NewProjectOfferContext } from "../../context/newCreations";
import {
  initialState,
  reducer,
  validateNameDescCat,
  validateSchedule,
  validateLegalPayrolls,
  validateQtyTags,
  validateForm,
} from "../../lib/forms/newProjectOfferState";

// SVG
import next from "../../assets/svg/next.svg";
import back from "../../assets/svg/back.svg";
import cancel from "../../assets/svg/cancel.svg";

// Containers
import NameDescCat from "../innerContainers/new/projectOffer/NameDescCat";
import SchedulePicker from "../innerContainers/new/projectOffer/SchedulePicker";
import LegalPayrolls from "../innerContainers/new/projectOffer/LegalPayrolls";
import QtyTags from "../innerContainers/new/projectOffer/QtyTags";

// Validation
import NameDescCatValidation from "../../components/new/projectOffer/NameDesCatValidation";
import ScheduleValidation from "../../components/new/projectOffer/ScheduleValidation";
import LegalPayrollsValidation from "../../components/new/projectOffer/LegalPayrollsValidation";
import QtyTagsValidation from "../../components/new/projectOffer/QtyTagsValidation";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import SideBoxContainer from "../../components/ui/SideBoxContainer";

const NewProjectOffer = ({ match, history, createProjectOffer }) => {
  const projectId = match.params.id;

  const [process, setProcess] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isNameDescCatValid } = validateNameDescCat(state);
  const { isScheduleValid } = validateSchedule(state);
  const { isLegalPayrollValid } = validateLegalPayrolls(state);
  const { isQtyTagsValid } = validateQtyTags(state);
  const isValid = validateForm(state);

  const handleCreate = async () => {
    if (isQtyTagsValid && isValid) {
      setError(null);
      setLoading(true);
      try {
        await createProjectOffer(projectId, state);
        history.push(`../../../p/${projectId}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <NewProjectOfferContext.Provider value={{ state, dispatch }}>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              process === 1 ? (
                <Link to={`/ofertas/p/${projectId}`}>
                  <TopButton danger onClick={() => setProcess(1)}>
                    Cancelar
                  </TopButton>
                </Link>
              ) : (
                <TopButton
                  left
                  icon={back}
                  onSelect={() => setProcess((state) => state - 1)}
                >
                  Volver
                </TopButton>
              )
            }
            rightButton={
              process === 1 ? (
                <TopButton
                  right
                  inactive={!isNameDescCatValid}
                  icon={next}
                  onSelect={() => isNameDescCatValid && setProcess(2)}
                >
                  Siguiente
                </TopButton>
              ) : process === 2 ? (
                <TopButton
                  right
                  inactive={!isScheduleValid}
                  icon={next}
                  onSelect={() => isScheduleValid && setProcess(3)}
                >
                  Siguiente
                </TopButton>
              ) : process === 3 ? (
                <TopButton
                  right
                  inactive={!isLegalPayrollValid}
                  icon={next}
                  onSelect={() => isLegalPayrollValid && setProcess(4)}
                >
                  Siguiente
                </TopButton>
              ) : (
                <TopButton
                  inactive={!isQtyTagsValid && isValid}
                  onSelect={handleCreate}
                >
                  Crear
                </TopButton>
              )
            }
          >
            {loading ? "Creando oferta..." : "Nueva Oferta"}
          </NewTopHeaderBar>
        </TopMain>
        {error && (
          <Box py={2} px={4} mt={2} borderRadius={10} bg={"red.smooth"}>
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              cursor={"pointer"}
              onClick={() => setError(null)}
            >
              <Text fontWeight={"bold"} color={"red.full"} mb={2}>
                Oh! Vaya... algo salió mal
              </Text>
              <Image src={cancel} w={"12px"} />
            </Flex>
            <Text color={"red.full"}>{error}</Text>
          </Box>
        )}
        {process === 1 && <NameDescCat />}
        {process === 2 && <SchedulePicker projectId={projectId} />}
        {process === 3 && <LegalPayrolls projectId={projectId} />}
        {process === 4 && <QtyTags projectId={projectId} />}
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            {process === 1 && <NameDescCatValidation />}
            {process === 2 && <ScheduleValidation />}
            {process === 3 && <LegalPayrollsValidation />}
            {process === 4 && <QtyTagsValidation />}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </NewProjectOfferContext.Provider>
  );
};

const mapDispatchToProps = {
  createProjectOffer,
};

export default connect(null, mapDispatchToProps)(NewProjectOffer);
