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

console.log(start_node);