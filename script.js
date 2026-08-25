const tablero = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
];
let tableroOriginal = [];
for (let i = 0; i < tablero.length; i++) {
    tableroOriginal.push([...tablero[i]]);
}

function imprimirTablero(tablero) {
    for (let contador = 0; contador < tablero.length; contador++) {
        for (let contador2 = 0; contador2 < tablero[contador].length; contador2++) {
            console.log(tablero[contador][contador2]);
        }
    }
}
function esValido(tablero, fila, columna, numero) {
    for (let i = 0; i < 9; i++) {
        if (tablero[fila][i] === numero) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (tablero[i][columna] === numero) {
            return false;
        }
    }
    const inicioFila = Math.floor(fila / 3) * 3;
    const inicioColumna = Math.floor(columna / 3) * 3;
    for (let i = inicioFila; i < inicioFila + 3; i++) {
        for (let j = inicioColumna; j < inicioColumna + 3; j++) {
            if (tablero[i][j] === numero) {
                return false;
            }
        }
    }
    return true;
}
function colocarNumero(tablero, fila, columna, numero) {
    if (esValido(tablero, fila, columna, numero)) {
        tablero[fila][columna] = numero;
    } else {
        console.log(`Error: no se puede colocar ${numero} en fila ${fila}`);
    }
}
function estaResuelto(tablero) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (tablero[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function generarTablero() {
    let contenedorTablero = document.getElementById("tablero");
    contenedorTablero.innerHTML = "";
    for (let fila = 0; fila < 9; fila++) {
        for (let columna = 0; columna < 9; columna++) {
            let celda = document.createElement("input");
            celda.type = "number";
            if ((fila + 1) % 3 === 0 && fila !== 8) {
                celda.classList.add("borde-inferior");
            }

            // aquí falta: si tablero[fila][columna] no es 0, poner ese valor en celda.value
            if (tablero[fila][columna] !== 0) {
                celda.value = tablero[fila][columna];
                celda.disabled = true;
            }
            contenedorTablero.appendChild(celda);

            celda.addEventListener("change", function () {
                let valorIngresado = parseInt(celda.value);
                
                if (esValido(tablero, fila, columna, valorIngresado)) {
                    celda.classList.remove("error");
                    colocarNumero(tablero, fila, columna, valorIngresado);
                    if (estaResuelto(tablero)) {
                        document.getElementById("mensajeVictoria").classList.remove("oculto");
                    }
                } else {
                    celda.classList.add("error");
                }
            });
        }
    }

}
generarTablero();

document.getElementById("reiniciar").addEventListener("click", function () {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i] = [...tableroOriginal[i]];
    }
    generarTablero();
    document.getElementById("mensajeVictoria").classList.add("oculto");
});