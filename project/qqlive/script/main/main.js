window.onload = function() {
    $('#welcome').addClass('fade-out');

    var videoId = null,
        start = false,
        isMaster = false,
        isClick = false,
        mp = mp;


    function orient() { //设备旋转添加不同的样式
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").removeClass("landscape");
            $("body").addClass("portrait");
            orientation = 'portrait';
            return false;
        } else if (window.orientation == 90 || window.orientation == -90) {
            $("body").removeClass("portrait");
            $("body").addClass("landscape");
            orientation = 'landscape';
            return false;
        }
    }
    orient();
    $(window).bind('orientationchange', function(e) {
        orient();
    });


    var imgPath = "images/"
    var pageImgs = [imgPath + 'startbg.jpg', imgPath + 'btn_play.png', imgPath + 'last-btn.png', imgPath + 'code.jpg', imgPath + 'endbg.jpg', imgPath + 'act1.jpg', imgPath + 'act2.jpg', imgPath + 'act3.jpg', imgPath + 'act4.jpg', imgPath + 'act5.jpg'];

    //预加载 完毕后显示页面
    imgLoader(pageImgs, function(percentage) {
        handleProgress(percentage);
        if (percentage === 1) {
            handleComplete()
        }
    })

    function handleProgress(progress) {
        var num = 50 - parseInt(progress * 50);
        $('#J_loading_progress').removeClass('hide')
        document.querySelector('#J_loading_progress').style['-webkit-transform'] = 'translateY(' + num + '%)'
    }

    function handleComplete() {
        var el = document.querySelector('#J_loading')
        setTimeout(function() {
            $(el).addClass('complete');
            $(el).remove();
        }, 100)
    }


    //加载视频
    $('video').each(function(index) {
        $('#video' + index)[0].load();
        fitVideo('#video' + index);
        $('#video' + index).hide();
    });

    function fitVideo(video) {
        var i = setInterval(function() {
            // 这里注意, 必须判断视频的 readyState。
            // 因为有可能没加载完，则获取到的视频时长信息是不正确的。
            if (video.readyState > 0) {
                // (此处可以添加代码，将分钟，秒数显示到需要的地方)
                // ...
                // 执行到这里，就将循环定时器清除。
                clearInterval(i);
            } else { // iOS走此逻辑
                video.oncanplaythrough = function() {
                    clearInterval(i);
                }
            }
        }, 200);
        video.onerror = function() {
            clearInterval(i);
            video.load();
        }
    }

    //阻止页面滑动
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
        return false;
    });
    document.body.addEventListener('ondblclick', function(e) {
        e.preventDefault();
        return false;
    });

    function predef(e) {
        e.preventDefault();
        return false;
    };

    function stopTouch() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            document.body.addEventListener('touchmove', predef)
            document.body.addEventListener('touchstart', predef);
            document.body.addEventListener('touchend', predef);
            document.body.addEventListener('touchcancel', predef);
        }

    }

    function startTouch() {
        document.body.removeEventListener('touchmove', predef);
        document.body.removeEventListener('touchstart', predef);
        document.body.removeEventListener('touchend', predef);
        document.body.removeEventListener('touchcancel', predef);
    }

    //旋转
    function orient() {
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").removeClass("landscape");
            $("body").addClass("portrait");
            orientation = 'portrait';
            return false;
        } else if (window.orientation == 90 || window.orientation == -90) {
            $("body").removeClass("portrait");
            $("body").addClass("landscape");
            orientation = 'landscape';
            return false;
        }
    }
    orient();

    $(window).bind('orientationchange', function(e) {
        orient();
    });



    var set = {
        setSize: function($dom) { //设置尺寸
            var $body = $('body');
            var screen_w = parseInt($body.width()),
                screen_h = parseInt($body.height());
            var new_width = 0,
                new_height = 0;
            if (screen_h > screen_w) {
                new_width = screen_h;
                new_height = screen_w;
            } else {
                new_width = screen_w;
                new_height = screen_h;
            }
            $dom.css({
                'width': new_width + 'px',
                'height': new_height + 'px'
            });
            /*if (new_width / new_height > 1280 / 720) {
                document.querySelector("html").style.fontSize = new_width / 640 * 10 + "px";
            } else {
                document.querySelector("html").style.fontSize = new_height / 360 * 10 + "px";
            }*/
        },
        showEnd: function() {
            var $end = $('.m-end-page');
            $end.show();
        },
        showMaster: function(index) {
            var $master = $('.m-choose-master').eq(index);
            $master.show().css('opacity', '1');
        },
        chooseHandler: function() {
            var videoId = $(this).data('type'),
                videoIndex = $(this).data('index'),
                parent = $(this).parent().parent();
            parent.css('opacity', '0');
            setTimeout(function() {
                parent.hide();
                isClick = false;
            }, 800);
            if (!isClick) {
                play();
                isClick = true;
            }

            function play() {
                if (videoId == 'yes') {
                    set.videoList.video(videoIndex);
                    _czc.push(﻿['_trackEvent', '播放第' + videoIndex + '视频', '播放第' + videoIndex + '视频']);
                }
            }
            return videoId;
        },
        beginVideo: function() {
            $('.m-start-page').show();
            $('.m-start-page .icon-play').on('click', function() {
                $('.m-start-page').hide();
                set.videoList.video(0);
                _czc.push(﻿['_trackEvent', '开始播放', '开始播放']);
            });
        },
        rePlay: function() {
            $(this).parent().parent().hide();
            set.videoList.video(0);
            _czc.push(﻿['_trackEvent', '重新播放', '重新播放']);
        },
        videoList: { //视频播放列表
            video: function(index) {
                var media = $('#video' + index);
                media.show();
                media.parent().removeClass("vhide");
                media[0].currentTime = 0;
                media[0].play();
                stopTouch();
                media[0].addEventListener("ended", function() {
                    startTouch();
                    media.hide();
                    media.parent().addClass("vhide");
                    if (index < 5) {
                        set.showMaster(index);
                        $('#video' + index +1).load();
                    } else {
                        set.showEnd()
                    }
                })
            }
        }
    }

    set.setSize($('.m-wrap'));
    set.beginVideo();
    $(window).on('resize', function(e) {
        setTimeout(function() {
            set.setSize($('.m-wrap'));
        }, 200);
    });
    $('.video-box').each(function() {
        makeVideoPlayableInline(this);
    });

    $('.ns-btn').on('touchend', set.chooseHandler);
    $('.btn-align').on('touchend', set.rePlay);
    $('#btn-ok').on('touchend', set.chooseHandler);

}