$(document).ready(function(){
    $("#toolInfo").datagrid({
        title:"工具信息",
        toolbar:"#toolBar",
        url:"../../json/tool.json",
        singleSelect:"true",
        fitColumns:"true",
        pagination:"true"
    })
});
/*添加工具信息*/
function newToolInfo(){
    $('#toolInfoOptionDlg').dialog('open');
    $('#toolInfoForm').form('clear');
}

/*修改工具信息*/
function editToolInfo(){
    var row = $('#toolInfo').datagrid('getSelected');
    if (row){
        $('#toolInfoOptionDlg').dialog('open');
        $('#toolInfoForm').form('load',row);
    }
}

/*保存工具*/
function saveToolInfo(){
    $.messager.alert("保存成功");
    /*$('#tool-form').form('submit',{
        url: url,
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
                $('#toolInfoOptionDlg').dialog('close');        // close the dialog
                $('#toolInfo').datagrid('reload');    // reload the user data
            }
        }
    });*/
}
/*删除工具*/
function deleteToolInfo(){
    var row = $('#toolInfo').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','确定删除此用户吗？',function(r){
            if (r){
                $.post('',{id:row.id},function(result){
                    if (result.success){
                        $('#toolInfo').datagrid('reload');    // reload the user data
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


/*添加考核项*/
function newClassifyInfo(){
    $('#examineItemDg').dialog('open');
    $('#examineItemForm').form('clear');
}

/*修改考核项*/
function editClassifyInfo(){
    var row = $('#examineItemInfo').datagrid('getSelected');
    if (row){
        $('#examineItemDg').dialog('open');
        $('#examineItemForm').form('load',row);
    }
}

/*保存考核项*/
function saveClassifyInfo(){
    $.messager.alert("保存成功");
    $('#examineItemForm').form('submit',{
        url: url,
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
                $('#examineItemDg').dialog('close');        // close the dialog
                $('#examineItemInfo').datagrid('reload');    // reload the user data
            }
        }
    });
}
/*删除考核项*/
function destroyClassifyInfo(){
    var row = $('#examineItemInfo').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','确定删除此用户吗？',function(r){
            if (r){
                $.post('',{id:row.id},function(result){
                    if (result.success){
                        $('#examineItemInfo').datagrid('reload');    // reload the user data
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
