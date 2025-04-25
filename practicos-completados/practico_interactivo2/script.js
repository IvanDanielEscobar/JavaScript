const usuario = "i.escobar";
const contraseña = "1234.Ie";

while(true){
    const usuarioStr = prompt("usuario:");
    const contraseñaStr = prompt("contraseña:");

    if (usuarioStr === usuario && contraseñaStr === contraseña) {
        alert("bienvenido");
    } else {
        alert("usuario o contraseña incorrecta");
    }
}
