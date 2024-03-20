const senha = $("#senha");
const email = $("#email");
const bttnSbmt = $("#sbmtButton");
const form = $("#formLogin");
bttnSbmt.on("click", function (coquinho) {
  verificaCampos();
});
function verificaCampos() {
  if (senha.val() === "" || email.val() === "") {
    $("#mensagem").text("Todos Campos Devem ser preenchidos!");
  } else {
    form.submit();
  }
}
