var inheritPrototype=function(childClass,parentClass){
    for(var functionPrototypeName in parentClass.prototype){
        if(childClass.prototype[functionPrototypeName]==null){// has to be ==
            childClass.prototype[functionPrototypeName]=parentClass.prototype[functionPrototypeName];
        }
    }
};

var inherit=function(childObject,parentClass){
    parentClass.call(childObject);
};


function WNode(){
    this.w=null;// must be set to a document element
}

WNode.prototype.setID=function(id){
    this.w.id=id;
};

WNode.prototype.add=function(node){
    this.w.appendChild(node.w);
};

WNode.prototype.remove=function(node){
    this.w.removeChild(node.w);
};

WNode.prototype.removeAllChildren=function(){
    while(this.w.hasChildNodes()){
        this.w.removeChild(this.w.firstChild);
    }
};

WNode.prototype.toTop=function(){
    var parent=this.w.parentNode;
    parent.removeChild(this.w);
    parent.appendChild(this.w);
};

WNode.prototype.toBack=function(){
    var parent=this.w.parentNode;

    parent.removeChild(this.w);
    parent.insertBefore(this.w,parent.firstElementChild);
};

WNode.prototype.contains=function(child){
    for(var index=0;index<this.w.childNodes.length;index++){
        if(this.w.childNodes[index] === child.w){
            return true;
        }
    }
    return false;
};

WNode.prototype.setTabIndex=function(index){
    this.w.tabIndex=index;
};



function WStyle(){
    this.w={};
    this.w.style={};
}

WStyle.prototype.applyTo=function(wigetObject){
    for(var key in this.w.style){
        if(this.w.style[key]!==null){
            wigetObject.w.style[key]=this.w.style[key];
        }else{
            delete wigetObject.w.style[key];
        }
    }
};

WStyle.prototype.set=function(propertyName,value){
    if(value!==null){
        if(typeof value === "number"){
            this.w.style[propertyName]=value+"px";
        }else{
            this.w.style[propertyName]=value;
        }
    }else{
        delete this.w.style[propertyName];
    }
};

WStyle.prototype.get=function(propertyName){
    return this.w.style[propertyName];
};

WStyle.prototype.getStyle=function(){
    return this.w.style;
};



WBorderStyle.createBorder=function(type,width,color){
    var border=new WBorderStyle();
    if(type!==null){
        border.setBorder(type);
    }
    if(width!==null){
        border.setBorderWidth(width);
    }
    if(border!==null){
        border.setBorderColor(color);
    }
    return border;
};

WBorderStyle.NONE="none";
WBorderStyle.DOTTED="dotted";
WBorderStyle.DASHED="dashed";
WBorderStyle.SOLID="solid";
WBorderStyle.DOUBLE="double";
WBorderStyle.GROOVE="groove";
WBorderStyle.RIDGE="ridge";
WBorderStyle.INSET="inset";
WBorderStyle.OUTSET="outset";
WBorderStyle.INHERIT="inherit";

inheritPrototype(WBorderStyle,WStyle);
function WBorderStyle(){
    inherit(this,WStyle);
}

WBorderStyle.prototype.setBorder=function(border){
    this.set("border",border);
};

WBorderStyle.prototype.setBorderCollapse=function(borderCollapse){
    this.set("borderCollapse",borderCollapse);
};

WBorderStyle.prototype.setBorderWidth=function(borderWidth){
    this.set("borderWidth",borderWidth);
};
WBorderStyle.prototype.setBorderColor=function(borderColor){
    this.set("borderColor",borderColor);
};
WBorderStyle.prototype.setBorderRadius=function(borderRadius){
    this.set("borderRadius",borderRadius);
};
WBorderStyle.prototype.setBorderSpacing=function(borderSpacing){
    this.set("borderSpacing",borderSpacing);
};
WBorderStyle.prototype.setBorderStyle=function(borderStyle){
    this.set("borderStyle",borderStyle);
};

WBorderStyle.prototype.setBorderBottom=function(borderBottom){
    this.set("borderBottom",borderBottom);
};
WBorderStyle.prototype.setBorderBottomColor=function(borderBottomColor){
    this.set("borderBottomColor",borderBottomColor);
};
WBorderStyle.prototype.setBorderBottomLeftRadius=function(borderBottomLeftRadius){
    this.set("borderBottomLeftRadius",borderBottomLeftRadius);
};
WBorderStyle.prototype.setBorderBottomRightRadius=function(borderBottomRightRadius){
    this.set("borderBottomRightRadius",borderBottomRightRadius);
};
WBorderStyle.prototype.setBorderBottomStyle=function(borderBottomStyle){
    this.set("borderBottomStyle",borderBottomStyle);
};
WBorderStyle.prototype.setBorderBottomWidth=function(borderBottomWidth){
    this.set("borderBottomWidth",borderBottomWidth);
};	


WBorderStyle.prototype.setBorderTop=function(borderTop){
    this.set("borderTop",borderTop);
};
WBorderStyle.prototype.setBorderTopColor=function(borderTopColor){
    this.set("borderTopColor",borderTopColor);
};
WBorderStyle.prototype.setBorderTopLeftRadius=function(borderTopLeftRadius){
    this.set("borderTopLeftRadius",borderTopLeftRadius);
};
WBorderStyle.prototype.setBorderTopRightRadius=function(borderTopRightRadius){
    this.set("borderTopRightRadius",borderTopRightRadius);
};
WBorderStyle.prototype.setBorderTopStyle=function(borderTopStyle){
    this.set("borderTopStyle",borderTopStyle);
};
WBorderStyle.prototype.setBorderTopWidth=function(borderTopWidth){
    this.set("borderTopWidth",borderTopWidth);
};

WBorderStyle.prototype.setBorderLeft=function(borderLeft){
    this.set("borderLeft",borderLeft);
};
WBorderStyle.prototype.setBorderLeftColor=function(borderLeftColor){
    this.set("borderLeftColor",borderLeftColor);
};
WBorderStyle.prototype.setBorderLeftStyle=function(borderLeftStyle){
    this.set("borderLeftStyle",borderLeftStyle);
};
WBorderStyle.prototype.setBorderLeftWidth=function(borderLeftWidth){
    this.set("borderLeftWidth",borderLeftWidth);
};
 
WBorderStyle.prototype.setBorderRight=function(borderRight){
    this.set("borderRight",borderRight);
};
WBorderStyle.prototype.setBorderRightColor=function(borderRightColor){
    this.set("borderRightColor",borderRightColor);
};
WBorderStyle.prototype.setBorderRightStyle=function(borderRightStyle){
    this.set("borderRightStyle",borderRightStyle);
};
WBorderStyle.prototype.setBorderRightWidth=function(borderRightWidth){
    this.set("borderRightWidth",borderRightWidth);
};	
 

WBorderStyle.prototype.setBorderImage=function(borderImage){
    this.set("borderImage",borderImage);
};
WBorderStyle.prototype.setBorderImageOutset=function(borderImageOutset){
    this.set("borderImageOutset",borderImageOutset);
};
WBorderStyle.prototype.setBorderImageRepeat=function(borderImageRepeat){
    this.set("borderImageRepeat",borderImageRepeat);
};
WBorderStyle.prototype.setBorderImageSlice=function(borderImageSlice){
    this.set("borderImageSlice",borderImageSlice);
};
WBorderStyle.prototype.setBorderImageSource=function(borderImageSource){
    this.set("borderImageSource",borderImageSource);
};
WBorderStyle.prototype.setBorderImageWidth=function(borderImageWidth){
    this.set("borderImageWidth",borderImageWidth);
};

    

WFontStyle.FAMILY={INHERIT:"inherit",TIMES:"times",GEORGIA:"georgia",ARIAL:"arial",VERDANA:"verdana",COURIER:"courier",LUCIDA:"lucida",TIMES_NEW_ROMAN:"\"Times_New_Roman\""};
WFontStyle.GENERIC={SERIF:"serif",SANSERIF:"san-serif",MONOSPACE:"monospace"};
WFontStyle.SIZE={INHERIT:"inherit",XXSMALL:"xx-small",XSMALL:"x-small",SMALL:"small",MEDIUM:"medium",LARGE:"large",XLARGE:"x-large",XXLARGE:"xx-large",SMALLER:"smaller",LARGER:"larger"};
WFontStyle.STYLE={INHERIT:"inherit",NORMAL:"normal",ITALIC:"italic",OBLIQUE:"oblique"};
WFontStyle.VARIANT={INHERIT:"inherit",NORMAL:"normal",SMALL_CAPS:"small-caps"};
WFontStyle.WEIGHT={INHERIT:"inherit",NORMAL:"normal",BOLD:"bold",BOLDER:"bolder",LIGHTER:"lighter",100:"100",200:"200",300:"300",400:"400",500:"500",600:"600",700:"700",800:"800",900:"900"};
WFontStyle.STRETCH={INHERIT:"inherit",WIDER:"wider",NARROWER:"narrower",ULTRACONDENSED:"ultra-condensed",EXTRA_CONDENSED:"extra-condensed",CONDENSED:"condensed",SEMICONDENSED:"semi-condensed",NORMAL:"normal",SEMI_EXPANDED:"semi-expanded",EXPANDED:"expanded",EXTRAEXPANDED:"extra-expanded",ULTRAEXPANDED:"ultra-expanded"};

inheritPrototype(WFontStyle,WStyle);
function WFontStyle(){
    inherit(this,WStyle);
    this.w.style.fontFamily="inherit";
    //this.style.genericFamily=[];
    this.w.style.fontSize="inherit";
    this.w.style.fontStyle="inherit";
    this.w.style.fontVariant="inherit";
    this.w.style.fontWeight="inherit";

    this.w.style.fontSizeAdjust="inherit";
    this.w.style.fontStretch="inherit";
}
    
WFontStyle.prototype.setFontFamily=function(family){
    this.w.style.fontFamily=family;
};

WFontStyle.prototype.getFontFamily=function(){
    return this.w.style.fontFamily;
};

WFontStyle.prototype.setFontFamilyGeneric=function(family,genericFamily){
    this.w.style.fontFamily=family+","+genericFamily;
};

//WFontStyle.prototype.setGeneric=function(genericFamily){
//    this.style.genericFamily=genericFamily;
//};
//
//WFontStyle.prototype.getFamily=function(){
//    if(this.style.genericFamily==="") {
//        return this.style.family;
//    }else{
//        return this.style.family+","+this.style.genericFamily;
//    }
//};

WFontStyle.prototype.setFontSize=function(size){
    this.set("fontSize",size);
};

WFontStyle.prototype.getFontSize=function(){
    return this.w.style.size;
};

WFontStyle.prototype.setFontStyle=function(style){
    this.set("style",style);
};

