import axios from "axios";

const request = axios.create({
  baseURL: "https://the-best-nc-news-app.herokuapp.com/api"
});

export const fetchAllArticles = () => {
  return request.get("/articles").then(({ data }) => data);
};

export const fetchArticleById = article_id => {
  return request.get(`/articles/${article_id}`).then(({ data }) => data);
};

export const fetchCommentsByArticle = article_id => {
  return request
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data);
};

export const patchVotesForArticle = (article_id, voteChange) => {
  return request
    .patch(`articles/${article_id}`, { inc_votes: voteChange })
    .then(({ data }) => data);
};

// when importing do it as "import * as api from 'api.js'" so when a function is called it is done by api.function"
