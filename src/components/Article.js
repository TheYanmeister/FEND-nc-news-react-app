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
          handleCommentDelete={this.handleCommentDelete}
          comment_id={comment.comment_id}
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
