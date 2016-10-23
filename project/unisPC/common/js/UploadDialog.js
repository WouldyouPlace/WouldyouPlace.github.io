(function (window, $) {
    var htmls = '<div id="dialog-mask" class="mask"></div>'+
        ' <div id="dialog-frame" class="frame"> <div id="dialog-top" class="top"> <div id="title-text" class="text">标题 </div> <div id="dialog-closed" class="closed">×</div>' +
        '</div> <div  class="panel"> <div id="dialog-content" class="content"> <h1>内容</h1> </div> <div id="dialog-footer" class="footer"> <div class="dialog-btnGroup">' +
        '<button type="button" class="btn-theme-a" hidefocus = "true" id="btnOk">确定</button>' +
        '<button type="button" class="btn-theme-a" hidefocus = "true" id="closed"">取消</button> </div> </div> </div> </div>';

    //创建弹出框绑定，基础事件，
    function upLoadDialog() {
        var config = {};
        this.get = function (i) {
            return config[i];
        }
        this.set = function (i, v) {
            config[i] = v;
        }
        this.init();
    }

    upLoadDialog.prototype = {
        init: function () {
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var body = $('body'),
                ovl = $('#dialog-frame');
            if (ovl.length === 0) {
                body.append(htmls);
            }
            this.set('mask', $("#dialog-mask"));
            this.set('ovl', $('#dialog-frame'));
            $("#dialog-mask").hide();
            $('#dialog-frame').hide();
        },
        bindEvent: function () {
            var _this = this,
                ovl = _this.get('ovl'),
                mask = _this.get("mask");
            ovl.on('click', '#btnOk', function (e) {
                _this.hide();
            });
            ovl.on('click', '#closed', function (e) {
                _this.hide();
            });
            ovl.on('click','#dialog-closed',function(){
                _this.hide();
            });
            mask.on('click', function () {
                _this.hide();
            });

            document.onkeyup = hideWindow;
            function hideWindow(e){
                e = e?e :window.event;
                if(e.keyCode == 13 || e.keyCode == 108){
                    _this.hide();
                }
            }
        },
        content: function (str) {
            var str = typeof str === 'string' ? str : str.toString(),
                ovl = this.get('ovl');
            ovl.find('#dialog-content').html(str);
            this.show();
        },
        show: function () {
            this.get('ovl').show();
            this.get('mask').show();
        },
        hide: function () {
            var ovl = this.get("ovl");
            ovl.find('#dialog-content').html('');
            ovl.hide();
            this.get('mask').hide();
        },
        destory: function () {
            this.get('ovl').remove();
            this.get('mask').remove();
        }
    };

    var obj = new upLoadDialog();


    window.dialog = function (str) {
        obj.content.call(obj, str);
    };

    //1.定义jQuery扩展方法modal
    $.fn.modal = function(options,param){
        if(typeof options === 'string'){
            return $.fn.modal.methods[options](this,param);
        }

        //2.将传过来的参数跟default的参数合并
        options = $.extend({}, $.fn.modal.defaults,options || {});

        //3.添加值
        var target = $(this);
        var frame = $("#dialog-frame");
        var content=$("#dialog-content");
        frame.css({
            top:options.top,
            left:options.left
        });
        content.css({
            width:options.width,
            height:options.height
        });
        $("#title-text").html(options.title);
        if(options.url){
            init(target,options.url);
        }
        dialog(options.content);
        options.btnOk.call(target);
    };

    function init(target,url){
        var layout = "<table></table>";
        $.ajax({
            type:"get",
            url:url,
            success:function(data){
                $("#dialog-content").append(data);
            },
            error:function(){
                dialog('内部出现错误');
            }
        })
    }

    function btnOk(){
        $("#btnOk").click();
    }

    $.fn.modal.methods = {
        getValue:function(jq){
            return jq.val();
        },
        setValue: function (jq, param) {
            jq.val(param);
        },
        load:function(jq,url){

        }
    };
    $.fn.modal.defaults = {
        width:'',
        height:'',
        title:'new modal',
        top:'',
        left:'',
        content:'',
        url:'',
        btnOk:function(){},
        closed:function(){}
    }

})(window, jQuery);
//js代码调用
/*
function show(){
    dialog("呵呵");
  /!*  $("#md").modal({
        url:"../../test.html"
    });*!/
}
*/
