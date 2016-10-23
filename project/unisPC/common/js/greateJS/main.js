
var _menus = [
    {"menuid":"1",
        "icon":"icon-sys",
        "menuname":"系统管理",
        "menus":[
            {"menuid":"12","menuname":"角色管理","icon":"icon-add","url":"../System/roleManagement.html"},
            {"menuid":"13","menuname":"用户管理","icon":"icon-users","url":"1.html"},
            {"menuid":"14","menuname":"菜单管理","icon":"icon-role","url":"demo2.html"},
            {"menuid":"15","menuname":"厂家员工管理","icon":"icon-set","url":"demo.html"},
            {"menuid":"16","menuname":"旧档案系统修改","icon":"icon-log","url":"demo1.html"},
            {"menuid":"16","menuname":"系统日志管理","icon":"icon-log","url":"demo1.html"}
        ]
    },
    {"menuid":"8",
        "icon":"icon-sys",
        "menuname":"认证基础设置",
        "menus": [{
            "menuid":"21",
            "menuname":"配置项维护",
            "icon":"icon-nav",
            "url":"page/CertificationBasis/configItem.html"},
            {"menuid":"22","menuname":"评价模型字典","icon":"icon-nav","url":"../CertificationBasis/evaluationDictionary.html"},
            {"menuid":"22","menuname":"题库(考核项)管理","icon":"icon-nav","url":"demo1.html"}
        ]
    },{"menuid":"56","icon":"icon-sys","menuname":"认证批次创建",
        "menus":[{"menuid":"31","menuname":"认证批次管理","icon":"icon-nav","url":"demo1.html"},
            {"menuid":"32","menuname":"认证店面管理","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"认证人员管理","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"任务组管理","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"认证任务分配","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"评分任务分配","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"评价模型管理","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"考卷管理","icon":"icon-nav","url":"../questions/questionStyle.html"}
        ]
    },{"menuid":"28","icon":"icon-sys","menuname":"认证过程管理",
        "menus":[
            {"menuid":"31","menuname":"星级认证","icon":"icon-nav","url":"demo1.html"},
            {"menuid":"32","menuname":"认证审核","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"认证评分","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"评分审核","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"成绩公布","icon":"icon-nav","url":"demo2.html"}
        ]
    },{"menuid":"39","icon":"icon-sys","menuname":"星级认证终端",
        "menus":[{"menuid":"31","menuname":"认证确认","icon":"icon-nav","url":"demo1.html"},
            {"menuid":"32","menuname":"成绩公示","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"成绩查询","icon":"icon-nav","url":"demo2.html"}
        ]
    },{"menuid":"39","icon":"icon-sys","menuname":"创新案例管理",
        "menus":[
            {"menuid":"31","menuname":"案例任务","icon":"icon-nav","url":"demo1.html"},
            {"menuid":"32","menuname":"案例审核","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"案例评分","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"案例公示","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"案例统计","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"案例验证","icon":"icon-nav","url":"demo2.html"}
        ]
    },{"menuid":"39","icon":"icon-sys","menuname":"创新案例终端",
        "menus":[
            {"menuid":"31","menuname":"案例任务","icon":"icon-nav","url":"demo1.html"},
            {"menuid":"32","menuname":"案例宝藏","icon":"icon-nav","url":"demo2.html"},
            {"menuid":"32","menuname":"测试","icon":"icon-nav","url":"test.html"}
        ]
    }
];

var crumbsItem = [] ;

window.onload = function(){
	$('#loading-mask').fadeOut();
    pageTurning();
}
$(document).ready(function(){
    InitLeftMenu();
    tabClose();
    tabCloseEven();
    /*选择TAB时刷新内容*/
    $('#tabs').tabs({
        onSelect: function (title) {
           /* var currTab = $('#tabs').tabs('getTab', title);
            var iframe = $(currTab.panel('options').content);
            var src = iframe.attr('src');
            if (src) {
                $('#tabs').tabs('update', {tab: currTab, options: {content: createFrame(src)}});
            }*/
            $.each(crumbsItem,function(index,item){
                if(title == item.cMenu){
                    $("#fMenu").text(item.pMenu);
                    $("#sMenu").text(item.cMenu);
                }
            })
        },
        onClose: function(title,index){
            removeCrumbsItem(title);
        }


});
    Array.prototype.remove=function(obj){
        for(var i =0;i <this.length;i++){
            var temp = this[i];
            if(!isNaN(obj)){
                temp=i;
            }
            if(temp == obj){
                for(var j = i;j <this.length;j++){
                    this[j]=this[j+1];
                }
                this.length = this.length-1;
            }
        }
    }
    openPwd();
    $('#editpass').click(function() {
        $('#updatePwd').window('open');
    });

    $('#btnEp').click(function() {
        serverLogin();
    })

    $('#btnCancel').click(function(){closePwd();})

    $('#loginOut').click(function() {
        $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r) {
            if (r) {
                location.href = '../../../view/login/login.html';
            }
        });
    })
    $("#news").click(function(){
        $.each(crumbsItem,function(index,item){
            console.log(item.cMenu);
        })
    });
});
/*翻页*/
function pageTurning(){
    var index = 1;

    setInterval(function(){
        $("#slide ul").animate({left:-($("#slide ul li").width() * index)},1000);
        $("#slide ol").find("li").eq(index).find("i").addClass("active").parent().siblings().find("i").removeClass("active");
        index++;
        if(index >= $("#slide ul").find("li").length){
            index = 0;
        }
    },10000);
    $("#slide ol li").bind("click",function(){
        index = $(this).index();
        $("#slide ul").animate({left:-($("#slide ul li").width() * index)},1000);
        $("#slide ol").find("li").eq(index).find("i").addClass("active").parent().siblings().find("i").removeClass("active");
    })
}


