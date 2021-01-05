var OTIEBrowserHook;// It would be better to find away around using this global variable
inheritPrototype(OTIEBrowser,WPanel);
function OTIEBrowser(title,graphToUse,startNode,bibliographyLink){
    inherit(this,WPanel);
    
    var THIS=this;
    OTIEBrowserHook=this;
    this.title=title;
    this.graph=graphToUse;
    
    this.checkGraph();
    
    /*this.currentNodeID=-1;
    this.previousNodeID=this.currentNodeID;
    if(this.getCookie("previousNodeID")){
        this.currentNodeID=parseInt(this.getCookie("previousNodeID"));
    }
    if(this.getCookie("currentNodeID")){
        startNode=parseInt(this.getCookie("currentNodeID"));
    }*/

    this.setID("EcoHealthBrowser");
    
    //this.titleFontFamily="Roboto Condensed";//"sans-serif"
    //this.textFontFamily="Roboto Condensed";
    //this.selectListFontFamily="Roboto Condensed";
    //this.instructionsFontFamily="Roboto Condensed";
    //this.pathFontFamily="Roboto Condensed";
    //this.biographyFontFamily="Roboto Condensed";
    //this.nodeFontFamily="Roboto Condensed"; 
    
    this.textAreaFontSize="14px";

    this.width = 1030;
    this.height = 705;


    this.textColumn = 730;
    this.textRowA=20;
    this.textRowB=680;
    this.textRowC=650;

    this.center={x:360,y:352};

    this.hold=null;

    this.transitionTime=500;//in ms
    this.beamTime=150;//in ms

    this.edgeSize=49;//circle sizes
    this.centerSize=this.edgeSize*1.35;
    
    this.innerRingDistance=225;
    this.levelDistance=70;

    this.characterLengthBeforePathSplit=130;
    
    this.fontSize=12;

    this.inboundColor="rgb(183, 198, 49)";
    this.outboundColor="rgb(133, 205, 238)";
    
    this.activeNodeList = [];
    this.activeLinkList = [];

    this.linkOverlay=null;
    this.citationExists=true;

    this.layoutGUI(bibliographyLink);

    setTimeout(function(){ THIS.update(startNode); }, 100);
};

OTIEBrowser.prototype.getCookie=function(cookieName) {
    var searchText = cookieName + "=";
    
    var cookieList = document.cookie.split(';');
    
    for(var index=0; index<cookieList.length; index++) {
        var cookieEntry = cookieList[index];
        cookieEntry=cookieEntry.trim();
        if (cookieEntry.indexOf(searchText) === 0) {
            return cookieEntry.substring(searchText.length,cookieEntry.length);
        }
    }
    return null;
};

OTIEBrowser.prototype.checkGraph=function(){
    for(var linkIndex=0;linkIndex<graph.edges.length;linkIndex++){
        
        var sourceFound=false;
        var sourceID=graph.edges[linkIndex].source;
        
        var targetFound=false;
        var targetID=graph.edges[linkIndex].target;
     
        for(var nodeIndex=0;nodeIndex<graph.nodes.length;nodeIndex++){
            if(graph.nodes[nodeIndex].id===sourceID){
                sourceFound=true;
                if(targetFound)break;
            }
            if(graph.nodes[nodeIndex].id===targetID){
                targetFound=true;
                if(sourceFound)break;
            }
        }
        if(!sourceFound || !targetFound){
            console.log("Broken edge "+graph.edges[linkIndex].id);
            graph.edges.splice(linkIndex,1);
            linkIndex--;
        }
    }
};

