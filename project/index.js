/*
    author:dark
    date:2017-4-25
*/

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

function _App() {
    this.BaseURL = 'http://www.tencent-blackboard.com';
    this.rootUrl = 'http://www.tencent-blackboard.com/qqlive/';
    this.imgPath = "images/";

}

var predef = function(e) { e.preventDefault(); return false; };

var mpConfig = {
    wrap: '#videoWrap',
    type: 'video',
    src: 'video/music.mp4',
    timeline: {
        'start': {
            begin: 0,
            end: 46
        },
        'm1': {
            begin: 47.2,
            end: 67.10
        },
        'm2': {
            begin: 68.11,
            end: 87.14
        },
        'm3': {
            begin: 88.15,
            end: 116.14
        },
        'm4': {
            begin: 116.13,
            end:  158.28
        },
        'm5': {
            begin: 167.24,
            end: 207.00
        }
    }
};

var isMaster = false,
    current_index = 0,
    isClick = false,
    moveIsLoad = false;

_App.prototype = {
    init: function() {
        var _this = this;
        //console.log(_this);
        _this.load();
        _this.setSize($('.m-wrap'));
        _this.createMedia(mpConfig);
        _this.pageEvent();

    },
    load: function() {
        var _this = this;
        //图片资源
        var pageImgs = [_this.imgPath + 'startbg.jpg', _this.imgPath + 'btn_play.png', _this.imgPath + 'last-btn.png', _this.imgPath + 'code.jpg', _this.imgPath + 'endbg.jpg'];
        //预加载 完毕后显示页面
        imgLoader(pageImgs, function(percentage) {
            handleProgress(percentage);
            if (percentage === 1) {
                var timer = setInterval(function(){
                    if(moveIsLoad){
                        handleComplete();
                        clearInterval(timer);
                    }
                },100)
                //handleComplete()
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

        //阻止页面滑动
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
            return false;
        });

        /*if ("wView" in window) {   //关于ios不能自动播放视频、音频的解决方案（已过期）
            window.wView.allowsInlineMediaPlayback = "YES";
            window.wView.mediaPlaybackRequiresUserAction = "NO";
        }*/

        _this.setStopMove.stopTouch();
    },
    setStopMove: { //阻止视频播放的时候双击屏幕滑动
        stopTouch: function() {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                document.body.addEventListener('touchmove', predef)
                document.body.addEventListener('touchstart', predef);
                document.body.addEventListener('touchend', predef);
                document.body.addEventListener('touchcancel', predef);
            }
        },
        startTouch: function() {
            document.body.removeEventListener('touchmove', predef);
            document.body.removeEventListener('touchstart', predef);
            document.body.removeEventListener('touchend', predef);
            document.body.removeEventListener('touchcancel', predef);
        }
    },
    setSize: function($dom) {
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
        if (new_width / new_height > 1280 / 720) {
            $('#videoWrap video').attr({
                'width': new_width,
                'height': "auto"
            });
        } else {
            $('#videoWrap video').attr({
                'width': new_width,
                'height': 'new_height'
            });
        }
        
    },
    changeSize: function() {
        var _this = _App;
        _this.setSize($('.m-wrap'));
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
        $(window).bind('orientationchange', function(e) {
            orient();
        });
    },
    showLayer: {
        showEnd: function() { //展示最后图层
            var $end = $('.m-end-page');
            $end.show();
        },
        showMaster: function(index) {
            var $master = $('.m-choose-master').eq(index);
            $master.show();
        }
    },
    createMedia: function(config) {  //创建视频
        var _this = this;
        var _config = config;
        var media = null;
        media = document.createElement('video');
        media.setAttribute('x-webkit-airplay', 'allow');
        media.setAttribute('webkit-playsinline', '');
        media.setAttribute('playsinline', '');
        media.setAttribute('x5-video-player-type', 'h5');
        media.setAttribute('x5-video-player-fullscreen',true);
        media.setAttribute('preload', 'auto');
        media.src = _config.src;
        media.id = 'spriteMedia';
        if (_config.wrap) {
            document.querySelector(_config.wrap).appendChild(media);
        } else {
            document.body.appendChild(media);
        }
        media = document.querySelector('#spriteMedia');
        media.muted = false;

        fitVideo(media);

        function fitVideo(video) {
            var i = setInterval(function() {
                // 这里注意, 必须判断视频的 readyState。
                // 因为有可能没加载完，则获取到的视频时长信息是不正确的。
                console.log('load');
                function fitVideo() {
                    var videoH = video.videoHeight,
                        h = $(window).height(),
                        fit_w = 1;
                }
                if (video.readyState > 0) {
                    fitVideo();
                    // (此处可以添加代码，将分钟，秒数显示到需要的地方)
                    // ...
                    // 执行到这里，就将循环定时器清除。
                    moveIsLoad = true;
                    clearInterval(i);
                } else { // iOS走此逻辑
                    video.oncanplaythrough = function() {
                        fitVideo();
                        moveIsLoad = true;
                        clearInterval(i);
                    }
                }
            }, 200);
            video.onerror = function() {
                clearInterval(i);
                video.load();
            }
        }
    },
    mediaPlay: function(name, callback, loop) {
        var _config = mpConfig,
            media = document.querySelector('#spriteMedia');
        var begin = _config.timeline[name].begin,
            end = _config.timeline[name].end;
        media.currentTime = begin;
        if (/Android/ig.test(navigator.userAgent)) {
            media.currentTime = begin + 1.2;
        } else {
            media.currentTime = begin;
        }
        var playHandler = function() {
            console.log(this.currentTime);
            if (this.currentTime >= end) {
                this.pause();
                media.removeEventListener('timeupdate', playHandler);
                callback && callback(name);
            }

        };
        media.removeEventListener('timeupdate', playHandler);
        media.addEventListener('timeupdate', playHandler);
        media.play();

    },
    chooseHandler: function(e) {
        var _this = _App;
            type = $(this).data('type'),
            parent = $(this).parent().parent(),
            _video = document.querySelector("#spriteMedia");
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
            if (type == 'yes') {
                isMaster = true;
                current_index++;
                // 播放yes
                var Vname = "m" + current_index;
                _this.mediaPlay(Vname, function(name) {
                    console.log(current_index);
                    if (current_index < 5) {
                        _this.showLayer.showMaster(current_index);
                        _czc.push(['_trackEvent', '播放第' + current_index + '视频', '播放第' + current_index + '视频']);
                    } else {
                        _this.showLayer.showEnd();
                    }
                    _this.setStopMove.startTouch();
                })
            }
        }
    },
    beginVideo:function(e){
        var _this = _App,
            page = $(this).parents(".m-start-page"),
            _video = document.querySelector("#spriteMedia");
        page.addClass('fade');
        _this.setStopMove.stopTouch();
        page.hide();
        _this.mediaPlay("start", function() {
            _this.showLayer.showMaster(0);
            _czc.push(['_trackEvent', '开始播放', '开始播放']);
            _this.setStopMove.startTouch();
        });
    },
    rePlay: function(e) {//重播
        var _this = _App;
        $(this).parent().parent().hide();
        $(".m-choose-master").css('opacity', '1');
        _this.beginVideo();
        _czc.push(['_trackEvent', '重新播放', '重新播放']);
        current_index = 0;
        _this.setStopMove.stopTouch();
    },
    pageEvent:function(){
        var _this = this;
        $('.m-start-page .icon-play').on('touchend', _this.beginVideo);
        $('.ns-btn').on('touchend', _this.chooseHandler);
        $('.btn-align').on('touchend', _this.rePlay);
    }

}

var _App = new _App;
_App.init();

$(window).on('resize', function(e) {
    setTimeout(_App.changeSize, 200);
});
