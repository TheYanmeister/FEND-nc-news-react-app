import React from "react";
import { Link } from "@reach/router";

const BadRequest = () => {
  return (
    <section>
      <h3>400</h3>
      <p>You can only search for an article with a numerical id</p>
      <Link to="/">Home</Link>
    </section>
  );
};

export default BadRequest;
