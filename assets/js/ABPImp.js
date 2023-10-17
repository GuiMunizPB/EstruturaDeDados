var abp = new ABP();

function criarVisualizacaoABP(node, parentElement, nivel) {
    if (node !== null) {
        var nodeDiv = document.createElement("div");
        nodeDiv.className = "abp-node";
        nodeDiv.textContent = node.getConteudo();

        parentElement.appendChild(nodeDiv);

        var leftDiv = document.createElement("div");
        leftDiv.className = "abp-subtree";
        parentElement.appendChild(leftDiv);

        var rightDiv = document.createElement("div");
        rightDiv.className = "abp-subtree";
        parentElement.appendChild(rightDiv);

        // Defina a largura do nó com base no nível para organizar os quadrados
        nodeDiv.style.width = 100 / Math.pow(2, nivel) + "%";

        if (node.getEsq() !== null) {
            criarVisualizacaoABP(node.getEsq(), leftDiv, nivel + 1);
        }

        if (node.getDir() !== null) {
            criarVisualizacaoABP(node.getDir(), rightDiv, nivel + 1);
        }
    }
}

function atualizarArvoreABP() {
    var abpContainer = document.getElementById("abp-container");
    abpContainer.innerHTML = ""; // Limpe o conteúdo atual

    // Chame uma função para criar a visualização da árvore
    if (abp.raiz !== null) {
        var treeDiv = document.createElement("div");
        treeDiv.className = "abp-tree";
        abpContainer.appendChild(treeDiv);

        criarVisualizacaoABP(abp.raiz, treeDiv, 1);
    }
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

 alert(numero);
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
    var valorInput = document.getElementById("valor3-abp");
    var valor = valorInput.value;

    if (!valor || isNaN(valor)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    if (valor) {
        // Remova o valor da árvore binária de pesquisa
        var sucesso = abp.removeNo(valor);

        if (sucesso) {
            // Atualize visualmente a exibição da árvore binária de pesquisa
            atualizarArvoreABP();
        } else {
            alert("O valor não existe na árvore.");
        }

        // Limpe o campo de entrada
        valorInput.value = "";
    }
}

