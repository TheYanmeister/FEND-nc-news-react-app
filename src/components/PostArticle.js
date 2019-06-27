import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";

class PostArticle extends Component {
  state = {
    currentTitle: "",
    currentTopic: "",
    currentBody: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props;
    const { currentBody, currentTitle, currentTopic } = this.state;
    api.postArticle(user, currentTitle, currentTopic, currentBody);
    this.setState({ currentBody: "", currentTitle: "", currentTopic: "" });
  };

  render() {
    const { currentBody, currentTitle, currentTopic } = this.state;
    return (
      <section>
        <h1>Post an Article</h1>
        <Link to={"/"}>Home</Link>
        {" - "}
        <Link to="/articles">All Articles</Link>
        <br />
        <br />
        <form
          onSubmit={this.handleSubmit}
          disabled={
            currentBody === "" ||
            currentTitle === "" ||
            currentTopic === "" ||
            !currentBody.includes(".")
          }
        >
          <label>
            Title:
            <input
              type="text"
              name="currentTitle"
              placeholder="title"
              onChange={this.handleChange}
              value={currentTitle}
              autoComplete="off"
            />
          </label>
          <br />
          <label>
            Topic:
            <select
              name="currentTopic"
              value={currentTopic}
              onChange={this.handleChange}
            >
              <option value="" />
              <option value="cooking">Cooking</option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
            </select>
          </label>
          <br />
          <label>
            Body:
            <input
              type="text"
              name="currentBody"
              placeholder="body"
              onChange={this.handleChange}
              value={currentBody}
              autoComplete="off"
            />
          </label>
          <br />
          <button
            disabled={
              currentBody === "" ||
              currentTitle === "" ||
              currentTopic === "" ||
              !currentBody.includes(".")
            }
          >
            Submit Article
          </button>
        </form>
      </section>
    );
  }
}

export default PostArticle;
