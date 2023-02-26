const util = Util;

const ID_CONTEUDO = 'conteudo';
const ID_BTN_JOGAR = 'jogar';
const ID_BTN_MOSTRAR_TUDO = 'mostrarTudo';
const ID_MENSAGEM = 'mensagem';
const CLASSE_INVISIBLE = 'invisible';
const ID_CARREGANDO = 'carregando';
const ID_CONTADOR = 'contador';

const MENSAGENS = {
  sucesso: {
    texto: 'Combinação correta!',
    classe: 'alert-success',
  },
  erro: {
    texto: 'Combinação incorreta!',
    classe: 'alert-danger',
  },
};

class Tela {
  static obterCodigoHTML(item) {
    return `
    <div class="col-md-3">
      <div class="card" style="width: 80%" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
        <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="..." />
      </div>
      <br />
    </div>
    `;
  }

  static configuraBotaoSelecao(funcaoOnclick) {
    window.verificarSelecao = funcaoOnclick;
  }

  static alterarConteudoHTML(codigoHTML) {
    const conteudo = document.getElementById(ID_CONTEUDO);
    conteudo.innerHTML = codigoHTML;
  }

  static gerarStringHTMLPelaImagem(itens) {
    // concatenar array de varias strings
    return itens.map(Tela.obterCodigoHTML).join('');
  }

  static atualizarImagens(itens) {
    const codigoHTML = Tela.gerarStringHTMLPelaImagem(itens);
    Tela.alterarConteudoHTML(codigoHTML);
  }

  static configuraBotaoJogar(funcaoOnclick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR);
    btnJogar.onclick = funcaoOnclick;
  }

  static exibirHerois(nomeDoHeroi, img) {
    const elementosHTML = document.getElementsByName(nomeDoHeroi);
    // para cada elemento mudar a imagem
    elementosHTML.forEach((item) => (item.src = img));
  }

  static async exibirMensagem(sucesso = true) {
    const elemento = document.getElementById(ID_MENSAGEM);
    if (sucesso) {
      elemento.classList.remove(MENSAGENS.erro.classe);
      elemento.classList.add(MENSAGENS.sucesso.classe);
      elemento.innerText = MENSAGENS.sucesso.texto;
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.classe);
      elemento.classList.add(MENSAGENS.erro.classe);
      elemento.innerText = MENSAGENS.erro.texto;
    }
    elemento.classList.remove(CLASSE_INVISIBLE);
    await util.timeout(1000);
    elemento.classList.add(CLASSE_INVISIBLE);
  }

  static exibirCarregando(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO);
    if (mostrar) {
      carregando.classList.remove(CLASSE_INVISIBLE);
      return;
    }
    carregando.classList.add(CLASSE_INVISIBLE);
  }

  static iniciarContador() {
    let contarAte = 3;
    const elementoContador = document.getElementById(ID_CONTADOR);

    const identificadorNoTexto = '$$contador';
    const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`;

    const atualizarTexto = () =>
      (elementoContador.innerHTML = textoPadrao.replace(
        identificadorNoTexto,
        contarAte--
      ));

    atualizarTexto();
    // a cada segundo atualizar o texto
    // retorna id do intervalo para usar depois
    const idDoIntervalo = setInterval(atualizarTexto, 1000);
    return idDoIntervalo;
  }

  static limparContador(idDoIntervalo) {
    clearInterval(idDoIntervalo);
    document.getElementById(ID_CONTADOR).innerHTML = '';
  }

  static configuraBotaoMostrarTudo(funcaoOnclick) {
    const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO);
    btnMostrarTudo.onclick = funcaoOnclick;
  }
}
