class ListaSeq {
    constructor(tamMax) {
        if (tamMax) {
            this.dados = new Array(tamMax);
        } else {
            this.dados = new Array(30);
        }
        this.nElementos = 0;
    }
    


    vazia() {
        if (this.nElementos === 0)
            return true;
        else
            return false;
    }
    
    cheia() {
        if (this.nElementos === this.dados.length)
            return true;
        else
            return false;
    }
    

    tamanho() {
        return this.nElementos;
    }

    elemento(pos) {
        if (pos <= 0 || pos > this.nElementos) {
            return false;
        }
        return this.dados[pos - 1];
    }

    posicao(valor) {
        for (let i = 0; i < this.nElementos; i++) {
            if (this.dados[i] === valor) {
                return i + 1;
            }
        }
        return false;
    }

    

    insere(pos, valor) {
        // Verifica se a lista está cheia ou se a posição a ser inserida é inválida
        if (this.cheia() || pos > this.nElementos + 1 || pos <= 0) {
            return false;
        }

        if(!pos || !valor){
            return false;
        }
    
        // Desloca os elementos após a posição 'pos' uma posição à direita
        for (let i = this.nElementos; i >= pos; i--) {
            this.dados[i] = this.dados[i - 1];
        }
    
        // Insere o valor na posição correta
        this.dados[pos - 1] = valor;
    
        // Incrementa o número de elementos na lista
        this.nElementos++;
        return true;
    }
    

    remove(pos) {
        if (pos < 1 || pos > this.nElementos) {
            return false;
        }

        const aux = this.dados[pos - 1];

        for (let i = pos - 1; i < this.nElementos - 1; i++) {
            this.dados[i] = this.dados[i + 1];
        }

        this.nElementos--;
        return aux;
    }
}
