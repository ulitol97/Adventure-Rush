class GameLayer extends Layer {

    constructor() {
        super();
        controles.pausa = false;
        this.finJuego = false;
        // this.first = true;
        this.nuevaOnda = null;
        this.monedasRecogidas = 0;
        maximoOndas = maximoOndasBase;
        maximoVidas = maximoVidasBase;
        saltoJugador = saltoJugadorBase;
        this.ataqueEspecial = false;

        this.fondoEspadaUsada = null;
        this.fondoMonedasRecogidas = null;
        this.fondoOndasEnPosesion = null;
        this.textoPausa = new TextoPausa("PAUSA", canvasInitialWidth/2, canvasInitialHeight/4);
        this.botonMenu = new Boton(imagenes.boton_menu, canvasInitialWidth/2, canvasInitialHeight*4/5);

        this.actualizarEspacio = false;
        this.muertePorCaida = false;

        this.iniciar(null, true, true)

        }

    iniciar(victoria,musica, first) {

        if (nivelActual > 0){
            this.muertePorCaida = true;
        }

        this.victoria = victoria | false;
        this.finJuego = false;
        controles.pausaJugador = false;

        if (espadaEquipada == imagenes.espada_1){
            maximoVidas = maximoVidasBase+1;
        }
        else if (espadaEquipada == imagenes.espada_2){
            this.ataqueEspecial = true;
        }
        else if (espadaEquipada == imagenes.espada_3){
            maximoOndas = maximoOndasBase +2;
        }
        else if (espadaEquipada == imagenes.espada_4){
            saltoJugador = saltoJugadorBase + 4;
        }

        if (musica == true){
            reproducirMusica(musicasNivel[nivelActual]);
        }
        // this.first = true;
        // if (first == false){
        //     this.first = false;
        // }



        this.botonSalto = new Boton(imagenes.boton_salto,canvasInitialWidth*0.04,canvasInitialHeight*0.65);
        this.botonDesliz = new Boton(imagenes.boton_desliz,canvasInitialWidth*0.04,canvasInitialHeight*0.8);
        this.botonAtaque = new Boton(imagenes.boton_espada,canvasInitialWidth*0.96,canvasInitialHeight*0.8);
        this.botonOnda = new Boton(imagenes.boton_onda,canvasInitialWidth*0.96,canvasInitialHeight*0.65);
        this.botonPausa = new Boton(imagenes.boton_pausa, canvasInitialWidth*0.05, canvasInitialHeight*0.1);



        this.espacio = new Espacio(gravedad);

        this.scrollX = 0;
        this.scrollY = 0;
        this.bloques = [];
        this.monedas = [];
        this.ondas = [];
        this.proyectiles = [];
        this.powerUps = [];

        // HUD

        this.textoMonedas = new TextoMonedas( 0,canvasInitialWidth*0.95,canvasInitialHeight*0.07 );
        this.fondoMonedas=
            new Fondo(imagenes.moneda_icono, this.textoMonedas.x-canvasInitialWidth*0.03*(maximoMonedas.toString().length-1),canvasInitialHeight*0.05);

        this.textoOndas =
            new TextoOndas(maximoOndas, this.fondoMonedas.x-canvasInitialWidth*0.03*(maximoOndas.toString().length+1),canvasInitialHeight*0.07);

        this.fondoOndas =
            new Fondo(imagenes.onda_jugador_icon, this.textoOndas.x-canvasInitialWidth*0.05,canvasInitialHeight*0.05);

        this.fondoEspada=
            new Fondo(espadaEquipada, this.fondoOndas.x-canvasInitialWidth*0.07,canvasInitialHeight*0.05);


        // HUD

        this.fondo = new Fondo("res/Assets/Fondos/fondo_"+nivelActual+".png",canvasInitialWidth*0.5,canvasInitialHeight*0.5);

        this.enemigos = [];

        this.plataformasSalto = [];


        this.monedasRecogidas = 0;

        this.cargarMapa("res/"+nivelActual+".txt");

        this.nuevaOnda = new OndaJugador(this.jugador.x + frameLanzamientoOnda*this.jugador.vx+
            this.jugador.margenXColision, this.jugador.y+this.jugador.margenYColision/2, false);

    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * anchoBloque;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * anchoBloque; // x central
                    var y = 64 + i * altoBloque; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);


        fichero.send(null);


        for (var i = 0; i < this.plataformasSalto.length; i++){
            this.espacio.agregarCuerpoEstatico(this.plataformasSalto[i]);
        }

        for (var i = 0; i < this.monedas.length; i++){
            this.espacio.agregarCuerpoDinamico(this.monedas[i]);
        }

        for (var i = 0; i < this.powerUps.length; i++){
            this.espacio.agregarCuerpoDinamico(this.powerUps[i]);
        }

        for (var i = 0; i < this.enemigos.length; i++){
            this.espacio.agregarCuerpoDinamico(this.enemigos[i]);
        }

        this.espacio.agregarCuerpoDinamico(this.jugador);

        this.actualizarEspacio = true;
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                // modificación para empezar a contar desde el suelo
                break;
            case "E":
                var enemigo = new Enemigo_ogro(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                break;
            case "F":
                var enemigo = new Enemigo_gargola(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "/":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "U":
                var bloque = new Bloque(imagenes.bloque_tierra_roto, x,y, true);
                bloque.y = bloque.y - altoBloque/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "X": //bloque arena
                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                // this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                bloque = new Bloque(imagenes.bloque_arena, x,y, false);
                bloque.y = bloque.y - altoBloque/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                // this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "?": //bloque arena bajo
                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y;
                // this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                bloque = new Bloque(imagenes.bloque_arena, x,y, false);
                bloque.y = bloque.y;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                // this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "%": //bloque arena roto
                var bloque = new Bloque(imagenes.bloque_tierra_roto, x,y, true);
                bloque.y = bloque.y - altoBloque/2;
                // this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                var bloque2 = new Bloque(imagenes.bloque_arena_roto, x,y, true);
                bloque2.y = bloque2.y - altoBloque/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque2);
                bloque2.vinculado = bloque;
                // this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "M":
                var moneda = new Moneda(x,y);
                moneda.y = moneda.y - (moneda.alto*2/5);
                // modificación para empezar a contar desde el suelo
                this.monedas.push(moneda);
                break;

            case "Y":
               var muelle = new PlataformaSalto(x,y);
                muelle.y = muelle.y - muelle.alto/2;
                // modificación para empezar a contar desde el suelo
                this.plataformasSalto.push(muelle);
                break;
            case "C":
                this.meta = new Meta(x,y);
                this.meta.y = this.meta.y - this.meta.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.meta);
                break;

            case "A":
                var powerUp = new PowerUpAmmo(x,y, 0, 0);
                powerUp.y = powerUp.y - powerUp.alto/2;
                // modificación para empezar a contar desde el suelo
                this.powerUps.push (powerUp);
                break;

            case "S":
                var powerUp = new PowerUpStar(x,y, 0, 0);
                powerUp.y = powerUp.y - powerUp.alto/2;
                // modificación para empezar a contar desde el suelo
                this.powerUps.push (powerUp);
                break;
            case "Z":
                var powerUp = new PowerUpIman(x,y, 0, 0);
                powerUp.y = powerUp.y - powerUp.alto/2;
                // modificación para empezar a contar desde el suelo
                this.powerUps.push (powerUp);
                break;

        }
    }

    finalizarNivel(){
        pararMusica();
        nivelActual++;
        if (nivelActual > nivelMaximo){
            nivelActual = 0;
            controles.pausa = true;
            this.finJuego = true;
            this.mensaje = [];
            this.mensaje.push(new Boton(imagenes.mensaje_final, canvasInitialWidth/2, canvasInitialHeight/2));
        }else {
            // this.first = true;
            controles.pausa = true;
            this.mensaje = [];
            this.mensaje.push(new Boton(imagenes.mensaje_ganar, canvasInitialWidth/2, canvasInitialHeight/2));

            this.fondoEspadaUsada = new Fondo(espadaEquipada, canvasInitialWidth/2, canvasInitialHeight/2-40);
            this.fondoOndasEnPosesion = new Fondo(imagenes.onda_jugador_icon,  canvasInitialWidth/2-17, canvasInitialHeight/2);
            this.fondoMonedasRecogidas = new Fondo(imagenes.moneda_icono, canvasInitialWidth/2-17, canvasInitialHeight/2+40);

            this.textoOndasEnPosesion = new TextoOndas("= " + this.textoOndas.valor, this.fondoOndasEnPosesion.x+15, canvasInitialHeight/2+6);
            this.textoMonedasRecogidas = new TextoMonedas("= " + this.textoMonedas.valor, this.fondoMonedasRecogidas.x+15, canvasInitialHeight/2+47);
            pararMusica();

            this.iniciar(true, true, true);
        }

    }

    finalizarPartida(){
        pararMusica();
        nivelActual = nivelInicial;
        controles.pausa = false;
        controles.pausaJugador = false;
        this.finJuego= false;
        layer = menuLayer;
        reproducirMusica(musicas.main_theme);

    }


    perderNivel(){
        // this.first = true;
        controles.pausa = true;
        this.mensaje = [];
        this.mensaje.push(new Boton(imagenes.mensaje_perder, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensaje.push(new Boton(imagenes.calavera_perder, canvasInitialWidth/2, canvasInitialHeight/2-6));
        reproducirEfecto(efectos.derrota);

        this.iniciar(false, false, false);
    }


    actualizar (){
        console.log(this.jugador.choqueAbajo)

        if (this.finJuego && controles.pausa == false){
            this.finalizarPartida();
            return;
        }



        // if (this.first == true){
        //     this.iniciar(this.victoria, false, false)
        // }


        if (controles.pausa || controles.pausaJugador){
            currentMusica.volume = volumenMusicaPausa;
            return;
        }
        else{
            currentMusica.volume = volumenMusicaNoPausa;
        }


        if (this.actualizarEspacio == true){
            this.espacio.actualizar();
        }



        // Jugador se cae
        if ( this.jugador.y > canvasInitialHeight){
            if (this.muertePorCaida == false){
                this.iniciar(false, false, this.first);
                this.muertePorCaida = true;
            }
            else{
                this.perderNivel();
            }


        }


        if (this.jugador.vx <=0)
            this.fondo.vx = 0;
        else
            this.fondo.vx = velocidadFondo;
        this.fondo.actualizar();



        // actualizar
        this.jugador.actualizar(this.anchoMapa);
        for (var i=0; i < this.ondas.length; i++) {
            this.ondas[i].actualizar();
        }

        for (var i=0; i < this.powerUps.length; i++) {
            this.powerUps[i].actualizar();
        }
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.monedas.length; i++) {
            this.monedas[i].actualizar();
        }
        for (var i=0; i < this.plataformasSalto.length; i++) {
            this.plataformasSalto[i].actualizar();
        }
        for (var i=0; i < this.bloques.length; i++) {
        }
        this.meta.actualizar();

        // Eliminar ondas y proyectiles fuera de pantalla o de rango
        for (var i=0; i < this.ondas.length; i++){
            if (this.ondas[i].estado == estados.muerto){
                this.espacio.eliminarCuerpoDinamico(this.ondas[i]);
                this.ondas.splice(i, 1);
            }
            else if ( this.ondas[i] != null &&
                !this.ondas[i].estaEnPantalla()
            ){

                this.espacio
                    .eliminarCuerpoDinamico(this.ondas[i]);


                this.ondas.splice(i, 1);
            }
        }
        for (var i=0; i < this.proyectiles.length; i++){
            if ( this.proyectiles[i] != null &&
                (!this.proyectiles[i].estaEnPantalla() || this.proyectiles[i].vx == 0))
            {
                this.espacio
                    .eliminarCuerpoDinamico(this.proyectiles[i]);
                this.proyectiles.splice(i, 1);
            }
        }

        // colisiones
        // colisiones: Jugador - Enemigo
        if (this.jugador.powerUp.indexOf(powerUps.invencibilidad) != -1 ){
            for (var i=0; i < this.enemigos.length; i++){

                // Si el enemigo está en rango del jugador
               if ( this.jugador.colisionaEnemigo(this.enemigos[i], this.enemigos[i].tipo, this.enemigos[i].animacion.hitbox) &&
                    this.enemigos[i].estado != estados.muerto){
                    //Poner a muriendo
                    this.enemigos[i].impactado();
                }
            }

            for (var j=0; j < this.bloques.length; j++){
                if (this.bloques[j].destructible){
                    // Si es golpeado
                    if (this.jugador.colisiona(this.bloques[j]) && this.bloques[j] != null){

                        reproducirEfecto(efectos.rotura);
                        this.espacio.eliminarCuerpoEstatico(this.bloques[j]);
                        if (this.bloques[j].vinculado){
                            this.espacio.eliminarCuerpoEstatico(this.bloques[j].vinculado);
                        }
                        this.bloques.splice(j, 1);


                    }
                }
            }
            for (var j=0; j < this.proyectiles.length; j++){


                if (this.jugador.colisiona(this.proyectiles[j]) && this.proyectiles[j]){

                        this.espacio.eliminarCuerpoEstatico(this.proyectiles[j]);
                        this.proyectiles.splice(j, 1);


                }

            }


        }
        if (this.jugador.estado == estados.atacando || this.jugador.estado == estados.disparando){ //else if?
            for (var i=0; i < this.enemigos.length; i++){

                // Si el enemigo está en rango de ser atacado a melé
                if (this.enemigos[i].x - this.enemigos[i].margenXColision/2 >
                    this.jugador.x - this.jugador.ancho/2 - this.jugador.margenXColision/2){


                    // Si es golpeado
                    if (this.jugador.colisionaAtaque(this.enemigos[i], this.jugador.hitbox)){
                        if (this.enemigos[i] != null && this.jugador.atacando) {
                            //Poner a muriendo
                            this.enemigos[i].impactado();

                        }

                    }

                }else if ( this.jugador.colisionaEnemigo(this.enemigos[i], this.enemigos[i].tipo, this.enemigos[i].animacion.hitbox) && this.enemigos[i].estado != estados.muriendo &&
                        this.enemigos[i].estado != estados.muerto){
                    var vidaJugador = this.jugador.golpeado();
                    if (this.jugador.vidas <= 0){
                        this.textoMonedas.setValorMonedas(0);
                        this.perderNivel();
                    }
                }
            }

            for (var j=0; j < this.bloques.length; j++){
                if (this.bloques[j].destructible){
                    // Si es golpeado
                    if (this.jugador.colisionaAtaque(this.bloques[j], this.jugador.hitbox)){
                        if (this.bloques[j] != null && this.jugador.atacando) {
                            reproducirEfecto(efectos.rotura);
                            this.espacio.eliminarCuerpoEstatico(this.bloques[j]);
                            if (this.bloques[j].vinculado){
                                this.espacio.eliminarCuerpoEstatico(this.bloques[j].vinculado);
                            }
                            this.bloques.splice(j, 1);
                        }

                    }
                }
            }
            for (var j=0; j < this.proyectiles.length; j++){
                if (this.jugador.colisionaProyectil(this.proyectiles[j])){
                    if (this.proyectiles[j] != null && this.jugador.atacando) {

                        this.espacio.eliminarCuerpoEstatico(this.proyectiles[j]);
                        this.proyectiles.splice(j, 1);
                    }

                }

            }

        }
        else {
            for (var i=0; i < this.enemigos.length; i++){
                if ( this.jugador.colisionaEnemigo(this.enemigos[i], this.enemigos[i].tipo, this.enemigos[i].animacion.hitbox) && this.enemigos[i].estado != estados.muriendo  &&
                    this.enemigos[i].estado != estados.muerto){
                    var vidaJugador = this.jugador.golpeado();
                    if (this.jugador.vidas <= 0){
                        this.perderNivel();
                    }
                }
            }

        }


        // colisiones: Jugador - Muelle
        for (var i=0; i < this.plataformasSalto.length; i++){
            if ( this.jugador.colisionaArriba(this.plataformasSalto[i])){
                // Salto casi el doble de lo normal
                this.jugador.saltar(saltoMuelle);
                this.plataformasSalto[i].activarMuelle();

            }
        }

        // colisiones: ondaJugador - Enemigo y proyectiles, bloques
        for (var i=0; i < this.ondas.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.ondas[i] != null &&
                    this.enemigos[j] != null &&
                    this.ondas[i].colisionaEnemigo(this.enemigos[j], this.enemigos[j].tipo)) {

                    //Poner a muriendo
                    this.enemigos[j].impactado();

                }
            }
            for (var j=0; j < this.proyectiles.length; j++){

                    if (this.ondas[i] != null &&
                        this.ondas[i].colisionaProyectil(this.proyectiles[j])) {


                        this.espacio
                            .eliminarCuerpoEstatico(this.proyectiles[j]);
                        this.proyectiles.splice(j, 1);


                    }
            }
            for (var j=0; j < this.bloques.length; j++){
                if (this.bloques[j].destructible == true){

                    if (this.ondas[i] != null &&
                        this.bloques[j] != null &&
                        this.ondas[i].colisiona(this.bloques[j])) {

                        this.espacio
                            .eliminarCuerpoEstatico(this.bloques[j]);
                        if (this.bloques[j].vinculado){
                            this.espacio.eliminarCuerpoEstatico(this.bloques[j].vinculado);
                        }
                        this.bloques.splice(j, 1);
                        reproducirEfecto(efectos.rotura);


                    }
                }
                else {
                }

            }
        }

        // colisión: Jugador-moneda: puntos
        for (var i=0; i < this.monedas.length; i++){
            if ( this.jugador.colisiona(this.monedas[i])){
                this.espacio.eliminarCuerpoDinamico(this.monedas[i]);
                this.monedas.splice(i, 1);
                this.monedasRecogidas++;
                reproducirEfecto(efectos.coin);
                this.textoMonedas.setValorMonedas(this.monedasRecogidas);
            }
        }

        // colisión: Jugador-powerUp: cambio estado
        for (var i=0; i < this.powerUps.length; i++){
            if ( this.jugador.colisiona(this.powerUps[i])){
                this.jugador.setPowerUp (this.powerUps[i].powerUp);
                this.powerUps[i].recoger();
                this.espacio.eliminarCuerpoDinamico(this.powerUps[i]);
                this.powerUps.splice(i, 1);
             }
        }

        // colisiones: jugador - proyectilEnemigo
        for (var i=0; i < this.proyectiles.length; i++){
            if ( this.jugador.colisionaProyectil(this.proyectiles[i])){
                var vidaJugador = this.jugador.golpeado();
                if (this.jugador.vidas <= 0){
                    this.perderNivel();
                }
            }
        }






        // borrar muertos
        // Enemigos muertos fuera del juego y fuera de pantalla por la izquierda
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null && (
                this.enemigos[j].estado == estados.muerto ||
                    this.enemigos[j].x < 0 - this.enemigos[j].ancho/2)  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);


                this.enemigos.splice(j, 1);
            }
        }



    }

    calcularScroll(){

        // limite izquierda
        if ( this.jugador.x > canvasInitialWidth * 0.1) {
            if (this.jugador.x - this.scrollX < canvasInitialWidth * 0.9) {
                // para en límite derecha
                if (!(this.jugador.x > this.anchoMapa - canvasInitialWidth * 0.9)) {
                    this.scrollX = this.jugador.x - canvasInitialWidth * 0.1;
                }
            }
        }

        // limite arriba
        if ( this.jugador.y < canvasInitialHeight * 0.1) {
            if (this.jugador.y - this.scrollY < canvasInitialHeight * 0.9) {
                this.scrollY = this.jugador.y - canvasInitialHeight * 0.1;
            }
        }

    }


    dibujar (){

        // if (this.first == true)
        //         return;
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX , this.scrollY );
            // this.bloques[i].dibujar(this.scrollX + this.jugador.margenXColision/2, this.scrollY + this.jugador.margenYColision/2);
        }

        this.meta.dibujar(this.scrollX, this.scrollY);

        for (var i=0; i < this.monedas.length; i++) {
            this.monedas[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.powerUps.length; i++) {
            this.powerUps[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.proyectiles.length; i++) {
            this.proyectiles[i].dibujar(this.scrollX, this.scrollY);
        }


        for (var i=0; i < this.plataformasSalto.length; i++){
            this.plataformasSalto[i].dibujar(this.scrollX, this.scrollY);
        }

        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.ondas.length; i++) {
            this.ondas[i].dibujar(this.scrollX, this.scrollY);
        }


        this.jugador.dibujar(this.scrollX, this.scrollY);

        this.textoOndas.dibujar();
        this.fondoOndas.dibujar();

        this.textoMonedas.dibujar();
        this.fondoMonedas.dibujar();

        this.fondoEspada.dibujar();

        if (!controles.pausa && entrada == entradas.pulsaciones && controles.pausaJugador == false) {
            this.botonAtaque.dibujar();
            this.botonSalto.dibujar();
            this.botonDesliz.dibujar();
            this.botonOnda.dibujar();
            this.botonPausa.dibujar()
        }

        if (controles.pausa) {
            for (var m = 0; m < this.mensaje.length;m++){
                this.mensaje[m].dibujar();
            }


            if (this.victoria == true && this.finJuego == false) {
                this.fondoEspadaUsada.dibujar();
                this.fondoMonedasRecogidas.dibujar();
                this.fondoOndasEnPosesion.dibujar();
                this.textoMonedasRecogidas.dibujar();
                this.textoOndasEnPosesion.dibujar();
            }

        }
        else if (controles.pausaJugador){
            this.textoPausa.dibujar();
            this.botonMenu.dibujar();
        }



    }

    procesarControles(){

        if (controles.continuar){
            controles.continuar = false;
            controles.pausa = false;
        }


        // onda
        if (controles.onda) {
            var onda = this.jugador.dispararOnda();
            if (onda != null) {
                this.nuevaOnda = onda;
            }
        }


        // atacar
        if ( controles.ataque){
            this.jugador.atacar(this.ataqueEspecial);
        }

        // Eje X
        // if ( controles.moverX > 0 ){
        this.jugador.moverX(1);


        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.saltar();

        } else if ( controles.moverY < 0 ){
            this.jugador.deslizar();

        }

    }

    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonAtaque.pulsado = false;
        this.botonSalto.pulsado = false;
        this.botonMenu.pulsado = false;
        this.botonDesliz.pulsado = false;
        this.botonOnda.pulsado = false;
        this.botonPausa.pulsado = false;

        // suponemos que el pad está sin tocar
        controles.moverX = 0;

        // Suponemos a false
        controles.continuar = false;

        if (controles.pausa == false && controles.pausaJugador == false) {

            for (var i = 0; i < pulsaciones.length; i++) {
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.continuar = true;
                        if (this.botonOnda.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                            this.botonOnda.pulsado = true;
                            if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                                controles.onda = true;
                            }
                        }

                        if (this.botonPausa.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                            this.botonPausa.pulsado = true;
                            if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                                controles.pausaJugador = true;
                            }
                        }
                }

                for (var i = 0; i < pulsaciones.length; i++) {
                    if (this.botonAtaque.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botonAtaque.pulsado = true;
                        if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                            controles.ataque = true;
                        }
                    }
                    if (this.botonSalto.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botonSalto.pulsado = true;
                        if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                            controles.moverY = 1;
                        }
                    }
                    if (this.botonDesliz.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botonDesliz.pulsado = true;
                        if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                            controles.moverY = -1;
                        }
                    }

                }


            }
        }
        else {
            for (var i = 0; i < pulsaciones.length; i++) {
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.continuar = true;

                    if (controles.pausaJugador == true) {
                        if (this.botonMenu.contienePunto(pulsaciones[i].x, pulsaciones[i].y) == true) {
                            this.finJuego = true;
                            controles.pausaJugador = false;
                            break;
                        }
                        else {
                            controles.pausaJugador = false;
                        }
                    }
                }
            }
        }




        // No pulsado - Boton espada
        if ( !this.botonAtaque.pulsado ){
            controles.ataque = false;
        }

        // No pulsado - Boton Onda
        if ( !this.botonOnda.pulsado ){
            controles.onda = false;
        }

        // No pulsado - Boton Salto
        if ( !this.botonSalto.pulsado && !this.botonDesliz.pulsado ){
            controles.moverY = 0;
        }




    }
}
