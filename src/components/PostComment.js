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
      <form onSubmit={this.handleSubmit}>
        <label>
          Comment:{" "}
          <input type="text" value={userComment} onChange={this.handleChange} />
        </label>{" "}
        <button>Submit Comment</button>
      </form>
    );
  }
}

export default PostComment;
