import {
	GET_ARTICLES,
	REMOVE_ARTICLE,
	ADD_ARTICLE,
} from '../constants/articles';

const initState = {
	list: [],
	opened: {},
};

const articlesReducer = (state = initState, action) => {
	console.log(action);
	switch (action.type) {
		case ADD_ARTICLE:
			return { ...state, list: [...state.list, action.payload] };
		case GET_ARTICLES:
			return { ...state, list: action.payload };
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
