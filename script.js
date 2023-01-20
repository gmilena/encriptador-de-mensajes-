// @ts-nocheck
// ELEMENTOS HTML //
const elementos = {
  mensaje: document.querySelector("#texto"),
  resultado: document.querySelector("#texto2"),
  btnEncriptar: document.querySelector("#encriptar"),
  btnDesencriptar: document.querySelector("#desencriptar"),
  btnCopiar: document.querySelector("#copiar"),
  mensajeNoEncontrado: document.querySelector("#mensaje-no-encontrado"),
  errorMensajeNoValido: document.querySelector("#error-mensaje"),
  textoCopiado: document.querySelector("#texto-copiado"),
  btnsReiniciarCopiar: document.querySelector("#btn-copiar-reiniciar"),
  errorNoHayMensaje: document.querySelector("#no-hay-mensaje"),
  animacion: document.querySelector(".glitch"),
};

const remplazarLetras = [
  {letter: /e/gi, replacement: "enter"},
  {letter: /o/gi, replacement: "ober"},
  {letter: /i/gi, replacement: "imes"},
  {letter: /a/gi, replacement: "ai"},
  {letter: /u/gi, replacement: "ufat"},
];

// FUNCION PARA VALIDAR EL MENSAJE //
function validarMensaje(text) {
  let letrasAdmitidas = "abcdefghijklmnñopqrstuvwxyz ";
  if (!text || text.trim().length === 0) {
    elementos.errorNoHayMensaje.style.display = "block";
    setTimeout(function () {
      elementos.errorNoHayMensaje.style.display = "none";
    }, 2000);
    return false;
  }
  for (let i = 0; i < text.length; i++) {
    if (letrasAdmitidas.indexOf(text[i]) === -1) {
      elementos.errorMensajeNoValido.style.display = "block";
      setTimeout(function () {
        elementos.errorMensajeNoValido.style.display = "none";
      }, 3000);
      return false;
    }
  }
  elementos.errorMensajeNoValido.style.display = "none";
  elementos.mensajeNoEncontrado.style.display = "none";
  elementos.animacion.style.display = "none";
  return true;
}

// FUNCION ENCRIPTAR //
function encriptar(text) {
  let mensajeEncriptado = text;
  remplazarLetras.forEach(({letter, replacement}) => {
    mensajeEncriptado = mensajeEncriptado.replaceAll(letter, replacement);
  });
  elementos.resultado.style.display = "flex";
  return mensajeEncriptado;
}

// FUNCION DESENCRIPTAR //
function desencriptar(text) {
  let mensajeDesencriptado = text;
  remplazarLetras.forEach(({letter, replacement}) => {
    mensajeDesencriptado = mensajeDesencriptado.replaceAll(
      replacement,
      letter.source
    );
  });
  return mensajeDesencriptado;
}

// FUNCION COPIAR //
function copiar() {
  elementos.textoCopiado.style.display = "block";
  let textoACopiar = document.querySelector("#texto2");
  textoACopiar.select();
  document.execCommand("copy");
  setTimeout(function () {
    elementos.textoCopiado.style.display = "none";
  }, 2000);
}

// FUNCION REINICIAR //
function reiniciar() {
  elementos.mensaje.value = "";
  elementos.resultado.value = "";
  elementos.mensajeNoEncontrado.style.display = "block";
  elementos.btnsReiniciarCopiar.style.display = "none";
  elementos.animacion.style.display = "block";
}

//BOTON ENCRIPTAR //
elementos.btnEncriptar.addEventListener("click", () => {
  const mensaje = elementos.mensaje.value;
  if (!validarMensaje(mensaje)) {
    return;
  }
  elementos.resultado.value = encriptar(mensaje);
  elementos.btnsReiniciarCopiar.style.display = "flex";
});

// BOTON DESENCRIPTAR //
elementos.btnDesencriptar.addEventListener("click", () => {
  const mensaje = elementos.mensaje.value;
  if (validarMensaje(mensaje)) {
    elementos.resultado.value = desencriptar(mensaje);
    elementos.mensaje.value = "";
    elementos.mensajeNoEncontrado.style.display = "none";
    elementos.btnsReiniciarCopiar.style.display = "flex";
  }
});

// BOTON COPIAR //
const btnCopiar = document.querySelector("#copiar");
btnCopiar.addEventListener("click", copiar);

//BOTON REINICIAR //
const btnReiniciar = document.querySelector("#reiniciar");
btnReiniciar.addEventListener("click", reiniciar);
