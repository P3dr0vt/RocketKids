const formRegister = document.getElementById("registerForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaConfirmar = document.getElementById("senhaconfirmar");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");
formRegister.addEventListener("submit", function (coquinho) {
  coquinho.preventDefault();
  validaCampos();
});

function LimpaCampos() {
  nome.value = "";
  email.value = "";
  senha.value = "";
  senhaConfirmar.value = "";
  checkbox1.checked = false;
  checkbox2.checked = false;
}
function criaMensagem(texto) {
  const paragrafo = document.createElement("p");
  const mensagem = document.getElementById("mensagem");
  paragrafo.innerText = texto;
  mensagem.appendChild(paragrafo);
}
function criaFormObjeto() {
  const formObject = {};
  const campos = formRegister.querySelectorAll("[name]");
  campos.forEach((input) => {
    formObject[input.getAttribute("name")] = input.value;
  });
  return formObject;
}
function criaObjetoJson(formObject) {
  const JsonForm = JSON.stringify(formObject);
  return JsonForm;
}
async function validaCampos() {
  if (nome.value === "" || email.value === "" || senha.value === "" || senhaConfirmar.value === "") {
    criaMensagem("Todos campos devem ser preenchidos!");
  } else if (senha.value !== senhaConfirmar.value) {
    criaMensagem("As senhas devem conferir");
  } else if (!checkbox1.checked) {
    criaMensagem("Você deve concordar com os termos para prosseguir!");
  } else {
    const formObject = criaFormObjeto();
    const JsonForm = criaObjetoJson(formObject);
    const request = await fetch("/php/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JsonForm,
    });
    console.log(JsonForm);
    criaMensagem("Cadastro Realizado com sucesso!");
    LimpaCampos();
    console.log(formObject);
  }
}
