$(function () {
	console.log("Loading zoo");

	function loadZoo(){
		$.getJSON( "/api/zoo/", function( zoo) {
			console.log(zoo);
			for( var i = 1; i < 5; i++) {
				$("#link"+ i).text(zoo[i - 1].specie);
			}
		});
	};

	loadZoo();
	setInterval( loadZoo, 2000);
});
