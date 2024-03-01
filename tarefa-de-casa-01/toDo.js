// busca as categorias
export async function buscaCateorgia() {
  const response = await fetch('http://localhost:3000/categorias');
  const categorias = await response.json();
  return categorias;
}

// Função para verificar se a categoria existe
async function categoriaExiste(categoria) {
  const response = await fetch('http://localhost:3000/categorias');
  const categorias = await response.json();

  // Verifica se a categoria existe no array de categorias
  return categorias.some(cat => cat.categoria === categoria);
}

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
  if (await categoriaExiste(categoria)) {
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

// Função para calcular o preço médio por categoria
export async function precoMedioPorCategoria() {
  const response = await fetch('http://localhost:3000/produtos');
  const produtos = await response.json();

  // Objeto para armazenar o total de preços e a contagem de produtos por categoria
  const categorias = {};

  // Percorre a lista de produtos
  produtos.forEach(produto => {
    const { categoria, preco } = produto;

    // Se a categoria ainda não foi registrada, inicializa o objeto para a categoria
    if (!categorias[categoria]) {
      categorias[categoria] = { total: 0, count: 0 };
    }

    // Adiciona o preço do produto ao total da categoria e incrementa a contagem de produtos
    categorias[categoria].total += preco;
    categorias[categoria].count++;
  });

  // Objeto para armazenar o preço médio por categoria
  const precoMedioPorCategoria = {};

  // Calcula o preço médio para cada categoria
  for (const categoria in categorias) {
    precoMedioPorCategoria[categoria] = categorias[categoria].total / categorias[categoria].count;
  }

  return precoMedioPorCategoria;
}

// Função para calcular a quantidade de produtos por categoria
export async function quantidadeProdutosPorCategoria() {
  const response = await fetch('http://localhost:3000/produtos');
  const produtos = await response.json();

  // Objeto para armazenar a contagem de produtos por categoria
  const quantidadePorCategoria = {};

  // Percorre a lista de produtos
  produtos.forEach(produto => {
    const { categoria } = produto;

    // Se a categoria ainda não foi registrada, inicializa o contador como 1
    if (!quantidadePorCategoria[categoria]) {
      quantidadePorCategoria[categoria] = 1;
    } else {
      // Se a categoria já foi registrada, incrementa o contador
      quantidadePorCategoria[categoria]++;
    }
  });

  return quantidadePorCategoria;
}