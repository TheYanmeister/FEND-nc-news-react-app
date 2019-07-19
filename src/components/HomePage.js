import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import ArticleCard from "./ArticleCard";

class HomePage extends Component {
  state = { articles: [] };

  componentDidMount() {
    api
      .fetchOrderedArticlesByTopic("", "created_at")
      .then(articles => this.setState({ articles: articles }));
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
    const { user } = this.props;
    const filteredArticles = this.filterArticles();
    return (
      <section className="homePage">
        <p className="homePage_user">Logged in as: {user}</p>
        <p className="homePage_msg">
          Reminder that you may not up/down vote your own articles and comments
        </p>
        <p className="homePage_links">
          <Link to="/articles">All Articles</Link>
          {" - "}
          <Link to="/articles/post">Post an Article</Link>
        </p>
        <p>Here's the most recent article from each topic</p>
        <section>
          <ArticleCard articles={filteredArticles} />
        </section>
      </section>
    );
  }
}

export default HomePage;
