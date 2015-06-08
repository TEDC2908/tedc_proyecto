/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var main = function () {
    $.ajax({
        //obtenemos los datos por metodo get
        type: "GET",
        //indicamos la url donde esta alojado el xml que utilizaremos
        url: "xml/frases.xml",
        //indicamos que se procesara un archivo de tipo xml
        dataType: "xml",
        success: function (xml) {
            //conta es una variable que indicara el nodo al que accederemos en el xml
            var conta = 1;
            //buscamos dentro de nuestro xml el nodo en el padre frases y lo almacenamos en una variable
            var cont = $(xml).find("frases:nth-child(" + conta + ")");
            //lo agregamos al cuerpo del html en el tag p
            $("p").append(cont);
            //agregamos un salto de linea en la etiqueta p
            $("p").append("<br>");
            //separamos las palabras que obtuvimos del xml mediante la funcion split y las colocamos en un array llamado separate
            var separate = cont.text().split(" ");
            //obtenemos un valor random que este en el rango del tamaño del arreglo
            var random = parseInt(Math.random() * separate.length);
            //usamos el valor randow para elegir un arreglo al azar
            var cadena = separate[random];
            //recorremos todo el arreglo, si el valor es igual al random no lo colocamos y en su lugar ponemos un input
            //si no, tomamos los valores de los arreglos y los mostramos en la pagina
            for (var key in separate) {
                if (key == random) {
                    $("p").append("<input type='text' size='" + cadena.length + "'>");
                } else {
                    $("p").append(separate[key] + " ");
                }
            }

        }
    });
};
$(document).ready(main);