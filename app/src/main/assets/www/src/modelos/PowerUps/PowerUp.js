class PowerUp extends Modelo {

    constructor(powerUp, imagen, animacion_particulas, x, y, margenX, margenY) {
        super(imagen, x, y, 32, 32, margenX, margenY);

        this.powerUp = powerUp;
        this.noGravity = true;
        this.radLevitar = 0;

    }

    actualizar (){
        this.levitar();
    }


    levitar(){
        this.y += (Math.sin(this.radLevitar)*margenLevitacion);
        if (this.radLevitar > (Math.PI*2)){
            this.radLevitar = 0;
        }
        else
            this.radLevitar += velocidadLevitacion;

    }

    recoger(){
        reproducirEfecto(efectos.powerup_recoger);
    }

    finalizar(){
        reproducirEfecto(efectos.powerup_final);
    }

}