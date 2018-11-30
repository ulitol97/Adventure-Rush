class Meta extends Modelo {

    constructor(x, y) {
        super(imagenes.meta, x, y, null, null, 20, 15);

        this.aMetaOndenado = new Animacion(imagenes.meta_animacion,
            this.ancho, this.alto, 3, 8, 4, 2, null, 1, "Meta", 4);


        this.animacion = this.aMetaOndenado;

    }

    actualizar (){
        this.animacion.actualizar();
        if (gameLayer.jugador.x - gameLayer.jugador.margenXColision >= this.x - this.ancho/2){
            gameLayer.finalizarNivel();
        }
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }

}