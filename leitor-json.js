const objs = [
  {
    nome: "Anderson",
    idade: 30,
    esta_trabalhando: true,
    detalhes_profissao: {
      profissao: "Docente",
      empresa: "Senai",
    },
    hobbies: ["Programar", "Correr", "Ler"],
  },
  {
    nome: "André",
    idade: 32,
    esta_trabalhando: null,
    detalhes_profissao: {
      profissao: null,
      empresa: null,
    },
    hobbies: ["Jogar", "Academia"],
  },
];

//converter objeto para JSON
console.log(objs);
const jsonData = JSON.stringify(objs);

console.log(jsonData);

//converter JSON para OBJ
fetch("teste.json").then(response => {
  response.JSON().then((produtos) => {
    console.log(produtos);
  });
});

// const objData = JSON.parse('teste.json');
// console.log(objData);

// objData.map((pessoa)=> {console.log(pessoa.nome)})
