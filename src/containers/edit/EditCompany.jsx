/* eslint-disable no-dupe-keys */
import React, { useState, useReducer } from "react";
import { Grid, Box, Flex, Image, Text } from "@chakra-ui/react";

// Custom
import { connect } from "react-redux";
import { editCompany } from "../../store/actions/company";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";
import cancel from "../../assets/svg/cancel.svg";
import correct from "../../assets/svg/correct.svg";

// CSS
import "../../assets/css/input-file.css"

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
import CustomImg from "../../components/ui/CustomImg";
import ErrorMessage from "../../components/ui/ErrorMessage";
import PlacesAutocompleteComponent from "../../components/ui/PlacesAutocompleteComponent";

const FileUpload = ({ name, current, acceptedFileTypes, dispatch }) => {
  const [image, setImage] = useState(current);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader);
        setImage(reader.result)
        dispatch({ type: "setLogo", payload: reader.result })
      }
    } else {
      setImage(current);
      dispatch({ type: "setLogo", payload: null });
    }
  }

  return (
    <Box>
      <Text fontWeight={"bold"} lineHeight={2}>
        Logo
      </Text>
      <Flex alignItems={"center"} mt={2}>
        <CustomImg
          borderRadius={"50%"}
          mr={4}
          image={image}
          alt={name}
          w={"40px"}
          h={"40px"}
        />
        <input
          type="file"
          accept={acceptedFileTypes}
          className={"custom-file-input"}
          onChange={(e) => handleImageChange(e.target.files[0])}
        />
      </Flex>
    </Box>
  );
};

const formIsValid = (state) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const hasName = state.name !== "";
  const isNameLong = state.name.length > 3;
  const hasPhoto = state.photo !== "";
  const hasEmail =  emailRegex.test(String(state.mail).toLowerCase());
  const hasPhoneNumber =
    state.phoneNumber !== "" &&
    state.phoneNumber.length >= 9 &&
    state.phoneNumber.length <= 15;
  const hasAddress =
    state.location.address !== "" &&
    state.location.lat !== null &&
    state.location.lng !== null;

  return {
    isValid: hasName && isNameLong && hasAddress && hasPhoto && hasPhoneNumber && hasEmail,
    hasName: hasName,
    isNameLong: isNameLong,
    hasAddress: hasAddress,
    hasPhoto: hasPhoto,
    hasPhoneNumber: hasPhoneNumber,
    hasEmail: hasEmail 
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLogo":
      return { ...state, newPhoto: action.payload };

    case "setName":
      return { ...state, name: action.payload };

    case "setPhone":
      return { ...state, phoneNumber: action.payload };

    case "setEmail":
      return { ...state, mail: action.payload };

    case "setAddress":
      return { ...state, location: action.payload };

    default:
      return state;
  }
};

const EditCompany = ({ history, company, editCompany }) => {
  const initialState = {
    id: company.id,
    name: company.companyData.general.name,
    photo: company.companyData.general.photo,
    newPhoto: null,
    location: company.companyData.contact.location,
    phoneNumber: company.companyData.contact.phoneNumber,
    mail: company.companyData.contact.mail,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    isValid,
    hasName,
    isNameLong,
    hasAddress,
    hasPhoto,
    hasPhoneNumber,
    hasEmail,
  } = formIsValid(state);

  const onSubmit = async () => {
    if (isValid) {
      setIsLoading(true);
      setError(null);
      try {
        await editCompany(state);
        history.push(`/empresa`);
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
            {isLoading ? "Editando..." : "Editar empresa"}
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          {error && (
            <ErrorMessage
              title="Oh! Vaya... algo sali?? mal"
              secondary="Ha habido un problema editando la oferta. Int??ntalo m??s tarde."
              onClose={() => setError(null)}
            />
          )}
          <FileUpload
            name={"Logo"}
            current={state.photo}
            placeholder={"el logo de tu empresa"}
            acceptedFileTypes={[".png", ".jpg", ".jpeg"]}
            dispatch={dispatch}
          />
          <CustomInput
            title={"Nombre"}
            optional
            value={state.name}
            placeholder={"Nombre de la empresa"}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
          <Grid w={"100%"} templateColumns={"1fr 1fr"} gap={4}>
            <CustomInput
              title={"Tel??fono"}
              optional
              type={"tel"}
              value={state.phoneNumber}
              placeholder={"Tel??fono de contacto"}
              onChange={(e) =>
                dispatch({ type: "setPhone", payload: e.target.value })
              }
            />
            <CustomInput
              title={"Correo electr??nico"}
              optional
              value={state.mail}
              placeholder={"Correo de la empresa"}
              onChange={(e) =>
                dispatch({
                  type: "setEmail",
                  payload: e.target.value.toLowerCase(),
                })
              }
            />
          </Grid>
          <PlacesAutocompleteComponent state={state} dispatch={dispatch} />
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                General
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Hay un logo
                </Text>
                <Image src={hasPhoto ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
                mt={2}
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
                  M??s de 3 caracteres
                </Text>
                <Image src={isNameLong ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Contacto
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce una n??mero de tel??fono v??lido
                </Text>
                <Image src={hasPhoneNumber ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
                mt={2}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce una correo electr??nico v??lido
                </Text>
                <Image src={hasEmail ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce una direcci??n v??lida
                </Text>
                <Image src={hasAddress ? correct : cancel} w={"12px"} />
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
    company: state.company.company,
  };
};

const mapDispatchToProps = {
  editCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompany);
