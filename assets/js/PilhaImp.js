// Crie uma instância da classe Pilha
var pilha = new Pilha();

// Função para atualizar os quadradinhos com base na pilha
function atualizarQuadradinhosPilha() {
    var quadradinhosContainer = document.getElementById("quadradinhos-container-pilha");
    quadradinhosContainer.innerHTML = "";

    // Percorre a pilha e preenche com os valores
    for (var i = 0; i < pilha.tamanho(); i++) {
        var quadradinho = document.createElement("div");
        quadradinho.className = "quadradinho-pilha";
        quadradinhosContainer.appendChild(quadradinho);

        var valorQuadradinho = pilha.dados[i];
        if (valorQuadradinho !== -1) {
            var numero = document.createElement("span");
            numero.className = "numero";
            numero.textContent = valorQuadradinho;
            quadradinho.appendChild(numero);
        }
    }
}

function pushParaPilha() {
    var valorInput = document.getElementById("valor3-pilha");
    var valor = valorInput.value;

    if (!valor || isNaN(valor)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    if (valor) {
        // Adicione o valor à pilha
        var sucesso = pilha.push(valor);

        if (sucesso) {
            // Atualize visualmente os quadradinhos com base na pilha
            atualizarQuadradinhosPilha();

            var quadradinhos = document.querySelectorAll(".quadradinho-pilha");

            // Destacar o quadrado correspondente à posição
            var quadradinho = quadradinhos[quadradinhos.length - 1]; // -1 porque as posições da lista começam em 1
            quadradinho.classList.add("destaque2pilha");

            // Remover o destaque após 3 segundos (3000 milissegundos)
            setTimeout(function () {
                quadradinho.classList.remove("destaque2pilha");
            }, 800);

            // Limpe o campo de entrada
            valorInput.value = "";
        } else {
            alert("A pilha está cheia.");
        }
    }
}

function popDaPilha() {
    var valorRemovido = pilha.pop();
    if (valorRemovido !== -1) {
        var quadradinhos = document.querySelectorAll(".quadradinho-pilha");
        var quadradinhoRemovido = quadradinhos[quadradinhos.length - 1]; // Último quadradinho
        
        quadradinhoRemovido.classList.add("remover");

        // Remover o quadradinho após a animação
        setTimeout(function () {
            quadradinhoRemovido.remove();
            atualizarQuadradinhosPilha();
        }, 1000); // Tempo da animação em milissegundos

    } else {
        alert("A pilha está vazia.");
    }
}

function consultarTopoPilha() {
    var topo = pilha.top();
    if (topo !== -1) {
        // Exiba o valor em algum lugar da sua interface (você pode usar um alert ou atualizar um elemento HTML)
        

        var quadradinhos = document.querySelectorAll(".quadradinho-pilha");

            // Destacar o quadrado correspondente à posição
            var quadradinho = quadradinhos[quadradinhos.length - 1]; // -1 porque as posições da lista começam em 1
            quadradinho.classList.add("destaquepilha");

            // Remover o destaque após 3 segundos (3000 milissegundos)
            setTimeout(function () {
                quadradinho.classList.remove("destaque2pilha");
                atualizarQuadradinhosPilha();
            }, 800);

    } else {
        // Pilha vazia
        alert("A pilha está vazia.");
    }
}

// Adicione ouvintes de evento para os botões da interface
document.getElementById("ImagemPilha1").addEventListener("click", pushParaPilha);
document.getElementById("ImagemPilha2").addEventListener("click", popDaPilha);
document.getElementById("ImagemPilha3").addEventListener("click", consultarTopoPilha);
