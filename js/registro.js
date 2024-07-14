(function () {

  const urlUserApi = "http://localhost:8080/pokemem_back/usuario";

  let usuario = {
    nombre: "",
    edad: 0,
    id_pais: 0,
    email: "",
    password: "",
    avatar: ""
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    getPaises();
  });



  document.getElementById("submit").onclick = () => {
    //console.log('click')

    if (validateForm()) {
      usuario = cargarUsuario();
      console.log(usuario)
      const response = fetch(urlUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
        .then(response => {

          Swal.fire({
            title: ` ${usuario.nombre}! Tu Usuario ha sido creado`,
            text: "Vamos a Divertirnos Inicia Sesion",
            imageUrl: "./images/pikachu-pokemon-pas.gif",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "A tall image",
            showConfirmButton: false,
            footer: '<a href="./login.html">Presiona Aqui</a>'

          });
        })
        .catch(error => {

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo problemas al tratar de insertar el usuario"
          });

        });



    }
  }
})()