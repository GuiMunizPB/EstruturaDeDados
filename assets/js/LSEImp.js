var lse = new LSE();

     // Função para atualizar os quadradinhos com base na lista
     function atualizarQuadradinhos2() {
            var quadradinhosContainer = document.getElementById("quadradinhos-container-lse");
            quadradinhosContainer.innerHTML = "";

            // Percorre os quadradinhos e preenche com os valores da lista
            for (var i = 0; i < lse.nElementos; i++) {
                    var quadradinho = document.createElement("div");
                    quadradinho.className = "quadradinholse";
                    quadradinhosContainer.appendChild(quadradinho);

                    // Adicione uma seta entre os quadradinhos, exceto no último
                    if (i !== lse.nElementos - 1) {
                        var seta2 = document.createElement("div");
                        seta2.className = "fas fa-arrow-right seta2";
                        quadradinhosContainer.appendChild(seta2);
                    }

                    var valorQuadradinho = lse.elemento(i + 1); // +1 porque as posições da lista começam em 1
                    if (valorQuadradinho !== false) {
                        var numero = document.createElement("span");
                        numero.className = "numero";
                        numero.textContent = valorQuadradinho;
                        quadradinho.appendChild(numero);
                    }
                }
     
}

 function verificarCamposPreenchidosAdicao2() {
          var valor = document.getElementById("valor-lse").value;
          var posicao = document.getElementById("posicao-lse").value;

          if (valor && posicao && !isNaN(valor) && !isNaN(posicao)) {
              // Se ambos os campos foram preenchidos, torne a imagem clicável
              document.getElementById("imagemsLSE1").addEventListener("click", realizarOperacaoAdicao2);
   

          }else{
            // Se algum dos campos estiver vazio, remova o evento de clique da imagem
            document.getElementById("imagemLDE1").removeEventListener("click", realizarOperacaoAdicao1);
                  
          }
          
      }

      function realizarOperacaoAdicao2() {
            var valorInput = document.getElementById("valor-lse");
            var posicaoInput = document.getElementById("posicao-lse");

            var valor = valorInput.value;
            var posicao = parseInt(posicaoInput.value);

            if (!valor || !posicao || isNaN(valor) || isNaN(posicao)) {
                alert("Preencha os campos corretamente antes de clicar na imagem.");
                return; // Encerrar a função se os campos não estiverem preenchidos corretamente
            }


            var sucesso = lse.insere(posicao, valor);

            if (sucesso) {
                // Atualiza visualmente os quadradinhos com base na lista
                alert("Inserido com sucesso");
                atualizarQuadradinhos2();

                // Seleciona o contêiner de quadradinhos
                var quadradinhosContainer = document.getElementById("quadradinhos-container-lse");

                // Remove todos os quadradinhos existentes
                quadradinhosContainer.innerHTML = "";


                // Crie um número específico de quadradinhos com base no tamanho da lista
                for (var i = 0; i < lse.nElementos; i++) {
                    var quadradinho = document.createElement("div");
                    quadradinho.className = "quadradinholse";
                    quadradinhosContainer.appendChild(quadradinho);

                    // Adicione uma seta entre os quadradinhos, exceto no último
                    if (i !== lse.nElementos- 1) {
                    var seta2 = document.createElement("div");
                    seta2.className = "fas fa-arrow-right seta2";
                    quadradinhosContainer.appendChild(seta2);
                    }

                    var valorQuadradinho = lse.elemento(i + 1); // +1 porque as posições da lista começam em 1
                    if (valorQuadradinho !== false) {
                        var numero = document.createElement("span");
                        numero.className = "numero";
                        numero.textContent = valorQuadradinho;
                        quadradinho.appendChild(numero);
                    }
                }

                // Seleciona todos os quadradinhos
                var quadradinhos = document.querySelectorAll(".quadradinholse");

                // Verifica se a posição é válida
                if (posicao > 0 && posicao <= quadradinhos.length) {
                    // Destaca o quadrado correspondente à posição
                    var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1

                    // Verifica se o elemento foi encontrado
                    if (quadradinho) {
                        quadradinho.classList.add("destaquelse2");

                        // Remove o destaque após 1,5 segundos (1500 milissegundos)
                        setTimeout(function () {
                            quadradinho.classList.remove("destaquelse2");
                        }, 1500);
                    } else {
                        console.error("Elemento não encontrado para a posição", posicao);
                    }
                } else {
                    console.error("Posição inválida:", posicao);
                }

                // Limpa os campos de entrada após a adição
                valorInput.value= "";
                posicaoInput.value = "";
                
            } else {
                alert("Não foi possível inserir");
                valorInput.value= "";
                posicaoInput.value = "";
            
            }
}



  // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
  document.getElementById("valor-lse").addEventListener("input", verificarCamposPreenchidosAdicao2);
  document.getElementById("posicao-lse").addEventListener("input", verificarCamposPreenchidosAdicao2);

  function verificarCamposPreenchidosRemocao2() {
      var posicao = document.getElementById("posicao2-lse").value;

      if (posicao) {
          // Se ambos os campos foram preenchidos, torne a imagem clicável
          document.getElementById("imagemsLSE2").addEventListener("click", realizarOperacaoRemocao2);
      } else {
          // Se algum dos campos estiver vazio, remova o evento de clique da imagem
          //document.getElementById("valor-lse").value = "";
          //document.getElementById("posicao-lse").value = "";
          document.getElementById("imagemsLSE2").removeEventListener("click", realizarOperacaoRemocao2);
      }
  }

  function realizarOperacaoRemocao2() {
          posicao = parseInt(document.getElementById("posicao2-lse").value);
          var sucesso = lse.remove(posicao);
          if(sucesso){
                alert("Removido com sucesso");
                  atualizarQuadradinhos2()
                  // Insira o valor no quadradinho correspondente à posição
                  
                  var quadradinhos = document.querySelectorAll(".quadradinholse");
                  
                  // Destacar o quadrado correspondente à posição
                  var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                  quadradinho.classList.add("destaquelse3");
                  
                  // Remover o destaque após 3 segundos (3000 milissegundos)
                  setTimeout(function () {
                      quadradinho.classList.remove("destaquelse3");
                  }, 1500);
                  valorInput.value= "";
                    posicaoInput.value = "";
                    document.getElementById("posicao2-lse").value = "";
          }
          else{
              alert("Não foi possível remover")
          }
      }

  // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
  document.getElementById("posicao2-lse").addEventListener("input", verificarCamposPreenchidosRemocao2);

  function verificarCamposPreenchidosBuscaPorValor2() {
      var valor = document.getElementById("valor3-lse").value;
      
      if (valor) {
          document.getElementById("imagemsLSE3").addEventListener("click", realizarOperacaoBuscaPorValor2);
          
          
       } else {
            // Remove o evento se o campo não estiver preenchido
          document.getElementById("valor3-lse").value = "";
          document.getElementById("imagemsLS3").removeEventListener("click", realizarOperacaoBuscaPorValor2);
        }

     }

  function verificarCamposPreenchidosBuscaPorPosicao2() {
      var valor = document.getElementById("posicao3-lse").value;
      
      if (valor) {
          document.getElementById("imagemsLSE3").addEventListener("click", realizarOperacaoBuscaPorPosicao2);
          
       } else {
            // Remove o evento se o campo não estiver preenchido
          document.getElementById("valor3-lse").value = "";
          document.getElementById("imagemsLSE3").removeEventListener("click", realizarOperacaoBuscaPorPosicao2);
        }

     }

     function realizarOperacaoBuscaPorPosicao2() {
      var posicao = document.getElementById("posicao3-lse").value;
      var sucesso = lse.elemento(posicao);
      
      var quadradinhos = document.querySelectorAll(".quadradinholse");
      
      if (sucesso !== false) {
        //   Destacar o quadradinho correspondente à posição
          var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
          quadradinho.classList.add("destaquelse");
          
          // Remover o destaque após 1 segundo (1000 milissegundos)
          setTimeout(function () {
              quadradinho.classList.remove("destaquelse");
          }, 1500);
          
          alert("O valor da posição procurada é: " + sucesso);
      } else {
          alert("Posição não encontrada.");
      }
      
      document.getElementById("posicao3-lse").value = "";
      document.getElementById("imagemsLSE3").removeEventListener("click", realizarOperacaoBuscaPorPosicao2);
  }
   // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles

  document.getElementById("posicao3-lse").addEventListener("input", verificarCamposPreenchidosBuscaPorPosicao2);

     function realizarOperacaoBuscaPorValor2() {
          var valor = document.getElementById("valor3-lse").value;
          var sucesso = lse.posicao(valor);
          
          var quadradinhos = document.querySelectorAll(".quadradinholse");
          
          if (sucesso !== false) {
              // Destacar o quadradinho correspondente à posição
              var quadradinho = quadradinhos[sucesso - 1]; // -1 porque as posições da lista começam em 1
              quadradinho.classList.add("destaquelse");
              
              // Remover o destaque após 3 segundos (3000 milissegundos)
              setTimeout(function () {
                  quadradinho.classList.remove("destaquelse");
              }, 1500);
              
              alert("A posição do valor procurado é: " + sucesso);
          } else {
              alert("Valor não encontrado.");
          }
          
          document.getElementById("valor3-lse").value = "";
          document.getElementById("imagemsLSE3").removeEventListener("click", realizarOperacaoBuscaPorValor2);
      }

      document.getElementById("valor3-lse").addEventListener("input", verificarCamposPreenchidosBuscaPorValor2);
     