WFontStyle.prototype.getFontStyle=function(){
    return this.w.style;
};

WFontStyle.prototype.setFontVariant=function(variant){
    this.set("variant",variant);
};

WFontStyle.prototype.getFontVariant=function(){
    return this.w.style.variant;
};

WFontStyle.prototype.setFontWeight=function(weight){
    this.set("weight",weight);
};

WFontStyle.prototype.getFontWeight=function(){
    return this.w.style.weight;
};

WFontStyle.prototype.setFontFace=function(face){
    this.set("face",face);
};

WFontStyle.prototype.getFontFace=function(){
    return this.w.style.face;
};

WFontStyle.prototype.setFontSizeAdjust=function(sizeAdjust){
    this.set("sizeAdjust",sizeAdjust);
};

WFontStyle.prototype.getSizeAdjust=function(){
    return this.w.style.sizeAdjust;
};

WFontStyle.prototype.setStretch=function(stretch){
    this.set("stretch",stretch);
};

WFontStyle.prototype.getStretch=function(){
    return this.w.style.stretch;
};      



inheritPrototype(WObjectStyle,WStyle);
function WObjectStyle(){
    inherit(this,WStyle);
};

WObjectStyle.prototype.setSizeAll=function(minWidth,minHeight,width,height,maxWidth,maxHeight){
    this.setMinSize(minWidth,minHeight);
    this.setSize(width,height);
    this.setMaxSize(maxWidth,maxHeight);                            
};

WObjectStyle.prototype.setWidth=function(width){
    if(typeof width === "number"){
        this.w.style.width=width+"px";
    }else{
        this.w.style.width=width;
    }
};

WObjectStyle.prototype.getWidth=function(){
    return this.w.style.width;
};

WObjectStyle.prototype.setHeight=function(height){
    if(typeof height === "number"){
        this.w.style.height=height+"px";
    }else{
        this.w.style.height=height;
    }
};

WObjectStyle.prototype.getHeight=function(){
    return this.w.style.height;
};

WObjectStyle.prototype.setMinWidth=function(minWidth){
    if(typeof minWidth === "number"){
        this.w.style.minWidth=minWidth+"px";
    }else{
        this.w.style.minWidth=minWidth;
    }
};

WObjectStyle.prototype.setMinHeight=function(minHeight){
    if(typeof minHeight === "number"){
        this.w.style.minHeight=minHeight+"px";
    }else{
        this.w.style.minHeight=minHeight;
    }
};

WObjectStyle.prototype.setMaxWidth=function(maxWidth){
    if(typeof maxWidth === "number"){
        this.w.style.maxWidth=maxWidth+"px";
    }else{
        this.w.style.maxWidth=maxWidth;
    }
};

WObjectStyle.prototype.setMaxHeight=function(maxHeight){
    if(typeof maxHeight === "number"){
        this.w.style.maxHeight=maxHeight+"px";
    }else{
        this.w.style.maxHeight=maxHeight;
    }
};

WObjectStyle.prototype.setSize=function(width,height){
    this.setWidth(width);
    this.setHeight(height);
};

WObjectStyle.prototype.setMinSize=function(minWidth,minHeight){
    this.setMinWidth(minWidth);
    this.setMinHeight(minHeight);
};

WObjectStyle.prototype.setMaxSize=function(maxWidth,maxHeight){
    this.setMaxWidth(maxWidth);
    this.setMaxHeight(maxHeight);
};

WObjectStyle.prototype.setTop=function(top){
    if(typeof top === "number"){
        this.w.style.top=top+"px";
    }else{
        this.w.style.top=top;
    }
};

WObjectStyle.prototype.setLeft=function(left){
    if(typeof left === "number"){
        this.w.style.left=left+"px";
    }else{
        this.w.style.left=left;
    }
};

WObjectStyle.prototype.setLocation=function(x,y){
    //this.x=x;
    //this.y=y;
    this.setTop(y);
    this.setLeft(x);
    //this.w.style.left=x+"px";
    //this.w.style.top=y+"px";
};

//WObjectStyle.prototype.getX=function(){
//    return this.x;
//};
//
//WObjectStyle.prototype.getY=function(){
//    return this.y;
//};

WObjectStyle.prototype.setBackgroundColor=function(color){
    if(typeof color === "string"){
        this.w.style.backgroundColor=color;  
    }else{
        this.w.style.backgroundColor=color.toString();  
    }
};

WObjectStyle.prototype.setForegroundColor=function(color){
    if(typeof color === "string"){
        this.w.style.color=color;  
    }else{
        this.w.style.color=color.toString();  
    }
};

WObjectStyle.prototype.setOpacity=function(opacity){
    if(typeof opacity === "string"){
        this.w.style.opacity=opacity;  
    }else{
        this.w.style.opacity=""+opacity;  
    }
};

WObjectStyle.prototype.setZIndex=function(zIndex){
    if(typeof opacity === "string"){
        this.w.style.zIndex=zIndex;  
    }else{
        this.w.style.zIndex=""+zIndex;  
    }
};

WObjectStyle.prototype.setBorder=function(border){//TODO: fix me
    border.applyTo(this);
};



function WTextEvents(){

}

WTextEvents.prototype.addChangeEventListener=function(listener){
    this.w.addEventListener("change",listener,false);
};

WTextEvents.prototype.addCopyEventListener=function(listener){
    this.w.addEventListener("copy",listener,false);
};

WTextEvents.prototype.addCutEventListener=function(listener){
    this.w.addEventListener("cut",listener,false);
};

WTextEvents.prototype.addPasteEventListener=function(listener){
    this.w.addEventListener("paste",listener,false);
};

WTextEvents.prototype.addSelectEventListener=function(listener){
    this.w.addEventListener("select",listener,false);
};

WTextEvents.prototype.addTextInputEventListener=function(listener){
    this.w.addEventListener("textinput",listener,false);
};



function WFocusEvents(){

}

WFocusEvents.prototype.addLoseFocusEventListener=function(listener){
    this.w.addEventListener("blur",listener,false);
};

WFocusEvents.prototype.addFocusEventListener=function(listener){
    this.w.addEventListener("focus",listener,false);
};

WFocusEvents.prototype.addFocusInEventListener=function(listener){
    this.w.addEventListener("focusin",listener,false);
};

WFocusEvents.prototype.addFocusOutEventListener=function(listener){
    this.w.addEventListener("focusout",listener,false);
};

WFocusEvents.prototype.removeLoseFocusEventListener=function(listener){
    this.w.removeEventListener("blur",listener,false);
};

WFocusEvents.prototype.removeFocusEventListener=function(listener){
    this.w.removeEventListener("focus",listener,false);
};

WFocusEvents.prototype.removeFocusInEventListener=function(listener){
    this.w.removeEventListener("focusin",listener,false);
};

WFocusEvents.prototype.removeFocusOutEventListener=function(listener){
    this.w.removeEventListener("focusout",listener,false);
};



function WWindowEvents(){

}

WWindowEvents.prototype.removeUnloadEventListener=function(listener){
    this.w.removeEventListener("unload",listener,false);
};

WWindowEvents.prototype.removeResizeEventListener=function(listener){
    this.w.removeEventListener("resize",listener,false);
};

WWindowEvents.prototype.addUnloadEventListener=function(listener){
    this.w.addEventListener("unload",listener,false);
};

WWindowEvents.prototype.addResizeEventListener=function(listener){
    this.w.addEventListener("resize",listener,false);
};


function WChangeEvents(){ 

}

WChangeEvents.prototype.addLoadEventListener=function(listener){
    this.w.addEventListener("load",listener,false);
};

WChangeEvents.prototype.addScrollEventListener=function(listener){
    this.w.addEventListener("scroll",listener,false);
};

WChangeEvents.prototype.addHashChangeEventListener=function(listener){
    this.w.addEventListener("hashchange",listener,false);
};

WChangeEvents.prototype.removeLoadEventListener=function(listener){
    this.w.removeEventListener("load",listener,false);
};

WChangeEvents.prototype.removeScrollEventListener=function(listener){
    this.w.removeEventListener("scroll",listener,false);
};

WChangeEvents.prototype.removeHashChangeEventListener=function(listener){
    this.w.removeEventListener("hashchange",listener,false);
};



function WFormEvents(){  

}

WFormEvents.prototype.addSubmitEventListener=function(listener){
    this.w.addEventListener("submit",listener,false);
};

WFormEvents.prototype.addResetEventListener=function(listener){
    this.w.addEventListener("reset",listener,false);
};

WFormEvents.prototype.removeSubmitEventListener=function(listener){
    this.w.addEventListener("submit",listener,false);
};

WFormEvents.prototype.removeResetEventListener=function(listener){
    this.w.addEventListener("reset",listener,false);
};



function WMouseEvents(){

}

WMouseEvents.prototype.addClickEventListener=function(listener){
    this.w.addEventListener("click",listener,false);
};

WMouseEvents.prototype.addDoubleClickEventListener=function(listener){
    this.w.addEventListener("dblclick",listener,false);
};

WMouseEvents.prototype.addMouseUpEventListener=function(listener){
    this.w.addEventListener("mouseup",listener,false);
};

WMouseEvents.prototype.addMouseDownEventListener=function(listener){
    this.w.addEventListener("mousedown",listener,false);
};

WMouseEvents.prototype.addMouseWheelEventListener=function(listener){
    this.w.addEventListener("mousewheel",listener,false);
};

WMouseEvents.prototype.addMouseMoveEventListener=function(listener){
    this.w.addEventListener("mousemove",listener,false);
};

WMouseEvents.prototype.addMouseOutEventListener=function(listener){
    this.w.addEventListener("mouseout",listener,false);
};

WMouseEvents.prototype.addMouseEnterEventListener=function(listener){
    this.w.addEventListener("mouseenter",listener,false);
};

WMouseEvents.prototype.addMouseLeaveEventListener=function(listener){
    this.w.addEventListener("mouseleave",listener,false);
};

WMouseEvents.prototype.addContextMenuEventListener=function(listener){
    this.w.addEventListener("contextmenu",listener,false);
};

WMouseEvents.prototype.removeClickEventListener=function(listener){
    this.w.removeEventListener("click",listener,false);
};

WMouseEvents.prototype.removeDoubleClickEventListener=function(listener){
    this.w.removeEventListener("dblclick",listener,false);
};

WMouseEvents.prototype.removeMouseUpEventListener=function(listener){
    this.w.removeEventListener("mouseup",listener,false);
};

WMouseEvents.prototype.removeMouseDownEventListener=function(listener){
    this.w.removeEventListener("mousedown",listener,false);
};

