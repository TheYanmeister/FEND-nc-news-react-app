import React, { Component } from "react";
import * as api from "./api.js";

class VoteButtons extends Component {
  state = {
    voteChange: 0,
    votes: 0,
    initialUpdate: 0
  };

  handleVotes = increment => {
    const { article_id } = this.props;
    this.setState(
      prevState => ({
        voteChange: prevState.voteChange + increment
      }),
      console.log(this.state, this.props)
    );
  };

  componentDidUpdate() {
    const { initialUpdate } = this.state;
    if (initialUpdate > 1) {
      this.setState(prevState => ({
        votes: this.props.votes,
        initialUpdate: prevState.initialUpdate + 1
      }));
    }
  }

  render() {
    const { voteChange, votes } = this.state;
    return (
      <section>
        <button disabled={voteChange === 1} onClick={() => this.handleVotes(1)}>
          Vote up
        </button>
        <p>Votes: {votes}</p>
        <button
          disabled={voteChange === -1}
          onClick={() => this.handleVotes(-1)}
        >
          Vote down
        </button>
      </section>
    );
  }
}

export default VoteButtons;
