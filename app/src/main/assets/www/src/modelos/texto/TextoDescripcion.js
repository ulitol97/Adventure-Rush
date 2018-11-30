class TextoDescripcion extends Texto {

    constructor(valor, x, y) {
        super (valor, x, y);
    }

    dibujar (){

        contexto.font = "12px Arial";
        contexto.textAlign = "center";

        contexto.fillStyle = "black";


        //Funcion de canvas para dibujar texto
        contexto.fillText(this.valor,this.x,this.y);
    }

}
