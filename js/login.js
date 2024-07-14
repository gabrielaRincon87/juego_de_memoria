(function () {
    const urlUserApi ="http://localhost:8080/pokemem_back/usuario/id";

let usuario = {
  email: "",
  password: ""
}


const isResponseOk = (response) => {
    if (!response.ok)
{    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Hubo problemas al tratar de loguearte"
  });
      throw new Error(response.status);
      limpiarInput();
}
    return response.json()
  }

    let email = '';
    let password = '';
    let email_r='';
    let password_r='';

  

    function validateForm() {
        var myForm=document.getElementById('myForm');
        var vals = myForm.querySelectorAll('input');
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
            else {
                if (v.name === 'Password') { password = v.value }
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
            else {
                if (v.name === 'Email')
                    email = v.value;
            }
        }
        console.log(email + ' ' + password)
        return true;
    }


    document.getElementById("submit").onclick = () => {
        console.log('click')
        
        if (validateForm()) {
/*
            var usuario = localStorage.getItem('usuario');
            console.log(usuario);
            if (usuario) {
                console.log('entre al if')
                var obj = JSON.parse(usuario);

               
                    console.log(obj.mail);
                   email_r=obj.mail;
                   password_r=obj.password;
                
                console.log(email_r + password_r)
            }*/
                usuario = {
                    email: email,
                    password: password
                  }
console.log(location.href);
                
const response = fetch(urlUserApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  }).then(response => isResponseOk(response))
  .then(data => {console.log("Datos: ", data)
    if (Object.entries(data).length === 0)
        {
            Swal.fire({
                title: `Email O Password Incorrecto. Intenta de nuevo`,
                imageUrl: "./images/pikachu-no.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "A tall image",
        
        
            });
            
        }
        else{
            usuario = {
                id_usuario: data[0].id_usuario,
                nombre: data[0].nombre,
                edad: data[0].edad,
                id_pais: data[0].id_pais,
                email: data[0].email,
                password: data[0].password,
                avatar:data[0].avatar
              }
            
            
            
             console.log('usuario logueado '+ usuario.nombre);
              localStorage.setItem("usuario", JSON.stringify(usuario));
             
            Swal.fire({
                title: `Bienvenido ${data[0].nombre} Redirigiendo a tu pagina perfil...`,
                imageUrl: "./images/pikachu-pokemon-pas.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "A tall image",
                showConfirmButton: false
                
              //  footer: '<a href="./jugar.html">Presiona Aqui</a>'
                
          
              });
              setTimeout(function () {
              location.href ="./perfil.html";}, 1200);
        }
  })
  .catch(err => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo problemas al tratar de loguearte: " + err.message
      });
      console.error("ERROR: ", err.message);
      limpiarInput();
    });         
    }
}}

)()