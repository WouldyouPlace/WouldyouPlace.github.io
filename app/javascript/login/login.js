/**
 * Created by Administrator on 2016/9/2.
 */
window.onload = function () {
    bgSwitch();
}
/*登录*/
function btnOk(){
    var uName = document.getElementById("userName");
    var uPwd = document.getElementById("userPwd");
    $.ajax({
        type:"get",
        url:"../../json/user.json",
        dataType:"json",
        success:function(data){
            if(uName.value == data[0].name && uPwd.value == data[0].pwd){
                $(".login").addClass("startLogin");
                saveStorage();
                location.href = "../main/main.html";
            }else{
                alert("错误提示：账号:sa,密码:sa");
            }

        },
        error:function(){
            alert("内部出现错误");
        }
    })
}
/*保存数据*/
function saveStorage(){
    var data = new Object;
    var str;
    data.name = document.getElementById("userName").value;
    data.pwd = document.getElementById("userPwd").value;
    str = JSON.stringify(data);
    sessionStorage.setItem(data.name,str);
}
/*背景切换*/
function bgSwitch() {
    var i = 1;
    $("#bgChange").children("img").eq(0).css("opacity","1");
    setInterval(function(){
        if(i >= $("#bgChange").find("img").length){
            i = 0;
        }
        /*$("#bgChange").children("img").eq(i).addClass("imgShow").removeClass("imgHide").siblings().removeClass("imgShow").addClass("imgHide");*/

        $("#bgChange").children("img").eq(i).css({"opacity":"1"}).siblings().css({"opacity":"0"});
        i++;
    },5000);
}