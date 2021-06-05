export const initialState = {
  name: "",
  location: {
    lat: null,
    lng: null,
    address: "",
  },
  description: "",
  dates: [],
};

export const validateForm = (state) => {
  const hasName = state.name !== "";
  const isNameLong = state.name.length >= 3;
  const hasAddress =
    state.location.address !== "" &&
    state.location.lat !== null &&
    state.location.lng !== null;
  const hasDates = state.dates.length !== 0;

  return {
    isValid: hasName && hasAddress && hasDates && isNameLong,
    hasName: hasName,
    hasAddress: hasAddress,
    hasDates: hasDates,
    isNameLong: isNameLong,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "editName":
      return {
        ...state,
        name: action.payload,
      };

    case "editDescription":
      return {
        ...state,
        description: action.payload,
      };

    case "setAddress":
      return {
        ...state,
        location: action.payload,
      };

    case "setDates":
      return {
        ...state,
        dates: action.payload,
      };

    default:
      return state;
  }
};
