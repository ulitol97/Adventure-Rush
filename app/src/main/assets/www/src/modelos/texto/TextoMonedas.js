class TextoMonedas extends Texto {

    constructor(valor, x, y) {
        super (valor, x, y);
        this.maxMonedas = maximoMonedas;
    }

    dibujar (){

        contexto.font = "20px Arial";
        contexto.textAlign = "left";

        contexto.fillStyle = "white";


        //Funcion de canvas para dibujar texto
        contexto.fillText(this.valor,this.x,this.y);
    }

    setValorMonedas (valor){
        if (valor >= 0 && valor <= this.maxMonedas){
            this.valor = valor;
        }
        else if (valor < 0){
            this.valor = 0;
        }
        else {
            this.valor = this.maxMonedas;
        }
    }

}
