! function (a, b, c, d) {
    d.define && define.cmd ? define(function (e, f, g) {
        g.exports = a(b, c, d)
    }) : d.Video2in1 = a(b, c, d)
}(function (a, b) {
    function c(a) {
        (a.videoTag || a).play()
    }
    localStorage.removeItem("tvp_goonplaying_time");
    var d = function () {
        this.Player = {
            1: null,
            2: null
        }, this.$list = null, this.playing = 1
    };
    return d.prototype.getPlaytime = function () {
        return this.Player[this.playing].getPlaytime()
    }, d.prototype.play = function () {
        c(this.Player[1]), c(this.Player[2])
    }, d.prototype.pause = function () {
        this.Player[1].pause(), this.Player[2].pause()
    }, d.prototype.reverse = function (a) {
        a != this.playing && (!a && (a = !(this.playing - 1) + 1), this.Player[this.playing].pause(), this.Player[this.playing]
            .$mod.css("visibility", "hidden"), this.Player[a].seek(this.Player[this.playing].getPlaytime()), this.playing =
            a, c(this.Player[this.playing]), this.Player[this.playing].$mod.css("visibility", "visible"), this.$list.css(
            "top", (this.playing - 2) * this.Player[1].config.height + "px"))
    }, d.prototype.create = function (c) {
        var d, e, f, g, h, i;
        if (!(c.video instanceof Array) || 2 != c.video.length && 3 != c.video.length) throw "video参数必须为两个VideoInfo组成的数组";
        d = c.video, h = b('<div id="v2i1_mod1"></div>').css({
            width: "100%",
            height: "100%"
        }), i = b('<div id="v2i1_mod2"></div>').css({
            width: "100%",
            height: "100%"
        }), this.$list = g = b('<div id="v2i1_list"></div>').css("position", "relative").css("top", -c.height + "px").append(
            i).append(h);
        var j = b("<div></div>").css({
            position: "relative",
            overflow: "hidden",
            height: c.height,
            width: c.width
        });
        b("#" + c.modId).html(j), j.html(g), f = b.extend({}, c, {
            video: d[1],
            modId: "v2i1_mod2",
            isHtml5ShowLoadingAdOnStart: !1,
            isHtml5ShowLoadingAdOnChange: !1,
            playerType: "html5"
        }), e = b.extend({}, c, {
            video: d[0],
            modId: "v2i1_mod1",
            isHtml5ShowLoadingAdOnStart: !1,
            isHtml5ShowLoadingAdOnChange: !1,
            playerType: "html5"
        }), this.Player[2] = new a.Player, this.Player[2].create(f), this.Player[1] = new a.Player, this.Player[1].create(
            e);
        var k = b.Deferred(),
            l = b.Deferred(),
            m = this;
        return this.Player[1].onplay = function () {
            k.resolve(), m.Player[1].onplay = null, m.Player[1].videoTag.preload = "auto"
        }, this.Player[2].onplay = function () {
            l.resolve(), m.Player[2].onplay = null, m.Player[2].videoTag.preload = "auto"
        }, b.when(k, l).done(function () {
            a.$(a.html5skin.elements.fullscreen).css({
                visibility: "hidden",
                width: "5px"
            })
        })
    }, {
        Player: d
    }
}, tvp, tvp.$, window); /*  |xGv00|d6894d4484dc5266789381f1b7141777 */