OTIEBrowser.prototype.layoutGUI = function(bibliographyLink){
    var THIS=this;
    // //this.addFont();
     this.box1=new WVerticalBox();
	 this.box1.w.style.textUnderlinePosition="under"
    
    this.box10=new WHorizontalBox();
    this.box10.setSizeAll(1030,0, 1030,0,1030,0);
    this.box10.w.style.background="linear-gradient(white, rgb(230,230,230))";
	

	
    
    this.box11=new WHorizontalBox();

    this.box11.w.style.background="linear-gradient(rgb(230,230,230),white, rgb(220,220,220))";
    this.biographyButton=new WButton("Bibliography");
    this.biographyButton.setSizeAll(125,30,125,30,125,30);
    this.biographyButton.w.style.fontFamily=this.biographyFontFamily;
    this.biographyButton.w.style.fontSize="14px";
    this.biographyButton.w.style.fontWeight="bolder";
    this.biographyButton.w.style.color="black";
    this.biographyButton.w.style.backgroundColor="transparent";
    this.biographyButton.w.style.borderRadius="5px";
    this.biographyButton.w.style.backgroundImage="none";
    this.biographyButton.addMouseDownEventListener(function(){
       window.open(bibliographyLink);
    });
	
    
//    var boldStyle=new WStyle();
//    boldStyle.w.style.fontFamily=this.titleFontFamily;
//    boldStyle.w.style.fontSize="18px";
//    boldStyle.w.style.position="relative";
//    boldStyle.w.style.fontWeight="bold";
//    boldStyle.w.style.top="3px";
//    boldStyle.w.style.textDecoration="underline";
//    boldStyle.w.style.verticalAlign="-30px";
//    
//    var normalStyle=new WStyle();
//    normalStyle.w.style.fontFamily=this.titleFontFamily;
//    normalStyle.w.style.fontSize="18px";
//    normalStyle.w.style.position="relative";
//    normalStyle.w.style.fontWeight="normal";
//    normalStyle.w.style.top="3px";
//    normalStyle.w.style.verticalAlign="-30px";
    
    this.titlePanel=new WHorizontalBox();
	this.titlePanel.w.style.width="100%";
    this.titlePanel.w.style.overflow="visible";
	this.titlePanel.w.style.color="rgb(90,90,90)";
    this.titlePanel.w.innerHTML=this.title;

    this.topicLabel=new WSpan();
    this.topicLabel.setText("Topic:");
    this.topicLabel.w.style.fontFamily=this.selectListFontFamily;
    this.topicLabel.w.style.fontSize="14px";
    this.topicLabel.w.style.position="relative";
    this.topicLabel.w.style.top="5px";
   
    this.titleSelectList=new WTreeSelectList();
    //is.titleSelectList.w.style.fontFamily=this.selectListFontFamily;
    this.titleSelectList.w.style.fontSize="14px";
    this.titleSelectList.setMultiple(false);
    for(var nodeIndex=0;nodeIndex<this.graph.nodes.length;nodeIndex++){
        var nodeEntry=this.graph.nodes[nodeIndex];
        this.titleSelectList.addOption(nodeEntry.group,nodeEntry.title,nodeEntry.color);
    }
    this.titleSelectList.addChangeEventListener(function(event){THIS.titleSelected(event);});
    this.titleSelectList.w.addEventListener("keyup", function(evt){   // kludge fix to make Firefox issue a change event when arrow keys are used to select items
        evt.target.blur();
        evt.target.focus();
    }, false);
    //this.titleSelectList.setSizeAll(280,26,280,26,280,26);// this is the same with as the details panel
    this.titleSelectList.setSizeAll(280,26,280,26,280,26);
    this.titleSelectList.w.style.position="relative";
    this.titleSelectList.w.style.top="2px";
    this.titleSelectList.w.style.right="0px";
    this.titleSelectList.w.style.background="rgba(0,0,0,0)";
	this.titleSelectList.w.style.borderRadius="5px";
    this.titleSelectList.print();

    this.box12=new WHorizontalBox();

    this.nodeTextAreaBox=new WPanel();
    this.nodeTextAreaBox.w.style.height='662px';
    this.nodeTextAreaBox.w.style.width='280px';
    //this.nodeTextAreaBox.setSizeAll(280,this.textRowB-this.textRowA,280,500,800,this.textRowB-this.textRowA);
    this.nodeTextAreaBox.setLocation(this.textColumn,this.textRowA);
    this.nodeTextAreaBox.w.style.position="absolute";
    this.nodeTextAreaBox.w.style.boxSizing="border-box";
    this.nodeTextAreaBox.w.style.background="rgba(255,255,255,.95)";
    this.nodeTextAreaBox.w.style.border="1px solid #AAA";
	this.nodeTextAreaBox.w.style.borderRadius="5px";
    //this.nodeTextAreaBox.makeResizable();
    this.nodeTextArea=new WTextArea2();
    //this.nodeTextArea.w.style.border="none";
    this.nodeTextArea.w.style.position="absolute";
    this.nodeTextArea.w.style.top="0px";
    this.nodeTextArea.w.style.left="0px";
    this.nodeTextArea.w.style.right="0px";
    this.nodeTextArea.w.style.bottom="0px";
    this.nodeTextArea.w.style.fontFamily=this.textFontFamily;
    this.nodeTextArea.w.style.fontSize=this.textAreaFontSize;
    this.nodeTextAreaBox.add(this.nodeTextArea);

    this.nodeTextArea2Box=new WPanel();
    //this.nodeTextArea2Box.setSizeAll(280,this.textRowC-this.textRowB,280,this.textRowC-this.textRowB,280,this.textRowC-this.textRowB);
    //this.nodeTextArea2Box.setSizeAll(280,this.textRowC-this.textRowB,280,this.textRowC-this.textRowB,800,this.textRowC-this.textRowB);
    //this.nodeTextArea2Box.setLocation(this.textColumn,this.textRowB);
    //this.nodeTextArea2Box.w.style.position="absolute";
    //this.nodeTextArea2Box.w.style.boxSizing="border-box";
    this.nodeTextArea2Box.w.style.background="white";
    this.nodeTextArea2Box.w.style.border="0px solid #AAA";
    //this.nodeTextArea2Box.makeResizable();
    this.nodeTextArea2=new WTextArea2();
    this.nodeTextArea2.w.style.border="none";
    this.nodeTextArea2.w.style.position="absolute";
    this.nodeTextArea2.w.style.top="0px";
    this.nodeTextArea2.w.style.left="0px";
    this.nodeTextArea2.w.style.right="0px";
    this.nodeTextArea2.w.style.bottom="0px";
    this.nodeTextArea2.w.style.fontFamily=this.textFontFamily;
    this.nodeTextArea2.w.style.fontSize=this.textAreaFontSize;
    this.nodeTextArea2Box.add(this.nodeTextArea2);
  
    this.svgPanel = d3.select(this.box12.w).append("svg");
    this.svgPanelW=new WGraphicsPanel();
    this.svgPanelW.w=this.svgPanel[0][0];
    this.svgPanelW.setSize(this.width,this.height);
    
    var gradient=this.svgPanelW.linearGradient("gradient","0%","0%","0%","100%");
    //gradient.addStop("0%","rgb(255,255,255)","0");
    //gradient.addStop("100%","rgb(180,180,180)","1");
    gradient.addStop("0%","#e5ffec","0.9");
    gradient.addStop("100%","#e5f5fb","1.0"); //#lightblue 
    this.svgPanelW.addRectangle("100%","100%","url(#gradient)");



       this.instructionTextA=this.svgPanelW.addText(25,25,"");  
    //this.instructionTextA=this.svgPanelW.addText(25,25,"Click on the topic bubble or choose a topic from the dropdown list above.");
    this.instructionTextA[0].style.fontFamily=this.instructionsFontFamily;
    this.instructionTextB=this.svgPanelW.addText(25,50,"");
    //this.instructionTextB=this.svgPanelW.addText(25,50,"Click on the linkages (+) to view the relationship between elements.");
    this.instructionTextB[0].style.fontFamily=this.instructionsFontFamily;

    this.pathTextA=this.svgPanelW.addText(25,this.height-45,"");    
 //   this.pathTextA=this.svgPanelW.addText(25,this.height-45,"Your previous >>> current displays:");
    this.pathTextA[0].style.fontFamily=this.instructionsFontFamily;
    this.pathTextA[0].style.stroke="grey";
    this.pathTextB=this.svgPanelW.addText(25,this.height-25,"");
    this.pathTextB[0].style.fontFamily=this.instructionsFontFamily;
    this.pathTextC=this.svgPanelW.addText(45,this.height-45,"");
    this.pathTextC[0].style.fontFamily=this.instructionsFontFamily;
   

    var beamGradient=this.svgPanelW.linearGradient("beamGradient","0%","0%","0%","0%");
    //beamGradient.addStop("0%","rgb(180,180,180)","1");
    beamGradient.addStop("100%","rgb(255,255,255)","1");
    this.beam=this.svgPanelW.addPolyline([[this.center.x,this.center.y-this.centerSize],[this.textColumn,this.textRowA],[this.textColumn,this.textRowB],[this.center.x,this.center.y+this.centerSize]]);
    this.beam.style.fill="url(#beamGradient)";
    this.beam.style.fillOpacity="0.7";

   
    //this.topicLabel.setSizeAll(50,30,50,30,50,30);
    

    //this.box10.add(new WStrut(306,1,20,1,10000,31));
    this.box10.add(new WStrut(306,1,20,1,1650,31));//This is a kludge fix to center MSSB title on Internet Explorer  
    this.box10.add(this.titlePanel);
    this.box10.add(new WStrut(306,1,20,1,10000,31));
    
    this.box11.setSizeAll(this.width,30,this.width,30,this.width,30);
    this.box11.add(this.biographyButton);
    this.box11.add(new WStrut(20,1,20,1,20,1));
    this.box11.add(this.titlePanel);
	
	//this.box11.add(this.topicLabel);
    
    this.box11.add(new WStrut(306,1,20,1,10000,31));
    this.box11.add(this.titleSelectList);
    this.box11.add(new WStrut(20,1,20,1,20,1));
   
    this.box1.add(this.box10);
    this.box1.add(this.box11);
    this.box1.add(this.box12);

    
    this.add(this.box1);
};

OTIEBrowser.prototype.addFont=function(){
   var newStyle = document.createElement("style");

    newStyle.appendChild(document.createTextNode(
            "@import url('//fonts.googleapis.com/css?family=Roboto+Condensed:400normal')"
    ));
    document.head.appendChild(newStyle);
};

