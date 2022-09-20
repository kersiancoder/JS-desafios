let vehiculos = [];

let formulario;
let inputMarca;
let inputModelo;
let inputAnio;
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

//Clase para crear los vehículos.
class Vehiculo {
    static count = 0;
    constructor(marca, modelo, anio, km, nuevo, tipo, ocupantes, precioCompra, precioVenta) {
        this.id = ++this.constructor.count
        this.marca = marca.toUpperCase()
        this.modelo = modelo.toUpperCase()
        this.anio = anio
        this.km = km
        this.nuevo = nuevo
        this.tipo = tipo
        this.ocupantes = ocupantes
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
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
    
}

//Inicializamos los eventos.
function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
}

//Validamos el formulario.
function validarFormulario(event) {
    event.preventDefault();
    let marca = inputMarca.value;
    let modelo = inputModelo.value;
    let anio = parseInt(inputAnio.value);
    let km = parseInt(inputKm.value);
    let ocupantes = parseInt(inputOcupantes.value);
    let tipo = "Moto/Autito"
        if (ocupantes > 6) {
            tipo = "Camioneta/Bus"
        }
        if (ocupantes > 4 && ocupantes <= 6) {
            tipo = "Auto/Camioneta"
        }
    let precioCompra = parseFloat(inputPrecioCompra.value);
    let nuevo = false;
    let precioVenta = precioCompra * 1.5
            if (km == 0) {
                nuevo = true
                precioVenta = precioCompra * 2
            }

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

    vehiculos.push(agregarVehiculo);
    formulario.reset();
    mostrarVehiculos(vehiculos);
}

function calcularCosto(vehiculos) {
    let sumatoriaCosto = 0
    for (const vehiculo of vehiculos) {
        sumatoriaCosto += vehiculo.calcularCosto()
    }
    return sumatoriaCosto;
}

//Calculamos la venta total de los vehículos ingresados.
function calcularVenta(vehiculos) {
    let sumatoriaVenta = 0
    for (const vehiculo of vehiculos) {
        sumatoriaVenta += vehiculo.calcularVenta()
    }
    return sumatoriaVenta;
}

//Mostramos los vehículos en el HTML y consola.
function mostrarVehiculos(x) {

    if (arrayVacio(x) === true) {
        sinVehiculos()
    }
    else { 

    contenedorVehiculos.innerHTML = "";
    contenedorVentas.innerHTML = "";
    console.log(x)

    x.forEach((vehiculo) => {
    let costoVehiculos = calcularCosto(vehiculos)
    let ventaVehiculos = calcularVenta(vehiculos)
    let gananciaVehiculos = ventaVehiculos - costoVehiculos
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${vehiculo.id}`;
    column.innerHTML = `
    <div class="card">
    <div class="card-body">
    <h5 class="card-title text-center">${vehiculo.marca} ${vehiculo.modelo}</h5>
    <p class="card-text">Año: <b>${vehiculo.anio}</b></p>
    <p class="card-text">Kms: <b>${vehiculo.km} Kms.</b></p>
    <p class="card-text">Tipo: <b>${vehiculo.tipo}</b></p>
    <p class="card-text">Precio Compra: <b>${vehiculo.precioCompra} U$S</b></p>
    <p class="card-text">Precio Venta: <b>${vehiculo.precioVenta} U$S</b></p>
    </div>
    <div class="card-footer text-center">
        <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
    </div>
</div>`;

        contenedorVentas.innerHTML = `
        <p class="card-text text-center"><b>El costo de los vehículos en pantalla de ${costoVehiculos} U$S</b></p>
        <p class="card-text text-center"><b>La venta de los vehículos en pantalla de ${ventaVehiculos} U$S</b></p>
        <p class="card-text text-center"><b>La ganancia de los vehículos en pantalla de ${gananciaVehiculos} U$S</b></p>
        `

    contenedorVehiculos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
    botonEliminar.onclick = () => eliminarVehiculo(vehiculo.id);

//Creamos los filtros
    let vehiculosFiltradosNuevos = vehiculos.filter((vehiculo) => vehiculo.km == 0)
    let vehiculosFiltradosUsados = vehiculos.filter((vehiculo) => vehiculo.km > 0)
    let vehiculosFiltradosOcupantes = vehiculos.filter((vehiculo) => vehiculo.ocupantes > 6)

    filtro1.onclick = () => mostrarVehiculos(vehiculosFiltradosNuevos)
    filtro2.onclick = () => mostrarVehiculos(vehiculosFiltradosUsados)
    filtro3.onclick = () => mostrarVehiculos(vehiculosFiltradosOcupantes)
    filtro4.onclick = () => mostrarVehiculos(vehiculos)
    });  
}
}    

//Chequeamos si un array es un array y si está vacío
function arrayVacio(array) {
    if (!Array.isArray(array)) {
        // return FALSE;
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
        </div>
        `;
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
    filtro4.click()
}

//Inicializamos el programa.
function main() {
    inicializarElementos();
    inicializarEventos();
}

main();