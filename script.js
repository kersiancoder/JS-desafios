//Variables de información.
let vehiculos = [];
let usuario;

//Variables para autenticación y usuario.
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let inputUsuario
let btnLimpiarStorage;
let vehiculosAgregados;
let contenedorFormularioVehiculos

//Variables para el formulario de vehículos.
let formulario;
let inputKm;
let inputNuevo;
let inputTipo;
let inputOcupantes;
let inputPrecioCompra;
let contenedorVehiculos;
let contenedorVentas;
let filtros;
let filtro1;
let filtro2;
let filtro3;
let filtro4;


//Constantes de selectores.
const MARCA = document.querySelectorAll('#select-marca')[0];
const MODELO = document.querySelectorAll('#select-modelo')[0];
const DEFAULT = MODELO.innerHTML;
const ANIO = document.getElementById('inputAnio');

//Constante de Año
const ANIOACTUAL = new Date().getFullYear();

// For de años 1920 al Año actual.
for (var i = ANIOACTUAL; i >= 1920; i--) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    ANIO.appendChild(option);
}

//Clase para crear los vehículos.
class Vehiculo {
    static count = 0;
    constructor(marca, modelo, anio, km, nuevo, tipo, ocupantes, precioCompra, precioVenta, img) {
        this.id = ++this.constructor.count
        this.marca = marca
        this.modelo = modelo
        this.anio = anio
        this.km = km
        this.nuevo = nuevo
        this.tipo = tipo
        this.ocupantes = ocupantes
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
        this.img = `./images/${modelo}.jpg`
    }
    calcularCosto = () => this.precioCompra
    calcularVenta = () => this.precioVenta
}

//Inicializamos los elementos.
function inicializarElementos() {
    formulario = document.getElementById("formulario");
    inputMarca = document.getElementById("inputMarca");
    inputModelo = document.getElementById("inputModelo");
    inputAnio = document.getElementById("inputAnio");
    inputKm = document.getElementById("inputKm");
    inputOcupantes = document.getElementById("inputOcupantes");
    inputPrecioCompra = document.getElementById("inputPrecioCompra");
    contenedorVehiculos = document.getElementById("contenedor-vehiculos");
    contenedorVentas = document.getElementById("ventas-total");
    filtros = document.getElementById("filtros");
    filtro1 = document.getElementById("filtro1"); 
    filtro2 = document.getElementById("filtro2");
    filtro3 = document.getElementById("filtro3");
    filtro4 = document.getElementById("filtro4");    
    btnLimpiarStorage = document.getElementById("limpiarStorage")
    formularioIdentificacion = document.getElementById("formularioIdentificacion")
    inputUsuario = document.getElementById("inputUsuario")
    contenedorIdentificacion = document.getElementById("contenedorIdentificacion")
    contenedorUsuario = document.getElementById("contenedorUsuario")
    textoUsuario = document.getElementById("textoUsuario")
    vehiculosAgregados = document.getElementById("vehiculosAgregados")
    contenedorFormularioVehiculos = document.getElementById("contenedorFormularioVehiculos")
    inputUsuario = document.getElementById("inputUsuario")
}

//Inicializamos los eventos.
function inicializarEventos() {
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event)
    formulario.onsubmit = (event) => validarFormulario(event);
    btnLimpiarStorage.onclick = eliminarStorage;
}

//Logueo del usuario.
function identificarUsuario (event) {
    event.preventDefault();
    usuario = inputUsuario.value
    formularioIdentificacion.reset()
    actualizarUsuarioStorage();
    mostrarTextoUsuario()
}

//Cambiamos el estado de los contenedores HTML segun usuario.
function mostrarTextoUsuario () {
    contenedorIdentificacion.hidden = true
    contenedorUsuario.hidden = false
    textoUsuario.innerHTML = `Bienvenido `
    textoUsuario.innerHTML += `<b>${usuario}</b>`
    btnLimpiarStorage.hidden = false
    vehiculosAgregados.hidden = false
    contenedorFormularioVehiculos.hidden = false
}

