(function ($) {

	"use strict";

	// Preload	
	$(window).load(function() {
		$('#status').delay(300).fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});
	

	$(".scroll").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
	});


	/*here stars scrolling icon*/
	/*
		var defaults = {
		containerID: 'toTop', // fading element id
		containerHoverID: 'toTopHover', // fading element hover id
		scrollSpeed: 1200,
		easingType: 'linear' 
		};
	*/

	$().UItoTop({ easingType: 'easeOutQuart' });

	
	/*Baneer-js*/
	$("#slider").responsiveSlides({
		auto: true,
		pager:false,
		nav: true,
		speed: 1000,
		namespace: "callbacks",
		before: function () {
			$('.events').append("<li>before event fired.</li>");
		},
		after: function () {
			$('.events').append("<li>after event fired.</li>");
		}
	});


	/*banner bottom video script*/
	$("#video").simplePlayer();


	/*Stats-Number-Scroller-Animation-JavaScript*/
	$('.counter').counterUp({
		delay: 100,
		time: 1000
	});


	/*FlexSlider-JavaScript*/
	$(window).load(function(){
		$('.flexslider').flexslider({
			animation: "slide",
			start: function(slider){
				$('body').removeClass('loading');
			}
		});
	});


	$('#horizontalTab').easyResponsiveTabs({
		type: 'default', //Types: default, vertical, accordion           
		width: 'auto', //auto or any width like 600px
		fit: true   // 100% fit in a container
	});

	// remove buton play video	
	
	$(window).load(function(){
		$("#play").remove();
	});	

	
	$("#phoneWhatsapp").click(function(){

		var href  = "https://web.whatsapp.com/send?phone=51999694785&text=";

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			href = "whatsapp://send?phone=51999694785&text=";
		}

		window.location.assign(href);

	});
	
	
	$("body").on("click", ".btnFormCotizar", function(){

		var producto = $(this).parent("div").parent("div").children("h4").text().trim();
		$("#txtAsunto").val("cotización de "+producto);

	});
	
	
	$("#btnContactar").click(function(){
	
		var params=Parametros();

		if(params !==null && typeof params === 'object'){

			$.ajax({
				url: $.ApiRoute("/mensaje/send-email"),  
				type: "POST",
				data: params,
				beforeSend: function(){
					$("#btnContactar").attr("disabled","");
					$("#btnContactar").val("PROCESANDO");
				}
			})
			.done(function(response){

				$("#btnContactar").removeAttr("disabled");
				$("#btnContactar").val("ENVIAR");
				
				if (response.success) {

					if (response.error > "0") {
						$("#mensaje").show();
						$("#mensaje").text(response.message[0]);
					}else{
						alert(response.message[0]);
						LimpiarFormulario();
					}
					
				} else {
					alert("Ocurrio un error por favor vuelva a intentarlo");
				}

			})
			//si ha ocurrido un error
			.fail(function(jqXHR,textStatus){
				$("#btnContactar").removeAttr("disabled");
				$("#btnContactar").val("ENVIAR");
				alert("Ocurrio un error por favor vuelva a intentarlo");
			});

		}
	});
	
	
	$("#ModalCotizacion").on("click", ".btnEnviarCotWhatsapp", function(){

		var params=Parametros();

		if(params !==null && typeof params === 'object'){

			var mensaje  = params.mensaje.charAt(0).toUpperCase() + params.mensaje.slice(1).toLowerCase();

			var msj = "";
			msj += Saludo()+" soy "+params.nombre+" y requiero "+params.asunto+"\n";
			msj += mensaje+"\n";
			msj = encodeURIComponent(msj);

			var href  = "https://web.whatsapp.com/send?phone=51999694785&text="+msj;

			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
				href = "whatsapp://send?phone=51999694785&text="+msj;
			}

			window.open(href, "blank");

		}
	});
	

	$("#ModalCotizacion").on("click", ".btnEnviarCotEmail", function(){

		var params=Parametros();

		if(params !==null && typeof params === 'object'){

			$.ajax({
				url: $.ApiRoute("/cotizacion/send-email"),  
				type: "POST",
				data: params,
				beforeSend: function(){
					$(".form").hide();
					$(".respuesta").show();
					$(".respuesta").children("div").html(MsjProcesando("PROCESANDO"));
				}
			})
			.done(function(response){

				if (response.success) {
					
					if (response.error > "0") {
						$(".form").show();
						$(".respuesta").hide();
						$("#mensaje").show();
						$("#mensaje").text(response.message[0]);
					}else{
						$(".respuesta").children("div").html(MsjConfirmacion(response.message[0]));
					}
					
				} else {
					$(".respuesta").children("div").html(MsjError("OCURRIO UN ERROR POR FAVOR VUEVA A INTENTARLO"));
				}

			})
			//si ha ocurrido un error
			.fail(function(jqXHR,textStatus){
				$(".respuesta").children("div").html(MsjError("OCURRIO UN ERROR POR FAVOR VUEVA A INTENTARLO"));
			});

		}
		
	});
	
	
	function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}
	
	
	$("#ModalCotizacion").on("click", ".btnSalir", function(){
		$(".close").trigger("click");
		setTimeout(function(){
			$(".respuesta").hide();
			$(".form").show();
			LimpiarFormulario();
		}, 1000);
		
	});
	
	
	function MsjProcesando(msj){
		var ouput = "";
		ouput += '<i class="fa fa-spinner fa-spin fa-5x"></i>';
		ouput += '<br><br>'+msj;
		return ouput;
	}
	
	function MsjError(msj){
		var ouput = "";
		ouput += '<i class="fa fa-frown-o fa-5x"></i>';
		ouput += '<br><br>'+msj;
		ouput += '<a href="javascript:void(0)" class="btn-full btnSalir" title="Cerrar ventana" style="display: block;">Cerrar ventana</a>';
		return ouput;
	}
	
	function MsjConfirmacion(msj){
		var ouput = "";
		ouput += '<i class="fa fa-check fa-5x"></i>';
		ouput += '<br><br>'+msj;
		ouput += '<a href="javascript:void(0)" class="btn-full btnSalir" title="Cerrar ventana" style="display: block;">Cerrar ventana</a>';
		return ouput;
		
	}
	
	function LimpiarFormulario(){
		
		// Limpiando campos del formulario
		$("#txtAsunto").val("");
		$("#txtNombre").val("");
		$("#txtCorreo").val("");
		$("#txtMensaje").val("");
		$("#mensaje").hide();
		$("#mensaje").text("");
	}
	
	
	function Parametros(){

		var asunto=$("#txtAsunto").val();
		var nombre=$("#txtNombre").val();
		var correo=$("#txtCorreo").val();
		var mensaje=$("#txtMensaje").val();
		// Datos requeridos
		var msg = asunto === "" ? $("#txtAsunto").attr("placeholder") :
		          nombre === "" ? $("#txtNombre").attr("placeholder") :
				  correo === "" ? $("#txtCorreo").attr("placeholder") :
				  !isEmail(correo) ? "Ingrese un correo electrónico valido" :
				  mensaje === "" ? $("#txtMensaje").attr("placeholder") :
				  "";
		// Muestro mensaje o creo el  objeto
		if(msg !== ""){
			$("#mensaje").show();
			$("#mensaje").text(msg);
			$("input[placeholder='"+msg+"']").focus();
		}else{
			//creo el objeto	
			var parametros={
				asunto:asunto,
				nombre:nombre,
				correo:correo,
				mensaje:mensaje
			};
			return parametros;
		}

	}

function Saludo(){
	
	var tiempo = new Date();
	var hora = tiempo.getHours();
	var saludo = hora >= 0 && hora <= 11 ? "Buenos días" :
				 hora >= 12 && hora <= 18 ? "Buenas tardes" :
				 hora >= 19 && hora <= 23 ? "Buenas noches" :
				 "";
	console.log(saludo);
	return saludo;
	
}

	
	
})(jQuery); // JavaScript Document