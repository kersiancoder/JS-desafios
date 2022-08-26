let veces = prompt("Ingrese un número (ESC para salir)")
let texto = "Desafío 01 Maximiliano Heijo"

while (!/^[0-9]+$/.test(veces)) {
    alert("No ingresaste un número válido.")
    veces = prompt("Ingrese un número (ESC para salir)")
}
for(let i=1;i<=veces;i){
    while ((veces > 1 && veces != "ESC")) {
        alert(texto + " se repetirá " + veces-- + " veces.")
    }
alert(texto + " se repetirá " + veces-- + " vez.")
}