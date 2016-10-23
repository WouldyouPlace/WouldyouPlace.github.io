(function(){
	function PicWall(){
		this.init();
	}
	if($(window).height() <=768){
		var pic_r = 3;
		$(".top").css("height","410px");
		$(".top_content").css("height","410px");
	} if($(window).height() > 768){
		var pic_r = 4;
		$(".top").css("height","534px");
		$(".top_content").css("height","534px");
	}
	PicWall.prototype = {
		MAX_COL:27,  //图片矩阵列数
		MAX_ROW: pic_r ,  //图片矩阵行数
		DX:130,     //单位格宽
		DY:130,     //单位格高
		MX:2,       //x轴间距
		MY:2,       //y轴间距
		ruleBig:3,  //每3列1大图
		ruleTag:2,  //每2列1tag
		grid:{},    //网格{0:[y0,y1],1:[y0,y1]}
		data:[],    //图片数据
		temp:{},    //大图小图临时存储
		list:{},    //{0:[],1:[],2:[]} 每页图片列表
		pages:{},   //每页列表html
		pageNum:0,
		wrapper:$(".top_content"),
		MIN_PAGE:0,
		MAX_PAGE:4,
		currPage:0,
		lastPage:0,
		scrollColStep:6, //每次滚动列数
		scrolling:false,
		debug:true,
		colors:[
			"#FF931E",
			"#8CD41E",
			"#854CAF",
			"#8C6239",
			"#1EBDB8",
			"#EBD700",
			"#29ABE2",
			"#ED1E79",
			"#009245"
		],
		init:function(){
			var _this = this;
			_this.picList = _this.wrapper.html();
			_this.wrapper.empty();
			var prevBtn = $('<div class="banner-page prev no-select"><div class="banner-page-arrow-l"></div></div>').appendTo(_this.wrapper);
			var nextBtn = $('<div class="banner-page next no-select"><div class="banner-page-arrow-r"></div></div>').appendTo(_this.wrapper);
			$.ajax({
				url:_this.debug?"../../json/pic_banner.json":"../login/login.html",
				dataType:"json",
				success:function(data){
					if(data.state == 200){
						_this.MAX_PAGE = data.data.length - 1;
						var picData = _this.dataRandom(data.data);
						for(var i =0 ;i<picData.length;i++){
							_this.data.push(picData[i]);
						}
						prevBtn.click(function(){
							_this.scroll(-1);
						});
						nextBtn.click(function(){
							_this.scroll(1);
						});
						_this.load();
						pickBanner();
					} else{
						_this.MAX_PAGE = 0;
						$(_this.errorPage("载入失败")).appendTo(_this.wrapper);
					}
				},
				error:function(){

				}
			});
		},
		scroll:function(direction){
			var _this = this;
			if(_this.scrolling) return;
			var stepWidth = 0,remainder = 0;
			if(direction == 1){
				remainder = _this.picScrollWrapper.offset().left+_this.picScrollWrapper.width()-_this.wrapper.width();
			} else{
				remainder = _this.picScrollWrapper.offset().left;
			}
			if(Math.abs(remainder)>0){
				var defaultStepWidth = _this.wrapper.width()/2;
				if(defaultStepWidth >= _this.scrollColStep*(_this.DX+_this.MX)){
					defaultStepWidth = _this.scrollColStep*(_this.DX+_this.MX);
				}
				if(Math.abs(remainder)>=defaultStepWidth && Math.abs(remainder)-defaultStepWidth>Math.abs(defaultStepWidth/2)){
					stepWidth = direction * defaultStepWidth;
				} else{
					stepWidth = remainder;
				}
				_this.scrolling = true;
				_this.lazyLoad(_this.list[_this.currPage],stepWidth);
				_this.picScrollWrapper.animate({"left":"-="+stepWidth},1350,'linear',function(){
					_this.scrolling = false;
				});

			} else{
				//_this.pageChange(direction);
			}
		},
		pageChange:function(direction){
			var _this = this;
			_this.lastPage = _this.currPage;
			if(direction == 1){
				_this.currPage++;
				if(_this.currPage>_this.MAX_PAGE){
					_this.currPage = _this.MIN_PAGE;
				}
			} else{
				_this.currPage--;
				if(_this.currPage<_this.MIN_PAGE){
					_this.currPage = _this.MAX_PAGE;
				}
			}
			_this.load();
		},
		dataRandom:function(dataSrc){
			var dataSrc = dataSrc;
			var data = [];
			while(dataSrc.length!=0){
				var index = Math.round(Math.random()*(dataSrc.length-1));
				data.push(dataSrc[index]);
				dataSrc.splice(index,1);
			}
			return data;
		},
		load:function(){
			var _this = this;
			var page = _this.currPage;
			if(typeof _this.pages[page] != "undefined"){
				if(typeof _this.pages[_this.lastPage] != "undefined") _this.pages[_this.lastPage].stop(false,true).hide();
				_this.pages[page].fadeIn();
			} else{
				if(typeof _this.pages[_this.lastPage] != "undefined") _this.pages[_this.lastPage].stop(false,true).hide();
				_this.create(page);
			}
		},
		errorPage:function(text){
			return '<div style="text-align: center;height: 410px;line-height: 410px;">'+(typeof text !="undefined"?text:"载入失败")+'</div>';
		},
		create:function(page){
			var _this = this;
			function _pushData(data,tempData,type){
				for(var i = 0;i<data[type].length;i++){
					var d = data[type][i];
					if(d==null) continue;
					if(type != "tag"){
						var obj = $('<div class="box_mar"><a href="/'+d.url+'" target="_blank"><img src="" data-src="'+d.il_file+'" /></a></div>');
						if(type=="big"){
							obj.addClass("big_box");
						} else{
							obj.addClass("little_box");
						}
					} else{
						var obj = $('<div class="box_mar tag" style="background-color:'+_this.getRandomColor()+'"><a href="http://search.bilibili.com/drawyoo?keyword='+d.key_word+'" target="_blank"><div class="picwall_tag_box"><div class="picwall_tag_name">'+d.tag+'</div><div class="picwall_tag_nub">'+d.ref+'</div></div><div class="picwall_tag_icon"></div><div class="picwall_tag_icon2"></div></div></div></a></div>');
					}
					tempData[type].push(obj);
				}
			}
			_this.grid[page] = [];
			_this.temp[page] = {
				small:[],
				big:[],
				tag:[]
			};
			_this.list[page] = [];
			var data = _this.data[page];
			_this.pageNum++;
			_this.picScrollWrapper = $('<div class="pic-list-scroll-wrapper"></div>').width(_this.MAX_COL*(_this.DX+_this.MX)-_this.MX).appendTo(_this.wrapper);
			var picWrapper = $('<div class="pic-list"></div>').appendTo(_this.picScrollWrapper).fadeIn();
			_this.pages[page] = picWrapper;
			if(typeof data == "undefined"){
				$(_this.errorPage("图片太少啊！！")).appendTo(picWrapper);
				return;
			}

			_pushData(data,_this.temp[page],"big");
			_pushData(data,_this.temp[page],"small");
			_pushData(data,_this.temp[page],"tag");

			for(var i = 0;i<_this.MAX_ROW;i++){
				var row = [];
				for(var j = 0;j<_this.MAX_COL;j++){
					row.push(0);
				}
				_this.grid[page].push(row);
			}
			_this.append(picWrapper);
		},
		append:function(target){
			var _this = this;
			var page = _this.currPage;
			_this.random(_this.temp[page].big,2,_this.ruleBig);
			_this.random(_this.temp[page].tag,1,_this.ruleTag);
			_this.search(_this.temp[page].small,1);
			_this.list[page].sort(function(a,b){
				if(a.row>b.row){
					return 1;
				} else if(a.row<b.row){
					return -1;
				} else{
					return a.col - b.col;
				}
			});
			for(var i=0;i<_this.list[page].length;i++){
				var pic = _this.list[page][i];
				var top = pic.top = pic.row*_this.DY+pic.row*_this.MY;
				var left = pic.left = pic.col*_this.DY+pic.col*_this.MY;
				pic.obj.appendTo(target).css({"top":top,"left":left});
				_this.lazyLoad([pic]);
			}
		},
		lazyLoad:function(list,stepWidth){
			var _this = this;
			var page = _this.currPage;
			for(var i=0;i<list.length;i++){
				var pic = list[i];
				var _stepWidth = stepWidth || 0;
				if(pic.left+_this.picScrollWrapper.offset().left-_stepWidth<=_this.wrapper.width()){
					var img = $("img",pic.obj);
					if(img.length>0 && img.attr("src")!=img.attr("data-src")){
						img.attr("src",img.attr("data-src"));
						load_img($("img",pic.obj));
					}
				}
			}
		},
		search:function(list,size){
			var _this = this;
			if(list.length==0){
				return;
			}
			var page = _this.currPage;
			var index = 0;
			for(var i = 0;i<=_this.MAX_ROW-size;i++){
				for(var j = 0;j<=_this.MAX_COL-size;j++){
					if(!_this.check(_this.grid[page],i,j,size)){
						continue;
					}
					var pic = list[index];
					_this.fill(_this.grid[page],i,j,size);
					_this.list[page].push({
						obj:pic,
						row:i,
						col:j
					});
					index++;
					if(index>=list.length) break;
				}
				if(index>=list.length) break;
			}
			if(index<list.length){
				var pic = list[index];
				pic.hide();
			}
		},
		random:function(list,size,rule){
			var _this = this;
			var page = _this.currPage;
			if(typeof _this.deadCase[_this.MAX_ROW+"x"+_this.MAX_COL] != "undefined" && _this.deadCase[_this.MAX_ROW+"x"+_this.MAX_COL].bigNum == list.length){
				var deadCase = _this.deadCase[_this.MAX_ROW+"x"+_this.MAX_COL];
			}
			for(var k=0;k<list.length;k++){
				var grid_a = [];
				for(var i = 0;i<=_this.MAX_ROW-size;i++){
					var startAt = 0,startEnd = _this.MAX_COL-size;
					if(typeof rule != "undefined"){
						startAt = k*rule;
						startEnd = (k+1)*rule-size;
					}
					for(var j = startAt;j<=startEnd;j++){
						if(!_this.check(_this.grid[page],i,j,size)){
							continue;
						}
						if(!_this.checkDead(deadCase,j)&&deadCase.len>=deadCase.deadLen-1){
							continue;
						}
						grid_a.push({row:i,col:j});
					}
				}
				if(grid_a.length==0) return;
				var pos = Math.round(Math.random()*(grid_a.length-1));
				var r = grid_a[pos].row;
				var c = grid_a[pos].col;

				if(!_this.checkDead(deadCase,c)) {
					deadCase.len++;
				}
				var pic = list[k];
				_this.fill(_this.grid[page],r,c,size);
				_this.list[page].push({
					obj:pic,
					row:r,
					col:c
				});
			}
		},
		check:function(grid,row,col,size){
			var size = size || 1;
			if(col+size>this.MAX_COL) return false;
			for(var x=0;x<size;x++){
				for(var y=0;y<size;y++){
					if(grid[row+x][col+y] == 1) {
						return false;
					}
				}
			}
			return true;
		},
		fill:function(grid,row,col,size){
			var size = size || 1;
			for(var x=0;x<size;x++){
				for(var y=0;y<size;y++){
					grid[row+x][col+y] = 1;
				}
			}
		},
		getRandomColor:function(){
			var index = Math.round(Math.random()*(this.colors.length-1));
			return this.colors[index];
		},
		createTempList:function(list,row,col,size){
			for(var x=0;x<size;x++){
				for(var y=0;y<size;y++){
					list.push({row:row+x,col:col+y});
				}
			}
			return list;
		},
		createDeadLog:function(grid,list,size){
			var _this = this;
			_this.deadList.push(list);
			for(var i=0;i<list.length;i++){
				var pos = list[i];
				for(var x=0;x<size;x++){
					for(var y=0;y<size;y++){
						grid[pos.row+x][pos.col+y] = 0;
					}
				}
			}
		},
		deadCase:{
			"3x7":{
				bigNum:3,
				len:0,
				deadLen:2,
				list:[1,4]
			}
		},
		checkDead:function(deadCase,n){
			if(typeof deadCase != "undefined"){
				for(var i = 0;i<deadCase.list.length;i++){
					if(deadCase.list[i]==n){
						return false;
					}
				}
				return true;
			} else{
				return true;
			}
		}
	}

	var pw = new PicWall();
    function load_img(imgs,callback){
        imgs.each(function(i,e){
            var img = $(e);
            img.css({"opacity":0});
            img.on("load",function(){
                var _img = $(this);
                if(typeof callback !="undefined"){
                    callback(img);
                }
                _img.animate({"opacity":1},200);
            });
            img.on("error",function(){
                img.css({"opacity":1});
            });
        });
    }
})();