//初始化左侧
function InitLeftMenu() {

   /* $.ajax({
        type:"get",
        url:'json/sideBar.json',
        dataType:'json',
        success:function(data){
            _menus = data;
        },
        error:function(){
            $.messager.alert()
        }
    })*/
	$("#sideBar").accordion({animate:true,fit:true,border:false});
	var selectedPanelname = '';
    $.each(_menus, function(i, n) {
		var menulist ='';
		menulist +='<ul class="navlist">';
        $.each(n.menus, function(j, o) {
			menulist += '<li><div ><a ref="'+o.menuid+'" href="#" rel="' + o.url + '" ><span class="nav">' + o.menuname + '</span></a></div> ';
			if(o.child && o.child.length>0)
			{
                //li.find('div').addClass('icon-arrow');
				menulist += '<ul class="third_ul">';
				$.each(o.child,function(k,p){
					menulist += '<li><div><a ref="'+p.menuid+'" href="#" rel="' + p.url + '" ><span class="icon '+o.icon+'" >&nbsp;</span><span class="nav">' + p.menuname + '</span></a></div> </li>'
				});
				menulist += '</ul>';
			}
			menulist+='</li>';
        })
		menulist += '</ul>';
		$('#sideBar').accordion('add', {
            title: n.menuname,
            content: menulist,
			border:false,
            iconCls: 'icon ' + n.icon
        });
		if(i==0)
			selectedPanelname =n.menuname;

    });

	$('#sideBar').accordion('select',selectedPanelname);

	$('.navlist li a').click(function(){
		var tabTitle = $(this).children('.nav').text();

		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var icon = $(this).find('.icon').attr('class');

		var third = find(menuid);
        $("#fMenu").text($(this).parent().parent().parent().parent().prev().text());
        $(".linkUp").css("visibility","visible");
        $("#sMenu").text(tabTitle);
		if(third && third.child && third.child.length>0)
		{
			$('.third_ul').slideUp();

			var ul =$(this).parent().next();
			if(ul.is(":hidden"))
				ul.slideDown();
			else
				ul.slideUp();
		}
		else{
            addTab(tabTitle,url,icon);
			$('.navlist li div').removeClass("selected");
			$(this).parent().addClass("selected");
            var obj=new Object();
            obj .pMenu = $("#fMenu").text();
            obj.cMenu = tabTitle;
            crumbsItem.push(obj);
		}
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});
	//选中第一个
	//var panels = $('#nav').accordion('panels');
	//var t = panels[0].panel('options').title;
    //$('#nav').accordion('select', t);
}

