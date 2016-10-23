/**
 * Created by Lenovo on 2016/3/13.
 */
$(document).ready(function(){
    $('#phone').popover({
       container:'body',
        content:'136-7210-9615',
        trigger:'hover',
        placement:'bottom'
    });
    $('#qrcode').popover({
       container:'body',
        content:'&nbsp;',
        trigger:'hover',
        placement:'bottom',
        template:'<div class="popover" role="tooltip"><div class="arrow"></div><img src="./images/erweima.png" alt=""/></div>'
    });
    $('#fixed-phone').popover({
        container:'body',
        content:'136-7210-9615',
        trigger:'hover',
        placement:'top'
    });
    $('#fixed-qrcode').popover({
        container:'body',
        content:'&nbsp;',
        trigger:'hover',
        placement:'top',
        template:'<div class="popover" role="tooltip"><div class="arrow"></div><img src="./images/erweima.png" alt=""/></div>'
    });
    $('.navbar-fixed-bottom').hide();
    $(window).scroll(function(){
        var navHeight=$('#nav').height();
        if($(document).scrollTop() > navHeight){
            $('.navbar-fixed-bottom').show();
        }else{
            $('.navbar-fixed-bottom').hide();
        }
    });
    $(".close").click(function(){
        $(".sidebar").hide();
    });


})