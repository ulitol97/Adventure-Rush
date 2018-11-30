class PowerUpAmmo extends PowerUp {

    constructor(x, y, margenX, margenY) {
        super(powerUps.municion, imagenes.municion, null, x, y, margenX, margenY);
    }

    recoger(){
        reproducirEfecto(efectos.onda_recoger);
    }

}