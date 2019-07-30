import React, { Component } from "react";

class PostComment extends Component {
  state = { userComment: "" };

  handleChange = event => {
    this.setState({ userComment: event.target.value });
  };

  handleSubmit = event => {
    const { addNewComment } = this.props;
    event.preventDefault();
    addNewComment(this.state.userComment);
    this.setState({ userComment: "" });
  };

  render() {
    const { userComment } = this.state;
    return (
      <form onSubmit={this.handleSubmit} disabled={userComment === ""}>
        <label className="postComment_postCommentBox">
          Comment:{" "}
          <input
            type="text"
            value={userComment}
            onChange={this.handleChange}
            placeholder="required"
            className="postComment_inputBox"
          />
        </label>{" "}
        <button disabled={userComment === ""} className="postComment_button">
          Submit Comment
        </button>
      </form>
    );
  }
}

export default PostComment;
