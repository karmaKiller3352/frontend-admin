import cookie from 'js-cookie';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
	SAGA_GET_ARTICLES,
	GET_ARTICLES,
	SAGA_REMOVE_ARTICLE,
	REMOVE_ARTICLE,
	ADD_ARTICLE,
	SAGA_ADD_ARTICLE,
	SAGA_EDIT_ARTICLE,
	EDIT_ARTICLE,
	SET_ARTICLE,
  SAGA_SET_ARTICLE,
  SAGA_ACTIVITY_ARTICLE,
} from './constants/articles';
import {
	GET_CATEGORIES,
	REMOVE_CATEGORY,
	EDIT_CATEGORY,
	SAGA_EDIT_CATEGORY,
	SAGA_GET_CATEGORIES,
	SAGA_SET_CATEGORY,
	SET_CATEGORY,
	SAGA_ADD_CATEGORY,
	ADD_CATEGORY,
  SAGA_REMOVE_CATEGORY,
  REMOVE_ARTICLE_FROM_CAT,
  SAGA_REMOVE_ARTICLE_FROM_CAT,
  SAGA_ACTIVITY_CATEGORY,
} from './constants/categories';
import {
	requestArticles,
	requestRemoveArticle,
	requestAddArticle,
	requestEditArticle,
	requestGetArticle,
	requestCategories,
	requestGetCategory,
	requestEditCategory,
	requestAddCategory,
	requestRemoveCategory,
} from './api/index';


function* sagaGetArticles({ payload }) {
	const list = yield call(requestArticles, payload);
	yield put({ type: GET_ARTICLES, payload: list });
}

function* sagaRemoveArticle({ payload: { id, resolve } }) {
	yield call(requestRemoveArticle, id);
	yield put({ type: REMOVE_ARTICLE, payload: id });
	yield call(resolve);
}

function* sagaAddArticle({ payload: { formData, resolve, reject } }) {
	const article = yield call(requestAddArticle, formData);
	if (article.error) {
		yield call(reject, article.error.message);
	} else {
		yield put({ type: ADD_ARTICLE, payload: article });
		yield put({ type: SET_ARTICLE, payload: article });
		yield call(resolve, article);
	}
}

function* sagaEditArticle({ payload: { formData, id, resolve, reject } }) {
	const article = yield call(requestEditArticle, formData, id);
	if (article.error) {
		yield call(reject, article.error.message);
	} else {
		const updated = Object.fromEntries(formData);
		yield put({ type: EDIT_ARTICLE, payload: updated });
		yield call(resolve, updated);
	}
}

function* sagaActivityArticle({ payload: { data, id, resolve, reject } }) {
	const article = yield call(requestEditArticle, data, id);
	if (article.error) {
		yield call(reject, article.error.message);
	} else {
		yield call(resolve);
	}
}

function* sagaActivityCategory({ payload: { data, id, resolve, reject } }) {
	const category = yield call(requestEditCategory, data, id);
	if (category.error) {
		yield call(reject, category.error.message);
	} else {
		yield call(resolve);
	}
}

function* sagaSetArticle({ payload: { id, resolve, reject } }) {
	const article = yield call(requestGetArticle, id);
	if (article.error) {
		yield call(reject, article.error.message);
	} else {
		yield put({ type: SET_ARTICLE, payload: article });
		yield call(resolve, article);
	}
}

function* sagaGetCategories({ payload }) {
	const list = yield call(requestCategories, payload);
	yield put({ type: GET_CATEGORIES, payload: list });
}

function* sagaSetCategory({ payload: { id, resolve, reject } }) {
	const category = yield call(requestGetCategory, id);
	if (category.error) {
		yield call(reject, category.error.message);
	} else {
		yield put({ type: SET_CATEGORY, payload: category });
		yield call(resolve, category);
	}
}

function* sagaEditCategory({ payload: { formData, id, resolve, reject } }) {
	const category = yield call(requestEditCategory, formData, id);
	if (category.error) {
		yield call(reject, category.error.message);
	} else {
		const updated = Object.fromEntries(formData);
		yield put({ type: EDIT_CATEGORY, payload: updated });
		yield call(resolve, updated);
	}
}

function* sagaAddCategory({ payload: { formData, resolve, reject } }) {
	const category = yield call(requestAddCategory, formData);
	if (category.error) {
		yield call(reject, category.error.message);
	} else {
		yield put({ type: ADD_CATEGORY, payload: category });
		yield put({ type: SET_CATEGORY, payload: category });
		yield call(resolve, category);
	}
}

function* sagaRemoveCategory({ payload: { id, resolve } }) {
	yield call(requestRemoveCategory, id);
	yield put({ type: REMOVE_CATEGORY, payload: id });
	yield call(resolve);
}

function* sagaRemoveArticleFromCat({ payload: { id, catId, resolve } }) {
	yield call(requestRemoveArticle, id);
	yield put({ type: REMOVE_ARTICLE, payload: id });
	yield put({
		type: REMOVE_ARTICLE_FROM_CAT,
		payload: {
			id,
			catId,
		},
	});
	yield call(resolve);
}

export function* sagaWatcher() {
	yield takeLatest(SAGA_GET_ARTICLES, sagaGetArticles);
	yield takeLatest(SAGA_REMOVE_ARTICLE, sagaRemoveArticle);
	yield takeLatest(SAGA_ADD_ARTICLE, sagaAddArticle);
  yield takeLatest(SAGA_EDIT_ARTICLE, sagaEditArticle);
  yield takeLatest(SAGA_ACTIVITY_ARTICLE, sagaActivityArticle);
  yield takeLatest(SAGA_SET_ARTICLE, sagaSetArticle);
  

	yield takeLatest(SAGA_GET_CATEGORIES, sagaGetCategories);
	yield takeLatest(SAGA_SET_CATEGORY, sagaSetCategory);
	yield takeLatest(SAGA_EDIT_CATEGORY, sagaEditCategory);
	yield takeLatest(SAGA_ADD_CATEGORY, sagaAddCategory);
	yield takeLatest(SAGA_REMOVE_CATEGORY, sagaRemoveCategory);
  yield takeLatest(SAGA_REMOVE_ARTICLE_FROM_CAT, sagaRemoveArticleFromCat);
  yield takeLatest(SAGA_ACTIVITY_CATEGORY, sagaActivityCategory);
}
