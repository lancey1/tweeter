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

// Gets information from /tweets and displays it.
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
// displays the tweets & hides the validation error section on page load
$(document).ready(function () {
  $(".validation-error").hide();
  loadTweets();
});

//helper function to prevent XSS attacks
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  // on button click sends a POST request to /tweets with user information and tweet data
  $("button").click(function (event) {
    event.preventDefault();
    const $tweetData = $("form").serialize();
    let datalength = $("#tweet-text").val().length;
    // if tweet length is 0 displays an error message.
    if (datalength === 0) {
      $(".validation-error").slideDown().text("Write something to Tweet");
    }
    // if tweet length is over the character limit displays an error message
    if (datalength > 140) {
      $(".validation-error").slideDown().text("You know the saying less is more that applies here");
    } else {
    //  On successful tweet post the tweet is sent to /tweets, and is retreived 
    //  by the function loadNewestTweet to be displayed, resets the text area and counter to default
    //  hides the error message if present 
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