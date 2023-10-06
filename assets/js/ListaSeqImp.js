var lista = new ListaSeq();

            function alterarTamanhoLista() {
            
            const tamanho = parseInt(document.getElementById("tamanhoLista").value);

          
      
            if (!isNaN(tamanho) && tamanho >= 1) {
                 // Remova os quadradinhos existentes, se houver algum
                var quadradinhosContainer = document.getElementById("quadradinhos-container");
                quadradinhosContainer.innerHTML = "";

                
                
                // Crie um número específico de quadradinhos com base no tamanho
                for (var i = 0; i < tamanho; i++) {
                    var quadradinho = document.createElement("div");
                    quadradinho.className = "quadradinho";
                    quadradinhosContainer.appendChild(quadradinho);
                }
            
                          
            
               lista = new ListaSeq(tamanho); 
               alert("Tamanho da lista alterado para " + tamanho);
            
            
            
            
            
            
            }else if (!isNaN(tamanho) && tamanho === 0){
                var quadradinhosContainer = document.getElementById("quadradinhos-container");
                quadradinhosContainer.innerHTML = "";

                
                // Crie um número específico de quadradinhos com base no tamanho
                for (var i = 0; i < tamanho + 100; i++) {
                    var quadradinho = document.createElement("div");
                    quadradinho.className = "quadradinho";
                    quadradinhosContainer.appendChild(quadradinho);
                }
               
            
                
                lista = new ListaSeq(tamanho + 100);
            }

            else {

                alert("Insira um tamanho válido");
            }
            
            atualizarQuadradinhos();
            }

      

            // Função para atualizar os quadradinhos com base na lista
            function atualizarQuadradinhos() {
                var quadradinhos = document.querySelectorAll(".quadradinho");

               

               

                // Percorre os quadradinhos e preenche com os valores da lista
                for (var i = 0; i < quadradinhos.length; i++) {
                    var valor = lista.elemento(i + 1); // +1 porque as posições da lista começam em 1

                    while (quadradinhos[i].firstChild) {
                        quadradinhos[i].removeChild(quadradinhos[i].firstChild);
                    }
                   

                   

                    if (valor !== false) {
                        var numero = document.createElement("span");
                        numero.className = "numero";
                        numero.textContent = valor;
                        quadradinhos[i].appendChild(numero);
                    }
                }
                atualizarQuadradinhos1()
            
            }




            //Função de Inserção
            function verificarCamposPreenchidosAdicao() {
                    var valor = document.getElementById("valor").value;
                    var posicao = document.getElementById("posicao").value;

                    if (valor && posicao && !isNaN(valor) && !isNaN(posicao)) {
                        // Se ambos os campos foram preenchidos, torne a imagem clicável
                        document.getElementById("minhaImagem").addEventListener("click", realizarOperacaoAdicao);
                    
                        
                    } else {
                        // Se algum dos campos estiver vazio, remova o evento de clique da imagem
                        document.getElementById("minhaImagem").removeEventListener("click", realizarOperacaoAdicao);
                      
                    }
                }

             // Função a ser executada quando a imagem for clicada
             // Função a ser executada quando a imagem for clicada para adicionar um valor
            function realizarOperacaoAdicao() {
                var valorInput = document.getElementById("valor");
                var posicaoInput = document.getElementById("posicao");

                var valor = valorInput.value;
                var posicao = parseInt(posicaoInput.value);

                var sucesso = lista.insere(posicao, valor);
                   if (sucesso) {
                        alert("Inserido com sucesso");

                        // Insira o valor no quadradinho correspondente à posição
                        atualizarQuadradinhos()

                        var quadradinhos = document.querySelectorAll(".quadradinho");

                        // Destacar o quadrado correspondente à posição
                        var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                        quadradinho.classList.add("destaque2");

                        // Remover o destaque após 3 segundos (3000 milissegundos)
                        setTimeout(function () {
                            quadradinho.classList.remove("destaque2");
                        }, 1500);

                        // Limpe os campos de entrada após a adição
                        valorInput.value= "";
                        posicaoInput.value = "";
                       
                    } else {
                        alert("Não foi possível inserir");
                        valorInput.value= "";
                        posicaoInput.value = "";
                       
                    }
                }


            // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
            document.getElementById("valor").addEventListener("input", verificarCamposPreenchidosAdicao);
            document.getElementById("posicao").addEventListener("input", verificarCamposPreenchidosAdicao);

        
                

            //Função de Remoção
            function verificarCamposPreenchidosRemocao() {
                var posicao = document.getElementById("posicao2").value;

                if (posicao) {
                    // Se ambos os campos foram preenchidos, torne a imagem clicável
                    document.getElementById("minhaImagem2").addEventListener("click", realizarOperacaoRemocao);
                } else {
                    // Se algum dos campos estiver vazio, remova o evento de clique da imagem
                    document.getElementById("posicao2").value = "";
                    document.getElementById("minhaImagem2").removeEventListener("click", realizarOperacaoRemocao);
                }
            }

            // Função a ser executada quando a imagem for clicada
            function realizarOperacaoRemocao() {
                var posicao = document.getElementById("posicao2").value;
                var sucesso = lista.remove(document.getElementById("posicao2").value);
                if(sucesso){
                    var quadradinhos = document.querySelectorAll(".quadradinho");

                    // Destacar o quadrado correspondente à posição
                    var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                    quadradinho.classList.add("destaque3");

                    // Remover o destaque após 3 segundos (3000 milissegundos)
                    setTimeout(function () {
                        quadradinho.classList.remove("destaque3");
                    }, 1500);
                    document.getElementById("posicao2").value = "";
                    atualizarQuadradinhos()
                    alert("removido com sucesso");

                }
                else{
                    alert("Não foi possível remover")
                }
            }

            // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
            document.getElementById("posicao2").addEventListener("input", verificarCamposPreenchidosRemocao);




            // Funções de Busca
            function verificarCamposPreenchidosBuscaPorValor() {
                var valor = document.getElementById("valor3").value;
                
                if (valor) {
                    document.getElementById("minhaImagem3").addEventListener("click", realizarOperacaoBuscaPorValor);
                    
                    
                 } else {
                      // Remove o evento se o campo não estiver preenchido
                    document.getElementById("valor3").value = "";
                    document.getElementById("minhaImagem3").removeEventListener("click", realizarOperacaoBuscaPorValor);
                  }

               }

            function verificarCamposPreenchidosBuscaPorPosicao() {
                var valor = document.getElementById("posicao3").value;
                
                if (valor) {
                    document.getElementById("minhaImagem3").addEventListener("click", realizarOperacaoBuscaPorPosicao);
                    
                 } else {
                      // Remove o evento se o campo não estiver preenchido
                    document.getElementById("valor3").value = "";
                    document.getElementById("minhaImagem3").removeEventListener("click", realizarOperacaoBuscaPorPosicao);
                  }

               }

               // Função a ser executada quando a imagem for clicada para buscar por valor
               function realizarOperacaoBuscaPorValor() {
                    var valor = document.getElementById("valor3").value;
                    var sucesso = lista.posicao(valor);
                    
                    var quadradinhos = document.querySelectorAll(".quadradinho");
                    
                    if (sucesso !== false) {
                        // Destacar o quadradinho correspondente à posição
                        var quadradinho = quadradinhos[sucesso - 1]; // -1 porque as posições da lista começam em 1
                        quadradinho.classList.add("destaque");
                        
                        // Remover o destaque após 3 segundos (3000 milissegundos)
                        setTimeout(function () {
                            quadradinho.classList.remove("destaque");
                        }, 1500);
                        
                        alert("A posição do valor procurado é: " + sucesso);
                    } else {
                        alert("Valor não encontrado.");
                    }
                    
                    document.getElementById("valor3").value = "";
                    document.getElementById("minhaImagem3").removeEventListener("click", realizarOperacaoBuscaPorValor);
                }


              // Função a ser executada quando a imagem for clicada para buscar por posição
              function realizarOperacaoBuscaPorPosicao() {
                var posicao = document.getElementById("posicao3").value;
                var sucesso = lista.elemento(posicao);
                
                var quadradinhos = document.querySelectorAll(".quadradinho");
                
                if (sucesso !== false) {
                    // Destacar o quadradinho correspondente à posição
                    var quadradinho = quadradinhos[posicao - 1]; // -1 porque as posições da lista começam em 1
                    quadradinho.classList.add("destaque");
                    
                    // Remover o destaque após 1 segundo (1000 milissegundos)
                    setTimeout(function () {
                        quadradinho.classList.remove("destaque");
                    }, 1500);
                    
                    alert("O valor da posição procurada é: " + sucesso);
                } else {
                    alert("Posição não encontrada.");
                }
                
                document.getElementById("posicao3").value = "";
                document.getElementById("minhaImagem3").removeEventListener("click", realizarOperacaoBuscaPorPosicao);
            }
             // Adicione um ouvinte de evento para verificar os campos sempre que houver uma alteração neles
            document.getElementById("valor3").addEventListener("input", verificarCamposPreenchidosBuscaPorValor);
            document.getElementById("posicao3").addEventListener("input", verificarCamposPreenchidosBuscaPorPosicao);
            
              






            function mostrarConceito(conceitoId) {
            // Oculta todos os conceitos
            var conceitos = document.querySelectorAll(".conceito");
            for (var i = 0; i < conceitos.length; i++) {
                conceitos[i].style.display = "none";
            }

            // Mostra o conceito correspondente ao ID clicado
            var conceito = document.getElementById(conceitoId);
            if (conceito) {
                conceito.style.display = "block";
            } else {
                console.error("Elemento não encontrado para o ID: " + conceitoId);
            }

            // Atualiza os quadradinhos quando a aba é trocada
            atualizarQuadradinhos();
            atualizarQuadradinhos1();
            atualizarQuadradinhos2();
        }
