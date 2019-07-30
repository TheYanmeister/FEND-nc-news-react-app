import React, { Component } from "react";
import * as api from "./api.js";
import { navigate } from "@reach/router";

class VoteButtons extends Component {
  state = {
    voteChange: 0,
    displayVotes: 0
  };

  handleVotes = increment => {
    const votes = increment;
    this.setState(prevState => {
      if (prevState.voteChange === 1) increment--;
      if (prevState.voteChange === -1) increment++;
      return {
        voteChange: prevState.voteChange + increment,
        displayVotes: prevState.displayVotes + votes
      };
    }, this.updateVotes);
  };

  updateVotes = () => {
    const { voteChange } = this.state;
    const { article_id, isComment, comment_id } = this.props;
    if (isComment === false)
      return api.patchVotesForArticle(article_id, voteChange).catch(error => {
        const { status } = error.response;
        navigate("/error", { state: { status } });
      });
    else if (isComment === true)
      return api.patchVotesForComment(comment_id, voteChange).catch(error => {
        const { status } = error.response;
        navigate("/error", { state: { status } });
      });
  };

  componentDidMount() {
    const { votes } = this.props;
    this.setState({ displayVotes: votes });
  }

  render() {
    const { displayVotes } = this.state;
    const { votes, user, author } = this.props;
    if (user !== author) {
      return (
        <section>
          <button
            disabled={displayVotes === votes + 1 || user === author}
            onClick={() => this.handleVotes(1)}
          >
            Vote up
          </button>{" "}
          Votes: {displayVotes}{" "}
          <button
            disabled={displayVotes === votes - 1 || user === author}
            onClick={() => this.handleVotes(-1)}
          >
            Vote down
          </button>
          <br />
        </section>
      );
    } else return <section>Votes: {displayVotes}</section>;
  }
}

export default VoteButtons;
