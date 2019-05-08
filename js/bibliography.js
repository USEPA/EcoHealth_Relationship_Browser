var biblio_content = {};


var parent_div = document.getElementById('bibliography_content');

//var tData = JSON.parse(eco_health_bib_content);
//console.log(eco_health_bib_content);

//https://stackoverflow.com/questions/19259233/sorting-json-by-specific-element-alphabetically
eco_health_bib_content.sort( function( a, b ) {
    a = a.CITATION.toLowerCase();
    b = b.CITATION.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
});

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

for (i=0; i<alphabet.length; i++) {
	var letter_anchor = document.createElement('a');
	letter_anchor.name=alphabet[i];

	var letter_span = document.createElement('span');
	letter_span.className='alphabetHeader'
	letter_span.innerHTML=alphabet[i];

	parent_div.appendChild(letter_anchor);
	parent_div.appendChild(letter_span);
	parent_div.appendChild(document.createElement('br'));
	parent_div.appendChild(document.createElement('br'));

	var filtered_entries = eco_health_bib_content.filter(function (e) {
		return e.CITATION.charAt(0).toUpperCase() === alphabet[i]
	});
	
	for (j = 0; j<filtered_entries.length; j++) {
		
		//console.log(filtered_entries);
		var entry = document.createElement('div');
		entry.className='entry';

		var citation = document.createElement('p');
		citation.className='citation';
		citation.style.cursor='pointer';
		citation.style.cursor='hand';
		citation.id=  filtered_entries[j].ID;
		citation.innerHTML = filtered_entries[j].CITATION;
		entry.appendChild(citation);
		

		var entry_abstract = document.createElement('div');
		entry_abstract.className='abstract';
		abstract_p = document.createElement('p');
		abstract_p.innerHTML = filtered_entries[j].ABSTRACT;
		entry_abstract.appendChild(abstract_p);
		entry.appendChild(entry_abstract);

		parent_div.appendChild(entry);
	}


}