function pickBanner(){
	var pickTitle;
	var pickImg;
	var pickInfo;
	var pickLink;
	var pickBlock;
	var pickBannerTop;
	var bigboxLenght = $('.box_mar.big_box').length;
	for(var i =0 ;i<bigboxLenght;i++){
		bigBoxTop = parseInt($($('.box_mar.big_box')[i]).css('top'));
		bigBoxLeft = parseInt($($('.box_mar.big_box')[i]).css('left'));
		if(395<bigBoxLeft && bigBoxLeft<792){
			if(bigBoxTop == 264 ){
				pickBannerTop = 132;
				break;
			}
		}
	}
	$.ajax({
		url: '../../json/pic_null',
		type: 'get',
		dataType: 'json',
		success : function(data){
			if(!data.item == ''){
				pickTitle = data.item[0].title;
				pickImg = data.item[0].small_image ;
				pickInfo = data.item[0].image;
				pickLink = data.item[0].link;
				pickBlock = $('<div class="pick-activity"><a target="_blank" rec-linkid="banner-activity" href="'+ pickLink +'" ><div class="pick-activity-img"><img style="width: 100%" src="'+ pickImg +'" alt=""></div></a><div class="pick-title">'+ pickTitle +'</div><div class="pick-info">'+ pickInfo +'</div><a target="_blank" rec-linkid="banner-activity" href="'+ pickLink +'"><div class="pick-button">立即参加 > </div></a><div>')
				$('.pic-list').append(pickBlock);
				$('.pick-activity').css('left','396px');
				$('.pick-activity').css('top',pickBannerTop);
			}
		},
		error: function() {
			//no action
		}
	})
}
