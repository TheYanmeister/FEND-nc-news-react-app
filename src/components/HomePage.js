import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import ArticleCard from "./ArticleCard";

class HomePage extends Component {
  state = { articles: [] };

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
    const { user } = this.props;
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
        <section>
          <ArticleCard articles={this.filterArticles()} />
        </section>
      </section>
    );
  }
}

export default HomePage;
