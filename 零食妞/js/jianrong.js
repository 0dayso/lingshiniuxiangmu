/**
 * Created by Administrator on 2016/8/11.
 */
var jrEx={
    getEvent:function(event){
        return event||window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            return event.stopPropagation();
        }else{
            return cancelBubble=true;
        }

    },
    oncontextmenuEx:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
        return false;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
        return false;
    },
    getFirstChild:function(node){
        if(node.firstElementChild){
            return node.firstElementChild;
        }else{
            return node.firstChild;
        }
    },
    getLastChild:function(node){
        return node.lastElementChild||node.lastChild;
    },
    getNextSibling:function(node){
        return node.nextElementSibling||node.nextSibling;
    },
    getPreviousSibling:function(node){
        return node.previousElementSibling||node.previousSibling;
    },
    getChildren:function(node){
        var arrChild=[];
        var children=node.childNodes;
        for(var i=0;i<children.length;i++){
            if(children[i].nodeType==1)
            {
                arrChild.push(children[i]);
            }
        }
        return arrChild;
    },
    getEventButton:function(e){				//获取鼠标事件button
        if (document.implementation.hasFeature("MouseEvents","2.0")) {
            return e.button;
        }else{
            switch(e.button){
                case 1: return 0;
                case 2:	return 2;
                case 3:	return 0;
                case 4:	return 1;
                case 5:	return 0;
                case 6:	return 2;
                case 7:	return 0;
            }
        }
    },
    getStyle:function(dom,style){     //获取样式信息
        if(dom.currentStyle[style] ){
            return dom.currentStyle[style];     //只有ie识别
        }else{ return  window.getComputedStyle(dom,false)[style]; }

    }
}


function getTop(dom){             //获取含有绝对定位的父节点的位置
    var top=dom.offsetTop;
    while(dom.offsetParent){
        top+=dom.offsetParent.offsetTop;
        dom=dom.offsetParent;
    }
    return top;
}

function getStyle(dom, attr) {
    if (dom.currentStyle) {   //ie
        return dom.currentStyle[attr];
    } else {
        return window.getComputedStyle(dom, false)[attr];  //非ie
    }
}

function moveEX(dom,target,fn){
    clearInterval(dom.timer);
    dom.timer=setInterval(function(){
        var isComplete=true;
        for(var item in target){
            if(item=="opacity"){
                var cur=Math.round(parseFloat(getStyle(dom, item)) * 100);
            }else{
                var cur=Math.round(parseFloat(getStyle(dom,item)));
            }
            if(!cur){   /*当为默认值时，为auto，则cur=NaN*/
                if(item=="opacity"){
                    cur=100;
                }else{
                    cur=0;
                }

            }
            var speed=(target[item]-cur)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            //speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
            if(cur==target[item]){

            }else{
                if(item=="opacity"){
                    isComplete=false;
                    dom.style.filter = "alpha(opacity:" + (cur+speed) + ")";
                    dom.style.opacity=(cur+speed)/100;
                }else{
                    isComplete=false;
                    dom.style[item]=cur+speed+"px";
                }
            }
        }
        if(isComplete){
            clearInterval(dom.timer);
            if(fn){
                fn();
            }
        }
    },30);
}

var cookieEx={
    setCookie:function(cname,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=cname+ "=" +encodeURIComponent(value)+      //中文编码
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
    },
    getCookie:function(cname){
        var cookieValue="";
        var cookies=document.cookie;  //字符串
        var arrcookie=cookies.split("; ");   //数组
        for(var i=0;i<arrcookie.length;i++){
            var arrcookieItem=arrcookie[i].split("=");
            if(arrcookieItem[0]==cname){
                cookieValue=arrcookieItem[1];
            }
        }
        return decodeURIComponent(cookieValue);   //中文编码
    },
    getCookie2:function(cname){
        if (document.cookie.length>0){
            c_start=document.cookie.indexOf(cname + "=");
            if (c_start!=-1){
                c_start=c_start + cname.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return document.cookie.substring(c_start,c_end);
            }
        }else{
            return "";
        }
    },
    deleteCookie:function (name){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()-1);
        document.cookie=name+"=;expires="+oDate;
    }
}