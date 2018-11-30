
var currentMusica = null;

var efectos = {
    muelle : "res/Assets/SoundEffects/muelle.mp3",
    rotura: "res/Assets/SoundEffects/rotura.mp3",
    ataque_espada: "res/Assets/SoundEffects/sword_slash.mp3",
    cambio_inventario: "res/Assets/SoundEffects/changing_swords.mp3",
    coin: "res/Assets/SoundEffects/coin.mp3",
    derrota: "res/Assets/SoundEffects/defeat.mp3",
    ogro_dispara: "res/Assets/SoundEffects/ogro/shoot.mp3",
    ogro_muerte: "res/Assets/SoundEffects/ogro/dead.mp3",
    saltar: "res/Assets/SoundEffects/jump.mp3",
    aterrizar: "res/Assets/SoundEffects/jump_landing.mp3",
    deslizarse: "res/Assets/SoundEffects/slide.mp3",
    lanzar_onda: "res/Assets/SoundEffects/lanzar_onda.mp3",
    onda_recoger: "res/Assets/SoundEffects/onda_recoger.mp3",
    powerup_recoger: "res/Assets/SoundEffects/powerup_recoger.mp3",
    powerup_final: "res/Assets/SoundEffects/powerup_final.mp3",
}

var musicas = {
    main_theme : "res/Assets/Music/main_theme.mp3",
    level_0 : "res/Assets/Music/level_0.mp3",
    level_1 : "res/Assets/Music/level_1.mp3",
    level_2 : "res/Assets/Music/level_2.mp3",
    level_3 : "res/Assets/Music/level_3.mp3",
    level_4 : "res/Assets/Music/level_4.mp3",
}

var musicasNivel = [musicas.level_0, musicas.level_1,musicas.level_2,musicas.level_3,musicas.level_4];

function reproducirMusica(srcMusica) {
    if (currentMusica != null){
        pararMusica();
    }
    currentMusica = new Audio (srcMusica);
    currentMusica.play();
    currentMusica.loop = true;
}

function pararMusica() {
    currentMusica.pause();
    currentMusica.currentTime = 0;
}

function reproducirEfecto(srcEfecto) {
    var efecto = new Audio(srcEfecto);
    efecto.play();
}
