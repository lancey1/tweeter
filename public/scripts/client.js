/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function () {
  // function that creates the tweet structure and appends to the tweet container
  const createTweetElement = function (tweetData) {
    let $tweetData = $(".tweet-container");
    const tweets = $tweetData.append(`
    <article>
      <header>
        <div class="profile"><img src=${tweetData.user.avatars}> </div>
        <div class="username">${tweetData.user.name}</div>
        <div class="userid">${tweetData.user.handle}</div>
      </header>
      <main class='tweet-content'>
      ${tweetData.content.text}
      </main>
      <footer>
        <div class="timestamp">${tweetData.created_at}</div>
        <div class="icons"> 
          <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-flag"></i><i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return tweets;
  };
  
  // function that prepends to the tweet container so that new tweets are on top
  const renderTweets = function(tweets) {
    tweets.forEach((tweet)=> {
      $("#tweets-container").prepend(createTweetElement(tweet));
    })
  };

  renderTweets(data);

});
