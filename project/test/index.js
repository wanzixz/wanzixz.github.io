function _App() {
    this.pageWrap = $(".main-container"),
    this.h = $(window).height(),
    this.w = $(window).width(),
    this.maxVolume = 1,
    this.formalURL = "szxgl.cn",
    this.cdnURL = "http://cdn.szxgl.cn/haochezhu77/",
    this.openid = null,
    this.userName = null,
    this.userPhotoUrl = null,
    this.welcomeAudio = null,
    this.bgAudio = null,
    this.video2Audio = null,
    this.video3Audio = null,
    this.step = 0,
    this.MovieCanvas = null,
    this.MovieInterval = null,
    this.MovieLooped = !0,
    this.MovieFrame = 0,
    this.resizeTime = 0,
    this.timeline_1 = null,
    this.networkType = null,
    this.video1CanPlay = 0,
    this.video2CanPlay = 0,
    this.video3CanPlay = 0,
    this.path = {
        product: "http://show.szxgl.cn/haochezhu"
    },
    this.interface = {
        savePhone: "/api/qixi/savePhone"
    }
}


var PageData = {
    gender: null,
    opt1: null,
    opt2: null,
    house: null
}
  , ScreenSize = {
    width: 640,
    height: 1050
}
  , MovieSize = {
    width: 1280,
    height: 720
}
  , FrameSize = {
    width: 1280,
    height: 720
}
  , acitveFrame = {
    width: 0,
    height: 0
}
  , videoDisplay = 0
  , playWidth = 0
  , playHeight = 0
  , cdStep = 0
  , cdStep2 = 0
  , canvasVideo1 = null;

