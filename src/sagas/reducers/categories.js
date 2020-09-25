import {
	ADD_CATEGORY,
	GET_CATEGORIES,
	REMOVE_CATEGORY,
  SET_CATEGORY,
  REMOVE_ARTICLE_FROM_CAT,
} from '../constants/categories';

const initState = {
	list: [],
	opened: {
		category: {},
		articles: [],
	},
};

const categoriesReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return { ...state, opened: action.payload };
		case ADD_CATEGORY:
			return { ...state, list: [action.payload, ...state.list] };
		case GET_CATEGORIES:
			return {
				...state,
				list: action.payload.categories,
				pagination: action.payload.pagination,
			};
		case REMOVE_CATEGORY:
			return {
				...state,
				list: state.list.filter((item) => item._id !== action.payload),
			};

		case REMOVE_ARTICLE_FROM_CAT:
      console.log(state);
      const newState = {
        ...state,
        opened: {
          ...state.opened,
          articles: state.opened.articles.filter((item) => item._id !== action.payload.id),
        }
      }
      console.log(action.payload)
      console.log(newState)
			return newState
		default:
			return state;
	}
};

export default categoriesReducer;
