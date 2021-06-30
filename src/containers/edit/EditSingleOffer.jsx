/* eslint-disable no-dupe-keys */
import React, { useState, useReducer } from "react";
import { Grid, Box, Flex, Image, Text } from "@chakra-ui/react";

// Custom
import { getParsedSalary } from "../../lib/forms/utils";
import { connect } from "react-redux";
import { editSingleOffer } from "../../store/actions/projects";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";
import cancel from "../../assets/svg/cancel.svg";
import correct from "../../assets/svg/correct.svg";
import plus from "../../assets/svg/plus-white.svg";
import minus from "../../assets/svg/minus-white.svg";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import CustomInput from "../../components/new/CustomInput";
import Separator from "../../components/ui/Separator";
import ErrorMessage from "../../components/ui/ErrorMessage";
import PlacesAutocompleteComponent from "../../components/ui/PlacesAutocompleteComponent";

const formIsValid = (
  state,
  currentSalary,
  currentExtraSalary,
  currentAssigned,
) => {
  const hasName = state.name.length > 0;
  const isNameLong = state.name.length > 3;
  const hasAddress =
    state.location.address !== "" &&
    state.location.lat !== null &&
    state.location.lng !== null;
  const hasSalary = state.salary && state.salary > 0;
  const hasSalaryOverMin = state.salary && state.salary >= currentSalary;
  const hasExtraSalary = state.extraSalary && state.extraSalary > 0;
  const hasExtraSalaryOverMin =
    state.salary &&
    state.extraSalary &&
    state.extraSalary >= state.salary * 1.1;
  const hasExtraSalaryOver = state.extraSalary >= currentExtraSalary;
  const hasQty = state.qty >= currentAssigned && state.qty > 0;

  return {
    isValid:
      hasName &&
      hasAddress &&
      isNameLong &&
      hasSalary &&
      hasSalaryOverMin &&
      hasExtraSalaryOver &&
      hasQty,
    hasExtraSalary,
    hasExtraSalaryOverMin,
    hasName,
    isNameLong,
    hasAddress,
    hasSalary,
    hasSalaryOverMin,
    hasExtraSalary,
    hasExtraSalaryOverMin,
    hasExtraSalaryOver,
    hasQty,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };

    case "setDesc":
      return { ...state, description: action.payload };

    case "setAddress":
      return { ...state, location: action.payload };

    case "editSalary":
      return {
        ...state,
        salary: getParsedSalary(action.payload),
      };

    case "editExtraSalary":
      return {
        ...state,
        extraSalary: getParsedSalary(action.payload),
      };

    case "addQty":
      return { ...state, qty: state.qty + 1 };

    case "subtractQty":
      return { ...state, qty: state.qty - 1 };

    default:
      return state;
  }
};

