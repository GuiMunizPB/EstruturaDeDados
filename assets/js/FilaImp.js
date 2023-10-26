var fila = new Fila();

// Função para atualizar os quadradinhos com base na pilha
function atualizarQuadradinhosFila() {
    var quadradinhosContainer = document.getElementById("quadradinhos-container-fila");
    quadradinhosContainer.innerHTML = "";

    for (var i = fila.inicio; i < fila.inicio + fila.nElementos; i++) {
        var quadradinho = document.createElement("div");
        quadradinho.className = "quadradinho-fila";
        quadradinhosContainer.appendChild(quadradinho);

        var valorQuadradinho = fila.dados[i % fila.dados.length];
        if (valorQuadradinho !== -1) {
            var numero = document.createElement("span");
            numero.className = "numero";
            numero.textContent = valorQuadradinho;
            quadradinho.appendChild(numero);
        }
    }
}


function insereNaFila() {
    var valorInput = document.getElementById("valor3-fila");
    var valor = valorInput.value;

    if (!valor || isNaN(valor)) {
        alert("Preencha os campos corretamente (valor numérico)");
        return; // Encerrar a função se os campos não estiverem preenchidos corretamente
    }

    if (valor) {
        // Adicione o valor à fila
        var sucesso = fila.insere(valor);

        if (sucesso) {
            // Atualize visualmente os quadradinhos com base na fila
            atualizarQuadradinhosFila();

            var quadradinhos = document.querySelectorAll(".quadradinho-fila");

            // Destacar o quadrado correspondente à posição
            var quadradinho = quadradinhos[quadradinhos.length - 1]; // -1 porque as posições da lista começam em 1
            quadradinho.classList.add("destaque2fila");

            // Remover o destaque após 3 segundos (3000 milissegundos)
            setTimeout(function () {
                quadradinho.classList.remove("destaque2fila");
            }, 800);

            // Limpe o campo de entrada
            valorInput.value = "";
        } else {
            alert("A fila está cheia.");
        }
    }
}

function removeDaFila() {
    var valorRemovido = fila.remove();
    if (valorRemovido !== -1) {
        var quadradinhos = document.querySelectorAll(".quadradinho-fila");
        
        if (quadradinhos.length > 0) {
            var quadradinhoRemovido = quadradinhos[0]; // Pegue o primeiro quadradinho (o que será removido)
            
            quadradinhoRemovido.classList.add("remover-fila");

            // Remover o quadradinho após a animação
            setTimeout(function () {
                quadradinhoRemovido.remove();
                atualizarQuadradinhosFila();
            }, 1000); // Tempo da animação em milissegundos
        }
    } else {
        alert("A fila está vazia.");
    }
}

function primeiroDaFila() {
    var inicio = fila.primeiro();
    if (inicio !== -1) {
        // Exiba o valor em algum lugar da sua interface (você pode usar um alert ou atualizar um elemento HTML)

        var quadradinhos = document.querySelectorAll(".quadradinho-fila");

        // Destacar o primeiro quadrado
        var quadradinho = quadradinhos[0]; // Primeiro quadradinho
        quadradinho.classList.add("destaquefila");

        // Remover o destaque após 3 segundos (3000 milissegundos)
        setTimeout(function () {
            quadradinho.classList.remove("destaquefila");
            atualizarQuadradinhosFila();
        }, 800);

    } else {
        // fila vazia
        alert("A fila está vazia.");
    }
}

// Adicione ouvintes de evento para os botões da interface
document.getElementById("ImagemFilha1").addEventListener("click", insereNaFila);
document.getElementById("ImagemFilha2").addEventListener("click", removeDaFila);
document.getElementById("ImagemFilha3").addEventListener("click", primeiroDaFila);
