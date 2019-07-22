import React from "react";
import { Link } from "@reach/router";

const ErrorPage = props => {
  let { status } = props.location.state;
  if (status === null) status = 404;
  return (
    <section className="errorPage">
      <h3>Status: {status}</h3>
      {status === 404 ? (
        <p>There doesn't seem to be anything here sorry m8</p>
      ) : (
        <p>Bad request. Article ids only consist of integers</p>
      )}
      <Link to="/">Home</Link>
    </section>
  );
};

export default ErrorPage;
