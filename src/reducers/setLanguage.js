const initialState = {
  language: "lithuanian",
  languageIndex: 0
};

const setLanguage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      let languageIndex;
      if (action.payload === "lithuanian") {
        languageIndex = 0;
      } else {
        languageIndex = 1;
      }
      return { ...state, language: action.payload, languageIndex: languageIndex };
    default:
      return state;
  }
};

export default setLanguage;