//获取左侧导航的图标
function getIcon(menuid){
	var icon = 'icon ';
	$.each(_menus, function(i, n) {
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid == menuid){
				icon += o.icon;
			}
		 })
	});
	return icon;
}

function find(menuid){
	var obj = null;
	$.each(_menus, function(i, n) {
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid==menuid){
				obj = o;
			}
		 });
	});
	return obj;
}
function addTab(subtitle,url,icon){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			icon:icon
		});

	}else{

		$('#tabs').tabs('select',subtitle);
		$('#mm-tabupdate').click();

	}

	tabClose();
}

function createFrame(url) {
    /*$.ajax({
        url:url,
        cache:false,
        success:function(data){
            return data;
        },
        error:function(){
            $.messager.alert("内部出现错误")
        }
    })*/
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose() {
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
        removeCrumbsItem(subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#right-btn').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		var subtitle =$(this).children(".tabs-closable").text();
		$('#right-btn').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}



function tabCloseEven() {
    $('#right-btn').menu({
        onClick: function (item) {
            closeTab(item.id);
        }
    });

    return false;
}

//右键关闭tab
function closeTab(action) {
    var alltabs = $('#tabs').tabs('tabs');

    var currentTab =$('#tabs').tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	});

    var onlyOpenTitle = allTabtitle[0];


    switch (action) {
        case "refresh":
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
            $('#tabs').tabs('update', {
                tab: currentTab,
                options: {
                    content: createFrame(src)
                }
            })
            break;
        case "close":
            var currtab_title = currentTab.panel('options').title;
                 $('#tabs').tabs('close', currtab_title);
            break;
        case "closeall":
            $.each(allTabtitle, function (i, n) {

                if (n != onlyOpenTitle){
                    $('#tabs').tabs('close', n);
                    removeCrumbsItem(n);
				}
            });
            break;
        case "closeother":
            var currtab_title = currentTab.panel('options').title;
            $.each(allTabtitle, function (i, n) {
                if (n != currtab_title && n != onlyOpenTitle)
				{
                    $('#tabs').tabs('close', n);
                    removeCrumbsItem(n);
				}
            });
            break;
        case "closeright":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == alltabs.length - 1){
                $.messager.alert('警告',"后面没有了!");
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i > tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
                        removeCrumbsItem(n);
					}
                }
            });
            break;
        case "closeleft":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == 1) {
                $.messager.alert('警告','请手动删除');

                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i < tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
                        removeCrumbsItem(n);
					}
                }
            });

            break;
        case "exit":
            $('#closeMenu').menu('hide');
            break;
    }
}

function removeCrumbsItem(n){
    $.each(crumbsItem,function(index,item){
        if(item.cMenu == n){
            crumbsItem.splice(index,1);
        }
    })
}
//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

//设置登录窗口
function openPwd() {
	$('#updatePwd').window({
		title: '修改密码',
		width: 300,
		modal: true,
		shadow: true,
		closed: true,
		height: 160,
		resizable:false
	});
}

//关闭登录窗口
function closePwd() {
	$('#updatePwd').window('close');
}

//修改密码
function serverLogin() {
	var $newpass = $('#txtNewPass');
	var $rePass = $('#txtRePass');

	if ($newpass.val() == '') {
		msgShow('系统提示', '请输入密码！', 'warning');
		return false;
	}
	if ($rePass.val() == '') {
		msgShow('系统提示', '请在一次输入密码！', 'warning');
		return false;
	}

	if ($newpass.val() != $rePass.val()) {
		msgShow('系统提示', '两次密码不一至！请重新输入', 'warning');
		return false;
	}

	$.post('/ajax/editpassword.ashx?newpass=' + $newpass.val(), function(msg) {
		msgShow('系统提示', '恭喜，密码修改成功！<br>您的新密码为：' + msg, 'info');
		$newpass.val('');
		$rePass.val('');
		close();
	})

}
window.onresize = function(){
    $('#updatePwd').window("move",{
        top:($(window).height() - $("#updatePwd").height())*0.5,
        left:($(window).width() - $("#updatePwd").width())*0.5
    });

}