OTIEBrowser.prototype.update = function(id){
    //console.log("update");
    if(id===this.currentNodeID)return;
    var THIS=this;
    
    this.previousNodeID=this.currentNodeID;
    this.currentNodeID=id;
    
    document.cookie="previousNodeID="+this.previousNodeID;
    document.cookie="currentNodeID="+this.currentNodeID;

    if(this.getNodeByID(id).citation===undefined){
        this.citationExists=false;
    }else{
        this.citationExists=true;
    }
    
    this.modifyBeam();
    this.modifyText(id);
    this.modifyVisibleGraph(id);
};

OTIEBrowser.prototype.modifyBeam = function(){
    //console.log("modifyBeam");
    var THIS=this;
    //THIS.beam.style.opacity=0;
    
    if(OTIEBrowserHook.linkOverlay!=null){
        if(OTIEBrowserHook.box12.contains(OTIEBrowserHook.linkOverlay)){
            OTIEBrowserHook.box12.remove(OTIEBrowserHook.linkOverlay);
        }
    }
    //console.log("modifyBeam1");
    if(OTIEBrowserHook.box12.contains(OTIEBrowserHook.nodeTextAreaBox)){
        OTIEBrowserHook.box12.remove(OTIEBrowserHook.nodeTextAreaBox);
    }
    //console.log("modifyBeam2");
    if(OTIEBrowserHook.box12.contains(OTIEBrowserHook.nodeTextArea2Box)){
        OTIEBrowserHook.box12.remove(OTIEBrowserHook.nodeTextArea2Box);
    }
    //console.log("modifyBeam3");
    this.beam.addEventListener("transitionend",OTIEBrowser.prototype.modifyBeamChainA,false);
    this.beam.style.transition="opacity 1ms linear 1ms";// fill-opacity 5s";
    var opacity=Math.random()/1000;
    //console.log("modifyBeam4 ",opacity);
    setTimeout(function(){THIS.beam.style.opacity=opacity; }, 50);// I had to set the time to 50 instead of 1 to make it work in Firefox. 
    //console.log("modifyBeam5");
};
OTIEBrowser.prototype.modifyBeamChainA=function(){
    //console.log("modifyBeamChainA");
    var THIS=this;
  
    if(OTIEBrowserHook.citationExists){
        OTIEBrowserHook.beam.alterPoint(2,[OTIEBrowserHook.textColumn,OTIEBrowserHook.textRowC]);
    }else{
        OTIEBrowserHook.beam.alterPoint(2,[OTIEBrowserHook.textColumn,OTIEBrowserHook.textRowB]);
    }
  
    this.removeEventListener("transitionend",OTIEBrowser.prototype.modifyBeamChainA);
    this.addEventListener("transitionend",OTIEBrowser.prototype.modifyBeamChainB,false);
    this.style.transition="opacity "+OTIEBrowserHook.beamTime+"ms linear "+OTIEBrowserHook.transitionTime+"ms";
    setTimeout(function(){THIS.style.opacity="1"; }, 50);
};
OTIEBrowser.prototype.modifyBeamChainB=function(){
    //console.log("modifyBeamChainB");
    this.removeEventListener("transitionend",OTIEBrowser.prototype.modifyBeamChainB);
   
    OTIEBrowserHook.box12.add(OTIEBrowserHook.nodeTextAreaBox);
    if(OTIEBrowserHook.citationExists){
        OTIEBrowserHook.box12.add(OTIEBrowserHook.nodeTextArea2Box);
    }
};

OTIEBrowser.prototype.titleSelected = function(event){
    var selectedValue=event.target.value;
    var selectedGroup=selectedValue.substring(0,selectedValue.lastIndexOf(":"));
    var selectedTitle=selectedValue.substring(selectedValue.lastIndexOf(":")+1,selectedValue.length);

    var node=this.getNodeByGroupAndTitle(selectedGroup,selectedTitle);
    this.update(node.id);
};

OTIEBrowser.prototype.modifyText = function(sourceID){
    var THIS=this;
    
    var currentNode=this.getNodeByID(this.currentNodeID);
    var previousNode=this.getNodeByID(this.previousNodeID);

    this.nodeTextArea.setText(currentNode.text);
    if(this.citationExists){
        this.nodeTextArea2.setText(
                "<span style=' font-weight:bold; color:grey'>Sources & Related Reading</span><br>"
                +currentNode.citation);
    }
   
    if(currentNode.group){
        this.titleSelectList.setValue(currentNode.group+":"+currentNode.title);
    }else{
        this.titleSelectList.setValue(":"+currentNode.title);
    }

    /*if(previousNode==null){
        this.pathTextB[1].data=currentNode.title;
        this.pathTextC[1].data="";
    }else{
        if((previousNode.title+" >>> "+currentNode.title).length > this.characterLengthBeforePathSplit){
            this.pathTextB[1].data=previousNode.title+" >>> ";
            this.pathTextC[1].data=currentNode.title;
        }else{
            this.pathTextB[1].data=previousNode.title+" >>> "+currentNode.title;
            this.pathTextC[1].data="";
        }
    }*/
	
};

