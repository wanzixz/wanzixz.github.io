
var main = $('.content-wrap');
var duoshuoQuery = {short_name:"zlmark"};

  // NProgress
  NProgress.configure({ showSpinner: false });
  // Pjax
$(document).pjax('.pjaxlink','.content-wrap', { fragment: ".content-wrap", timeout: 10000 });

  //多说
var afterPjax = function() {
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] 
       || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
  };
  afterPjax();
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
      afterPjax();
      backup();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn'); 
      window.location.reload();
    }
  });


