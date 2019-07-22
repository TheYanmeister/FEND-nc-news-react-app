import React from "react";
import { Link } from "@reach/router";

const ErrorPage = props => {
  let { status } = props.location.state;
  if (status === null) status = 404;
  return (
    <section className="errorPage">
      <h3>Status: {status}</h3>
      {status === 404 ? (
        <p>
          There doesn't seem to be anything here sorry m8, this page doesn't
          exist at this current moment.
        </p>
      ) : (
        <p>
          Bad request. Reminder when searching for articles that article ids
          should only consist of integers and nothing else.
        </p>
      )}
      <Link to="/">Home</Link>
    </section>
  );
};

export default ErrorPage;
