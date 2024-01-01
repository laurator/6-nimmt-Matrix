/***************************************************************/
// CRECIÓN AUTOMÁTICA DE ELEMENTOS HTML
/***************************************************************/

// Función auxiliar para transformar string en HTML
function htmlToElement(html) {
    let template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

// Función para asignar el tipo de número correspondiente a cada botón
function detectNumberStyle (i) {
    var buttonNumberStyle = ""; // Vacío si no es ninguno de los casos
    switch (i) { // Decidir la clase del botón a crear
        case 55: buttonNumberStyle = "fifty-five"; break;
        case 11:
        case 22:
        case 33:
        case 44:
        case 66:
        case 77:
        case 88:
        case 99: buttonNumberStyle = "palindromic"; break; // Si sus 2 números son iguales
        default:
            if (i%10 == 0) {
                buttonNumberStyle = "ten-multiples"; // Si es múltiplo de 10
            } else if (i%5 == 0) {
                buttonNumberStyle = "five-multiples"; // Si es múltiplo de 5
            } else {
                buttonNumberStyle = "basic-button";
            }
    }
    return buttonNumberStyle;
}

// Función para almacenar los elementos HTML de los botones a crear
function createHtmlButtons () {
    var arrayHTMLelements = [];

    // Crear todos los botones con su estilo de número como clase
    for (var i=1; i<105; i++) {
        var buttonNumberStyle = detectNumberStyle(i);
        var botonesString = `<button class="boton ${buttonNumberStyle} not-my-numbers alive" id="boton${i}">${i}</button>`;
        arrayHTMLelements.push(htmlToElement(botonesString)); // Crear botón (Creando todo el html directamente con función auxiliar)
    }
    return arrayHTMLelements;
}

// Creación de los botones en su contenedor
document.getElementById("button-container").append(...createHtmlButtons());

/***************************************************************/
// EVENTOS
/***************************************************************/

// Qué hacen los botones numéricos del contenedor al ser clicados
document.querySelectorAll("#button-container .boton").forEach(function(element) {
    //addEventListener sólo para el botón que se ha clicado dentro del conjunto de botones posibles
    element.addEventListener("click", function() {
        console.log('he clicado la posición tal: ', this.id);

        // Cambiar tamaño y estilo de fuente
        var myFont = window.getComputedStyle(this).getPropertyValue('font-weight');
        if (myFont == "bold" || this.style.fontWeight == "bold") {
            // this.style.fontSize = "20px";
            this.style.fontWeight = "normal";
        } else {
            // this.style.fontSize = "36px";
            this.style.fontWeight = "bold";
        }

        // Detectar estilo del botón y almacenarlo
        var possibleButtonStyles = ["alive", "fifty-five", "five-multiples", "ten-multiples", "palindromic"];
        for (var i=0; i<possibleButtonStyles.length; i++) {
            if (this.classList.contains(possibleButtonStyles[i])) {
                var buttonStyle = possibleButtonStyles[i];
            }
        }
        // Cambiar color del fondo de los botones
        if (this.classList.contains("alive")) {
            this.classList.replace("alive", "eliminated");              
        } else {
            this.classList.replace("eliminated", "alive"); 
        }
    });


    // Marcar mis números en otro color con el botón derecho
    element.addEventListener("contextmenu", function() {
        event.preventDefault(); // Evitar que aparezca el menú con las opciones del clic derecho
        // Cambiar color del fondo de los botones
        if (this.classList.contains("not-my-numbers")) {
            this.classList.replace("not-my-numbers", "my-numbers");              
        } else {
            this.classList.replace("my-numbers", "not-my-numbers"); 
        }
    });
});

// Botón check "Marcar valores de pérdida"
document.getElementById("showLossValues").addEventListener("change", function() {
    if (this.classList.contains("checked")) { // Si está clicado
        this.classList.remove("checked"); // Se elimina la marca de clicado

        // Se eliminan las marcas de los colores de los botones
        document.querySelectorAll(".fifty-five").forEach(function(element) {
            element.classList.remove("fifty-five-highlight");
        });
        document.querySelectorAll(".palindromic").forEach(function(element) {
            element.classList.remove("palindromic-highlight");
        });
        document.querySelectorAll(".ten-multiples").forEach(function(element) {
            element.classList.remove("ten-multiples-highlight");
        });
        document.querySelectorAll(".five-multiples").forEach(function(element) {
            element.classList.remove("five-multiples-highlight");
        });
        document.querySelectorAll(".basic-button").forEach(function(element) {
            element.classList.remove("basic-highlight");
        });

    } else { // Si no estaba marcado como clicado
        this.classList.add("checked"); // Se añade la marca de clicado

        // Se añaden las marcas a los botones para destacar sus colores
        document.querySelectorAll(".fifty-five").forEach(function(element) {
            element.classList.add("fifty-five-highlight");
        });
        document.querySelectorAll(".palindromic").forEach(function(element) {
            element.classList.add("palindromic-highlight");
        });
        document.querySelectorAll(".ten-multiples").forEach(function(element) {
            element.classList.add("ten-multiples-highlight");
        });
        document.querySelectorAll(".five-multiples").forEach(function(element) {
            element.classList.add("five-multiples-highlight");
        });
        document.querySelectorAll(".basic-button").forEach(function(element) {
            element.classList.add("basic-highlight");
        });
    }
    
});