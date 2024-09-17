class Filme {
    constructor(nome, classificacao, duracao, genero, ano, sinopse) {
        this.nome = nome;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.genero = genero;
        this.ano = ano;
        this.sinopse = sinopse;
    }
}

class CatalogoStreaming {
    constructor() {
        this.filmes = [];
    }

    adicionarFilme(filme) {
        this.filmes.push(filme);
    }

    buscarFilme(nome) {
        return this.filmes.find(filme => filme.nome.toLowerCase() === nome.toLowerCase());
    }

    listarFilmes() {
        return this.filmes;
    }

    editarFilme(nome, novosDados) {
        const filme = this.buscarFilme(nome);
        if (filme) {
            Object.assign(filme, novosDados);
            return true;
        }
        return false;
    }

    excluirFilme(nome) {
        const index = this.filmes.findIndex(filme => filme.nome.toLowerCase() === nome.toLowerCase());
        if (index !== -1) {
            this.filmes.splice(index, 1);
            return true;
        }
        return false;
    }
}

const catalogo = new CatalogoStreaming();

function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === id ? 'block' : 'none';
    });
}

document.getElementById('addMovieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('name').value;
    const classificacao = document.getElementById('rating').value;
    const duracao = document.getElementById('duration').value;
    const genero = document.getElementById('genre').value;
    const ano = document.getElementById('year').value;
    const sinopse = document.getElementById('synopsis').value;
    
    const novoFilme = new Filme(nome, classificacao, duracao, genero, ano, sinopse);
    catalogo.adicionarFilme(novoFilme);

    alert('Filme adicionado com sucesso!');
    document.getElementById('addMovieForm').reset();
});

function searchMovie() {
    const nome = document.getElementById('searchName').value;
    const filme = catalogo.buscarFilme(nome);
    const resultDiv = document.getElementById('searchResult');
    
    if (filme) {
        resultDiv.innerHTML = `
            <h3>${filme.nome}</h3>
            <p><strong>Classificação:</strong> ${filme.classificacao}</p>
            <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Ano:</strong> ${filme.ano}</p>
            <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>Filme não encontrado.</p>';
    }
}

function listMovies() {
    const filmes = catalogo.listarFilmes();
    const listDiv = document.getElementById('movieList');
    listDiv.innerHTML = filmes.map(filme => `
        <div>
            <h3>${filme.nome}</h3>
            <p><strong>Classificação:</strong> ${filme.classificacao}</p>
            <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Ano:</strong> ${filme.ano}</p>
            <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
        </div>
    `).join('');
}

function loadMovieForEditing() {
    const nome = document.getElementById('editName').value;
    const filme = catalogo.buscarFilme(nome);
    
    if (filme) {
        document.getElementById('editRating').value = filme.classificacao;
        document.getElementById('editDuration').value = filme.duracao;
        document.getElementById('editGenre').value = filme.genero;
        document.getElementById('editYear').value = filme.ano;
        document.getElementById('editSynopsis').value = filme.sinopse;
        document.getElementById('editMovieForm').style.display = 'block';
    } else {
        alert('Filme não encontrado.');
    }
}

document.getElementById('editMovieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('editName').value;
    const novosDados = {
        classificacao: document.getElementById('editRating').value,
        duracao: document.getElementById('editDuration').value,
        genero: document.getElementById('editGenre').value,
        ano: document.getElementById('editYear').value,
        sinopse: document.getElementById('editSynopsis').value,
    };
    
    if (catalogo.editarFilme(nome, novosDados)) {
        alert('Filme atualizado com sucesso!');
    } else {
        alert('Filme não encontrado.');
    }
});

function deleteMovie() {
    const nome = document.getElementById('deleteName').value;
    const resultDiv = document.getElementById('deleteResult');
    
    if (catalogo.excluirFilme(nome)) {
        resultDiv.innerHTML = '<p>Filme excluído com sucesso!</p>';
    } else {
        resultDiv.innerHTML = '<p>Filme não encontrado.</p>';
    }
}
