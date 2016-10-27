$(function () {

    $("#wicket").height($(".sideNav>ul").children().length * $(window).height());
    $("#wicket>section").height($(window).height());


    revealOnScroll();
    /* about map loading*/
    gainGeolocation();
    $("#menuBtn").on('click', function () {
        $("header").css("position", "fixed");
    });

    $("#logOff").on('click',function(){
        location.href = '../login/login.html';
    });
});
window.onload = function () {
    /*轮播翻页*/
    pageTurning();
};
/* 滚动 */
function revealOnScroll() {
    var index = 0;
    var height = $(window).height();
    var body;
    var isFinish = true;        //判断状态状态

    /* 兼容scrollTop,firefox document.documentElement.其他document.body*/
    if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("MSIE") > 0) {
        body = document.documentElement;
    } else {
        body = document.body;
    }
    var scrollFunc = function (e) {
        if (isFinish) {
            $("header").css("position", "relative");
            var scrollTop = body.scrollTop;
            e = e || window.event;
            handleAnimate(index);
            if (e.wheelDelta < 0 || e.detail > 0) {
                if (index + 1 == $(".sideNav>ul").children().length) {
                    return;
                }
                index++;
                scroll(height * index);
            } else if (e.wheelDelta > 0 || e.detail < 0) {
                if (index == 0) {
                    return;
                }
                index--;
                scroll(height * index);
            }
            handleAnimate(index);
        }
    };
    var scroll = function (height) {
        isFinish = false;
        $(body).animate({scrollTop: height}, 1000, "linear", function () {
            isFinish = true;
        });
        $(".sideNav>ul").children().eq(index).addClass("active").siblings().removeClass("active");
    };

    if (navigator.userAgent.indexOf("Firefox") > 0) {
        if (document.addEventListener) {
            /* PC注册事件 */
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
    } else {
        document.onmousewheel = scrollFunc;
    }
    $("#allmap").hover(function () {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            if (document.addEventListener) {
                /* PC注册事件 */
                document.removeEventListener('DOMMouseScroll',scrollFunc,false);
            }
        } else {
            document.onmousewheel = null;
        }
    },function () {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            if (document.addEventListener) {
                /* PC注册事件 */
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }
        } else {
            document.onmousewheel = scrollFunc;
        }
    })
    //左侧栏导航
    $(".sideNav>ul>li").on("click", function () {
        handleAnimate(index);
        index = $(".sideNav>ul>li").index(this);
        handleAnimate(index);
        if ($(body).marginTop != 0) {
            $(body).animate({scrollTop: index * $(window).height()}, 1000);
            $(this).addClass("active").siblings().removeClass("active");
        }

    });
    $(window).on('resize', function () {
        height = $(window).height();
    });
    window.onbeforeunload = function () {
        $(body).scrollTop(0);
    }

    /*    /!* 移动端滑动事件 --start-- *!/
     /!* 滑动的角度*!/
     function getSlideAngle(dx,dy){
     return Math.atan2(dx,dy) * 180 / Math.PI;
     }
     /!* 根据起点和终点方向，判断位置*!/
     function getSlideDirection(startX,startY,endX,endY){
     var dx = startX - endX;
     var dy = startY - endY;
     var result = 0;
     if(Math.abs(dy) > 5 && Math.abs(dx) > 5){
     //未触发事件
     return result;
     }
     var angle = getSlideAngle(dx,dy);
     if (angle >= -45 && angle < 45) {
     //向右
     result = 4;
     }else if (angle >= 45 && angle < 135) {
     //向上
     result = 1;
     }else if (angle >= -135 && angle < -45) {
     //向下
     result = 2;
     }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
     //向左
     result = 3;
     }
     return result;
     }
     var startX,startY;
     document.addEventListener("touchstart", function (e) {
     startX = e.touches[0].pageX;
     startY = e.touches[0].pageY;
     },false);
     document.addEventListener('touchmove', function (ev){
     var endX, endY;
     endX = ev.changedTouches[0].pageX;
     endY = ev.changedTouches[0].pageY;

     var direction = GetSlideDirection(startX, startY, endX, endY);
     switch (direction){
     case 0:
     /!*alert("没滑动");*!/
     break;
     case 1:
     alert("向上");
     break;
     case 2:
     alert("向下");
     break;
     case 3:
     /!*alert("向左");*!/
     break;
     case 4:
     /!*alert("向右");*!/
     break;
     default:
     }
     }, false);
     /!* 移动端滑动事件 --end-- *!/*/


}


