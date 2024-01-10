// Script para mostrar/ocultar el menú desplegable (Facultades)
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const nav = document.querySelector('nav');

dropdown.addEventListener('click', () => {
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
});

document.addEventListener("click", (event) => {
    if(!dropdown.contains(event.target) && dropdownContent.style.display === 'block')
        dropdownContent.style.display = 'none';
});

//Script para el carrusel de imagenes
document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".carrusel");
    const flechaIzquierda = document.querySelector(".flecha-izquierda");
    const flechaDerecha = document.querySelector(".flecha-derecha");

    let indiceSlide = 0;

    function actualizarCarrusel() {
        carrusel.style.transform = `translateX(${-indiceSlide * 100}%)`;
    }

    function cambiarSlide(direccion) {
        indiceSlide += direccion;
        if (indiceSlide < 0) {
            indiceSlide = carrusel.children.length - 1;
        } else if (indiceSlide >= carrusel.children.length) {
            indiceSlide = 0;
        }
        actualizarCarrusel();
    }

    flechaIzquierda.addEventListener("click", function () {
        cambiarSlide(-1);
    });

    flechaDerecha.addEventListener("click", function () {
        cambiarSlide(1);
    });
});


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

//funciones para hacer scrolls hacia el centro de los elementos
function scrollProductos(){
    const productos = document.querySelector("#products_section h2");
    productos.scrollIntoView({
        behavior: 'smooth',
        block: 'center'       
    });
    let mediaQuery = window.matchMedia('(max-width: 768px)');
    if(mediaQuery.matches)
        barras.click();
}

function scrollEventos(){
    const eventos = document.querySelector("#eventos");
    eventos.scrollIntoView({
        behavior: 'smooth',
        block: 'center'       
    });
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
    if(mediaQuery.matches && !dropdown.contains(event.target) && barras != event.target && !nav_bar.classList.contains('contraido') && !searchInput.contains(event.target))
        click_barras();
})

let marks, indice, flag;

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
        if(flag)
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'       
            });
        flag = false;
        element.classList.add('mark');
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
    let results = document.querySelectorAll('.mark');
    results.forEach(result => {
        result.classList.remove('mark');
    });
    marks = [];
    indice = 0;
}

//cambiar resultado de búsqueda
function change_result(){
    if(++indice == marks.length)
        indice = 0;

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