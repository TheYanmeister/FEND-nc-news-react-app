import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "./api.js";
import VoteButtons from "./VoteButtons";
import PostComment from "./PostComment";
import FormatComments from "./FormatComments";

class Article extends Component {
  state = {
    articleById: { created_at: "" },
    error: false,
    isLoading: true,
    numOfComments: 0
  };

  componentDidMount() {
    api
      .fetchArticleById(this.props.article_id)
      .then(article =>
        this.setState({ articleById: article, isLoading: false })
      )
      .catch(error => {
        console.log(error);
        const { status } = error.response;
        navigate("/error", { state: { status } });
      });
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

  getCommentCount = numOfComments => {
    this.setState({ numOfComments });
  };

  render() {
    const { articleById, comments, isLoading, numOfComments } = this.state;
    const { user, article_id } = this.props;
    const createdAt = articleById.created_at
      .replace(/[A-Z]/g, " ")
      .slice(0, -8);
    if (isLoading) {
      return <h3 className="article_loading">Loading...</h3>;
    } else {
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
            {articleById.votes !== undefined ? (
              <VoteButtons
                votes={articleById.votes}
                article_id={articleById.article_id}
                isComment={false}
                author={articleById.author}
                user={user}
              />
            ) : null}
          </section>
          <h2 className="articleComments_header">Comments</h2>
          <PostComment pushComment={this.pushComment} />{" "}
          <p className="articleComments_numOfComments">
            Number of comments: {numOfComments}
          </p>
          <ul>
            <FormatComments
              user={user}
              comments={comments}
              handleCommentDelete={this.handleCommentDelete}
              article_id={article_id}
              getCommentCount={this.getCommentCount}
            />
          </ul>
        </section>
      );
    }
  }
}

export default Article;
