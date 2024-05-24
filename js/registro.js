(function () {
const urlApi = "https://restcountries.com/v3.1/all";
let nombre = '';
let edad = 0;
let pais = '';
let email = '';
let pass = ''
var paises= []

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  var select = document.querySelector("#nacionalidad-select");
  var i = 0;
  fetch(urlApi).then(r => r.json()).then(result => {
    
    console.log(paises);
    for (var pais of result) {
      paises[i]=pais.name.common;
      i++;
    }
    
  paises.sort();
  console.log(paises)
  for (let j=0; j<paises.length;j++)
    {
      

     var option = document.createElement("option");
      option.text = paises[j];
      option.value = j;
      select.appendChild(option);
    }
  })

  



});

function validateForm() {
 var myForm=document.getElementById('myForm');
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
       default: break;
    }
   
  }
  let usuario = {
    name: nombre,
    age: edad,
    country: pais,
    mail: email,
    password: pass
  }
  console.log('usuario creado '+ usuario.nombre);
  localStorage.setItem("usuario", JSON.stringify(usuario));
  var usuarios= localStorage.getItem("usuario");
  console.log('Set Local Storage' + usuarios)

 return true

}

document.getElementById("submit").onclick = () => {
  console.log('click')
  if (validateForm()) {
 
    Swal.fire({
      title:  ` ${nombre}! Tu Usuario ha sido creado`,
      text:"Vamos a Divertirnos Inicia Sesion",
      imageUrl: "./images/pikachu-pokemon-pas.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "A tall image",
      showConfirmButton: false,
      footer: '<a href="./login.html">Presiona Aqui</a>'

    });
  }
}
})()