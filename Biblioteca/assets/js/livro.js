const abreTransparenciaLivro = () => document.getElementById('transparencia-livro').classList.add('active')

const fechaTransparenciaLivro = () =>{ 
    limparCampoLivros();
    document.getElementById('transparencia-livro').classList.remove('active');
}

document.getElementById('cadastrarLivro').addEventListener('click', abreTransparenciaLivro)

document.getElementById('fechaTransparenciaLivro').addEventListener('click', fechaTransparenciaLivro)


const getLocalLivro = () => JSON.parse(localStorage.getItem('dados_livro')) ?? [];
const setLocalLivro = (livro) => localStorage.setItem("dados_livro", JSON.stringify(livro));

//CRIANDO livro
const novoLivro = function(livro){
    const dados_livro= getLocalLivro();
    dados_livro.push(livro);
    setLocalLivro(dados_livro);
}

//ATUALIZA livro
const atualizaLivro = function(indice, livro){
    const dados_livro= verificaLivro();
    dados_livro[indice] = livro;
    setLocalLivro(dados_livro);
}

//VERIFICA USARIO
const verificaLivro = () => getLocalLivro();

//DELETA livro
const deletarLivro = function(indice){
    const dados_livro = verificaLivro();
    dados_livro.splice(indice, 1);
    setLocalLivro(dados_livro);
}

//HTML
const limparCampoLivros = function(){
    const camposLivro = document.querySelectorAll('.transparencia-field-livro');
    camposLivro.forEach(camposLivro => camposLivro.value = '');
}

const validadeLivros = function(){
    return document.getElementById('form-livro').reportValidity();
}

const cadastrarLivro = function(){
    if(validadeLivros()){
        const livro = {
            codigo: document.getElementById('codigoLivro').value,
            nomeLivro: document.getElementById('nomeLivro').value,
            autor: document.getElementById('autorLivro').value,
            editora: document.getElementById('editoraLivro').value,
            status: document.getElementById('tipoLivro').value, 
            dataAluguel: document.getElementById('dataAluguel').value
        };
        const indice = document.getElementById('nomeLivro').dataset.indice;
        if(indice == 'newLivro'){
            novoLivro(livro);
            atualizaTabelaLivros();
            fechaTransparenciaLivro();
        }else{
            atualizaLivro(indice, livro);
            atualizaTabelaLivros();
            fechaTransparenciaLivro();
        }
        
    }
}

document.getElementById('cadastrar-livro').addEventListener('click', cadastrarLivro);

const criaLinhaLivros = function(livro, indice){
    const linhaLivros = document.createElement('tr');
    linhaLivros.innerHTML = `
        <td>${livro.codigo}</td>
        <td>${livro.nomeLivro}</td>
        <td>${livro.autor}</td>
        <td>${livro.editora}</td>
        <td>${livro.status}</td>
        <td>${livro.dataAluguel}</td>
        <td>
            <button type="button" class="button green" id="editar-livro-${indice}">Editar</button>
            <button type="button" class="button red" id="excluir-livro-${indice}">Excluir</button>
        </td>
    `;
    document.querySelector('#tabelaLivro>tbody').appendChild(linhaLivros);
}

const limpaTabelaLivros = function(){
    const linhaLivros = document.querySelectorAll('#tabelaLivro>tbody tr');
    linhaLivros.forEach(linhaLivros => linhaLivros.parentNode.removeChild(linhaLivros));
}

const atualizaTabelaLivros = function(){
    const dados_livro= verificaLivro();
    limpaTabelaLivros();
    dados_livro.forEach(criaLinhaLivros);
}

const preencherCamposLivro = function(livro){
    document.getElementById('codigoLivro').value = livro.codigo;
    document.getElementById('nomeLivro').value = livro.nome;
    document.getElementById('autorLivro').value = livro.autor;
    document.getElementById('editoraLivro').value = livro.editora;
    document.getElementById('tipoLivro').value = livro.status;
    document.getElementById('dataAluguel').value = livro.dataAluguel;
    document.getElementById('nomeLivro').dataset.indice = livro.indice;
}

const editarLivro = function(indice){
    const livro = verificaLivro()[indice];
    livro.indice = indice;
    preencherCamposLivro(livro);
    abreTransparenciaLivro();
}

const editarOuExcluirLivros = function(event){
    if(event.target.type == 'button'){
        const [action, indice] = event.target.id.split('-');

        if(action == 'editar'){
            editarLivro(indice);
        }else{
            const alerta = confirm(`Deseja apagar o usuário?`);
            if(alerta){
                deletarLivro(indice);
                atualizaTabelaLivros();
            }
        }
    }
}

//EDITAR OU EXCLUIR
document.querySelector('#tabelaLivro>tbody').addEventListener('click', editarOuExcluirLivros);

atualizaTabelaLivros();
