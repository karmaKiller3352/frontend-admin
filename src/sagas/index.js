import cookie from 'js-cookie';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
	SAGA_GET_ARTICLES,
	GET_ARTICLES,
	SAGA_REMOVE_ARTICLE,
	REMOVE_ARTICLE,
	ADD_ARTICLE,
	SAGA_ADD_ARTICLE,
} from './constants/articles';

import {
	requestArticles,
	requestRemoveArticle,
	requestAddArticle,
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

function* sagaAddArticle({ payload: { formData, resolve } }) {
	const article = yield call(requestAddArticle, formData);
	yield put({ type: ADD_ARTICLE, payload: article });
	yield call(resolve);
}

export function* sagaWatcher() {
	yield takeLatest(SAGA_GET_ARTICLES, sagaGetArticles);
	yield takeLatest(SAGA_REMOVE_ARTICLE, sagaRemoveArticle);
	yield takeLatest(SAGA_ADD_ARTICLE, sagaAddArticle);
}
