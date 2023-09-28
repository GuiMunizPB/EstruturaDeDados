class LDE {

    constructor() {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }

    vazia() {
        return this.tamanho === 0;
    }

    tamanho() {
        return this.tamanho;
    }

    elemento(pos) {
        let aux = this.inicio;
        let cont = 1;

        if (this.vazia()) {
            return -1;
        }

        if (pos < 1 || pos > this.tamanho) {
            return -1;
        }

        while (cont < pos) {
            aux = aux.prox;
            cont++;
        }

        return aux.conteudo;
    }

    posicao(dado) {
        let cont = 1;
        let aux = this.inicio;

        if (this.vazia()) {
            return -1;
        }

        while (aux !== null) {
            if (aux.conteudo === dado) {
                return cont;
            }
            aux = aux.prox;
            cont++;
        }

        return -1;
    }

    insereInicioLista(valor) {
        const novoNo = new No();
        novoNo.conteudo = valor;
        novoNo.prox = this.inicio;

        novoNo.ant = null;
        if (this.vazia()) {
            this.fim = novoNo;
        } else {
            this.inicio.ant = novoNo;
        }

        this.inicio = novoNo;
        this.tamanho++;
        return true;
    }

    insereMeioLista(pos, dado) {
        let cont = 1;
        const novoNo = new No();
        novoNo.conteudo = dado;

        let aux = this.inicio;
        while (cont < pos - 1 && aux !== null) {
            aux = aux.prox;
            cont++;
        }

        if (aux === null) {
            return false;
        }

        novoNo.ant = aux;
        novoNo.prox = aux.prox;
        aux.prox.ant = novoNo;
        aux.prox = novoNo;

        this.tamanho++;
        return true;
    }

    insereFimLista(dado) {
        const novoNo = new No();
        novoNo.conteudo = dado;

        let aux = this.inicio;
        while (aux.prox !== null) {
            aux = aux.prox;
        }

        novoNo.prox = null;
        aux.prox = novoNo;

        novoNo.ant = this.fim;
        this.fim.prox = novoNo;
        this.fim = novoNo;

        this.tamanho++;
        return true;
    }

    insere(pos, dado) {
        if (this.vazia() && pos !== 1) {
            return false;
        }

        if(pos > this.tamanho + 1) {
            return false;
        }

        if (pos === 1) {
            return this.insereInicioLista(dado);
        } else if (pos === this.tamanho + 1) {
            return this.insereFimLista(dado);
        } else {
            return this.insereMeioLista(pos, dado);
        }
    }

    removeInicioListaUnitaria() {
        const dado = this.inicio.conteudo;
        this.inicio = null;
        this.fim = null;
        this.tamanho--;
        return dado;
    }

    removeInicioLista() {
        const p = this.inicio;
        const dado = p.conteudo;

        this.inicio = p.prox;
        p.prox.ant = null;

        this.tamanho--;

        return dado;
    }

    removeMeioLista(pos) {
        let p = this.inicio;
        let n = 1;

        while (n <= pos - 1 && p !== null) {
            p = p.prox;
            n++;
        }

        if (p === null) {
            return -1;
        }

        const dado = p.conteudo;
        p.ant.prox = p.prox;
        p.prox.ant = p.ant;

        this.tamanho--;

        return dado;
    }

    removeFimLista() {
        const p = this.fim;
        const dado = p.conteudo;

        this.fim.ant.prox = null;
        this.fim = this.fim.ant;

        this.tamanho--;

        return dado;
    }

    remove(pos) {
        if (this.vazia()) {
            return -1;
        }
        
        if (pos === 1 && this.tamanho === 1) {
            return this.removeInicioListaUnitaria();
        } else if (pos === 1) {
            return this.removeInicioLista();
        } else if (pos === this.tamanho) {
            return this.removeFimLista();
        } else {
            return this.removeMeioLista(pos);
        }
    }
}
