let veces = prompt("Ingrese un número")
let texto = "Desafío 01 Maximiliano Heijo"

while (!/^[0-9]+$/.test(veces)) {
    alert("No ingresaste un número válido.")
    veces = prompt("Ingrese un número")
}
for(let i=1;i<=veces;i){
    while (veces > 1) {
        alert(texto + " se repetirá " + veces-- + " veces.")
    }
alert(texto + " se repetirá " + veces-- + " vez.")
}