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
  }