import React, { useContext } from "react";
import { Grid } from "@chakra-ui/react";

// Custom
import { NewOfferContext } from "../../../../context/newCreations";

// Components
import CustomInput from "../../../../components/new/CustomInput";
import ContractPicker from "../../../../components/new/projectOffer/ContractPicker";

const OfferLegalPayrolls = () => {
  const { state, dispatch } = useContext(NewOfferContext);

  return (
    <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
      <Grid w={"100%"} columnGap={4} templateColumns={"1fr 1fr"}>
        <CustomInput
          title={"Salario"}
          type={"number"}
          placeholder={`7,50 euros/hora`}
          value={state.offerData.salary}
          onChange={(e) =>
            dispatch({ type: "editSalary", payload: e.target.value })
          }
        />
        <CustomInput
          title={"Horas extra"}
          type={"number"}
          placeholder={`12 euros/hora`}
          value={state.offerData.extraSalary}
          onChange={(e) =>
            dispatch({ type: "editExtraSalary", payload: e.target.value })
          }
        />
      </Grid>
      <Grid w={"100%"} columnGap={4} templateColumns={"1fr 1fr"}>
        {state.offerData.extras.map((extra, index) => (
          <CustomInput
            key={index}
            title={extra.name}
            optional
            type={"number"}
            placeholder={`10 euros`}
            value={state.offerData.extras.find(e => e.id === extra.id).amount} 
            onChange={(e) =>
              dispatch({
                type: "editExtraItem",
                id: extra.id,
                payload: e.target.value,
              })
            }
          />
        ))}
      </Grid>
      <ContractPicker indie />
    </Grid>
  );
};

export default OfferLegalPayrolls;
