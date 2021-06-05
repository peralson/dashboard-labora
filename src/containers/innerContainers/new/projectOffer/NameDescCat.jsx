import React, { useContext } from "react";
import { Grid } from "@chakra-ui/react";

// Custom
import { NewProjectOfferContext } from "../../../../context/newCreations";

// Components
import CustomInput from "../../../../components/new/CustomInput";
import CategorySelect from "../../../../components/new/CategorySelect";

const NameDescCat = () => {
  const { state, dispatch } = useContext(NewProjectOfferContext);

  return (
    <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
      <Grid w={"100%"} columnGap={4} templateColumns={"1fr 1fr"}>
        <CustomInput
          title={"Nombre"}
          value={state.name}
          placeholder={"Nombre de la oferta"}
          onChange={(e) =>
            dispatch({ type: "editName", payload: e.target.value })
          }
        />
        <CategorySelect
          title={"Categoría"}
          placeholder={"Selecciona una categoría"}
          onChange={(e) =>
            dispatch({ type: "setCategory", payload: e.target.value })
          }
        />
      </Grid>
      <CustomInput
        title={"Descripción"}
        optional
        multiline
        value={state.description}
        placeholder={"Describe de qué trata el proyecto"}
        onChange={(e) =>
          dispatch({ type: "editDescription", payload: e.target.value })
        }
      />
    </Grid>
  );
};

export default NameDescCat;
