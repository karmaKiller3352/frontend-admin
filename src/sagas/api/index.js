// API REQUESTS
import axios from 'axios';
import cookie from 'js-cookie';
import showError from '../../utils/showError';
const token = cookie.get('TR_token') ? cookie.get('TR_token') : null;
axios.defaults.headers.common['Authorization'] = `${token}`;

const API = {
	ARTICLES: `${process.env.REACT_APP_DEV_HOST}/articles/`,
};

export const requestArticles = async (params) => {
	try {
		const { data } = await axios.get(API.ARTICLES);
		return data;
	} catch (error) {
		showError(error);
	}
};

export const requestRemoveArticle = async (id) => {
	try {
		const { data } = await axios.delete(API.ARTICLES + id);
		return data;
	} catch (error) {
		showError(error);
	}
};

export const requestAddArticle = async (formData) => {
	try {
		const { data } = await axios.post(API.ARTICLES, formData, {
			headers: 'Content-Type: multipart/form-data; boundary=something',
		});
		return data;
	} catch (error) {
		showError(error);
	}
};
