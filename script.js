// =================================================================
// LÓGICA DE LA CUENTA REGRESIVA (CON SEGUNDOS INCLUIDOS)
// =================================================================
const fechaBoda = new Date(2026, 9, 3, 14, 0).getTime(); 

const cuentaRegresiva = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    // Cálculos matemáticos para cada unidad de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000); // <-- NUEVO: Cálculo de segundos

    // Obtener los elementos del HTML
    const dEl = document.getElementById("dias");
    const hEl = document.getElementById("horas");
    const mEl = document.getElementById("minutos");
    const sEl = document.getElementById("segundos"); // <-- NUEVO: Elemento segundos

    // Inyectar los valores con el formato de dos dígitos (ej: "05" en lugar de "5")
    if(dEl) dEl.innerText = dias < 10 ? "0" + dias : dias;
    if(hEl) hEl.innerText = horas < 10 ? "0" + horas : horas;
    if(mEl) mEl.innerText = minutos < 10 ? "0" + minutos : minutos;
    if(sEl) sEl.innerText = segundos < 10 ? "0" + segundos : segundos; // <-- NUEVO: Pintar segundos

    // Si la cuenta regresiva termina
    if (distancia < 0) {
        clearInterval(cuentaRegresiva);
        const cuentaEl = document.querySelector(".cuenta-regresiva");
        if (cuentaEl) cuentaEl.innerHTML = "<h3 style='grid-column: 1/-1;'>¡Llegó el gran día!</h3>";
    }
}, 1000);


// =================================================================
// 2. LÓGICA DEL CARRUSEL DE FOTOS INTERACTIVO
// =================================================================
const carrusel = document.getElementById('carruselFotos');
const btnAnt = document.getElementById('btnAnt');
const btnSig = document.getElementById('btnSig');

if (carrusel && btnAnt && btnSig) {
    // Al hacer clic en Siguiente
    btnSig.addEventListener('click', () => {
        // Desplaza horizontalmente hacia la derecha el ancho de una tarjeta de foto
        const anchoTarjeta = carrusel.clientWidth;
        carrusel.scrollLeft += anchoTarjeta;
    });

    // Al hacer clic en Anterior
    btnAnt.addEventListener('click', () => {
        // Desplaza horizontalmente hacia la izquierda el ancho de una tarjeta de foto
        const anchoTarjeta = carrusel.clientWidth;
        carrusel.scrollLeft -= anchoTarjeta;
    });
}

// Al cargar la página, bloquea el scroll para obligar a interactuar con el telón
document.body.classList.add('bloqueado');

function comenzarExperiencia() {
    var audio = document.getElementById("musica-boda");
    var bienvenida = document.getElementById("pantalla-bienvenida");
    var botonMusica = document.getElementById("btn-musica");
    var iconoMusica = document.getElementById("icono-musica");

    // 1. Desbloquea el scroll de la página
    document.body.classList.remove('bloqueado');

    // 2. Desvanece la pantalla de bienvenida de forma elegante
    bienvenida.classList.add("ocultar");

    // 3. Activa la música automáticamente superando el bloqueo del navegador
    audio.play().then(() => {
        // Si el navegador da permiso, actualiza el botón flotante a "pausa"
        iconoMusica.innerText = "⏸";
        botonMusica.style.backgroundColor = "#808080";
        botonMusica.style.color = "white";
    }).catch(error => {
        console.log("El navegador bloqueó el audio automático: ", error);
    });
}

// Tu función anterior se queda intacta abajo para que puedan pausar/reproducir después:
function controlarMusica() {
    var audio = document.getElementById("musica-boda");
    var boton = document.getElementById("btn-musica");
    var icono = document.getElementById("icono-musica");

    if (audio.paused) {
        audio.play();
        icono.innerText = "⏸";
        boton.style.backgroundColor = "#808080";
        boton.style.color = "white";
    } else {
        audio.pause();
        icono.innerText = "🎵";
        boton.style.backgroundColor = "rgba(253, 252, 249, 0.85)";
        boton.style.color = "var(--color-texto-oscuro)";
    }
}