var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contBombas, painelContBombas, velB, tmpCriaBomba;
var bombasTotal;
var vidaPlaneta;

function teclaDw(){
    var tecla=event.keyCode;
    if (tecla==38){//cima
        diryJ=-1;
    }else if (tecla==40){//baixo
        diryJ=1;
    }
    if (tecla==37){//esquerda
        dirxJ=-1;
    }else if (tecla==39){//direita
        dirxJ=1;
    }
    if (tecla==32){//barra espaco / tiro
        atira(pjx+32, pjy);
    }
}

function teclaUp(){
    var tecla=event.keyCode;
    if ((tecla==38) || (tecla==40)){
        diryJ=0;
    }
    if ((tecla==37) || (tecla==39)){//esquerda
        dirxJ=0;
    }
}

function criaBomba(){
    if (jogo){
        var y= tamTelaW.value;
        var x=Math.random()*tamTelaW; //posição da bomba de 0 à largura da tela
        var bomba=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="bomba";
        att2.value="top:"+y+"px; left:"+x+"px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
}

function controlaBomba(){
    bombasTotal=document.getElementsByClassName("bomba");
    var tam=bombasTotal.length;
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){
            var pi=bombasTotal[i].offsetTop;
            pi+=velB;
            bombasTotal[i].style.top=pi+"px";
            if(pi>tamTelaH){
                vidaPlaneta-=10;
                bombasTotal[i].remove();
            }
        }
    }
}

function atira(x,y){
    var t=document.createElement("div");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    att1.value="tiroJog";
    att2.value="top:"+y+"px; left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controleTiros(){
    var tiros=document.getElementsByClassName("tiroJog");
    var tam=tiros.length;
    for(var i=0; i<tam;i++){
        if(tiros[i]){
            var pt=tiros[i].offsetTop; 
            pt-=velT;
            tiros[i].style.top=pt+"px";
            colisaoTiroBomba(tiros[i]);
            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}

function colisaoTiroBomba(tiro){
    var tam=bombasTotal.length;
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){ 
            if(
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+37))&& //tiro com parte de baixo da bomba
                    ((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) //tipo com parte de cima da bomba
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+23))&& //Esquerda do tiro com a parte direita da bomba
                    ((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) //Direita do tiro com a parte esquerda da bomba
                )
            ){
                bombasTotal[i].remove();
                tiro.remove(); 
            }
        }
    }
}


function controlaJogador(){
    pjy+=diryJ*velJ;
    pjx+=dirxJ*velJ;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
}

function gameLoop(){
    if(jogo){
        //Funções de controle
        controlaJogador();
        controleTiros();
        controlaBomba();
    }
    frames=requestAnimationFrame(gameLoop);
}

function inicia(){
    jogo=true;

    //Inicia Tela
    tamTelaH=window.innerHeight;
    tamTelaW=window.innerWidth;

    //Inicia Jogador
    dirxJ=diryJ=0;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    velJ=velT=6;
    jog=document.getElementById("naveJog");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";

    //Controle das bombas
    clearInterval(tmpCriaBomba); //limpa o intervalo
    contBombas=150;
    velB=1.4;
    tmpCriaBomba=setInterval(criaBomba, 1900);

    //Controle do Planeta
    vidaPlaneta=200;

    gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);

