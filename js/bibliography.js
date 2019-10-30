jQuery(document).ready(function() {
	
	function make_data_table(searchterm) {
		var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		jQuery("#bibliography_table").append('<tfoot><tr><th></th><th></th><th class="table_footer"></th><th></th></tr></tfoot>');
		var table = jQuery('#bibliography_table').dataTable({ 
					
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
			
			
				//{"searchable": false, "targets": [0, 1]}
				{"orderable": false, "targets":[2] },
				{"targets": 1,
					"render": function ( data, type, full, meta ) {
						
						d = data.split('_');
						if (d.length > 1) {
							return  d[1];//meta.row+1;
						} else {
							return 'null'
						}
					} 
				}
			],
			
			
			
			}); //end dataTable
			
		jQuery( "#loading" ).hide();


	}

//console.log(eco_health_bib_content);


var output = eco_health_bib_content.map(function(a) {return ["", a.ID, a.CITATION, a.ABSTRACT];});



var hash = window.location.hash;
console.log(hash);
make_data_table(hash.substring(1));

}); // end ready function

