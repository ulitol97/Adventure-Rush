class Moneda extends Modelo {

    constructor(x, y) {
        super(imagenes.moneda, x, y, null, null, 20, 15);

        this.noGravity = true;
        this.noPhysics = false;

        this.aMoneda = new Animacion(imagenes.moneda_atlas,
            this.ancho, this.alto, 2, 9, 3, 3, null, 1, "Moneda");



        this.animacion = this.aMoneda;

    }

    actualizar (){
        this.animacion.actualizar();
        if (gameLayer.jugador.powerUp.indexOf(powerUps.iman) != -1 && (this.distanciaA(gameLayer.jugador) <= powerUps.iman.rango)){
            this.noPhysics = true;
        }
        if (this.noPhysics == true){
            if (this.x < gameLayer.jugador.x)
                this.x += powerUps.iman.velocidadMonedas;
            else
                this.x -= powerUps.iman.velocidadMonedas;

            if (this.y  < gameLayer.jugador.y - gameLayer.jugador.margenYColision/5)
                this.y += powerUps.iman.velocidadMonedas;
            else if (this.y  > gameLayer.jugador.y + gameLayer.jugador.margenYColision/5)
                this.y -= powerUps.iman.velocidadMonedas;
        }

    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }

}