var gamepad = null;
var refrescoMandoInterval = null;
var pressedButtons = [];
var pausaPressed = false;
var previaPulsacionStart = false;



window.addEventListener("gamepadconnected", function(e) {
    // Leer botones del mando
    if ( navigator.getGamepads()[0] != null ){
        gamepad = navigator.getGamepads()[0];
        refrescoMandoInterval =setInterval(checkControls,1000/60);
    }

});


window.addEventListener("gamepaddisconnected", function(e) {
    entrada = entradas.pulsaciones;
    gamepad = null;
    clearInterval(refrescoMandoInterval);
});


function checkControls(){

    if (gamepad != null){
        gamepad = navigator.getGamepads()[0];

        // Botones
        if (entrada != entrada.gamepad){
            for(var b = 0; b < gamepad.buttons.length; b++) {
                if(gamepad.buttons[b].pressed) {
                    entrada = entradas.gamepad;
                }
                pressedButtons[b] = false;
            }

        }

        if (entrada != entradas.gamepad){
            return;
        }


        if (layer == gameLayer){
            if (controles.pausa == true && gamepad.buttons[9].pressed){ // A o START
                controles.continuar = true;
                pausaPressed = true;

            }
            else {
                // Logica de botones
                // Pausa con START
                if (gamepad.buttons[9].pressed){
                    if (pressedButtons[9] == false){
                        pressedButtons[9] = true;
                        previaPulsacionStart = true;
                        if (layer == gameLayer){
                            if (controles.pausaJugador == true && pausaPressed == false){
                                controles.pausaJugador = false;
                                pausaPressed =  true;
                            }
                            else if(controles.pausa == false && pausaPressed == false){
                                controles.pausaJugador = true;
                                pausaPressed = true;
                            }


                        }
                    }
                }
                else {
                    pressedButtons[9] = false;
                    pausaPressed = false;
                    previaPulsacionStart = false;
                }

                // Onda
                if (gamepad.buttons[1].pressed){ // 1 es el botón B
                    if (pressedButtons[1] == false ) {
                        pressedButtons[1] = true;
                        controles.onda = true;
                    }
                } else {
                    pressedButtons[1] = false;
                    controles.onda = false;
                }

                // Salto

                if (gamepad.buttons[12].pressed){
                    if (pressedButtons[12] == false) {

                        pressedButtons[12] = true;
                        controles.moverY = 1;
                    }

                } else {
                    pressedButtons[12] = false;
                    controles.moverY = 0;
                }

                // Desliz

                if (gamepad.buttons[13].pressed){
                    if (pressedButtons[13] == false ) {
                        pressedButtons[13] = true;
                        controles.moverY = -1;
                    }
                } else if (!gamepad.buttons[12].pressed) {
                    pressedButtons[13] = false;
                    controles.moverY = 0;
                }


                // Ataque

                if (gamepad.buttons[2].pressed){ // 2 es el botón X
                    if (pressedButtons[2] == false ) {
                        pressedButtons[2] = true
                        controles.ataque = true;
                    }
                } else {
                    pressedButtons[2] = false
                    controles.ataque = false;
                }
            }
        }
        else{

            if (gamepad.buttons[9].pressed){
                pressedButtons[9] = true;
            }
            else {
                pressedButtons[9] = false;
                previaPulsacionStart = false;
            }


            if (gamepad.buttons[9].pressed && previaPulsacionStart == false){
                if (controles.pausa == true){
                    controles.pausa = false;
                }
                else{
                    controles.continuar = true;
                    pausaPressed = true;
                }
            }
        }
    }

}