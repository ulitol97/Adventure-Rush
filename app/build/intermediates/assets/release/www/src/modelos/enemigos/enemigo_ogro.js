class Enemigo_ogro extends Enemigo {

    constructor(x, y) {
        super(x, y, 0, 0, estados.atacando, imagenes.enemigo_ogro, 75, 75, 32, 90);

        this.tipo = enemigos.ogro;


        this.aIdle = new Animacion(imagenes.enemigo_ogro_atlas,
            this.ancho, this.alto, 45, 2, 6, 6, null, 4, "Ogro_Idle", 11);

        this.aMover = new Animacion(imagenes.enemigo_ogro_atlas,
            this.ancho, this.alto, 5, 4, 6, 6, null, 13, "Ogro_Mover", 11);

        this.aAtacar = new Animacion(imagenes.enemigo_ogro_atlas,
            this.ancho, this.alto, 6, 3, 6, 6, this.finAnimacionAtaque.bind(this), 4, "Ogro_Atacar", 11);

        this.aMorir = new Animacion(imagenes.enemigo_ogro_atlas,
            this.ancho,this.alto, 4, 5, 6, 6, this.finAnimacionMorir.bind(this), 8, "Ogro_Morir", 11);

        // Ref a la animación actual
        this.animacion = this.aIdle;

        this.vxInteligencia = 0;

        // Ataque
        this.cadenciaAtaque = cadenciaAtaqueOgro;
        this.tiempoAtaque = 0;

    }


    actualizar (){

        this.animacion.actualizar();

        // tiempo ataque
        if ( this.tiempoAtaque > 0 && this.tiempoAtaque < this.cadenciaAtaque+1  ) {
            this.tiempoAtaque--;
        }


        switch (this.estado){
            case estados.atacando:
                if (this.tiempoAtaque <= 0 && this.estaEnPantalla()){
                    this.animacion = this.aAtacar;
                    if (!this.animacion.lanzoAtaque && (this.animacion.frameActual == (this.animacion.frameInicial + frameAtaqueOgro))){

                        this.atacar();
                        reproducirEfecto(efectos.ogro_dispara);
                    }
                }
                else
                    this.animacion = this.aIdle;


                break;
            case estados.quieto:
                this.animacion = this.aIdle;
                break;
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.vx = 0;
                this.animacion = this.aMorir;
                break;
        }


        if ( this.estado != estados.muriendo) {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }

        }

        if (this.fueraPorDerecha ){
            // mover hacia la izquierda vx tiene que ser negativa
            if ( this.vxInteligencia > 0){
                this.vxInteligencia = this.vxInteligencia * -1;
            }
            this.vx = this.vxInteligencia;
        }
        if (this.fueraPorIzquierda ){
            // mover hacia la derecha vx tiene que ser positiva
            if ( this.vxInteligencia < 0){
                this.vxInteligencia = this.vxInteligencia * -1;
            }
            this.vx = this.vxInteligencia;
        }


    }
    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY + 6);
    }


    atacar(){


        this.animacion.lanzoAtaque = true;
        var proyectil = new ProyectilOgro(this.x, this.y + this.alto/4);
        gameLayer.espacio.agregarCuerpoDinamico(proyectil);
        gameLayer.proyectiles.push(proyectil);
        this.tiempoAtaque = this.cadenciaAtaque;
    }

    finAnimacionAtaque () {
        this.tiempoAtaque = this.cadenciaAtaque;
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
            reproducirEfecto(efectos.ogro_muerte);
        }
    }
}