OTIEBrowser.prototype.modifyVisibleGraph = function(sourceID){
    for(var linkIndex=0;linkIndex<this.activeLinkList.length;linkIndex++){
        if(this.activeLinkList[linkIndex].source.id!==sourceID && this.activeLinkList[linkIndex].target.id!==sourceID){
            this.activeLinkList.splice(linkIndex,1);
            linkIndex--;
        }
    }
 
    for(var nodeIndex=0;nodeIndex<this.activeNodeList.length;nodeIndex++){
        var found=false;
        for(var linkIndex=0;linkIndex<this.activeLinkList.length;linkIndex++){
            if(this.activeNodeList[nodeIndex].id===this.activeLinkList[linkIndex].source.id 
            || this.activeNodeList[nodeIndex].id===this.activeLinkList[linkIndex].target.id){
                found=true;
            }
        }
        if(!found){
            this.activeNodeList.splice(nodeIndex,1);
            nodeIndex--;
        }
    }
    
    var edgeList=[];
    for(var edgeIndex=0;edgeIndex<this.graph.edges.length;edgeIndex++){
        var edgeEntry=this.graph.edges[edgeIndex];
        if(edgeEntry.source===sourceID || edgeEntry.target===sourceID){
            edgeList.push(edgeEntry);
        }
    }

    for(var nodeIndex=0;nodeIndex<this.graph.nodes.length;nodeIndex++){
        var nodeEntry=this.graph.nodes[nodeIndex];
        
        if(edgeList.length===0 && nodeEntry.id===sourceID){
           var node = {id:nodeEntry.id,x:this.center.x,y:this.center.y,title:nodeEntry.title,color:nodeEntry.color};
           this.activeNodeList.push(node);
        }
    
        for(var edgeIndex=0;edgeIndex<edgeList.length;edgeIndex++){
            var edgeEntry=edgeList[edgeIndex];
   
            if(nodeEntry.id===edgeEntry.source || nodeEntry.id===edgeEntry.target){
                
                if(this.activeNodeList.filter(function(node){return node.id === nodeEntry.id;})[0]===undefined){
                    var node = {id:nodeEntry.id,x:this.center.x,y:this.center.y,title:nodeEntry.title,color:nodeEntry.color};
                    this.activeNodeList.push(node);
                }
            }
        }
    }
   
    for(var edgeIndex=0;edgeIndex<edgeList.length;edgeIndex++){
        var edgeEntry=edgeList[edgeIndex];
        
        var sourceNode=this.activeNodeList.filter(function(node){return node.id === edgeEntry.source;})[0];
        var targetNode=this.activeNodeList.filter(function(node){return node.id === edgeEntry.target;})[0];
        
        if(this.activeLinkList.filter(function(edge){return edge.id === edgeEntry.id;})[0]===undefined){
            var edge =  {id:edgeEntry.id, source: sourceNode, target: targetNode, text:edgeEntry.text,color:nodeEntry.color};
            this.activeLinkList.push(edge);
        }
    }
    
    var linkElementList = this.svgPanel.selectAll(".link");
    var linkElementListUpdated=linkElementList.data(this.activeLinkList,function(dataObject,index){return dataObject.id;});
    
    var linkListToRemove=linkElementListUpdated.exit();
    linkListToRemove.remove();
    
    var newLinks=linkElementListUpdated.enter();
    this.addLinkGraphics(newLinks);
    
    var nodeElementList = this.svgPanel.selectAll(".node");
    var nodeElementListUpdated = nodeElementList.data(this.activeNodeList,function(dataObject,index){return dataObject.id;});
    
    var nodeListToRemove=nodeElementListUpdated.exit();
    nodeListToRemove.remove();
    
    var newNodes=nodeElementListUpdated.enter();
    this.addNodeGraphics(newNodes);
    
    var newNodeCount=0;
    for(index=0;index<newNodes[0].length;index++){
        if(newNodes[0][index] === undefined){
            continue;
        }
        newNodeCount++;
    }
    var step=2*Math.PI/(newNodes[0].length-1);
    var stepCounter=0;
    var numberOfRings=1;
    if(newNodes[0].length>10){
        numberOfRings=2;
    }
    for(index=0;index<newNodes[0].length;index++){
        var offset=(stepCounter+1)%numberOfRings;
        if(newNodes[0][index] === undefined){
            if(d3.select(newNodes[0].update[index]).datum().id===sourceID){
                this.clickedObjectMotion(newNodes[0].update[index]);
            }else{
                this.oldObjectMotion(newNodes[0].update[index],stepCounter*step,offset);
                stepCounter++;
            }
        }else{
            if(d3.select(newNodes[0].update[index]).datum().id===sourceID){
                var d3GUIObject=d3.select(newNodes[0].update[index]);
                    
                var selectedObjectCircle=d3GUIObject.selectAll(".nodecircle");
                selectedObjectCircle.attr("r","0");
                selectedObjectCircle.transition("grow").duration(this.transitionTime).attr("r",this.edgeSize);

                var selectedObjectCircleShadow=d3GUIObject.selectAll(".nodecircleshadow");
                selectedObjectCircleShadow.attr("r","0");
                selectedObjectCircleShadow.transition("growshadow").duration(this.transitionTime).attr("r",this.edgeSize);

                var nodeText=d3GUIObject.select(".nodetext");
                nodeText.attr("font-size",0);
                
                var nodeText2=d3GUIObject.select(".nodetext");
                nodeText2.attr("dy",0);

                d3GUIObject.attr("transform","translate("+this.center.x+","+this.center.y+")");
                var tspanList=nodeText.selectAll("tspan");
                for(var tspanListIndex=1;tspanListIndex<tspanList[0].length;tspanListIndex++){
                    d3.select(tspanList[0][tspanListIndex]).attr("dy",0);
                }
         
                this.clickedObjectMotion(newNodes[0].update[index]);
            }else{
                this.newObjectMotion(newNodes[0].update[index],newNodes[0][index],stepCounter*step,offset);
                stepCounter++;
            }
        }
    }
};

OTIEBrowser.prototype.showLinkOverlay = function(linkObject,linkData){
    var THIS=this;

    linkObject=linkObject.parentNode.childNodes[2]; // Make sure we get the circle
    if(this.linkOverlay!=null){
        if(this.box12.contains(this.linkOverlay)){
            this.box12.remove(this.linkOverlay);
        }
    }

    var overlaySizeX=580;
    var overlaySizeY=300;
    var left=Math.max(25, linkObject.cx.baseVal.value-overlaySizeX/2);
    var top=linkObject.cy.baseVal.value-overlaySizeY/2;
    var text=linkData.text;

    var linkOverlay=new WOverlay();
    linkOverlay.setSize(overlaySizeX,overlaySizeY);
    linkOverlay.setLocation(left,top);
    linkOverlay.setBorderRadius("0px");
    //linkOverlay.setBorderStyle(WBorderStyle.NONE);
    //background="rgba(0,0,0,0)";
    linkOverlay.w.style.border='1.5px solid rgb(170, 170, 170)';
    linkOverlay.w.style.overflow="auto";
    linkOverlay.w.style.backgroundColor="white";
    //linkOverlay.w.style.resize="both";
    linkOverlay.makeResizable();
    
    var olbox1=new WVerticalBox();
    olbox1.setSize("100%","95%");
    var strut=new WStrut();
    strut.setSizeAll(10,1,10000,1,10000,1);
    var button = new WButton();
    button.setBackgroundColor(WColor.WHITE);
    button.w.innerHTML='&times;'
    button.w.style.color="black";
    button.w.style.backgroundImage="none";
    button.w.style.backgroundColor="transparent";
    button.w.style.position="absolute";
    button.w.style.top="0px";
    button.w.style.borderRadius="0px";
    button.w.style.right="6px";
    button.w.style.zIndex="10001";
    button.w.style.fontWeight="bold";
    button.w.style.fontSize="22px"
    button.w.style.padding= "0px";
    button.setBorder(WBorderStyle.createBorder(WBorderStyle.OUTSET,0))
    button.addClickEventListener(function(){THIS.box12.remove(linkOverlay);THIS.linkOverlay=null;});
       
   //var titleLabel=new WLabel(linkData.source.title + ' | ' + linkData.target.title); 
   var titleLabel=new WLabel('Linkages'); 
    titleLabel.w.style.fontFamily=this.textFontFamily;
    titleLabel.w.style.fontSize=this.textAreaFontSize;
    //titleLabel.w.style.height="20px";
    //titleLabel.w.style.top="2px";
    //titleLabel.w.style.paddingBottom="25px";
    titleLabel.w.style.paddingLeft="3px";
    titleLabel.w.style.borderBottom="1px solid rgb(170,170,170)";
    titleLabel.w.style.backgroundColor="lightgrey";
 
    var textArea=new WTextArea2();
    textArea.setText(text);
    textArea.w.style.textAlign="left";
/*    textArea.w.style.top="26px";
    textArea.w.style.left="2px";
    textArea.w.style.right="2px";
    textArea.w.style.bottom="0px";
   textArea.w.style.position="absolute";
  */  textArea.w.style.padding="3px";
    //textArea.w.style.boxSizing="border-box";
    textArea.w.style.topMargin="10px";
    textArea.w.style.fontFamily=this.textFontFamily;
    textArea.w.style.fontSize=this.textAreaFontSize;



    olbox1.add(titleLabel);
    olbox1.add(textArea);
    linkOverlay.add(olbox1);
    linkOverlay.add(button);
    
    THIS.linkOverlay=linkOverlay;
    
    this.box12.add(linkOverlay);
};