/* 滚动翻页 */
function handleAnimate(index) {
    switch (index) {
        case 0:
            break;
        case 1:
            secondPage();
            break;
        case 2:
            thirdPage();
            break;
        case 4:
            ;
            break;
        case 5:
            ;
            break;
        default:
            ;
    }
    function secondPage() {
        if ($("#mt").is(".fadeInDown")) {
            $("#mt").removeClass('fadeInDown').addClass('fadeOut');
            $(".img-group").removeClass('fadeInDown').addClass('fadeOut');
            $(".view").removeClass('fadeInDown').addClass('fadeOut');
            $(".more").removeClass('fadeInDown').addClass('fadeOut');
            $(".line").removeClass('fadeInLeft').addClass('fadeOut');

        } else {
            $("#mt").removeClass('fadeOut').addClass('animate2 fadeInDown');
            $(".img-group").removeClass('fadeOut').addClass('animate5 fadeInDown');
            $(".view").removeClass('fadeOut').addClass('animate8  fadeInDown');
            $(".more").removeClass('fadeOut').addClass('animate11  fadeInDown');
            $(".line").removeClass('fadeOut').addClass('animate13 fadeInLeft');
        }
    }

    function thirdPage() {
        if ($("#gt").is(".rollIn")) {
            $("#gt").removeClass('rollIn').addClass('rollOut');
            $("#mItem").removeClass('fadeInLeft').addClass('fadeInOut');
            $("#fItem").removeClass('fadeInRight').addClass('fadeInOut');
            $("#wItem").removeClass('fadeInLeft').addClass('fadeInOut');
            $("#sItem").removeClass('fadeInRight').addClass('fadeInOut');
        } else {
            $("#gt").removeClass('rollOut').addClass('animate1 rollIn');
            $("#mItem").removeClass('fadeInOut').addClass('animate4 fadeInLeft');
            $("#fItem").removeClass('fadeInOut').addClass('animate4 fadeInRight');
            $("#wItem").removeClass('fadeInOut').addClass('animate8 fadeInLeft');
            $("#sItem").removeClass('fadeInOut').addClass('animate8 fadeInRight');
        }

    }
}

/* start页轮播 */
function pageTurning() {
    var inner = $("#inner");
    var img = inner.find('li');
    var len = img.length;
    var myTimer;
    var item = 1;
    inner.width(len * 100 + "%");
    img.width(100 / len + "%");

    $("#indicators li").click(function () {
        item = $(this).index();
        inner.css("left", -inner.find("li").width() * item);
        $("#indicators").find("li").eq(item).addClass("active").siblings().removeClass("active");
    })
    setInterval(imgTurn, 3000);
    function imgTurn() {
        if (item >= inner.find("li").length) {
            item = 0;
        }
        inner.css("left", -inner.find("li").width() * item);
        $("#indicators").find("li").eq(item).addClass("active").siblings().removeClass("active");
        item++;
    }

    window.onresize = function () {
        item--;
        if (item < 0) {
            item = 2;
        }
        if (item > 2) {
            item = 0
        }
        inner.css({"transition": "left 0s linear"});
        inner.css("left", -inner.find("li").width() * item);
        setTimeout(function () {
            inner.css({"transition": "left 1s linear"});
        }, 100);
        /* 页面的重置 */
        $("#wicket").height($(".sideNav>ul").children().length * $(window).height());
        $("#wicket>section").height($(window).height());
    }
}

/*/!* 加载game背景 *!/
 function hackerEmpireStyle(){
 var s = window.screen;
 var width = game_bg.width = s.width;
 var height = game_bg.height = s.height;
 var letters = Array(256).join(1).split('');
 var draw = function () {
 game_bg.getContext('2d').fillStyle='rgba(0,0,0,.05)';
 game_bg.getContext('2d').fillRect(0,0,width,height);
 game_bg.getContext('2d').fillStyle='#0F0';
 letters.map(function(y_pos, index){
 text = String.fromCharCode(3e4 + Math.random()*33);
 x_pos = index * 10;
 game_bg.getContext('2d').fillText(text, x_pos, y_pos);
 letters[index] = (y_pos > 440 + Math.random() * 1e4) ? 0 : y_pos + 10;
 });
 };
 setInterval(draw, 50);
 }*/

/* 加载3d变换 */
function hasClassName(inElement, inClassName) {
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
    return regExp.test(inElement.className);
}
function addClassName(inElement, inClassName) {
    if (!hasClassName(inElement, inClassName))
        inElement.className = [inElement.className, inClassName].join(' ');
}

function removeClassName(inElement, inClassName) {
    if (hasClassName(inElement, inClassName)) {
        var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
        var curClasses = inElement.className;
        inElement.className = curClasses.replace(regExp, ' ');
    }
}

function toggleClassName(inElement, inClassName) {
    if (hasClassName(inElement, inClassName))
        removeClassName(inElement, inClassName);
    else
        addClassName(inElement, inClassName);
}

function toggleShape() {
    var shape = document.getElementById('shape');
    if (hasClassName(shape, 'cube')) {
        removeClassName(shape, 'cube');
        addClassName(shape, 'ring');
    } else {
        removeClassName(shape, 'ring');
        addClassName(shape, 'cube');
    }
}

function toggleBackfaces() {
    var backfacesVisible = document.getElementById('backfaces').checked;
    var shape = document.getElementById('shape');
    if (backfacesVisible)
        addClassName(shape, 'backfaces');
    else
        removeClassName(shape, 'backfaces');
}

/* about map */
function gainGeolocation() {
    if (navigator.geolocation) {

        // 百度地图API功能
        var map = new BMap.Map("allmap");
        
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.centerAndZoom(r.point,15);
                map.addOverlay(mk);
                mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                map.panTo(r.point);
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.setCurrentCity("天津");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true})
    } else {
        console.log("浏览器不支持地图API");
    }

}