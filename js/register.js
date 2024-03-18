const formRegister = document.getElementById("registerForm");
const paragrafo = document.createElement("p");
const mensagem = document.getElementById("mensagem");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaConfirmar = document.getElementById("senhaconfirmar");
formRegister.addEventListener("submit", function (coquinho) {
  coquinho.preventDefault();
  validaCampos();
});
function validaCampos() {
  if (nome.value === "" || email.value === "" || senha.value === "" || senhaConfirmar.value === "") {
    paragrafo.innerText = "Todos campos devem ser preenchidos!";
    mensagem.appendChild(paragrafo);
  } else if (senha.value != senhaConfirmar.value) {
    paragrafo.innerText = "As senhas devem conferir";
    mensagem.appendChild(paragrafo);
  } else {
    paragrafo.innerText = "Cadastro Realizado com sucesso!";
    mensagem.appendChild(paragrafo);
    nome.value = "";
    email.value = "";
    senha.value = "";
    senhaConfirmar.value = "";
  }
}
