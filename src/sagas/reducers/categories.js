import { ADD_CATEGORY, GET_CATEGORIES, REMOVE_CATEGORY, SET_CATEGORY } from "../constants/catgories";

const initState = {
	list: [],
	opened: {},
};

const categoriesReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return { ...state, opened: action.payload };
		case ADD_CATEGORY:
			return { ...state, list: [action.payload, ...state.list] };
		case GET_CATEGORIES:
			return { ...state, list: action.payload };
		case REMOVE_CATEGORY:
			return {
				...state,
				list: state.list.filter((item) => item._id !== action.payload),
			};
		default:
			return state;
	}
};

export default categoriesReducer;
