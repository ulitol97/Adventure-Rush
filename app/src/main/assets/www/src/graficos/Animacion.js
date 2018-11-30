class Animacion {

    constructor(imagenSrc, modeloAncho,
                modeloAlto, velocidadRefresco,
                framesTotales, framesPorFila, framesPorColumna,callback, frameInicial, name, offsetAbajo, frameAtaque,
                frameNoAtaque, hitbox, offsetLateral) {

        this.name = name || "Animación";
        this.offsetAbajo = offsetAbajo || 0;
        this.offsetLateral = offsetLateral || 0;
        // Nuevo para animaciones finitas
        this.callback = callback;
        this.hitbox = hitbox;

        this.imagen = new Image();
        this.imagen.src = imagenSrc;

        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;
        this.velocidadRefresco = velocidadRefresco  * (fps/30);
        this.framesTotales = framesTotales;
        this.maxFramesTotales = framesTotales;
        this.framesPorFila = framesPorFila;
        this.framesPorColumna = framesPorColumna;

        this.frameInicial = (frameInicial-1) || 1;
        this.frameActual = this.frameInicial;
        this.frameAncho = this.imagen.width / this.framesPorFila;
        this.frameAlto = this.imagen.height / this.framesPorColumna;

        this.frameAtaque = this.frameInicial + frameAtaque;
        this.frameNoAtaque = this.frameInicial + frameNoAtaque;

        this.columnaInicial = this.frameInicial % this.framesPorFila;
        if (this.columnaInicial == 0){
            this.columnaInicial = this.framesPorFila;
        }

        this.filaInicial = Math.floor(this.frameInicial/this.framesPorFila)+1;

        this.filaActual = this.filaInicial; // contando desde 1;

        this.rectanguloDibujo = {};
        this.rectanguloDibujo.x = (this.frameActual%this.framesPorFila) * this.frameAncho;;
        this.rectanguloDibujo.y = (this.filaActual-1) * this.frameAlto;


        this.rectanguloDibujo.ancho = this.frameAncho;
        this.rectanguloDibujo.alto = this.frameAlto;

        this.ultimaActualizacion = 0;

        this.lanzoAtaque = false;
    }

    actualizar (){
        this.ultimaActualizacion++;

        if (this.frameAtaque == this.frameActual){
            gameLayer.jugador.atacando = true;
        }
        else if (this.frameNoAtaque == this.frameActual){
            gameLayer.jugador.atacando = false;
        }


        if (this.ultimaActualizacion > this.velocidadRefresco) {
            // actualizar el frame
            this.frameActual++;
            this.ultimaActualizacion = 0;

            // Si llega al último frame vuelve al primero
            if (this.frameActual >= (this.frameInicial + this.framesTotales)) {
                if ( this.callback != null){
                    // avisar de que acabo
                    this.resetear();
                    this.callback();
                } else {
                    // reiniciar, es infinita
                    this.resetear();
                }

            }
            // Si llega al último en la fila...
            if ((this.frameActual % this.framesPorFila == 0) && (this.filaActual < this.framesPorColumna) ){
                // actualizar el rectangulo (siguiente frame), FIN DE FILA, sumar columna
                this.filaActual ++;

                this.rectanguloDibujo.x = 0;
                this.rectanguloDibujo.y = (this.filaActual-1) * this.frameAlto;
            }
            else {
                // actualizar el rectangulo (siguiente frame)
                this.rectanguloDibujo.x = (this.frameActual%this.framesPorFila) * this.frameAncho;
            }
        }

    }

    dibujar (x, y){

        contexto.drawImage(
            this.imagen,
            this.rectanguloDibujo.x - this.offsetLateral,
            this.rectanguloDibujo.y - this.offsetAbajo,
            this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto,
            x - this.modeloAncho/2 ,
            y - this.modeloAlto/2,
            this.modeloAncho,
            this.modeloAlto);

    }

    resetear(){
        this.frameActual = this.frameInicial;
        this.filaActual = this.filaInicial;
        this.rectanguloDibujo.x = (this.frameActual%this.framesPorFila) * this.frameAncho;
        this.rectanguloDibujo.y = (this.filaInicial-1) * this.frameAlto;
        this.lanzoAtaque = false;
    }

    setFramesTotales(frames){
        if (frames < 1){
            this.framesTotales = 1;
        }
        else if (frames > this.maxFramesTotales){
            this.framesTotales = this.maxFramesTotales;
        }
    }

}
