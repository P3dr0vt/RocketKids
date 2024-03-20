const formRegister = $("#registerForm");
const nome = $("#nome");
const email = $("#email");
const senha = $("#senha");
const senhaConfirmar = $("#senhaconfirmar");
const checkbox1 = $("#checkbox1");
const checkbox2 = $("#checkbox2");

formRegister.on("submit", function (coquinho) {
  coquinho.preventDefault();
  validaCampos();
});

function LimpaCampos() {
  nome.val("");
  email.val("");
  senha.val("");
  senhaConfirmar.val("");
  checkbox1.prop("checked", false);
  checkbox2.prop("checked", false);
}

function criaMensagem(texto) {
  $("#mensagem").text(texto);
}

function criaFormObjeto() {
  const formObject = {};
  const campos = formRegister.find("[name]");
  campos.each(function () {
    formObject[$(this).attr("name")] = $(this).val();
  });
  return formObject;
}

function criaObjetoJson(formObject) {
  const JsonForm = JSON.stringify(formObject);
  return JsonForm;
}

function validaCampos() {
  if (nome.val() === "" || email.val() === "" || senha.val() === "" || senhaConfirmar.val() === "") {
    criaMensagem("Todos campos devem ser preenchidos!");
  } else if (senha.val() !== senhaConfirmar.val()) {
    criaMensagem("As senhas devem conferir");
  } else if (!checkbox1.prop("checked")) {
    criaMensagem("Você deve concordar com os termos para prosseguir!");
  } else {
    enviaServidor();
  }
}
function enviaServidor() {
  const formObject = criaFormObjeto();
  const JsonForm = criaObjetoJson(formObject);
  $.post("./php/register.php", JsonForm, function (coquinho) {
    $("#mensagem").html(coquinho);
    LimpaCampos();
  });
}
