var abp = new ABP();

function criarVisualizacaoABP(node, x, y, nivel, distanciaEntreNiveis, direction, altura) {
    if (node !== null) {
        var nodeDiv = document.createElement("div");
        nodeDiv.className = "abp-node";
        nodeDiv.textContent = node.getConteudo();
        nodeDiv.style.left = x + "px";
        nodeDiv.style.top = y + "px";

        document.getElementById("abp-container").appendChild(nodeDiv);

        var subArvoreEsqWidth = calcularLarguraSubArvore(node.getEsq(), distanciaEntreNiveis);
        var subArvoreDirWidth = calcularLarguraSubArvore(node.getDir(), distanciaEntreNiveis);

        if (node.getEsq() !== null) {
            var esqX, esqY;

            if (nivel === 1) {
                // Desloque para a esquerda ao adicionar na subárvore esquerda
                esqX = x - subArvoreEsqWidth * 2; // Ajuste o fator multiplicador conforme necessário
            } else {
                // Espaçamento padrão para os filhos subsequentes
                esqX = x - subArvoreEsqWidth * 1.5; // Ajuste o fator multiplicador apenas para os filhos subsequentes
            }

            esqY = y + 100;

            criarVisualizacaoABP(node.getEsq(), esqX, esqY, nivel + 1, distanciaEntreNiveis, "esquerda", altura);

            // Desenhar uma linha para o filho esquerdo
            var line = document.createElement("div");
            line.className = "abp-line";
            line.style.left = x - (subArvoreEsqWidth / 2) + "px";
            line.style.top = (y + esqY - 30) + "px";
            line.style.width = subArvoreEsqWidth + "px";
            line.style.height = "60px"; // Ajuste a altura da linha conforme necessário
            document.getElementById("abp-container").appendChild(line);
        }

        if (node.getDir() !== null) {
            var dirX, dirY;

            if (nivel === 1) {
                // Desloque para a direita ao adicionar na subárvore direita
                dirX = x + subArvoreDirWidth * 2; // Ajuste o fator multiplicador conforme necessário
            } else {
                // Espaçamento padrão para os filhos subsequentes
                dirX = x + subArvoreDirWidth * 1.5; // Ajuste o fator multiplicador apenas para os filhos subsequentes
            }

            dirY = y + 100;

            criarVisualizacaoABP(node.getDir(), dirX, dirY, nivel + 1, distanciaEntreNiveis, "direita", altura);

            // Desenhar uma linha para o filho direito
            var line = document.createElement("div");
            line.className = "abp-line";
            line.style.left = x + (subArvoreDirWidth / 2) + "px";
            line.style.top = (y + dirY - 30) + "px";
            line.style.width = subArvoreDirWidth + "px";
            line.style.height = "60px"; // Ajuste a altura da linha conforme necessário
            document.getElementById("abp-container").appendChild(line);
        }
    }
}



function calcularLarguraSubArvore(node, distanciaEntreNiveis) {
    if (node === null) {
        return 0;
    }
    var larguraEsq = calcularLarguraSubArvore(node.getEsq(), distanciaEntreNiveis / 2);
    var larguraDir = calcularLarguraSubArvore(node.getDir(), distanciaEntreNiveis / 2);
    return larguraEsq + distanciaEntreNiveis + larguraDir;
}




function atualizarArvoreABP() {
    var abpContainer = document.getElementById("abp-container");
    abpContainer.innerHTML = ""; // Limpe o conteúdo atual

    // Chame uma função para calcular a altura da árvore
    var altura = calcularAltura(abp.raiz);
    
    // Chame uma função para calcular a distância entre os níveis
    var distanciaEntreNiveis = altura * 40;

    if (abp.raiz !== null) {
        criarVisualizacaoABP(abp.raiz, abpContainer.clientWidth / 2, 50, 1, distanciaEntreNiveis, "", altura);
    }
}

function calcularAltura(node) {
    if (node === null) {
        return 0;
    }
    var esqAltura = calcularAltura(node.getEsq());
    var dirAltura = calcularAltura(node.getDir());
    return Math.max(esqAltura, dirAltura) + 1;
}


function calcularDistanciaEntreNiveis(node) {
    if (node === null) {
        return 0;
    }
    var esqDistancia = calcularDistanciaEntreNiveis(node.getEsq());
    var dirDistancia = calcularDistanciaEntreNiveis(node.getDir());
    return Math.max(esqDistancia, dirDistancia) + 1;
}




function insereNaABP() {
    var valorInput = document.getElementById("valor1-abp");
    var valor = valorInput.value;

    // Use parseFloat para converter o valor em um número
    var numero = parseFloat(valor);

    if (isNaN(numero)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    // Adicione o valor à árvore binária de pesquisa
    var sucesso = abp.insere(numero);

    if (sucesso) {
        // Atualize visualmente a exibição da árvore binária de pesquisa
        atualizarArvoreABP();
        // Limpe o campo de entrada
        valorInput.value = "";
    } else {
        alert("O valor já existe na árvore.");
    }
}

function removeDaABP() {
    var valorInput = document.getElementById("valor2-abp");
    var valor = valorInput.value;

    if (isNaN(valor)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    var sucesso = abp.removeNo(valor);
    alert(sucesso);
    if (sucesso) {
        // Atualize visualmente a exibição da árvore binária de pesquisa
        atualizarArvoreABP();

        // Limpe o campo de entrada
        valorInput.value = "";
    } else {
        alert("O valor não existe na árvore.");
    }
}
