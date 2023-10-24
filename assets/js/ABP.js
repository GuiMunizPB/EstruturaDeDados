class ABP {

  constructor() {
    this.raiz = null;
  }

  vazia() {
    return this.raiz === null;
  }

  busca(T, valor) {
    if (T === null) {
      return null;
    }

    if (T.getConteudo() === valor) {
      return T;
    }

    if (valor < T.getConteudo()) {
      return this.busca(T.getEsq(), valor);
    } else {
      return this.busca(T.getDir(), valor);
    }
  }

  buscaRecursiva(valor) {
    if (this.raiz !== null) {
      return this.busca(this.raiz, valor);
    }

    return null;
  }

  buscaIterativa(valor) {
    if (this.vazia()) {
      return null;
    }

    let aux = this.raiz;
    while (aux !== null) {
      if (aux.getConteudo() === valor) {
        return aux;
      }

      if (valor < aux.getConteudo()) {
        aux = aux.getEsq();
      } else {
        aux = aux.getDir();
      }
    }

    return null;
  }

  exibe(T) {
    if (T !== null) {
      this.exibe(T.getEsq());
      console.log(" " + T.getConteudo());
      this.exibe(T.getDir());
    }
  }

  exibeArvore() {
    if (this.raiz === null) {
      console.log("Arvore vazia");
    } else {
      this.exibe(this.raiz);
    }
  }

  exibeDec(T) {
    if (T !== null) {
      this.exibeDec(T.getDir());
      console.log(" " + T.getConteudo());
      this.exibeDec(T.getEsq());
    }
  }

  exibeDecrescente() {
    if (this.raiz === null) {
      console.log("Arvore vazia");
    } else {
      this.exibeDec(this.raiz);
    }
  }

  insere(valor) {
    let novoNo = new NoArvore();
    novoNo.setConteudo(valor);
    novoNo.setEsq(null);
    novoNo.setDir(null);

    if (this.raiz === null) {
      this.raiz = novoNo;
      return true;
    }

    let aux = this.raiz;
    let p = null;
    while (aux !== null) {
      p = aux;

      if (valor === aux.getConteudo()) {
        return false;
      }

      if (valor < aux.getConteudo()) {
        aux = aux.getEsq();
      } else {
        aux = aux.getDir();
      }
    }

    if (valor < p.getConteudo()) {
      p.setEsq(novoNo);
    } else {
      p.setDir(novoNo);
    }


    return true;

  }

  sucessor(T) {
    if (T.getEsq() !== null) {
      return this.sucessor(T.getEsq());
    }

    return T.getConteudo();
  }

  remove(T, valor) {
    if (T === null) {
      return T;
    }

    if (valor < T.getConteudo()) {
      T.setEsq(this.remove(T.getEsq(), valor));
    } else if (valor > T.getConteudo()) {
      T.setDir(this.remove(T.getDir(), valor));
    } else {
      if (T.getEsq() === null && T.getDir() === null) {
        return null;
      } else if (T.getEsq() === null) {
        return T.getDir();
      } else if (T.getDir() === null) {
        return T.getEsq();
      } else {
        let minValue = this.sucessor(T.getDir());
        T.setConteudo(minValue);
        T.setDir(this.remove(T.getDir(), minValue));
      }
    }

    return T;
  }

  removeNo(valor) {
    this.raiz = this.remove(this.raiz, valor);
    return true;
  }

  exibePreOrdem1(T, listaPreOrdem) {
    if (T === null)
      return;

    // Imprime a raiz
    listaPreOrdem.push(T.getConteudo());

    // Caminha recursivamente na sub-árvore da esquerda (pre-ordem)
    if (T.getEsq() !== null)
      this.exibePreOrdem1(T.getEsq(), listaPreOrdem);

    // Caminha recursivamente na sub-árvore da direita (pre-ordem)
    if (T.getDir() !== null)
      this.exibePreOrdem1(T.getDir(), listaPreOrdem);

    return listaPreOrdem;
  }

  // Exibe o conteúdo de uma árvore em pré-ordem
  exibePreOrdem() {
    if (this.raiz === null)
      console.log("Arvore vazia");
    else {
      var listaPreOrdem = [];
      this.exibePreOrdem1(this.raiz, listaPreOrdem);
      return listaPreOrdem;
    }
  }

  exibeInOrdem1(T, listaInOrdem) {
    if (T !== null) {
      if (T.getEsq() !== null)
        this.exibeInOrdem1(T.getEsq(), listaInOrdem);

      listaInOrdem.push(T.getConteudo());

      if (T.getDir() !== null)
        this.exibeInOrdem1(T.getDir(), listaInOrdem);

    }
    return listaInOrdem;
  }

  exibeInOrdem() {
    if (this.vazia())
      console.log("Arvore vazia");
    else {
      const listaInOrdem = [];
      this.exibeInOrdem1(this.raiz, listaInOrdem);
      return listaInOrdem;
    }
  }


  exibePosOrdem1(T, listaPosOrdem) {
    if (T === null)
      return;

    if (T.getEsq() !== null)
      this.exibePosOrdem1(T.getEsq(), listaPosOrdem);

    if (T.getDir() !== null)
      this.exibePosOrdem1(T.getDir(), listaPosOrdem);

    listaPosOrdem.push(T.getConteudo());

    return listaPosOrdem;
  }

  exibePosOrdem() {
    if (this.raiz === null)
      console.log("Arvore vazia");
    else {
      var listaPosOrdem = [];
      this.exibePosOrdem1(this.raiz, listaPosOrdem);
      return listaPosOrdem;
    }
  }
}