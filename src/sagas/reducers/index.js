import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';

const rootReducer = combineReducers({
	articles,
	categories
});
export default rootReducer;
