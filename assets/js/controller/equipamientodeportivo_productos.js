(function ($) {

	"use strict";
	//Invoco
	Consultar();
	
	//============================================================================
	
	function Consultar(){
		
		$.ajax({
			url: "/data/equipamientoDeportivo.json",
			type: "GET",
			beforeSend: function(){
				$("#horizontalTab").html("Cargando...");
			}
		})
		.done(function(response){

			if (response) {
        const type = window.location.pathname.split("/")[2]
				var output="";
        response.filter(e => e.TipoProducto === type).forEach(value => {
          output += '<div class="col-12 col-md-4 wow fadeInLeft portfolio-grids portfolio-grid4" data-wow-duration="2s">';

					
					output += '<img src="'+value.Foto+'" class="img-responsive"/>';
					output += '<h4 style="margin-top: 20px;" id="asunto">';
					output += value.Nombre;
					output += '</h4>';
					output += '<div class="btnCotizar">';
					output += '<a href="/equipamiento-deportivo/#'+value.slug+'" class="btnFormCotizar">';
					output += 'Más información';
					output += '</a>';
					output += '</div>';
					output += '</div>';
        });

				$("#horizontalTab").html(output);
				
			} else {
				console.log("No se obtuvieron resultados del servidor");
			}

		})
		.fail( function(jqXHR,textStatus){
			console.log("Error del servidor: "+textStatus);
		});
		
	}

})(window.$); // JavaScript Document