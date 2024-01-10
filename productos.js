document.addEventListener("DOMContentLoaded", function () {
    const contenedorProductos1 = document.querySelector("#productos");
  
    fetch("json/Productos.json")
      .then(response => response.json())
      .then(data => {
        data.productos.forEach(producto => {
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
                <button class="boton-compra">Comprar</button>
                <p class="precio"><strong>Precio:</strong> ${producto.precio}</p>
            </div>
          `;
          contenedorProductos1.appendChild(productoElemento);
        });
      })
      .catch(error => console.error("Error al cargar el archivo JSON:", error));

  });