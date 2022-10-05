//Variables de información.
let vehiculos = [];
let usuario;
let formatter = new Intl.NumberFormat('es-UY');
let limpiarStorageTodo

//Variables para autenticación y usuario.
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let inputUsuario
let btnLimpiarStorage;
let vehiculosAgregados;
let botonModificarPrecio

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
let botonModal
let botonModalExplicativo


//Constantes de selectores.
const MARCA = document.querySelectorAll('#select-marca')[0];
const MODELO = document.querySelectorAll('#select-modelo')[0];
const DEFAULT = MODELO.innerHTML;
const ANIO = document.getElementById('inputAnio');

//Constante de Año actual.
const ANIOACTUAL = new Date(); 

// For de 100 años al año actual.
for (var i = ANIOACTUAL.getFullYear(); i >= ANIOACTUAL.getFullYear() - 100 ; i--) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    ANIO.appendChild(option);
}

//Cargamos por defecto 4 vehículos desde un JSON.
function cargaJSON () {
    let jsonToString
    fetch('./js/data.json')
    .then(res => res.json())
    .then(data => {
        jsonToString = JSON.stringify(data.vehiculos);
        if (vehiculos.length == 0) {
            vehiculos = JSON.parse(jsonToString) 
            actualizarVehiculosStorage()
            obtenerVehiculosStorage()
            mostrarVehiculos(vehiculos)
        }
    }) 
}

//Clase para crear los vehículos.
class Vehiculo {
    static count = 4;
    constructor(marca, modelo, anio, km, nuevo, tipo, ocupantes, precioCompra, precioVenta, user, img) {
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
        this.user = user
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
    botonModal = document.getElementById("botonModal")
    botonModificarPrecio = document.getElementById("botonModificarPrecio")
    botonModalExplicativo = document.getElementById("botonModalExplicativo")
    limpiarStorageTodo = document.getElementById("limpiarStorageTodo")
}

//Inicializamos los eventos.
function inicializarEventos() {
    cargaJSON();
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event)
    formulario.onsubmit = (event) => validarFormulario(event);
    btnLimpiarStorage.onclick = eliminarStorage;
    limpiarStorageTodo.onclick = eliminarStorageTodo
}

//Reiniciamos el programa.
function eliminarStorageTodo () {
    localStorage.clear()
    vehiculos = []
    eliminarStorage()
    cargaJSON()
    console.log(vehiculos)
}

//Logueo del usuario.
function identificarUsuario (event) {
    event.preventDefault();
    usuario = inputUsuario.value.toUpperCase();
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    SwalUsuario(`¡Bienvenido <b>${usuario}!</b>`, "success");
    mostrarTextoUsuario()
}

//Cambiamos el estado de los contenedores HTML segun usuario.
function mostrarTextoUsuario () {
    contenedorIdentificacion.hidden = true
    contenedorUsuario.hidden = false
    textoUsuario.hidden = false
    textoUsuario.innerHTML = `Bienvenido `
    textoUsuario.innerHTML += `<b>${usuario}</b>`
    btnLimpiarStorage.hidden = false
    vehiculosAgregados.hidden = false
    botonModal.hidden = false
    botonModalExplicativo.hidden = false
    limpiarStorageTodo.hidden = false
}

