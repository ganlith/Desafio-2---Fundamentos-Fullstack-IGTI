/**
 * Estado da aplicação
 */

let tabSearch = null
let allSearch = [];
let totalSeach = 0;
let totalFemale = 0;
let totalMale = 0;
let somaAge = 0;
let mediaAge = 0;
let nomeDesc = null
let allSearchNew = []
let input = document.querySelector("#nomeDesc");
let btnPesquisar = document.querySelector("button");

window.addEventListener("load", () => {
    tabSearch = document.querySelector("#tabSearch");
    btnPesquisar.disabled = true;
    cargaInicial()
});



async function cargaInicial(){    
    console.log("efetuado o load");
    const res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const json = await res.json();
    allSearch = json.results.map(search => {
    const { name, dob, picture, gender } = search;
        return {
            name: name.first + ' ' + name.last,
            idade: dob.age,
            avatar: picture.medium,
            gender
        };
    
    });

    const searchsHTML = `
        <div>
            <div class='searchList'>
                <h3>Nenhum usuário filtrado</h3>
            </div>
        </div>
        `;    
    const estatisticasHTML = `
        <div>
            <div class='estatistica'>
                <h3>Nada a ser exibido</h3>
            </div>
        </div>
        `;    
    tabSearch.innerHTML = searchsHTML;
    tabEstatistica.innerHTML = estatisticasHTML;
}

input.addEventListener('keyup', () => {
    if(input.value.length === 0)
        btnPesquisar.disabled = true;
    else
        btnPesquisar.disabled = false;
})


function fetchSearch() {
  
  nomeDesc = document.querySelector('#nomeDesc')
 
  allSearchNew = allSearch.filter(a => a.name.toLowerCase().indexOf(nomeDesc.value.toLowerCase()) !== -1);
  
  render();
  
}

function render(){
    //busca lista da pesquisa
    renderSearchList();
    
    //Busca total de masculino e feminino
    renderCountGender();

    //Busca soma das idades
    renderSumAge();

    //Busca media das idade
    renderAvgAge();
}

function renderSearchList(){
    let searchsHTML = '<div>';

    allSearchNew.forEach(search => {
        const {name, idade, avatar} = search;

        const searchHTML = `
            <div class='searchList'>
                <div>
                <img src="${avatar}" alt="" width="50" height="50">                
                </div>    
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${idade}</li>
                    </ul>
                </div>
            </div>
        `;

        searchsHTML += searchHTML + '</div>';

    })
    searchsHTML += '</div>';
    tabSearch.innerHTML = searchsHTML;

    totalSeach = allSearchNew.length;
}

function renderCountGender() {
    
    female = allSearchNew
        .filter(a => a.gender.toLowerCase() === "female").length;
    
    Male = allSearchNew
        .filter(a => a.gender.toLowerCase() === "male").length;
    
    
    totalFemale = female;
    totalMale = Male;
};


function renderSumAge() {    
    
    soma = allSearchNew.reduce((accumulator, current) => {
        return accumulator + current.idade;
    }, 0);
    
    somaAge = soma;
}

function renderAvgAge() {
    
    const total = allSearchNew.length;
    
    if (total > 0 )
        media = (somaAge/total);
    else
        total = 0

    mediaAge = media.toFixed(2);
    
    const estatisticasHTML = `
        <span class="card-title">Estatística</span>
        <h6>Total Encondado: <span id='${totalSeach}'>${totalSeach}</span></h6>
        <h6>Total Feminino: <span id='${totalFemale}'>${totalFemale}</span></h6>
        <h6>Total Masculino: <span id='${totalMale}'>${totalMale}</span></h6>
        <h6>Soma Idade: <span id='${somaAge}'>${somaAge}</span></h6>
        <h6>Media Idade: <span id='${mediaAge}'>${mediaAge}</span></h6>
    `;

    tabEstatistica.innerHTML = estatisticasHTML;
}

// Após executar a requisição à API, filtre somente os dados necessários ao app. Esses são: name (first + last), picture, dob.age e gender.
// Monitore o input com o evento "keyup".
// Filtrem os dados a partir de qualquer posição no nome, ou seja, o nome "Brenda" (caso exista na API) deve ser retornado se o filtro for "a".
// Para filtrar, considere todo o texto em minúsculas. Assim, o filtro "E" trará tanto "Elena" quanto "Helena", caso existam na API.
// Dê um console.log() nos dados do evento de digitação e você descobrirá como "cercar" a tecla "Enter".
// Foque mais no código JavaScript e menos na interface. O mais importante é que o filtro e os cálculos estejam corretos.
// Quebre o seu código em funções bem definidas.
// Será necessária uma boa dose de manipulação manual do DOM. Isso pode ser feito tanto com innerHTML + string (recomendo a utilização de template literals) ou com os comandos document.createElement, appendChild etc.
// Se quiserem fazer uma interface semelhante à das imagens, utilizem o Materialize (https://materializecss.com (Links para um site externo.)).
// Não deixem de assistir o vídeo desse desafio, onde demonstro a aplicação em funcionamento e dou mais algumas dicas.
