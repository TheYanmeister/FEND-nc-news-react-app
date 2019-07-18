import React, { Component } from "react";

class PostComment extends Component {
  state = { userComment: "" };

  handleChange = event => {
    this.setState({ userComment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.pushComment(this.state.userComment);
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
          />
        </label>{" "}
        <button disabled={userComment === ""}>Submit Comment</button>
      </form>
    );
  }
}

export default PostComment;
