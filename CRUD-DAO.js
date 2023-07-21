//criando um array de objetos. cada objeto tem 3 propriedades, cada propriedade tem um valor
let produtos =
    [
        { id: 1, nome: 'sapato', preco: 100.00 },
        { id: 2, nome: 'sandalia', preco: 250.00 },
        { id: 3, nome: 'cinto', preco: 450.00 },
        { id: 4, nome: 'bolsa', preco: 650.00 }
    ]

//crio uma variável tabela para trazer o elemento table utilizando o id dela
const tabela = document.querySelector('#tabela');
limpaTabela();
getprodutos();

function getprodutos() {
    //esta função irá listar os produtos na tabela, utilizando manipulação do DOM

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
        //primeiro criamos o BOTAO, aplicamos as propriedades e depois o criamos um TD pra ele                        
        let botaoApagar = document.createElement('button'); /*crio botão*/
        botaoApagar.setAttribute('class', 'btn-apagar'); /*crio atributo classe p/ estilo css*/
        botaoApagar.setAttribute('onclick', `deleta(${produto.id})`); /*crio evento click passando id como parâmetro*/
        botaoApagar.innerHTML = 'APAGAR' /*crio o texto do botão*/

        //inserindo um botão de UPDATE:                
        // primeiro criamos o BOTAO, aplicamos as propriedades e depois o criamos um TD pra ele                        
        let botaoEditar = document.createElement('button');
        botaoEditar.setAttribute('class', 'btn-editar');
        botaoEditar.setAttribute('onclick', `mostraEditar(${produto.id})`);
        botaoEditar.innerHTML = 'EDITAR';

        //criando TDs e anexando a TR
        let td = document.createElement('td');

        td.appendChild(botaoEditar);
        td.appendChild(botaoApagar);

        tr = document.querySelector("#" + 'a' + produto.id);
        tr.appendChild(td);

        //fecha a linha da tabela
        tabela.innerHTML += "</tr>";
    });
}

function cadastrar() {
    //Esta função irá cadastrar um novo produto no array de produtos

    //PASSO 1: pegando as informações que o usuario digitou e colocando em variaveis
    const idInsere = document.getElementById('id').value;
    const nomeInsere = document.querySelector('#nome').value;
    const precoInsere = document.querySelector('#preco').value;

    //PASSO 2: criando um objeto produto 
    let produto = {
        id: idInsere,
        nome: nomeInsere,
        preco: precoInsere
    }

    //PASSO 3: inserindo o objeto PRODUTO no vetor PRODUTOS
    produtos.push(produto);

    //zerar e atualizar a tabela
    limpaTabela();
    getprodutos();


}

function mostraCadastro() {
    //mostra ou oculta a tela de cadastro quando o usuário clica no botão abaixo da tabela
    const div = document.getElementById('div-cadastrar');
    if (div.classList.contains('div-cadastrar-inativo')) {
        div.classList.remove('div-cadastrar-inativo');
        div.classList.add('div-cadastrar-ativo');
    }
    else {
        div.classList.remove('div-cadastrar-ativo');
        div.classList.add('div-cadastrar-inativo');
    }

    /*outra forma:*/
    // if(div.style.display == 'none') 
    //     div.style.display = 'block';
    // else
    //     div.style.display = 'none' ;
}

function limpaTabela() {
    //zera a tabela e deixa só o cabeçalho
    tabela.innerHTML = "<tr> <th>ID</th> <th>PRODUTO</th> <th>PREÇO</th>  <th>AÇÕES</th> </tr>";
}

function deleta(idDoProdutoDelete) { /*arrow function-função seta*/
    let obj = produtos.find(prod => prod.id == idDoProdutoDelete);
    let indexDeletar = produtos.indexOf(obj);

    produtos.splice(indexDeletar, 1);

    limpaTabela();
    getprodutos();
}

function mostraEditar(idDoProdutoEdit) {

    //mostra ou oculta a tela de edição quando o usuário clica no botão EDITAR
    const div = document.getElementById('div-editar');
    
    if (div.classList.contains('div-editar-inativo')) {
        div.classList.remove('div-editar-inativo');
        div.classList.add('div-editar-ativo');
    }
    else {
        div.classList.remove('div-editar-ativo');
        div.classList.add('div-editar-inativo');
    }



}

