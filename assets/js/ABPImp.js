var abp = new ABP();

function criarVisualizacaoABP(node, x, y, nivel, distanciaEntreNiveis, distanciaEntreNiveisPai, direction, altura ) {

    if (node !== null) {
        var nodeDiv = document.createElement("div");
        nodeDiv.className = "abp-node";
        nodeDiv.textContent = node.getConteudo();

        // Calcule o tamanho do nó com base no nível
        var tamanhoNodo = 60 - (nivel * 4); // Ajuste o fator multiplicador conforme necessário
        nodeDiv.style.width = tamanhoNodo + "px";
        nodeDiv.style.height = tamanhoNodo + "px";
        nodeDiv.style.color = "white"; // Define a fonte como branca

        // Ajuste o tamanho da fonte com base no tamanho do nó
        var tamanhoFonte = Math.min(20, tamanhoNodo / 2); // Ajuste o tamanho da fonte máximo (20) conforme necessário
        nodeDiv.style.fontSize = tamanhoFonte + "px";

        nodeDiv.style.left = x - tamanhoNodo / 2 + "px";
        nodeDiv.style.top = y + "px";

        document.getElementById("abp-container").appendChild(nodeDiv);


        var subArvoreEsqWidth = calcularLarguraSubArvore(node.getEsq(), distanciaEntreNiveis);
        var subArvoreDirWidth = calcularLarguraSubArvore(node.getDir(), distanciaEntreNiveis);

        if (node.getEsq() !== null) {
            var esqX, esqY;

            // Certifique-se de que os nós filhos não cruzem a linha vertical imaginária
           
            esqX = (x) - (subArvoreEsqWidth / 3) * (1 / nivel);
            
            

            esqY = y + 100;

            criarVisualizacaoABP(node.getEsq(), esqX, esqY, nivel + 1, distanciaEntreNiveis, distanciaEntreNiveis, "esquerda", altura);


            var line = document.createElement("div");
            line.className = "abp-line";
            line.style.left = x + "px";
            line.style.top = y + tamanhoNodo / 2 + "px";
            line.style.width = "2px";
            line.style.height = esqY - y - tamanhoNodo / 2 + "px";
            document.getElementById("abp-container").appendChild(line);
        }

        if (node.getDir() !== null) {
            var dirX, dirY;

            dirX = (x) + (subArvoreDirWidth / 3) * (1 / nivel);
            

            dirY = y + 100;

            criarVisualizacaoABP(node.getDir(), dirX, dirY, nivel + 1, distanciaEntreNiveis, distanciaEntreNiveis, "direita", altura);

            var line = document.createElement("div");
            line.className = "abp-line";
            line.style.left = x + "px";
            line.style.top = y + tamanhoNodo / 2 + "px";
            line.style.width = "2px";
            line.style.height = dirY - y - tamanhoNodo / 2 + "px";
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
        criarVisualizacaoABP(abp.raiz, abpContainer.clientWidth / 2, 50, 1, distanciaEntreNiveis, distanciaEntreNiveis, "", altura);
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

    var numero = parseFloat(valor);

    if (isNaN(numero)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return;
    }

    var sucesso = abp.insere(numero);

    if (sucesso) {

        atualizarArvoreABP();
        valorInput.value = "";

        // Encontre o nó visual que corresponde ao valor inserido
       // Encontre o nó visual que corresponde ao valor inserido
var nodeDivs = document.querySelectorAll(".abp-node");

for (var i = 0; i < nodeDivs.length; i++) {
    var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
    if (!isNaN(nodeValue) && nodeValue === parseFloat(numero)) {
        var nodeDiv = nodeDivs[i];
        nodeDiv.style.backgroundColor = "#3CB371"; // Defina a cor de fundo para verde

        // Adicione uma classe temporária
        nodeDiv.classList.add("temporary-green-background");

        // Remova a classe temporária após um período de tempo (por exemplo, 2 segundos)
        setTimeout(function () {
            nodeDiv.style.backgroundColor = ""; // Restaure o fundo original
            nodeDiv.classList.remove("temporary-green-background");
        }, 800); // 2000 milissegundos = 2 segundos
    }
}


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

    if (sucesso) {
        var nodeDivs = document.querySelectorAll(".abp-node");

        for (var i = 0; i < nodeDivs.length; i++) {
            var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
            if (!isNaN(nodeValue) && nodeValue === parseFloat(valor)) {
                var nodeDiv = nodeDivs[i];

                
                // Destaque o nó em vermelho
                nodeDiv.style.backgroundColor = "#B22222";
    
                // Adicione uma classe temporária
                nodeDiv.classList.add("temporary-red-background");
    
                // Adicione um atraso de 2 segundos antes da remoção
                setTimeout(function () {
                    // Remova o nó da visualização
                    nodeDiv.parentNode.removeChild(nodeDiv);
    
                    // Atualize a árvore sem o nó removido
                    atualizarArvoreABP();
                }, 800); // 2000 milissegundos = 2 segundos
            }
        }
    
        // Nota: Não é necessário verificar sucesso aqui, pois o nó será removido da visualização após o atraso.
    
        valorInput.value = "";
    } else {
        alert("O valor não existe na árvore.");
    }
}







var container = document.getElementById("quadradinhos-container-abp");
var isDragging = false;
var initialMouseX, initialContainerLeft;
var zoomLevel = 1.0;

container.addEventListener("mousedown", function (e) {
    if (e.ctrlKey) {
        // Zoom in
        zoomLevel *= 1.1;
        applyZoomAndPan();
    } else if (e.shiftKey) {
        // Zoom out
        zoomLevel *= 0.9;
        applyZoomAndPan();
    } else {
        // Start dragging (pan)
        isDragging = true;
        initialMouseX = e.clientX;
        initialContainerLeft = parseFloat(getComputedStyle(container).left);
    }
});

document.addEventListener("mousemove", function (e) {
    if (isDragging) {
        var dx = e.clientX - initialMouseX;
        container.style.left = initialContainerLeft + dx + "px";
    }
});

document.addEventListener("mouseup", function () {
    isDragging = false;
});

function applyZoomAndPan() {
    container.style.transform = `scale(${zoomLevel})`;
}
