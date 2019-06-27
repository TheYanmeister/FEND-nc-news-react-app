import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { Router } from "@reach/router";
import NotFound from "./components/NotFound";
import ArticlesPage from "./components/ArticlesPage";
import Article from "./components/Article";

class App extends Component {
  state = {
    user: "jessjelly"
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Router>
          <HomePage path="/" user={user} />
          <ArticlesPage path="/articles" />
          <Article path="/articles/:article_id" user={user} />
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default App;
