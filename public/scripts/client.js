/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function that creates the tweet structure and appends to the tweet container
const createTweetElement = function (tweetData) {
  let $tweetData = $(".tweet-container");
  const tweets = $tweetData.prepend(`
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
        <div class="timestamp"> ${timeago.format(tweetData.created_at)}</div>
        <div class="icons"> 
          <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-flag"></i><i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
  return tweets;
};
// function that prepends to the tweet container so that new tweets are on top
const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
};

$(document).ready(function () {
  // on button click sends a POST request to /tweets with user information and tweet data
  $("button").click(function (event) {
    event.preventDefault();
    const tweetData = $("form").serialize();
    let datalength = $("#tweet-text").val().length;
    if ((datalength === 0)) {
      alert("Write something to Tweet!");
    }
    if (datalength > 140) {
      alert("You wrote too much!");
    } else {
      $.post("/tweets", tweetData, function () {});
      loadTweets();
    }
  });

  // Gets information from /tweets.
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (response) {
        renderTweets(response);
      },
    });
  };
  loadTweets();
});