OTIEBrowser.prototype.getNodeByID = function(id){
    for(var nodeIndex=0;nodeIndex<this.graph.nodes.length;nodeIndex++){
        var nodeEntry=this.graph.nodes[nodeIndex];
        if(nodeEntry.id===id){
            return nodeEntry;
        }
    }
    return null;
};

OTIEBrowser.prototype.getNodeByTitle = function(title){
    for(var nodeIndex=0;nodeIndex<this.graph.nodes.length;nodeIndex++){
        var nodeEntry=this.graph.nodes[nodeIndex];
        if(nodeEntry.title===title){
            return nodeEntry;
        }
    }
    return null;
};

OTIEBrowser.prototype.getNodeByGroupAndTitle = function(group,title){
    for(var nodeIndex=0;nodeIndex<this.graph.nodes.length;nodeIndex++){
        var nodeEntry=this.graph.nodes[nodeIndex];
        if(nodeEntry.title===title && (nodeEntry.group===group || (nodeEntry.group===undefined && group==="") || (nodeEntry.group==="" && group===undefined)   )){
            return nodeEntry;
        }
    }
    return null;
};

OTIEBrowser.prototype.getEdgeByID = function(id){
    for(var edgeIndex=0;edgeIndex<this.graph.edges.length;edgeIndex++){
        var edgeEntry=this.graph.edges[edgeIndex];
        if(edgeEntry.id===id){
            return edgeEntry;
        }
    }
    return null;
};

OTIEBrowser.prototype.getLineLength = function(level){
    //return 180+55*level;
    return this.innerRingDistance+this.levelDistance*level;
};

OTIEBrowser.prototype.getNodeCoordinate = function(radians,radius){
    var dy=-Math.cos(radians)*radius;
    var dx=Math.sin(radians)*radius;
    
    return [dx,dy];
};

OTIEBrowser.prototype.adjustLinkNode = function(link){
    
    var linkLine=link.select(".linkline");
    var x1=Number(linkLine.attr("x1"));
    var y1=Number(linkLine.attr("y1"));
    var x2=Number(linkLine.attr("x2"));
    var y2=Number(linkLine.attr("y2"));
    
    if(x1!==null && x2!==null && y1!==null && y2!==null){
        var nodeList=d3.selectAll(".node");
        var sourceDatum=link.datum().source;
        var sourceNodeGraphic=this.getMatchingGraphic(nodeList,sourceDatum);
        var targetDatum=link.datum().target;
        var targetNodeGraphic=this.getMatchingGraphic(nodeList,targetDatum);

        var sourceRadius=d3.select(sourceNodeGraphic).select(".nodecircle").attr("r");
        var targetRadius=d3.select(targetNodeGraphic).select(".nodecircle").attr("r");

        var sourceCoordinate=this.parseCoordinates(d3.select(sourceNodeGraphic).attr("transform"));
        var targetCoordinate=this.parseCoordinates(d3.select(targetNodeGraphic).attr("transform"));

        x1=parseFloat(sourceCoordinate[0]);
        y1=parseFloat(sourceCoordinate[1]);
        x2=parseFloat(targetCoordinate[0]);
        y2=parseFloat(targetCoordinate[1]);
    
        var color=linkLine.attr("stroke");
        var linkLength=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
        if(linkLength===0)return;
        var x1a=x1+(x2-x1)*(sourceRadius/linkLength);
        var y1a=y1+(y2-y1)*(sourceRadius/linkLength);
        var x2a=x1+(x2-x1)*((linkLength-targetRadius-4)/linkLength);
        var y2a=y1+(y2-y1)*((linkLength-targetRadius-4)/linkLength);
        
        linkLine.attr("x1",x1a);
        linkLine.attr("y1",y1a);
        linkLine.attr("x2",x2a);
        linkLine.attr("y2",y2a);
        
        var arrowWidth=4;
        var arrowHeight=7;
        var x2a1=x2a+((y2-y1)/linkLength)*arrowWidth-((x2-x1)/linkLength)*arrowHeight;
        var y2a1=y2a-((x2-x1)/linkLength)*arrowWidth-((y2-y1)/linkLength)*arrowHeight;
        
        var x2a2=x2a-((y2-y1)/linkLength)*arrowWidth-((x2-x1)/linkLength)*arrowHeight;
        var y2a2=y2a+((x2-x1)/linkLength)*arrowWidth-((y2-y1)/linkLength)*arrowHeight;

        var linkArrow=link.select(".linkarrow");
        linkArrow.attr("stroke",color);
        linkArrow.attr("fill",color);
        
        linkArrow.attr("d","M "+x2a1+" "+y2a1+" L "+x2a+" "+y2a+" L "+x2a2+" "+y2a2+" Z");
        
        var midX=(x1a+x2a)*0.5;
        var midY=(y1a+y2a)*0.5;

        var linkCircle=link.select(".linkcircle");
        linkCircle.attr("cx",midX);
        linkCircle.attr("cy",midY);
        linkCircle.attr("stroke",color);
		
		var linkCircle=link.select(".linkcircle");
        linkCircle.attr("cx",midX);
        linkCircle.attr("cy",midY);
        linkCircle.attr("stroke",color);
		
        itext_dy = midY
        if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || navigator.userAgent.match(/Edge/)) {
            itext_dy = midY+5;
        }
		var itext=link.select(".i_text");
        itext.attr("dx",midX);
        itext.attr("dy",itext_dy);
		
		
		

        <!-- if(link[0][0].__data__.text){ -->
		<!-- var linkCross=link.select(".linkcross"); -->
		<!-- linkCross.append('text') -->
			<!-- .attr("cx", midX) -->
			<!-- .attr("cy", midY) -->
			<!-- .text('i'); -->
		
            <!-- <!-- var linkCross=link.select(".linkcross"); --> -->
            <!-- <!-- //linkCross.attr("d","M "+(midX-5)+" "+(midY)+" L "+(midX+5)+" "+(midY)+" M "+(midX)+" "+(midY-5)+" L "+(midX)+" "+(midY+5)+""); //Plus Sign --> -->
            <!-- <!-- linkCross.attr("d","M "+(midX)+" "+(midY-5)+" L "+(midX)+" "+(midY- 2.5)+" M "+(midX) +" "+(midY-1)+" L "+(midX)+" "+(midY+5)+""); // i --> -->
            <!-- <!-- linkCross.attr("stroke",'blue'); --> -->
        <!-- } -->
    }
};

