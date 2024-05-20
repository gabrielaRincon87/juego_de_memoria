const urlApi = "https://pokeapi.co/api/v2/pokemon/id";
let pokemones = [];
let cartas = [];
let cant_front = 0;
let poke_1 = '';
let poke_2 = '';
let score=0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function cargarCartas(array,div)
{var m = 1;
    for (let element of array) {

        const divImg = document.createElement("div");
        divImg.className = "card-back";
        divImg.id = m
        const img = document.createElement("img");
        img.src = "../images/Pokebola-back.png";
        img.className = "img-card-back";
        divImg.appendChild(img);
        div.append(divImg);
        m = m + 1;

    }}

function ganar() {
    let conta = 0;
    const cartas_class = document.querySelectorAll("#tablero > div");
    for (const carta_f of cartas_class) {
        if (carta_f.className === 'card-back') { conta = conta + 1; }

    }
    if (conta === 0) { //alert('ganaste');
        var usuario = localStorage.getItem('usuario');
        console.log(usuario);
        if (usuario) {
            console.log('entre al if')
            var obj = JSON.parse(usuario);
    Swal.fire({
        title:  `Ganaste ${obj.name}! Felicidades`,
        text:`Hiciste  ${score} puntos`,
        imageUrl: "../images/pikachu-pokemon.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "A tall image",
        showConfirmButton: false,
        footer: '<a href="./jugar.html">Quieres jugar de Nuevo?</a>'

      });
     }
    }
}


document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    for (var i = 1; i < 101; i++) {
        var urlApiP = urlApi.replace("id", i);
        fetch(urlApiP).then(r => r.json()).then(result => {
            //console.log(result) ;
            let pokemon = {
                id: result.id,
                name: result.forms[0].name,
                img: result.sprites.other.showdown.front_default
            }
            pokemones.push(pokemon);


        });

    }

});
var select = document.querySelector("#dificultad");
select.addEventListener("change", (event) => {
    var valueSelected = select.value;
    for (const card of document.querySelectorAll('#tablero > div')) {
        card.remove();
        cartas.pop();
    }
score=0;
    var div = document.querySelector("#tablero");
    if (valueSelected) {
        console.log(valueSelected);
        for (var i = 1; i <= (valueSelected / 2); i++) {
            var poke_random = Math.trunc(Math.random() * 100 + 1);
            cartas.push(pokemones[poke_random - 1]);
            cartas.push(pokemones[poke_random - 1]);

        }
        shuffle(cartas);
        cargarCartas(cartas, div);
        

    }




    const cartas_click = document.querySelectorAll("#tablero > div");
    cartas_click.forEach(carta_sel => carta_sel.addEventListener("click", () => {
        let validaGanar = 0;
        

        if (carta_sel.className === 'card-back' && cant_front != 2) {
            const img_carta = carta_sel.querySelector('img');
            console.log(img_carta.length + 'imagen');
            img_carta.src = cartas[carta_sel.id - 1].img;
            carta_sel.classList.toggle("card-front")
            carta_sel.classList.remove("card-back")
            if (poke_1 === '') { poke_1 = cartas[carta_sel.id - 1].img; }
            else { poke_2 = cartas[carta_sel.id - 1].img };
            cant_front++;

        }

        if (cant_front == 2) {
            if (poke_1 === poke_2) {
                console.log('par');

                score=score + 1000;
                const tagScore=document.getElementById('score');
                console.log(tagScore)
                tagScore.textContent ='Score: ' + score;
                cant_front = 0;
                poke_1 = '';
                poke_2 = '';
                validaGanar = 1;

            }
            else {
                validaGanar = 0;


                setTimeout(function () {
                    for (const carta_v of cartas_click) {
                        console.log('entre al for')
                        console.log(carta_v);
                        console.log(poke_1);
                        console.log(poke_2);
                        const img_carta_v = carta_v.querySelector('img');
                        if (img_carta_v.src == poke_1 || img_carta_v.src == poke_2) {

                            const img_carta = carta_v.querySelector('img');

                            img_carta_v.src = "../images/Pokebola-back.png";
                            carta_v.classList.toggle("card-back")
                            carta_v.classList.remove("card-front")


                        }

                    }
                    cant_front = 0;
                    poke_1 = '';
                    poke_2 = '';

                }, 1000);
                console.log('entre al else')

            }


        }
        setTimeout(function () {
            if (validaGanar) {
                ganar();
            }
        }, 900);
    }



    ));

});
