/**
 * Created by Administrator on 2016/8/5.
 */
$(document).ready(function(){
    $('#tt').tree({
        url:"../../json/evaluationDictionary.json"
    });
})

/*编辑大维度*/
function editLargeDimension(){
    $('#editLargeDimensionDlg').dialog('open');
}

/*添加小维度*/
function newSmallDimension(){
    $("#addSmallDimensionDlg").dialog('open');
}
/*添加指标*/
function newNorm(){
    $("#addNormDlg").dialog('open');
}

/*搜索*/
function searchDimension(){

}