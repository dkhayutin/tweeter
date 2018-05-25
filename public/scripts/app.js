const data = {
  '1a2b3c': {
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
  '4f5i6g': {
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
  '7q8r9s': {
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
};

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

  let $footer = $('<footer>')
    .addClass('tweet-footer')
    .text(newTime(tweetData.created_at))
    .appendTo($tweet)

  let $span = $('<span>')
    .addClass('icons')
    .appendTo($footer)

  $('<i>')
    .addClass('far fa-flag')
    .appendTo($span)

  $('<i>')
    .addClass('fas fa-retweet')
    .appendTo($span)

  $('<i>')
    .attr('data-tweet', tweetData._id )
    .attr('title', tweetData.likes)
    .addClass(`far fa-heart ${tweetData.likes > 0 ? 'redText' : ''}`)
    .appendTo($span)

  return $tweet;
}

function newTime(timestamp) {
  var currentTime = Date.now()
  var postTime = timestamp
  var realTime = currentTime - postTime
  Math.floor(realTime / 1000 / 60 / 60 / 24 / 365)
  if(Math.floor(realTime / 1000 / 60 / 60 / 24 / 365 ) > 0) {
    return Math.floor(realTime / 1000 / 60 / 60 / 24 / 365 ) + " years ago"
  } else if (Math.floor(realTime / 1000 / 60 /  60 / 24 / 30.416666) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60 / 24 / 30.416666) + " months ago"
  } else if (Math.floor(realTime / 1000 / 60 /  60 / 24 ) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60 / 24) + " days ago"
  } else if (Math.floor(realTime / 1000 / 60 /  60 ) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60) + " hours ago"
  } else if(Math.floor(realTime / 1000 / 60) > 0) {
    return Math.floor(realTime / 1000 / 60) + " minutes ago"
  } else if (Math.floor(realTime / 1000) > 0) {
    return Math.floor(realTime / 1000) + " seconds ago"
  } else {
    return "Just now"
  }
}

function renderTweets(tweetsObject) {
    for(tweet in tweetsObject) {
      $('#tweet-list').prepend(createTweetElement(tweetsObject[tweet]));
    }
}

function loadTweets () {
  $('#tweet-list').html("");
  $.ajax({
    url: "/tweets",
    type: 'GET',
    success: function (data) {
      renderTweets(data)
    }
  })
}

$(document).ready(function () {

  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();
    let textField = $('form textarea')
    if(textField.val().length > 140) {
      $('.counter').text('Woops! Your tweet is to long!')
    } else if(textField.val().length <= 0) {
      $('.counter').text('Make sure you enter a tweet!')
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function () {
          loadTweets()
        }
      })
      $('.counter').text(140)
      $('textarea').val('')
    }
  })

  $(".new-tweet").hide();
  $('button').click(function () {
    $('.new-tweet').toggle('fast')
    $('textarea').focus();
  });

  $('body').on('click', '.fa-heart', function () {
    var id = $(this).attr('data-tweet')
      var url = '/tweets/' + id + '/like';
      $.ajax({
        url: url,
        type: 'post',
        success: () => {
          $(this).addClass('redText')
        }
      })
  });

});
