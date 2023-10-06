class Fila {
    constructor(n = 100) {
      this.dados = new Array(n);
      this.inicio = 0;
      this.fim = -1;
      this.nElementos = 0;
    }
  
    vazia() {
      return this.nElementos === 0;
    }
  
    cheia() {
      return this.nElementos === this.dados.length;
    }
  
    tamanho() {
      return this.nElementos;
    }
  
    primeiro() {
      if (this.vazia()) {
        return -1; // Erro: Fila vazia
      }
  
      return this.dados[this.inicio];
    }
  
    insere(valor) {
      if (this.cheia()) {
        return false;
      }
  
      this.fim = (this.fim + 1) % this.dados.length; // Circularidade
      this.dados[this.fim] = valor;
      this.nElementos++;
      return true;
    }
  
    remove() {
      if (this.vazia()) {
        return -1;
      }
  
      const valor = this.dados[this.inicio];
  
      this.inicio = (this.inicio + 1) % this.dados.length; // Circularidade
      this.nElementos--;
      return valor;
    }
  }
  