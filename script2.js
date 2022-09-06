class Vehiculo {
    constructor(marca, modelo, anio, ocupantes, precioCompra, nuevo) {
        this.marca = marca.toUpperCase()
        this.modelo = modelo.toUpperCase()
        this.anio = anio
        this.ocupantes = ocupantes
        this.precioCompra = precioCompra
        this.precioVenta = precioCompra * 1.5 
        this.nuevo = nuevo
    }
    calcularCosto = () => this.precioCompra
}

function agregarVehiculos() {
    let numeroVehiculos = parseInt(
        prompt("Cuantos vehículos necesita agregar")
    );

    let vehiculos = [];
    for (let index = 0; index < numeroVehiculos; index++) {
        let marca = prompt("Ingrese la marca")
        let modelo = prompt("Ingrese el modelo")
        let anio = parseInt(prompt("Ingrese el año"))
        let ocupantes = parseInt(prompt("Ingrese cantidad de ocupantes"))    
        let precioCompra = parseInt(prompt("Ingrese el precio de compra en U$S"))
        let nuevo = false
        if (anio == 2022) {
            nuevo = true
        }
        let vehiculoARegistrar = new Vehiculo(
        marca,
        modelo,
        anio,
        ocupantes,
        precioCompra,
        nuevo
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

function main() {
    let vehiculos = agregarVehiculos()
    mostrarVehiculos(vehiculos)
    let costoVehiculos = calcularCosto(vehiculos)
    alert("El costo total de los vehículos es de: " + costoVehiculos + " U$S")
}

main()
