(function () {
    const urlPuntajeApi ="http://localhost:8080/pokemem_back/puntaje?";
    const urlUserApi ="http://localhost:8080/pokemem_back/usuario/id?";
    const isResponseOk = (response) => {
        if (!response.ok)
    {    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo problemas al tratar de cargar tu perfil"
      });
          throw new Error(response.status);
         
    }
}
    document.addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM fully loaded and parsed");
       
        var user= localStorage.getItem('usuario');
          // console.log(user );
     if (user) {
         console.log('entre al if')
         var obj = JSON.parse(user);
         fetch(urlUserApi+`usuario=${obj.id_usuario}`).then(r => r.json()).then(result => {
        for (var user of result){
            let nombre_usuario= document.getElementById("name");
         nombre_usuario.innerHTML=user.nombre;
         let imagen =document.getElementById("avatar");
         imagen.src=user.avatar;
        }
         fetch(urlPuntajeApi+`usuario=${obj.id_usuario}`).then(r => r.json()).then(result => {
            if (result){
            for (var metrica of result) {
  
        
              document.getElementById('puntaje').value= metrica.mayor_puntaje;
              document.getElementById('fecha').value=metrica.fecha;
              document.getElementById('acumulado').value=metrica.puntaje_acumulado;
            }
            
        }
    else {document.getElementById('fecha').innerHTML="Aun no has jugado por primera vez";}
        
      });
    });
} 
    });
    
} )()