const EditSingleOffer = ({ match, history, projects, editSingleOffer }) => {
  const { id } = match.params;
  const project = projects.find((p) => p.projectOffers[0].id === id);
  const offer = project.projectOffers[0];

  const initialState = {
    name: offer.offerData.name,
    description: offer.offerData.description,
    location: project.projectData.location,
    salary: offer.offerData.salary,
    extraSalary: offer.offerData.extraSalary,
    qty: offer.offerData.qty,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    isValid,
    hasName,
    hasAddress,
    isNameLong,
    hasSalary,
    hasExtraSalary,
    hasSalaryOverMin,
    hasExtraSalaryOverMin,
    hasExtraSalaryOver,
    hasQty,
  } = formIsValid(
    state,
    offer.offerData.salary,
    offer.offerData.extraSalary,
    offer.offerData.already_assigned,
  );

  const qtyNotOne = state.qty !== offer.offerData.already_assigned;

  const subtractQty = () => {
    if (qtyNotOne) {
      dispatch({ type: "subtractQty" });
    }
  };

  const addQty = () => {
    dispatch({ type: "addQty" });
  };

  const onSubmit = async () => {
    if (isValid) {
      setIsLoading(true);
      setError(null);
      try {
        await editSingleOffer(project, state);
        history.push(`../../`);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <TopButton left icon={back} onSelect={() => history.goBack()}>
                Volver
              </TopButton>
            }
            rightButton={
              <TopButton
                right
                icon={edit}
                inactive={!isValid}
                onSelect={onSubmit}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </TopButton>
            }
          >
            {isLoading ? "Editando..." : "Editar oferta"}
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          {error && (
            <ErrorMessage
              title="Oh! Vaya... algo salió mal"
              secondary="Ha habido un problema editando el proyecto. Inténtalo más tarde."
              onClose={() => setError(null)}
            />
          )}
          <CustomInput
            title={"Nombre"}
            value={state.name}
            placeholder={"Nombre de la oferta"}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
          <Grid w={"100%"} columnGap={4} templateColumns={"1fr 1fr"}>
            <CustomInput
              title={"Salario"}
              type={"number"}
              placeholder={`7,50 euros/hora`}
              value={state.salary}
              onChange={(e) =>
                dispatch({ type: "editSalary", payload: e.target.value })
              }
            />
            <CustomInput
              title={"Horas extra"}
              type={"number"}
              placeholder={`12 euros/hora`}
              value={state.extraSalary}
              onChange={(e) =>
                dispatch({ type: "editExtraSalary", payload: e.target.value })
              }
            />
          </Grid>
          <PlacesAutocompleteComponent state={state} dispatch={dispatch} />
          <Box>
            <Text mb={1} fontWeight={"bold"} lineHeight={2}>
              Cantidad de trabajadores *
            </Text>
            <Flex
              w={"100%"}
              alignItems={"stretch"}
              justifyContent={"space-between"}
              borderRadius={8}
              overflow={"hidden"}
              borderWidth={2}
              borderColor={"darkLight"}
            >
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                bg={"primary"}
                minW={"60px"}
                cursor={qtyNotOne && "pointer"}
                opacity={!qtyNotOne && 0.5}
                onClick={subtractQty}
              >
                <Image src={minus} alt={"reducir personal"} w={"12px"} />
              </Flex>
              <Box flex={1}>
                <Text
                  py={2}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontSize={16}
                >
                  {state.qty}
                </Text>
              </Box>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                bg={"primary"}
                minW={"60px"}
                cursor={"pointer"}
                onClick={addQty}
              >
                <Image src={plus} alt={"aumentar personal"} w={"12px"} />
              </Flex>
            </Flex>
          </Box>
          <CustomInput
            multiline
            optional
            title="Requisitos"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "setDesc", payload: e.target.value })
            }
          />
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Nombre
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce un nombre
                </Text>
                <Image src={hasName ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Más de 3 caracteres
                </Text>
                <Image src={isNameLong ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Salario
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  Introduce un salario por hora
                </Text>
                <Image src={hasSalary ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  El salario es igual o superior a {offer.offerData.salary}
                  €/hora
                </Text>
                <Image src={hasSalaryOverMin ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Horas extra
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  Introduce un salario por hora extra
                </Text>
                <Image src={hasExtraSalary ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  Las horas extra son igual o superior a{" "}
                  {offer.offerData.extraSalary}
                  €/hora
                </Text>
                <Image src={hasExtraSalaryOver ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  Las horas extra son un 10% superior al salario
                </Text>
                <Image
                  src={hasExtraSalaryOverMin ? correct : cancel}
                  w={"12px"}
                />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Dirección
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce una dirección válida
                </Text>
                <Image src={hasAddress ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Cantidad
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6} mr={4}>
                  Hay al menos {offer.offerData.already_assigned || 1}{" "}
                  trabajador{offer.offerData.already_assigned > 1 ? "es" : ""}
                </Text>
                <Image src={hasQty ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {
  editSingleOffer,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleOffer);
