'use strict'
const abreTransparencia = () => document.getElementById('transparencia')
    .classList.add('active')

const fechaTransparencia = () =>{ 
    limparCampos();
    document.getElementById('transparencia').classList.remove('active');
}

document.getElementById('cadastrarUsuario')
    .addEventListener('click', abreTransparencia)

document.getElementById('fechaTransparencia')
    .addEventListener('click', fechaTransparencia)


const getLocal = () => JSON.parse(localStorage.getItem('dados_usuario')) ?? [];
const setLocal = (usuario) => localStorage.setItem("dados_usuario", JSON.stringify(usuario));

//CRIANDO USUARIO
const novoUsuario = function(usuario){
    const dados_usuario = getLocal();
    dados_usuario.push(usuario);
    setLocal(dados_usuario);
}

//ATUALIZA USUARIO
const atualizaUsuario = function(index, usuario){
    const dados_usuario = verificaUsuario();
    dados_usuario[index] = usuario;
    setLocal(dados_usuario);
}

//VERIFICA USARIO
const verificaUsuario = () => getLocal();

//DELETA USUARIO
const deletarUsuario = function(index){
    const dados_usuario = verificaUsuario();
    dados_usuario.splice(index, 1);
    setLocal(dados_usuario);
}

//HTML
const limparCampos = function(){
    const campos = document.querySelectorAll('.transparencia-field');
    campos.forEach(campos => campos.value = '');
}

const validade = function(){
    return document.getElementById('form').reportValidity();
}

const cadastrarCliente = function(){
    if(validade()){
        const usuario = {
            cpf: document.getElementById('cpf').value,
            tipo: document.getElementById('tipo').value,
            nome: document.getElementById('nome').value,
            dataNasc: document.getElementById('nascimento').value,
            cidade: document.getElementById('cidade').value 
        };
        const index = document.getElementById('nome').dataset.index;
        if(index == 'new'){
            novoUsuario(usuario);
            atualizaTabela();
            fechaTransparencia();
        }else{
            atualizaUsuario(index, usuario);
            atualizaTabela();
            fechaTransparencia();
        }
        
    }
}

document.getElementById('cadastrar').addEventListener('click', cadastrarCliente);

const criaLinha = function(usuario, index){
    const linha = document.createElement('tr');
    linha.innerHTML = `
        <td>${usuario.cpf}</td>
        <td>${usuario.tipo}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.dataNasc}</td>
        <td>${usuario.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${index}">Editar</button>
            <button type="button" class="button red" id="excluir-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tabelaUsuario>tbody').appendChild(linha);
}

const limparTabela = function(){
    const linha = document.querySelectorAll('#tabelaUsuario>tbody tr');
    linha.forEach(linha => linha.parentNode.removeChild(linha));
}

const atualizaTabela = function(){
    const dados_usuario = verificaUsuario();
    limparTabela();
    dados_usuario.forEach(criaLinha);
}

const preenherCampo = function(usuario){
    document.getElementById('cpf').value = usuario.cpf;
    document.getElementById('tipo').value = usuario.tipo;
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('nascimento').value = usuario.dataNasc;
    document.getElementById('cidade').value = usuario.cidade;
    document.getElementById('nome').dataset.index = usuario.index;
}

const editarUsuario = function(index){
    const usuario = verificaUsuario()[index];
    usuario.index = index;
    preenherCampo(usuario);
    abreTransparencia();
}

const editarOuExcluir = function(event){
    if(event.target.type == 'button'){
        const [acao, index] = event.target.id.split('-');

        if(acao == 'editar'){
            editarUsuario(index);
        }else{
            const alerta = confirm(`Deseja apagar o usuário?`);
            if(alerta){
                deletarUsuario(index);
                atualizaTabela();
            }
        }
    }
}

//EDITAR OU EXCLUIR
document.querySelector('#tabelaUsuario>tbody').addEventListener('click', editarOuExcluir);

atualizaTabela();
