import {
	SAGA_GET_CATEGORIES,
	SAGA_REMOVE_CATEGORY,
	SAGA_ADD_CATEGORY,
	SAGA_EDIT_CATEGORY,
  SAGA_SET_CATEGORY,
  SAGA_REMOVE_ARTICLE_FROM_CAT,
  SAGA_ACTIVITY_CATEGORY,
} from '../constants/categories';

// - Categories
export function getCategories(params = null) {
	return {
		type: SAGA_GET_CATEGORIES,
		payload: params,
	};
}

export function removeCategory(id, resolve) {
	return {
		type: SAGA_REMOVE_CATEGORY,
		payload: {
			id,
			resolve,
		},
	};
}

export function addCategory(formData, resolve, reject) {
	return {
		type: SAGA_ADD_CATEGORY,
		payload: {
			formData,
			resolve,
			reject,
		},
	};
}

export function setCategory(id, resolve, reject) {
	return {
		type: SAGA_SET_CATEGORY,
		payload: {
			id,
			resolve,
			reject,
		},
	};
}

export function editCategory(formData, id, resolve, reject) {
	return {
		type: SAGA_EDIT_CATEGORY,
		payload: {
			formData,
			id,
			resolve,
			reject,
		},
	};
}

export function removeArticleFromCat(id, resolve) {
	return {
		type: SAGA_REMOVE_ARTICLE_FROM_CAT,
		payload: {
      id,
			resolve,
		},
	};
}

export function changeActivityCategory(data, id, resolve, reject) {
	return {
		type: SAGA_ACTIVITY_CATEGORY,
		payload: {
			data,
			id,
			resolve,
			reject,
		},
	};
}