var hostUrl = 'show.szxgl.cn/pacx/qixi/';

  _App.prototype ={
    init: function() {
        var _app = this;
        _app.loadMusic();
        //a.checkFormalEnv() && (console.log("正式环境"),
       // a.initWeChatShare()),
        //a.styleInit(),
        _app.resControl(),
        _app.orientation();
        //a.action()
        console.log(_app);
    },
    resControl:function(){
        {
            var _app = this,
                imgArr = ["love_con.png", "love_border.png", "loading_bg.jpg", "success_box_bg.png", "jh_btn.png", "share_arrow.png", "share_icon.png", "rule_bg.png", "share_btn.png", "free_get_btn.png", "rule_btn.png", "input_bg.png", "get_prize_title.png", "get_prize.png", "cd_btn.png", "intro_3_word_4.png", "intro_3_word_3.png", "intro_3_word_2.png", "intro_3_point.png", "intro_3_map.png", "intro_2_word_4.png", "intro_2_click.png", "intro_2_word_3.png", "intro_2_word_2.png", "light_bg.png", "intro_1_phone_light.png", "intro_1_word_4.png", "intro_1_word_3.png", "intro_1_word_2.png", "intro_1_word_1.png", "intro_1_car_cyc.png", "intro_1_phone.png", "intro_1_title.png", "ste_2_word.png", "step_2_choose_1.png", "step_2_choose_2.png", "step_2_word.png", "step_1_word.png", "poster1.jpg", "play_icon.png", "bg_1_h.jpg", "bg_1_s.jpg", "bg_1_s2.jpg"];
                new PreLoad(imgArr,".progress",{
                prefix: _app.checkFormalEnv() ? _app.cdnURL + "images/" : "images/",
                progressInit: !1,
                vision: "1.0",
                events: {
                    preLoadComplete: [function() {
                        _app.frameAnimation()
                    }
                    ],
                    preLoadProgress: [function(a) {
                        //console.log(a);
                        var num = Math.ceil(a / 3);
                        $(".loading-overlay .progress").height(num + "%"),
                        $(".loading-overlay .progress-text").text(num + "%")
                    }
                    ]
                }
            })
        }
    },
    timeLine: function() {
        var a = this;
        $(".page-1 .play-btn,.page-1 .step-1-word").on("touchstart", function() {
            $(".page-1").find(".play-btn,.step-1-word,.video-masking").fadeOut(),
            a.MovieLooped = !1
        }),
        $(".page-1 .step-2-btn-1").on("touchstart", function() {
            a.step++,
            cdStep2 = 1,
            $(".page-1").find(".step-2-word,.step-2-btn-1,.step-2-btn-2,.logo").fadeOut(),
            $(".video-bg").fadeIn(),
            setTimeout(function() {
                $(".page-1").find(".intro-box").show(),
                $("#videoCanvas").hide(),
                a.introAnimation()
            }, 500)
        }),
        $(".page-1 .step-2-btn-2").on("touchstart", function() {
            cdStep = 1,
            a.step++,
            $(".page-1").find(".step-2-word,.step-2-btn-1,.step-2-btn-2,.intro-box .get-prize,.intro-box,.video-bg,.logo").fadeOut(),
            a.isAndriod() ? ($(".video-masking").fadeOut(),
            a.video3CanPlay++) : setTimeout(function() {
                $("#videoCanvas").show(),
                $(".video-masking").fadeOut(),
                a.IOSVideoPlan2()
            }, 500)
        }),
        $(".step-3-btn-1").on("touchstart", function() {
            1 == cdStep2 ? (a.step++,
            $(".page-1 .intro-box,.page-1 .get-prize,.page-1 .logo").fadeOut(),
            $(".page-1 .get-prize-box,.video-bg").fadeIn(),
            $(".step-3-btn-1").fadeOut()) : (a.step++,
            $(".get-prize").addClass("played"),
            $(".step-3-btn-1").fadeOut(),
            $(".video-bg").fadeIn(),
            $(".page-1").find(".intro-box").show(),
            a.introAnimation())
        }),
        $(".page-1 .get-prize").on("touchstart", function() {
            a.step++,
            $(".page-1 .intro-box,.page-1 .get-prize,.step-2-btn-2,.page-1 .logo").fadeOut(),
            $(".page-1 .get-prize-box,.video-bg").fadeIn()
        }),
        $(".page-1 .get-prize-box .go-btn").on("touchstart", function() {
            if (!$(this).hasClass("disabled")) {
                $(this).addClass("disabled");
                var h = $("#phone").val()
                  , c = /^[1][358][0-9]{9}/;
                if (!c.test(h))
                    return $(this).removeClass("disabled"),
                    a.showDialogTip("请正确输入手机号码"),
                    !1;
                a.submitPhone(h)
            }
        }),
        $("#phone").focus(function() {
            "输入手机号码免费领取" == this.value && $(this).val("")
        }),
        $("#phone").blur(function() {
            "" == this.value && $(this).val("输入手机号码免费领取")
        }),
        $(".rule-btn").on("touchstart", function() {
            $(".rule-box").fadeIn().addClass("shown")
        }),
        $(".rule-bg .close").on("touchstart", function() {
            $(".rule-box").fadeOut().removeClass("shown")
        }),
        $(".share-btn").on("touchstart", function() {
            $(".share-box").fadeIn()
        }),
        $(".share-box").on("touchstart", function() {
            $(this).fadeOut()
        }),
        $(".get-success-box .btn").on("touchstart", function() {
            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.pingan.carowner"
        }),
        $(".get-success-box .success-box .close").on("touchstart", function() {
            $(".page-1 .get-success-box").hide(),
            $(".page-1 .get-prize-box").fadeIn()
        })
    },
    introAnimation:function(){
        function loading(){
            h.timeline_1 = new TimelineMax({
                delay: .5,
                repeat: 0,
                onComplete: function() {
                    1 == cdStep2 ? $(".step-2-btn-2").fadeIn() : $(".intro-box .get-prize").addClass("played").fadeIn(),
                    $(".video-masking").fadeOut(),
                    c.kill(),
                    a.kill()
                }
            });
            var a = new TweenMax(y,1,{
                bezier: {
                    type: "soft",
                    values: [{
                        autoAlpha: 1
                    }, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: .5
                    }, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }]
                },
                repeat: 100,
                delay: 2.4,
                ease: Linear.easeNone
            });
            c = new TweenMax(w,1,{
                opacity: 1,
                y: 10,
                yoyo: !0,
                repeat: 100,
                delay: 1.8,
                ease: Linear.easeNone
            });
            h.timeline_1.to(g, .8, {
                autoAlpha: 1
            }).set(v, {
                y: 30,
                autoAlpha: 0
            }).to(v, .8, {
                y: 0,
                autoAlpha: 1
            }).to(y, .8, {
                y: 0,
                autoAlpha: 1
            }).set(A, {
                x: 30,
                rotation: 90,
                autoAlpha: 0
            }).to(A, .5, {
                x: 0,
                rotation: 0,
                autoAlpha: 1
            }).set(_, {
                x: 30,
                rotation: 90,
                autoAlpha: 0
            }).to(_, .5, {
                x: 0,
                rotation: 0,
                autoAlpha: 1
            }).set(b, {
                x: 30,
                rotation: 90,
                autoAlpha: 0
            }).to(b, .5, {
                x: 0,
                rotation: 0,
                autoAlpha: 1
            }).set(S, {
                x: 30,
                rotation: 90,
                autoAlpha: 0
            }).to(S, .5, {
                x: 0,
                rotation: 0,
                autoAlpha: 1
            }).to(y, .5, {
                autoAlpha: 0
            }, "+=1.5").to(w, .4, {
                autoAlpha: 0
            }).to(v, .3, {
                x: 30,
                autoAlpha: 0
            }).to(S, .5, {
                x: 30,
                autoAlpha: 0
            }).to(b, .4, {
                x: 30,
                autoAlpha: 0
            }).to(_, .3, {
                x: 30,
                autoAlpha: 0
            }).to(A, .2, {
                x: 30,
                autoAlpha: 0
            }).set(z, {
                scale: .5,
                rotation: 720,
                autoAlpha: 0
            }).to(z, .5, {
                scale: 1.1,
                rotation: 0,
                autoAlpha: 1
            }).to(z, .1, {
                scale: 1,
                rotation: 0,
                autoAlpha: 1
            }).set(A, {
                x: 0,
                y: 0,
                scale: 1.2,
                autoAlpha: 0
            }).to(A, .5, {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1
            }).set(M, {
                y: 0,
                scale: 1.2,
                autoAlpha: 0
            }).to(M, .5, {
                y: 0,
                scale: 1,
                autoAlpha: 1
            }).set(I, {
                y: 0,
                scale: 1.2,
                autoAlpha: 0
            }).to(I, .5, {
                y: 0,
                scale: 1,
                autoAlpha: 1
            }).set(C, {
                y: 0,
                scale: 1.2,
                autoAlpha: 0
            }).to(C, .5, {
                y: 0,
                scale: 1,
                autoAlpha: 1
            }).to(z, .5, {
                y: 30,
                autoAlpha: 0
            }, "+=1.5").to(C, .5, {
                y: 30,
                autoAlpha: 0
            }).to(I, .4, {
                y: 30,
                autoAlpha: 0
            }).to(M, .3, {
                x: 0,
                y: 30,
                autoAlpha: 0
            }).to(A, .2, {
                x: 0,
                y: 30,
                autoAlpha: 0
            }).set(k, {
                y: -30,
                autoAlpha: 0
            }).to(k, .5, {
                y: 0,
                autoAlpha: 1
            }).set(T, {
                y: -30,
                autoAlpha: 0
            }).to(T, .5, {
                y: 0,
                autoAlpha: 1
            }).set(A, {
                y: 30,
                autoAlpha: 0
            }).to(A, .5, {
                y: 0,
                autoAlpha: 1
            }).set(F, {
                y: 30,
                autoAlpha: 0
            }).to(F, .5, {
                y: 0,
                autoAlpha: 1
            }).set(P, {
                y: 30,
                autoAlpha: 0
            }).to(P, .5, {
                y: 0,
                autoAlpha: 1
            }).set(E, {
                y: 30,
                autoAlpha: 0
            }).to(E, .5, {
                y: 0,
                autoAlpha: 1
            }).to(T, .5, {
                y: -30,
                autoAlpha: 0
            }, "+=1.5").to(k, .2, {
                y: 30,
                autoAlpha: 0
            }).to(E, .5, {
                y: 30,
                autoAlpha: 0
            }).to(P, .4, {
                y: 30,
                autoAlpha: 0
            }).to(F, .3, {
                y: 30,
                autoAlpha: 0
            }).to(A, .2, {
                y: 30,
                autoAlpha: 0
            }).to(L, .5, {
                autoAlpha: 1
            }, "+=0.5");

        }
        var h = this
          , c = $(".page-1 .intro-box")
          , g = ($(".page-1 .logo"),c.find(".title"))
          , v = c.find(".phone")
          , w = c.find(".phone-cyc")
          , y = c.find(".phone-light")
          , A = c.find(".word-1")
          , _ = c.find(".word-2")
          , b = c.find(".word-3")
          , S = c.find(".word-4")
          , z = c.find(".click")
          , M = c.find(".word-5")
          , I = c.find(".word-6")
          , C = c.find(".word-7")
          , k = c.find(".map")
          , T = c.find(".map-point")
          , F = c.find(".word-8")
          , P = c.find(".word-9")
          , E = c.find(".word-10")
          , L = c.find(".get-prize");
          console.log(g);
          loading(),
        h.timeline_1.progress(0).timeScale(0);
        TweenLite.to(h.timeline_1, 1, {
            timeScale: 1
        });
    },
    frameAnimation:function(){
        function welcome(){
            console.log(v.length);
            for (A = 0,i = 0; i < v.length; i++)
                "image" == v[i].type && (
                    y[v[i].name] = new Image,
                    y[v[i].name].src = v[i].url,
                    y[v[i].name].onload = function() {
                        A++
                    }
                );
            var a = setInterval(function() {
                if (_ <= Math.ceil(A / v.length * 100)) {
                    _++;
                    var g = Math.ceil(.67 * _) + 33;
                    $(".loading-overlay .progress").height(g + "%"),
                    $(".loading-overlay .progress-text").text(g + "%")
                };
                console.log(100 == _);
                100 == _ && (_app.video1CanPlay = 1,
                clearInterval(a),
                $(".loading-overlay").fadeOut(),
                $(".page-1").addClass("shown"),
                setTimeout(function() {
                    $(".page-1 .guide").hide(),
                    h()
                    _app.timeLine()
                }, 2e3),//2000
                console.log("前序序列帧加载完毕"))
            }, 20)
        };
        function h() {
            _app.isAndriod() && setTimeout(function() {
                _app.Andriodframeplan1()
            }, 1e3),
            b = document.getElementById("welcomeCanvas"),
            S = b.getContext("2d"),
            S.clearRect(0, 0, MovieSize.width, MovieSize.height);
            var a = setInterval(function() {

                if(0 == _app.MovieFrame){
                    _app.welcomeAudio.currentTime = 0;
                    _app.welcomeAudio.play()
                };
                _app.MovieFrame++;
                if(_app.MovieFrame > (_app.checkFormalEnv() ? 100 : 10) && !z && !_app.isAndriod()){
                    z = true;
                    $(".page-1 .play-btn,.page-1 .step-1-word").fadeIn()
                };
                if(!_app.MovieLooped){
                     clearInterval(a);
                    _app.welcomeAudio.pause();
                    $("#welcomeCanvas").remove();
                    _app.video2CanPlay++;
                }

                if(_app.MovieFrame > 180) {
                    _app.MovieFrame = 0;
                }

                S.drawImage(y["frame_" + _app.MovieFrame], 0, 0, FrameSize.width, FrameSize.height, 0, 0, MovieSize.width, MovieSize.height)
                
            }, 100)
        }
        var _app = this;
        if (_app.step < 1) {
            _app.step = 1;
            for(var v=[], i = 0; i < 187; i++){
                var n = 0,
                    imgUrl = _app.checkFormalEnv() ? _app.cdnURL + "images/" : "images/", 
                    n = 100 > i ? 10 > i ? "00" + i : "0" + i : i;
                var imgArrObj = {
                    name: "frame_" + i,
                    type: "image",
                    url: imgUrl + "1" + n + ".jpg"
                };
                v.push(imgArrObj);
            }

            var y = {}
                , A = 0
                , _ = 0;
            welcome();
            $(".video-container").show().find("#welcomeCanvas").show();
            var b, S, z = false;
        }
        
    },
    Andriodframeplan1: function() {
        function a() {
            console.log(y);   
            for (A = 0,
            i = 0; i < v.length; i++)
                "image" == v[i].type && (y[v[i].name] = new Image,
                y[v[i].name].src = v[i].url,
                y[v[i].name].onload = function() {
                    A++
                }
                );
            var a = setInterval(function() {
                _ <= Math.ceil(A / v.length * 100) && (_++,
                $("#videoLoadProgress .progress").width(_ + "%")),
                _ >= 50 && (c.video2CanPlay < 1 && $(".page-1 .play-btn,.page-1 .step-1-word").fadeIn(),
                c.video2CanPlay = 1),
                100 == _ && (
                    //c.Andriodframeplan2(),
                clearInterval(a),
                console.log("主视频序列帧加载完毕"),
                setTimeout(function() {
                    $("#videoLoadProgress").empty()
                }, 500))
            }, 20)
        }
        function h() {
            b = document.getElementById("videoCanvas"),
            S = b.getContext("2d"),
            S.clearRect(0, 0, MovieSize.width, MovieSize.height);
            var a = setInterval(function() {
                M++,
                M >= 836 && (clearInterval(a),
                c.video2Audio.pause(),
                c.bgAudio.play(),
                $(".page-1 .video-masking").fadeIn(800),
                $(".page-1 .logo").fadeIn(800),
                setTimeout(function() {
                    $(".page-1").find(".step-2-word").fadeIn()
                }, 800),
                setTimeout(function() {
                    $(".page-1").find(".step-2-btn-1").fadeIn()
                }, 1600),
                setTimeout(function() {
                    $(".page-1").find(".step-2-btn-2").fadeIn()
                }, 2400)),
                S.drawImage(y["frame_" + M], 0, 0, FrameSize.width, FrameSize.height, 0, 0, MovieSize.width, MovieSize.height)
            }, 100)
        }
        for (var c = this, g = c.checkFormalEnv() ? c.cdnURL + "images/movie_2/" : "images/movie_2/", v = [], i = 0; 837 > i; i++) {
            var n;
            n = 100 > i ? 10 > i ? "00" + i : "0" + i : i;
            var w = {
                name: "frame_" + i,
                type: "image",
                url: g + "2" + n + ".jpg"
            };
            v.push(w)
        }
        var y = {}
          , A = 0
          , _ = 0;
        a(),
        console.log(y);
        var b, S, z = setInterval(function() {
            c.video2CanPlay >= 2 && (clearInterval(z),
            c.video2Audio.play(),
            $(".video-container").show().find("#videoCanvas").show(),
            setTimeout(function() {
                h()
            }, 500))
        }), M = c.checkFormalEnv() ? 0 : 0
    },
    loadMusic:function(){
        var _app = this
            ,opt = {
                preload:"auto",
                loop:"loop",
                volume:1
            };
            options_audio2 = {
                preload: "auto",
                loop: "loop",
                volume: 1
            };
            _app.welcomeAudio = new Audio;
            _app.welcomeAudio.src = _app.checkFormalEnv() ? _app.cdnURL + "media/1.mp3" : "media/1.mp3";
            for (var i in opt){
                if(opt.hasOwnProperty(i) && i in _app.welcomeAudio ){
                    _app.welcomeAudio[i] = opt[i]
                };
                //console.log(_app.welcomeAudio[i])
            }

            _app.bgAudio = new Audio,
            _app.bgAudio.src = _app.checkFormalEnv() ? _app.cdnURL + "media/bg.mp3" : "media/bg.mp3";
            for (var i in opt){
                if(opt.hasOwnProperty(i) && i in _app.bgAudio ){
                    _app.bgAudio[i] = opt[i]
                };
            }
            _app.video2Audio = new Audio,
            _app.video2Audio.src = _app.checkFormalEnv() ? _app.cdnURL + "media/2.mp3" : "media/2.mp3";
            for (var i in options_audio2){
                if(options_audio2.hasOwnProperty(i) && i in _app.video2Audio ){
                    _app.video2Audio[i] = options_audio2[i]
                };
            }
            _app.video3Audio = new Audio,
        _app.video3Audio.src = _app.checkFormalEnv() ? _app.cdnURL + "media/3.mp3" : "media/3.mp3";
        for (var i in options_audio2){
                if(options_audio2.hasOwnProperty(i) && i in _app.video3Audio ){
                    _app.video3Audio[i] = options_audio2[i]
                };
            }

    },
    checkFormalEnv: function() {
        var _app = this;
        return hostUrl.indexOf(_app.formalURL) > -1 ? true : false;
    },
    isAndriod: function() {
        var ua = navigator.userAgent;
        return ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1 ? true : false;
    },
    orientation:function(){
        var _app = this;
        _app.setSize($(".rotate-wrap")),
        $(window).on("resize", function() {
            setTimeout(function() {
                _app.setSize($(".rotate-wrap"))
            }, 200)
        })
    },
    setSize:function(elm){
        var _app = this
          , body = $("body")
          , bodyW = parseInt(body.width())
          , bodyH = parseInt(body.height())
          , newW = 0
          , newH = 0;
          if(bodyH > bodyW){
            newW = bodyH;
            newH = bodyW;
            $(".share-arrow").addClass("left")
          }else{
            newW = bodyW;
            newH = bodyH;
            $(".share-arrow").removeClass("left")
          }
          acitveFrame = {
            width: newW,
            height: newH
          }
          playWidth = acitveFrame.height / MovieSize.height * MovieSize.width;
           playHeight = acitveFrame.width / MovieSize.width * MovieSize.height;
           elm.css({
            width:newW + 'px',
            height:newH + 'px'
           });
           var videoImg = newH /508 * 1140;
           $(".video-bg img").css({
                "margin-left": -videoImg / 2 + "px"
            });
           setTimeout(function() {
            var loadBox = $(".loading-overlay .progress-box");
                loadBox.find(".progress").css("background-size", loadBox.width() + "px " + loadBox.height() + "px")
            }, 100);
           $(".video2-end img,.video3-end img").css({
            "margin-top": -(newW / MovieSize.width * MovieSize.height) / 2 + "px"
            });
           if(newW/newH > MovieSize.width / MovieSize.height){
            videoDisplay = 1,
        _app.resizeTime < 1 && $(".video-container canvas").each(function(i) {
            _App.isAndriod() || 1 != i ? $(this).attr({
                width: MovieSize.width,
                height: MovieSize.height
            }).get(0).style.WebkitTransform = "scale(" + acitveFrame.width / MovieSize.width + ")" : $(this).attr({
                width: MovieSize.width,
                height: MovieSize.height
            })
        });
        $(".video-container video").attr({
            width: newW,
            height: "auto"
        });
        $(".video-container").css("margin-top", newW / MovieSize.width * MovieSize.height / -2 + "px");
        $(".video-container").css("margin-left", newW / -2 + "px")
           }else{
            videoDisplay = 2,
        _app.resizeTime < 1 && $(".video-container canvas").each(function(i) {
            if(_App.isAndriod() || 1 != i){
                $(this).attr({
                width: MovieSize.width,
                height: MovieSize.height
                }).get(0).style.WebkitTransform = "scale(" + acitveFrame.height / MovieSize.height + ")"
            }else{
                $(this).attr({
                    width: MovieSize.width,
                    height: MovieSize.height
                })
            }
        });
        $(".video-container video").attr({
            width: "auto",
            height: newH
        });
        $(".video-container").css("margin-top", newH / -2 + "px"),
        $(".video-container").css("margin-left", newH / MovieSize.height * MovieSize.width / -2 + "px")

           }
           _App.resizeTime++

    }

  }

var _App = new _App;
_App.init();