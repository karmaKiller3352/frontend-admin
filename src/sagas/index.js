import cookie from "js-cookie";
import { takeLatest, put, call } from "redux-saga/effects";
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
} from "./constants/articles";

import {
  requestArticles,
  requestRemoveArticle,
  requestAddArticle,
  requestEditArticle,
  requestGetArticle,
  requestCategories,
} from "./api/index";
import { GET_CATEGORIES, SAGA_GET_CATEGORIES } from "./constants/catgories";

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
    console.log(updated);
    yield put({ type: EDIT_ARTICLE, payload: updated });
    yield call(resolve, updated);
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

export function* sagaWatcher() {
  yield takeLatest(SAGA_GET_ARTICLES, sagaGetArticles);
  yield takeLatest(SAGA_REMOVE_ARTICLE, sagaRemoveArticle);
  yield takeLatest(SAGA_ADD_ARTICLE, sagaAddArticle);
  yield takeLatest(SAGA_EDIT_ARTICLE, sagaEditArticle);
  yield takeLatest(SAGA_SET_ARTICLE, sagaSetArticle);

  yield takeLatest(SAGA_GET_CATEGORIES, sagaGetCategories);
}
