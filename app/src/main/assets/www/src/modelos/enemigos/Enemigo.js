class Enemigo extends Modelo {

    constructor(x, y, vxBase, vyBase, estadoBase, imagen, ancho, alto, margenX, margenY) {
        super(imagen, x, y, ancho, alto, margenX, margenY);
        this.vxMovimiento = vxBase;
        this.vyMovimiento = vyBase;
        this.vx = vxBase;
        this.vy = vyBase;
        this.estado = estadoBase;
        this.tipo =-1;

    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    actualizar (){
        this.animacion.actualizar();

        if ( this.estado != estados.muriendo) {
            this.vx = this.vxMovimiento;
            this.vy = this.vyMovimiento;

        }
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY + offset);
    }



}
