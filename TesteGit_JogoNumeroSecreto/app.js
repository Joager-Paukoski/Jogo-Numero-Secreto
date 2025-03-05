//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do SecretNumber';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 0 e 9'
//teste


function exibirTexto (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function mensagemInicial() {
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Escolha um número entre 0 e 99');
}

mensagemInicial();

let listaNumerosSorteados = [];
let qtdLimiteSorteados = 100;
let numeroSecreto = RandomNumber();
let tentativas = 1;

function RandomNumber() {
    let numeroEscolhido = parseInt(Math.random()*100);
    let qtdElementos = listaNumerosSorteados.length;
    if(qtdElementos == qtdLimiteSorteados){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return RandomNumber();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
        
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voucê acertou o número secreto (${numeroSecreto}) com ${tentativas} ${palavraTentativa}`;
        exibirTexto('h1', 'Parabéns!!!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('h1', 'Que pena!');
            exibirTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTexto('h1', 'Que pena!');
            exibirTexto('p', `O número secreto é maior que ${chute}`);
        }
    }
    tentativas++;
    limparCampo();
    console.log(`O numero é secreto é ${numeroSecreto}`);
}
 
function reiniciarJogo() {
    numeroSecreto = RandomNumber();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reinicial').setAttribute('disabled', true);
}
