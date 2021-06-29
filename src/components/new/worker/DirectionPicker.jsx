import React from "react";
import { Box, Text, Input } from "@chakra-ui/react";

// GMaps
import usePlacesAutocomplete, {
	getLatLng,
	getGeocode,
} from "use-places-autocomplete";

const DirectionPicker = ({
	title,
	onChangeAddress,
	onChangeLat,
	onChangeLng,
  placeholder,
}) => {
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
			onChangeAddress(address);
			onChangeLat(lat);
			onChangeLng(lng);
		} catch (error) {
			console.log(error);
		} finally {
			clearSuggestions();
		}
	};

	return (
    <Box maxW={"400px"} w={"100%"} px={4}>
      <Text fontWeight={"bold"} lineHeight={2}>
        {title}
      </Text>
      <Input
        mt={2}
        py={2}
        px={3}
        borderRadius={8}
        borderWidth={2}
        borderColor={"darkLight"}
        placeholder={placeholder ? placeholder : "Introduce tu dirección"}
        _active={{ borderColor: "white" }}
        _focus={{ borderColor: "white" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            onChangeAddress("");
            onChangeLat();
            onChangeLng();
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

export default DirectionPicker;
