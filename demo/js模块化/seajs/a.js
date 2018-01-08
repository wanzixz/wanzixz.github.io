define(function(require,exports,module) {
  var $ = require('jquery');
  //var drags = require('./drag');
  $('body').css('background','red')
  
  seajs.use("./drag",function(drag){
    console.log(drag.a)
  })
});