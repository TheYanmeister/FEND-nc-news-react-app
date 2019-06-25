import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import ArticleCard from "./ArticleCard";

class HomePage extends Component {
  state = { articles: [], user: "jessjelly" };

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(articles => this.setState({ articles: articles.articles }));
  }

  filterArticles = () => {
    const { articles } = this.state;
    const filteredArticles = [];
    const articleTally = {};
    articles.forEach(article => {
      if (!articleTally.hasOwnProperty(article.topic)) {
        articleTally[article.topic] = 1;
        filteredArticles.push(article);
      }
    });
    return filteredArticles;
  };

  render() {
    const { user } = this.state;
    return (
      <section>
        <h1>Beans</h1>
        <p>Logged in as: {user}</p>
        <Link to="/articles">All Articles</Link>
        <ul>
          <ArticleCard articles={this.filterArticles()} />
        </ul>
      </section>
    );
  }
}

export default HomePage;
