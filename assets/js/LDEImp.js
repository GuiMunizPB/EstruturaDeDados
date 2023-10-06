var lde = new LDE();


      // Função para atualizar os quadradinhos com base na lista
      function atualizarQuadradinhos1() {
         
          var quadradinhosContainer = document.getElementById("quadradinhos-container-lde");
          quadradinhosContainer.innerHTML = "";

          

          // Percorre os quadradinhos e preenche com os valores da lista
          for (var i = 0; i < lde.tamanho; i++) {
              var valor = lde.elemento(i + 1); // +1 porque as posições da lista começam em 1
              var quadradinho = document.createElement("div");
              quadradinho.className = "quadradinholde";
              quadradinhosContainer.appendChild(quadradinho);
              if(i != lde.tamanho - 1) {
              var seta = document.createElement("div");
              seta.className = "fas fa-exchange-alt seta";
              quadradinhosContainer.appendChild(seta);
              }

            
            
              if (valor !== false) {
                  var numero = document.createElement("span");
                  numero.className = "numero";
                  numero.textContent = valor;
                  quadradinho.appendChild(numero);
              }
          }
       
      }




      //Função de Inserção
      function verificarCamposPreenchidosAdicao1() {
              var valor = document.getElementById("valor-lde").value;
              var posicao = document.getElementById("posicao-lde").value;

              if (valor && posicao && !isNaN(valor) && !isNaN(posicao)) {
                  // Se ambos os campos foram preenchidos, torne a imagem clicável
                  document.getElementById("imagemLDE1").addEventListener("click", realizarOperacaoAdicao1);
           
                    
              } else {
                  // Se algum dos campos estiver vazio, remova o evento de clique da imagem
                  document.getElementById("imagemLDE1").removeEventListener("click", realizarOperacaoAdicao1);
                  
              }
              
          }

       // Função a ser executada quando a imagem for clicada
       // Função a ser executada quando a imagem for clicada para adicionar um valor
      function realizarOperacaoAdicao1() {
          var valorInput = document.getElementById("valor-lde");
          var posicaoInput = document.getElementById("posicao-lde");

          var valor = valorInput.value;
          var posicao = parseInt(posicaoInput.value);


          var sucesso = lde.insere(posicao, valor);
             if (sucesso ) {
                  alert("Inserido com sucesso");
                  atualizarQuadradinhos1()

                  // Insira o valor no quadradinho correspondente à posição
                  
                  var quadradinhos = document.querySelectorAll(".quadradinholde");
                  
                  // Destacar o quadrado correspondente à posição
                  var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                  quadradinho.classList.add("destaquelde2");
                  
                  // Remover o destaque após 3 segundos (3000 milissegundos)
                  setTimeout(function () {
                      quadradinho.classList.remove("destaquelde2");
                  }, 1500);
                  valorInput.value= "";
                    posicaoInput.value = "";
            

                  // Limpe os campos de entrada após a adição
                } else {
                    alert("Não foi possível inserir");
                   
                            }
               
            }


      // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
      document.getElementById("valor-lde").addEventListener("input", verificarCamposPreenchidosAdicao1);
      document.getElementById("posicao-lde").addEventListener("input", verificarCamposPreenchidosAdicao1);

  
          

      //Função de Remoção
      function verificarCamposPreenchidosRemocao1() {
          var posicao = document.getElementById("posicao2-lde").value;

          if (posicao) {
              // Se ambos os campos foram preenchidos, torne a imagem clicável
              document.getElementById("imagemLDE2").addEventListener("click", realizarOperacaoRemocao1);
          } else {
              // Se algum dos campos estiver vazio, remova o evento de clique da imagem
              document.getElementById("imagemLDE2").removeEventListener("click", realizarOperacaoRemocao1);

          }
      }

      // Função a ser executada quando a imagem for clicada
      function realizarOperacaoRemocao1() {
          posicao = parseInt(document.getElementById("posicao2-lde").value);
          var sucesso = lde.remove(posicao);
          if(sucesso){
                alert("Removido com sucesso");
                  atualizarQuadradinhos1()
                  // Insira o valor no quadradinho correspondente à posição
                  
                  var quadradinhos = document.querySelectorAll(".quadradinholde");
                  
                  // Destacar o quadrado correspondente à posição
                  var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                  quadradinho.classList.add("destaquelde3");
                  
                  // Remover o destaque após 3 segundos (3000 milissegundos)
                  setTimeout(function () {
                      quadradinho.classList.remove("destaquelde3");
                  }, 1500);
                  valorInput.value= "";
                    posicaoInput.value = "";
                    document.getElementById("posicao2-lde").value = "";
          }
          else{
              alert("Não foi possível remover")
          }
      }

      // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
      document.getElementById("posicao2-lde").addEventListener("input", verificarCamposPreenchidosRemocao1);

       // Funções de Busca


    function verificarCamposPreenchidosBuscaPorValor1() {
      var valor = document.getElementById("valor3-lde").value;
      
      if (valor) {
          document.getElementById("imagemLDE3").addEventListener("click", realizarOperacaoBuscaPorValor1);
          
          
       } else {
            // Remove o evento se o campo não estiver preenchido
          document.getElementById("valor3-lde").value = "";
          document.getElementById("imagemLDE3").removeEventListener("click", realizarOperacaoBuscaPorValor1);
        }

     }

  function verificarCamposPreenchidosBuscaPorPosicao1() {
      var valor = document.getElementById("posicao3-lde").value;
      
      if (valor) {
          document.getElementById("imagemLDE3").addEventListener("click", realizarOperacaoBuscaPorPosicao1);
          
       } else {
            // Remove o evento se o campo não estiver preenchido
          document.getElementById("posicao3-lde").value = "";
          document.getElementById("imagemLDE3").removeEventListener("click", realizarOperacaoBuscaPorPosicao1);
        }

     }

     function realizarOperacaoBuscaPorPosicao1() {
      var posicao = document.getElementById("posicao3-lde").value;
      var sucesso = lde.elemento(posicao);
      
      var quadradinhos = document.querySelectorAll(".quadradinholde");
      
      if (sucesso) {
        //   Destacar o quadradinho correspondente à posição
          var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
          quadradinho.classList.add("destaquelde");
          
          // Remover o destaque após 1 segundo (1000 milissegundos)
          setTimeout(function () {
              quadradinho.classList.remove("destaquelde");
          }, 1500);
          
          alert("O valor da posição procurada é: " + sucesso);
      } else {
          alert("Posição não encontrada.");
      }
      
      document.getElementById("posicao3-lde").value = "";
      document.getElementById("imagemLDE3").removeEventListener("click", realizarOperacaoBuscaPorPosicao1);
  }
   // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles

  document.getElementById("posicao3-lde").addEventListener("input", verificarCamposPreenchidosBuscaPorPosicao1);

     function realizarOperacaoBuscaPorValor1() {
          var valor = document.getElementById("valor3-lde").value;
          var sucesso = lde.posicao(valor);
          
          var quadradinhos = document.querySelectorAll(".quadradinholde");
          
          if (sucesso) {
              // Destacar o quadradinho correspondente à posição
              var quadradinho = quadradinhos[sucesso - 1]; // -1 porque as posições da lista começam em 1
              quadradinho.classList.add("destaquelde");
              
              // Remover o destaque após 3 segundos (3000 milissegundos)
              setTimeout(function () {
                  quadradinho.classList.remove("destaquelde");
              }, 1500);
              
              alert("A posição do valor procurado é: " + sucesso);
          } else {
              alert("Valor não encontrado.");
          }
          
          document.getElementById("valor3-lde").value = "";
          document.getElementById("imagemLDE3").removeEventListener("click", realizarOperacaoBuscaPorValor1);
      }

      document.getElementById("valor3-lde").addEventListener("input", verificarCamposPreenchidosBuscaPorValor1);
     

       
      
     