WMouseEvents.prototype.removeMouseWheelEventListener=function(listener){
    this.w.removeEventListener("mousewheel",listener,false);
};

WMouseEvents.prototype.removeMouseMoveEventListener=function(listener){
    this.w.removeEventListener("mousemove",listener,false);
};

WMouseEvents.prototype.removeMouseOutEventListener=function(listener){
    this.w.removeEventListener("mouseout",listener,false);
};

WMouseEvents.prototype.removeMouseEnterEventListener=function(listener){
    this.w.removeEventListener("mouseenter",listener,false);
};

WMouseEvents.prototype.removeMouseLeaveEventListener=function(listener){
    this.w.removeEventListener("mouseleave",listener,false);
};

WMouseEvents.prototype.removeContextMenuEventListener=function(listener){
    this.w.removeEventListener("contextmenu",listener,false);
};



function WKeyEvents(){

}

WKeyEvents.prototype.addKeyDownEventListener=function(listener){
    this.w.addEventListener("keydown",listener,false);
};

WKeyEvents.prototype.addKeyUpEventListener=function(listener){
    this.w.addEventListener("keyup",listener,false);
};

WKeyEvents.prototype.addKeyPressEventListener=function(listener){
    this.w.addEventListener("keypress",listener,false);
};


inheritPrototype(WDesktop,WNode);
inheritPrototype(WDesktop,WMouseEvents);
function WDesktop(containerID){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    this.w=document.createElement("div");
    this.w.setAttribute("class","WDesktop");
    this.w.style.position="relative";//should be relative???
    this.w.style.left="0px";
    this.w.style.top="0px";
    this.w.style.width="100%";
    this.w.style.height="100%";
    this.w.style.overflow="hidden";
    //this.w.style.backgroundColor="lightblue"; // add background color to entire area --JB 
    this.w.style.border='2px solid rgb(80, 80, 80)';
    this.w.style.borderRadius='5px';
    this.w.id=containerID+"_desktop";
    
    if(containerID===null){//TODO: maybe this should be undefined
        document.body.appendChild(this.w);
    }else{
        var container=document.getElementById(containerID);
        if(container===null){
            document.body.appendChild(this.w);
        }else{
            container.appendChild(this.w);
        }
    }

    this.toBack();
}

WDesktop.prototype.setBackgroundColor=function(color){
    this.w.style["background-color"]=color;  
};

WDesktop.prototype.setForegroundColor=function(color){
    this.w.style.color=color;  
};

WDesktop.prototype.setScrollable=function(scrollable){
    if(scrollable){
        this.w.style.position="fixed";
    }else{
        this.w.style.position="absolute";
    }
};



WColor.RED="rgba(256,0,0,1)";
WColor.GREEN="rgba(0,256,0,1)";
WColor.BLUE="rgba(0,0,256,1)";
WColor.BLACK="rgba(0,0,0,1)";
WColor.WHITE="rgba(256,256,256,1)";
WColor.INHERIT="inherit";

function WColor(red,green,blue,alpha){
    this.red=red;
    this.green=green;
    this.blue=blue;
    if(alpha===undefined)alpha=1;
    this.alpha=alpha;
}

WColor.prototype.toString=function(){
    return "rgba("+this.red+","+this.green+","+this.blue+","+this.alpha+")";
};


inheritPrototype(WImage,WNode);
inheritPrototype(WImage,WObjectStyle);
inheritPrototype(WImage,WFocusEvents);
inheritPrototype(WImage,WMouseEvents);
function WImage(imageURL,width,height){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
 
    this.w=document.createElement("img");
    this.w.setAttribute("class","WImage");
    this.w.style.position="relative";
    this.w.src=imageURL;
    this.setWidth(width);
    this.setHeight(height);
}


inheritPrototype(WPanel,WNode);
inheritPrototype(WPanel,WMouseEvents);
inheritPrototype(WPanel,WObjectStyle);
function WPanel(){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WObjectStyle);

    this.w=document.createElement("div");
    this.w.setAttribute("class","WPanel");
    this.w.style.position="relative";
    this.w.style.overflow="hidden";
};

WPanel.prototype.setAlignment=function(alignment){
    this.w.align=alignment;
};

WPanel.prototype.makeResizable=function(){
    var THIS=this;
    var resizeTab=new WCanvas(10,10);
    resizeTab.w.width="10";
    resizeTab.w.height="10";
    
    resizeTab.w.style.right="0px";
    resizeTab.w.style.bottom="0px";
    resizeTab.w.style.position="absolute";
    
    resizeTab.context.strokeStyle = "#AAAAAA";
    resizeTab.context.lineWidth=1;
    resizeTab.context.moveTo(1,9);
    resizeTab.context.lineTo(9,1);
    resizeTab.context.stroke();
    
    resizeTab.context.moveTo(4,9);
    resizeTab.context.lineTo(9,4);
    resizeTab.context.stroke();
    
    resizeTab.context.moveTo(7,9);
    resizeTab.context.lineTo(9,7);
    resizeTab.context.stroke();
    
    THIS.mousedown=false;
    resizeTab.w.addEventListener("mousedown",function(event){
        event.preventDefault();
        THIS.mouseX=event.x;
        THIS.mouseY=event.y;
        THIS.width=parseInt(THIS.w.style.width.match(/\d+/)[0]);
        THIS.height=parseInt(THIS.w.style.height.match(/\d+/)[0]);
        THIS.mousedown=true;
    }, false);
    
    window.addEventListener("mousemove", function(event){
        if(!THIS.mousedown)return;
        event.preventDefault();
        var deltaX=event.x-THIS.mouseX;
        var deltaY=event.y-THIS.mouseY;
        var newWidth=THIS.width+deltaX;
        var newHeight=THIS.height+deltaY;
        if(newWidth<0)newWidth=0;
        if(newHeight<0)newHieght=0;
        
        THIS.w.style.width=newWidth+"px";
        THIS.w.style.height=newHeight+"px";
    }, false);
    
    window.addEventListener("mouseup", function(event){
        THIS.mousedown=false;
    }, false);
    
    this.add(resizeTab);
};


function WIframe(source){
    inherit(this,WPanel,WNode);
    inherit(this,WPanel,WMouseEvents);
    inherit(this,WPanel,WObjectStyle);
   
    this.w=document.createElement("iframe");
    this.w.setAttribute("class","WIframe");
    this.w.style.position="relative";
    this.w.style.overflow="hidden";
    this.w.src=source;
};
inheritPrototype(WImage,WNode);
inheritPrototype(WImage,WObjectStyle);
inheritPrototype(WImage,WFocusEvents);
inheritPrototype(WImage,WMouseEvents);
function WImage(imageURL,width,height){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
 
    this.w=document.createElement("img");
    this.w.setAttribute("class","WImage");
    this.w.style.position="relative";
    this.w.src=imageURL;
    this.setWidth(width);
    this.setHeight(height);
}



function WBreak(){
    this.w=document.createElement("br");
};



WLink.TARGET={
    BLANK:"_blank",
    SELF:"_self",
    PARENT:"_parent",
    TOP:"_top"
};

function WLink(link,text){
    inherit(this,WLink,WNode);
    inherit(this,WLink,WObjectStyle);

    this.w=document.createElement("a");
    this.w.setAttribute("class","WLink");
    this.w.href=link;
    this.add(new WTextNode(text));
}

WLink.prototype.setTarget=function(target){
    this.w.target=target;
};



inheritPrototype(WGraphicsPanel,WNode);
inheritPrototype(WGraphicsPanel,WMouseEvents);
inheritPrototype(WGraphicsPanel,WObjectStyle);
function WGraphicsPanel(){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WObjectStyle);
    
    if (!window.svgns) {
       window.svgns = "http://www.w3.org/2000/svg";
     }
   
    this.w=document.createElementNS(window.svgns,"svg");

    //this.w.style.position="relative";
    //this.w.style.overflow="hidden";
};

WGraphicsPanel.prototype.setSVGWidth=function(width){
    this.w.setAttributeNS(null,"width",width); 
};

WGraphicsPanel.prototype.setSVGHeight=function(height){
    this.w.setAttributeNS(null,"height",height); 
};

WGraphicsPanel.prototype.linearGradient=function(id,x1,y1,x2,y2){
    var gradient=document.createElementNS(window.svgns,"linearGradient");

    gradient.setAttributeNS(null,"id",id);
    gradient.setAttributeNS(null,"x1",x1);
    gradient.setAttributeNS(null,"y1",y1);
    gradient.setAttributeNS(null,"x2",x2);
    gradient.setAttributeNS(null,"y2",y2);

    this.w.appendChild(gradient);
    
    gradient.addStop=function(offset,stopColor,stopOpacity){
        var stop=document.createElementNS(window.svgns,"stop");

        stop.setAttributeNS(null,"offset",offset);
        stop.style.stopColor=stopColor;
        stop.style.stopOpacity=stopOpacity;

        gradient.appendChild(stop);
        return stop;
    };
    
    return gradient;
};

WGraphicsPanel.prototype.addStop=function(gradient,offset,stopColor,stopOpacity){
    var stop=document.createElementNS(window.svgns,"stop");

    stop.setAttributeNS(null,"offset",offset);
    stop.style.stopColor=stopColor;
    stop.style.stopOpacity=stopOpacity;
    
    gradient.appendChild(stop);
    return stop;
};

WGraphicsPanel.prototype.addRectangle=function(width,height,fill){
    var rect=document.createElementNS(window.svgns,"rect");
    
    rect.setAttributeNS(null,"width",width);
    rect.setAttributeNS(null,"height",height);
    rect.setAttributeNS(null,"fill",fill);
    
    this.w.appendChild(rect);
    
    return rect;
};

WGraphicsPanel.prototype.addText=function(x,y,string){
    var text=document.createElementNS(window.svgns,"text");
    text.setAttributeNS(null,"x",x);
    text.setAttributeNS(null,"y",y);
    var textNode=document.createTextNode(string);
    text.appendChild(textNode);
    this.w.appendChild(text);
    return [text,textNode];
};

WGraphicsPanel.prototype.addPolyline=function(pointList){
    var polyline=document.createElementNS(window.svgns,"polyline");
    
    polyline.alterPoint=function(index,point){
        this.pointList[index]=point;
        this.applyPointList();
    };
    polyline.applyPointList=function(){
        var pointString="";
        for(var pointIndex=0;pointIndex<pointList.length;pointIndex++){
            pointString+=this.pointList[pointIndex][0]+","+this.pointList[pointIndex][1]+" ";
        };
        this.setAttributeNS(null,"points", pointString);
    };
    
    polyline.pointList=pointList;
    polyline.applyPointList();
    this.w.appendChild(polyline);
    return polyline;
};

