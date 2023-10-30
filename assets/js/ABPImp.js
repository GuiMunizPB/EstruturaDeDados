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


            var textT = document.createElement("div");
            textT.className = "abp-text-t";
            textT.innerText = "T";
            nodeDiv.appendChild(textT);
            document.getElementById("abp-container").appendChild(nodeDiv);

        }

        if (node.getDir() !== null) {
            var dirX, dirY;

            dirX = (x) + (subArvoreDirWidth / 3) * (1 / nivel);
            

            dirY = y + 100;

            criarVisualizacaoABP(node.getDir(), dirX, dirY, nivel + 1, distanciaEntreNiveis, distanciaEntreNiveis, "direita", altura);

            var textT = document.createElement("div");
            textT.className = "abp-text-t";
            textT.innerText = "T";
            nodeDiv.appendChild(textT);
            document.getElementById("abp-container").appendChild(nodeDiv);

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
    var valor = Number(valorInput.value);

    if (isNaN(valor)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    var busca = abp.buscaRecursiva(valor);

    if (busca !== null){
        var sucesso = abp.removeNo(valor);}
    else{
        var sucesso = false;
    }

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

function pesquisaABP() {
    var valorInput = document.getElementById("valor3-abp");
    var valor = Number(valorInput.value);

    if (isNaN(valorInput.value) || valorInput.value === "") {
        alert("Preencha os campos corretamente (valor numérico).");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    if(abp.vazia()) alert("Árvore vazia. Não foi possível fazer a busca.");

    var busca = abp.buscaRecursiva(valor);

    if (busca !== null) {
        var nodeDivs = document.querySelectorAll(".abp-node");

        for (var i = 0; i < nodeDivs.length; i++) {
            var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
            if (!isNaN(nodeValue) && nodeValue === parseFloat(valor)) {
                var nodeDiv = nodeDivs[i];

                nodeDiv.style.backgroundColor = "#DDA0DD";

                // Destaque o nó em vermelho
                setTimeout(function () {
                    nodeDiv.style.backgroundColor = "#6B5B95";
                }, 1500);

                break;
                // Adicione uma classe temporária
            }
        }

        valorInput.value = "";
    }

    else {
        alert("Valor não encontrado.");
    }
}


function executarOpcao(selecionarElemento) {
    var opcao = selecionarElemento.value;

    if(abp.vazia()) {
        alert("Árvore vazia. Não foi possível fazer o encaminhamento.");
    }
    
    if(opcao === "opcao1") caminhoPreOrdem();
    if(opcao === "opcao2") caminhoInOrdem();
    if(opcao === "opcao3") caminhoPosOrdem();
 }

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function caminhoPreOrdem() {
    var ordem = abp.exibePreOrdem();
    var nodeDivs = document.querySelectorAll(".abp-node");

    for (let j = 0; j < ordem.length; j++) {
        for (var i = 0; i < nodeDivs.length; i++) {
            var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
            if (!isNaN(nodeValue) && nodeValue === ordem[j]) {
                var nodeDiv = nodeDivs[i];
                nodeDiv.style.backgroundColor = "#DDA0DD";

                await esperar(2000);

                nodeDiv.style.backgroundColor = "#6B5B95";
            }
        }
    }
}

async function caminhoInOrdem() {
    var ordem = abp.exibeInOrdem();
    var nodeDivs = document.querySelectorAll(".abp-node");

    for (let j = 0; j < ordem.length; j++) {
        for (var i = 0; i < nodeDivs.length; i++) {
            var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
            if (!isNaN(nodeValue) && nodeValue === ordem[j]) {
                var nodeDiv = nodeDivs[i];
                nodeDiv.style.backgroundColor = "#DDA0DD";

                await esperar(2000);

                nodeDiv.style.backgroundColor = "#6B5B95";
            }
        }
    }
}

async function caminhoPosOrdem() {
    var ordem = abp.exibePosOrdem();
    var nodeDivs = document.querySelectorAll(".abp-node");

    for (let j = 0; j < ordem.length; j++) {
        for (var i = 0; i < nodeDivs.length; i++) {
            var nodeValue = parseFloat(nodeDivs[i].textContent); // Converter para número
            if (!isNaN(nodeValue) && nodeValue === ordem[j]) {
                var nodeDiv = nodeDivs[i];
                nodeDiv.style.backgroundColor = "#DDA0DD";

                await esperar(2000);

                nodeDiv.style.backgroundColor = "#6B5B95";
            }
        }
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