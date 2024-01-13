let eventos = [];
let totalPageEvents;

async function obtenerDatosEventos() {
    try {
        const response = await fetch('json/Eventos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de eventos:', error);
        return [];
    }
}

const eventosPorPagina = 2;
const eventCardsContainer = document.getElementById('event-cards');
const paginationContainerEvents = document.getElementById('pagination');

// Función para mostrar eventos en tarjetas
function mostrarEventos(paginaActual) {
    eventCardsContainer.innerHTML = '';

    const inicio = (paginaActual - 1) * eventosPorPagina;
    const fin = inicio + eventosPorPagina;

    const eventosPagina = eventos.slice(inicio, fin);

    eventosPagina.forEach((evento) => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <b>${evento.titulo}</b>
            <div class="foto">
                <img src="img/eventos/${evento.imagen}" alt="${evento.titulo}">
            </div>
            <b>${evento.fecha}</b>
            <p>${evento.descripcion}</p>
        `;
        eventCardsContainer.appendChild(card);
    });
}

// Función para mostrar números de página
function mostrarNumerosDePagina() {
    paginationContainerEvents.innerHTML = '';

    for (let i = 1; i <= totalPageEvents; i++) {
        const numeroPagina = document.createElement('div');
        numeroPagina.classList.add('page-number');
        numeroPagina.textContent = i;

        numeroPagina.addEventListener('click', () => {
            mostrarEventos(i);
        });

        paginationContainerEvents.appendChild(numeroPagina);
    }
}

let currentPage = 1;
function derecha(){
    currentPage++;
    if(currentPage > totalPageEvents){
        currentPage = 1;
    }
    mostrarEventos(currentPage);
}

function izquierda(){
    currentPage--;
    if(currentPage == 0){
        currentPage = totalPageEvents;
    }
    mostrarEventos(currentPage);
}

const flechaIzquierda = document.querySelector('#flecha-izquierda');
const flechaDerecha = document.querySelector('#flecha-derecha');
flechaIzquierda.addEventListener("click", izquierda);
flechaDerecha.addEventListener("click", derecha);

obtenerDatosEventos()
    .then((data) => {
        eventos = data.eventos;
        totalPageEvents = Math.ceil(eventos.length / eventosPorPagina);
        mostrarEventos(1);
        mostrarNumerosDePagina();
    })
    .catch((error) => {
        console.error('Error al cargar datos de eventos:', error);
    });
