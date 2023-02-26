class JogoDaMemoria {
  constructor({ tela, util }) {
    this.tela = tela;
    this.util = util;

    this.heroisIniciais = [
      {
        img: './arquivos/batman.png',
        nome: 'batman',
      },
      {
        img: './arquivos/ciclop.png',
        nome: 'ciclop',
      },
      {
        img: './arquivos/deadpool.png',
        nome: 'deadpool',
      },
      {
        img: './arquivos/mulhermaravilha.png',
        nome: 'mulhermaravilha',
      },
    ];
    this.iconePadrao = './arquivos/default.png';
    this.heroisEscondidos = [];
    this.heroisSelecionados = [];
  }

  // para usar o this, n se pode usar o static
  inicializar() {
    // coloca todos os heróis na tela
    this.tela.atualizarImagens(this.heroisIniciais);
    // força a tela a usar o THIS de Jogo da memoria
    this.tela.configuraBotaoJogar(this.jogar.bind(this));

    this.tela.configuraBotaoSelecao(this.verificarSelecao.bind(this));

    this.tela.configuraBotaoMostrarTudo(
      this.mostrarHeroisEscondidos.bind(this)
    );
  }

  async embaralhar() {
    const copias = this.heroisIniciais
      // duplicar
      .concat(this.heroisIniciais)
      // criar ids aleatórios
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      // ordenar
      .sort(() => Math.random() - 0.5);

    this.tela.atualizarImagens(copias);
    this.tela.exibirCarregando();

    const idDoIntervalo = this.tela.iniciarContador();

    await this.util.timeout(3000);
    this.tela.limparContador(idDoIntervalo);
    this.esconderHerois(copias);
    this.tela.exibirCarregando(false);
  }

  esconderHerois(herois) {
    // vamos trocar a imagem de todos os herois existentes
    const heroisOcultos = herois.map(({ nome, id }) => ({
      nome,
      id,
      img: this.iconePadrao,
    }));

    this.tela.atualizarImagens(heroisOcultos);

    this.heroisEscondidos = heroisOcultos;
  }

  exibirHerois(nomeDoHeroi) {
    const { img } = this.heroisIniciais.find(
      ({ nome }) => nomeDoHeroi === nome
    );

    this.tela.exibirHerois(nomeDoHeroi, img);
  }

  verificarSelecao(id, nome) {
    const item = { id, nome };

    const heroisSelecionados = this.heroisSelecionados.length;
    switch (heroisSelecionados) {
      case 0:
        this.heroisSelecionados.push(item);
        break;
      case 1:
        // pegar o primeiro heroi selecionado
        const [opcao1] = this.heroisSelecionados;
        // zerar
        this.heroisSelecionados = [];
        if (opcao1.nome === item.nome && opcao1.id !== item.id) {
          this.exibirHerois(item.nome);
          this.tela.exibirMensagem();
          return;
        }

        this.tela.exibirMensagem(false);
        break;
    }
  }

  mostrarHeroisEscondidos() {
    const heroisEscondidos = this.heroisEscondidos;
    for (const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(
        (item) => item.nome === heroi.nome
      );
      heroi.img = img;
    }
    this.tela.atualizarImagens(heroisEscondidos);
  }

  jogar() {
    this.embaralhar();
  }
}
