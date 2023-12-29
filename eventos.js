let eventos = [];
let totalPaginas;

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

const eventosPorPagina = 3;
const eventCardsContainer = document.getElementById('event-cards');
const paginationContainer = document.getElementById('pagination');

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
            <h3>${evento.titulo}</h3>
            <div class="foto">
                <img src="img/eventos/${evento.imagen}" alt="${evento.titulo}">
            </div>
            <h4>${evento.fecha}</h4>
            <p>${evento.descripcion}</p>
        `;
        eventCardsContainer.appendChild(card);
    });
}

// Función para mostrar números de página
function mostrarNumerosDePagina() {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const numeroPagina = document.createElement('div');
        numeroPagina.classList.add('page-number');
        numeroPagina.textContent = i;

        numeroPagina.addEventListener('click', () => {
            mostrarEventos(i);
        });

        paginationContainer.appendChild(numeroPagina);
    }
}

obtenerDatosEventos()
    .then((data) => {
        eventos = data.eventos;
        totalPaginas = Math.ceil(eventos.length / eventosPorPagina);
        mostrarEventos(1);
        mostrarNumerosDePagina();
    })
    .catch((error) => {
        console.error('Error al cargar datos de eventos:', error);
    });
