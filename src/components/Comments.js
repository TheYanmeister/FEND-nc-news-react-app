import React, { Component } from "react";
import DeleteButton from "./DeleteButton";
import VoteButtons from "./VoteButtons";
import * as api from "./api";
import { navigate } from "@reach/router";

class Comments extends Component {
  state = { comments: [] };

  componentDidMount() {
    const { getCommentCount } = this.props;
    api
      .fetchCommentsByArticle(this.props.article_id)
      .then(comments =>
        this.setState({ comments: comments.comments }, () =>
          getCommentCount(this.state.comments.length)
        )
      )
      .catch(error => {
        const { status } = error.response;
        navigate("/error", { state: { status } });
      });
  }

  componentDidUpdate(prevProps) {
    const { getCommentCount, newComment } = this.props;
    if (prevProps.newComment !== newComment) {
      this.setState(
        prevState => ({
          comments: [newComment, ...prevState.comments]
        }),
        () => getCommentCount(this.state.comments.length)
      );
    }
  }

  render() {
    const { user } = this.props;
    const { comments } = this.state;
    return comments.map(comment => (
      <li key={comment.comment_id} className="articleComments">
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
            user={this.props.user}
          />
        </section>
        {user === comment.author ? (
          <section className="articleComments_deleteButton">
            <DeleteButton
              user={user}
              author={comment.author}
              handleCommentDelete={this.props.handleCommentDelete}
              comment_id={comment.comment_id}
            />
          </section>
        ) : null}
      </li>
    ));
  }
}

export default Comments;
