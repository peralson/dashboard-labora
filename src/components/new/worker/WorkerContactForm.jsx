import React from "react";
import { Flex, Text } from "@chakra-ui/react";

// Components
import Separator from "../../ui/Separator";
import CustomInput from "../CustomInput";
import DirectionPicker from "./DirectionPicker";

// ENV & GMaps
import { GMAPS_LIBRARIES } from "../../../lib/Constants";
import { useLoadScript } from "@react-google-maps/api";

const WorkerContactForm = ({ handleProcess, formik }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		libraries: GMAPS_LIBRARIES,
	});
	const isValid =
		formik.values.contact.phoneNumber &&
		formik.values.contact.phoneNumber.length === 9 &&
		formik.values.contact.location.address;

	return (
    <Flex flexDirection="column" w="400px">
      <Text fontWeight={"bold"} lineHeight={2} mb={2}>
        Información de contacto
      </Text>
      <Separator bottom={4} />
      <CustomInput
        title={"Teléfono"}
        placeholder={"Teléfono"}
        onChange={formik.handleChange("contact.phoneNumber")}
        value={formik.values.contact.phoneNumber}
        mb={4}
      />
      {!isLoaded ? (
        <Text>Cargando...</Text>
      ) : loadError ? (
        <Text>Ha ocurrido un error</Text>
      ) : (
        <DirectionPicker
          title={"Dirección"}
          onChangeAddress={formik.handleChange("contact.location.address")}
          onChangeLat={formik.handleChange("contact.location.lat")}
          onChangeLng={formik.handleChange("contact.location.lng")}
          placeholder={formik.values.contact.location.address}
        />
      )}
      <Flex flexDirection="row" justifyContent="flex-end">
        <Flex
          _hover={{ cursor: isValid && "pointer" }}
          bg={"accent"}
          borderRadius={8}
          fontWeight="bold"
          fontSize={16}
          mt={8}
          alignItems={"center"}
          justifyContent="center"
          opacity={!isValid && 0.6}
          px={4}
          py={2}
          onClick={() => (isValid ? handleProcess(3) : null)}
        >
          Siguiente
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorkerContactForm;
