import * as ToCategoria from './Categoria.js';

// Função para verificar se o produto existe
async function produtoExiste(produto) {
  const response = await fetch('http://localhost:3000/produtos');
  const produtos = await response.json();

  // Verifica se o produto existe no array de produtos
  return produtos.some(prod => prod.produto === produto);
}

// Função para verificar se o produto existe
async function produtoExisteID(id) {
  const response = await fetch('http://localhost:3000/produtos');
  const produtos = await response.json();

  // Verifica se o produto existe no array de produtos
  return produtos.some(prod => prod.id === id);
}

// busca os produtos
export async function buscaProduto() {
  const response = await fetch('http://localhost:3000/produtos');
  const produtos = await response.json();
  return produtos;
}

// incluid um produto
export async function incluiProduto(categoria, produto, preco) {
  if (await ToCategoria.categoriaExiste(categoria)) {
    if (!(await produtoExiste(produto))) {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria, produto, preco }),
      });
      const data = await response.json();
      return data;
    } else {
      console.log('Produto já existe');
    }
  } else {
    console.log('Categoria não encontrada');
  }
}

// Função para excluir um produto
export async function excluiProduto(id) {
  if (await produtoExisteID(id)) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('Produto deletado com sucesso');
    return data;
  } else {
    console.log('Produto não encontrado');
  }
}

// Função para atualizar um produto, verificando se ele existe
export async function atualizaProduto(id, novaCategoria, novoProduto, novoPreco) {
  if (await produtoExisteID(id)) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoria: novaCategoria, produto: novoProduto, preco: novoPreco }),
    });
    const data = await response.json();
    console.log('Produto atualizado com sucesso');
    return data;
  } else {
    console.log('Produto não encontrado');
  }
}