OTIEBrowser.prototype.getMatchingGraphic = function(objectList,datum){
    for(var index=0;index<objectList.size();index++){
        if(d3.select(objectList[0][index]).datum()===datum){
            return objectList[0][index];
        }
    }
    return null;
};

OTIEBrowser.prototype.newObjectMotion = function(guiObject,dataObject,radians,level){
    var THIS=this;
       
    d3GUIObject=d3.select(guiObject);
    d3DataObject=d3.select(dataObject);

    var lineLength=this.getLineLength(level);
    var nodeCoordiante=this.getNodeCoordinate(radians,lineLength);
    var dx=nodeCoordiante[0];
    var dy=nodeCoordiante[1];
    
    var selectedObjectCircle=d3GUIObject.selectAll(".nodecircle");
    selectedObjectCircle.attr("r","0");
    selectedObjectCircle.transition("grow").duration(this.transitionTime).attr("r",this.edgeSize);
    
    var selectedObjectCircleShadow=d3GUIObject.selectAll(".nodecircleshadow");
    selectedObjectCircleShadow.attr("r","0");
    selectedObjectCircleShadow.transition("growshadow").duration(this.transitionTime).attr("r",this.edgeSize);
    
    d3GUIObject.attr("transform","translate("+this.center.x+","+this.center.y+")");
    var groupTransition=d3GUIObject.transition();
    groupTransition.duration(this.transitionTime).attr("transform","translate("+(THIS.center.x+dx)+","+(THIS.center.y+dy)+")");
    groupTransition.tween("linetween", function(datum,index) {
        return function(time) {
            var linkList = THIS.svgPanel.selectAll(".link");
            for(var index=0;index<linkList.size();index++){
                var link=d3.select(linkList[0][index]);
                if(datum.id===link.datum().source.id){
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        THIS.adjustLinkNode(link);
                    }
                }
                
                if(datum.id===link.datum().target.id){
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        THIS.adjustLinkNode(link);
                    }
                }
            }  
        };
    });
    
    var nodeText=d3GUIObject.select(".nodetext");
    nodeText.attr("font-size",0);
    var nodeTextTransition=nodeText.transition();
    nodeTextTransition.duration(this.transitionTime).attr("font-size",this.fontSize);
    
    var tspanList=nodeText.selectAll("tspan");
    nodeText.attr("dy",0);
    nodeTextTransition.attr("dy",(tspanList.size()-1)*(-6)+3);
    for(var index=1;index<tspanList[0].length;index++){
        d3.select(tspanList[0][index]).attr("dy",0);
        d3.select(tspanList[0][index]).transition().duration(this.transitionTime).attr("dy",15);
    }
};

OTIEBrowser.prototype.oldObjectMotion = function(guiObject,radians,level){
    var THIS=this;
  
    var lineLength=this.getLineLength(level);
    var nodeCoordiante=this.getNodeCoordinate(radians,lineLength);
    var dx=nodeCoordiante[0];
    var dy=nodeCoordiante[1];
    
    d3Object=d3.select(guiObject);
    var selectedObjectCircle = d3Object.selectAll(".nodecircle");
    d3.select(selectedObjectCircle.node().parentNode).attr('cursor', 'pointer');
    selectedObjectCircle.transition("shrink").duration(this.transitionTime).attr("r",this.edgeSize);
    
    var selectedObjectCircleShadow = d3Object.selectAll(".nodecircleshadow");
    selectedObjectCircleShadow.transition("shrink").duration(this.transitionTime).attr("r",this.edgeSize);
    
    var nodeText=d3Object.select(".nodetext");
    var nodeTextTransition=nodeText.transition();
    nodeTextTransition.duration(this.transitionTime).attr("font-size",this.fontSize);
	
	var selectedObjectImage = d3Object.select('.nodeimage');
	selectedObjectImage=selectedObjectImage.transition("expand");
	selectedObjectImage.duration(this.transitionTime);
	// Need to make the bird image a little bigger to match the others and fully center all; manually setting works for now.
	selectedObjectImage.attr('x', function(d) {
		if (d.id < 100 && d.id > 10) {
			return -47;
		} else {
			return -38;
		}
	});
	selectedObjectImage.attr('y', function(d) {
		if (d.id < 100 && d.id > 10) {
			return -44;
		} else {
			return -43;
		}
	});
	selectedObjectImage.attr('width', function(d) {
		if (d.id < 100 && d.id > 10) {
			return 95;
		} else {
			return 84;
		}
	});
	selectedObjectImage.attr('height', function(d) {
		if (d.id < 100 && d.id > 10) {
			return 95;
		} else {
			return 84;
		}
	});
	
    
    var groupTransition=d3Object.transition().duration(this.transitionTime).attr("transform","translate("+(THIS.center.x+dx)+","+(THIS.center.y+dy)+")");
    groupTransition.tween("linetween", function(datum,index) {
        
        return function(time) {
            var linkList = THIS.svgPanel.selectAll(".link");
            for(var index=0;index<linkList.size();index++){
                var link=d3.select(linkList[0][index]);
                if(datum.id===link.datum().source.id){
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        THIS.adjustLinkNode(link);
                    }
                }
                
                if(datum.id===link.datum().target.id){
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        THIS.adjustLinkNode(link);
                    }
                }
            }  
        };
    });
    
    var tspanList=nodeText.selectAll("tspan");
    nodeTextTransition.attr("dy",(tspanList.size()-1)*(-6)+3);
    for(var index=1;index<tspanList[0].length;index++){
        d3.select(tspanList[0][index]).transition().duration(this.transitionTime).attr("dy",15);
    }
};

OTIEBrowser.prototype.clickedObjectMotion = function(object){
    var THIS=this;
 
    d3Object=d3.select(object);

    var selectedObjectCircle=d3Object.selectAll(".nodecircle");
    d3.select(selectedObjectCircle.node().parentNode).attr('cursor', 'default');
    var selectedObjectCircle=selectedObjectCircle.transition("expand");

    selectedObjectCircle.duration(this.transitionTime);
    selectedObjectCircle.attr("r",this.centerSize);
    
    var selectedObjectCircleShadow=d3Object.selectAll(".nodecircleshadow");
    var expandTransition2=selectedObjectCircleShadow.transition("expand");
    expandTransition2.duration(this.transitionTime);
    expandTransition2.attr("r",this.centerSize);
	
	var selectedObjectImage = d3Object.select('.nodeimage');
	selectedObjectImage=selectedObjectImage.transition("expand");
	selectedObjectImage.duration(this.transitionTime);
	selectedObjectImage.attr('width', 106);
	selectedObjectImage.attr('height', 106);
	selectedObjectImage.attr('y', -53);
	selectedObjectImage.attr('x', function(d) {
		//if (d.id < 100 && d.id > 10) {
		if (d.id > 10) {
			return -52
		} else {
			return -49
		}
	});


    //selectedObjectCircle[0][0].parentNode.attr("cursor", "default");
    
    var groupTransition=d3Object.transition();
    groupTransition.duration(this.transitionTime);
    groupTransition.attr("transform","translate("+(THIS.center.x)+","+(THIS.center.y)+")");
    
    var nodeText=d3Object.select(".nodetext");
    var nodeTextTransition=nodeText.transition();
    nodeTextTransition.duration(this.transitionTime);
    nodeTextTransition.attr("font-size",this.fontSize*1.4);
	
	
    
    var tspanList=nodeText.selectAll("tspan");
    nodeTextTransition.attr("dy",(tspanList.size()-1)*(-8)+3);
    for(var index=1;index<tspanList[0].length;index++){
        d3.select(tspanList[0][index]).transition().duration(this.transitionTime).attr("dy",19);
    }
    
    groupTransition.tween("linetween", function(datum,index) {
        return function(time) {
            var linkList = THIS.svgPanel.selectAll(".link");
            for(var index=0;index<linkList.size();index++){
                var link=d3.select(linkList[0][index]);
                if(datum.id===link.datum().source.id){
                    
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        var linkLine=d3.select(linkList[0][index]).select(".linkline");
                        linkLine.attr("stroke",THIS.outboundColor);
                        
                        THIS.adjustLinkNode(link);
                    }
                }
                if(datum.id===link.datum().target.id){
                    var coordinates=THIS.parseCoordinates(d3.select(this).attr("transform"));
                    if(coordinates!=null){
                        var linkLine=d3.select(linkList[0][index]).select(".linkline");
                        linkLine.attr("stroke",THIS.inboundColor);
                        
                        THIS.adjustLinkNode(link);
                    }
                }
            }  
        };
    });
};

