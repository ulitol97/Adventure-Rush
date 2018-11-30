class MenuLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {

        reproducirMusica(musicas.main_theme);

        this.pergamino = new Boton(imagenes.scroll, canvasInitialWidth/2, canvasInitialHeight/2);
        this.mensajeAyudaActual = 0;
        this.mensajesAyuda = [];
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_0, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_1, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_2, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_3, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_4, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_como_jugar_5, canvasInitialWidth/2, canvasInitialHeight/2));
        this.mensajesAyuda.push(new Boton(imagenes.mensaje_creditos, canvasInitialWidth/2, canvasInitialHeight/2));

        this.botonesEspadas = [];
        this.recuadroSeleccion = new Fondo(imagenes.recuadro_seleccion,canvasInitialWidth/2,canvasInitialHeight*0.4, 1);

        this.espadas = ["simple","salud","ataque","ondas","agilidad"];
        for (var i = 1; i<= this.espadas.length; i++){
            var boton = new Boton("res/Assets/Swords/espada_"+i.toString()+"_"+this.espadas[i-1]+".png",
                (canvasInitialWidth/(this.espadas.length+1))*(i),canvasInitialHeight*0.4);
            this.botonesEspadas.push(boton);
        }
        this.descripcionesEspadas = [];
        this.espadaSeleccionada = 0;
        for (var i = 0; i< this.espadas.length; i++){
            var fondo = new TextoDescripcion(descripcionesEspadas[i],
                (canvasInitialWidth/2),canvasInitialHeight*0.55);
            this.descripcionesEspadas.push(fondo);
        }

        this.fondoTitulo =
            new Fondo(imagenes.titulo,canvasInitialWidth/2,canvasInitialHeight/4);

        this.fondos = [];
        this.botones = [];
        for (var i = 0; i < 5; i++){
            var fondo = new Fondo("res/Assets/Fondos/fondo_"+(i)+".png",canvasInitialWidth/2,canvasInitialHeight*0.5, 1);
            fondo.vx = -4;
            this.fondos.push(fondo);
        }

        this.opcionesMenu = ["inventario", "jugar", "ayuda"];
        for (var i = 0; i< this.opcionesMenu.length; i++){
            var boton = new Boton("res/Assets/Menu/boton_"+this.opcionesMenu[i]+".png",
                (canvasInitialWidth/(this.opcionesMenu.length))*(i),canvasInitialHeight*0.7);
            boton.x += boton.ancho/2 + 40;
            this.botones.push( boton);
        }
        this.botonJugar = this.botones[1];
        this.botonInventario = this.botones [0];
        this.botonAyuda = this.botones [2];
        this.botonVolver = new Boton(imagenes.boton_volver,
            canvasInitialWidth/2,canvasInitialHeight*0.70);



        this.fondo = new FondoTitle(canvasInitialWidth/2,canvasInitialHeight*0.5, this.fondos);
        this.seleccionarEspada(this.botonesEspadas[0].x);


    }

    actualizar(){

        if (this.fondo != undefined){
            this.fondo.actualizar();
            this.dibujar();
        }
    }

    dibujar (){
        this.fondo.dibujar();
        this.fondoTitulo.dibujar();

        for (var i = 0; i < this.botones.length; i++){
            this.botones[i].dibujar();

        }
        if (controles.pausa == true){
            if (controles.inventario == false){
                this.pergamino.dibujar();
                this.mensajesAyuda[this.mensajeAyudaActual].dibujar();
            }
            else {
                this.pergamino.dibujar();
                for (var i = 0; i < this.botonesEspadas.length; i++){
                    this.botonesEspadas[i].dibujar();
                }
                this.descripcionesEspadas[this.espadaSeleccionada].dibujar();
                this.recuadroSeleccion.dibujar();
                this.botonVolver.dibujar();
            }

        }
    }

    calcularPulsaciones(pulsaciones){
        var noPause = false;
        var noInventory = false;
        var nextMensaje = false;
        for(var i=0; i < pulsaciones.length; i++){
            for (var j=0; j < this.botones.length; j++) {
                this.botones[j].pulsado = false;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    if (controles.pausa == true && controles.inventario == false){
                        if (this.mensajeAyudaActual == this.mensajesAyuda.length-1){
                            noPause = true;
                        }
                        else {
                            nextMensaje = true;
                        }

                    }
                    else if (controles.pausa == true){
                        for (var k = 0; k < this.botonesEspadas.length; k++){
                            if (this.botonesEspadas[k].contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                                this.seleccionarEspada(this.botonesEspadas[k].x);
                                this.equiparEspada(k, this.botonesEspadas[k].imagen.src);
                                break;
                            }
                        }
                        if (this.botonVolver.contienePunto(pulsaciones[i].x, pulsaciones[i].y)){
                            noPause = true;
                            noInventory = true;
                        }

                    }

                    else if (this.botones[j].contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botones[j].pulsado = true;
                    }

                }


            }
        }

        if (noPause == true){
            controles.pausa = false;
            this.mensajeAyudaActual = 0;
        }
        if (noInventory == true){
            controles.inventario = false;
        }

        if (nextMensaje){
            this.mensajeAyudaActual++;
        }

        if (!this.botonJugar.pulsado ){
            controles.continuar = false;
        }
        else if (controles.pausa == false)
            controles.continuar = true;

        if (this.botonInventario.pulsado && controles.pausa == false){
            controles.continuar = false;
            controles.pausa = true;
            controles.inventario = true;
        }

        if (this.botonAyuda.pulsado && controles.pausa == false){
            controles.continuar = false;
            controles.pausa = true;

        }

    }

    procesarControles( ) {
        // siguiente pantalla
        if (controles.continuar) {
            pararMusica();
            gameLayer = new GameLayer();
            layer = gameLayer;
            controles.continuar = false;
        }
    }

    seleccionarEspada (x){
        this.recuadroSeleccion.x =  x;
    }

    equiparEspada (index, src){
        reproducirEfecto(efectos.cambio_inventario);
        var srcSplit = src.split("/");
        src = "res/Assets/Swords/" + srcSplit[srcSplit.length-1];
        espadaEquipada = src;
        this.espadaSeleccionada = index;
    }

}

