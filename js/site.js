/* ============================================================
   Conecta Terapia Online — site público
   Configure aqui o WhatsApp oficial e a mensagem padrão.
   ============================================================ */

var WHATSAPP_NUMERO = ""; // ex.: "5518999999999" (só números, com DDI+DDD)
var WHATSAPP_MSG = "Olá! Quero começar minha terapia online.";

(function () {
  function montarLink() {
    if (!WHATSAPP_NUMERO) return "#";
    return (
      "https://wa.me/" +
      WHATSAPP_NUMERO +
      "?text=" +
      encodeURIComponent(WHATSAPP_MSG)
    );
  }

  function aplicar() {
    var link = montarLink();
    document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
      el.setAttribute("href", link);
      if (link === "#") {
        el.addEventListener("click", function (ev) {
          ev.preventDefault();
          alert("WhatsApp oficial em breve — volte já já!");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", aplicar);
  } else {
    aplicar();
  }
})();
