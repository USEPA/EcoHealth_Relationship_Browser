

jQuery(document).ready(function() {
	
	function make_data_table(searchterm, is_direct_link) {
		
		var table = jQuery('#bibliography_table').DataTable({ 
					
			"dom": '<"top"flip>rt<"clear">',
			"data": content,
			"bAutoWidth": false,
			"language": {
				"info": "_TOTAL_ citations",
				"infoEmpty":"0 citations found",
				"infoFiltered":   "(filtered from _MAX_ total citations)"
			},
			"paging": true,
			"pagingType": "simple_numbers",
			"oSearch": {"sSearch": searchterm},
			"pageLength": 10,
			"order": [[ 1, 'asc' ]],
			columns: [
				{"visible": false, className: "shown"},
				{"visible": false},
				{ title: "Citations (Click citation to open/close abstract)"},
				{ className: "none"}
			], 
			responsive: {
            details: {
                renderer: function ( api, rowIdx, columns ) {
                    var data = $.map( columns, function ( col, i ) {
                        return col.hidden ?
                            '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
                                '<td style="border:none">'+col.data+'</td> '+
                            '</tr>' :
                            '';
                    } ).join('');
 
                    return data ?
                        $('<table/>').append( data ) :
                        false;
					}
				}
			},

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

jQuery('.dtr-data').css({'display': 'block', 'color': 'green'})
jQuery('.dtr-title').css({'display': 'block', 'color': 'red'})


var hash = window.location.hash;
var is_direct_link = 0
if (hash.substring(1) != "") {is_direct_link = 1;}
make_data_table(hash.substring(1), is_direct_link);

}); // end ready function

