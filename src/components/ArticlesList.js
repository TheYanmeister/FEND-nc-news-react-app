import React from "react";
import { Link } from "@reach/router";

const ArticlesList = props => {
  return (
    <section>
      {props.articles.map(article => {
        return (
          <section key={article.article_id} className="articlesList">
            <h3 className="articlesList_title">
              In {article.topic}: {article.title}
            </h3>
            <p className="articlesList_body">
              {article.body.slice(0, article.body.indexOf(".") + 1)}..{" "}
            </p>
            <p className="articlesList_link">
              {" "}
              <Link
                className="articlesList_link"
                to={`/articles/${article.article_id}`}
              >
                (click to read the full article)
              </Link>
            </p>
            <p className="articlesList_author">Author: {article.author}</p>
            <br />
            <p className="articlesList_commentAndVoteCount">
              Comment count: {article.comment_count} | Votes: {article.votes}
            </p>
          </section>
        );
      })}
    </section>
  );
};

export default ArticlesList;
