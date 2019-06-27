import React, { Component } from "react";
import * as api from "./api.js";

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
    const { article_id } = this.props;
    api.patchVotesForArticle(article_id, voteChange);
  };

  componentDidMount() {
    this.setState({ displayVotes: this.props.votes });
  }

  render() {
    const { displayVotes } = this.state;
    const { votes } = this.props;
    return (
      <section>
        <button
          disabled={displayVotes === votes + 1}
          onClick={() => this.handleVotes(1)}
        >
          Vote up
        </button>
        <p>Votes: {displayVotes}</p>
        <button
          disabled={displayVotes === votes - 1}
          onClick={() => this.handleVotes(-1)}
        >
          Vote down
        </button>
        <br />
        <br />
      </section>
    );
  }
}

export default VoteButtons;