//Eliminamos todos los datos de la Storage.
function eliminarStorage () {
    textoUsuario.hidden = true
    limpiarStorage.hidden = true
    botonModal.hidden = true
    contenedorIdentificacion.hidden = false
    contenedorUsuario.hidden = false
    SwalUsuario(`¡Hasta pronto <b>${usuario}!</b>`, "info");
    localStorage.removeItem("usuario")
    botonModalExplicativo.hidden = true
    limpiarStorageTodo.hidden = true
    usuario = 0
    mostrarVehiculos(vehiculos)
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
    let anio = parseFloat(ANIO.value)
    let km = parseFloat(inputKm.value);
    let kmMiles = formatter.format(km)
    let ocupantes = parseFloat(inputOcupantes.value);
    let tipo = ocupantes > 6 ? "Camioneta grande" : ocupantes >= 4 ? "Auto/Camioneta" : "Auto pequeño"
    let precioCompra = parseFloat(inputPrecioCompra.value);
    let precioCompraMiles = formatter.format(precioCompra)
    let nuevo = km == 0 ? true : false
    let precioVenta = nuevo == true ? precioCompra * 2 : precioCompra * 1.5
    let precioVentaMiles = formatter.format(precioVenta)
    let user = usuario
        let agregarVehiculo = new Vehiculo(
            marca,
            modelo,
            anio,
            kmMiles,
            nuevo,
            tipo,
            ocupantes,
            precioCompraMiles,
            precioVentaMiles,
            user
        );
        marca == "MARCA" ? SwalErrorInput ("Compruebe la marca.")
        :
        modelo == "MODELO" ? SwalErrorInput ("Compruebe el modelo ingresado.")
        : 
        anio == "AÑO" ? SwalErrorInput ("Compruebe el año ingresado.")
        :
        km < 0 ? SwalErrorInput ("Los km deben ser números positivos.")
        :
        ocupantes < 1 ? SwalErrorInput ("Los ocupantes deben ser mayor a 0.")
        :
        precioCompra < 1 ? SwalErrorInput ("El precio debe ser mayor a 0.")
        :
        (
            SwalVehiculoAgregadoEliminado(`${MARCA.value} ${MODELO.value}`, "agregado", "success"),
            vehiculos.push(agregarVehiculo),
            formulario.reset(),
            actualizarVehiculosStorage(),
            mostrarVehiculos(vehiculos),
            MODELO.innerHTML = DEFAULT
        )
}

//Swal Usuario.
function SwalUsuario(titulo, tipo) {
    Swal.fire({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
        popup: 'colored-toast'
        },
        icon: `${tipo}`,
        title: `${titulo}`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
}

//Swal de error en inputs.
function SwalErrorInput (texto) {
    Swal.fire({
        title: 'Error!',
        text: `${texto}`,
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })
}

//Swal de vehículo agregado o eliminado.
function SwalVehiculoAgregadoEliminado(vehiculo, agregadoEliminado, icon) {
    Swal.fire({
        toast: true,
        icon: `${icon}`,
        title: `${vehiculo} ${agregadoEliminado} exitosamente.`,
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
})
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
        console.table(x),
        ejecutarFiltros(vehiculos),
        x.forEach((vehiculo) => {
            let costoVehiculos = calcularCosto(x)
            let ventaVehiculos = calcularVenta(x)
            let gananciaVehiculos = ventaVehiculos - costoVehiculos
            let column = document.createElement("div");
            column.className = "col-lg-3 col-sm-6 mt-3 mb-3";
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
                        <p class="card-text">Vendedor: <b>${vehiculo.user}</b></p>
                    </div>
                    <div class="card-footer text-center">
                    <button class="btn btn-primary" id="botonEnviarCorreo-${vehiculo.id}" >Test Drive</button>
                    <button class="btn btn-secondary" id="botonModificarPrecio-${vehiculo.id}" >Modificar</button>
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

            let botonModificarPrecio = document.getElementById(`botonModificarPrecio-${vehiculo.id}`)
            let botonEnviarCorreo = document.getElementById(`botonEnviarCorreo-${vehiculo.id}`);
            let botonEliminar = document.getElementById(`botonEliminar-${vehiculo.id}`);

            botonModificarPrecio.onclick = () => swalModificarPrecio(vehiculo.id);
            botonEnviarCorreo.onclick = () => swalCorreo(vehiculo.id);
            botonEliminar.onclick = () => eliminarVehiculo(vehiculo.id);

            userVehiculoCreado (vehiculo.user, botonEnviarCorreo, botonEliminar, botonModificarPrecio)
            
            })
    )
}

//Comprobando usuario logueado vs usuario que creó el vehículo
function userVehiculoCreado (vehiculoUser, botonEnviar, botonEliminar, botonModificarPrecio) {

    if ((vehiculoUser.toUpperCase()) == usuario) {
            botonEnviar.hidden = true
        } else {
            botonEliminar.hidden = true
            botonModificarPrecio.hidden = true
        }
} 

