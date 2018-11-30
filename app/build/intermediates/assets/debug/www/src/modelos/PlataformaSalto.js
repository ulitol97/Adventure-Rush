class PlataformaSalto extends Modelo {

    constructor(x, y) {

        super(imagenes.muelle, x, y);
        this.estado = estados.quieto;
        this.animacion = null;
        this.aSalto = new Animacion(imagenes.muelle_animacion,
            this.ancho-2, this.alto, 4, 5, 5, 1, this.finAnimacionMuelle.bind(this), 1, "Muelle", 0, null, null, null, 0);


    }
    actualizar(){
        // Actualizado en el espacio.
        if (this.estado == estados.activado){
            this.animacion.actualizar();
        }
    }

    dibujar(scrollX, scrollY){
        if (this.animacion != null){
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
        }
        else {
            super.dibujar(scrollX, scrollY);
        }

    }
    activarMuelle () {
        this.animacion = this.aSalto;
        this.estado = estados.activado;
        reproducirEfecto(efectos.muelle);
    }

    finAnimacionMuelle() {
        this.estado = estados.quieto;
        this.animacion = null;
    }

}
