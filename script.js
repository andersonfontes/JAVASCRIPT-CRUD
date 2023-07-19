let produtos =
[
    { id: 1, nome: 'sapato', preco: 100.00 },
    { id: 2, nome: 'sandalia', preco: 250.00 },
    { id: 3, nome: 'cinto', preco: 450.00 },
    { id: 4, nome: 'bolsa', preco: 650.00 }
]

//crio uma variável tabela para trazer o elemento table utilizando o id dela
const tabela = document.querySelector('#tabela');

//chamo as funções para limpar e atualizar a tabela:
limpaTabela();
getprodutos();

function criaId() {
//esta função irá criar um ID único
let ultimo = produtos.slice(-1)[0].id;
console.log('o ultimo id cadastrado é: ' + ultimo);

proximo = parseInt(ultimo) + 1;
return proximo;
}

function limpaTabela() {
//limpa a tabela
tabela.innerHTML = "<tr> <th>ID</th> <th>PRODUTO</th> <th>PREÇO</th>  <th>AÇÕES</th> </tr>";
}

function getprodutos() {
//função para atualizar a tabela (refresh)

//loop mais externo forEach: irá percorrer os produtos
produtos.forEach((produto) => {

    //cria uma linha na tabela para começar a inserir os dados do produto
    tabela.innerHTML += `<tr id="a${produto.id}">`;

    //loop mais interno for: irá percorrer as propriedades do produto "da vez"    
    for (let propriedade in produto) {
        //irá inserir na tabela cada um dos valores de cada uma das propriedades daquele produto
        document.querySelector("#" + 'a' + produto.id).innerHTML += `<td> ${produto[propriedade]} </td>`;
    }
    //inserindo um botão de DELETE
    let btnDeletar = `<td><button class=btn-apagar" onclick="deleta({produto.id})">APAGAR</td>`

    //primeiro criamos o BOTAO, aplicamos as propriedades e depois o criamos um TD pra ele                        
    let botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'btn-apagar');
    botaoApagar.setAttribute('onclick', `deleta(${produto.id})`);
    botaoApagar.innerHTML = 'APAGAR'

    //inserindo um botão de UPDATE:                
    //primeiro criamos o BOTAO, aplicamos as propriedades e depois o criamos um TD pra ele                        
    let botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('class', 'btn-editar');
    botaoEditar.setAttribute('onclick', `mostraEditar(${produto.id})`);
    botaoEditar.innerHTML = 'EDITAR';

    //criando TDs e anexando a TR
    let td = document.createElement('td');

    td.appendChild(botaoEditar);
    td.appendChild(document.createTextNode("    "));
    td.appendChild(botaoApagar);
    td.style.minWidth = '180px';

    tr = document.querySelector("#" + 'a' + produto.id);
    tr.appendChild(td);

    //fecha a linha da tabela
    tabela.innerHTML += "</tr>";
});
}

function cadastrar() {
//esta funçãorealiza a inserção de um novo cadastro no objeto PRODUTOS

//PASSO 1: pegando as informações que o usuario digitou e colocando em variaveis            
const idInsere = document.querySelector('#id').value;
const nomeInsere = document.querySelector('#nome').value;
const precoInsere = document.querySelector('#preco').value;

//PASSO 2: criando um novo objeto produto 
let produto = {
    id: parseInt(idInsere),
    nome: nomeInsere,
    preco: precoInsere
}

//PASSO 3: inserindo o objeto PRODUTO no vetor PRODUTOS
produtos.push(produto);

//PASSO 4: atualizando a tabela
limpaTabela();
getprodutos();

//mensagem de produto cadastrado e escondo a div
alert('produto cadastrado');
let div = document.getElementById('div-cadastrar');
div.classList.remove('div-cadastrar-ativo');
div.classList.add('div-cadastrar-inativo');
}

function mostraCadastro() {
//mostra tela de cadastro
const div = document.getElementById('div-cadastrar');
if (div.classList.contains('div-cadastrar-inativo')) {
    div.classList.remove('div-cadastrar-inativo');
    div.classList.add('div-cadastrar-ativo');
}
else {
    div.classList.remove('div-cadastrar-ativo');
    div.classList.add('div-cadastrar-inativo');
}
//zera os valores
document.getElementById('id').value = criaId();
document.getElementById('nome').value = '';
document.getElementById('preco').value = '';

//esconde tela de alteração
const divEditar = document.getElementById('div-editar');
if (divEditar.classList.contains('div-editar-ativo')) {
    divEditar.classList.remove('div-editar-ativo');
    divEditar.classList.add('div-editar-inativo');
}
}

function mostraEditar(idDoProdutoEdit) {
//mostra a tela de alteração 
const div = document.getElementById('div-editar');
if (div.classList.contains('div-editar-inativo')) {
    div.classList.remove('div-editar-inativo');
    div.classList.add('div-editar-ativo');
}
else {
    div.classList.remove('div-editar-ativo');
    div.classList.add('div-editar-inativo');
}

//filtrar o vetor produtos e pegar só aquele produto com aquela id
let vetorProdutoEditar = produtos.filter(function (item) {
    return item.id == idDoProdutoEdit;
});
let produtoEditar = vetorProdutoEditar[0];

//outra forma:
//let produtoEditar = produtos[idDoProdutoEdit - 1];

//mostrar os dados nos campos
document.getElementById('idEdit').value = produtoEditar.id;
document.getElementById('nomeEdit').value = produtoEditar.nome;
document.getElementById('precoEdit').value = produtoEditar.preco;

//esconde tela de inserção
const divCadastrar = document.getElementById('div-cadastrar');
if (divCadastrar.classList.contains('div-cadastrar-ativo')) {
    divCadastrar.classList.remove('div-cadastrar-ativo');
    divCadastrar.classList.add('div-cadastrar-inativo');
}

}

function salvarAlteracao() {
//pegos os valores do campos
const idInsere = parseInt(document.querySelector('#idEdit').value);
const nomeInsere = document.querySelector('#nomeEdit').value;
const precoInsere = document.querySelector('#precoEdit').value;

//crio um objeto com aqueles valores    
let produtoEditar = { id: idInsere, nome: nomeInsere, preco: precoInsere }

//utilizo o método SPLICE para subsituir o objeto no vetor
produtos.splice(idInsere - 1, 1, produtoEditar);

limpaTabela();
getprodutos();

//mensagem de produto cadastrado e escondo a div
alert('produto salvo');
let div = document.getElementById('div-editar');
div.classList.remove('div-editar-ativo');
div.classList.add('div-editar-inativo');
}

function deleta(idDoProdutoDelete) {

//mensagem de confirmação
let text = "Confirma a exclusão do registro?";
if (confirm(text) == true) {
    
    let obj = produtos.find(prod => prod.id == idDoProdutoDelete);
    let indexDeletar = produtos.indexOf(obj);

    console.log("o obj é: " + produtos.indexOf(obj));

    produtos.splice(indexDeletar, 1); /*exclusão*/
    console.log(idDoProdutoDelete);
    console.log(produtos);

    limpaTabela();
    getprodutos();
}


}