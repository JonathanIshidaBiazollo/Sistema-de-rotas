const estoque = document.getElementById("estoque");

const iconeEmpilhadeira = "🚜";

const entrada = {
    x: 450,
    y: 550
};

const posicoes = [
    {
        id: 1,
        x: 150,
        y: 100,
        z: 1.2
    },
    {
        id: 2,
        x: 220,
        y: 100,
        z: 1.8
    },
    {
        id: 3,
        x: 290,
        y: 100,
        z: 2.0
    },
];

const produtos = [
    {
        id: 1,
        nome: "Teclado Gamer",
        peso: 5,
        quantidade: 10,
        posicaoId: 1
    },
    {
        id: 2,
        nome: "Monitor",
        peso: 8,
        quantidade: 5,
        posicaoId: 2
    },
    {
        id: 3,
        nome: "Impressora",
        peso: 25,
        quantidade: 2,
        posicaoId: 3
    }
];

const pedido = [
    {
        produtoId: 3,
        quantidade: 1
    },
    {
        produtoId: 1,
        quantidade: 2
    }
];

//Desenhando as posições
posicoes.forEach(posicao => {
    const elemento = document.createElement("div");

    elemento.classList.add("posicao");

    elemento.textContent =  posicao.z >= 1.5
        ? `P${posicao.id} ${iconeEmpilhadeira}`
        : `P${posicao.id}`;

    elemento.style.left = `${posicao.x}px`;
    elemento.style.top = `${posicao.y}px`;

    estoque.appendChild(elemento);
});

function precisaEmpilhadeira(produto, posicao){
    return produto.peso >= 20 || posicao.z >= 1.5;
}

function encontrarPosicaoDoProduto(produto){
    return posicoes.find(posicao => posicao.id === produto.posicaoId);
    //O .find() percorre o array e retorna o primeiro elemento que satisfaz a condição
}

function encontrarProduto(id){
    return produtos.find(produto => produto.id === id);
}

const item = pedido[0];

const produto = encontrarProduto(item.produtoId);

console.log(produto);

function analisarProduto(produto){
    const posicao = encontrarPosicaoDoProduto(produto);

    const empilhadeira = precisaEmpilhadeira(produto, posicao);

    console.log("Produto: ", produto.nome);
    console.log("Posição: ", posicao.id);
    console.log("Cooordenadas: ", posicao.x, posicao.y, posicao.z);
    console.log("Precisa de empilhadeira: ", empilhadeira);
}

analisarProduto(produtos[0]);
analisarProduto(produtos[1]);
analisarProduto(produtos[2]);

function analisarPedido(pedido){
    pedido.forEach(item => {
        const produto = encontrarProduto(item.produtoId);

        const posicao = encontrarPosicaoDoProduto(produto);

        console.log("-----------------------");
        console.log("Produto: ", produto.nome);
        console.log("Quantidade Solicitada: ", item.quantidade);
        console.log("Posição: ", posicao.id);
        console.log("Coordenadas: ", posicao.x, posicao.y);
        console.log("-----------------------");
    });
}

analisarPedido(pedido);

function criarPontosDaRota(pedido){
    const pontos = [];

    pontos.push({
        produto: "ENTRADA",
        posicao: 0,
        x: entrada.x,
        y: entrada.y 
    });

    pedido.forEach(item => {

        const produto = encontrarProduto(item.produtoId);
        const posicao = encontrarPosicaoDoProduto(produto);

        pontos.push({
            produto: produto.nome,
            posicaoId: posicao.id,
            x: posicao.x,
            y: posicao.y
        });

    });

    return pontos;
}

function calcularDistancia(pontoA, pontoB){
    const dx = pontoB.x - pontoA.x;
    const dy = pontoB.y - pontoA.y;

    return Math.sqrt(dx * dx + dy *dy);
}

function criarMatrizDeDistancias(pontos){
    const matriz = [];

    for(let i = 0; i < pontos.length; i++){
        const linha = [];

        for(let j = 0; j < pontos.length; j++){
            const distancia = calcularDistancia(
                pontos[i],
                pontos[j]
            );

            linha.push(distancia);
        }

        matriz.push(linha);
    }

    return matriz;
}

const pontosDaRota = criarPontosDaRota(pedido);
console.log("Pontos da Rota:");
console.table(pontosDaRota);// ajudar a visualizar como uma tabela os pontos da rota do pedido

const matriz = criarMatrizDeDistancias(pontosDaRota);

console.log(matriz);

const distancia = calcularDistancia(
    pontosDaRota[0],
    pontosDaRota[1]
);

console.log("Distância: ", distancia);
/*
console.log(precisaEmpilhadeira(produtos[0], posicoes[0]));
console.log(precisaEmpilhadeira(produtos[1], posicoes[1]));
console.log(precisaEmpilhadeira(produtos[2], posicoes[2]));
*/

/*
const produto = produtos[2];

const posicao = encontrarPosicaoDoProduto(produto);

console.log(produto);
console.log(posicao);
*/