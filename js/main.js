var main=function(divisionID,graph,graphStartingNode,biographyButtonLink){
    
    var desktop=new WDesktop(divisionID);
    desktop.w.id="MSSB-desktop";
    desktop.w.style.position="relative";
	 var title="<span style=\"font-family: 'Roboto Condensed'; font-size: 13px; font-weight: bold; line-height:30px; width:500px\">Eco-Health Relationship Browser: Public Health Linkages to Ecosystem Services</span>";
    otieBrowser=new OTIEBrowser(title,graph,graphStartingNode,biographyButtonLink);
    desktop.add(otieBrowser);

};