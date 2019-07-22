import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { Router } from "@reach/router";
import ErrorPage from "./components/ErrorPage";
import ArticlesPage from "./components/ArticlesPage";
import Article from "./components/Article";
import PostArticle from "./components/PostArticle";
import "./style.css";

class App extends Component {
  state = {
    user: "weegembump"
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <h1 className="header">Northcoders News</h1>
        <Router>
          <HomePage path="/" user={user} />
          <ArticlesPage path="/articles" />
          <PostArticle path="/articles/post" user={user} />
          <Article path="/articles/:article_id" user={user} />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
