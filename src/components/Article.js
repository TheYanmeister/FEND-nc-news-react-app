import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import VoteButtons from "./VoteButtons";

class Article extends Component {
  state = { articleById: { created_at: "" }, comments: [] };

  componentDidMount() {
    api
      .fetchArticleById(this.props.article_id)
      .then(
        article => this.setState({ articleById: article.article }),
        this.setState({ isLoading: false })
      );
    api
      .fetchCommentsByArticle(this.props.article_id)
      .then(comments => this.setState({ comments: comments.comments }));
  }

  formatDate = createdAt => {
    const formattedDate = createdAt.slice(0, -6).split("-");
    const year = formattedDate[0];
    formattedDate[0] = formattedDate[2];
    formattedDate[2] = year;
    return formattedDate.join("-");
  };

  formatComments = () => {
    const { comments } = this.state;
    return comments.map(comment => (
      <p key={comment.comment_id}>
        {comment.body} <br /> {comment.author}{" "}
      </p>
    ));
  };

  render() {
    const { articleById } = this.state;
    const createdAt = articleById.created_at
      .replace(/[A-Z]/g, " ")
      .slice(0, -8);
    return (
      <section>
        <h1>{articleById.title}</h1>
        <h4>
          Posted on: {this.formatDate(createdAt)} At: {createdAt.slice(11)}
        </h4>
        <p>{articleById.body}</p>
        <h4>Author: {articleById.author}</h4>
        <VoteButtons
          votes={articleById.votes}
          article_id={articleById.article_id}
        />
        <Link to="/">Home</Link>
        {" - "}
        <Link to="/articles">Articles</Link>
        <h2>Comments</h2>
        <p>Number of comments: {articleById.comment_count}</p>
        <>{this.formatComments()}</>
      </section>
    );
  }
}

export default Article;
