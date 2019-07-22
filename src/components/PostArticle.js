import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
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
    api
      .postArticle(user, currentTitle, currentTopic, currentBody)
      .then(({ article }) => {
        navigate(`/articles/${article.article_id}`);
      });
  };

  render() {
    const { currentBody, currentTitle, currentTopic } = this.state;
    return (
      <section>
        <h1 className="postArticle_header">Post an Article</h1>
        <p className="postArticle_links">
          <Link to={"/"}>Home</Link>
          {" - "}
          <Link to="/articles">All Articles</Link>
        </p>
        <p>All fields are required</p>
        <br />
        <form
          className="postArticle_form"
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
              className="postArticle_titleBox"
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
              className="postArticle_bodyBox"
              type="text"
              name="currentBody"
              placeholder="body"
              onChange={this.handleChange}
              value={currentBody}
              autoComplete="off"
            />
            <br />
            This field must contain at least one period [ . ]
          </label>
          <br />
          <button
            className="postArticle_submitButton"
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
