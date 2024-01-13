let productos = [];
let totalPageProducts;

async function obtenerDatosProductos() {
    try {
        const response = await fetch("json/Productos.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de productos:', error);
        return [];
    }
}

const productosPorPagina = 6;
const productContainer = document.getElementById('productos');
const paginationContainerProducts = document.getElementById('pagination-products');

function mostrarProductos(paginaActual) {
    productContainer.innerHTML = '';

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosPagina = productos.slice(inicio, fin);

    productosPagina.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <div class="arriba">
                <div class="categoria-icono"><img src="img/productos/${producto.categoria}.png" alt="${producto.categoria}"></div>
                <h3 class="titulo">${producto.titulo}</h3>
            </div>
            <div class="medio">
                <p class="descripcion">${producto.descripcion}</p>
            </div>
            <div class="abajo">
                <button class="boton-compra">Hacer Contrato</button>
                <p class="precio"><strong>Precio:</strong> ${producto.precio}</p>
            </div>
        `;
        productContainer.appendChild(productoElemento);
    });
}

function mostrarNumerosPagina() {
    paginationContainerProducts.innerHTML = '';

    for (let i = 1; i <= totalPageProducts; i++) {
        const numeroPagina = document.createElement('div');
        numeroPagina.classList.add('page-number');
        numeroPagina.textContent = i;

        numeroPagina.addEventListener('click', () => {
            mostrarProductos(i);
        });

        paginationContainerProducts.appendChild(numeroPagina);
    }
}

obtenerDatosProductos()
    .then((data) => {
        productos = data.productos;
        totalPageProducts = Math.ceil(productos.length / productosPorPagina);
        mostrarProductos(1);
        mostrarNumerosPagina();
    })
    .catch((error) => {
        console.error('Error al cargar datos de productos:', error);
    });