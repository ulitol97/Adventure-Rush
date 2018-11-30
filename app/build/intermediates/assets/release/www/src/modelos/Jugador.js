class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y, 50, 37, 29, 28); //29 y 12, margenenes originales. 43 bien para desliz.

        this.estadoPrevio = null;

        this.orientacion = orientaciones.derecha;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.margenYAux = this.margenYColision;

        this.enElAire = false;
        this.atacando = false;
        this.ondaPorLanzar = true;

        this.vidas = maximoVidas;
        this.ondas = maximoOndas;
        this.tiempoInvulnerable = 0;


        this.estado = estados.moviendo;
        // Animaciones
        this.aIdleDerecha = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 6, 3, 7, 16, null, 1, "Idle");


        this.aCorriendoDerecha =
            new Animacion(imagenes.aventurero_atlas,
                this.ancho, this.alto, 3, 6, 7, 16, null, 9, "Corriendo", 1);


        this.aSaltandoDerecha = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 2, 10, 7, 16, this.finAnimacionSalto.bind(this), 15, "Saltando",3);

        this.aCayendoDerecha = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 2, 2, 7, 16, null, 23, "Cayendo",2);

        this.aDeslizarseDerecha = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 5, 5, 7, 16, this.finAnimacionDesliz.bind(this), 25, "Desliz",2);

        this.aAtacarTierraDerecha = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 2, 6, 7, 16, this.finAnimacionAtaque.bind(this), 43, "Ataque_Tierra", -1, 2, 5 ,
            {
                hitBoxLateralAtaque : 11,   // Negativo dificulta chocar, positivo facilita chocar
                hitBoxLateralAtaqueIzquierda : 0,
                hitboxSuperiorAtaque : -12,
                hitboxInferiorAtaque : -2
            });
        this.aAtacarTierraDerecha_1 = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 2, 5, 7, 16, this.finAnimacionAtaque.bind(this), 49, "Ataque_Tierra_1", -1, 2, 5,
            {
                hitBoxLateralAtaque : 11,
                hitBoxLateralAtaqueIzquierda : 0,
                hitboxSuperiorAtaque : -12,
                hitboxInferiorAtaque : 2
            });



        this.aAtacarAireSubiendo = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 3, 4, 7, 16, this.finAnimacionAtaque.bind(this), 97, "Ataque_Aire_Up", 0, 2, 4,
            {
                hitBoxLateralAtaque : 9,
                hitBoxLateralAtaqueIzquierda : 7,
                hitboxSuperiorAtaque : 4,
                hitboxInferiorAtaque : -12
            }, 0);
        this.aAtacarAireBajando = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 4, 4, 7, 16, this.finAnimacionAtaque.bind(this), 103, "Ataque_Aire_Down", 0, 2, 8,
            {
                hitBoxLateralAtaque : 9,
                hitBoxLateralAtaqueIzquierda : 7,
                hitboxSuperiorAtaque : 6,
                hitboxInferiorAtaque : 8
            }, 0);

        this.animacionesAtaqueTierra = [];
        this.animacionesAtaqueTierra.push(this.aAtacarTierraDerecha);
        this.animacionesAtaqueTierra.push(this.aAtacarTierraDerecha_1);

        this.animacionAtaqueCurrent = this.aAtacarTierraDerecha;


        this.aDisparoOnda = new Animacion(imagenes.aventurero_atlas,
            this.ancho, this.alto, 2, 5, 7, 16, this.finAnimacionOnda.bind(this), 54, "Disparo_Onda", -2, 3, 5,
            {
                hitBoxLateralAtaque : 11,
                hitBoxLateralAtaqueIzquierda : 7,
                hitboxSuperiorAtaque : 0,
                hitboxInferiorAtaque : -7
            }, 2);



        // Particulas
        this.aParticulasIman = new Animacion(imagenes.iman_particulas,
            40, 40, 1, 35, 8, 8, null, 1, "Iman_particulas", -1);

        this.aParticulasInvencibilidad = new Animacion(imagenes.invencibilidad_particulas,
            40, 40, 3, 24, 4, 6, null, 1, "nvencibilidad_particulas");

        this.animacion = this.aIdleDerecha;

        // Disparo onda
        this.cadenciaOnda = cadenciaOnda;
        this.tiempoOnda = 0;

        //Desliz
        this.cadenciaDesliz = cadendiaDeslizamiento;
        this.tiempoDesliz = this.cadenciaDesliz;

        //Ataque
        this.cadenciaAtaque = cadenciaAtaque;
        this.tiempoAtaque = this.cadenciaAtaque;

        // Powerups
        this.tiempoPowerUp = 0;
        this.powerUp = [];
        // this.powerUp.push();


        this.hitbox = {
            hitBoxLateralAtaque : hitboxLateralAtaque,
            hitBoxLateralAtaqueIzquierda : hitboxLateralAtaqueIzquierda,
            hitboxSuperiorAtaque : hitboxSuperiorAtaque,
            hitboxInferiorAtaque : hitboxInferiorAtaque
        }

    }

    actualizar(anchoMapa){

        anchoMapa = anchoMapa || 0;

        for (var i = 0; i< this.powerUp.length; i++){
            if (this.powerUp[i] != powerUps.ninguno){
                this.powerUp[i].tiempo ++;
                if (this.powerUp[i].tiempo > this.powerUp[i].duracion){
                    this.powerUp[i].tiempo = 0;
                    reproducirEfecto(efectos.powerup_final);
                    this.powerUp.splice(i,1);

                }
            }
        }



        if (this.estadoPrevio == estados.atacando && this.animacionAtaqueCurrent != null){
            this.animacionAtaqueCurrent.resetear();
        }
        if (this.estadoPrevio == estados.disparando){
            this.aDisparoOnda.resetear();

        }
        else if (this.estadoPrevio == estados.deslizando){
            this.aDeslizarseDerecha.resetear();
            if (this.estado == estados.atacando)
                this.tiempoDesliz = this.cadenciaDesliz;
            this.margenYColision = this.margenYAux;
        }



        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable --;
        }

        if ((this.x + this.vx) < this.ancho/2){
            this.x = this.ancho/2;
        }
        else if ((this.x + this.vx) > anchoMapa - this.ancho/2) {
            this.x = anchoMapa - this.ancho/2;
        }


        this.animacion.actualizar();
        // ¿Esta en el aire?
        if (this.choqueAbajo == true){
            this.enElAire = false;
            this.aSaltandoDerecha.resetear();

        }

        if (this.choqueArriba == true){
            this.vy = 0 ;

        }

        if (this.enElAire && this.estado == estados.moviendo ){
            this.actualizarEstado(estados.saltando);
        }
        else if (!this.enElAire){
            if (this.estado == estados.saltando){

                this.actualizarEstado(estados.moviendo);
                if (this.animacionAtaqueCurrent != null){
                    this.animacionAtaqueCurrent.resetear();
                    this.animacionAtaqueCurrent = null;
                }

                reproducirEfecto(efectos.aterrizar);

            }
            else if (this.animacionAtaqueCurrent == this.aAtacarAireBajando){
                this.actualizarEstado(estados.moviendo);
                this.animacionAtaqueCurrent.resetear();
                this.animacionAtaqueCurrent = null;


                reproducirEfecto(efectos.aterrizar);
            }
        }





        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        else if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }



        // Selección de animación
        switch (this.estado){
            case estados.atacando:
                if (this.animacion != this.animacionAtaqueCurrent) {

                    if (this.vy == 0) {
                        var index = Math.floor(Math.random() * this.animacionesAtaqueTierra.length);
                        this.animacion = this.animacionesAtaqueTierra[index];
                        this.animacionAtaqueCurrent = this.animacionesAtaqueTierra[index];
                        this.hitbox = this.animacion.hitbox;


                    }
                    else {
                        // Subiendo
                        if (this.vy < 0) {
                            this.animacion = this.aAtacarAireSubiendo;
                            this.animacionAtaqueCurrent = this.aAtacarAireSubiendo;
                            ;
                            this.hitbox = this.animacion.hitbox;

                        }
                        // Bajando
                        else  {
                            this.animacion = this.aAtacarAireBajando;
                            this.animacionAtaqueCurrent = this.aAtacarAireBajando;
                            ;
                            this.hitbox = this.animacion.hitbox;
                        }
                    }
                }
                if (gameLayer.ataqueEspecial == true && this.ondaPorLanzar == true){
                    this.crearOnda();
                }

                break;

            case estados.deslizando:
                if (!this.choqueAbajo && !this.enElAire){
                    this.finAnimacionDesliz();
                    this.aDeslizarseDerecha.resetear();
                }
                else {
                    this.animacion = this.aDeslizarseDerecha;
                }

                break;
            case estados.moviendo:


                if ( this.vx != 0 ) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                }
                else if ( this.vx == 0){
                    if (this.orientacion == orientaciones.derecha) {
                            this.animacion = this.aIdleDerecha;
                    }
                }


                if (!this.choqueAbajo && !this.enElAire){
                    this.animacion = this.aCayendoDerecha;
                    this.enElAire = true;
                }
                break;
            case estados.saltando:
                if (this.orientacion == orientaciones.derecha){
                    if (this.animacion != this.aCayendoDerecha)
                        this.animacion = this.aSaltandoDerecha;
                }
                break;
            case estados.disparando:
                this.animacion = this.aDisparoOnda;

                if (!this.animacion.lanzoAtaque && (this.animacion.frameActual == (this.animacion.frameInicial + frameLanzamientoOnda))){
                    if (gameLayer.nuevaOnda != null){
                        this.animacion.lanzoAtaque = true;
                        this.ondas--;
                        gameLayer.nuevaOnda.x = this.x + this.margenXColision;
                        gameLayer.nuevaOnda.y = this.y + margenYOnda;
                        gameLayer.nuevaOnda.xInicial = this.x + this.margenXColision;

                        gameLayer.ondas.push(gameLayer.nuevaOnda);
                        gameLayer.espacio.agregarCuerpoDinamico(gameLayer.nuevaOnda);
                        reproducirEfecto(efectos.lanzar_onda);
                        gameLayer.textoOndas.setValorOndas(this.ondas);
                        this.tiempoOnda = this.cadenciaOnda;
                    }

                }
                break;

        }


        for (var i = 0; i< this.powerUp.length; i++){
            if (this.powerUp[i].id == powerUps.invencibilidad.id)
                this.aParticulasInvencibilidad.actualizar();
            else if (this.powerUp[i].id == powerUps.iman.id)
                this.aParticulasIman.actualizar();

        }




        // tiempo desliz
        if ( this.tiempoDesliz > 0 && this.tiempoDesliz < this.cadenciaDesliz+1  ) {
            this.tiempoDesliz--;
        }

        // tiempo ataque
        if ( this.tiempoAtaque > 0 && this.tiempoAtaque < this.cadenciaAtaque+1  ) {
            this.tiempoAtaque--;
        }

        // tiempo onda
        if ( this.tiempoOnda > 0 && this.tiempoOnda < this.cadenciaOnda+1  ) {
            this.tiempoOnda--;
        }

    }

    finAnimacionOnda(){
        this.actualizarEstado(estados.moviendo);
    }
    finAnimacionSalto () {
        this.animacion = this.aCayendoDerecha;
    }

    finAnimacionAtaque () {
        this.actualizarEstado(estados.moviendo);
        this.atacando = false;
        this.tiempoAtaque = this.cadenciaAtaque;

    }
    finAnimacionDesliz () {


            this.vx = velocidadJugador;
            this.actualizarEstado(estados.moviendo);
            this.margenYColision = this.margenYAux;
            this.tiempoDesliz = this.cadenciaDesliz;
    }


    moverX (direccion){
            this.vx = direccion * velocidadJugador;
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY + offsetJugador);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY + offsetJugador);
        }




        for (var i = 0; i< this.powerUp.length; i++){

            if (this.powerUp[i].id == powerUps.invencibilidad.id)
                this.aParticulasInvencibilidad.dibujar(this.x - scrollX, this.y - scrollY);
            else if (this.powerUp[i].id == powerUps.iman.id)
                this.aParticulasIman.dibujar(this.x - scrollX, this.y - scrollY);
        }
    }
    saltar(velocidad){
        velocidad =  velocidad || -1*saltoJugador;
        if ( !this.enElAire && this.choqueAbajo == true && !this.choqueArriba) {
            this.vy = velocidad;
            this.actualizarEstado(estados.saltando);
            this.enElAire = true;
            this.tiempoDesliz = this.cadenciaDesliz;
            reproducirEfecto(efectos.saltar);
            if (this.animacionAtaqueCurrent != null)
                this.animacionAtaqueCurrent.resetear();
        }

    }

    deslizar(ignorarCadencia){
        if ( !this.enElAire && this.estado!=estados.deslizando) {

            if (ignorarCadencia == true){
                this.vx = this.vx - ralentizacionDeslizamiento;
                this.actualizarEstado(estados.deslizando);

                this.margenYColision = this.margenXColision + margenYDeslizExtra;
                reproducirEfecto(efectos.deslizarse);


            }
            else if (this.tiempoDesliz <= 0){
                this.vx = this.vx - ralentizacionDeslizamiento;
                this.actualizarEstado(estados.deslizando);
                this.tiempoDesliz = this.cadenciaDesliz+1;

                this.margenYColision = this.margenXColision + margenYDeslizExtra;
                reproducirEfecto(efectos.deslizarse);
            }
        }

    }

    atacar(conOnda){
        var conOnda = conOnda | false;

        if (this.estado == estados.moviendo || this.estado== estados.saltando || this.estado == estados.deslizando){
            if (this.tiempoAtaque <= 0){
                this.actualizarEstado(estados.atacando);
                reproducirEfecto(efectos.ataque_espada);
                this.tiempoAtaque = this.tiempoAtaque+1;

                if (conOnda == true){
                    var rand = Math.random();
                    if ( rand > 0.5){

                        this.ondaPorLanzar = true;
                        reproducirEfecto(efectos.lanzar_onda);
                    }


                }
            }
        }
    }


    dispararOnda(especial){
        var especial = especial | false;

        if ( this.ondas > 0 &&this.tiempoOnda == 0 && (this.estado == estados.moviendo || this.estado == estados.saltando)) {
            // reiniciar Cadencia
            this.actualizarEstado(estados.disparando);
            var onda = new OndaJugador(this.x + frameLanzamientoOnda*this.vx+this.margenXColision, this.y+this.margenYColision/2, especial);
            // this.tiempoOnda = this.cadenciaOnda+1;
            return onda;
        }



        else {
            return null;
        }

    }

    golpeado (){
        if (this.tiempoInvulnerable <= 0 && this.powerUp.indexOf(powerUps.invencibilidad) == -1) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = tiempoInvulnerabilidadJugador;
                return this.vidas;
            }
        }
    }

    actualizarEstado (estado){
        this.estadoPrevio = this.estado;
        this.estado = estado;
    }

    // Si recojo el que ya tengo se refresca la duración.
    setPowerUp (powerUp){
        if (powerUp.id == powerUps.municion.id){
            this.setOndas (this.ondas + 1);
            gameLayer.textoOndas.setValorOndas(this.ondas);
        }
        var already = false;
        for (var i = 0; i<this.powerUp.length; i++){
            if (powerUp.id == this.powerUp[i].id){
                this.powerUp[i].tiempo = 0;
                already = true;
                break;
            }
        }

        if (already == false){
            this.powerUp.push(powerUp);
        }

    }

    setOndas(nOndas){
        if (nOndas > 0 && nOndas <= maximoOndas){
            this.ondas = nOndas;
        }
        else if (nOndas< 0)
            this.ondas = 0;
        else
            this.ondas = maximoOndas;
    }

    crearOnda (){

        if (this.animacionAtaqueCurrent.frameActual == (this.animacionAtaqueCurrent.frameInicial+frameLanzamientoOnda)){
            var onda = new OndaJugador(this.x + frameLanzamientoOnda*this.vx+this.margenXColision, this.y, true);
            gameLayer.ondas.push(onda);
            gameLayer.espacio.agregarCuerpoDinamico(onda);
            this.ondaPorLanzar = false;
        }
    }





}
