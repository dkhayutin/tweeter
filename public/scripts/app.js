const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]

function createTweetElement (tweetData) {
  const $tweet = $('<li>')
    .addClass('tweet')

  const $header = $('<header>')
    .addClass('tweet-header')
    .appendTo($tweet)

  $('<img>')
    .addClass('photo')
    .attr('src', tweetData.user.avatars.small)
    .appendTo($header)

  $('<span>')
    .addClass('name')
    .text(tweetData.user.name)
    .appendTo($header)

  $('<p>')
    .addClass('user')
    .text(tweetData.user.handle)
    .appendTo($header);

  $('<p>')
    .addClass('text')
    .text(tweetData.content.text)
    .appendTo($tweet);

  const $footer = $('<footer>')
    .addClass('tweet-footer')
    .text(tweetData.created_at)
    .appendTo($tweet)

  const $span = $('<span>')
    .addClass('icons')
    .appendTo($footer)

  $('<i>')
    .addClass('far fa-flag')
    .appendTo($span)

  $('<i>')
    .addClass('fas fa-retweet')
    .appendTo($span)

  $('<i>')
    .addClass('far fa-heart')
    .appendTo($span)

  return $tweet;
}

function renderTweets(tweetsArray) {
  tweetsArray.forEach(function (tweetObj) {
    $('#tweet-list').append(createTweetElement(tweetObj));
    })
}



$(document).ready(function () {
  renderTweets(data)
  console.log( $( this ).serialize())
  $('form').submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function () {
        console.log('Good');
      }
    })
  })
});
