class Pilha {
    constructor(n = 100) {
      this.dados = new Array(n);
      this.topo = -1;
    }
  
    vazia() {
      return this.topo === -1;
    }
  
    cheia() {
      return this.topo === this.dados.length - 1;
    }
  
    tamanho() {
      return this.topo + 1;
    }
  
    top() {
      if (this.vazia()) {
        return -1;
      }
      return this.dados[this.topo];
    }
  
    push(valor) {
      if (this.cheia()) {
        return false; // pilha cheia
      }
      this.topo++;
      this.dados[this.topo] = valor;
      return true;
    }
  
    pop() {
      if (this.vazia()) {
        return -1; // Pilha vazia
      }
      const valor = this.dados[this.topo];
      this.topo--;
      return valor;
    }
  }
  