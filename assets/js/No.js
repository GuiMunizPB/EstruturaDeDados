class No{
    constructor() {
        this.ant = null;
        this.conteudo = 0;
        this.prox = null;
    }

    getConteudo() {
        return this.conteudo;
    }

    setConteudo(conteudo) {
        this.conteudo = conteudo;
    }

    getProx() {
        return this.prox;
    }

    setProx(prox) {
        this.prox = prox;
    }

    getAnt() {
        return this.ant;
    }

    setAnt(ant) {
        this.ant = ant;
    }
}