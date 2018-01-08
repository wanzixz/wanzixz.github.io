require.config({
  baseUrl: 'js',
  paths:{
    "jquery":["http://libs.baidu.com/jquery/2.0.3/jquery"],
    "ad":"b"
  }

})


require(["jquery","ad"],function($){
    $(function(){
      alert('load jquery')
    })
}) 