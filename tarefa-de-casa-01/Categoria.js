// busca as categorias
export async function buscaCateorgia() {
    const response = await fetch('http://localhost:3000/categorias');
    const categorias = await response.json();
    return categorias;
  }

// Função para verificar se a categoria existe
export async function categoriaExiste(categoria) {
    const response = await fetch('http://localhost:3000/categorias');
    const categorias = await response.json();

    // Verifica se a categoria existe no array de categorias
    return categorias.some(cat => cat.categoria === categoria);
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