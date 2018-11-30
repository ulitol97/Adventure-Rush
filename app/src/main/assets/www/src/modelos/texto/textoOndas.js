class TextoOndas extends Texto {

    constructor(valor, x, y) {
        super (valor, x, y);
    }

    dibujar (){

        contexto.font = "20px Arial";
        contexto.textAlign = "left";

        if(this.valor == 0){
            contexto.fillStyle = "red";
        }
        else if(this.valor == maximoOndas){
            contexto.fillStyle = "green";
        }
        else {
            contexto.fillStyle = "white";
        }


        //Funcion de canvas para dibujar texto
        contexto.fillText(this.valor,this.x,this.y);
    }

    setValorOndas (valor){
        if (valor >= 0 && valor <= maximoOndas) {
            this.valor = valor;
        }
        else if (valor < 0)
            this.valor = 0;
        else
            this.valor = maximoOndas;

    }

}
