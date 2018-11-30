class Enemigo_gargola extends Enemigo {

    constructor(x, y) {
        super(x, y, 0, 0, estados.quieto, imagenes.enemigo_gargola, null, null, 32, 25);


        this.noGravity = true;
        this.tipo = enemigos.gargola;

        this.aMover = new Animacion(imagenes.enemigo_gargola_atlas,
            this.ancho, this.alto, 5, 4, 5, 4, null, 3, "Gargola_mover", 11);

        this.aAtacar = new Animacion(imagenes.enemigo_gargola_ataque,
            this.ancho, this.alto, 3, 3, 3, 1, null, 1, "Gargola_Atacar", 0, null, null, {
                hitBoxLateralAtaque : 15,
                hitBoxLateralAtaqueIzquierda : 0,
                hitboxSuperiorAtaque :11,
                hitboxInferiorAtaque : 14
            });


        this.aMorir = new Animacion(imagenes.enemigo_gargola_atlas,
            this.ancho,this.alto, 6, 5, 5, 4, this.finAnimacionMorir.bind(this), 11, "Gargola_Morir", 13);

        // Ref a la animación actual
        this.animacion = this.aAtacar;

        this.vxInteligencia = 0;

        // Ataque
        this.cadenciaAtaque = cadenciaAtaqueOgro;
        this.tiempoAtaque = this.cadenciaAtaque;

    }


    actualizar (){

        if (this.estado == estados.quieto){
            if (this.estaEnPantalla()){
                this.estado == estados.atacando;
                this.vx = velocidadGargola;
                this.vxInteligencia = velocidadGargola;
            }
        }

        this.animacion.actualizar();


        // tiempo ataque
        if ( this.tiempoAtaque > 0 && this.tiempoAtaque < this.cadenciaAtaque+1  ) {
            this.tiempoAtaque--;
        }


        switch (this.estado){
            case estados.atacando:
                    this.animacion = this.aAtacar;
                break;
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.vx = 0;
                this.noGravity = false;
                this.animacion = this.aMorir;
                break;
        }


        if ( this.estado != estados.muriendo) {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }

        }

        if (this.fueraPorDerecha){
            // mover hacia la izquierda vx tiene que ser negativa
            if ( this.vxInteligencia > 0){
                this.vxInteligencia = this.vxInteligencia * -1;
            }
            this.vx = this.vxInteligencia;
        }
        if (this.fueraPorIzquierda){
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


    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
            reproducirEfecto(efectos.ogro_muerte);
        }
    }
}
