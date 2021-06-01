export const initialState = {
  name: "",
  location: {
    lat: null,
    lng: null,
    address: null,
  },
  description: "",
  dates: [],
};

export const validateForm = (state) => {
  return true;
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

    case "addDate":
      return {
        ...state,
        dates: state.dates.push(action.payload),
      };

    case "removeDate":
      return {
        ...state,
        dates: state.dates.filter((date) => date !== action.payload),
      };

    default:
      return state;
  }
};
