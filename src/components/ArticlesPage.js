import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "./api.js";
import ArticlesList from "./ArticlesList";

class ArticlesPage extends Component {
  state = {
    articles: [],
    topicFilter: "",
    orderBy: "created_at"
  };

  componentDidMount() {
    const { topicFilter, orderBy } = this.state;
    api
      .fetchOrderedArticlesByTopic(topicFilter, orderBy)
      .then(articles => this.setState({ articles }))
      .catch(error => {
        const { status } = error.response;
        navigate("/error", { state: { status } });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topicFilter, orderBy } = this.state;
    if (
      prevState.topicFilter !== topicFilter ||
      prevState.orderBy !== orderBy
    ) {
      api
        .fetchOrderedArticlesByTopic(topicFilter, orderBy)
        .then(articles => this.setState({ articles }))
        .catch(error => {
          const { status } = error.response;
          navigate("/error", { state: { status } });
        });
    }
  }

  setFilter = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section>
        <h1 className="articlesPage_header">Articles</h1>
        <section className="articlesPage_links">
          <Link to="/">Home</Link>
          {" - "}
          <Link to="/articles/post">Post an Article</Link>
        </section>
        <br />
        <br />
        <p className="articlesPage_filterAndOrderBoxes">
          Filter By:{" "}
          <select
            name="topicFilter"
            onChange={this.setFilter}
            className="articlesPage_selectBoxes"
          >
            <option value="">All</option>
            <option value="cooking">Cooking</option>
            <option value="coding">Coding</option>
            <option value="football">Football</option>
          </select>{" "}
          Order By:
          <select
            name="orderBy"
            onChange={this.setFilter}
            className="articlesPage_selectBoxes"
          >
            <option value="created_at">Date Posted</option>
            <option value="votes">Number of Votes</option>
            <option value="comment_count">Number of Comments</option>
          </select>
        </p>
        <ul>
          <ArticlesList articles={this.state.articles} />
        </ul>
      </section>
    );
  }
}

export default ArticlesPage;
