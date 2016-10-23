/**
 * Created by Lenovo on 2016/6/7.
 */
$(document).ready(function(){
    $(window).scroll(function(){
        if($(document).scrollTop() >= 188){
            $(".return-top").css("display","block");
        }else{
            $(".return-top").css("display","none");
        }
    });
    $("#cateItem li").on("click",function(){
         var index = $(this).index();
        $(this).addClass("recommand-active").siblings().removeClass("recommand-active");
        $("#cateContent li").eq(index).addClass("selected").siblings().removeClass("selected");
    });
});