//引用css文件
require('../scss/index.scss');

((message) => {
  console.log(message)
})('message from es6')

let step = 2;
var add = number => number*=step;
console.log(add);

console.log('hello world');