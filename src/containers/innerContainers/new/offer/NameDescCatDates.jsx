import React, { useContext } from "react";
import { Grid, Text } from "@chakra-ui/react";

// Context
import { NewOfferContext } from "../../../../context/newCreations";

// ENV & GMaps
import { GMAPS_LIBRARIES } from "../../../../lib/Constants";
import { useLoadScript } from "@react-google-maps/api";

// Components
import CustomInput from "../../../../components/new/CustomInput";
import CategorySelect from "../../../../components/new/CategorySelect";
import OfferPickDates from "../../../../components/new/offer/OfferPickDates";
import OfferPlacesAutocompleteInput from "../../../../components/new/offer/OfferPlacesAutocompleteInput";

const NameDescCatDates = () => {
  const { state, dispatch } = useContext(NewOfferContext);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    libraries: GMAPS_LIBRARIES,
  });

  return (
    <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
      <Grid w={"100%"} columnGap={4} templateColumns={"1fr 1fr"}>
        <CustomInput
          title={"Nombre"}
          value={state.offerData.name}
          placeholder={"Nombre de la oferta"}
          onChange={(e) =>
            dispatch({ type: "editName", payload: e.target.value })
          }
        />
        <CategorySelect
          title={"Categoría"}
          placeholder={"Selecciona una categoría"}
          value={state.offerData.category}
          onChange={(e) => 
            dispatch({ type: "setCategory", payload: e.target.value })
          }
        />
      </Grid>
      {!isLoaded ? (
        <Text>Cargando...</Text>
      ) : loadError ? (
        <Text>Ha ocurrido un error</Text>
      ) : (
        <OfferPlacesAutocompleteInput
          title={"Dirección"}
          placeholder={"Introduce la dirección"}
        />
      )}
      <CustomInput
        title={"Descripción"}
        optional
        multiline
        value={state.offerData.description}
        placeholder={"Describe de qué trata el proyecto"}
        onChange={(e) =>
          dispatch({ type: "editDescription", payload: e.target.value })
        }
      />
      <OfferPickDates />
    </Grid>
  );
};

export default NameDescCatDates;