inheritPrototype(WVerticalBox,WPanel);
function WVerticalBox() {
    inherit(this,WPanel);
    this.w.style.display="flex";
    this.w.style.flexDirection="column";
    this.w.setAttribute("class","WVerticalBox");
}

WVerticalBox.prototype.add = function(node) {
    //node.w.style.display = "block";
    this.w.appendChild(node.w);
};

inheritPrototype(WHorizontalBox,WPanel);
function WHorizontalBox(){
    inherit(this,WPanel);
    //this.w.style.display="inline-flex";
    this.w.style.display="flex";
    this.w.style.flexDirection="row";
    this.w.setAttribute("class","WHorizontalBox");
}

WHorizontalBox.prototype.add=function(node){
    this.w.appendChild(node.w);
};


inheritPrototype(WOverlay,WNode);
inheritPrototype(WOverlay,WObjectStyle);
inheritPrototype(WOverlay,WBorderStyle);
inheritPrototype(WOverlay,WFocusEvents);
inheritPrototype(WOverlay,WMouseEvents);
function WOverlay(locationX,locationY,width,height){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WBorderStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    
    this.w=document.createElement("div");
    this.w.style.position="absolute";
    this.w.style.overflow="hidden";
    
    
    this.setOpacity("1.0");
    this.setLocation(locationX,locationY);
    this.setZIndex("1000000");
    this.setBackgroundColor("#cccccc");
    this.setBorderWidth("1px");
    this.setBorderRadius("6px");
    this.setBorderColor(WColor.BLACK);
    this.setBorderStyle(WBorderStyle.SOLID);
    this.setSize(width,height);
    
}

WOverlay.prototype.makeResizable=function(){
    var THIS=this;
    var resizeTab=new WCanvas(10,10);
    resizeTab.w.width="10";
    resizeTab.w.height="10";
    
    resizeTab.w.style.right="0px";
    resizeTab.w.style.bottom="0px";
    resizeTab.w.style.position="absolute";
    
    resizeTab.context.strokeStyle = "#AAAAAA";
    resizeTab.context.lineWidth=1;
    resizeTab.context.moveTo(1,9);
    resizeTab.context.lineTo(9,1);
    resizeTab.context.stroke();
    
    resizeTab.context.moveTo(4,9);
    resizeTab.context.lineTo(9,4);
    resizeTab.context.stroke();
    
    resizeTab.context.moveTo(7,9);
    resizeTab.context.lineTo(9,7);
    resizeTab.context.stroke();
    
    THIS.mousedown=false;
    resizeTab.w.addEventListener("mousedown",function(event){
        event.preventDefault();
        THIS.mouseX=event.x;
        THIS.mouseY=event.y;
        THIS.width=parseInt(THIS.w.style.width.match(/\d+/)[0]);
        THIS.height=parseInt(THIS.w.style.height.match(/\d+/)[0]);
        THIS.mousedown=true;
    }, false);
    
    window.addEventListener("mousemove", function(event){
        if(!THIS.mousedown)return;
        event.preventDefault();
        var deltaX=event.x-THIS.mouseX;
        var deltaY=event.y-THIS.mouseY;
        var newWidth=THIS.width+deltaX;
        var newHeight=THIS.height+deltaY;
        if(newWidth<0)newWidth=0;
        if(newHeight<0)newHieght=0;
        
        THIS.w.style.width=newWidth+"px";
        THIS.w.style.height=newHeight+"px";
    }, false);
    
    window.addEventListener("mouseup", function(event){
        THIS.mousedown=false;
    }, false);
    
    this.add(resizeTab);
};


inheritPrototype(WCanvas,WNode);
inheritPrototype(WCanvas,WObjectStyle);
inheritPrototype(WCanvas,WFocusEvents);
inheritPrototype(WCanvas,WMouseEvents);
function WCanvas(width,height){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
 
    this.w=document.createElement("canvas");
    this.w.setAttribute("class","WCanvas");
    this.w.style.position="relative";
    this.setWidth(width);
    this.setHeight(height);
    this.w.style.color="rgb(0,0,200)";
    this.context=this.w.getContext("2d");
};

WCanvas.prototype.drawImage=function(wimage,xLocation,yLocation){
    this.context.drawImage(wimage.w,xLocation,yLocation);
};

WCanvas.prototype.getImageData=function(xLocation,yLocation,xSize,ySize){
    return this.context.getImageData(xLocation,yLocation,xSize,ySize);
};

WCanvas.prototype.putImageData=function(imageData,xLocation,yLocation){
    return this.context.putImageData(imageData,xLocation,yLocation);
};inheritPrototype(WStrut,WPanel);
function WStrut(width,height,minWidth,minHeight,maxWidth,maxHeight){
    inherit(this,WPanel);
    this.w.setAttribute("class","WStrut");

    if(width!==undefined){
        if(typeof width === "number"){
            this.w.style.width=width+"px";
        }else{
            this.w.style.width=width;
        }
    }
    if(height!==undefined){
        if(typeof height === "number"){
            this.w.style.height=height+"px";
        }else{
            this.w.style.height=height;
        }
    }
    if(minWidth!==undefined){
        if(typeof minWidth === "number"){
            this.w.style.minWidth=minWidth+"px";
        }else{
            this.w.style.minWidth=minWidth;
        }
    }
    if(minHeight!==undefined){
        if(typeof minHeight === "number"){
            this.w.style.minHeight=minHeight+"px";
        }else{
            this.w.style.minHeight=minHeight;
        }
    }
    if(maxWidth!==undefined){
        if(typeof maxWidth === "number"){
            this.w.style.maxWidth=maxWidth+"px";
        }else{
            this.w.style.maxWidth=maxWidth;
        }
    }
    if(maxHeight!==undefined){
        if(typeof maxHeight === "number"){
            this.w.style.maxHeight=maxHeight+"px";
        }else{
            this.w.style.maxHeight=maxHeight;
        }
    }
//    this.setHeight(height);
//    this.setWidth(width);
}


inheritPrototype(WLabel,WNode);
inheritPrototype(WLabel,WObjectStyle);
inheritPrototype(WLabel,WFontStyle);
inheritPrototype(WLabel,WFocusEvents);
inheritPrototype(WLabel,WMouseEvents);
inheritPrototype(WLabel,WTextEvents);
function WLabel(string){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFontStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    inherit(this,WTextEvents);

    this.w=document.createElement("div");
    this.w.setAttribute("class","WLabel");
    this.w.style.position="relative";
    
    //this.setBorder(WBorder.createBorder(WBorder.NONE,0,WColor.INHERIT));
    //this.setBackgroundColor(WColor.INHERIT);
    
    this.setText(string);
}

WLabel.prototype.setText=function(string){
    this.removeAllChildren();
    var stringNode=document.createTextNode(string);
    this.w.appendChild(stringNode);
};

//WLabel.prototype.setFont=function(font){
//    this.w.style["font-family"]=font.getFamily();
//    this.w.style["font-size"]=font.getSize();
//    this.w.style["font-style"]=font.getStyle();
//    this.w.style["font-variant"]=font.getVariant();
//    this.w.style["font-weight"]=font.getWeight();
//    this.w.style["font-face"]=font.getFace();
//    this.w.style["font-size-adjust"]=font.getSizeAdjust();
//    this.w.style["font-stretch"]=font.getStretch();
//};



inheritPrototype(WTextArea,WNode);
inheritPrototype(WTextArea,WMouseEvents);
inheritPrototype(WTextArea,WKeyEvents);
inheritPrototype(WTextArea,WTextEvents);
inheritPrototype(WTextArea,WObjectStyle);
function WTextArea(){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WKeyEvents);
    inherit(this,WTextEvents);
    inherit(this,WObjectStyle);

    this.w=document.createElement("textarea");
    this.w.style.position="absolute";
    this.w.setAttribute("class","WTextArea");
}

WTextArea.prototype.setText=function(string){
    this.w.value=string;
};

WTextArea.prototype.removeAllChildren=function(){
    while(this.w.hasChildNodes()){
        this.w.removeChild(this.w.firstChild);
    }
};

WTextArea.prototype.getText=function(){
    return this.w.value;
};

WTextArea.prototype.setReadOnly=function(readOnly){
    this.w.readOnly=readOnly;
};

inheritPrototype(WButton,WNode);
inheritPrototype(WButton,WObjectStyle);
inheritPrototype(WButton,WFocusEvents);
inheritPrototype(WButton,WMouseEvents);
function WButton(string){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    
    //this.active=false;

    this.w=document.createElement("button");
    this.w.type="button";
    this.w.style.margin="0";
    //this.w.style.position="relative";
    //this.w.style.position="absolute";
    //this.w.style.display="block";
    
    this.setText(string);
    this.setBackgroundColor(new WColor(200,200,200));
    //this.w.style["border-color"]=new WColor(00,00,150);
    //this.setForegroundColor(new WColor(0,0,200));
    //this.setBorder(WBorder.createBorder(WBorder.OUTSET,2));
    //this.setBackgroundColor("buttonface");
    //this.setForegroundColor("buttontext");
}

WButton.prototype.setText=function(string){
    this.removeAllChildren();
    var text=new WTextNode(string);
    this.add(text);
};



WButton.prototype.setFont=function(font){
    this.w.style["font-family"]=font.getFontFamily();
    this.w.style["font-size"]=font.getFontSize();
    this.w.style["font-style"]=font.getFontStyle();
    this.w.style["font-variant"]=font.getFontVariant();
    this.w.style["font-weight"]=font.getFontWeight();
    this.w.style["font-size-adjust"]=font.getFontSizeAdjust();
    this.w.style["font-stretch"]=font.getFontStretch();
};



function WSlider(value,min,max,steps){
    inherit(this,WSlider,WNode);
    inherit(this,WSlider,WObjectStyle);
    inherit(this,WSlider,WFocusEvents);
    inherit(this,WSlider,WMouseEvents);
 
    this.selected=false;
 
    this.w=document.createElement("input");
    this.w.setAttribute("class","WSlider");
 
    this.w.type="range";
    this.w.style.margin="0";
    this.w.style.position="relative";
    
    this.w.value=value;
    this.w.min=min;
    this.w.max=max;
    this.w.steps=steps;
}

WSlider.prototype.setValue=function(value){
    this.w.value=value;
};

WSlider.prototype.getValue=function(){
    return this.w.value;
};

WSlider.prototype.setMin=function(min){
    this.w.min=min;
};

WSlider.prototype.setMax=function(max){
    this.w.max=max;
};

