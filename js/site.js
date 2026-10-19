/* ============================================================
   Conecta Terapia Online — site público
   Configure aqui o WhatsApp oficial e a mensagem padrão.
   ============================================================ */

var WHATSAPP_NUMERO = "5518991879264"; // número oficial Conecta Terapia Online
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
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  function iniciar() {
    aplicar();
    animarRevelacao();
    animarContadores();
  }

  /* Revela elementos ao rolar */
  function animarRevelacao() {
    var itens = document.querySelectorAll(".revelar");
    if (!("IntersectionObserver" in window) || !itens.length) {
      itens.forEach(function (el) { el.classList.add("visivel"); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    itens.forEach(function (el) { obs.observe(el); });
  }

  /* Contadores animados */
  function animarContadores() {
    var alvos = document.querySelectorAll(".contar");
    if (!alvos.length) return;
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        obs.unobserve(el);
        var alvo = parseInt(el.getAttribute("data-alvo"), 10) || 0;
        var inicio = null;
        function passo(ts) {
          if (!inicio) inicio = ts;
          var p = Math.min((ts - inicio) / 1200, 1);
          el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(passo);
        }
        requestAnimationFrame(passo);
      });
    }, { threshold: 0.4 });
    alvos.forEach(function (el) { obs.observe(el); });
  }
})();
