import {
  GET_ARTICLES,
  REMOVE_ARTICLE,
  ADD_ARTICLE,
  SET_ARTICLE,
  EDIT_ARTICLE,
} from "../constants/articles";

const initState = {
  list: [],
  opened: {},
};

const articlesReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, opened: action.payload };
    case ADD_ARTICLE:
      return { ...state, list: [action.payload, ...state.list] };
    case EDIT_ARTICLE:
      return { ...state, opened: action.payload };
    case GET_ARTICLES:
      return { ...state, list: action.payload.articles, pagination: action.payload.pagination };
    case REMOVE_ARTICLE:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default articlesReducer;
