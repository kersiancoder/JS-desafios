let vehiculos = [];

let formulario;
let inputId
let inputMarca;
let inputModelo;
let inputAnio;
let inputKm;
let inputNuevo;
let inputTipo;
let inputOcupantes;
let inputPrecioCompra;
let contenedorVehiculos;
let filtros;
let filtro1;
let filtro2;
let filtro3;
let filtro4;

class Vehiculo {
    constructor(id, marca, modelo, anio, km, nuevo, tipo, ocupantes, precioCompra, precioVenta) {
        this.id = id
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

function inicializarElementos() {
    formulario = document.getElementById("formulario");
    inputId = document.getElementById("inputId");
    inputMarca = document.getElementById("inputMarca");
    inputModelo = document.getElementById("inputModelo");
    inputAnio = document.getElementById("inputAnio");
    inputKm = document.getElementById("inputKm");
    inputOcupantes = document.getElementById("inputOcupantes");
    inputPrecioCompra = document.getElementById("inputPrecioCompra");
    contenedorVehiculos = document.getElementById("contenedor-vehiculos");
    filtros = document.getElementById("filtros");
    filtro1 = document.getElementById("filtro1"); 
    filtro2 = document.getElementById("filtro2");
    filtro3 = document.getElementById("filtro3");
    filtro4 = document.getElementById("filtro4");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
}

function validarFormulario(event) {
    event.preventDefault();
    let idVehiculo = inputId.value;
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

    const idExiste = vehiculos.some((vehiculo) => vehiculo.id === idVehiculo);
    if (!idExiste) {
        let agregarVehiculo = new Vehiculo(
            idVehiculo,
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
    mostrarVehiculos();
    } else {
        alert("El id ya existe");
    }
}

function mostrarVehiculos() {
    contenedorVehiculos.innerHTML = "";
    console.log(vehiculos)

    vehiculos.forEach((vehiculo) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${vehiculo.id}`;
    column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca:
                    <b>${vehiculo.marca}</b>
                </p>
                <p class="card-text">Modelo:
                    <b>${vehiculo.modelo}</b>
                </p>
                <p class="card-text">Año:
                    <b>${vehiculo.anio}</b>
                </p>
                <p class="card-text">Kms:
                    <b>${vehiculo.km}</b>
                </p>
                <p class="card-text">Tipo:
                    <b>${vehiculo.tipo}</b>
                </p>
                <p class="card-text">Precio Venta:
                    <b>${vehiculo.precioVenta}</b>
                </p>
            </div>
            <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
                </div>
        </div>`;

    contenedorVehiculos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
    botonEliminar.onclick = () => eliminarProducto(vehiculo.id);

    filtro1.onclick = () => filtrarNuevos()
    filtro2.onclick = () => filtrarUsados()
    filtro3.onclick = () => filtrarOcupantes()
    filtro4.onclick = () => mostrarVehiculos()
    });    
}

function filtrarNuevos() {
    let vehiculosFiltradosNuevos = vehiculos.filter((vehiculo) => vehiculo.km == 0)
    if (arrayVacio(vehiculosFiltradosNuevos) === true) {
        console.log("No hay vehículos que concuerden con el filtro.")
        sinVehiculos()
    }
    else {

    console.log("Vehículos nuevos:")
    console.log(vehiculosFiltradosNuevos)
    contenedorVehiculos.innerHTML = "";

    vehiculosFiltradosNuevos.forEach((vehiculo) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${vehiculo.id}`;
    column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca:
                    <b>${vehiculo.marca}</b>
                </p>
                <p class="card-text">Modelo:
                    <b>${vehiculo.modelo}</b>
                </p>
                <p class="card-text">Año:
                    <b>${vehiculo.anio}</b>
                </p>
                <p class="card-text">Kms:
                    <b>${vehiculo.km}</b>
                </p>
                <p class="card-text">Tipo:
                    <b>${vehiculo.tipo}</b>
                </p>
                <p class="card-text">Precio Venta:
                    <b>${vehiculo.precioVenta}</b>
                </p>
            </div>
            <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
                </div>
        </div>`;

    contenedorVehiculos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
    botonEliminar.onclick = () => eliminarProducto(vehiculo.id);

    filtro1.onclick = () => filtrarNuevos()
    filtro2.onclick = () => filtrarUsados()
    filtro3.onclick = () => filtrarOcupantes()
    filtro4.onclick = () => mostrarVehiculos()
    });
    }
}

function filtrarUsados() {
    let vehiculosFiltradosUsados = vehiculos.filter((vehiculo) => vehiculo.km > 0)
    if (arrayVacio(vehiculosFiltradosUsados) === true) {
        console.log("No hay vehículos que concuerden con el filtro.")
        sinVehiculos()
    }
    else {

    console.log("Vehículos usados:")
    console.log(vehiculosFiltradosUsados)
    contenedorVehiculos.innerHTML = "";

    vehiculosFiltradosUsados.forEach((vehiculo) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${vehiculo.id}`;
    column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca:
                    <b>${vehiculo.marca}</b>
                </p>
                <p class="card-text">Modelo:
                    <b>${vehiculo.modelo}</b>
                </p>
                <p class="card-text">Año:
                    <b>${vehiculo.anio}</b>
                </p>
                <p class="card-text">Kms:
                    <b>${vehiculo.km}</b>
                </p>
                <p class="card-text">Tipo:
                    <b>${vehiculo.tipo}</b>
                </p>
                <p class="card-text">Precio Venta:
                    <b>${vehiculo.precioVenta}</b>
                </p>
            </div>
            <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
                </div>
        </div>`;

    contenedorVehiculos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
    botonEliminar.onclick = () => eliminarProducto(vehiculo.id);

    filtro1.onclick = () => filtrarNuevos()
    filtro2.onclick = () => filtrarUsados()
    filtro3.onclick = () => filtrarOcupantes()
    filtro4.onclick = () => mostrarVehiculos()
    });  
}  
}

