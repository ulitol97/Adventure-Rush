var fps = 60;

// var fps_transcurridos = 0;
var monedasRecogidas = 0;

//menu
var velocidadPaisajes = -1;

//mapa
var anchoBloque = 32;
var altoBloque = 32;
var escaladoMinimo = 1;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;
estados.atacando = 8; //enemigo volador
estados.quieto = 9;
estados.generado = 10;
estados.activado = 11;
estados.deslizando = 12;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
// niveles
var velocidadFondo = -0.5 * (30/fps);
var nivelInicial = 0;
var nivelActual = nivelInicial;
var nivelMaximo = 4;
var saltoMuelle = -14;

// espada
var numeroDeEspadas = 5;
var espadaEquipada = imagenes.espada_0;
var descripcionesEspadas = ["Just a simple steel sword with nothing in particular",
    "Its brightness gives you vitality, resist an additional attack without dying",
    "Its bloodlust edge will randomly grant you powered up attacks",
    "The mystic blue coming from the blade increases your range attacks ammo",
    "A swift rapier that allows quicker maneuvers"];

// jugador
var margenYChoque = 28;
var offsetJugador = 6;
var velocidadJugador = 4  * (30/fps);
var saltoJugadorBase = 10;
var saltoJugador = saltoJugadorBase;
if (fps == 30){
    saltoJugadorBase = 12;
    saltoJugador = saltoJugadorBase;
}
var ralentizacionDeslizamiento = 1 * (30/fps);
var tiempoInvulnerabilidadJugador = 100 * (fps/30);
var maximoOndasBase = 2;
var maximoVidasBase = 1;
var maximoVidas = maximoVidasBase;
var maximoOndas = maximoOndasBase;
var cadendiaDeslizamiento = 10 * (fps/30);
var cadenciaAtaque = 5 * (fps/30);
var hitboxLateralAtaque = 12;
var hitboxLateralAtaqueIzquierda = 0;
var hitboxSuperiorAtaque = 0;
var hitboxInferiorAtaque = 0;
var cadendiaDeslizamiento = 10 * (fps/30);
var margenYDeslizExtra = 14;
var margenYOnda = 5;


gravedad = 0.85;

var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.teclado;

// extras

var distanciaCalculoColisiones = 300;
var volumenMusicaPausa = 0.2;
var volumenMusicaNoPausa = 0.6;

// Ondas
var cadenciaOnda = 18 * (fps/30);
var velocidadOnda = 12 * (30/fps);
var frameLanzamientoOnda = 2;
var alcanceOnda = 300;

// Enemigos
var rangoVisionXOgro = 400;
var rangoVisionYOgro = 70;
var cadenciaAtaqueOgro = 60 * (fps/30);
var velocidadProyectilOgro = -4 * (30/fps);
var margenXFlechas = 30;
var margenXFlechasNeg = 30;
var frameAtaqueOgro = 2;
var enemigos = {};
var velocidadGargola = -3 * (30/fps);
enemigos.ogro= 0;
enemigos.gargola = 1;
enemigos.proyectil = 2;


//Monedas
var maximoMonedas = 99;

//power up
var velocidadLevitacion = 0.1 * (30/fps);
var margenLevitacion = 0.3;
var powerUps = {
    ninguno : {
        id: 0,
        tiempo :0,
        duracion:0
    },
    invencibilidad : {
        id: 1,
        tiempo :0,
        duracion: 250 * (fps/30)
    },
    iman : {
        id: 2,
        tiempo :0,
        duracion: 200 * (fps/30),
        rango: 150,
        velocidadMonedas: 6 * (30/fps)
    },
    municion : {
        id: 3,
    }
}


