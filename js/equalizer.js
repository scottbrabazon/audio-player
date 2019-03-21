$(function() {
  setInterval(function(){
    $('.col').each(function(index){
      var randomBars = Math.ceil(Math.random()*12);
      $(this).removeClass().addClass('col select__'+randomBars);
    })
  }, 100);
  
});