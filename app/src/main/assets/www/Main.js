

var canvas = document.getElementById("canvas");
var canvasInitialWidth = 568;
var canvasInitialHeight = 320;

var contexto = canvas.getContext("2d");

// Capas
var layer;
var gameLayer;
var menuLayer;


// Controles
var controles = {};
controles.moverX = 1;
controles.pausa = false;
controles.inventario = false;
controles.pausaJugador = false;



// Inicio capas y bucle del juego
function iniciarJuego() {
    menuLayer = new MenuLayer();
    layer = menuLayer;
    // setInterval(function (){
    //     if (layer == menuLayer){
    //         menuLayer.actualizar();
    //     }
    // }, 1000 / fps);

    setInterval(loop, 1000 / fps);
}


function loop(){
    layer.actualizar();
    if (entrada == entradas.pulsaciones) {
        layer.calcularPulsaciones(pulsaciones);
    }
    layer.procesarControles();
    layer.dibujar();

    actualizarPulsaciones();
}

function actualizarPulsaciones () {
    for(var i=0; i < pulsaciones.length; i++){
        if ( pulsaciones[i].tipo ==  tipoPulsacion.inicio){
            pulsaciones[i].tipo = tipoPulsacion.mantener;
        }
    }
}


// Cambio de escalado
window.addEventListener('load', resize, false);


function resize() {
    console.log("Resize canvas")

    contexto.mozImageSmoothingEnabled = false;  // firefox
    contexto.imageSmoothingEnabled = false;

    canvasInitialHeight = this.canvas.height;
    canvasInitialWidth = this.canvas.width;

    var escaladoAncho = parseFloat(window.innerWidth / canvasInitialWidth);
    var escaladoAlto = parseFloat(window.innerHeight / canvasInitialHeight);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = this.canvas.width*escaladoMinimo;
    canvas.height = this.canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}
