var start_node = 2; 
//graph_nodes = graph.nodes.map(function (e) { return e.id, e.title; });
if (window.location.hash.length) {
	hash_value = window.location.hash.substring(1);
	hash_value = hash_value.toLowerCase();
		
    for (var i=0; i < graph.nodes.length; i++) {
		var node_title = graph.nodes[i].title;
		node_title = node_title.replace(/\s+/g, '').toLowerCase();	
        if (node_title === hash_value) {
            start_node = graph.nodes[i].id;
        };
    };

}; 


function myFunction() {
	document.getElementById("get_EH_data").style.color = "red";
	var wnd = window.open();
	wnd.document.write('<div style="white-space: pre-wrap;">'+JSON.stringify(graph, null, 4)+'</div>');
}

function newWindow() {
    // create some html elements
    var para = document.createElement('p');
    var title = document.createElement('title');

    // define some window attributes
    var features = 'width=400, height=400, status=1, menubar=1, location=0, left=100, top=100';
    var winName = 'New_Window';

    // populate the html elements
    para.textContent = 'Some example text.';
    title.textContent = 'New Window Title';

    // define a reference to the new window
    // and open it with defined attributes
    var winRef = window.open('', winName, features);

    // append the html elements to the head
    // and body of the new window
    winRef.document.head.appendChild(title);
    winRef.document.body.appendChild(para);
}