WSlider.prototype.setSteps=function(steps){
    this.w.steps=steps;
};
inheritPrototype(WSelectList,WNode);
inheritPrototype(WSelectList,WObjectStyle);
inheritPrototype(WSelectList,WFocusEvents);
inheritPrototype(WSelectList,WMouseEvents);
inheritPrototype(WSelectList,WTextEvents);
function WSelectList(size){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    inherit(this,WTextEvents);
    
    this.groupList=[];
    //this.active=false;

    this.w=document.createElement("select");
    this.w.setAttribute("class","WSelectList");
    if(size!==null){
        this.w.size=size;
    }
    this.w.multiple=true;
};

WSelectList.prototype.setMultiple=function(boolean){
    this.w.multiple=boolean;
};

WSelectList.prototype.addGroup=function(groupName){
    var optionGroup=new WOptionGroup(groupName);

    this.groupList.push(optionGroup);

    this.add(optionGroup);
    return optionGroup;
};

WSelectList.prototype.addGroupSorted=function(groupName){
    var optionGroup=new WOptionGroup(groupName);

    this.groupList.push(optionGroup);

    var inserted=false;
    for(var index=0;index<this.w.children.length;index++){
        if(optionGroup.w.label.toLowerCase()<this.w.children[index].label.toLowerCase()){
            this.w.insertBefore(optionGroup.w, this.w.children[index]); 
            inserted=true;
            break;
        }
    }
    if(!inserted){
        this.add(optionGroup);
    }
    return optionGroup;
};

WSelectList.prototype.getGroup=function(groupName){
    for(var groupIndex=0;groupIndex<this.groupList.length;groupIndex++){
        if(this.groupList[groupIndex].w.label===groupName){
            return this.groupList[groupIndex];
        }
    }
    return null;
};

WSelectList.prototype.addOptionToGroup=function(groupName,text,selected){
   
    var group=this.getGroup(groupName);
    if(group===null){
        group=this.addGroup(groupName);
    }
    
    var option=new WOption(text);
    
    if(selected!==null){
        option.setSelected(selected);
    }
    
    group.add(option);
    return option;
};

WSelectList.prototype.addOptionToGroupSorted=function(groupName,text,selected){
   
    var group=this.getGroup(groupName);
    if(group===null){
        group=this.addGroupSorted(groupName);
//        group=this.addGroup(groupName);
    }
    
    var option=new WOption(text);
    if(selected!==null){
        option.setSelected(selected);
    }
    
    var inserted=false;
    for(var index=0;index<group.w.children.length;index++){
        if(option.w.value.toLowerCase()<group.w.children[index].value.toLowerCase()){
            group.w.insertBefore(option.w, group.w.children[index]); 
            inserted=true;
            break;
        }
    }
    if(!inserted){
        group.add(option);
    }
    
    return option;
};

WSelectList.prototype.addOption=function(text,selected){
    var option=new WOption(text);
    
    if(selected!==null){
        option.setSelected(selected);
    }
    
    this.add(option);
    return option;
};

WSelectList.prototype.addOptionSorted=function(text,selected){

    var option=new WOption(text);
    if(selected!==null){
        option.setSelected(selected);
    }

    var inserted=false;
    for(var index=0;index<this.w.children.length;index++){
        if(option.w.value.toLowerCase()<this.w.children[index].label.toLowerCase()){
            this.w.insertBefore(option.w, this.w.children[index]); 
            inserted=true;
            break;
        }
    }
    if(!inserted){
        this.add(option);
    }
    
    return option;
};

WSelectList.prototype.getSelectedList=function(){
    var list=new Array();
    
    for(var index=0;index<this.w.childNodes.length;index++){
        if(this.w.childNodes.item(index).selected){
            list.push(this.w.childNodes.item(index).value);
        }
    }
    
    return list;
};

inheritPrototype(WRadioButton,WNode);
inheritPrototype(WRadioButton,WObjectStyle);
inheritPrototype(WRadioButton,WFocusEvents);
inheritPrototype(WRadioButton,WMouseEvents);
function WRadioButton(string){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
 
    this.selected=false;
 
    this.w=document.createElement("div");
    this.w.setAttribute("class","WRadioButton");
    this.button=document.createElement("input");
    this.button.type="radio";
   
    this.setText(string);
    
    var THIS=this;
    var listener=function(event){
        if(THIS.selected){
            THIS.selected=false;
            THIS.button.checked=false;
        }else{
            THIS.selected=true;
            THIS.button.checked=true;
        }
    };
    
    this.addClickEventListener(listener);
}

WRadioButton.prototype.addClickEventListener=function(listener){
    this.button.addEventListener("click",listener,false);
};

WRadioButton.prototype.setSelected=function(selected){
    this.selected=selected;
    this.button.checked=selected;
};

WRadioButton.prototype.getSelected=function(){
    return this.button.checked;
};

WRadioButton.prototype.setText=function(string){
    this.removeAllChildren();
    var stringNode=document.createTextNode(string);
    this.w.appendChild(this.button);
    this.w.appendChild(stringNode);
};


inheritPrototype(WCheckbox,WNode);
inheritPrototype(WCheckbox,WObjectStyle);
inheritPrototype(WCheckbox,WFocusEvents);
inheritPrototype(WCheckbox,WMouseEvents);
function WCheckbox(string){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
 
    this.selected=false;
 
    this.w=document.createElement("div");
    this.w.setAttribute("class","WCheckbox");
    this.button=document.createElement("input");
    this.button.type="checkbox";
   
    this.setText(string);
    
    var THIS=this;
    var listener=function(event){
        if(THIS.selected){
            THIS.selected=false;
            THIS.button.checked=false;
        }else{
            THIS.selected=true;
            THIS.button.checked=true;
        }
    };
    
    this.addClickEventListener(listener);
}

WCheckbox.prototype.addClickEventListener=function(listener){
    this.button.addEventListener("click",listener,false);
};

WCheckbox.prototype.setSelected=function(selected){
    this.selected=selected;
    this.button.checked=selected;
};

WCheckbox.prototype.isSelected=function(){
    return this.button.checked;
};

WCheckbox.prototype.setText=function(string){
    this.removeAllChildren();
    var stringNode=document.createTextNode(string);
    this.w.appendChild(this.button);
    this.w.appendChild(stringNode);
};


inheritPrototype(WOption,WNode);
inheritPrototype(WOption,WObjectStyle);
function WOption(value,label){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
   
    this.w=document.createElement("option");
    this.w.value=value;
    
    var labelNode;
    if(label){
        labelNode=document.createTextNode(label);
    }else{
        labelNode=document.createTextNode(value);
    }
    this.w.appendChild(labelNode);

};

WOption.prototype.setSelected=function(selected){
    this.w.selected=selected;
};

inheritPrototype(WOptionGroup,WNode);
function WOptionGroup(string){
    inherit(this,WNode);
   
    this.w=document.createElement("optgroup");
    this.w.label=string;
    
    

};


function WTable(){
    inherit(this,WTable,WNode);
    inherit(this,WTable,WObjectStyle);
   
    this.w=document.createElement("table");
    this.w.setAttribute("class","WTable");
};

WTable.prototype.sortable=function(sortable){
    this.w.sortable=sortable;
};
function WTableBody(){
    inherit(this,WTableBody,WNode);
    inherit(this,WTableBody,WObjectStyle);
   
    this.w=document.createElement("tbody");
    this.w.setAttribute("class","WTableBody");
};

function WTableFoot(){
    inherit(this,WTableFoot,WNode);
    inherit(this,WTableFoot,WObjectStyle);
   
    this.w=document.createElement("tfoot");
    this.w.setAttribute("class","WTableFoot");
};



function WTableHead(){
    inherit(this,WTableHead,WNode);
    inherit(this,WTableHead,WObjectStyle);
   
    this.w=document.createElement("thead");
    this.w.setAttribute("class","WTableHead");
};


WTableHeadElement.SCOPE=["col","colgroup","row","rowgroup"];
WTableHeadElement.SORTED=["reversed"];

function WTableHeadElement(){
    inherit(this,WTableHeadElement,WNode);
    inherit(this,WTableHeadElement,WObjectStyle);
   
    this.w=document.createElement("th");
    this.w.setAttribute("class","WTableHeadElement");
};

WTableHeadElement.prototype.setColumnSpan=function(span){
    this.w.colspan=span;
};

WTableHeadElement.prototype.setRowSpan=function(span){
    this.w.rowspan=span;
};

function WTableRow(){
    inherit(this,WTableRow,WNode);
    inherit(this,WTableRow,WObjectStyle);

    this.w=document.createElement("tr");
    this.w.setAttribute("class","WTableRow");
};
function WTableRowElement(){
    inherit(this,WTableRowElement,WNode);
    inherit(this,WTableRowElement,WObjectStyle);
   
    this.w=document.createElement("td");
    this.w.setAttribute("class","WTableRowElement");
};

WTableHeadElement.prototype.setColumnSpan=function(span){
    this.w.colspan=span;
};

WTableHeadElement.prototype.setRowSpan=function(span){
    this.w.rowspan=span;
};


WTabButton.Type={ABOVE:1,BELOW:2,LEFT:3,RIGHT:4};

