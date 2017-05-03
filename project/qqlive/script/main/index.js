/*
    author:dark
    date:2017-4-25
*/

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

(function() {

    //阻止页面滑动
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
        return false;
    });

    if ("wView" in window) {
        window.wView.allowsInlineMediaPlayback = "YES";
        window.wView.mediaPlaybackRequiresUserAction = "NO";
    }

    var BaseURL = 'http://www.tencent-blackboard.com';
    var rootUrl = 'http://www.tencent-blackboard.com/qqlive/'

    var imgPath = "images/"
    var pageImgs = [imgPath + 'startbg.jpg', imgPath + 'btn_play.png', imgPath + 'last-btn.png', imgPath + 'code.jpg', imgPath + 'endbg.jpg'];

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


    //设置尺寸
    var setSize = function($dom) {
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
    }

    /*
     * view
     * */

    var showEnd = function() { //展示最后图层
        var $end = $('.m-end-page');
        $end.show();
    };

    var showMaster = function(index) {
        var $masters = $('.m-choose-master');
        var $master = $masters.eq(index);
        $master.show();
    };


    /*
     * media
     * */

    var MediaSprite = function(config) {
        var _config = config;
        var media = null;
        var _createMedia = function() {
            if (_config.type == 'video') {
                media = document.createElement('video');
                media.setAttribute('webkit-playsinline', '');
                media.setAttribute('playsinline', '');
                media.setAttribute('x-webkit-airplay', 'true');
                media.setAttribute('airplay', 'allow')
                media.setAttribute('preload', 'auto');
                media.setAttribute('poster', pageImgs[0]);
            }
            media.src = _config.src;
            media.id = 'spriteMedia';
            if (_config.wrap) {
                document.querySelector(_config.wrap).appendChild(media);
            } else {
                document.body.appendChild(media);
            }
            media = document.querySelector('#spriteMedia');
            media.muted = false;
        };
        var gotoAndPlay = function(name, callback, loop) {
            var begin = _config.timeline[name].begin,
                end = _config.timeline[name].end;
            if (/Android/ig.test(navigator.userAgent)) {
                media.currentTime = begin + 1.2;
            } else {
                media.currentTime = begin;
            }
            var playHandler = function() {
                if (this.currentTime >= end) {
                    this.pause();
                    media.removeEventListener('timeupdate', playHandler);
                    callback && callback(name);
                }
            };
            media.addEventListener('timeupdate', playHandler);
            media.play();

        };

        var _init = function() {
            _createMedia();
        };

        _init();
        return {
            play: gotoAndPlay
        }
    };


    /*
     *
     * config
     * */

    var mp = new MediaSprite({
        wrap: '#videoWrap',
        type: 'video',
        src: 'video/music.mp4',
        timeline: {
            'start': {
                begin: 0,
                end: 45
            },
            'm1': {
                begin: 47.2,
                end: 68.2
            },
            'm2': {
                begin: 70.5,
                end: 91.5
            },
            'm3': {
                begin: 92,
                end: 121.5
            },
            'm4': {
                begin: 123,
                end: 164
            },
            'm5': {
                begin: 166.2,
                end: 216
            }
        }
    });


    /*
     * 选择播放
     *
     * */
    var isMaster = false,
        current_index = 0,
        isClick = false,
        mp = mp;
    var chooseHandler = function(e) {
        var type = $(this).data('type'),
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
                mp.play(Vname, function(name) {
                    if (current_index < 5) {
                        showMaster(current_index);
                        _czc.push(['_trackEvent', '播放第' + current_index + '视频', '播放第' + current_index + '视频']);
                    } else {
                        showEnd();
                    }
                    startTouch();
                })
            }
        }

    };
    /*
     * 开始播放
     * */
    var beginVideo = function(e) {
        var page = $(this).parents(".m-start-page"),
            _video = document.querySelector("#spriteMedia");
        page.addClass('fade');
        stopTouch();
        page.hide();
        mp.play("start", function() {
            showMaster(0);
            _czc.push(['_trackEvent', '开始播放', '开始播放']);
            startTouch();
        });

    };

    /*
     * 重播
     */
    var rePlay = function(e) {
        $(this).parent().parent().hide();
        $(".m-choose-master").css('opacity', '1');
        beginVideo();
        _czc.push(['_trackEvent', '重新播放', '重新播放']);
        current_index = 0;
        stopTouch();
    };


    /*
     * 设置
     * */

    setSize($('.m-wrap'));
    $(window).on('resize', function(e) {
        setTimeout(function() {
            setSize($('.m-wrap'));
        }, 200);
    });

    var video = document.createElement('video');
    makeVideoPlayableInline(video, false);

    if (video.readyState != 4) {
        var video = document.createElement('video');
        makeVideoPlayableInline(video, false);
    }



    var media = document.querySelector('#spriteMedia');
    fitVideo(media);

    function fitVideo(video) {

        var i = setInterval(function() {
            // 这里注意, 必须判断视频的 readyState。
            // 因为有可能没加载完，则获取到的视频时长信息是不正确的。
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
                clearInterval(i);
            } else { // iOS走此逻辑
                video.oncanplaythrough = function() {
                    fitVideo();
                    clearInterval(i);
                }
            }
        }, 200);

        video.onerror = function() {
            clearInterval(i);
            video.load();
        }
    }



    $('.m-start-page .icon-play').on('touchend', beginVideo);
    $('.ns-btn').on('touchend', chooseHandler);
    $('.btn-align').on('touchend', rePlay);


})()