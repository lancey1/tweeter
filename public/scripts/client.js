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
      ${escape(tweetData.content.text)}
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

//Gets the most recent tweet from /tweets
const loadNewestTweet = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
    success: function (response) {
      let lastElement = response[response.length - 1];
      $(".tweet-container").prepend(createTweetElement(lastElement));
    },
  });
};

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

$(document).ready(function () {
  loadTweets();
});

$(document).ready(function () {
  $(".validation-error").hide();

  // on button click sends a POST request to /tweets with user information and tweet data
  $("button").click(function (event) {
    event.preventDefault();
    const $tweetData = $("form").serialize();
    let datalength = $("#tweet-text").val().length;
    if (datalength === 0) {
      $(".validation-error").slideDown().text("Write something to Tweet");
    }
    if (datalength > 140) {
      $(".validation-error").slideDown().text("You know the saying less is more that applies here");
    } else {
      $.post("/tweets", $tweetData, function () {
        const tweetValue = document.getElementById("tweet-text");
        let counterValue = document.getElementById("counter");
        tweetValue.value = "";
        counterValue.innerHTML = 140;
        $(".validation-error").hide();
        loadNewestTweet();
      });
    }
  });
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