inheritPrototype(WTabButton,WNode);
inheritPrototype(WTabButton,WObjectStyle);
inheritPrototype(WTabButton,WFocusEvents);
inheritPrototype(WTabButton,WMouseEvents);
inheritPrototype(WTabButton,WKeyEvents);
inheritPrototype(WTabButton,WTextEvents);
function WTabButton(string,type){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    inherit(this,WKeyEvents);
    inherit(this,WTextEvents);
    
    
    this.selected=false;

    this.w=document.createElement("button");
    this.w.setAttribute("class","WTabButton");
    this.w.type="button";
    this.w.style.margin="0";
    this.w.style.position="relative";
    this.w.style.outline="none";
    
    
    this.downBorder=new WBorderStyle();
    this.downBorder.set("borderColor",WColor.BLACK);
    this.downBorder.set("borderTop",WBorderStyle.SOLID);
    this.downBorder.set("borderTopWidth","1px");
    this.downBorder.set("borderLeft",WBorderStyle.SOLID);
    this.downBorder.set("borderLeftWidth","1px");
    this.downBorder.set("borderRight",WBorderStyle.SOLID);
    this.downBorder.set("borderRightWidth","1px");
    this.downBorder.set("borderBottom",WBorderStyle.SOLID);
    this.downBorder.set("borderBottomWidth","1px");
    
    this.upBorder=new WBorderStyle();
    this.upBorder.set("borderColor",WColor.BLACK);
    this.upBorder.set("borderTop",WBorderStyle.SOLID);
    this.upBorder.set("borderTopWidth","1px");
    this.upBorder.set("borderLeft",WBorderStyle.SOLID);
    this.upBorder.set("borderLeftWidth","1px");
    this.upBorder.set("borderRight",WBorderStyle.SOLID);
    this.upBorder.set("borderRightWidth","1px");
    this.upBorder.set("borderBottom",WBorderStyle.SOLID);
    this.upBorder.set("borderBottomWidth","1px");
    
    
    if(type==WTabButton.Type.ABOVE  || type==null){
        this.downBorder.set("borderTopLeftRadius","5px");
        this.downBorder.set("borderTopRightRadius","5px");
        this.upBorder.set("borderBottom","none");
        this.upBorder.set("borderTopLeftRadius","5px");
        this.upBorder.set("borderTopRightRadius","5px");
    }else if(type==WTabButton.Type.BELOW){
        this.downBorder.set("borderBottomLeftRadius","5px");
        this.downBorder.set("borderBottomRightRadius","5px");
        this.upBorder.set("borderTop","none");
        this.upBorder.set("borderBottomLeftRadius","5px");
        this.upBorder.set("borderBottomRightRadius","5px");
    }else if(type==WTabButton.Type.LEFT){
        this.downBorder.set("borderTopLeftRadius","5px");
        this.downBorder.set("borderBottomLeftRadius","5px");
        this.upBorder.set("borderRight","none");
        this.upBorder.set("borderTopLeftRadius","5px");
        this.upBorder.set("borderBottomLeftRadius","5px");
    }else if(type==WTabButton.Type.RIGHT){
        this.downBorder.set("borderTopRightRadius","5px");
        this.downBorder.set("borderBottomRightRadius","5px");
        this.upBorder.set("borderLeft","none");
        this.upBorder.set("borderTopRightRadius","5px");
        this.upBorder.set("borderTopRightRadius","5px");
    }

    this.setText(string);
    this.setBorder(this.upBorder);
    this.setBackgroundColor(new WColor(200,200,200));

    var thisThing=this;

    this.addMouseDownEventListener(function(event){
        if(thisThing.selected){
            thisThing.setSelected(false);
        }else{
            thisThing.setSelected(true);
        }
    });
}

WTabButton.prototype.setText=function(string){
    this.removeAllChildren();
    var stringNode=document.createTextNode(string);
    this.w.appendChild(stringNode);
};

WTabButton.prototype.setFont=function(font){
    this.w.style["font-family"]=font.getFamily();
    this.w.style["font-size"]=font.getSize();
    this.w.style["font-style"]=font.getStyle();
    this.w.style["font-variant"]=font.getVariant();
    this.w.style["font-weight"]=font.getWeight();
    this.w.style["font-face"]=font.getFace();
    this.w.style["font-size-adjust"]=font.getSizeAdjust();
    this.w.style["font-stretch"]=font.getStretch();
};

WTabButton.prototype.updateBorder=function(){
    if(this.selected){
        this.upBorder.applyTo(this);
        this.w.style.backgroundColor="rgb(255,255,255)";
    }else{
        this.downBorder.applyTo(this);
        this.w.style.backgroundColor="rgb(200,200,218)";
    }
};

WTabButton.prototype.setSelected=function(selected){
    this.selected=selected; 
    this.updateBorder();    
};

WTabButton.prototype.isSelected=function(){
    return this.selected;
};



WTabbedPanel.TYPE={ABOVE:1,BELOW:2,LEFT:3,RIGHT:4};//matches WWabButton type

inheritPrototype(WTabbedPanel,WPanel);
function WTabbedPanel(contentPanelWidth,contentPanelHeight,type){
    inherit(this,WPanel);
    //this.THIS=this;
    this.w.setAttribute("class","WTabbedPanel");
    this.type=type;
    this.buttonWidth=80;
    if(buttonHeight != undefined){
        this.buttonHeight=buttonHeight;
    }else{
        this.buttonHeight=20;
    }
    
    this.width=contentPanelWidth;
    this.height=contentPanelHeight;
    
    if(this.type===WTabbedPanel.TYPE.LEFT || this.type===WTabbedPanel.TYPE.RIGHT){
//        this.topPanel=new WHorizontalBox();
        this.buttonPanel=new WVerticalBox();
        this.buttonPanel.setWidth(85);
//        this.topPanel.setHeight(this.height+2);
//        this.topPanel.setWidth(this.width+2+this.buttonWidth);
        this.setHeight(this.height+2);
        this.setWidth(this.width+2+this.buttonWidth);
    }else{
//        this.topPanel=new WVerticalBox();
        this.buttonPanel=new WHorizontalBox();
//        this.topPanel.setHeight(this.height+this.buttonHeight);
//        this.topPanel.setWidth(this.width+2);
        this.setHeight((this.height+this.buttonHeight));
        this.setWidth(this.width+2);
    }
    
    
    this.contentPanel=new WPanel();
    this.contentPanel.setHeight(this.height);
    this.contentPanel.setWidth(this.width);

    if(this.type===WTabbedPanel.TYPE.BELOW ){
        this.contentPanel.w.style.borderTop="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderLeft="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderRight="1px "+WBorderStyle.SOLID;
    }else if(this.type===WTabbedPanel.TYPE.LEFT){
        this.contentPanel.w.style.borderTop="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderBottom="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderRight="1px "+WBorderStyle.SOLID;
    }else if(this.type===WTabbedPanel.TYPE.RIGHT){
        this.contentPanel.w.style.borderTop="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderBottom="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderLeft="1px "+WBorderStyle.SOLID;
    }else{
        this.contentPanel.w.style.borderBottom="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderLeft="1px "+WBorderStyle.SOLID;
        this.contentPanel.w.style.borderRight="1px "+WBorderStyle.SOLID;
    }
    
    this.preFillerBox=new WPanel();
    this.fillerBox=new WPanel();

    if(this.type===WTabbedPanel.TYPE.BELOW ){
        this.preFillerBox.setMinWidth(5);
        this.preFillerBox.w.style.borderTop="1px "+WBorderStyle.SOLID;
        
        this.fillerBox.setWidth(5000);
        this.fillerBox.w.style.borderTop="1px "+WBorderStyle.SOLID;
    }else if(this.type===WTabbedPanel.TYPE.LEFT){
        this.preFillerBox.setMinHeight(5);
        this.preFillerBox.w.style.borderRight="1px "+WBorderStyle.SOLID;
        
        this.fillerBox.setHeight(5000);
        this.fillerBox.w.style.borderRight="1px "+WBorderStyle.SOLID;
    }else if(this.type===WTabbedPanel.TYPE.RIGHT){
        this.preFillerBox.setMinHeight(5);
        this.preFillerBox.w.style.borderLeft="1px "+WBorderStyle.SOLID;
        
        this.fillerBox.setHeight(5000);
        this.fillerBox.w.style.borderLeft="1px "+WBorderStyle.SOLID;
    }else{
        this.preFillerBox.setMinWidth(5);
        this.preFillerBox.w.style.borderBottom="1px "+WBorderStyle.SOLID;
        
        this.fillerBox.setWidth(5000);
        this.fillerBox.w.style.borderBottom="1px "+WBorderStyle.SOLID;
    }
    this.buttonPanel.add(this.fillerBox);
    
    if(this.type===WTabbedPanel.TYPE.BELOW || this.type===WTabbedPanel.TYPE.RIGHT){
//        this.topPanel.add(this.contentPanel);
//        this.topPanel.add(this.buttonPanel);
        this.add(this.contentPanel);
        this.add(this.buttonPanel);
    }else{
//        this.topPanel.add(this.buttonPanel);
//        this.topPanel.add(this.contentPanel); 
        this.add(this.buttonPanel);
        this.add(this.contentPanel); 
    }
    ////this.add(this.topPanel);
    //this.w.appendChild(this.topPanel.w);
    
    this.buttons=new Array();
    this.panes=new Array();
};

WTabbedPanel.prototype.setButtonWidth=function(width){
    this.buttonWidth=width;
    for(var index=0;index<this.buttons.length;index++){
        this.buttons[index].setWidth(width);
    }
    if(this.type===WTabbedPanel.TYPE.LEFT || this.type===WTabbedPanel.TYPE.RIGHT){
        this.buttonPanel.setWidth(this.buttonWidth);
//        this.topPanel.setHeight(this.height+2);
//        this.topPanel.setWidth(this.width+2+this.buttonWidth);
        this.setHeight(this.height+2);
        this.setWidth(this.width+2+this.buttonWidth);
    }else{
//        this.topPanel.setHeight(this.height+this.buttonHeight);
//        this.topPanel.setWidth(this.width+2);
        this.setHeight(this.height+this.buttonHeight);
        
        this.setWidth(this.width+2);
    }
};

WTabbedPanel.prototype.addPane=function(panel,tagName){
    
    var button=new WTabButton(tagName,this.type,this.buttonHeight);
    button.setMinWidth(this.buttonWidth);
    button.setMinHeight(this.buttonHeight);
    this.buttonPanel.remove(this.fillerBox);
    panel.setLocation(0,0);
    panel.w.style.position="absolute";

    if(this.panes.length===0){
        panel.w.style.visibility="visible";
        button.setSelected(true);
    }else{
        button.setSelected(false);
        panel.w.style.visibility="hidden";
    }
    
    var THIS=this;
    button.addMouseDownEventListener(function(event){
        for(var index=0;index<THIS.buttons.length;index++){
            THIS.buttons[index].setSelected(false);
            THIS.panes[index].w.style.visibility="hidden";
        }
        
        button.setSelected(true);       
        panel.w.style.visibility="visible";
    });
    
    if(this.buttons.length===0){
        this.buttonPanel.add(this.preFillerBox);
    }
    this.buttons.push(button);
    this.panes.push(panel);
    
    this.buttonPanel.add(button);
    this.contentPanel.add(panel);
    
    this.buttonPanel.add(this.fillerBox);
};


function WTextNode(string){
    this.w=document.createTextNode(string);
};


inheritPrototype(WSpan,WNode);
inheritPrototype(WSpan,WMouseEvents);
inheritPrototype(WSpan,WObjectStyle);
function WSpan(){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WObjectStyle);

    this.w=document.createElement("span");
   // this.w.style.position="absolute";
}

WSpan.prototype.setText=function(string){
    this.removeAllChildren();
    this.add(new WTextNode(string));
    
};

WSpan.prototype.removeAllChildren=function(){
    while(this.w.hasChildNodes()){
        this.w.removeChild(this.w.firstChild);
    }
};


inheritPrototype(WTextArea2,WNode);
inheritPrototype(WTextArea2,WMouseEvents);
inheritPrototype(WTextArea2,WObjectStyle);
function WTextArea2(string){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WObjectStyle);

    this.w=document.createElement("div");
    this.w.setAttribute("class","WTextArea2");
    this.w.style.margin="0 auto";
    this.w.style.overflow="auto";
    this.w.style.border="0px solid #AAA";
    this.w.style.padding="7px";
    this.w.style.textAlign="left";
    //this.w.style.background="rgb(255,255,255)";

    //this.w.style.position="absolute";
};

