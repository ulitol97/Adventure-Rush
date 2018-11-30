// Control de "físicas"
class Espacio {

    constructor(gravedad) {
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = []; // bloques etc.
    }

    agregarCuerpoDinamico(modelo){
        this.dinamicos.push(modelo);
    }

    agregarCuerpoEstatico(modelo){
        this.estaticos.push(modelo);
    }

    eliminarCuerpoDinamico (modelo) {
        for (var i = 0; i < this.dinamicos.length; i++) {
            if (this.dinamicos[i] == modelo) {
                this.dinamicos.splice(i, 1);
            }
        }
    }

    eliminarCuerpoEstatico(modelo){
        for (var i = 0; i < this.estaticos.length; i++) {
            if (this.estaticos[i] == modelo) {
                this.estaticos.splice(i, 1);
            }
        }
    }

    actualizar(){

        for( var i=0; i < this.dinamicos.length; i++){

            // aplicar gravedad (dinamicos)
            if (this.dinamicos[i].noGravity == false) {

                    if (this.dinamicos[i].enElAire == true){
                        this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad/2;
                    }
                    else{
                        this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;
                    }

                // maxima velocidad de caida por gravedad
                if (this.dinamicos[i].vy > 20) {
                    this.dinamicos[i].vy = 20;
                }
                else if (this.dinamicos[i].vy < -20) {
                    this.dinamicos[i].vy = -20;
                }
            }

            if (this.dinamicos[i].noPhysics == false){
                // reiniciar choques
                this.dinamicos[i].choqueAbajo = false;
                this.dinamicos[i].choqueArriba = false;
                this.dinamicos[i].fueraPorDerecha = false;
                this.dinamicos[i].fueraPorIzquierda = false;


                // Mov X
                this.moverDerecha(i);
                this.moverIzquierda(i);


                // Mov Y

                this.moverArriba(i);
                this.moverAbajo(i);
            }




        }



    }

