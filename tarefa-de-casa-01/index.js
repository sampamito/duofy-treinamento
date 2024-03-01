import * as ToDo from './toDo.js';

async function ProdutosCategoria() {

  console.log("::==================================================::");
  console.log(" >> Lista de Categorias e Produtos <<");
  console.log("::==================================================::");

  const tasks = await ToDo.buscaCateorgia();
  console.log(tasks);

  const task1 = await ToDo.buscaProduto();
  console.log(task1);

  console.log("::==================================================::");
  console.log(" >> Inclui Produto <<");
  console.log("::==================================================::");

  const task2 = await ToDo.incluiProduto("Urnas", "teste", 10);
  console.log(task2);

  console.log("::==================================================::");
  console.log(" >> Exclui Produto <<");
  console.log("::==================================================::");

  const task3 = await ToDo.excluiProduto('22f4');
  console.log(task3);

  console.log("::==================================================::");
  console.log(" >> Atualiza Produto <<");
  console.log("::==================================================::");

  const task4 = await ToDo.atualizaProduto('0a23', "Urnas", "Urna Teste", 1000);
  console.log(task4);

  console.log("::==================================================::");
  console.log(" >> Preco Medio por Categoria <<");
  console.log("::==================================================::");

  const task5 = await ToDo.precoMedioPorCategoria();
  console.log(task5);

  console.log("::==================================================::");
  console.log(" >> Quantidade de Produtos por Categoria <<");
  console.log("::==================================================::");

  const task6 = await ToDo.quantidadeProdutosPorCategoria();
  console.log(task6);

}

ProdutosCategoria();