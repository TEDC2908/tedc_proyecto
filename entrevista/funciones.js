var numAleatorio = Math.floor(Math.random() * (5)) + 1;
var longPalabra=0;
var contadorPalabras = 0;
var equivocaciones=0;

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
					$("#letras-palabra").append('<input id='+i+' type=text size=1>');
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
					//Con el sigueinte if validamos la letra y el input text donde se escribio
							if(String.fromCharCode(e.which) == palabraSeparada[$(this).attr("id")] && textFocus == $(this).attr("id")){
							//Si es correcta la letra hacemos lo siguiente:
							$("#mensajesSistema").html("<p>Correcto</p>")
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
				if(contadorPalabras ==2){
					$("#frase").hide();
					$("#letras-palabra").hide();
					$("#mensajesSistema").hide();
					$("#intentos").hide();
					$("#mostrarAyuda").hide();
					$("#resultados").append("<p>Cometitaste "+equivocaciones+" equivocaciones</p>");
					$("#resultados").append("<p>Tu calificacion es: </p>");
				}

			}
		});
	},
	error: function(){
		$("#letras-palabra").text("Error al obtener xml");
	}
});


}