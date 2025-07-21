(function ($) {

	"use strict";
	//Invoco
	setTimeout(function(){Detalle();}, 1000);
	setTimeout(function(){ListarFotos();}, 2000);
	
	//============================================================================
	
	function Detalle(params){
		
		$.ajax({
			url: "/data/equipamientoDeportivo.json",
			type: "GET",
			data: params,
			beforeSend: function(){
				$("#horizontalTab").html("Cargando...");
			}
		})
		.done(function(response){

			if (response) {

        console.log(window.location)

        const type = window.location.hash.replace("#", "")

				var output="";

        const item = response.find(e => e.slug === type);


        if (item) {
          $("#asunto").html(item.Nombre,);
          output += '<div class="col-md-12 wow" data-wow-duration="2s" style="padding: 0px 5px;">';
					output += '<img src="'+item.Foto+'" class="img-responsive"/>';
					output += '<h4 style="margin-top: 20px;" id="asunto">';
					output += item.Nombre;
					output += '</h4>';
					output += '<div class="btnCotizar">';
					output += '<a href="#" data-toggle="modal" data-target="#ModalCotizacion" class="btnFormCotizar" style="width: 100%;">';
					output += 'Solicitar cotización';
					output += '</a>';
					output += '</div>';
					output += '</div>';
          if (item.fotos) {
            let output2 = "";
            item.fotos.forEach(e => {
              output2 += '<div class="col-md-4 wow fadeInLeft portfolio-grids portfolio-grid4" data-wow-duration="2s">';
              output2 += '<a href="'+e+'" data-lightbox="example-set" data-title="'+$(document).find("title").text()+'">';
              output2 += '<img src="'+e+'" class="img-responsive zoom-img"/>';
              output2 += '<div class="b-wrapper">';
              output2 += '<h5><i class="fa fa-arrows-alt"></i></h5>';
              output2 += '</div>';
              output2 += '</a>';
              output2 += '</div>';
            });
            $("#galeriaPhotos").html(output2);
          }
        }

				$("#photoPrincipal").html(output);
				
			} else {
				console.log("No se obtuvieron resultados del servidor");
			}

		})
		.fail( function(jqXHR,textStatus){
			console.log("Error del servidor: "+textStatus);
		});
		
	}
	
	//============================================================================
	
	function ListarFotos(params){
		
		//Asigando un valor por defecto si la variable de entrada esta vacia.
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTY0NzI0OTAsImlkVXN1YXJpbyI6IlVTVTAwMDEifQ.RrQIhW5hsKpa_ABhFRp3kMP1smondq7nO4nd8cOrcPs';
		var idProducto = $("#detail").attr("idProducto");
		params || (params={idRegistro:idProducto,token:token});
		
		$.ajax({
			url: $.ApiRoute("/foto/listar-by-idregistro"),
			type: "POST",
			data: params,
			beforeSend: function(){
				$("#horizontalTab").html("Cargando...");
			}
		})
		.done(function(response){

			if (response.success) {

				var output="";
				var i = 1;
				$.each(response.data.items, function(key, value) {
					
					output += '<div class="col-md-4 wow fadeInLeft portfolio-grids portfolio-grid4" data-wow-duration="2s">';
					output += '<a href="'+value.Descripcion+'" data-lightbox="example-set" data-title="'+$(document).find("title").text()+'">';
					output += '<img src="'+value.Descripcion+'" class="img-responsive zoom-img"/>';
					output += '<div class="b-wrapper">';
					output += '<h5><i class="fa fa-arrows-alt"></i></h5>';
					output += '</div>';
					output += '</a>';
					output += '</div>';
					i++;
					
				});

				$("#galeriaPhotos").html(output);
				
			} else {
				console.log("No se obtuvieron resultados del servidor");
			}

		})
		.fail( function(jqXHR,textStatus){
			console.log("Error del servidor: "+textStatus);
		});
		
	}

})(window.$); // JavaScript Document