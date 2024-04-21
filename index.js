const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: {vida: 100}, // Vida Herói
            vilao: {vida: 100}, //Vida Vilão
            vidaVilaoInicial: 100, //Variável para armazenar a vida do vilão antes do ataque
        }
    },
    methods: {
        atacar(isHeroi) { //Função de ataque
            if(isHeroi) { //If para determinar se a ação surgiu do herói ou do vilão (baseado no botão do Html ou a Ação Aleátoria do Vilão)
                vidaVilaoInicial = this.vilao.vida; //Captura o quanto de vida o vilão tem no início da rodada
                this.vilao.vida -= 10; //Reduz a vida do vilão
                alert("Herói atacou");
                    if(this.vilao.vida <=0){ //If para determinar se a vida do vilão zerou e se a luta já terminou
                        alert("O Herói venceu!")
                        this.heroi.vida =100; //Reseta os status atuais do início do jogo
                        this.vilao.vida =100;
                        vidaVilaoInicial = 100;
                    }else{
                        this.acaoVilao(); //Se o vilão não estiver morto ele tem sua ação chamada
                    }
            } else {
                this.heroi.vida -= 20; //Reduz a vida do herói
                alert("Vilão atacou");
                    if(this.heroi.vida <=0){  //If para determinar se a vida do herói zerou e se a luta já terminou
                        alert("O vilão venceu!")
                        this.heroi.vida =100; //Reseta os status atuais do início do jogo
                        this.vilao.vida =100;
                        vidaVilaoInicial = 100;
                    }
            }
        },
        defender(isHeroi) {
            if(isHeroi){ //If para determinar se a ação surgiu do herói ou do vilão (baseado no botão do Html ou a Ação Aleátoria do Vilão)
                const defendeuHeroi = Math.random(); //Math.random para gerar um número entre 0 e 1 e criar probabilidade
                if(defendeuHeroi < 0.5){ //If que da ao herói a chance de 50% de uma defesa bem sucedida
                    alert("Herói defendeu!");
                    vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
                }else{
                    this.acaoVilao();
                    alert("Vilão quebrou a defesa do Herói");
                    vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
                }
            }else{
                const defendeuVilao = Math.random(); //Math.random para gerar um número entre 0 e 1 e criar probabilidade
                if(defendeuVilao < 0.5){ //If que da ao vilão a chance de 50% de uma defesa bem sucedida
                    alert("Vilão defendeu!");
                    this.vilao.vida = vidaVilaoInicial; //Retorna a vida capturada anteriormente, para que o vilão tenha se defendido do ataque
                }else{
                    alert("Vilão teve a defesa quebrada pelo Herói")
                    vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
                }
            }
        },
        pocao(isHeroi) {
            if(isHeroi){ //If para determinar se a ação surgiu do herói ou do vilão (baseado no botão do Html ou a Ação Aleátoria do Vilão)
                this.heroi.vida +=30; //Cura a vida do herói
                alert("Herói usou poção")
                if(this.heroi.vida > 100){ //Limita a vida do herói a 100
                    this.heroi.vida = 100;
                }
                this.acaoVilao();
            }else{
                this.vilao.vida +=50; //Cura a vida do vilão
                alert("Vilão usou poção")
                if(this.vilao.vida > 100){ //Limita a vida do vilão a 100
                    this.vilao.vida = 100;
                }
            }
            vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
        },
        correr(isHeroi) {
            if(isHeroi){ //If para determinar se a ação surgiu do herói ou do vilão (baseado no botão do Html ou a Ação Aleátoria do Vilão)
                const correuHeroi = Math.random(); //Math.random para gerar um número entre 0 e 1 e criar probabilidade
                if(correuHeroi < 0.25){ //If que da ao herói a chance de 25% de uma fuga bem sucedida
                    alert("O herói fugiu!");
                    alert("A luta terminou!");
                    this.heroi.vida =100; //Reseta os status atuais do início do jogo
                    this.vilao.vida =100;
                    vidaVilaoInicial = 100;
                }else{
                    alert("O vilão impediu que o herói fugisse!");
                    this.acaoVilao();
                    vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
                }
            }else{
                const correuVilao = Math.random(); //Math.random para gerar um número entre 0 e 1 e criar probabilidade
                if(correuVilao < 0.25){ //If que da ao vilão a chance de 25% de uma fuga bem sucedida
                    alert("O vilão fugiu!");
                    alert("A luta terminou!");
                    this.heroi.vida = 100; //Reseta os status atuais do início do jogo
                    this.vilao.vida = 100;
                    vidaVilaoInicial = 100;
                } else{
                    alert("O vilão tentou fugir");
                    vidaVilaoInicial = this.vilao.vida; //Mantem atualizado o status atual da vida do vilão evitando curas por meio da defesa
                }
            }
        },
        acaoVilao() { //Método para gerar uma ação aleatória para o vilão
            const acoes = ['atacar','defender', 'pocao', 'correr']; //declaração das ações
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)]; 
            this[acaoAleatoria](false); //Passa a ação determinada pelo math.random como função utilizando o parâmtro false para a ação não ser executada pelo herói
        }
    }
}).mount("#app");