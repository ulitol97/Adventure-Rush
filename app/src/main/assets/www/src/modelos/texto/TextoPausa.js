class TextoPausa extends Texto {

    constructor(valor, x, y) {
        super (valor, x, y);
    }

    dibujar (){

        contexto.font = "30px Arial";
        contexto.textAlign = "center";

        contexto.fillStyle = "white";


        //Funcion de canvas para dibujar texto
        contexto.fillText(this.valor,this.x,this.y);
    }

}
