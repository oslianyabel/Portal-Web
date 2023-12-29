document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor de productos
    const contenedorProductos1 = document.querySelector("#Habana");
  
    // Simular la carga del archivo JSON (puedes cargarlo desde una URL en una aplicación real)
    fetch("json/Habana.json")
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

    const contenedorProductos2 = document.querySelector("#SSP");
    fetch("json/SSP.json")
      .then(response => response.json())
      .then(data => {
        // Iterar sobre la lista de productos y crear elementos HTML
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
          // Agregar el producto al contenedor
          contenedorProductos2.appendChild(productoElemento);
        });
      })
      .catch(error => console.error("Error al cargar el archivo JSON:", error));

      const contenedorProductos3 = document.querySelector("#Santiago");
      fetch("json/Santiago.json")
      .then(response => response.json())
      .then(data => {
        // Iterar sobre la lista de productos y crear elementos HTML
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
          // Agregar el producto al contenedor
          contenedorProductos3.appendChild(productoElemento);
        });
      })
      .catch(error => console.error("Error al cargar el archivo JSON:", error));
  });