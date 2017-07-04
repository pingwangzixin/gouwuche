//商品数组
var can=[
    {"name":"白切鸡","price":16,"img":"./static/img/bqj.jpg","goodsid":1},
    {"name":"麻婆豆腐","price":12,"img":"./static/img/df.jpg","goodsid":2},
    {"name":"东坡肉","price":20,"img":"./static/img/dpr.jpg","goodsid":3},
    {"name":"肉夹馍","price":6,"img":"./static/img/rjm.jpg","goodsid":4},
    {"name":"烧饼","price":2.5,"img":"./static/img/db.jpg","goodsid":5},
    {"name":"麻辣烫","price":19.9,"img":"./static/img/kc.jpg","goodsid":6},
    {"name":"卤肉","price":22,"img":"./static/img/lr.jpg","goodsid":7},
    {"name":"酥饼","price":3.5,"img":"./static/img/sb.jpg","goodsid":8},
    {"name":"老醋花生","price":3.5,"img":"./static/img/lchs.jpg","goodsid":9},
    {"name":"凉拌木耳","price":3.5,"img":"./static/img/lbmu.jpg","goodsid":10},
    {"name":"清蒸鲈鱼","price":3.5,"img":"./static/img/qzly.jpg","goodsid":11},
    {"name":"香肠","price":3.5,"img":"./static/img/lc.jpg","goodsid":12},
];

var taocan=[
    {"name":"披萨","price":39.9,"img":"./static/img/pisa.jpg","goodsid":1},
    {"name":"蛋皮肉卷","price":35,"img":"./static/img/roujuan.jpg","goodsid":2},
    {"name":"蒸排骨","price":38,"img":"./static/img/paigu.jpg","goodsid":3},
    {"name":"卤鸡翅","price":6,"img":"./static/img/jichi.jpg","goodsid":4},
    {"name":"卤面","price":2.5,"img":"./static/img/lumian.jpg","goodsid":5},
    {"name":"白糖糕","price":12,"img":"./static/img/btg.jpg","goodsid":6},
    {"name":"铜锣烧","price":8.8,"img":"./static/img/tls.jpg","goodsid":7},
    {"name":"五香素鸡","price":15,"img":"./static/img/wxsj.jpg","goodsid":8},
    {"name":"鱼香茄子","price":10,"img":"./static/img/yxqz.jpg","goodsid":9},
    {"name":"蛋卷","price":3.5,"img":"./static/img/dj.jpg","goodsid":10},
    {"name":"干锅土豆片","price":16,"img":"./static/img/qzly.jpg","goodsid":11},
    {"name":"红烧猪蹄","price":22,"img":"./static/img/hszt.jpg","goodsid":12},
]
//angularjs控制器，调用商品数据
var meituan=angular.module("meituan",[])
meituan.controller("canpin",function($scope){
    $scope.cp=can;
    $scope.tc=taocan;
    $scope.cart={};
    $scope.goodsnum={};
    $scope.buy=function(n){
//        alert('点击购买'+n)
        var gid=can[n]['goodsid'];
        if($scope.cart[gid]==null){
            $scope.cart[gid]=can[n]
            $scope.goodsnum[gid]=1;
        }else{
            $scope.goodsnum[gid] +=1;
        }
    };
    
    $scope.mai=function(n){
//                alert('点击购买'+n)
        var gid=taocan[n]['goodsid'];
        if($scope.cart[gid]==null){
            $scope.cart[gid]=taocan[n]
            $scope.goodsnum[gid]=1;
        }else{
            $scope.goodsnum[gid] +=1;
        }
    };
    
    $scope.jsgw=function(n){
        var gid=can[n]['goodsid'];
        if($scope.cart[gid]==null){
            $scope.cart[gid]=can[n]
            $scope.goodsnum[gid]=1;
        }else{
            $scope.goodsnum[gid] -=1;
        }
    };
    
    $scope.jsgwe=function(n){
        var gid=taocan[n]['goodsid'];
        if($scope.cart[gid]==null){
            $scope.cart[gid]=taocan[n]
            $scope.goodsnum[gid]=1;
        }else{
            $scope.goodsnum[gid] -=1;
        }
    };
    
    $scope.$watch('goodsnum',function(){
        var total=0;
        var cartnum=0;
        for(var i in $scope.goodsnum){
            cartnum++;
            total +=$scope.goodsnum[i]*$scope.cart[i]['price'];
        }

        $scope.total=total;
        $scope.cartnum =cartnum;
    },true)
    
})

