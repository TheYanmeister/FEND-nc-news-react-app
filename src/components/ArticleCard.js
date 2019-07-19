import React from "react";
import { Link } from "@reach/router";

const formatArticleCard = props => {
  return props.articles.map(article => {
    return (
      <section key={article.article_id} className="articleCards">
        <h3 className="articleCards_title">
          In {article.topic}: {article.title}
        </h3>
        <p className="articleCards_body">
          {article.body.slice(0, article.body.indexOf(".") + 1)}..{" "}
        </p>
        <p>
          {" "}
          <Link to={`/articles/${article.article_id}`}>
            (click to read the full article)
          </Link>
        </p>
        <p className="articleCards_author">Author: {article.author}</p>
        <br />
        <p>
          Comment count: {article.comment_count} | Votes: {article.votes}
        </p>
      </section>
    );
  });
};

const ArticleCard = props => {
  return <section>{formatArticleCard(props)}</section>;
};

export default ArticleCard;
