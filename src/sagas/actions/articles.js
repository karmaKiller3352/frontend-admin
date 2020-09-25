import {
	SAGA_GET_ARTICLES,
	SAGA_REMOVE_ARTICLE,
	SAGA_ADD_ARTICLE,
	SAGA_EDIT_ARTICLE,
  SAGA_SET_ARTICLE,
  SAGA_ACTIVITY_ARTICLE,
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

export function addArticle(formData, resolve, reject) {
	return {
		type: SAGA_ADD_ARTICLE,
		payload: {
			formData,
			resolve,
			reject,
		},
	};
}

export function setArticle(id, resolve, reject) {
	return {
		type: SAGA_SET_ARTICLE,
		payload: {
			id,
			resolve,
			reject,
		},
	};
}

export function editArticle(formData, id, resolve, reject) {
	return {
		type: SAGA_EDIT_ARTICLE,
		payload: {
			formData,
			id,
			resolve,
			reject,
		},
	};
}

export function changeActivityArticle(data, id, resolve, reject) {
	return {
		type: SAGA_ACTIVITY_ARTICLE,
		payload: {
			data,
			id,
			resolve,
			reject,
		},
	};
}

