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

export const patchVotesForComment = (comment_id, voteChange) => {
  return request
    .patch(`comments/${comment_id}`, { inc_votes: voteChange })
    .then(({ data }) => data);
};

export const postCommentToArticle = (article_id, username, body) => {
  return request
    .post(`articles/${article_id}/comments`, { body, username })
    .then(({ data }) => data);
};

export const postArticle = (author, title, topic, body) => {
  return request
    .post("articles", { author, title, topic, body })
    .then(({ data }) => data);
};

export const deleteComment = () => {
  return request.delete("articles").then(({ data }) => data);
};