//Eliminamos todos los datos de la Storage.
function eliminarStorage () {
    localStorage.clear();
    vehiculos = [];
    mostrarVehiculos(vehiculos);
    contenedorIdentificacion.hidden = false
    contenedorUsuario.hidden = true
    vehiculosAgregados.hidden = true
    contenedorFormularioVehiculos.hidden = true
}

// Creamos el mapa de marcas y modelos.
const MARCASYMODELOS = {
    PEUGEOT: ['107', '308GT', '2008'],
    TOYOTA: ['PRIUS', 'RAV4', 'YARIS'],
    VOLKSWAGEN: ['GOLF', 'POLO', 'T-CROSS'],
};

//Añadimos las option según marca seleccionada.
function aniadirOption(elemento, texto) {
    let option = document.createElement('option');
    option.value = texto;
    option.textContent = texto;
    elemento.append(option);
}

// Llenamos el selector de marcas.
Object.keys(MARCASYMODELOS).forEach(texto => aniadirOption(MARCA, texto));

// Según marca seleccionada, llenamos el selector de modelos.
MARCA.addEventListener('change', evento => {
MODELO.innerHTML = DEFAULT;
MARCASYMODELOS[evento.target.value].forEach(texto => aniadirOption(MODELO, texto));
});

//Validamos el formulario.
function validarFormulario(event) {

    event.preventDefault();
    let marca = MARCA.value
    let modelo = MODELO.value
    let anio = ANIO.value
    let km = parseInt(inputKm.value);
    let ocupantes = parseInt(inputOcupantes.value);
    let tipo = ocupantes > 6 ? "Camioneta grande" : ocupantes >= 4 ? "Auto/Camioneta" : "Auto pequeño"
    let precioCompra = parseFloat(inputPrecioCompra.value);
    let nuevo = km == 0 ? true : false
    let precioVenta = nuevo == true ? precioCompra * 2 : precioCompra * 1.5
        let agregarVehiculo = new Vehiculo(
            marca,
            modelo,
            anio,
            km,
            nuevo,
            tipo,
            ocupantes,
            precioCompra,
            precioVenta
        );
        marca == "MARCA" ? alert("Comprueba la marca ingresada") : 
        modelo == "MODELO" ? alert("Comprueba el modelo ingresado") : 
        anio == "AÑO" ? alert("Comprueba el año ingresado") : (
            vehiculos.push(agregarVehiculo),
            formulario.reset(),
            actualizarVehiculosStorage(),
            mostrarVehiculos(vehiculos),
            MODELO.innerHTML = DEFAULT
        )
} 

//Calculamos el costo de los vehículos ingresados.
function calcularCosto(vehiculos) {
    let sumatoriaCosto = 0
    for (const vehiculo of vehiculos) {
        sumatoriaCosto += vehiculo.precioCompra
    }
    return sumatoriaCosto;
}

//Calculamos la venta total de los vehículos ingresados.
function calcularVenta(vehiculos) {
    let sumatoriaVenta = 0
    for (const vehiculo of vehiculos) {
        sumatoriaVenta += vehiculo.precioVenta
    }
    return sumatoriaVenta;
}

