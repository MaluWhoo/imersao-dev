let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

function iniciaBuscar() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards assim que os dados são carregados
    } catch (error) {
        console.error("Falha ao buscar dados: ", error);
    }
}

window.onload = carregarDados; // Executa a função quando a página termina de carregar

function renderizarCards(dados){

    cardContainer.innerHTML = ""; // Ele vai limpar os cards que já existem antes de monstrar novos

    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.onclick = () => window.open(dado.link, '_blank'); // Torna o card inteiro clicável
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <img src="${dado.icone}" alt="Ícone de ${dado.nome}">
        <p>${dado.aniversario}</p>
        <p>"<em>${dado.frase}</em>"</p>
        <p>${dado.descricao}</p>
       
        <p>Presentes Favoritos: ${dado.presentes}</p>
        <p>Odeia: ${dado.odeia}</p>
        <p>Endereço: ${dado.endereco}</p>
        `
        cardContainer.appendChild(article);
    }
}

