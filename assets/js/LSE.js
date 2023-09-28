class LSE {
    constructor() {
        this.cabeca = null;
        this.nElementos = 0;
    }

    vazia() {
        return this.nElementos === 0;
    }

    tamanho() {
        let aux = this.cabeca;
        let cont = 0;
        while (aux !== null) {
            aux = aux.getProx();
            cont++;
        }
        return cont;
    }

    elemento(pos) {
        if (this.vazia()) {
            return false;
        }

        if (pos < 1 || pos > this.tamanho()) {
            return false;
        }

        let aux = this.cabeca;
        for (let i = 1; i < pos; i++) {
            aux = aux.getProx();
        }

        return aux.getConteudo();
    }

    posicao(dado) {
        if (this.vazia()) {
            return false;
        }

        let aux = this.cabeca;
        let cont = 1;
        while (aux !== null) {
            if (aux.getConteudo() === dado) {
                return cont;
            }
            aux = aux.getProx();
            cont++;
        }

        return false;
    }

    insereInicioLista(valor) {
        let novoNo = new No();
        novoNo.setConteudo(valor);
        novoNo.setProx(this.cabeca);
        this.cabeca = novoNo;
        this.nElementos++;
        return true;
    }

    insereMeioLista(pos, valor) {
        let novoNo = new No();
        novoNo.setConteudo(valor);

        let aux = this.cabeca;
        for (let i = 1; i < pos - 1; i++) {
            aux = aux.getProx();
        }

        novoNo.setProx(aux.getProx());
        aux.setProx(novoNo);

        this.nElementos++;
        return true;
    }

    insere(pos, valor) {
        if (this.vazia() && pos !== 1) {
            return false;
        }

        if(!pos || !valor){
            return false;
        }

        if (pos <= 0 || pos > this.nElementos + 1) {
            return false;
        }

        if (pos === 1) {
            return this.insereInicioLista(valor);
        } else {
            return this.insereMeioLista(pos, valor);
        }
    }

    removeInicioLista() {
        let p = this.cabeca;
        let valorRemovido = p.getConteudo();
        this.cabeca = p.getProx();
        this.nElementos--;
        p = null;
        return valorRemovido;
    }

    removeNaLista(pos) {
        let antecessor = this.cabeca;
        for (let i = 1; i < pos - 1; i++) {
            antecessor = antecessor.getProx();
        }
        let atual = antecessor.getProx();
        let valorRemovido = atual.getConteudo();
        antecessor.setProx(atual.getProx());
        this.nElementos--;
        atual = null;
        return valorRemovido;
    }

    remove(pos) {
        if (this.vazia()) {
            return false;
        }

        if (pos <= 0 || pos > this.nElementos) {
            return false;
        }

        if (pos === 1) {
            return this.removeInicioLista();
        } else {
            return this.removeNaLista(pos);
        }
    }
}