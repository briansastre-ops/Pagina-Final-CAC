const formLogin = document.querySelector(".form-login");
const inputUser = document.querySelector('.form-login input[type="text"]');
const inputPass = document.querySelector('.form-login input[type="password"]');
const alertaError = document.querySelector(".form-login .alerta-error");
const alertaExito = document.querySelector(".form-login .alerta-exito");

const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
const passwordRegex = /^.{4,12}$/;

const estadoValidacionCampos = {
  userName: false,
  userPassword: false,
};

document.addEventListener("DOMContentLoaded", () => {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarFormulario();
  });

  inputUser.addEventListener("input", () => {
    validarCampo(userNameRegex, inputUser, "El usuario tiene que ser de 4 a 16 dígitos y solo puede contener letras y guión bajo.");
  });

  inputPass.addEventListener("input", () => {
    validarCampo(passwordRegex, inputPass, "La contraseña tiene que ser de 4 a 12 dígitos");
  });
});

function validarCampo(regularExpresion, campo, mensaje) {
  const validarCampo = regularExpresion.test(campo.value);
  if (validarCampo) {
    eliminarAlerta(campo.parentElement.parentElement);
    estadoValidacionCampos[campo.name] = true;
    campo.parentElement.classList.remove("error");
    return;
  }
  estadoValidacionCampos[campo.name] = false;
  campo.parentElement.classList.add("error");
  mostrarAlerta(campo.parentElement.parentElement, mensaje);
}

function mostrarAlerta(referencia, mensaje) {
  eliminarAlerta(referencia);
  const alertaDiv = document.createElement("div");
  alertaDiv.classList.add("alerta");
  alertaDiv.textContent = mensaje;
  referencia.appendChild(alertaDiv);
}

function eliminarAlerta(referencia) {
  const alerta = referencia.querySelector(".alerta");

  if (alerta) alerta.remove();
}

function enviarFormulario() {
  // VALIDAMOS EL ENVIO DE NUESTRO FORMULARIO
  if (estadoValidacionCampos.userName && estadoValidacionCampos.userPassword) {
    /* ACTUALIZACION DEL CODIGO - RESETEAMOS A FALSE LAS PROPIEDADES DEL OBJETO */
    estadoValidacionCampos.userName = false;
    estadoValidacionCampos.userPassword = false;

    formLogin.reset();
    alertaExito.classList.add("alertaExito");
    alertaError.classList.remove("alertaError");
    setTimeout(() => {
      alertaExito.classList.remove("alertaExito");
    }, 3000);
    return;
  }

  alertaExito.classList.remove("alertaExito");
  alertaError.classList.add("alertaError");
  setTimeout(() => {
    alertaError.classList.remove("alertaError");
  }, 3000);
}
