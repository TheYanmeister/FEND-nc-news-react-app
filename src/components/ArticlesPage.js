import React, { Component } from "react";
import { Link } from "@reach/router";

const articles = [
  {
    article_id: 33,
    title: "Seafood substitutions are increasing",
    body:
      "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
    votes: 0,
    topic: "cooking",
    author: "weegembump",
    created_at: "2018-05-30T15:59:13.341Z",
    comment_count: "6"
  },
  {
    article_id: 28,
    title: "High Altitude Cooking",
    body:
      "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
    votes: 0,
    topic: "cooking",
    author: "happyamy2016",
    created_at: "2018-05-27T03:32:28.514Z",
    comment_count: "5"
  },
  {
    article_id: 30,
    title:
      "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
    body:
      "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagine a world where presenting a platter of seasonal vegetables inspires the same amount of cooing that the turkey does. Welcome to the world of twice-baked butternut squash. Sure, you could just roast some squash wedges and call it a day. But where's the fun in that? To make this year's most impressive vegetable side, Epi's food director Rhoda Boone gave super-seasonal butternut squash the twice-baked potatoes treatment: Mash the inside of the vegetable with butter, cream, and anything else that might make it more delicious, then pile it back into the vegetable, bake it until golden and velvety. The result is a jaw-dropping, brightly colored sweet-meet-savory butternut squash side dish. Here are just a few more reasons this creation belongs on this year's Thanksgiving table:",
    votes: 0,
    topic: "cooking",
    author: "jessjelly",
    created_at: "2018-05-06T02:40:35.489Z",
    comment_count: "8"
  },
  {
    article_id: 13,
    title: "What does Jose Mourinho's handwriting say about his personality?",
    body:
      "Jose Mourinho was at The O2 on Sunday night to watch Dominic Thiem in action against Novak Djokovic. Thiem took the first set before Djokovic fought back to claim the victory, but Manchester United's manager was clearly impressed with the Austrian's performance.",
    votes: 0,
    topic: "football",
    author: "weegembump",
    created_at: "2018-04-16T19:29:32.774Z",
    comment_count: "6"
  },
  {
    article_id: 18,
    title: "The People Tracking Every Touch, Pass And Tackle in the World Cup",
    body:
      "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
    votes: 0,
    topic: "football",
    author: "grumpy19",
    created_at: "2018-03-28T03:03:58.717Z",
    comment_count: "8"
  },
  {
    article_id: 6,
    title:
      "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
    body:
      "Functions are objects in JavaScript, as you should know by now, if you have read any of the prerequisite articles. And as objects, functions have methods, including the powerful Apply, Call, and Bind methods. On the one hand, Apply and Call are nearly identical and are frequently used in JavaScript for borrowing methods and for setting the this value explicitly. We also use Apply for variable-arity functions; you will learn more about this in a bit.",
    votes: 0,
    topic: "coding",
    author: "grumpy19",
    created_at: "2018-03-14T10:27:39.137Z",
    comment_count: "11"
  }
];

class ArticlesPage extends Component {
  state = {
    topicFilter: "all",
    orderBy: null
  };

  listArticles = () => {
    return articles.map(article => (
      <li key={article.article_id}>
        <h3>
          In {article.topic}: {article.title}
        </h3>
        <p>
          {article.body.slice(0, article.body.indexOf(".") + 1)}.. <br />
          <Link to={`/articles/${article.article_id}`}>
            (click to read the full article)
          </Link>
        </p>
        <p>Author: {article.author}</p>
        <br />
      </li>
    ));
  };

  render() {
    return (
      <section>
        <Link to="/">Home</Link>
        <ul>{this.listArticles()}</ul>
      </section>
    );
  }
}

export default ArticlesPage;
