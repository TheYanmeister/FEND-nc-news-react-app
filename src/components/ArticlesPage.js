import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api.js";
import ArticleCard from "./ArticleCard";

class ArticlesPage extends Component {
  state = {
    articles: [],
    topicFilter: "all",
    orderBy: "date"
  };

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(articles => this.setState({ articles: articles.articles }));
  }

  listArticles = () => {
    let articles = this.filterArticles();
    articles = this.orderArticles(articles);
    return <ArticleCard articles={articles} />;
  };

  filterArticles = () => {
    const { topicFilter, articles } = this.state;
    if (topicFilter === "all") return articles;
    else return articles.filter(article => article.topic === topicFilter);
  };

  orderArticles = articles => {
    const { orderBy } = this.state;
    const sortedArticles = [...articles];
    if (orderBy === "date") return articles;
    else if (orderBy === "comments") {
      return sortedArticles.sort((a, b) => {
        return b.comment_count - a.comment_count;
      });
    } else {
      return sortedArticles.sort((a, b) => {
        return b.votes - a.votes;
      });
    }
  };

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
          <select name="topicFilter" onChange={this.setFilter}>
            <option value="all">All</option>
            <option value="cooking">Cooking</option>
            <option value="coding">Coding</option>
            <option value="football">Football</option>
          </select>{" "}
          Order By:
          <select name="orderBy" onChange={this.setFilter}>
            <option value="date">Date Posted</option>
            <option value="votes">Number of Votes</option>
            <option value="comments">Number of Comments</option>
          </select>
        </p>
        <ul>{this.listArticles()}</ul>
      </section>
    );
  }
}

export default ArticlesPage;
