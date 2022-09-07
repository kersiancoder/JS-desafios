class Vehiculo {
    constructor(marca, modelo, anio, nuevo, tipo, ocupantes, precioCompra, precioVenta) {
        this.marca = marca.toUpperCase()
        this.modelo = modelo.toUpperCase()
        this.anio = anio
        this.nuevo = nuevo
        this.tipo = tipo
        this.ocupantes = ocupantes
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
    }
    calcularCosto = () => this.precioCompra
    calcularGanancia = () => this.precioVenta
}

function agregarVehiculos() {
    let numeroVehiculos = parseInt(
        prompt("Cuantos vehículos necesita agregar")
    )
    let vehiculos = [];
    for (let index = 0; index < numeroVehiculos; index++) {
        let marca = prompt("Ingrese la marca")
        let modelo = prompt("Ingrese el modelo")
        let anio = parseInt(prompt("Ingrese el año"))
        let ocupantes = parseInt(prompt("Ingrese cantidad de ocupantes"))  
        let tipo = "Moto/Autito"
        if (ocupantes > 6) {
            tipo = "Camioneta/Bus"
        }
        if (ocupantes > 4 && ocupantes <= 6) {
            tipo = "Auto/Camioneta"
        }
        let precioCompra = parseInt(prompt("Ingrese el precio de compra en U$S"))
        let nuevo = false
        let precioVenta = precioCompra * 1.5
            if (anio == 2022) {
                nuevo = true
                precioVenta = precioCompra * 2
            }
        let vehiculoARegistrar = new Vehiculo(
        marca,
        modelo,
        anio,
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

function mostrarVehiculos(vehiculos) {
    for (const vehiculo of vehiculos) {
        console.log(vehiculo);
        console.log(vehiculo.marca + " " + vehiculo.modelo + " " + vehiculo.anio);
    }
}

function calcularCosto(vehiculos) {
    let sumatoriaCosto = 0
    for (const vehiculo of vehiculos) {
        sumatoriaCosto += vehiculo.calcularCosto()
    }
    return sumatoriaCosto;
}

function calcularVenta(vehiculos) {
    let sumatoriaVenta = 0
    for (const vehiculo of vehiculos) {
        sumatoriaVenta += vehiculo.calcularGanancia()
    }
    return sumatoriaVenta;
}

function calcularGanancia(vehiculos) {
    let sumatoriaGanancia = 0
    for (const vehiculo of vehiculos) {
        sumatoriaGanancia += vehiculo.calcularGanancia() - vehiculo.calcularCosto()
    }
    return sumatoriaGanancia;
}

function main() {
    let vehiculos = agregarVehiculos()
    mostrarVehiculos(vehiculos)
    let costoVehiculos = calcularCosto(vehiculos)
    let ventaVehiculos = calcularVenta(vehiculos)
    let gananciaVehiculos = calcularGanancia(vehiculos)
    alert("El costo total de los vehículos es de: "+ costoVehiculos +" U$S. \nLa venta total de los vehículos es de: "+ ventaVehiculos +" U$S. \nLa ganancia total de los vehículos es de: " + gananciaVehiculos + " U$S")
    console.log("El costo total de los vehículos es de: "+ costoVehiculos +" U$S. \nLa venta total de los vehículos es de: "+ ventaVehiculos +" U$S. \nLa ganancia total de los vehículos es de: " + gananciaVehiculos + " U$S")

let menu

do {
    menu = parseInt(prompt("Elige una opción: \n 1. Agregar más vehículos \n 2. Información de cálculo del precio de venta de vehículos \n 3. Finalizar"))
    switch (menu) {
        case 1:
            main()
            menu = 3
            break
        case 2:
            alert("IMPORTANTE: Para calcular el precio de venta se contempla si el vehículo es Nuevo (Año 2022) o usado. \nPara vehículos nuevos el precio de venta es el doble del costo. \nMientras que para vehículos usados es del 50% del precio de costo.")
            break
        case 3:
            alert("Gracias por tu visita.")
            break
    }
} while (menu !== 3)
}

main()


