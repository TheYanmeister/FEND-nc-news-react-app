import React from "react";
import { Link } from "@reach/router";

const NotFound = () => {
  return (
    <section>
      <h3>404</h3>
      <p>There doesn't seem to be anything here sorry m8</p>
      <Link to="/">Home</Link>
    </section>
  );
};

export default NotFound;
