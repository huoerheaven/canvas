function shape(copy,cobj,eraser){
    this.copy = copy;//赋值给
    // 属性
    this.cobj = cobj;
    this.history = [];
    this.canvasW=copy.offsetWidth;
    this.canvasH=500;
    this.eraser=eraser;
    this.fillStyle = "#000";
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.style = "stroke";
    this.type = "line";
    this.isback=true;
    this.bianNum=5;
    this.jiaoNum=5;
    this.eraserSize=10;
    this.isback=true;
}
shape.prototype={
    init:function(){//初始值，操作的都是画布的二级对象
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
        this.isback=true;
        this.eraser.style.display="none";
    },
    draw:function(){
        this.init();
        var that=this;
        that.copy.onmousedown=function(e){
            var e= window.event||e;
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                var e= window.event||e;
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);//将历史记录里的某个内容放到画布上
                }
                that[that.type](startx,starty,endx,endy);//指向that.type所在的图形调用的方法。实参
            };

            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));//将画布的所有内容(画布里呈现的内容)放到数组里
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            };
            that.isback=true;
        }

    },
    line:function(startx,starty,endx,endy){
        this.cobj.beginPath();
        this.cobj.moveTo(startx,starty);
        this.cobj.lineTo(endx,endy);
        this.cobj.stroke();
    },
    rect:function(startx,starty,endx,endy){
        this.cobj.beginPath();
        this.cobj.rect(startx,starty,endx-startx,endy-starty);
        this.cobj[this.style]();
    },
    circle:function(startx,starty,endx,endy){
        this.cobj.beginPath();
        var r=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        this.cobj.arc(startx,starty,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(startx,starty,endx,endy){
        var a=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(startx+r*Math.cos(a*i),starty+r*Math.sin(a*i))
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(startx,starty,endx,endy){
        var a=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(startx+r*Math.cos(a*i),starty+r*Math.sin(a*i))
            }else{
                this.cobj.lineTo(startx+r1*Math.cos(a*i),starty+r1*Math.sin(a*i))
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var e= window.event||e;
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e) {
                var e = window.event || e;
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.lineTo(endx, endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));//将画布的所有内容(画布里呈现的内容)放到数组里
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            };
        }

    },
    clear:function(){
        var that=this;
        that.copy.onmousemove=function(e){
            var movex= e.offsetX;
            var movey= e.offsetY;
            var left=movex-that.eraserSize/2;
            var top=movey-that.eraserSize/2;
            if(left<0){
                left=0
            }
            if(left>that.canvasW-that.eraserSize){
                left=that.canvasW-that.eraserSize
            }
            if(top<0){
                top=0
            }
            if(top>that.canvasH-that.eraserSize){
                top=that.canvasH-that.eraserSize
            }
            that.eraser.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.eraserSize+"px;height:"+that.eraserSize+"px;"
        }

        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                var left=movex-that.eraserSize/2;
                var top=movey-that.eraserSize/2;
                if(left<0){
                    left=0
                }
                if(left>that.canvasW-that.eraserSize){
                    left=that.canvasW-that.eraserSize
                }
                if(top<0){
                    top=0
                }
                if(top>that.canvasH-that.eraserSize){
                    top=that.canvasH-that.eraserSize
                }
                that.eraser.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.eraserSize+"px;height:"+that.eraserSize+"px;"
                that.cobj.clearRect(left,top,that.eraserSize,that.eraserSize);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.clear();
            }
        }

    }
};

