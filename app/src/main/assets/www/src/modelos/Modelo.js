class Modelo {

    constructor(imagenRuta, x, y, ancho, alto, margenXColision, margenYColision) {
        this.imagen = new Image();
        this.imagen.src = imagenRuta;
        this.x = x;
        this.y = y;
        this.ancho = ancho || this.imagen.width;
        this.alto = alto || this.imagen.height;
        this.margenXColision = margenXColision || 0;
        this.margenYColision = margenYColision || 0;
        this.noGravity = false;
        this.noPhysics = false;
    }

    dibujar (scrollX, scrollY, flipX, flipY){

        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2 - scrollY);

    }


    estaEnPantalla (){
        if ( (this.x - gameLayer.scrollX) - this.ancho/2 <= canvasInitialWidth &&
            (this.x - gameLayer.scrollX) + this.ancho/2 >= 0){
            return true;
        }
        return false;
    }




    colisiona (modelo){
        var colisiona = false;
        var margenXMedios = modelo.margenXColision/2;
        var margenYMedios = modelo.margenYColision/2;

        if ( modelo.x - modelo.ancho/2 + margenXMedios  <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 - margenXMedios  >= this.x - this.ancho/2 + this.margenXColision/2
            && this.y + this.alto/2 - this.margenYColision/2 >= modelo.y - modelo.alto/2 + margenYMedios
            && this.y - this.alto/2  + this.margenYColision/2 <= modelo.y + modelo.alto/2 - margenYMedios){

                colisiona = true;
        }
        return colisiona;
    }

    colisionaAtaque (modelo, hitbox){
        var margenXDerecha = hitbox.hitBoxLateralAtaque || 0;
        var margenXIzquierda = hitbox.hitBoxLateralAtaqueIzquierda || 0;
        var margenYSuperior = hitbox.hitboxSuperiorAtaque || 0;
        var margenYInferior = hitbox.hitboxInferiorAtaque || 0;
        var colisiona = false;

        if (modelo.x - modelo.ancho/3 + this.margenXColision/2  - margenXDerecha  <=  this.x + this.ancho/2
        && modelo.x + modelo.ancho/3 - this.margenXColision/2 + margenXIzquierda  >= this.x - this.ancho/2
        && this.y + this.alto/2 - this.margenYColision/2 + margenYInferior  >= modelo.y - modelo.alto/2
        && this.y - this.alto/2  + this.margenYColision/2 - margenYSuperior   <= modelo.y + modelo.alto/2 ){

            colisiona = true;
        }

        return colisiona;
    }

    colisionaEnemigo (modelo, tipo, hitbox){
        var colisiona = false;

        if (hitbox != null) {

            var margenXDerecha = hitbox.hitBoxLateralAtaque;
            var margenXIzquierda = hitbox.hitBoxLateralAtaqueIzquierda;
            var margenYSuperior = hitbox.hitboxSuperiorAtaque;
            var margenYInferior = hitbox.hitboxInferiorAtaque;
        }
        else{
            var margenXDerecha = 0;
            var margenXIzquierda = 0;
            var margenYSuperior = 0;
            var margenYInferior = 0;
        }

        var margenXMedios = modelo.margenXColision/2;
        var margenYMedios = modelo.margenYColision/2;

        if ( modelo.x - modelo.ancho/2 + margenXMedios - margenXDerecha  <=  this.x + this.ancho/2 - this.margenXColision/2
            && modelo.x + modelo.ancho/2 - margenXMedios + margenXIzquierda >= this.x - this.ancho/2 + this.margenXColision/2){
            if (tipo != null && (tipo == enemigos.ogro)){
                if (this.y + this.alto/2 - this.margenYColision/2 + margenYInferior >= modelo.y - modelo.alto/2 + margenYMedios){
                    if ((this.y > modelo.y)&&(this.y + this.alto/2 - this.margenYColision + margenYSuperior >= modelo.y - modelo.alto/2 + margenYMedios*2)){
                        // colisiona = true;
                    }
                    else{
                        colisiona = true;
                    }

                }


            }
            else if (tipo != null && (tipo == enemigos.gargola)){
                if (this.y - this.alto/2  + this.margenYColision/2 - margenYInferior <= modelo.y + modelo.alto/2 - margenYMedios
                && this.y + this.alto/2 - this.margenYColision + margenYSuperior >= modelo.y - modelo.alto/2 + margenYMedios){

                    colisiona = true;
                }
            }
            else if (this.y - this.alto/2  + this.margenYColision/2 - margenYInferior <= modelo.y + modelo.alto/2 - margenYMedios
            && this.y + this.alto/2 - this.margenYColision/2 + margenYSuperior >= modelo.y - modelo.alto/2 + margenYMedios){

                colisiona = true;
            }



        }
        return colisiona;
    }

    colisionaProyectil (modelo){
        var colisiona = false;
        var margenXMedios = modelo.margenXColision/2 + margenXFlechas/2;
        var margenYMedios = modelo.margenYColision/2;

        if (gameLayer.jugador.estado == estados.atacando){
            margenXMedios = modelo.margenXColision/2 + margenXFlechas/3;
        }

        if ( modelo.x - modelo.ancho/2 + margenXMedios  <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 + margenXMedios  >= this.x - this.ancho/2 + this.margenXColision/2
            && this.y + this.alto/2 - this.margenYColision/2 >= modelo.y - modelo.alto/2 + margenYMedios
            && this.y - this.alto/2  + this.margenYColision/2 <= modelo.y + modelo.alto/2 - margenYMedios){

            colisiona = true;
        }
        return colisiona;
    }

    colisionaIzquierda (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/3  <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/3  >= this.x - this.ancho/2
            && this.y + this.alto/2  >= modelo.y - modelo.alto/2
            && this.y - this.alto/2  <= modelo.y + modelo.alto/2 ){

            if (this.x - this.ancho/3  > modelo.x){
                colisiona = true;
            }
        }

        return colisiona;
    }

    //Muelles
    colisionaArriba (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/3  <=  this.x + this.ancho/2 - (this.margenXColision*2/5)
            && modelo.x + modelo.ancho/3  >= this.x - this.ancho/2 + (this.margenXColision*2/5)
            && this.y + this.alto/2  >= modelo.y - modelo.alto/2
            && this.y - this.alto/2  <= modelo.y + modelo.alto/2 ){

            if (this.y + this.alto/3  < modelo.y){
                colisiona = true;
            }
        }

        return colisiona;
    }

    //Bloques superiores
    colisionaAbajo (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/3  <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/3  >= this.x - this.ancho/2
            && this.y + this.alto/2  >= modelo.y - modelo.alto/2
            && this.y - this.alto/2  <= modelo.y + modelo.alto/2 ){

            if (this.y - this.alto/3  > modelo.y){
                colisiona = true;
            }
        }

        return colisiona;
    }



    actualizarImagen (imagenRuta){
        this.imagen = new Image();
        this.imagen.src = imagenRuta;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    swapMargenes (){
        var margenX= this.margenXColision;
        this.margenXColision = this.margenYColision;
        this.margenYColision = margenX;
    }

    distanciaA (modelo){
        var distX = this.x - modelo.x;
        var distY = this.y - modelo.y;

        return (Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2)));
    }

}
