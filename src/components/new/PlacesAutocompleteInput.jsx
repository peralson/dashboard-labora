import React, { useContext } from "react";
import { Box, Text, Input } from "@chakra-ui/react";

// Context
import { NewProjectContext } from "../../context/newCreations";

// GMaps
import usePlacesAutocomplete, {
  getLatLng,
  getGeocode,
} from "use-places-autocomplete";

const PlacesAutocompleteInput = ({ title, optional }) => {
  const { dispatch } = useContext(NewProjectContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { data, status },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch({
        type: "setAddress",
        payload: { address: address, lat: lat, lng: lng },
      });
    } catch (error) {
      console.log(error);
    } finally {
      clearSuggestions();
    }
  };

  return (
    <Box>
      <Text mb={2} fontWeight={"bold"}>
        {title}
        {optional ? "" : " *"}
      </Text>
      <Input
        py={2}
        px={3}
        borderRadius={8}
        borderWidth={2}
        borderColor={"darkLight"}
        placeholder={"Introduce la dirección del proyecto"}
        _active={{ borderColor: "white" }}
        _focus={{ borderColor: "white" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            dispatch({
              type: "setAddress",
              payload: { address: "", lat: null, lng: null },
            });
          }
        }}
        disabled={!ready}
      />
      {data.length > 0 && (
        <Box
          borderWidth={2}
          borderColor={"darkLight"}
          borderTopWidth={0}
          borderBottomRadius={10}
        >
          {status === "OK" &&
            data.map(({ description }, index) => (
              <Text
                key={index}
                p={2}
                borderBottomWidth={1}
                borderBottomColor={"translucid"}
                lineHeight={2}
                fontSize={14}
                color={"grey.dark"}
                _hover={{ bg: "translucid" }}
                cursor={"pointer"}
                onClick={() => handleSelect(description)}
              >
                {description}
              </Text>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default PlacesAutocompleteInput;
