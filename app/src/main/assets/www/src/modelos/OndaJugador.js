class OndaJugador extends Modelo {

    constructor(x, y, especial) {
        super(imagenes.onda_jugador, x, y, null, null, 12, 28);
        this.vx = velocidadOnda;
        this.xInicial = x;

        this.especial = especial;

        this.estado = estados.moviendo;

        this.onda = true;

        if (this.especial == false){
            this.aAvanceOnda = new Animacion(imagenes.onda_jugador_atlas,
                this.ancho, this.alto, 3, 4, 5, 4, null, 1, "Avance_Onda", 0);

            this.aDestruccionOnda = new Animacion(imagenes.onda_jugador_atlas_inverso,this.ancho, this.alto, 1, 10
                , 5, 4, this.finOnda.bind(this), 11, "Destruccion_Onda", 0);
        }
        else{
            this.aAvanceOnda = new Animacion(imagenes.onda_jugador_atlas_2,
                this.ancho, this.alto, 3, 4, 5, 4, null, 1, "Avance_Onda_2", 0);

            this.aDestruccionOnda = new Animacion(imagenes.onda_jugador_atlas_inverso_2,
                this.ancho, this.alto, 1, 10, 5, 4, this.finOnda.bind(this), 11, "Destruccion_Onda_2", 0);
        }


        this.animacion = this.aAvanceOnda;

    }

    actualizar (){
        if ((this.x - this.xInicial) > alcanceOnda){
            this.animacion = this.aDestruccionOnda;
            this.estado = estados.muriendo;
        }
        this.animacion.actualizar();
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }

    finOnda(){
        // Poner a destruida para que la elimine el refresco del juego.
        this.estado = estados.muerto;
    }

}