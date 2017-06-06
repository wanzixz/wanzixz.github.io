$(function(){

$('.dropdown-toggle').dropdownHover();

//首页banner
var mySwiper = new Swiper ('.banner', {
    autoplay: 5000,
    loop: true,
     paginationClickable: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
  });  

//买家秀
var swiper = new Swiper('#js-home-show', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        freeMode: true,
        // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
    });

//滚动加载
var wow = new WOW(
  {
    animateClass: 'animated',
    offset:100
  }
);
wow.init();

//产品列表
window.onload= function() {
    var elem = document.querySelector('#met-grid');
    var msnry = new Masonry( elem, {
      // options
      itemSelector: '.masonry-item',
      columnWidth: 20
    });
}



})
