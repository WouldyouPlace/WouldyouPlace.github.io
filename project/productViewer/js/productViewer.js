/**
 * Created by Lenovo on 2016/6/6.
 */
(function(factory,$){
    var productViewer = function(element){
        this._$e=$(element);
        this._init();
        this._loadSprite();
        this._loadProgress(0);
    };
    productViewer.prototype = {
        _init : function(){
            this._$viewer = this._find(".viewer");
            this._$loading = this._find(".viewer .loading");
            this._$product = this._find(".viewer .product");
            this._$progress = this._find(".handler .progress");
            this._$handle = this._find(".handler .handle");
            this.loaded = false;
        },
        _find : function(selecor){
            return  $(selecor, this._$e);
        },
        _loadSprite : function(){
            var self = this;

            this.spriteSrc = this._$product.data("image-src");
            $("<img>").attr("src",this.spriteSrc).on("load",function(){
                window.setTimeout(function(){
                    self.loaded = true;
                },2000);
            });
        },
        _loadProgress : function(progress){
            var self = this;
            this._$progress.css("width",progress + "%");
            if(progress == 100) return;
            progress += 10;
            if(this.loaded){
                /*加载完成*/
                this._loadProgress(100);
                /*console.log(progress);*/
                self._$loading.css("visibility","hidden");
                this._$product.css("backgroundImage","url('" + this.spriteSrc + "')").fadeIn(1000,function(){
                    self._$progress.remove();
                    self._$handle.css("display","block");
                });
              /*  this._$product.fadeIn(1000,function(){
                    self._$progress.remove();
                    self._$handle.css("display","block");
                });*/
                this._handleEvent();
            }else{
                window.setTimeout(function(){
                    self._loadProgress(progress);
                },300);
            }
        },
        _handleEvent : function (){
            var $v = this._$viewer;
            var self = this;
            $v.off("vmousedown").on("vmousedown",function(e){
                var postionsX = e.pageX;
                $v.off("vmousemove").on("vmousemove",function(e){
                    var p = Math.ceil(((postionsX - e.pageX)/16%16))*100;
                    /*console.log(p);*/
                    p = p>0 ? (p - 1600) :p;
                    self._$product.css("left",p + "%");
                    self._updateHandle(p);
                }).off("vmouseup").on("vmouseup",function(e){
                    $v.off("vmousemove");
                })
            });
        },
        _updateHandle:function(p){
            this._$handle.css("left",-(p/16) + "%");
        }
    };
    factory.productViewer =productViewer;
})(window,jQuery);