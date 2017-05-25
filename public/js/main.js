
var main = $('.content-wrap');
var duoshuoQuery = { short_name: "zlmark", theme:'none'};
var isComment = false;

// NProgress
NProgress.configure({ showSpinner: false });
// Pjax
$(document).pjax('.pjaxlink','.content-wrap', { fragment: ".content-wrap", timeout: 10000 });

//back-to-top
var backup = function(){$(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').on('click', function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop : 0},1000);
      return false;
    });
  }
backup();

// Pjax 
$(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      backup();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn'); 
    },
    'pjax:complete':function(){
      $('#container').fadeTo(700,1); 
      comment();
       isComment = true;
    }
});

if(comment) comment()
//comment
function comment(){
    if ( $('.ds-thread, .ds-recent-comments').length > 0 ) { 
        if (typeof DUOSHUO !== 'undefined') DUOSHUO.EmbedThread('.ds-thread');
        else$.getScript("//static.duoshuo.com/embed.js");
  }
}


