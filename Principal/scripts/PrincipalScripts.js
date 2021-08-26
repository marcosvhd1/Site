let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".barraLateral");
let pesquisarBtn = document.querySelector(".bx-search");
let BtnJogo = document.querySelector(".NomeJogo");

btn.onclick = function(){
  sidebar.classList.toggle("ativa");
}

pesquisarBtn.onclick = function(){
  sidebar.classList.toggle("ativa");
}

BtnJogo.onclick = function(){
  const TelaDeJogos = document.getElementById("Jogos");
  TelaDeJogos.style.display = "block";
}