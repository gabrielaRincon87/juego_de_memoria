const urlApi = "http://localhost:8080/pokemem_back/pais";
const urlUserApi ="http://localhost:8080/pokemem_back/usuario";

var paises = { id_pais: 0, descripcion: "" }
var arrayPaises = [];

function validateForm() {
    var myForm = document.getElementById('myForm');
    var vals = myForm.querySelectorAll('input, select');
    var reg = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


    for (var v of vals) {
        console.log(v.name + ' ' + v.value)
        if (v.value === '') {
            //  alert(`Falta completar el campo ${v.name}`);
            Swal.fire({
                title: `Falta completar el campo ${v.name}`,
                imageUrl: "./images/pikachu-no.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "A tall image",


            });
            return false;

        }
        if (v.name === 'Edad' && (v.value < 3 || v.value > 120)) {
            Swal.fire({
                title: `Este juego es para personas mayores a 3 años`,
                imageUrl: "./images/pikachu-pokemon-user.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "A tall image",


            });
            return false;
        }
        if (v.name === 'Email' && !(reg.test(v.value))) {
            Swal.fire({
                title: `Valida tu email que tiene un formato incorrecto`,
                imageUrl: "./images/pikachu-no.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "A tall image",


            });
            return false;
        }
    }




    /* console.log('usuario creado '+ usuario.nombre);
     localStorage.setItem("usuario", JSON.stringify(usuario));
     var usuarios= localStorage.getItem("usuario");
     console.log('Set Local Storage' + usuarios)
   */

    return true;

}

function cargarUsuario() {
    var myForm = document.getElementById('myForm');
    var vals = myForm.querySelectorAll('input, select');

    for (var v of vals) {
        switch (v.name) {
            case "Nombre":
                nombre = v.value;
                break;
            case "Edad":
                edad = v.value;
                break;
            case "Pais":
                pais = v.value;
                break;
            case "Email":
                email = v.value;
                break;
            case "Password":
                pass = v.value;
                break;
            case "Avatar":
                avatar = v.value;
                break;
            default: break;
        }

    }
    let usuario = {
        nombre: nombre,
        edad: edad,
        id_pais: pais,
        email: email,
        password: pass,
        avatar: avatar
    }

    return usuario;

}
function limpiarInput() {
    var inputs = myForm.querySelectorAll('input');
    for (var i of inputs) {
        i.value = '';
    }
}

 function  getPaises() {
    var select = document.querySelector("#nacionalidad-select");
    var i = 0;
    fetch(urlApi).then(r => r.json()).then(result => {

        //console.log(result);
        for (var pais of result) {
            paises = {
                id_pais: pais.id_pais,
                descripcion: pais.descripcion
            };
            arrayPaises.push(paises)
        }

      //  console.log(arrayPaises)
        for (var pais of arrayPaises) {

            var option = document.createElement("option");
            option.text = pais.descripcion;
            option.value = pais.id_pais;
            option.id=pais.id_pais;
            select.appendChild(option);
        }
    })
}
function cargarUsuarioEditar(){

    var user= localStorage.getItem('usuario');
    getPaises();
    setTimeout(() => {
        if (user) {
            console.log('entre al if')
            var obj = JSON.parse(user);
            fetch(urlUserApi+`/id?usuario=${obj.id_usuario}`).then(r => r.json()).then(result => {
           for (var usuario of result){
             
              document.getElementById('name').value= usuario.nombre;
              document.getElementById('edad').value=usuario.edad;
              document.getElementById('email').value=usuario.email;
              document.getElementById('password').value=usuario.password;
              document.getElementById('avatar').value=usuario.avatar;
              document.getElementById(usuario.id_pais).selected=true
              
           }
         });
             }
      }, "1000");
    // console.log(user );

}
