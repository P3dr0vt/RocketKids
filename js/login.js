const senha = $("#senha");
const email = $("#email");
const bttnSbmt = $("#sbmtButton");
const form = $("#formLogin");
bttnSbmt.on("click", function (coquinho) {
  coquinho.preventDefault();
  verificaCampos();
});
function verificaCampos(bunda) {
  if (senha.val() === "" || email.val() === "") {
    $("#mensagem").text("Todos Campos Devem ser preenchidos!");
  } else {
    $.post("./php/login.php", { email: email.val(), senha: senha.val() }, function (coquinho) {
      var resposta = JSON.parse(coquinho);
      if (resposta.status === "success") {
        window.location.href = resposta.redirect;
      } else {
        $("#mensagem").text(resposta.message);
      }
    });
  }
}
