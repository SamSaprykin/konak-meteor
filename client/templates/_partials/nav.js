$(function(){
    $(window).scroll(function(){
      var winTop = $(window).scrollTop();
      if(winTop >= 30){
        $("body").addClass("sticky-header");
        $("nav").addClass("borderNav");
        $("a.logoLink").addClass("displayNone")
      }else{
        $("a.logoLink").removeClass("displayNone")
        $("body").removeClass("sticky-header");
        $("nav").removeClass("borderNav") 
      }//if-else
    });//win func.
  });//ready func.

