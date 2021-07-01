import React, { useContext } from "react";
import { Grid } from "@chakra-ui/react";

// Context
import { NewOfferContext } from "../../../../context/newCreations";

// Components
import CustomInput from "../../../../components/new/CustomInput";
import CategorySelect from "../../../../components/new/CategorySelect";
import OfferPickDates from "../../../../components/new/offer/OfferPickDates";
import PlacesAutocompleteComponent from "../../../../components/ui/PlacesAutocompleteComponent";

const NameDescCatDates = () => {
  const { state, dispatch } = useContext(NewOfferContext);

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
      <PlacesAutocompleteComponent
        locationState={state.projectData.location.address}
        dispatch={dispatch}
      />
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
