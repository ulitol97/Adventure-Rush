class FondoTitle extends Modelo {

    constructor(x, y, fondosCarrousel) {
        super(fondosCarrousel[0].imagen.src, x, y)
        this.vx = velocidadPaisajes;
        this.fondos = fondosCarrousel;
        this.xInicial = this.fondos[0].x;


        var offset = 0;
        for (var i = 0; i < this.fondos.length; i++){
            this.fondos[i].x = this.fondos[i].x + offset;
            offset += canvasInitialWidth;
        }
        this.xFinal = this.fondos[this.fondos.length-1].x;
    }

    actualizar(){
        for (var i = 0; i < this.fondos.length; i++){
            this.fondos[i].x = this.fondos[i].x + this.vx;
            if (this.fondos[i].x <= this.xInicial - canvasInitialWidth){
                this.fondos[i].x = this.xFinal;
            }
        }
    }


    dibujar(){
        for (var i = 0; i < this.fondos.length; i++){
                if (this.fondos[i].x < canvasInitialWidth*2 && this.fondos[i].x > -(canvasInitialWidth))
                    this.fondos[i].dibujar();

        }
    }

}
