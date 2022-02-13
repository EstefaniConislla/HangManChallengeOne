let botonIniciar = document.querySelector("#startGame");
let agregarPalabra = document.querySelector("#addWord");
let guardar = document.querySelector("#guardar");
let cancelar = document.querySelector("#cancelar");
let nuevoJuego = document.querySelector("#newGame");
let desistir = document.querySelector("#abandonar");

let inicio = document.querySelector("#inicio");
let aPalabra = document.querySelector("#addpalabra");
let juego = document.querySelector("#juego");
let footer = document.querySelector("footer");

let listaDePalabras = [
  "ORACLE",
  "LATAM",
  "HTML",
  "CSS",
  "GITHUB",
];

let palabra = document.querySelector("#palabra");
let tablero = document.querySelector("canvas");
let pincel = ahorcado.getContext("2d");
let contador = 0;
let flag = false;
let wordGame;
let contadorLetraError = 0;
let listadoLetras = [];
let palabraEnJuego = [];
let esGanador = false;

botonIniciar.addEventListener("click", () => {
  inicio.classList.add("invisible");
  juego.classList.remove("invisible");
  footer.classList.add("footer");
  empezarJuego();
  flag = true;
});

agregarPalabra.addEventListener("click", () => {
  inicio.classList.add("invisible");
  aPalabra.classList.remove("invisible");
  flag = false;
});

guardar.addEventListener("click", () => {
  
  if(!(palabra.value.length > 8)) {
    if(validarPalabra(palabra.value.toUpperCase())) {
      listaDePalabras.push(palabra.value.toUpperCase());
      aPalabra.classList.add("invisible");
      juego.classList.remove("invisible");
      footer.classList.add("footer");
      empezarJuego();
      flag = true;
    }
  } else {
    swal("¡Palabra extensa!", `La palabra debe tener maximo 8 letras y tiene ${palabra.value.length} letras.`, "warning");
  }
});

cancelar.addEventListener("click", () => {
  aPalabra.classList.add("invisible");
  inicio.classList.remove("invisible");
  footer.classList.remove("footer");
  flag = false;
});

desistir.addEventListener("click", () => {
  juego.classList.add("invisible");
  inicio.classList.remove("invisible");
  footer.classList.remove("footer");
  esGanador = false;
  flag = false;
});


function dibujarLetra(letra) {
    let indicador = 0;
    for(let i = 0; i < wordGame.length; i++) {
        if(letra == wordGame[i] && wordGame.join("") != palabraEnJuego.join("")) {
            pincel.beginPath();
            pincel.fillStyle = "#FFFF";
            pincel.font = "bold 50px 'Inter'";
            pincel.fillText(letra, (305 + (60 * i)), 290);
            palabraEnJuego[i] = wordGame[i];
            indicador++;
        }
        
        if(wordGame.join("") == palabraEnJuego.join("")) {
            flag = false;
            esGanador = true;
            dibujarGanador();
        }
    }
    if(indicador == 0) {
        pincel.beginPath();
        pincel.fillStyle = "#FFFF";
        pincel.font = "bold 50px 'Inter'";
        pincel.fillText(letra, (255 + (60 * contadorLetraError)), 390);
        contadorLetraError++;
        return false;
    } else {
        return true;
    }
}

function empezarJuego() {
    pincel.clearRect(0, 0, tablero.width, tablero.height);
    pincel.lineWidth = 3;
    pincel.strokeStyle = "white";
    pincel.beginPath();
    pincel.moveTo(150, 300);
    pincel.lineTo(250, 300);
    pincel.lineTo(200, 285);
    pincel.lineTo(150, 300);
    pincel.stroke();
    contador = 0;
    contadorLetraError = 0;
    listadoLetras = [];
    esGanador = false;
    palabraEnJuego = [];
    let numero = Math.floor(Math.random()*listaDePalabras.length);
    wordGame = listaDePalabras[numero].toUpperCase().split("");
    for(let i=0; i < wordGame.length; i++) {
        pincel.moveTo((300 + (60 * i)), 300);
        pincel.lineTo((350 + (60 * i)), 300);
        pincel.stroke();
    }
}

function dibujarGanador() {
    pincel.beginPath();
    pincel.fillStyle = "orange";
    pincel.font = "bold 40px 'Inter'";
    pincel.fillText("Felicidades,", 405, 100);
    pincel.fillText("Ganaste!", 405, 150);
}

function dibujarPerdedor() {
    pincel.beginPath();
    pincel.fillStyle = "yellow";
    pincel.font = "bold 40px 'Inter'";
    pincel.fillText("Fin del juego!", 405, 100);
}

nuevoJuego.addEventListener("click", () => {
  empezarJuego();
  flag = true;
});

window.addEventListener("keydown", (element) => {
  if (flag && validarLetra(element.key) && contador < 9) {
    if (!listadoLetras.includes(element.key.toUpperCase())) {
      listadoLetras.push(element.key.toUpperCase());
      if(!dibujarLetra(element.key.toUpperCase())){
          crearMuneco(contador);
          contador++;
      }
    } else {
      swal("¡Letra repetida!", `Ha ingresado "${element.key.toUpperCase()}" nuevamente`, "warning");
    }
  } else if (contador >= 9) {
    dibujarPerdedor();
    swal("¡Has perdido!", `La palabra era "${wordGame.join("")}", dale a nuevo juego si quieres volver a jugar.`, "info");
  } else if (esGanador) {
    swal("¡Has ganado!", "Dale a nuevo juego si quieres volver a jugar.", "success");
  }
});

function validarLetra(letraIngresada) {
    const pattern = new RegExp('^[A-Z\u00d1]+$', 'i');
    if(!pattern.test(letraIngresada) || letraIngresada.length > 1) {
        swal("¡Solo letras!", `Ha ingresado "${letraIngresada.toUpperCase()}" y solo se permiten letras.`, "warning");
        return false;
    } else {
        return true;
    }
}

function validarPalabra(letraIngresada) {
    const pattern = new RegExp('^[A-Z\u00d1]+$', 'i');
    if(!pattern.test(letraIngresada)) {
        swal("¡Solo letras!", `Ha ingresado "${letraIngresada.toUpperCase()}" y solo se permiten letras.`, "warning");
        return false;
    } else {
        return true;
    }
}