import React from "react";
import { Text, Box } from "@chakra-ui/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

// CSS
// import "@reach/combobox/styles.css";
import "../../assets/css/places-autocomplete.css";

// ENV & GMaps
import { GMAPS_LIBRARIES } from "../../lib/Constants";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getLatLng,
  getGeocode,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({ locationState, dispatch }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelectPlace = async (address) => {
    setValue(address, false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch({
        type: "setAddress",
        payload: { address: address, lat: lat, lng: lng },
      });
    } catch (error) {
      console.error("handleSelectPlace", error);
    } finally {
      clearSuggestions();
    }
  };

  return (
    <Combobox onSelect={handleSelectPlace} aria-labelledby="demo">
      <ComboboxInput
        className={"autocomplete"}
        placeholder={"Introduce una dirección"}
        value={value || locationState}
        onChange={(e) => {
          if (e.target.value === "") {
            dispatch({
              type: "setAddress",
              payload: {
                address: "",
                lat: null,
                lng: null,
              },
            });
          }
          setValue(e.target.value);
        }}
        disabled={!ready}
      />
      <ComboboxPopover className={"popover"}>
        <ComboboxList className={"popover-list"}>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className={"popover-list__option"}
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const PlacesAutocompleteComponent = ({ locationState, dispatch }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    libraries: GMAPS_LIBRARIES,
  });

  return (
    <>
      {!isLoaded ? (
        <Text>Cargando...</Text>
      ) : loadError ? (
        <Text>Ha ocurrido un error</Text>
      ) : (
        <Box>
          <Text mb={2} fontWeight={"bold"}>
            Dirección
          </Text>
          <PlacesAutocomplete
            locationState={locationState}
            dispatch={dispatch}
          />
        </Box>
      )}
    </>
  );
};

export default PlacesAutocompleteComponent;
