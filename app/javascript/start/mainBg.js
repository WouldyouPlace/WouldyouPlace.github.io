var isFireFox = navigator.userAgent.indexOf("Firefox");
console.log(browser, trim_Version);
if (browser == "Microsoft Internet Explorer" || trim_Version == "MSIE10.0" || trim_Version == "WOW64" || isFireFox > 0) {
    $('.radialBg').css('opacity', '1');
}
if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelRequestAnimationFrame)
            window.cancelRequestAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());
}
$(document).ready(function () {

    document.getElementById("svgWord").onload = function () {
        var svg = this.getSVGDocument().getElementById('svg');
        var s = Snap(svg);
        var line = s.selectAll('.st4');
        var dashLength = 24;
        line.attr({strokeDasharray: 35});
        if (false) {
            line.attr({strokeDasharray: 0});
        } else {
            for (var i = 0; i < line.length; i++) {
                fnautoPlay(i);
            }
        }
        function fnautoPlay(index) {
            fnInit(index);
            line[index].animate({strokeDashoffset: 140 + index * dashLength}, 3000, function () {
                fnautoPlay(index);
            })
        }

        function fnInit(index) {
            line[index].attr({strokeDashoffset: index * dashLength})
        }
    }
    $('.Main-Items>li').eq(0).addClass('curr');
    var canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d'), w = canvas.width, h = canvas.height, hue = 217, stars = [], count = 0, maxStars = 1400;
    var canvas2 = document.createElement('canvas'), ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2, gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#ff9700');
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y), diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
    }

    var Star = function () {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 50000;
        this.alpha = random(2, 10) / 10;
        count++;
        stars[count] = this;
    }
    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX, y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY, twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }
    for (var i = 0; i < maxStars; i++) {
        new Star();
    }
    function animation() {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        ;
        window.requestAnimationFrame(animation);
    }

    animation();


});
$(function(){
    canvasPos();

    function canvasPos(){
        var windowH = $(window).height();
        (windowH < 600) ? (windowH = 600) : "";
        $('.mainBg').css('margin-top', -(windowH * 0.5) + 'px');
    }
    window.onresize=canvasPos;
})