//计算出总价
function getzongjia(){
    var zong=0;
    $(".xj").each(function(index,node){
        zong +=Number($(node).html())
        $(".zongjia .zj").html(zong.toFixed(2))
    })
}

//计算出总共的购买数量
function getzongnum(){
    var zongnum=0;
    $(".sl").each(function(index,node){
        zongnum +=Number($(node).val())
        $(".num").html(zongnum)
    })
}

$(function(){
    
    //加号运算
    $(".jia").click(function(){
        //点击事件加快
        FastClick.attach(document.body);
        var num=$(this).closest(".meishi").find(".sl");//获取input输入框的值
        var sl=parseInt(num.val())+1;//把获取的值转换成整型赋值给sl
        $(this).closest(".meishi").find(".sl").val(sl); //把sl的值添加到输入框

        var price=parseFloat($(this).closest(".meishi").find(".price").html());
        var xj=price*sl;
        $(this).closest(".meishi").find(".xj").html(xj.toFixed(2));

        getzongjia();
        getzongnum();
        
        var gwzl=sl;

    })
    
    //减号运算
    $(".jian").click(function(){
        //点击事件加快
        FastClick.attach(document.body);
        var num=$(this).closest(".meishi").find(".sl");
        var sl=parseInt(num.val())-1;
        if(sl<0){sl=0}
        $(this).closest(".meishi").find(".sl").val(sl)

        var price=parseFloat($(this).closest(".meishi").find(".price").html());
        var xj=price*sl;
        $(this).closest(".meishi").find(".xj").html(xj.toFixed(2));

        getzongjia();
        getzongnum();
        var gwzl=sl;
    })
    
    //input输入框运算
    $(".sl").focusout(function(){
        var num=$(this).closest(".meishi").find(".sl");
        var sl=parseInt(num.val());
        if(sl<0){sl=0}
        $(this).closest(".meishi").find(".sl").val(sl)

        var price=parseFloat($(this).closest(".meishi").find(".price").html());
        var xj=price*sl;
        $(this).closest(".meishi").find(".xj").html(xj.toFixed(2));

        getzongjia();
        getzongnum();
    })
    
    //点击显示购物车
    $(".car").click(function(e){
        e.stopPropagation();
        $(".hiden").show();
        $(".shsp").show();
    })
    
    //关闭购物车
    $(".gb").click(function(e){
        e.stopPropagation();
        $(".hiden").fadeOut(100);
        $(".shsp").hide(100);
    })
    
    //左右选项卡切换
    var $div_li=$(".cpmclist li");
    $div_li.click(function(){
        //点击事件加快
        FastClick.attach(document.body);
        $(this).addClass("active").siblings().removeClass("active");
        var index=$div_li.index(this);
        $(".cplist >ul").eq(index).show().siblings().hide();
    })
    
    //弹出支付层
    $(".tj").click(function(){
        $(".hiden").fadeIn(100);
        $(".zhifu").show(100)
    })
    
    //关闭支付层
    $(".guanbi").click(function(){
        $(".hiden").fadeOut(100);
        $(".zhifu").hide(100)
    })
    
    //下拉加载
    $(window).scroll(function(){
        var ht=$(window).height();//屏幕高度
        var gdht=$(window).scrollTop();//滚动条高度
        var ymht=$(document).height();//页面文档的高度
        
        if(ht+gdht>=ymht){
            $.ajax({
                url:"1.json",
                type:"get",
                beforeSend: function(){
                    $(".xuanzhuan").show()
                },
                success:function(date){
                    var name=date.name;
                    var img=date.img;
                    var price=date.price;
                    $(".cplist ul").append('<li>'+'<img src="'+img+'">'+'<span class="spmc">'+name+'</span>'+'<span  class="spjg">'+"￥"+'<span>'+""+'</span>'+price+'</span>'+'<span class="xiaoji">'+"小计："+'<span class="xj">'+"0"+'</span>'+'</span>'+'</li>')
                    setInterval(function(){
                        $(".xuanzhuan").hide()
                    },3000)
                }
            })
        }
    })
})