OTIEBrowser.prototype.parseCoordinates=function(translateString){
    
    if(translateString===null)return null;
    
    var opIndex=translateString.indexOf("(");
    var commaIndex=translateString.indexOf(",");
    if(commaIndex===-1){
        commaIndex=translateString.indexOf(" ");
    }
    var cpIndex=translateString.indexOf(")");
    var x=translateString.slice(opIndex+1,commaIndex).trim();
    var y=translateString.slice(commaIndex+1,cpIndex).trim();
   
    return [x,y];
};

OTIEBrowser.prototype.addLinkGraphics = function (newLinksList) {
    var THIS=this;
    var groupList=newLinksList.insert("g",".link");
    groupList.attr("class", "link");
    
    var line=groupList.append("line");
    line.attr("class", "linkline");
    line.attr("stroke",this.inboundColor);
    line.attr("stroke-width",4);
    
    var line=groupList.append("path");
    line.attr("class", "linkarrow");
    line.attr("stroke",this.inboundColor);
    line.attr("stroke-width",4);
    line.attr("d","M 0 0 L 10 10 L 10 0");

    groupList.each(function(link){
        if(link.text){
            var circle=d3.select(this).append("circle");
            circle.attr("class", "linkcircle");
            circle.attr("r", 10);
            circle.attr("stroke",this.inboundColor);
            circle.attr("fill","#6666ff");
            circle.attr("stroke-width",3);
			circle.attr("cursor", "pointer");
            circle.on("click",function(dataObject){THIS.showLinkOverlay(this,dataObject);});
        }
    });
    
    <!-- groupList.each(function(link){ -->
        <!-- if(link.text){ -->
            <!-- //var line=groupList.append("path"); -->
            <!-- var line=d3.select(this).append("path"); -->
            <!-- line.attr("class", "linkcross"); -->
            <!-- line.attr("stroke",this.inboundColor); -->
            <!-- line.attr("stroke-width",2); -->
            <!-- line.attr("d","M -10 0 L 10 0 M 0 -10 L 0 10"); -->
            <!-- line.on("click",function(dataObject){THIS.showLinkOverlay(this,dataObject);}); -->
        <!-- } -->
    <!-- }); -->
	
	groupList.each(function(link){
        if(link.text){
            //var line=groupList.append("path");
            var i_text=d3.select(this).append("text");
            i_text.text('i');
			i_text.attr("class", "i_text");
			i_text.on("click",function(dataObject){THIS.showLinkOverlay(this,dataObject);});
			
			
        }
    });
	
};

OTIEBrowser.prototype.addNodeGraphics = function (newNodesList) {
    var THIS=this;
    
    var groupList=newNodesList.insert("g", ".node");
    groupList.attr("class", "node");
    groupList.attr("cursor", "pointer");
    groupList.on("click",function(dataObject){
        THIS.update(dataObject.id);
    });
  
    var shadowCircleList=groupList.append("circle");
    shadowCircleList.attr("class", "nodecircleshadow");
    shadowCircleList.attr("r", this.edgeSize);
    shadowCircleList.attr("fill","darkgrey");
    shadowCircleList.attr("stroke","darkgrey");
    shadowCircleList.attr("cx","2");
    shadowCircleList.attr("cy","2");
    shadowCircleList.attr("stroke-width",2);
    
    var circleList=groupList.append("circle");
    circleList.attr("class", "nodecircle");
    circleList.attr("r", this.edgeSize);
    circleList.attr("stroke","grey");
    circleList.attr("fill","white");
    circleList.attr("stroke-width",2);
	
	var imageList=groupList.append("svg:image");

	// Need to make the bird image a little bigger to match the others and fully center all; manually setting works for now.
	imageList.attr('x', function(d) {
		if (d.id >= 100) {
			return -37;
		} else if (d.id < 100 && d.id > 10) {
			return -47;
		} else {
			return -39;
		}
	});
	imageList.attr('y', function(d) {
		if (d.id >= 100) {
			return -38;
		} else if (d.id < 100 && d.id > 10) {
			return -44;
		} else {
			return -43;
		}
	});
	imageList.attr('width', function(d) {
		if (d.id >= 100) {
			return 78;
		} else if (d.id < 100 && d.id > 10) {
			return 95;
		} else {
			return 84;
		}
	});
	imageList.attr('height', function(d) {
		if (d.id >= 100) {
			return 78;
		} else if (d.id < 100 && d.id > 10) {
			return 95;
		} else {
			return 84;
		}
	});
	
	// imageList.attr('x', -this.edgeSize*1.6/2.0)
	// imageList.attr('y', -this.edgeSize*1.6/2.0)
	// imageList.attr('width', this.edgeSize*1.6)
	// imageList.attr('height', this.edgeSize*1.6)
	imageList.attr("xlink:href", function(d) {
		if (d.id < 10) {
			return "./images/leaf.png";
		}
		else if (d.id < 100) {
			return "./images/bird.png";
		}
		else {
			return "https://upload.wikimedia.org/wikipedia/commons/5/57/Caduceus.svg";
		}
		})
	imageList.style("opacity", function(d) {
		if (d.id >= 100) {
			return .25;
		}
		else {
			return .85;
		}
	});
	imageList.attr('class', 'nodeimage');
	
    
    circleList.each(function(node){
        THIS.setCircleColor(node.id,d3.select(this));
    });
    
    groupList.each(function(node){
		//pixelsBetwweenRows also needs to be changed on transition (currently line 851 and 901 and 932 for center node)
        THIS.insertTitleLineBreaksCircle(d3.select(this), node.title, THIS.edgeSize, 15, node.color);
    });
};

