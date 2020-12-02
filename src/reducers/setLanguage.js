const initialState = {
  language: "lithuanian"
};

const setLanguage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default setLanguage;