//Mostramos los vehículos en el HTML y consola.
function mostrarVehiculos(x) {

    arrayVacio(x) === true ? sinVehiculos() : (
        contenedorVehiculos.innerHTML = "",
        contenedorVentas.innerHTML = "",
        console.log(x),
        ejecutarFiltros(vehiculos),
        x.forEach((vehiculo) => {
            let costoVehiculos = calcularCosto(x)
            let ventaVehiculos = calcularVenta(x)
            let gananciaVehiculos = ventaVehiculos - costoVehiculos
            let column = document.createElement("div");
            column.className = "col-md-4 mt-3 mb-3";
            column.id = `columna-${vehiculo.id}`;
            column.innerHTML = `
                <div class="card">
                    <img src="${vehiculo.img}" class="card-img-top" alt="${vehiculo.modelo}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${vehiculo.marca} ${vehiculo.modelo}</h5>
                        <p class="card-text">Año: <b>${vehiculo.anio}</b></p>
                        <p class="card-text">Kms: <b>${vehiculo.km} kms</b></p>
                        <p class="card-text">Tipo: <b>${vehiculo.tipo}</b></p>
                        <p class="card-text">Precio Compra: <b>${vehiculo.precioCompra} U$S</b></p>
                        <p class="card-text">Precio Venta: <b>${vehiculo.precioVenta} U$S</b></p>
                    </div>
                    <div class="card-footer text-center">
                    <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
                    </div>
                </div>`;
    
            contenedorVentas.className ="pb-2"
            contenedorVentas.innerHTML = `
                <p class="card-text text-center"><b>El costo de los vehículos en pantalla de ${costoVehiculos} U$S</b></p>
                <p class="card-text text-center"><b>La venta de los vehículos en pantalla de ${ventaVehiculos} U$S</b></p>
                <p class="card-text text-center"><b>La ganancia de los vehículos en pantalla de ${gananciaVehiculos} U$S</b></p>
                `
    
            contenedorVehiculos.append(column);
    
            let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
            botonEliminar.onclick = () => eliminarVehiculo(vehiculo.id);
            })
    )
}

//Creamos los filtros
function ejecutarFiltros(vehiculos) {
    let vehiculosFiltradosNuevos = vehiculos.filter((vehiculo) => vehiculo.km == 0)
    let vehiculosFiltradosUsados = vehiculos.filter((vehiculo) => vehiculo.km > 0)
    let vehiculosFiltradosOcupantes = vehiculos.filter((vehiculo) => vehiculo.ocupantes > 6)
    filtro1.onclick = () => mostrarVehiculos(vehiculosFiltradosNuevos)
    filtro2.onclick = () => mostrarVehiculos(vehiculosFiltradosUsados)
    filtro3.onclick = () => mostrarVehiculos(vehiculosFiltradosOcupantes)
    filtro4.onclick = () => mostrarVehiculos(vehiculos)
}

//Chequeamos si un array es un array y si está vacío
function arrayVacio(array) {
    if (!Array.isArray(array)) {
        return FALSE;
    }
    if (array.length == 0) {
        return true;
    }
    return false;
} 

//Si el filtro no encuentra vehículos mostramos en el HTML un texto.
function sinVehiculos() {
        console.log("No hay vehículos que concuerden con el filtro.")
        contenedorVehiculos.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text text-center"><b>No hay vehículos ingresados o que concuerden con el filtro.</b></p>
                </div>
            </div>`
        contenedorVentas.innerHTML = ""
}

//Eliminando un vehículo con el botón
function eliminarVehiculo(idVehiculo) {
    let columnaBorrar = document.getElementById(`columna-${idVehiculo}`);
    let indiceBorrar = vehiculos.findIndex(
        (vehiculo) => Number(vehiculo.id) === Number(idVehiculo)
    );
    
    vehiculos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
    actualizarVehiculosStorage();
    console.log(vehiculos)
    ejecutarFiltros(vehiculos)
    mostrarVehiculos(vehiculos)
    // filtro4.click()
}

//Guardamos el usuario en Storage.
function actualizarUsuarioStorage () {
    localStorage.setItem("usuario", usuario)
}

//Guardamos los vehiculos en la Storage.
function actualizarVehiculosStorage () {
    let vehiculosJSON = JSON.stringify(vehiculos)
    localStorage.setItem("vehiculos", vehiculosJSON)
}

//Si hay datos en Storage los mostramos en el HTML.
function obtenerVehiculosStorage () {
    let vehiculosJSON = localStorage.getItem("vehiculos")
    vehiculosJSON != null && (
        vehiculos = JSON.parse(vehiculosJSON),
        mostrarVehiculos(vehiculos)
    )
}

//Si hay usuario ingresado mostramos los vehículos.
function obtenerUsuariosStorage () {
    let usuarioAlmacenado = localStorage.getItem("usuario");
    usuarioAlmacenado != null && (
        usuario = usuarioAlmacenado,
        mostrarTextoUsuario()
    )
}

//Inicializamos el programa.
function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerVehiculosStorage();
    obtenerUsuariosStorage();
}

main();