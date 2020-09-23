// API REQUESTS
import axios from "axios";
import cookie from "js-cookie";
import showError from "../../utils/showError";
const token = cookie.get("TR_token") ? cookie.get("TR_token") : null;
axios.defaults.headers.common["Authorization"] = `${token}`;

const API = {
  ARTICLES: `/api/articles/`,
  CATEGORIES: "/api/categories/",
};

export const requestArticles = async (params) => {
  try {
    const query = params ? Object.keys(params).reduce((acc, key) => acc+`${key}=${params[key]}&`, "?") : '';
    const { data } = await axios.get(API.ARTICLES+query);
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
      headers: { "Access-Control-Allow-Origin": "*" },
      mode: "cors",
    });
    return data;
  } catch (error) {
    return {
      error: {
        message: error.response.data.message,
      },
    };
  }
};

export const requestEditArticle = async (formData, id) => {
  try {
    const { data } = await axios.patch(API.ARTICLES + id, formData, {
      headers: { "Access-Control-Allow-Origin": "*" },
      mode: "cors",
    });
    return data;
  } catch (error) {
    console.log(error.response);
    return {
      error: {
        message: error.response.data.message,
      },
    };
  }
};

export const requestGetArticle = async (id) => {
  try {
    const { data } = await axios.get(API.ARTICLES + id);
    return data;
  } catch (error) {
    return {
      error: {
        message: error.response.data.message,
      },
    };
  }
};

export const requestCategories = async (params) => {
  try {
    const query = params ? Object.keys(params).reduce((acc, key) => acc+`${key}=${params[key]}&`, "?") : '';
    const { data } = await axios.get(API.CATEGORIES+query);
    return data;
  } catch (error) {
    showError(error);
  }
};