WTextArea2.prototype.setText=function(string){
    // added this to support key:object strings in content.json
    // will need to recode some more if we go more than 2 deep
    if (typeof(string)=='object') {
        this.w.innerHTML = ''
        for (var key in string) {
            let value = string[key];
            if (Array.isArray(value)) {
                if (value.length) {

                    this.w.innerHTML += '<h4>'+key+'</h4>';
                    for (var i in value) {
                        this.w.innerHTML += '<p>' + value[i] + '</p>'
                    }
                };
            
            } else {

            if (value.length) {
                this.w.innerHTML += '<h4>'+key+'</h4>';
                if (value != '&nbsp;') {
                    this.w.innerHTML += '<p>'+value+'</p>'
                };
                };
            }
        };
    } else {
        this.w.innerHTML=string;
    }
};

WTextArea2.prototype.removeAllChildren=function(){
    while(this.w.hasChildNodes()){
        this.w.removeChild(this.w.firstChild);
    }
};

WTextArea2.prototype.getText=function(){
    return this.w.value;
};

WTextArea2.prototype.setReadOnly=function(readOnly){
    // it's always read only this is here to be compatible with TextArea 
};


inheritPrototype(WToggleButton,WNode);
inheritPrototype(WToggleButton,WObjectStyle);
inheritPrototype(WToggleButton,WFocusEvents);
inheritPrototype(WToggleButton,WMouseEvents);
function WToggleButton(unselectedText,selectedText){
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    
    if(!selectedText)selectedText=unselectedText;
    this.unselectedText=unselectedText;
    this.selectedText=selectedText;
    this.selected=false;

    this.w=document.createElement("button");
    this.w.setAttribute("class","WToggleButton");
    this.w.type="button";
    this.w.style.margin="0";
    this.w.style.position="relative";
    this.w.style.color="rgb(255,255,255)";
    
    this.downBorder=WBorderStyle.createBorder(WBorderStyle.INSET,2,WColor.WHITE);
    this.upBorder=WBorderStyle.createBorder(WBorderStyle.OUTSET,2,WColor.WHITE);
    
    this.upBorder.applyTo(this);
    
    this.stringNode=null;
    this.imageNode=null;
    this.unselectedImagePath=null;
    this.selectedImagePath=null;
    
    this.glyphNode=null;
    this.unselectedGlyphNode=null;
    this.selectedGlyphNode=null;
    
    this.selectedColor=new WColor(190,190,190,1);
    this.unselectedColor=new WColor(200,200,200,1);
    
    this.setText(this.unselectedText);
    
    this.setBackgroundColor(this.unselectedColor);

    var THIS=this;
    this.addMouseDownEventListener(function(event){
        if(THIS.selected){
            THIS.setSelected(false);
        }else{
            THIS.setSelected(true);
        }
    });
}

WToggleButton.prototype.makeButtonInvisible=function(){
    this.selectedColor.alpha=0;
    this.unselectedColor.alpha=0;
    this.downBorder=WBorderStyle.createBorder(WBorderStyle.INSET,2,new WColor(0,0,0,0));
    this.upBorder=WBorderStyle.createBorder(WBorderStyle.OUTSET,2,new WColor(0,0,0,0));
    this.setBackgroundColor(this.unselectedColor);
    this.upBorder.applyTo(this);
};

WToggleButton.prototype.setText=function(string){
    this.removeAllChildren();
    var stringNode=document.createTextNode(string);
    this.w.appendChild(stringNode);
};

WToggleButton.prototype.setUpImage=function(imagePath,width,height){
    this.upImage=imagePath;
};

WToggleButton.prototype.setDownImage=function(imagePath,width,height){
    this.downImage=imagePath;
};

WToggleButton.prototype.setImage=function(imageNode){
    this.add(imageNode);
};

WToggleButton.prototype.setImage=function(unselectedImagePath,selectedImagePath,width,height){
    this.removeAllChildren();
    this.unselectedImagePath=unselectedImagePath;
    this.selectedImagePath=selectedImagePath;
    if(this.selected){
        this.imageNode=new WImage(selectedImagePath,width,height);
    }else{
        this.imageNode=new WImage(unselectedImagePath,width,height);
    }
    this.add(this.imageNode);
};

WToggleButton.prototype.setGlyph=function(unselectedGlyphIcon,selectedGlyphIcon,size){
    this.removeAllChildren();
    this.unselectedGlyph=unselectedGlyphIcon;
    this.selectedGlyph=selectedGlyphIcon;
    
    span=new WSpan();
    span.setFontFamily("glyphicon");
    span.setFontSize(size);
    
    this.glyph=span;
    this.updateGlyph();
//    if(this.selected){
//        span.w.content=selectedGlyphIcon;
//    }else{
//        span.w.content=unselectedGlyphIcon;
//    }
    this.add(this.glyph);
};

WToggleButton.prototype.addText=function(string){
    this.stringNode=document.createTextNode(string);
    this.w.appendChild(this.stringNode);
};

WToggleButton.prototype.changeText=function(string){
    var newStringNode=document.createTextNode(string);
    this.w.replaceChild(newStringNode,this.stringNode);
    this.stringNode=newStringNode;
};

WToggleButton.prototype.addImage=function(imagePath,width,height){
    var imageNode=new WImage(imagePath,width,height);
    this.add(imageNode);
};

WToggleButton.prototype.setFont=function(font){
    this.w.style["font-family"]=font.getFontFamily();
    this.w.style["font-size"]=font.getFontSize();
    this.w.style["font-style"]=font.getFontStyle();
    this.w.style["font-variant"]=font.getFontVariant();
    this.w.style["font-weight"]=font.getFontWeight();
    this.w.style["font-size-adjust"]=font.getFontSizeAdjust();
    this.w.style["font-stretch"]=font.getFontStretch();
};

WToggleButton.prototype.updateBorder=function(){
    if(this.selected){
        this.downBorder.applyTo(this);
        this.setBackgroundColor(this.selectedColor);
    }else{
        this.upBorder.applyTo(this);
        this.setBackgroundColor(this.unselectedColor);
    }
};

WToggleButton.prototype.updateImage=function(){
    if(this.selected){
        this.imageNode.w.src=this.selectedImagePath;
    }else{
        this.imageNode.w.src=this.unselectedImagePath;
    }
};

WToggleButton.prototype.updateGlyph=function(){
    if(this.selected){
        this.glyph.setText(this.selectedGlyph);
    }else{
        this.glyph.setText(this.unselectedGlyph);
    }
};

WToggleButton.prototype.updateText=function(){
    if(this.selected){
        this.setText(this.selectedText);
    }else{
        this.setText(this.unselectedText);
    }
};

WToggleButton.prototype.setSelected=function(selected){
    this.selected=selected; 
    this.updateBorder();
    if(this.imageNode!=null){
        this.updateImage();
    }
    if(this.glyph!=null){
        this.updateGlyph();
    }
    this.updateText();
};

WToggleButton.prototype.isSelected=function(){
    return this.selected;
};


TreeNode=function(parent,group,label,colorString,isOptionGroup){
    this.parent=parent;
    this.children=[];
    
    this.group=group;
    this.label=label;
    
    this.childIndex=-1;
    this.optionIndex=-1;
    if(parent){
        this.depth=parent.depth+1;
    }else{
        this.depth=0;
    }
    
    this.option=null;
    if(isOptionGroup===true){
        var indent="";
        for(var count=0;count<this.depth-1;count++){
            indent+="\u00A0\u00A0\u00A0\u00A0";
        }
        this.option=new WOptionGroup(indent+label);
        this.option.w.style.color="black";
        this.option.w.style.fontWeight="700";
        this.option.w.style.fontStyle="italic";
    }else{
        var indent=TreeNode.prototype.getIndent(this.depth);
        this.option=new WOption(group+":"+label,indent+label);
        this.option.w.style.color=(colorString)?(colorString):"black";
    }

    return this;
};
TreeNode.prototype.getIndent=function(depth){
    var indent="";
    for(var count=0;count<depth-1;count++){
        indent+="\u00A0\u00A0\u00A0\u00A0";
    }
    return indent;
};
TreeNode.prototype.addChildSorted=function(selectList,optionGroup,label,colorString,isOptionGroup){
    var newNode=new TreeNode(this,optionGroup,label,colorString,isOptionGroup);
    
    var inserted=false;
    for(var index=0;index<this.children.length;index++){
        
        if(newNode.label.toLowerCase()<this.children[index].label.toLowerCase()){
            this.children.splice(index,0,newNode);
            this.rootReindex();

            if(selectList.w.children.length<newNode.childIndex){
                selectList.w.appendChild(newNode.option.w);
            }else{
                selectList.w.insertBefore(newNode.option.w,selectList.w.children[newNode.childIndex]);
            }
            inserted=true;
            break;
        }
    }
    if(!inserted){
        this.children.push(newNode);
        this.rootReindex();

        if(selectList.w.children.length<newNode.childIndex){
            selectList.w.appendChild(newNode.option.w);
        }else{
            selectList.w.insertBefore(newNode.option.w,selectList.w.children[newNode.childIndex]);
        }
    }

    return newNode;
};
TreeNode.prototype.getChild=function(label){
    for(var index=0;index<this.children.length;index++){
        if(this.children[index].label===label){
            return this.children[index];
        }
    }
    return null;
};
TreeNode.prototype.insert=function(selectList,pathList,groupName,label,colorString){
    if(pathList.length===0){//we are at the end of the path let's add the node
        var swapNode=this.getChild(label);//check to see if there is already a node by this name if there is then it's and option group
        if(swapNode){// swap optgroup for option
            var indent=TreeNode.prototype.getIndent(swapNode.depth);
            var option=new WOption(swapNode.group,indent+swapNode.label);
            option.w.style.color=(colorString)?(colorString):"black";
           
            groupElement=selectList.w.children[swapNode.childIndex];
            selectList.w.insertBefore(option.w,groupElement);
            selectList.w.removeChild(groupElement);
            swapNode.option=option;
            swapNode.rootReindex();
        }else{
            this.addChildSorted(selectList,groupName,label,colorString);
        }
        return;
    }
    
    //shorten the path by one node
    var pathNodeName=pathList.splice(0,1)[0];
    //append to the group name   
    groupName=(groupName && groupName.length>0)?groupName+":"+pathNodeName:pathNodeName;
    
    var pathNode=this.getChild(pathNodeName);
    if(pathNode===null){//we need to continue on but there isn't anywhere to go so add an option group
        pathNode=this.addChildSorted(selectList,groupName,pathNodeName,colorString,true);
    }
    
    // we are NOT at the end of the path so continue down
    pathNode.insert(selectList,pathList,groupName,label,colorString);
};
TreeNode.prototype.print=function(prefix){
    if(prefix===undefined){
        prefix="";
    }
    for(var index=0;index<this.children.length;index++){
        this.children[index].print("    "+prefix);
    }
};
TreeNode.prototype.getRoot=function(){
    if(this.parent===null)return this;
    return this.parent.getRoot();
};
TreeNode.prototype.rootReindex=function(){
    this.getRoot().reindex(-1,-1);
};
TreeNode.prototype.reindex=function(baseChildIndex,baseOptionIndex){
    var node=this;
    //var baseChildIndex=node.childIndex;
    //var baseOptionIndex=node.optionIndex;
    if(this.parent!==null){
        node=this.parent;
        //baseChildIndex=node.childIndex;
        //baseOptionIndex=node.optionIndex;
    }
    for(var index=0;index<node.children.length;index++){
        var childNode=node.children[index];
        
        baseChildIndex++;
        childNode.childIndex=baseChildIndex;

        if(childNode.option instanceof WOption) {
            baseOptionIndex++;
            childNode.optionIndex=baseOptionIndex;
        }
        
        if(childNode.children.length>0){
            tuple=childNode.children[0].reindex(baseChildIndex,baseOptionIndex);
            baseChildIndex=tuple[0];
            baseOptionIndex=tuple[1];
        }
    }
    return [baseChildIndex,baseOptionIndex];
};
TreeNode.prototype.getNodeByIndex=function(seekIndex){
    if (this.childIndex===seekIndex){
        return this;
    }
    for(var index=0;index<this.children.length;index++){
        var node=this.children[index].getNodeByIndex(seekIndex);
        if(node!==null){
            return node;
        }
    }
    return null;
};
TreeNode.prototype.getOptionNodeByIndex=function(seekIndex){
    if (this.optionIndex===seekIndex){
        return this;
    }
    for(var index=0;index<this.children.length;index++){
        var node=this.children[index].getOptionNodeByIndex(seekIndex);
        if(node!==null){
            return node;
        }
    }
    return null;
};
TreeNode.prototype.getPath=function(path){
    if(this.parent!==null){
        if(this.parent.parent!==null){
            if(path.length>0){
                path=this.parent.label+":"+path;
            }else{
                path=this.parent.label;
            }
        }
        path=this.parent.getPath(path);
    }
    return path;
};

