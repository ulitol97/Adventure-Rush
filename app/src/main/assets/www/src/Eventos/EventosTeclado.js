var teclas = [];
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);



function onKeyDown( event) {

        entrada = entradas.teclado;

        if (gameLayer){
            if (controles.pausa == true && event.keyCode == 32){
                controles.continuar = true;
            }
            else {
                // agregar la tecla pulsada si no estaba
                var posicion = teclas.indexOf(event.keyCode);
                if ( posicion == -1 ) {
                    teclas.push(event.keyCode);
                    switch ( event.keyCode ){
                        case 13:
                            if (layer == gameLayer && controles.pausa == false)
                                controles.pausaJugador = true;
                            break;
                        case 86:
                            if (controles.pausa == false)
                                controles.onda = true;
                            break;
                        case 32:
                            if (controles.pausa == false && controles.pausaJugador == false)
                                controles.ataque = true;
                            controles.continuar = true;
                            controles.pausaJugador = false;
                            break;
                        case 38:
                            controles.moverY = 1;
                            break;
                        case 40:
                            controles.moverY = -1;
                            break;
                    }
                }
            }
        }
        else{
            if (event.keyCode == 32){
                if (controles.pausa == true){
                    controles.pausa = false;
                }
                else{
                    controles.continuar = true;
                }


            }
        }
}

function onKeyUp( event) {
        // sacar la tecla pulsada
        var posicion = teclas.indexOf(event.keyCode);
        teclas.splice( posicion, 1);
        switch ( event.keyCode ){
            case 86 :
                controles.onda = false;
                break;
            case 32:
                controles.ataque = false;
                break;
            case 38:
                if ( controles.moverY == 1 ){
                    controles.moverY = 0;
                }
                break;
            case 40:
                if ( controles.moverY == -1 ){
                    controles.moverY = 0;
                }
                break;
        }
}