OTIEBrowser.prototype.setCircleColor=function(id,d3Circle){
    if(this.getNumberOfEdges(id)>1){
        //d3Circle.attr("stroke","#4D8E4D");
        d3Circle.attr("stroke","grey");
    }
};

OTIEBrowser.prototype.getNumberOfEdges=function(id){
    var count=0;
    for(var edgeIndex=0;edgeIndex<this.graph.edges.length;edgeIndex++){
        if(this.graph.edges[edgeIndex].source===id || this.graph.edges[edgeIndex].target===id){
            count++;
        }
    }
    return count;
};

OTIEBrowser.prototype.insertTitleLineBreaksCircle = function (group, title, radius, pixelsBewteenRows, colorString) {
    var trimmedTitle=title.trim();
    var fullLength=this.getTextLengthInPixels(title);
    var wordLength=[];
    var wordList = trimmedTitle.split(/\s+/g);
    
    //beak hyphenated words
    for (var index = 0; index < wordList.length; index++) {
        var hyphenIndex=wordList[index].indexOf("-");
        if(hyphenIndex>0){
            var wordA=wordList[index].substring(0,hyphenIndex+1);
            var wordB=wordList[index].substring(hyphenIndex+1);
            wordList.splice(index,1,wordA,wordB);
        }
    }
    // break slashed words
    for (var index = 0; index < wordList.length; index++) {
        var slashIndex=wordList[index].indexOf("/");
        if(slashIndex>0){
            var wordA=wordList[index].substring(0,slashIndex+1);
            var wordB=wordList[index].substring(slashIndex+1);
            wordList.splice(index,1,wordA,wordB);
        }
    }
    
    // find word lengths
    var lengthWithoutSpaces=0;
    for (var index = 0; index < wordList.length; index++) {
        wordLength[index]=this.getTextLengthInPixels(wordList[index]);
        lengthWithoutSpaces+=wordLength[index];
    }
    
    // find space length
    var spaceLength=(fullLength-lengthWithoutSpaces)/(wordList.length-1);
    if(spaceLength === Math.NaN){
        spaceLength=0;
    }
    
    // find middle word
    var middleWordIndex=0;
    var lengthTillNow=0;
    for (var index = 0; index < wordList.length; index++) {
        lengthTillNow+=wordLength[index];
        if(lengthTillNow>fullLength/2){
            middleWordIndex=index;
            break;
        }
        lengthTillNow+=spaceLength;
    }
    
    // creates middle string
    var circleWords=[];
    var middleString=wordList[middleWordIndex];
    var offset=0;
    var stopLeft=false;
    var stopRight=false;
    var leftIndex=middleWordIndex;
    var rightIndex=middleWordIndex;
    var space=radius*2;
    while(this.getTextLengthInPixels(middleString)<space && offset<wordList.length/2){
        offset++;
        if(middleWordIndex+offset<wordList.length && !stopRight){
            newMiddleString=middleString;
            if(newMiddleString.charAt(newMiddleString.length-1)!=="-" && newMiddleString.charAt(newMiddleString.length-1)!=="/"){
                newMiddleString+=" ";
            }
            newMiddleString+=wordList[middleWordIndex+offset];         
            if(this.getTextLengthInPixels(newMiddleString)>space){
                stopRight=true;
            }else{
                rightIndex=middleWordIndex+offset;
                middleString=newMiddleString;
            }
        }
        if(middleWordIndex-offset>-1 && !stopLeft){
            newMiddleString=wordList[middleWordIndex-offset];
            if(newMiddleString.charAt(newMiddleString.length-1)!=="-" && newMiddleString.charAt(newMiddleString.length-1)!=="/"){
                newMiddleString+=" ";
            }
            newMiddleString+=middleString; 
            if(this.getTextLengthInPixels(newMiddleString)>space){
                stopLeft=true;
            }else{
                leftIndex=middleWordIndex-offset;
                middleString=newMiddleString;
            }
        }
    };
    circleWords.push(middleString);
 
    // find word segments to the left
    leftIndex--;
    var row=0;
    while(leftIndex>-1){
        
        var rowString=wordList[leftIndex];
        leftIndex--;
        row++;
        space=Math.sqrt(Math.pow(radius,2)-Math.pow(row*pixelsBewteenRows,2))*2; 
        
        if(isNaN(space)){
            console.log("Out of space in the circle.");
            break;
        }
        
        while(this.getTextLengthInPixels(rowString)<space && leftIndex>-1){
            newRowString=wordList[leftIndex];
            if(newRowString.charAt(newRowString.length-1)!=="-" && newRowString.charAt(newRowString.length-1)!=="/"){
                newRowString+=" ";
            }
            newRowString+=rowString; 
            if(this.getTextLengthInPixels(newRowString)>space){
                break;
            }else{
                rowString=newRowString;
                leftIndex--;
            }
        }
        circleWords.splice(0,0,rowString);
    }
    
    // find word segments to the right
    rightIndex++;
    var row=0;
    while(rightIndex<wordList.length){
        var rowString=wordList[rightIndex];
        rightIndex++;
        row++;
        space=Math.sqrt(Math.pow(radius,2)-Math.pow(row*pixelsBewteenRows,2))*2; 
    
        if(isNaN(space)){
            console.log("Out of space in the circle");
            break;
        }
        
        while(this.getTextLengthInPixels(rowString)<space && rightIndex<wordList.length){
            newRowString=rowString;
            if(newRowString.charAt(newRowString.length-1)!=="-" && newRowString.charAt(newRowString.length-1)!=="/"){
                newRowString+=" ";
            }
            newRowString+=wordList[rightIndex]; 
            if(this.getTextLengthInPixels(newRowString)>space){
                break;
            }else{
                rowString=newRowString;
                rightIndex++;
            }
        }
        circleWords.push(rowString);
    }
    
    var text = group.append("text");
    text.attr("class", "nodetext");
    if(colorString){
        text.attr("fill",colorString);
    }else{
        text.attr("fill","black");
    }
    text.attr("font-family",this.nodeFontFamily);
    text.attr("text-anchor","middle");
	text.style('font-weight', '700');
    text.attr("font-size",this.fontSize);
 
    text.attr("dy", ((wordList.length-1)*(-pixelsBewteenRows/2)+3));
	
    for (var index = 0; index < circleWords.length; index++) {
		
        var tspan = text.append("tspan");
        tspan.text(circleWords[index]);
        
        if (index > 0){
            tspan.attr("x", 0);
            tspan.attr("dy", ""+pixelsBewteenRows);
        }
    }
};

OTIEBrowser.prototype.getTextLengthInPixels = function (title){
    var text=document.createElementNS(svgns,"text");
    text.class="nodetext";
    text.fill="black";
    text.fontFamily=this.nodeFontFamily;
    text.textAnchor="middle";
    text.fontSize=this.fontSize;
    var tspantext=document.createElementNS(svgns,"tspan");
    var textNodetest=document.createTextNode(title);
    tspantext.appendChild(textNodetest);
    text.appendChild(tspantext);
    this.svgPanelW.w.appendChild(text);
    var length = tspantext.getComputedTextLength();
    this.svgPanelW.w.removeChild(text);
    
    return length;
};