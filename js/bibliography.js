

jQuery(document).ready(function() {
	
	function make_data_table(searchterm, is_direct_link) {
		
		var table = jQuery('#bibliography_table').DataTable({ 
					
			"dom": '<"top"pfli>rt<"clear">',
			"data": content,
			"bAutoWidth": false,
			"language": {
				"info": "_TOTAL_ citations",
				"infoEmpty":"0 citations found",
				"infoFiltered":   "(filtered from _MAX_ total citations)"
			},
			"paging": false,
			"pagingType": "numbers",
			"oSearch": {"sSearch": searchterm},
			"pageLength": 50,
			"order": [[ 2, 'asc' ]],
			columns: [
				{"visible": false, className: "shown"},
				{"visible": false},
				{ title: "Citations (Click citation for abstract)"},
				{ className: "none"}
			], 
			"columnDefs": [
				{"orderable": false, "targets":[2] },
			],
			
		}); //end dataTable
		
		
		// Add clear search button
		var clear_search = jQuery('<div id="clear_search">Clear Search</div>')
		clear_search.css({'text-decoration':'underline', 'cursor':'pointer', 'float':'right'})
					.click(function() {
							table.search('').draw();
						})
					.appendTo('#bibliography_table_filter');
		
		// If direct link then open abstract.
		if (is_direct_link) {
			table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
		}
		
		// Turn off loading text
		jQuery( "#loading" ).hide();

	}

var content = eco_health_bib_content.map(function(a) {return ["", a.ID, a.CITATION, a.ABSTRACT];});

var hash = window.location.hash;
var is_direct_link = 0
if (hash.substring(1) != "") {is_direct_link = 1;}
make_data_table(hash.substring(1), is_direct_link);

}); // end ready function

