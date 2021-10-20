let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".barraLateral");
let pesquisarBtn = document.querySelector(".bx-search");
let BtnJogo = document.querySelector(".BtnJogo");
let BtnDashboard = document.querySelector(".BtnDashboard");

const TelaDeJogos = document.getElementById("Jogos");
const TelaPrincipal = document.getElementById("Dashboard");

btn.onclick = function(){
  sidebar.classList.toggle("ativa");
}

pesquisarBtn.onclick = function(){
  sidebar.classList.toggle("ativa");
}

BtnJogo.onclick = function(){
  TelaDeJogos.style.display = "block";
  TelaPrincipal.style.display = "none";
}

BtnDashboard.onclick = function(){
  TelaPrincipal.style.display = "block";
  TelaDeJogos.style.display = "none";
}