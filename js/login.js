(function () {

    let email = '';
    let password = '';
    let email_r='';
    let password_r='';

    function validateForm() {
        var vals = document.querySelectorAll('input');
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

            var usuario = localStorage.getItem('usuario');
            console.log(usuario);
            if (usuario) {
                console.log('entre al if')
                var obj = JSON.parse(usuario);

               
                    console.log(obj.mail);
                   email_r=obj.mail;
                   password_r=obj.password;
                
                console.log(email_r + password_r)
            }
            if (email===email_r&& password===password_r)
                {
                    Swal.fire({
                        title: "Bienvenido Presiona el link para Jugar",
                        imageUrl: "./images/pikachu-pokemon-pas.gif",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "A tall image",
                        showConfirmButton: false,
                        footer: '<a href="./jugar.html">Presiona Aqui</a>'
                        
                  
                      });  
                }
            else
            {
                Swal.fire({
                    title: `Email O Password Incorrecto`,
                    imageUrl: "./images/pikachu-no.gif",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "A tall image",


                });
            }
        };


    }


})()