function filtrarOcupantes() {
    let vehiculosFiltradosOcupantes = vehiculos.filter((vehiculo) => vehiculo.ocupantes > 6)
    if (arrayVacio(vehiculosFiltradosOcupantes) === true) {
        console.log("No hay vehículos que concuerden con el filtro.")
        sinVehiculos()
    }
    else {

    console.log("Vehículos con más de 6 ocupantes")
    console.log(vehiculosFiltradosOcupantes)

    contenedorVehiculos.innerHTML = "";

    vehiculosFiltradosOcupantes.forEach((vehiculo) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 mb-3";
    column.id = `columna-${vehiculo.id}`;
    column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca:
                    <b>${vehiculo.marca}</b>
                </p>
                <p class="card-text">Modelo:
                    <b>${vehiculo.modelo}</b>
                </p>
                <p class="card-text">Año:
                    <b>${vehiculo.anio}</b>
                </p>
                <p class="card-text">Kms:
                    <b>${vehiculo.km}</b>
                </p>
                <p class="card-text">Tipo:
                    <b>${vehiculo.tipo}</b>
                </p>
                <p class="card-text">Precio Venta:
                    <b>${vehiculo.precioVenta}</b>
                </p>
            </div>
            <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminar-${vehiculo.id}" >Eliminar</button>
                </div>
        </div>`;

    contenedorVehiculos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);
    botonEliminar.onclick = () => eliminarProducto(vehiculo.id);

    filtro1.onclick = () => filtrarNuevos()
    filtro2.onclick = () => filtrarUsados()
    filtro3.onclick = () => filtrarOcupantes()
    filtro4.onclick = () => mostrarVehiculos()

    });    
}
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


function sinVehiculos() {
    for (const vehiculo of vehiculos) {
        contenedorVehiculos.innerHTML = "";
        contenedorVehiculos = document.getElementById("contenedor-vehiculos")
        let column = document.createElement("div")
        column.className = "col mt-3 mb-3"
        column.id = "columna-sin-vehiculos"
        column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-text text-center"><b>No hay vehículos que concuerden con el filtro.</b></h3>
            </div>
        </div>
        `
        contenedorVehiculos.append(column) 
    }
}


function eliminarProducto(idVehiculo) {
    let columnaBorrar = document.getElementById(`columna-${idVehiculo}`);
    let indiceBorrar = vehiculos.findIndex(
    (vehiculo) => Number(vehiculo.id) === Number(idVehiculo)
    );

    vehiculos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
    if (arrayVacio(vehiculos) === true) {
        console.log("No hay vehículos que concuerden con el filtro.")
        sinVehiculos(vehiculos)
    }
}


function main() {
    inicializarElementos();
    inicializarEventos();
}

main();