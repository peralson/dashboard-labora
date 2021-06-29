import React, { useState, useEffect } from "react";
import { Box, Text, Grid } from "@chakra-ui/react";

// Svg
import ContractItem from "./ContractItem";

const ContractPicker = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contracts.length === 0) {
      setLoading(true);
      setError(null);
      (async () => {
        await fetch(
          "https://us-central1-partime-60670.cloudfunctions.net/api/contract/company/templates",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("fbase_key")}`,
            },
          },
        )
          .then((res) => res.json())
          .then((data) => setContracts(data.body))
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Text mb={1} fontWeight={"bold"} lineHeight={2}>
        Modelo de contrato *
      </Text>
      <Text mb={4} color={"grey.dark"}>
        Selecciona, entre tus contratos modelo, el contrato por el que se regirá
        esta oferta de empleo.
      </Text>
      {loading ? (
        <Text>Loading</Text>
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <Grid w={"100%"} templateColumns={"1fr 1fr 1fr"} columnGap={4}>
          {contracts.map((contract, index) => (
            <ContractItem
              key={index}
              id={contract.id}
              name={contract.name}
              file={contract.url}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ContractPicker;
