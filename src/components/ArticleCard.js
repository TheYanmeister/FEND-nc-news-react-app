import React from "react";
import { Link } from "@reach/router";

const ArticleCard = props => {
  return (
    <section>
      {props.articles.map(article => {
        return (
          <section key={article.article_id} className="articleCards">
            <h3 className="articleCards_title">
              In {article.topic}: {article.title}
            </h3>
            <p className="articleCards_body">
              {article.body.slice(0, article.body.indexOf(".") + 1)}..{" "}
            </p>
            <p className="articleCards_link">
              {" "}
              <Link
                className="articleCards_link"
                to={`/articles/${article.article_id}`}
              >
                (click to read the full article)
              </Link>
            </p>
            <p className="articleCards_author">Author: {article.author}</p>
            <br />
            <p className="articleCards_commentAndVoteCount">
              Comment count: {article.comment_count} | Votes: {article.votes}
            </p>
          </section>
        );
      })}
    </section>
  );
};

export default ArticleCard;
