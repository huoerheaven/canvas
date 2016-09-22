$(function(){
    /*点击左侧导航效果*/


    $(".nav li").click(function(){
        var that=this;
        var index=$(that).index(".nav li");
        //alert(index)
        $(".option").css({transform:"scale(0,0)"});
        $(".option").eq(index).css({transform:"scale(1,1)"});
        $(".option:not(.option5)").click(function(){
            $(this).css({transform:"scale(0,0)"});
        });
        $(".option5 li").click(function(){
            $(".option5").css({transform:"scale(0,0)"});
        });
        $(".number").change(function(){
            $(".option5").css({transform:"scale(0,0)"});
        });
        $(".option6").click(function(){
            $(this).css({transform:"scale(1,1)"});
        });
        $(".number1").change(function(){
            $(".option6").css({transform:"scale(0,0)"});
        });
    });
    $(".copy").click(function(){
        $(".option").css({transform:"scale(0,0)"});
    })



/*画图功能*/
var canvas=document.querySelector("canvas");
var copy=document.querySelector(".copy");
var eraser=document.querySelector(".eraser");
var cobj=canvas.getContext("2d");
var  obj= new shape(copy,cobj,eraser);
obj.draw();

/*画图*/
$(".option2 li").click(function(){
    if($(this).attr("data-role")=="pen"){
        obj.pen();
    }else{
        obj.type=$(this).attr("data-role");
        if($(this).attr("data-role")=="bian"){
            obj.bianNum=prompt("请输入边数","5");
        }
        if($(this).attr("data-role")=="jiao"){
            obj.jiaoNum=prompt("请输入角数","5");
        }
        obj.draw();
    }

});

/*画图方式*/
$(".option4 li").click(function(){
    obj.style=$(this).attr("data-role");
    obj.draw();
});


/*设置颜色*/

$(".option3 input").change(function(){
    obj[$(this).attr("data-role")]=$(this).val();
    obj.draw();
});


/*设置线条宽度*/

$(".option5 li").click(function(){
    //alert(1)
    obj.lineWidth=$(this).attr("data-role");
    obj.draw();
});
$(".option5 input").change(function(){
    obj.lineWidth=$(this).val();
    obj.draw();
});


/*橡皮*/
$(".nav li:last-of-type").click(function(){
    obj.clear();
});
    $(".option6 input").change(function(){
        obj.eraserSize=$(this).val();
    });


/*返回*/

$(".back").click(function(){
        if(obj.history.length==0){
            cobj.clearRect(0,0,canvas.width,canvas.height);
            setTimeout(function(){
                alert("已经是最后一步");
            },10)

        }
        if(obj.isback){
            if(obj.history.length==1){
                obj.history.pop();
                cobj.clearRect(0,0,canvas.width,canvas.height);
            }
            else{
                obj.history.pop();
                cobj.putImageData(obj.history.pop(),0,0);
            }

        }
        else{
            cobj.putImageData(obj.history.pop(),0,0);
        }
    obj.isback=false;
})

    /*新建*/
$(".new").click(function(){
    if(obj.history.length>0){
        var yes=confirm("是否保存");
        if(yes){
            location.href=canvas.toDataURL().replace("images/png","stream/octet")
        }
        obj.history=[];
        cobj.clearRect(0,0,canvas.width,canvas.height)
    }
})



    /*保存*/
    $(".save").click(function(){
        if(obj.history.length>0){
            location.href=canvas.toDataURL().replace("images/png","stream/octet")
        }
    })



});