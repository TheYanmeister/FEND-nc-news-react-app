import React from "react";
import { Link } from "@reach/router";

const formatArticleCard = props => {
  return props.articles.map(article => {
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
  });
};

const ArticleCard = props => {
  return <section>{formatArticleCard(props)}</section>;
};

export default ArticleCard;
