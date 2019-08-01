jQuery(document).ready(function() {
	
	function make_data_table(searchterm) {
		var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		jQuery("#bibliography_table").append('<tfoot><tr><th></th><th></th><th class="table_footer"></th><th></th></tr></tfoot>');
		var table = jQuery('#bibliography_table').dataTable({ 
			
		
			initComplete: function () {
				this.api().columns().eq(0).each( function ( index ) {
				    if ([2].indexOf(index) > -1) {
		                var column = this.column( index );
						var footer_div = jQuery('<div>').appendTo( jQuery(column.footer()))
						var footer_title = jQuery('<div style="font-size:18px; text-align: center"><p>').text('Search for author or keyword or filter citations by first letter').appendTo(footer_div);
						var alpha_div = jQuery('<div style="text-align: center">').appendTo( footer_div)
						var letter = jQuery('<div class="alphabet" id="">None</span>')
							.on('click', function () {
								jQuery( ".alphabet" ).each(function( i ) {
										jQuery(this).css("color","#0071bc"); //Change color of the div
									});
									jQuery(this).css('color', 'black');
								column.search( "^"+this.id, true, true, true )
								.draw();
							}).appendTo(alpha_div);
						for (i=0; i<alphabet.length; i++) {
							var letter = jQuery( '<div class="alphabet" id="'+alphabet[i]+'">'+alphabet[i]+'</span>' )
								.on('click', function () {
									jQuery( ".alphabet" ).each(function( i ) {
										jQuery(this).css("color","#0071bc"); //Change color of the div
									});
									jQuery(this).css('color', 'black');
								column.search( "^"+this.id, true, true, true )
								.draw();
							}).appendTo(alpha_div);
						}
					}		
				}); // end this.api
			}, // end initComplete
			
			
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

jQuery('.alphabet').css({'margin-right': '12px', 
						 'font-size': '21px',
						 'font-weight': '500',
						 'color': '#0071bc',
						 'text-decoration':'underline',
						 'float':'left',
						 'cursor': 'pointer'});
								   
					

jQuery('#bibliography_table tfoot tr').insertAfter(jQuery('#h1'));
jQuery('.table_footer').css({'background-color': 'transparent',
									 'border': 'none'});

}); // end ready function

