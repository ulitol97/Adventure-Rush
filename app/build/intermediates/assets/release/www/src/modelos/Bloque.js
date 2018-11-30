class Bloque extends Modelo {

    constructor(rutaImagen, x, y, destructible, vinculado) {

        super(rutaImagen, x, y)
        this.destructible = destructible;
        if (vinculado){
            this.vinculado = vinculado;
        }

    }

}