//Modificamos vehículos con el botón
async function swalModificarPrecio (idVehiculo) {
    let vehiculoBuscado = vehiculos.find(item => item.id === idVehiculo)
    const { value: precio } = await Swal.fire({
        title: `Modificar ${vehiculoBuscado.marca} ${vehiculoBuscado.modelo} ${vehiculoBuscado.anio}`,
        input: 'number',
        inputPlaceholder: 'Ingrese en U$S precio de compra',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0d6efd',
        cancelButtonText: 'Salir'
        })
        if (precio) {
            vehiculoBuscado.precioCompra = formatter.format(`${precio}`)
            if (vehiculoBuscado.nuevo == true) {
                let precioVentaNuevo = `${precio}` * 2
                vehiculoBuscado.precioVenta = formatter.format(precioVentaNuevo)
            } else {
                let precioVentaUsado = `${precio}` * 1.5
                vehiculoBuscado.precioVenta = formatter.format(precioVentaUsado)
            }
            Swal.fire(`Nuevo precio de compra: ${vehiculoBuscado.precioCompra} U$S.<br> Nuevo precio de venta: ${vehiculoBuscado.precioVenta} U$S.`)
            actualizarVehiculosStorage()
            mostrarVehiculos(vehiculos)
    }
}


//Eliminando un vehículo con el botón
function eliminarVehiculo (idVehiculo) {
    let vehiculoBuscado = vehiculos.find(item => item.id === idVehiculo)
    Swal.fire({
        title: `¿Está seguro de eliminar ${vehiculoBuscado.marca} ${vehiculoBuscado.modelo}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        confirmButtonColor: '#0d6efd',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            SwalVehiculoAgregadoEliminado(`${vehiculoBuscado.marca} ${vehiculoBuscado.modelo}`, "eliminado", "info")
            let columnaBorrar = document.getElementById(`columna-${idVehiculo}`);
            let indiceBorrar = vehiculos.findIndex((vehiculo) => Number(vehiculo.id) === Number(idVehiculo));
            vehiculos.splice(indiceBorrar, 1);
            columnaBorrar.remove();
            actualizarVehiculosStorage();
            ejecutarFiltros(vehiculos)
            mostrarVehiculos(vehiculos)
        }
    })
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

//Guardamos el usuario en Storage.
function actualizarUsuarioStorage () {
    localStorage.setItem("usuario", usuario)
    mostrarVehiculos(vehiculos)
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
        mostrarTextoUsuario(),
        mostrarVehiculos(vehiculos)
    )
}

function swalCorreo (idVehiculo) {
    Swal.fire({
        title: 'Solicitud Test Drive',
        html: `<input type="text" id="correoNombre" class="swal2-input" placeholder="Nombre">
        <input type="number" id="correoTelefono" class="swal2-input" placeholder="Celular">`,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Enviar',
        confirmButtonColor: '#0d6efd',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#correoNombre').value
            const telefono = Swal.getPopup().querySelector('#correoTelefono').value
            if (!nombre || !telefono) {
            Swal.showValidationMessage(`Ingrese su nombre y teléfono.`)
            }
            return { nombre: nombre, telefono: telefono }
        }
    })
    .then((result) => {
        Swal.fire({
            title: 'Correo enviado!',
            text: `Gracias ${result.value.nombre.toUpperCase()} te estaremos contactando a la brevedad.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,                timerProgressBar: true
        })
            enviarCorreo(idVehiculo, result)
    })
}

function enviarCorreo (idVehiculo, result) {
    let vehiculoBuscado = vehiculos.find(item => item.id === idVehiculo)
    let templateParams = {
        nombre: `${result.value.nombre.toUpperCase()}`,
        celular: `${result.value.telefono}`,
        vehiculo: `${vehiculoBuscado.marca} ${vehiculoBuscado.modelo} ${vehiculoBuscado.anio} ID: ${vehiculoBuscado.id}`,
        }

    emailjs.send('service_aqd1cxb','template_8y9442d', templateParams)
        .then(function(response) {
        console.log('CORREO ENVIADO!', response.status, response.text);
        }, function(error) {
        console.log('FALLA...', error);
        });
}

//Inicializamos el programa.
function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerVehiculosStorage();
    obtenerUsuariosStorage();
}

main();