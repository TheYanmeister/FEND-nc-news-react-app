import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import ArticleCard from "./ArticleCard";

class ArticlesPage extends Component {
  state = {
    articles: [],
    topicFilter: "all",
    orderBy: null
  };

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(articles => this.setState({ articles: articles.articles }));
  }

  listArticles = () => {
    const { articles } = this.state;
    return <ArticleCard articles={articles} />;
  };

  render() {
    return (
      <section>
        <Link to="/">Home</Link>
        <ul>{this.listArticles()}</ul>
      </section>
    );
  }
}

export default ArticlesPage;