    moverDerecha(i){


        var movimientoPosible = 0;

        if (this.dinamicos[i].onda == true){

            movimientoPosible = velocidadOnda;
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }

        else if ( this.dinamicos[i].vx > 0){
            movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese

            for(var j=0; j < this.estaticos.length; j++){

                if (this.dinamicos[i].distanciaA(this.estaticos[j]) < distanciaCalculoColisiones) {
                    var derechaDinamico
                        = this.dinamicos[i].x + this.dinamicos[i].ancho/2 - this.dinamicos[i].margenXColision/2;
                    var arribaDinamico
                        = this.dinamicos[i].y - this.dinamicos[i].alto/2 + this.dinamicos[i].margenYColision/2;
                    var abajoDinamico
                        = this.dinamicos[i].y + this.dinamicos[i].alto/2 ;
                    var izquierdaEstatico
                        = this.estaticos[j].x - this.estaticos[j].ancho/2;
                    var arribaEstatico
                        = this.estaticos[j].y - this.estaticos[j].alto/2;
                    var abajoEstatico
                        = this.estaticos[j].y + this.estaticos[j].alto/2;


                    // Alerta!, Elemento estático en la trayectoria.
                    if ( (derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico
                        && derechaDinamico <= izquierdaEstatico
                        && arribaEstatico < abajoDinamico
                        && abajoEstatico > arribaDinamico){


                        // Comprobamos si la distancia al estático es menor
                        // que nuestro movimientoPosible actual
                        if (movimientoPosible >= izquierdaEstatico - derechaDinamico){
                            // La distancia es MENOR que nuestro movimiento posible
                            // Tenemos que actualizar el movimiento posible a uno menor
                            movimientoPosible = izquierdaEstatico - derechaDinamico;
                        }

                    }
                }

            }

            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }



    }

    moverIzquierda(i){



        // Izquierda
        var movimientoPosible = 0;

        if ( this.dinamicos[i].vx < 0){
            movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese

            for(var j=0; j < this.estaticos.length; j++){

                if (this.dinamicos[i].distanciaA(this.estaticos[j]) < distanciaCalculoColisiones) {
                    var izquierdaDinamico
                        = this.dinamicos[i].x - this.dinamicos[i].ancho/2 + this.dinamicos[i].margenXColision/2;
                    var arribaDinamico
                        = this.dinamicos[i].y - this.dinamicos[i].alto/2 + this.dinamicos[i].margenYColision/2;
                    var abajoDinamico
                        = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                    var derechaEstatico
                        = this.estaticos[j].x + this.estaticos[j].ancho/2;
                    var arribaEstatico
                        = this.estaticos[j].y - this.estaticos[j].alto/2;
                    var abajoEstatico
                        = this.estaticos[j].y + this.estaticos[j].alto/2;

                    // Alerta!, Elemento estático en la trayectoria.

                    if ( (izquierdaDinamico + this.dinamicos[i].vx) <= derechaEstatico
                        && izquierdaDinamico >= derechaEstatico
                        && arribaEstatico < abajoDinamico
                        && abajoEstatico > arribaDinamico ){


                        // Comprobamos si la distancia al estático es mayor
                        // que nuestro movimientoPosible actual
                        if (movimientoPosible <= derechaEstatico - izquierdaDinamico  + this.dinamicos[i].margenXColision/2 ){
                            // La distancia es MAYOR que nuestro movimiento posible
                            // Tenemos que actualizar el movimiento posible a uno mayor
                            movimientoPosible = derechaEstatico - izquierdaDinamico  + this.dinamicos[i].margenXColision/2 ;
                        }

                    }
                }


            }

            // Ya se han comprobado todos los estaticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }



    }

    moverAbajo(i){

        var movimientoPosible = 0;
        if ( this.dinamicos[i].vy > 0){
            movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){

                if (this.dinamicos[i].distanciaA(this.estaticos[j]) < distanciaCalculoColisiones) {

                    var arribaDinamico
                        = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                    var abajoDinamico
                        = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                    var derechaDinamico
                        = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                    var izquierdaDinamico
                        = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                    var arribaEstatico
                        = this.estaticos[j].y - this.estaticos[j].alto/2;
                    var abajoEstatico
                        = this.estaticos[j].y + this.estaticos[j].alto/2;
                    var derechaEstatico
                        = this.estaticos[j].x + this.estaticos[j].ancho/2;
                    var izquierdaEstatico
                        = this.estaticos[j].x - this.estaticos[j].ancho/2;

                    // Alerta!, Elemento estático en la trayectoria.

                    if ( (abajoDinamico +  this.dinamicos[i].vy) >= arribaEstatico &&
                        arribaDinamico  + this.dinamicos[i].margenYColision/2 < abajoEstatico
                        && izquierdaDinamico + this.dinamicos[i].margenXColision/2 < derechaEstatico
                        && (derechaDinamico - this.dinamicos[i].margenXColision/2) > izquierdaEstatico ){


                        // Comprobamos si la distancia al estático es menor
                        // que nuestro movimientoPosible actual
                        if (movimientoPosible >= arribaEstatico - abajoDinamico ){


                            // La distancia es MENOR que nuestro movimiento posible
                            // Tenemos que actualizar el movimiento posible a uno menor

                            movimientoPosible = arribaEstatico - abajoDinamico;


                            this.dinamicos[i].choqueAbajo = true;

                            if (derechaDinamico + this.dinamicos[i].margenXColision/2 <= izquierdaEstatico  ) {
                                this.dinamicos[i].fueraPorDerecha = true;
                            }

                            if (izquierdaDinamico - this.dinamicos[i].margenXColision/2 > derechaEstatico ) {
                                this.dinamicos[i].fueraPorIzquierda = true;
                            }

                        }
                    }
                }



            }
            if (movimientoPosible <= -20 && this.dinamicos[i].vidas != null){
                gameLayer.perderNivel();
                movimientoPosible = 0;
                // movimientoPosible = 0;
                // this.dinamicos[i].deslizar(true);
            }


            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;

        }

    }

    moverArriba(i){

        var movimientoPosible = 0;
        if ( this.dinamicos[i].vy < 0){
            movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){

                if (this.dinamicos[i].distanciaA(this.estaticos[j]) < distanciaCalculoColisiones) {
                    var arribaDinamico
                        = this.dinamicos[i].y - this.dinamicos[i].alto/2 + this.dinamicos[i].margenYColision/2;
                    var abajoDinamico
                        = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                    var derechaDinamico
                        = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                    var izquierdaDinamico
                        = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                    var arribaEstatico
                        = this.estaticos[j].y - this.estaticos[j].alto/2;
                    var abajoEstatico
                        = this.estaticos[j].y + this.estaticos[j].alto/2;
                    var derechaEstatico
                        = this.estaticos[j].x + this.estaticos[j].ancho/2 ;
                    var izquierdaEstatico
                        = this.estaticos[j].x - this.estaticos[j].ancho/2;

                    // Alerta!, Elemento estático en la trayectoria

                    if ( (arribaDinamico +  this.dinamicos[i].vy) <= abajoEstatico &&
                        abajoDinamico > arribaEstatico
                        && izquierdaDinamico + this.dinamicos[i].margenXColision/2 < derechaEstatico
                        && derechaDinamico - this.dinamicos[i].margenXColision/2 > izquierdaEstatico ){





                        // Comprobamos si la distancia al estático es MAYOR
                        // que nuestro movimientoPosible actual
                        if (movimientoPosible <= abajoEstatico - arribaDinamico  + this.dinamicos[i].margenYColision/2 ){

                            // La distancia es MAYOR que nuestro movimiento posible
                            // Tenemos que actualizar el movimiento posible a uno mayor

                            this.dinamicos[i].choqueArriba = true;
                            movimientoPosible = abajoEstatico - arribaDinamico  + this.dinamicos[i].margenYColision/2;

                        }

                    }

                }



            }


            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }

    }


}
