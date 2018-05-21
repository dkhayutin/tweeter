$(document).ready(function (){
  $('.new-tweet textarea').on('input', function(){

   var character = $(this).val().length
   $(this).parent().find('.counter').text(140 - character)
    if( 140 - character < 0) {
      $(".counter").addClass('redText')
    } else {
      $(".counter").removeClass('redText')
    }
  });
});