inheritPrototype(WTreeSelectList,WNode);
inheritPrototype(WTreeSelectList,WObjectStyle);
inheritPrototype(WTreeSelectList,WFocusEvents);
inheritPrototype(WTreeSelectList,WMouseEvents);
inheritPrototype(WTreeSelectList,WTextEvents);
function WTreeSelectList(size){
    THIS=this;
    inherit(this,WNode);
    inherit(this,WObjectStyle);
    inherit(this,WFocusEvents);
    inherit(this,WMouseEvents);
    inherit(this,WTextEvents);

    this.currentOptionNodeSavedLeadingSpaces="";
    this.currentOptionNode;

    this.w=document.createElement("select");
    this.w.addEventListener("change",function(event){THIS.updateColor();});
    this.w.addEventListener("change",function(event){THIS.updateLeadingWhiteSpace();});

    this.root=new TreeNode(null,"root");

    if(size!==null){
        this.w.size=size;
    }
    this.w.multiple=true;
};

WTreeSelectList.prototype.updateLeadingWhiteSpace=function(){
    if(this.currentOptionNode){
        this.currentOptionNode.option.w.innerHTML=this.currentOptionNodeSavedLeadingSpaces+this.currentOptionNode.option.w.innerHTML;
    }
    
    var optionNode=this.root.getOptionNodeByIndex(this.w.selectedIndex);
    
    endOfWhiteSpace=optionNode.option.w.innerHTML.lastIndexOf("&nbsp;");
    if(endOfWhiteSpace!==-1){
        endOfWhiteSpace+=6;
    }else{
        endOfWhiteSpace+=1;
    }
    this.currentOptionNodeSavedLeadingSpaces=optionNode.option.w.innerHTML.substring(0,endOfWhiteSpace);
    var newText=optionNode.option.w.innerHTML.substring(endOfWhiteSpace,optionNode.option.w.innerHTML.length);
    optionNode.option.w.innerHTML=newText;
    
    this.currentOptionNode=optionNode;
};

WTreeSelectList.prototype.updateColor=function(){
    var optionNode=this.root.getOptionNodeByIndex(this.w.selectedIndex);
    this.w.style.color=(optionNode.option.w.style.color)?optionNode.option.w.style.color:"black";
};

WTreeSelectList.prototype.setMultiple=function(boolean){
    this.w.multiple=boolean;
};

WTreeSelectList.prototype.print=function(){
    this.root.print();
};

WTreeSelectList.prototype.addOption=function(path,optionValue,colorString){
    var pathList=[];
    if(path && path!==""){
        pathList=path.split(":");
    }
    this.root.insert(this,pathList,"",optionValue,colorString);
    this.updateColor();
    this.updateLeadingWhiteSpace();
};

WTreeSelectList.prototype.getGroupByIndex=function(index){
    var node=this.root.getOptionNodeByIndex(index);

    var group=node.getPath("");
    
    return group;
};

WTreeSelectList.prototype.setValue=function(value){//value=group+":"+label
    this.w.value=value;
    this.updateColor();
    this.updateLeadingWhiteSpace();
};


inheritPrototype(WMenuItem,WNode);
inheritPrototype(WMenuItem,WMouseEvents);
inheritPrototype(WMenuItem,WObjectStyle);
inheritPrototype(WMenuItem,WHorizontalBox);
function WMenuItem(text,onClickFunction){
    inherit(this,WNode);
    inherit(this,WMouseEvents);
    inherit(this,WObjectStyle);
    inherit(this,WHorizontalBox);
    
    var THIS=this;
    
    this.w.setAttribute("class","WMenuItem");
    this.w.style.position="relative";
    this.w.addEventListener("contextmenu",function(event){
        event.preventDefault();
    });
    
    this.label=new WLabel();
    this.label.setFontFamilyGeneric(WFontStyle.FAMILY.ARIAL,WFontStyle.GENERIC.SANSERIF);
    this.label.setFontSize(12);
    this.label.setText(text);
    this.add(new WStrut(20));
    this.add(this.label);
    this.add(new WStrut(20));
    
    this.label.w.style.background="rgb(0,0,0,0)";
    
    this.label.w.style.padding="5px";
    
    this.w.addEventListener("mouseup", onClickFunction);
    
    this.w.addEventListener("mouseup", function(event){
        event.preventDefault();
        //THIS.label.w.style.background="rgb(255,255,255)";
        THIS.w.style.background="rgb(255,255,255)";
        THIS.label.w.style.color="rgb(0,0,0)";
    });
    
    this.addMouseEnterEventListener(function(event){
        //THIS.label.w.style.background="rgb(0,0,255)";
        THIS.w.style.background="rgb(0,0,255)";
        THIS.label.w.style.color="rgb(255,255,255)";
    });
    this.addMouseLeaveEventListener(function(event){
        //THIS.label.w.style.background="rgb(255,255,255)";
        THIS.w.style.background="rgb(255,255,255)";
        THIS.label.w.style.color="rgb(0,0,0)";
    });

};



inheritPrototype(WContextMenu,WOverlay);
function WContextMenu(){
    inherit(this,WOverlay);
    var THIS=this;
    
    this.closeDivision=document.createElement("div");
    this.closeDivision.setAttribute("class","closeclick");
    this.closeDivision.style.backgroundColor="rgb(0,0,0,0)";
    this.closeDivision.style.position="absolute";
    this.closeDivision.style.left="0px";
    this.closeDivision.style.top="0px";
    this.closeDivision.style.width="100%";
    this.closeDivision.style.height="100%";
    this.closeDivision.style.zIndex="999";
    this.closeDivision.addEventListener("click",function(){
        //event.preventDefault();
        THIS.hide();
    });
    this.closeDivision.addEventListener("contextmenu",function(){
        //event.preventDefault();
        THIS.hide();
    });
    
    this.w.setAttribute("class","WContextMenu");
    this.w.style.position="absolute";
    this.w.style.background="rgb(255,255,255)";
    this.setBorderRadius("1px");
    
    var border=WBorderStyle.createBorder(WBorderStyle.SOLID,1,new WColor(150,150,150));
    border.applyTo(this);

    this.verticalBox=new WVerticalBox();
    this.verticalBox.w.style.height="100%";
    this.verticalBox.w.style.width="100%";
    this.add(this.verticalBox);
    
    this.addContextMenuEventListener(function(event){
        event.preventDefault();
        THIS.hide();
    });
    this.addClickEventListener(function(event){
        event.preventDefault();
        THIS.hide();
    });
};

WContextMenu.prototype.addMenuItem=function(menuItem){
    this.verticalBox.add(menuItem);
};

WContextMenu.prototype.show=function(x,y){
    this.w.style.left=x+"px";
    this.w.style.top=y+"px";
    document.body.appendChild(this.closeDivision);
    document.body.appendChild(this.w);
};

WContextMenu.prototype.hide=function(){
    if(this.w.parentNode){
        this.w.parentNode.removeChild(this.w);
    }
    if(this.closeDivision.parentNode){
        this.closeDivision.parentNode.removeChild(this.closeDivision);
    }
};

WContextMenu.prototype.setContext=function(contextObject){
    var THIS=this;
    contextObject.w.addEventListener("contextmenu",function(event){
        event.preventDefault();
        THIS.show(event.clientX, event.clientY);
    },false);
};

function notice() {
	var ok = confirm("Linking to an external website: Some reference documents have a Digital Object Identifier (DOI) with an associated weblink, while others do not. A number of reference documents, reports, databases, models, tools, etc., may be viewed and/or downloaded at no cost, while others must be purchased for viewing and/or downloading.  EPA is not responsible for missing, broken, incorrect, or misdirected weblinks.");
	return ok;
};
function imagePopup(myImage, myTitle, myCaption, mySource) {

	var myWindow = window.open("", myTitle, "width=600, height=550,toolbar=no,scrollbars=yes,resizable=yes");
	myWindow.document.write("<head><title>" + myTitle + "</title></head>");
	myWindow.document.write("<big><b>Figure Caption:</big></b>" + myCaption + "<p>");
	myWindow.document.write("<big><b>Figure Source:</big></b>" + mySource + "<p>");
	myWindow.document.write("<img src=" + myImage + ">");
	return myWindow;
};