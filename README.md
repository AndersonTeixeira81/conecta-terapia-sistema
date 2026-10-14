# Conecta Terapia Online — Esqueleto do Sistema

Esqueleto estático (HTML + CSS + JS puros) do site público e do painel de gestão da
Conecta Terapia Online. **Não há banco de dados**: todos os dados são fictícios e
vivem apenas na memória do navegador durante a sessão.

## Arquivos

| Arquivo           | O que é                                                        |
|-------------------|----------------------------------------------------------------|
| `index.html`      | Site público: hero, como funciona, modelo, manifesto, footer   |
| `admin.html`      | Painel de gestão (login fake + 6 abas)                         |
| `css/style.css`   | Estilos compartilhados, identidade visual v4                   |
| `js/admin.js`     | Lógica do painel: abas, dados mock, distribuição, financeiro   |
| `README.md`       | Este arquivo                                                   |

## Como abrir

Basta abrir `index.html` ou `admin.html` direto no navegador — não precisa de
servidor nem build. Para publicar, basta subir a pasta para qualquer hospedagem
estática (ex.: GitHub Pages).

## O que o esqueleto já demonstra

- **Site público**: identidade v4 (oliva `#8B8A67`, creme `#F5EDE3`, bege `#DCC7AD`,
  terracota `#C68A63`, verde escuro `#5C6650`), tipografia Fraunces + Inter,
  botão "Começar pelo WhatsApp" com atributo `data-whatsapp` pronto para receber
  o número oficial.
- **Painel**: login visual (qualquer senha entra), abas Visão geral, Terapeutas,
  Pacientes, Distribuição, Financeiro e Config.
- **Regras de negócio simuladas**: distribuir um paciente gera automaticamente um
  repasse pendente de R$ 30,00 (valor configurável); marcar como pago atualiza os
  totais do dashboard; a distribuição sugere o terapeuta com menos pacientes.

## O que falta (próximas etapas)

1. **Banco de dados** — persistir terapeutas, pacientes, encaminhamentos e
   repasses (ex.: Supabase, Firebase ou similar).
2. **Autenticação real** — login com senha de verdade, sessão e proteção das
   rotas do painel.
3. **WhatsApp oficial** — ligar o número real ao botão do site (aba Config).
4. **Privacidade** — o painel lida com dados sensíveis (LGPD): acesso restrito,
   nada de dados reais em hospedagem pública sem controle de acesso.

## Faixa de aviso

O `admin.html` exibe no topo a faixa **"ESQUELETO — dados fictícios, sem banco
de dados"** para deixar claro o estágio do projeto.
