(function () {
   
   
const urlUserApi ="http://localhost:8080/pokemem_back/usuario";
    var paises= []
    let usuario = {
        id_usuario:0,
      nombre: "",
      edad: 0,
      id_pais: 0,
      email: "",
      password: "",
      avatar:""
    }



    const isResponseOk = (response) => {
        if (!response.ok)
    {    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo problemas al tratar de editar el usuario"
      });
          throw new Error(response.status);
    }
        return response.status
      }
    

    document.addEventListener("DOMContentLoaded", (event) => {
        console.log('Pagina Cargada')
        cargarUsuarioEditar();
  })
        
    document.getElementById("submit").onclick = () => {
        
      
    if (validateForm()) {

      var user= localStorage.getItem('usuario');
    // console.log(user );
     if (user) {
         console.log('entre al if')
         var obj = JSON.parse(user);
        let usuario_fetch ={ 
            id_usuario:obj.id_usuario,
            nombre: document.getElementById('name').value,
            edad:document.getElementById('edad').value,
            id_pais:document.getElementById('nacionalidad-select').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value,
            avatar:document.getElementById('avatar').value
        }
        console.log(usuario_fetch)
      
          
      const response = fetch(urlUserApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario_fetch),
      })
      .then(response => {isResponseOk(response)
      
        Swal.fire({
          title:  ` ${usuario_fetch.nombre}! Se actualizaron tus datos...Redirigiendo al perfil`,
          imageUrl: "./images/pikachu-pokemon-pas.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "A tall image",
          showConfirmButton: false,
      
        });
        
        setTimeout(function () {
            location.href ="./perfil.html";}, 1200);
      }) 
      .catch(error => {
      
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo problemas al tratar de editar el usuario"
          });
        
      });
    }
  }
        
        }
      
})();