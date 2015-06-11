var numAleatorio = Math.floor(Math.random() * (5)) + 1;
var longPalabra=0;
var contadorPalabras = 0;
var equivocaciones=0;
var numeroPalabras=5;

$(document).ready(principal(numAleatorio));

function principal(numeroAle){
	console.log("Se han cometido: "+equivocaciones);
$.ajax({ // Con la funcion ajax cargamos el XML
	url: 'entrevista.xml',
	dataType: 'xml',
	//Funcion de exito
	success: function(dato){
		//Obtenemos el nodo hijo pregunta
		$(dato).find('entrevista pregunta').each(function(){
			//Obtenemos el nivel
			var pregunta = $(this).attr('nivel');
			//Como ejemplo utilizamos el nivel 1-1, luego se hara aleatoriamente
			
			console.log(numeroAle);
			if(pregunta == "1"+numeroAle){
				longPalabra = $(this).attr('palabra').length;
				var palabraSeparada = $(this).attr('palabraSeparada').split(",");
				var ayuda = $(this).attr('ayuda');
				//console.log(palabraSeparada);
				$("#frase").append("<p>"+$(this).attr('frase')+"</p>");
				//Creamos los input text deacuerdo al numero de letras de la palabra
				for(i = 0;i < longPalabra; i++){
					$("#letras-palabra").append('<input id='+i+' type=text size=1 class="inputcentrado">');
				}
				//$(':input:enabled:visible:first').focus();
				$("#mostrarAyuda").click(function(){
					alert(ayuda);
				});

				var inputLetra = $("input");
				var textFocus;
				inputLetra.focus(function (e){
				textFocus = $(this).attr('id');
				//console.log($(this).attr('id'));
				});
				var errores=2; //Establecemos los intentos permitidos
				$("#intentos").html("<p>Intentos: "+errores+"</p>");
				
				//Disparamos un evento si se teclea algo dentro de los input text
				inputLetra.keypress(function (e){
					//console.log($(this).attr('id'));
					//Con el sigueinte if vali8damos la letra y el input text donde se escribio
						if(e.which == 13 || e.which == 8 || e.which == 32 ){
							console.log("Se pulso una tecla nula");
							return false;
						}
							if(String.fromCharCode(e.which) == palabraSeparada[$(this).attr("id")] && textFocus == $(this).attr("id")){
							//Si es correcta la letra hacemos lo siguiente:
							$("#mensajesSistema").html("<p>Correcto</p>")
							$(this).addClass("inputColorVerde")
							$(this).val(String.fromCharCode(e.which));
							$(this).prop('disabled',true);
							if($(this).attr('id') != longPalabra-1){
								$(this).next().focus();
							}else{
								alert("Palabra Completa");
								var numAleatorio2 = Math.floor(Math.random() * (5)) + 1;
								$("#frase").html('');
								$("#letras-palabra").html('');
								principal(numAleatorio2);
								contadorPalabras +=1;
								console.log("La cuenta va en:"+contadorPalabras);

							}
							errores=2;
							$("#intentos").html("<p>Intentos: "+errores+"</p>");

							}else{
							//Si es incorrecta, lo siguiente:
							$(this).addClass("inputColorRojo");
							if(errores >1 ){ //Verifiamos si aun le quedan intentos
								$("#mensajesSistema").html("<p>Vuelve a intentar</p>");
								$(this).val('');
								errores -=1; //Si le quedan lo dejamos intentar y restamos un intento
								$("#intentos").html("<p>Intentos: "+errores+"</p>");	
							}else{ //Si ya no le quedan intentos
								$(this).val('');
								$(this).prop('disabled',true);
								$(this).val(palabraSeparada[$(this).attr("id")]); //Ponemos la letra correcta
								equivocaciones +=1;
								if($(this).attr('id') != longPalabra-1){
								$(this).next().focus();
							}else{
								alert("Palabra Completa");
								var numAleatorio2 = Math.floor(Math.random() * (5)) + 1;
								$("#frase").html('');
								$("#letras-palabra").html('');
								principal(numAleatorio2);
								contadorPalabras +=1;
								console.log("La cuenta va en: "+contadorPalabras);

							}
								errores = 2;//Restablecemos los intentos
								$("#intentos").html("<p>Intentos: "+errores+"</p>");
							}
							
							}

										
				});
				if(contadorPalabras ==numeroPalabras){
					$("#frase").hide();
					$("#letras-palabra").hide();
					$("#mensajesSistema").hide();
					$("#intentos").hide();
					$("#mostrarAyuda").hide();
					$("#resultados").append("<p>De :"+contadorPalabras+" contestadas</p>")
					$("#resultados").append("<p>Cometitaste "+equivocaciones+" equivocaciones</p>");
					var calificacion = ((contadorPalabras-equivocaciones)*10)/contadorPalabras;
					$("#resultados").append("<p>Tu calificacion es: "+calificacion+"</p>");
					$("#resultados").append('<input type="button" value="Terminar" class="boton" id="terminar">');
					$("#terminar").click(function (){
						$("#resultados").html("<h3>Gracias por su visita</h3>");
					});
					$("#resultados").append('<input type="button" value="Regresar" class="boton" id="regresar">');
					$("#regresar").click(function (){
						location.reload();
					});
				}

			}
		});
	},
	error: function(){
		$("#letras-palabra").text("Error al obtener xml");
	}
});

	
}
