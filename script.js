function repetidorTexto() {
    let nombre = prompt("Ingrese su nombre (solo letras)")
    while (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert("Nombre ingresado no válido")
        nombre = prompt("Ingrese su nombre (solo letras)")
    }  
    
    const MENSAJE = "¡HOLA " + (nombre).toUpperCase() + "!"
    alert(MENSAJE)
    let veces = prompt("Ingrese un número del 1 al 50")

    while (!/^[0-9]+$/.test(veces) || veces > 50) {
        alert("Número ingresado no válido")
        veces = prompt("Ingrese un número del 1 al 50")
    }  
        
    for (let i=1;i<=veces;i) {
        while (veces > 1) {
            alert((nombre).toUpperCase() + " se repetirá " + veces-- + " veces.")
        }
        alert((nombre).toUpperCase() + " se repetirá " + veces-- + " vez.")
    }

    let menu = parseInt(prompt("Seleccione una opción: \n 1. Realizar nueva solicitud de datos \n 2. Salir"))
    if (menu == 1) {
        repetidorTexto()
    }
    else {
        alert("Gracias por participar.")
    }
} 

repetidorTexto()

