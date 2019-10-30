jQuery(document).ready(function() {
	
	function make_data_table(searchterm, is_direct_link) {
		
		var table = jQuery('#bibliography_table').DataTable({ 
					
			"dom": '<"top"pfli>rt<"clear">',
			"data": output,
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
				{"visible": false},
				{"visible": false},
				{ title: "Citations (Click citation for abstract)" },
				{ className: "none"}//, title: 'Abstract' }
			], 
			"columnDefs": [
				{"orderable": false, "targets":[2] },
			],
			
			
			
			}); //end dataTable
		
		if (is_direct_link) {
			table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
		}
		jQuery( "#loading" ).hide();


	}

var output = eco_health_bib_content.map(function(a) {return ["", a.ID, a.CITATION, a.ABSTRACT];});

var hash = window.location.hash;
var is_direct_link = 0
if (hash.substring(1) != "") {is_direct_link = 1;}
make_data_table(hash.substring(1), is_direct_link);

}); // end ready function

