import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import VoteButtons from "./VoteButtons";
import PostComment from "./PostComment";
import DeleteButton from "./DeleteButton";

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

  handleDelete = () => {};

  formatComments = () => {
    const { comments } = this.state;
    const { user } = this.props;
    return comments.map(comment => (
      <li key={comment.comment_id} className="articleComments_deleteButton">
        {comment.body} <br /> User: {comment.author} <br />{" "}
        <VoteButtons
          votes={comment.votes}
          comment_id={comment.comment_id}
          isComment={true}
          author={comment.author}
          user={user}
        />
        <DeleteButton
          user={user}
          author={comment.author}
          handleDelete={this.handleDelete}
        />
      </li>
    ));
  };

  renderVoteButtons = () => {
    const { articleById } = this.state;
    const { user } = this.props;
    if (articleById.votes !== undefined)
      return (
        <VoteButtons
          votes={articleById.votes}
          article_id={articleById.article_id}
          isComment={false}
          author={articleById.author}
          user={user}
        />
      );
  };

  pushComment = commentBody => {
    const { user, article_id } = this.props;
    this.setState(prevState => ({
      comments: [
        { body: commentBody, author: user, comment_id: Date.now(), votes: 0 },
        ...prevState.comments
      ]
    }));
    api.postCommentToArticle(article_id, user, commentBody);
  };

  render() {
    const { articleById, comments } = this.state;
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
        <>{this.renderVoteButtons()}</>
        <Link to="/">Home</Link>
        {" - "}
        <Link to="/articles">Articles</Link>
        <h2>Comments</h2>
        <PostComment pushComment={this.pushComment} />
        <p>Number of comments: {comments.length}</p>
        <ul>{this.formatComments()}</ul>
      </section>
    );
  }
}

export default Article;
