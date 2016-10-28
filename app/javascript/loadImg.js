var t_img;      //定时器
var isLoad = true;      //控制变量

function isImgLoad(callback) {
    $("#inner").find('img').each(function () {
        if (this.height === 0) {
            isLoad = false;
            return false;
        }
    });
    //为true，表示加载完毕
    if (isLoad) {
        clearTimeout(t_img);
        console.log('OK');
        callback();
    } else {
        isLoad = true;
        console.log('NO');
        t_img = setTimeout(function () {
            isImgLoad(callback);//递归扫描
        }, 200);
    }
}