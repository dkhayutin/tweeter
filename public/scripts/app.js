

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
    .addClass('far fa-heart')
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
    return "0 seconds ago"
  }
}

function renderTweets(tweetsArray) {
  tweetsArray.forEach(function (tweetObj) {
    $('#tweet-list').prepend(createTweetElement(tweetObj));
    })
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
  $(".new-tweet").hide()
$('button').click(function () {
  $('.new-tweet').toggle('fast')
  $('textarea').focus();
  })
})

$(document).ready(function () {
  loadTweets()
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
});
