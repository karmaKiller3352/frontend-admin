import {
	SAGA_GET_ARTICLES,
	SAGA_REMOVE_ARTICLE,
	SAGA_ADD_ARTICLE,
} from '../constants/articles';

// - Articles
export function getArticles(params = null) {
	return {
		type: SAGA_GET_ARTICLES,
		payload: params,
	};
}

export function removeArticle(id, resolve) {
	return {
		type: SAGA_REMOVE_ARTICLE,
		payload: {
			id,
			resolve,
		},
	};
}

export function addArticle(formData, resolve) {
	return {
		type: SAGA_ADD_ARTICLE,
		payload: {
			formData,
			resolve,
		},
	};
}
