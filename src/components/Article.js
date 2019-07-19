import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "./api.js";
import VoteButtons from "./VoteButtons";
import PostComment from "./PostComment";
import DeleteButton from "./DeleteButton";

class Article extends Component {
  state = { articleById: { created_at: "" }, comments: [], error: false };

  componentDidMount() {
    api
      .fetchArticleById(this.props.article_id)
      .then(article => this.setState({ articleById: article }))
      .catch(error => {
        const { status } = error.response;
        if (status === 404) navigate("/404");
        if (status === 400) navigate("/articles/badrequest");
      });
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

  handleCommentDelete = event => {
    const { value } = event.target;
    api.deleteComment(value).then(
      this.setState(prevState => ({
        comments: prevState.comments.filter(
          comment => comment.comment_id !== +value
        )
      }))
    );
  };

  formatComments = () => {
    const { comments } = this.state;
    const { user } = this.props;
    return comments.map(comment => (
      <li key={comment.comment_id}>
        <p className="articleComments_body">{comment.body}</p>
        <br /> <p className="articleComments_author">
          User: {comment.author}
        </p>{" "}
        <br />{" "}
        <section className="articlesComments_voteButtons">
          <VoteButtons
            votes={comment.votes}
            comment_id={comment.comment_id}
            isComment={true}
            author={comment.author}
            user={user}
          />
        </section>
        <section className="articleComments_deleteButton">
          <DeleteButton
            user={user}
            author={comment.author}
            handleCommentDelete={this.handleCommentDelete}
            comment_id={comment.comment_id}
          />
        </section>
      </li>
    ));
  };

  renderVoteButtons = () => {
    const { articleById } = this.state;
    const { user } = this.props;
    if (articleById.votes !== undefined) {
      return (
        <VoteButtons
          votes={articleById.votes}
          article_id={articleById.article_id}
          isComment={false}
          author={articleById.author}
          user={user}
        />
      );
    }
  };

  pushComment = commentBody => {
    const { user, article_id } = this.props;
    api
      .postCommentToArticle(article_id, user, commentBody)
      .then(({ comment }) => {
        this.setState(prevState => ({
          comments: [comment, ...prevState.comments]
        }));
      });
  };

  render() {
    const { articleById, comments } = this.state;
    const createdAt = articleById.created_at
      .replace(/[A-Z]/g, " ")
      .slice(0, -8);
    return (
      <section>
        <section className="article_links">
          <Link to="/">Home</Link>
          {" - "}
          <Link to="/articles">Articles</Link>
        </section>
        <h1 className="article_title">{articleById.title}</h1>
        <h4 className="article_dateTime">
          Posted on: {this.formatDate(createdAt)} At: {createdAt.slice(11)}
        </h4>
        <p className="article_body">{articleById.body}</p>
        <h4 className="article_author">Author: {articleById.author}</h4>
        <section className="article_voteButtons">
          {this.renderVoteButtons()}
        </section>
        <h2 className="articleComments_header">Comments</h2>
        <PostComment pushComment={this.pushComment} />{" "}
        <p className="articleComments_numOfComments">
          Number of comments: {comments.length}
        </p>
        <ul>{this.formatComments()}</ul>
      </section>
    );
  }
}

export default Article;
