import * as ToProduto from './Produto.js';
import * as ToCategoria from './Categoria.js';

async function ProdutosCategoria() {

  console.log("::==================================================::");
  console.log(" >> Lista de Categorias e Produtos <<");
  console.log("::==================================================::");

  const tasks = await ToCategoria.buscaCateorgia();
  console.log(tasks);

  const task1 = await ToProduto.buscaProduto();
  console.log(task1);

  console.log("::==================================================::");
  console.log(" >> Inclui Produto <<");
  console.log("::==================================================::");

  const task2 = await ToProduto.incluiProduto("Urnas", "teste", 10);
  console.log(task2);

  console.log("::==================================================::");
  console.log(" >> Exclui Produto <<");
  console.log("::==================================================::");

  const task3 = await ToProduto.excluiProduto('22f4');
  console.log(task3);

  console.log("::==================================================::");
  console.log(" >> Atualiza Produto <<");
  console.log("::==================================================::");

  const task4 = await ToProduto.atualizaProduto('0a23', "Urnas", "Urna Teste", 1000);
  console.log(task4);

  console.log("::==================================================::");
  console.log(" >> Preco Medio por Categoria <<");
  console.log("::==================================================::");

  const task5 = await ToCategoria.precoMedioPorCategoria();
  console.log(task5);

  console.log("::==================================================::");
  console.log(" >> Quantidade de Produtos por Categoria <<");
  console.log("::==================================================::");

  const task6 = await ToCategoria.quantidadeProdutosPorCategoria();
  console.log(task6);

}

ProdutosCategoria();