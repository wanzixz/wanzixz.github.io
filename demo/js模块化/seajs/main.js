define(function(require,exports,module) {
  var oInput = document.getElementById('input1');
  var odiv1 = document.getElementById('div1');
  var odiv2 = document.getElementById('div2');
  var div3 = document.getElementById('div3');

  oInput.onclick = function(){
    div1.style.display = 'block';
    require('./size').size(div1,div2);
 
  }
  require('./drag').drag(div3);


  


});