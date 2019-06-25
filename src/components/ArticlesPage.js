import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";

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
    return articles.map(article => (
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
    ));
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
