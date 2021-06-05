import React, { useState, useEffect } from "react";
import { Box, Select, Text } from "@chakra-ui/react";

const CategorySelect = ({ title, placeholder, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categories.length === 0) {
      setError(null);
      (async () => {
        await fetch(
          "https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/categories",
          { headers: { "Content-Type": "application/json" } },
        )
          .then((res) => res.json())
          .then((data) => setCategories(data.body))
          .catch((err) => setError(err.message));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Text mb={2} fontWeight={"bold"} lineHeight={2}>
        {title} *
      </Text>
      <Select
        placeholder={error ? "Ha habido un error" : placeholder}
        onChange={onChange}
        borderRadius={8}
        borderWidth={2}
        borderColor={error ? "red.smooth" : "darkLight"}
        color={error ? "red.full" : "white"}
        _placeholder={{ color: "grey.dark" }}
        _hover={{ borderColor: "white" }}
        _focus={{ borderColor: "white" }}
      >
        {categories.map(({ id }) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CategorySelect;