//Clase para crear los vehículos.
class Vehiculo {
    constructor(marca, modelo, anio, km, nuevo, tipo, ocupantes, precioCompra, precioVenta) {
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

let vehiculos = []

//Agregando vehículos mediante prompt a la clase Vehiculo.
function agregarVehiculos() {
    let numeroVehiculos = parseInt(
        prompt("¿Cuántos vehículos necesita agregar?"))
        while (!/^[0-9]+$/.test(numeroVehiculos)) {
            alert("Número no reconocido")
            numeroVehiculos = prompt("¿Cuántos vehículos necesita agregar?")
        }  
    
    //Creando array de vehículos
    for (let index = 0; index < numeroVehiculos; index++) {
        let marca = prompt("Ingrese la marca")
        while (marca === "") {
            marca = prompt("Ingrese la marca") 
        }
        let modelo = prompt("Ingrese el modelo")
        while (modelo === "") {
            modelo = prompt("Ingrese el modelo") 
        }
        let anio = parseInt(prompt("Ingrese el año"))
        while (!/^[0-9]+$/.test(anio)) {
            alert("Número no reconocido")
            anio = prompt("Ingrese el año")
        }  
        let km = parseInt(prompt("Ingrese el kilometraje"))
        while (!/^[0-9]+$/.test(km)) {
            alert("Número no reconocido")
            km = prompt("Ingrese el kilometraje")
        }  
        let ocupantes = parseInt(prompt("Ingrese cantidad de ocupantes"))
        while (!/^[0-9]+$/.test(ocupantes)) {
            alert("Número no reconocido")
            ocupantes = prompt("Ingrese cantidad de ocupantes")
        }
        //Mediante el dato ocupantes calculamos el tipo de vehículo a ingresar.
        let tipo = "Moto/Autito"
        if (ocupantes > 6) {
            tipo = "Camioneta/Bus"
        }
        if (ocupantes > 4 && ocupantes <= 6) {
            tipo = "Auto/Camioneta"
        }
        let precioCompra = parseInt(prompt("Ingrese el precio de compra en U$S"))
        while (!/^[0-9]+$/.test(precioCompra)) {
            alert("Número no reconocido")
            precioCompra = prompt("Ingrese el precio de compra en U$S")
        }
        //Calculamos si el vehículo es nuevo o usado mediante el año ingresado, para calcular el precioVenta (x 1.5 o x 2).
        let nuevo = false
        let precioVenta = precioCompra * 1.5
            if (km == 0) {
                nuevo = true
                precioVenta = precioCompra * 2
            }
        //Con los datos recibidos creamos el objeto con la clase Vehiculo.
        let vehiculoARegistrar = new Vehiculo(
        marca,
        modelo,
        anio,
        km,
        nuevo,
        tipo,
        ocupantes,
        precioCompra,
        precioVenta
        )
        vehiculos.push(vehiculoARegistrar)
    }
    return vehiculos
}

let contenedorVehiculos = document.getElementById("contenedor-vehiculos")

//Mostrando listado de vehículos en consola y HTML.
function mostrarVehiculos(vehiculos) {
    
    for (const vehiculo of vehiculos) {
        console.log(vehiculo)
        console.log(vehiculo.marca + " " + vehiculo.modelo + " " + vehiculo.anio)
        let column = document.createElement("div")
        column.className = "col-md-4 mt-3"
        column.id = `columna-${vehiculo.modelo}`
        column.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca: <b>${vehiculo.marca}</b></p>
                <p class="card-text">Modelo: <b>${vehiculo.modelo}</b></p>
                <p class="card-text">Año: <b>${vehiculo.anio}</b></p>
                <p class="card-text">Kilometraje: <b>${vehiculo.km} Kms</b></p>
                <p class="card-text">Tipo: <b>${vehiculo.tipo}</b></p>
                <p class="card-text">Precio Venta: <b>${vehiculo.precioVenta} U$S</b></p>
            </div>
        </div>
        `
        contenedorVehiculos.append(column) 
    }
}

//Si no hay vehículos mostramos lo siguiente
function sinVehiculos(vehiculos) {
    
    for (const vehiculo of vehiculos) {
        contenedorVehiculos = document.getElementById("contenedor-vehiculos")
        let column = document.createElement("div")
        column.className = "col mt-3"
        column.id = "columna"
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

    //Código que no funciona
/*   const contenedorVehiculos2 = document.getElementById("contenedor-vehiculos")
    vehiculos.forEach((vehiculo) => {
        let column2 = document.createElement("div")
        column2.className = "col-md-4 mt-3"
        column2.id = `columna-${vehiculo.modelo}`
        column2.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Marca: <b>${vehiculo.marca}</b></p>
                <p class="card-text">Modelo: <b>${vehiculo.modelo}</b></p>
                <p class="card-text">Año: <b>${vehiculo.anio}</b></p>
                <p class="card-text">Kilometraje: <b>${vehiculo.km} Kms</b></p>
                <p class="card-text">Tipo: <b>${vehiculo.tipo}</b></p>
                <p class="card-text">Precio Venta: <b>${vehiculo.precioVenta}</b></p>
            </div>
        </div>
        `
        contenedorVehiculos2.append(column2)
    })    */


//Cambiando el título en HTML
let vehiculosVenta = document.getElementById("vehiculos-venta")
vehiculosVenta.innerHTML = "Vehículos a la venta:"

//Calculamos el costo de los vehículos ingresados anteriormente.
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

//Llamamos al código anteriormente en la función main + menú para ingresar nuevos vehículos o terminar con la operación.
function main() {
    vehiculos = agregarVehiculos()
    let costoVehiculos = calcularCosto(vehiculos)
    let ventaVehiculos = calcularVenta(vehiculos)
    let gananciaVehiculos = ventaVehiculos - costoVehiculos
    alert("El costo total de los vehículos es de: "+ costoVehiculos +" U$S. \nLa venta total de los vehículos es de: "+ ventaVehiculos +" U$S. \nLa ganancia total de los vehículos es de: " + gananciaVehiculos + " U$S")
    console.log("El costo total de los vehículos es de: "+ costoVehiculos +" U$S. \nLa venta total de los vehículos es de: "+ ventaVehiculos +" U$S. \nLa ganancia total de los vehículos es de: " + gananciaVehiculos + " U$S")

let menu

do {
    menu = parseInt(prompt("Elige una opción: \n 1. Agregar más vehículos \n 2. Información de cálculo del precio de venta de vehículos \n 3. Filtrar vehículos\n 4. Finalizar (Imprimir datos en consola y HTML)"))
    switch (menu) {
        case 1:
            main()
            menu = 4
            break
        case 2:
            alert("IMPORTANTE: Para calcular el precio de venta se contempla si el vehículo es 0 Km. o usado. \nPara vehículos nuevos el precio de venta es el doble del costo. \nMientras que para vehículos usados es del 50% del precio de costo.")
            break
        case 3:
            //Filtrando objetos con filtros predefinidos
            menuFiltro =  parseInt(prompt("Elige una opción: \n 1. Filtrar vehículos nuevos en consola y HTML \n 2. Filtrar vehículos usados en consola y HTML \n 3. Filtrar vehículos de más de 6 pasajeros en consola y HTML \n 4. Volver"))
            switch (menuFiltro) {
                case 1:
                        let vehiculosFiltradosNuevos = vehiculos.filter((vehiculo) => vehiculo.km == 0)
                        if (arrayVacio(vehiculosFiltradosNuevos) === true) {
                            console.log("No hay vehículos que concuerden con el filtro.")
                            sinVehiculos(vehiculos)
                        }
                        else {
                            console.log("Vehículos nuevos:") 
                            console.log(vehiculosFiltradosNuevos) 
                            mostrarVehiculos(vehiculosFiltradosNuevos)
                    }                       
                        menu = 4
                    break
                case 2:
                        let vehiculosFiltradosUsados = vehiculos.filter((vehiculo) => vehiculo.km > 0)
                        if (arrayVacio(vehiculosFiltradosUsados) === true) {
                            console.log("No hay vehículos que concuerden con el filtro.")
                            sinVehiculos(vehiculos)
                        }
                        else {
                            console.log("Vehículos usados:") 
                            console.log(vehiculosFiltradosUsados) 
                            mostrarVehiculos(vehiculosFiltradosUsados)
                    } 
                        menu = 4
                    break
                case 3:
                        let vehiculosFiltradosOcupantes = vehiculos.filter((vehiculo) => vehiculo.ocupantes > 6)
                        if (arrayVacio(vehiculosFiltradosOcupantes) === true) {
                            console.log("No hay vehículos que concuerden con el filtro.")
                            sinVehiculos(vehiculos)
                        }
                        else {
                            console.log("Vehículos con más de 6 ocupantes:") 
                            console.log(vehiculosFiltradosOcupantes) 
                            mostrarVehiculos(vehiculosFiltradosOcupantes)
                    } 
                        menu = 4
                    break
                case 4:
                    menu
                    break
                }
            break
        case 4:
            alert("Gracias por tu visita.")
            mostrarVehiculos(vehiculos)
            break
    }
} while (menu !== 4)
}

main()