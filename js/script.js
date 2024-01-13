//link hacia la gaceta
function gaceta() {
    window.open('https://www.gacetaoficial.gob.cu/es', '_blank');
}

//descarga de marco normativo
function marco() {
    let pdfURL = 'Marco Normativo.pdf';
    let link = document.createElement('a');
    link.href = pdfURL;
    link.download = 'Marco Normativo.pdf';
    link.click();
}

//descarga de dossier
function dossier() {
    let pdfURL = 'dossier.pdf';
    let link = document.createElement('a');
    link.href = pdfURL;
    link.download = 'dossier.pdf';
    link.click();
}

//muestra la información del servicio seleccionado
function mostrarInformacion(id) {
    // Oculta todas las secciones de información
    const secciones = document.querySelectorAll('.informacion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Muestra la sección de información correspondiente al servicio seleccionado
    const seleccionado = document.getElementById(id);
    seleccionado.style.display = 'block';
}

//solicitar un servicio
function enviarSolicitud() {
    alert('Solicitud enviada correctamente.');
}

//funciones para mostrar solo los campos necesarios
function mostrarCampos() {
    const tipoPlanteamiento = document.getElementById('tipoPlanteamiento').value;
    const camposComentario = document.getElementById('camposComentario');
    const camposQueja = document.getElementById('camposQueja');
    let mediaQuery = window.matchMedia('(max-width: 768px)');

    if (tipoPlanteamiento === 'comentario') {
        camposQueja.style.display = 'none';
        if(mediaQuery.matches)
            camposComentario.style.display = 'flex';
        else
            camposComentario.style.display = 'block';
    } else {
        camposComentario.style.display = 'none';
        camposQueja.style.display = 'block';
    }
}

function mostrarCampos2() {
    const tipoPlanteamiento = document.getElementById('tipoQueja').value;
    const nombre = document.getElementById('nombre');
    const direccion = document.getElementById('direccion');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');

    if (tipoPlanteamiento === 'anonima') {
        nombre.style.display = 'none';
        direccion.style.display = 'none';
        email.style.display = 'none';
        telefono.style.display = 'none';
    } else {
        nombre.style.display = 'inline';
        direccion.style.display = 'inline';
        email.style.display = 'inline';
        telefono.style.display = 'inline';
    }
}

//atencion al cliente
function enviarSolicitud2() {
    const tipoPlanteamiento = document.getElementById('tipoPlanteamiento').value;
    const comentario = document.getElementById('comentario').value;
    const tipoQueja = document.getElementById('tipoQueja').value;
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const planteamiento = document.getElementById('planteamiento').value;
    let regexTelefono = /^\d{8}$/;

    if(!regexTelefono.test(telefono) && tipoPlanteamiento != 'comentario' && tipoQueja != 'anonima'){
        alert('Número de teléfono incorrecto.');
        return;
    }
    if(tipoPlanteamiento === 'comentario' && comentario!=''){
        alert('Formulario enviado correctamente.');
        return;
    }
    if(tipoPlanteamiento === 'queja'){
        if(tipoQueja === 'anonima' && planteamiento != ''){
            alert('Formulario enviado correctamente.');
            return;
        }
        if(tipoQueja === 'personal' && planteamiento != '' && nombre != '' && direccion != '' && email != '' && telefono != ''){
            alert('Formulario enviado correctamente.');
            return;
        }
    }

    alert('Faltan campos por llenar.');
}

mostrarCampos();
mostrarCampos2();

const barras = document.querySelector("#barras");
const nav_bar = document.querySelector("#nav-bar");

//expandir y contraer nav-bar mobile
function click_barras() {
    if (nav_bar.classList.contains('contraido')){
        nav_bar.style.transform = 'translateY(0%)';
        nav_bar.classList.remove('contraido');
    }
    else{
        nav_bar.style.transform = 'translateY(-100%)';
        nav_bar.classList.add('contraido');
    }
}

barras.addEventListener("click", click_barras);

//contraer nav-bar mobile
document.addEventListener("click", (event)=>{
    const searchInput = document.querySelector("#searchInput");
    let mediaQuery = window.matchMedia('(max-width: 768px)');
    if(mediaQuery.matches && barras != event.target && !nav_bar.classList.contains('contraido') && !searchInput.contains(event.target))
        click_barras();
})

let marks = [], indice, flag;

//motor de busqueda
function search() {
    const busqueda = document.querySelector("#searchInput").value.toLowerCase();
    if(busqueda.trim() === '')
        return;

    document.querySelector('#boton_busqueda').blur();

    marks = [];
    indice = 0;
    flag = true;
    const body = document.body;
    if(!body.innerText.toLowerCase().includes(busqueda)){
        alert("No se encontraron coincidencias");
        return;
    }
    const children = Array.from(body.children);
    for(let i=0; i < children.length; i++){
        if(children[i].innerText.toLowerCase().includes(busqueda)){
            dfs(children[i], busqueda);
        }
    }
    alert("Se encontraron "+marks.length+" coincidencias. Presione Enter para ir hacia otro resultado");
}

//Búsqueda en profundidad
function dfs(element, busqueda) {
    const children = Array.from(element.children);
    if(children.length === 0){
        if(flag){
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'  
            });
            element.classList.add('result');
        }
        flag = false;
        marks.push(element);
        return;
    }
    for(let i=0; i < children.length; i++){
        if(children[i].innerText.toLowerCase().includes(busqueda)){
            dfs(children[i], busqueda);
        }
    }
}

