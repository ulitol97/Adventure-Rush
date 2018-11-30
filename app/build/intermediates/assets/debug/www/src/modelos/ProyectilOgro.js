class ProyectilOgro extends Modelo {

    constructor(x, y) {
        super(imagenes.proyectil_ogro, x, y, 23, null, 0, -0)
        this.vx = velocidadProyectilOgro;
        this.tipo = enemigos.proyectil;
    }



}