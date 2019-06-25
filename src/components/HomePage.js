import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";

class HomePage extends Component {
  state = { articles: [], user: "jessjelly" };

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(articles => this.setState({ articles: articles.articles }));
  }

  getArticleOfEachTopic = () => {
    const { articles } = this.state;
    const topicTally = {};
    // eslint-disable-next-line
    return articles.map(article => {
      if (topicTally[article.topic] === undefined) {
        topicTally[article.topic] = 1;
        return (
          <li key={article.article_id}>
            <h3>
              In {article.topic}: {article.title}
            </h3>
            <p>
              {article.body.slice(0, article.body.indexOf(".") + 1)}.. <br />
              <Link to={`/articles/${article.article_id}`}>
                (click to read the full article)
              </Link>
            </p>
            <p>Author: {article.author}</p>
            <br />
          </li>
        );
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <section>
        <h1>Beans</h1>
        <p>Logged in as: {user}</p>
        <Link to="/articles">All Articles</Link>
        <ul>{this.getArticleOfEachTopic()}</ul>
      </section>
    );
  }
}

export default HomePage;
