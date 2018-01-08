define(function(require,exports,module){
  
  
      function rang(val,max,min){ 
        
        if(val>max){
          return max;
        }else if(val<min){
          return min;
        }else{
          return val;
        }
        
      }
  
  
      exports.rang = rang;
  
  })