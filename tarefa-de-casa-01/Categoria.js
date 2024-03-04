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

// Função para veri2ficar se a categoria existe pelo ID
async function categoriaExistePorId(id) {
    const response = await fetch(`http://localhost:3000/categorias/${id}`);
    return response.status === 200; // Retorna true se a categoria existe (status 200 OK)
}

// Função para incluir uma nova categoria
export async function incluirCategoria(nomeCategoria) {
    // Verifica se a categoria já existe
    if (await categoriaExiste(nomeCategoria)) {
        throw new Error('Categoria já existe');
    }

    // Se a categoria não existir, inclui a nova categoria
    const response = await fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: nomeCategoria }),
    });
    const data = await response.json();
    return data;
}

// Função para excluir uma categoria
export async function excluirCategoria(id) {
    const response = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

// Função para atualizar uma categoria
export async function atualizarCategoria(id, novaCategoria) {
    const response = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: novaCategoria }),
    });
    const data = await response.json();
    return data;
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