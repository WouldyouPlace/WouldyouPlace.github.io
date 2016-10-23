/**
 * Created by Lenovo on 2016/7/29.
 */
$(document).ready(function(){
    $("#loginWin").window({
        title:"登录",
        width:350,
        height:180,
        top:($(window).height() -180)*0.5,
        left:($(window).width() - 350)*0.5,
        shadow:true,
        minimizable:false,
        maximizable:false,
        closable:false,
        resizable:false,
        collapsible:false,
        draggable:false
    });
    $('#btnLogin').bind('click',function(){
        var name = $('#userName');
        var pwd = $('#userPassword');

        if(name.val() == '' || pwd.val() == ''){
            $.messager.alert('Warning','账号和密码均不能为空');
        }else{
            $.ajax({
                type:'post',
                url:'',
                data:{userName:name.val(),userPwd:pwd.val()},
                dataType:'json',
                success:function(data){
                    window.location.href = 'index.html?userName=' + name.val();
                },
                error:function(){
                    window.location.href = 'index.html?userName=' + name.val();
                    /*$.messager.alert('Warning','内部出现错误');*/
                }
            })
        }
    });

    $('#btnReset').bind('click', function(){
        $('#loginForm').form('clear');
    })
});

window.onresize = function(){
    $("#loginWin").window({
        top:($(window).height() -220)*0.5,
        left:($(window).width() - 410)*0.5
    })
}