// Lista re recursos a precargar
var imagenes = {
    titulo: "res/Assets/Menu/title.png",
    scroll: "res/Assets/Menu/Ayuda/scroll.png",
    jugador : "res/Assets/Adventurer/adventurer.png",
    jugador_desliz: "res/Assets/Adventurer/adventurer_slide.png",
    fondo_aux : "res/Assets/Fondos/fondo_aux.png",
    fondo_0 : "res/Assets/Fondos/fondo_0.png",
    fondo_1 : "res/Assets/Fondos/fondo_1.png",
    fondo_2 : "res/Assets/Fondos/fondo_2.png",
    fondo_3 : "res/Assets/Fondos/fondo_3.png",
    fondo_4 : "res/Assets/Fondos/fondo_4.png",
    enemigo_ogro : "res/Assets/Enemigos/Ogro/ogro.png",
    enemigo_ogro_atlas: "res/Assets/Enemigos/Ogro/ogro_atlas.png",
    proyectil_ogro: "res/Assets/Enemigos/Ogro/proyectil.png",
    enemigo_gargola : "res/Assets/Enemigos/Gargola/gargola.png",
    enemigo_gargola_atlas: "res/Assets/Enemigos/Gargola/gargola_atlas.png",
    enemigo_gargola_ataque: "res/Assets/Enemigos/Gargola/ataque.png",
    onda_jugador : "res/Assets/Onda/shockwave.png",
    onda_jugador_atlas: "res/Assets/Onda/shockwave_animation.png",
    onda_jugador_atlas_inverso: "res/Assets/Onda/shockwave_animation_flipped.png",
    onda_jugador_atlas_2: "res/Assets/Onda/shockwave_animation_2.png",
    onda_jugador_atlas_inverso_2: "res/Assets/Onda/shockwave_animation_flipped_2.png",
    onda_jugador_icon: "res/Assets/Onda/shockwave_icon.png",
    moneda: "res/Assets/Coin/coin.png",
    moneda_atlas: "res/Assets/Coin/coin_animation.png",
    moneda_icono: "res/Assets/Coin/coin_icon.png",
    bloque_tierra : "res/Assets/Blocks/level1/tiles_003.png",
    bloque_tierra_inferior : "res/Assets/Blocks/level1/tiles_010.png",
    bloque_tierra_roto: "res/Assets/Blocks/level1/tiles_rota.png",
    bloque_arena: "res/Assets/Blocks/level2/tile_015.png",
    bloque_arena_inferior: "res/Assets/Blocks/level2/tile_004.png",
    bloque_arena_roto: "res/Assets/Blocks/level2/tile_rota.png",
    boton_onda : "res/Assets/HUD/boton_disparo.png",
    boton_salto : "res/Assets/HUD/boton_salto.png",
    boton_desliz : "res/Assets/HUD/boton_slide.png",
    boton_espada : "res/Assets/HUD/boton_espada.png",
    boton_pausa : "res/Assets/HUD/boton_pausa.png",
    boton_jugar : "res/Assets/Menu/boton_jugar.png",
    boton_inventario : "res/Assets/Menu/boton_inventario.png",
    boton_ayuda : "res/Assets/Menu/boton_ayuda.png",
    boton_volver : "res/Assets/Menu/boton_volver.png",
    boton_menu : "res/Assets/Menu/boton_menu.png",
    mensaje_como_jugar_0 : "res/Assets/Menu/Ayuda/mensaje_como_jugar_0.png",
    mensaje_como_jugar_1 : "res/Assets/Menu/Ayuda/mensaje_como_jugar_1.png",
    mensaje_como_jugar_2 : "res/Assets/Menu/Ayuda/mensaje_como_jugar_2.png",
    mensaje_como_jugar_4 : "res/Assets/Menu/Ayuda/mensaje_como_jugar_4.png",
    mensaje_creditos : "res/Assets/Menu/Ayuda/creditos.png",
    mensaje_ganar : "res/Assets/Menu/mensaje_ganar.png",
    mensaje_perder : "res/Assets/Menu/mensaje_perder.png",
    mensaje_final : "res/Assets/Menu/mensaje_final.png",
    calavera_perder : "res/Assets/Menu/skull.png",
    copa_ganar : "res/Assets/Menu/goblet_oro.png",
    muelle: "res/Assets/Blocks/spring.png",
    muelle_animacion: "res/Assets/Blocks/springAnimacion.png",
    aventurero_atlas: "res/Assets/Adventurer/adventurerAtlas.png",
    espada_0 : "res/Assets/Swords/espada_1_simple.png",
    espada_1 : "res/Assets/Swords/espada_2_salud.png",
    espada_2 : "res/Assets/Swords/espada_3_ataque.png",
    espada_3 : "res/Assets/Swords/espada_4_ondas.png",
    espada_4 : "res/Assets/Swords/espada_5_agilidad.png",
    meta: "res/Assets/Goal/goal_flag.png",
    meta_animacion: "res/Assets/Goal/goal_flag_animation.png",
    iman: "res/Assets/PowerUps/magnet.png",
    iman_particulas: "res/Assets/VisualEffects/magnet_particles.png",
    invencibilidad: "res/Assets/PowerUps/star.png",
    invencibilidad_particulas: "res/Assets/VisualEffects/invencible_particles.png",
    municion: "res/Assets/PowerUps/slash.png",
    recuadro_seleccion : "res/Assets/Menu/cuadro_seleccion.png"


};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