//desmarcar resultados de búsqueda
function uncheck() {
    let results = document.querySelectorAll('.result');
    results.forEach(result => {
        result.classList.remove('result');
    });
    marks = [];
    indice = 0;
}

//cambiar resultado de búsqueda
function change_result(){
    marks[indice].classList.remove('result');
    if(++indice == marks.length)
        indice = 0;

    marks[indice].classList.add('result');

    marks[indice].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

//desmarcar o iterar resultados de búsqueda al presionar Enter o Esc
document.addEventListener('keydown', (event)=> {
    if(marks.length != 0) {
        if (event.key === 'Enter')
            change_result();
        if(event.key === 'Escape')
            uncheck();
    }
});

//desmarcar resultados de búsqueda al hacer click en la pantalla
document.addEventListener('click', (event)=> {
    const boton = document.querySelector('#boton_busqueda');
    if(!boton.contains(event.target) && marks.length != 0)
        uncheck();
});

// JavaScript para activar la animación al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
    const qualitiesSection = document.getElementById("qualities-section");
    const qualitiesSection2 = document.getElementById("qualities-section2");
    const productsSection = document.getElementById("products_section");
    const atencionSection = document.getElementById("atencion_cliente");
    const eventsSection = document.getElementById("seccion_eventos");

    window.addEventListener("scroll", function () {
        // Verifica si la sección de cualidades está en la pantalla
        let isInViewport = qualitiesSection.getBoundingClientRect().top < window.innerHeight;

        if (isInViewport) {
            // Aplica estilos para hacer la sección visible con una animación
            qualitiesSection.style.opacity = "1";
            qualitiesSection.style.transform = "translateY(0)";
        }

        isInViewport = productsSection.getBoundingClientRect().top < window.innerHeight;

        if (isInViewport) {
            productsSection.style.opacity = "1";
            productsSection.style.transform = "translateY(0)";
        }

        isInViewport = atencionSection.getBoundingClientRect().top < window.innerHeight;

        if (isInViewport) {
            atencionSection.style.opacity = "1";
            atencionSection.style.transform = "translateY(0)";
        }

        isInViewport = eventsSection.getBoundingClientRect().top < window.innerHeight;

        if (isInViewport) {
            eventsSection.style.opacity = "1";
            eventsSection.style.transform = "translateY(0)";
        }

        isInViewport = qualitiesSection2.getBoundingClientRect().top < window.innerHeight;

        if (isInViewport) {
            qualitiesSection2.style.opacity = "1";
            qualitiesSection2.style.transform = "translateY(0)";
        }
    });
});

function agregarProducto(){
    window.location.href = "productos.html";
}
