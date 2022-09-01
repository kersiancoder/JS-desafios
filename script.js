


function repetidorTexto() {
    let veces = prompt("Ingrese un número del 1 al 50")
    let texto = "Desafío 01 Maximiliano Heijo"
   /*  while (!/^[0-9]+$/.test(veces)) {
        alert("No ingresaste un número válido.")
        veces = prompt("Ingrese un número")
    } */
    
    if (veces => 50) {
        console.log(veces)
        alert("Ingrese un número menor de 50")
        veces = prompt("Ingrese un número del 1 al 50")
    }
    else {
        console.log("test")
        for(let i=1;i<=veces;i){
            while (veces > 1) {
                alert(texto + " se repetirá " + veces-- + " veces.")
            }
            alert(texto + " se repetirá " + veces-- + " vez.")
        }
    }
}

repetidorTexto()