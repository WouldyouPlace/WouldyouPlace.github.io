
$(document).ready(function(){
    $('#roleInfo').datagrid({
        url:"../../json/role.json",
        rownumbers:false,//行号
        pagination :true,
        fitColumns:true ,
        singleSelect:true,
        loadMsg: "正在加载角色数据，请稍等..."
    });

    $('#roleOption').dialog({
        width:380,
        height:350,
        model:true,
        top:($(window).height() - 450)*0.5,
        left:($(window).width() - 650)*0.5
    });

   $('#content-header').panel({ "onCollapse": function () {
        $(".panel-title").eq(2).html($("#toolbar").html());
    }});
    $(".panel-title").eq(0).html($("#toolbar").html());
});

/*添加*/
function newUser(){
    $('#roleOption').dialog('open');
    $('#roleForm').form('clear');
}

/*修改*/
function editUser(){
    var row = $('#roleInfo').datagrid('getSelected');
    if (row){
        $('#roleOption').dialog('open');
        $('#roleForm').form('load',row);
    }
}

/*保存按钮*/
function saveUser(){
    $('#roleForm').form('submit',{
        url: '',
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            var result = eval('('+result+')');
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#roleOption').dialog('close');        // close the dialog
                $('#roleInfo').datagrid('reload');    // reload the user data
            }
        }
    });
}
/*删除按钮*/
function destroyUser(){
    var row = $('#roleInfo').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','确定删除此用户吗？',function(r){
            if (r){
                $.post('',{id:row.id},function(result){
                    if (result.success){
                        $('#dg').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}

/*修改*/
function editUserTabel(index){
    $('#roleInfo').datagrid('selectRow',index);
    editUser();
}

/*删除按钮*/
function destroyUserTable(index){
    $("#roleInfo").datagrid('selectRow',index);
    destroyUser();
}

function updateBtn(val,row,index){
    return '<a href="javascript:void(0)" class="easyui-linkbutton" onclick="editUserTabel('+ index +')">修改</a>';
}

function destroyBtn(val,row,index){
    return '<a href="javascript:void(0)" class="easyui-linkbutton" onclick="destroyUserTable('+ index +')">删除</a>';
}
function searchRole(){

}

window.onresize =function(){
    $("#roleOption").dialog("move",{
        top:($(window).height() - 450)*0.5,
        left:($(window).width() - 650)*0.5
    })
}