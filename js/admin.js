/* ============================================================
   Conecta Terapia Online — Esqueleto do painel
   Dados 100% fictícios, em memória (sem banco de dados).
   ============================================================ */

'use strict';

/* ---------- Configurações (editáveis na aba Config) ---------- */
const config = {
  whatsappOficial: '5518991879264',
  valorRepasse: 30,
};

/* ---------- Dados fictícios ---------- */
let terapeutas = [
  { id: 1, nome: 'Marina Duarte',  crp: '06/123456', whats: '(11) 98765-4321', esp: 'Ansiedade, Autoestima',   status: 'ativo' },
  { id: 2, nome: 'Rafael Souza',   crp: '06/234567', whats: '(11) 97654-3210', esp: 'Depressão, Luto',          status: 'ativo' },
  { id: 3, nome: 'Camila Ferreira', crp: '06/345678', whats: '(11) 96543-2109', esp: 'Relacionamentos, Burnout', status: 'ativo' },
];

let pacientes = [
  { id: 1, nome: 'Ana Beatriz',   whats: '(11) 99123-4567', entrada: '2026-10-10', status: 'em-atendimento', terapeutaId: 1 },
  { id: 2, nome: 'João Pedro',    whats: '(11) 99234-5678', entrada: '2026-10-11', status: 'aguardando',      terapeutaId: null },
  { id: 3, nome: 'Mariana Lopes', whats: '(11) 99345-6789', entrada: '2026-10-12', status: 'em-atendimento', terapeutaId: 2 },
  { id: 4, nome: 'Carlos Eduardo', whats: '(11) 99456-7890', entrada: '2026-10-13', status: 'aguardando',     terapeutaId: null },
  { id: 5, nome: 'Fernanda Alves', whats: '(11) 99567-8901', entrada: '2026-10-14', status: 'em-atendimento', terapeutaId: 1 },
];

let encaminhamentos = [
  { pacienteId: 1, terapeutaId: 1, data: '2026-10-10' },
  { pacienteId: 3, terapeutaId: 2, data: '2026-10-12' },
  { pacienteId: 5, terapeutaId: 1, data: '2026-10-14' },
];

let repasses = [
  { id: 1, pacienteId: 1, terapeutaId: 1, valor: 30, status: 'pago',     dataPagamento: '2026-10-11' },
  { id: 2, pacienteId: 3, terapeutaId: 2, valor: 30, status: 'pendente', dataPagamento: null },
  { id: 3, pacienteId: 5, terapeutaId: 1, valor: 30, status: 'pendente', dataPagamento: null },
];

let proximoId = 100;

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);

const fmtBRL = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const fmtData = (iso) => {
  if (!iso) return '—';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
};

const hojeISO = () => new Date().toISOString().slice(0, 10);

const nomeTerapeuta = (id) => (terapeutas.find((t) => t.id === id) || {}).nome || '—';
const nomePaciente  = (id) => (pacientes.find((p) => p.id === id) || {}).nome || '—';

const pacientesDoTerapeuta = (terapeutaId) =>
  pacientes.filter((p) => p.terapeutaId === terapeutaId).length;

const rotuloStatusTerapeuta = (s) => (s === 'ativo' ? 'Ativo' : 'Inativo');
const rotuloStatusPaciente = (s) => (s === 'aguardando' ? 'Aguardando terapeuta' : 'Em atendimento');

/* ---------- Login fake ---------- */
$('form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  $('tela-login').style.display = 'none';
  $('painel').classList.add('ativo');
  renderTudo();
});

$('btn-sair').addEventListener('click', () => {
  $('painel').classList.remove('ativo');
  $('tela-login').style.display = 'flex';
  $('senha').value = '';
});

/* ---------- Navegação por abas ---------- */
document.querySelectorAll('.aba-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.aba-btn').forEach((b) => b.classList.remove('ativa'));
    document.querySelectorAll('.aba-painel').forEach((p) => p.classList.remove('ativa'));
    btn.classList.add('ativa');
    $('aba-' + btn.dataset.aba).classList.add('ativa');
  });
});

/* ---------- Render: Visão geral ---------- */
function renderResumo() {
  const ativos = terapeutas.filter((t) => t.status === 'ativo').length;
  const pendentes = repasses.filter((r) => r.status === 'pendente');
  const pagos = repasses.filter((r) => r.status === 'pago');

  $('card-terapeutas').textContent = ativos;
  $('card-pacientes').textContent = pacientes.length;
  $('card-encaminhamentos').textContent = encaminhamentos.length;
  $('card-pendentes').textContent = fmtBRL(pendentes.reduce((s, r) => s + r.valor, 0));
  $('card-recebidos').textContent = fmtBRL(pagos.reduce((s, r) => s + r.valor, 0));
}

/* ---------- Render: Terapeutas ---------- */
function renderTerapeutas() {
  $('tabela-terapeutas').innerHTML = terapeutas.map((t) => `
    <tr>
      <td><strong>${t.nome}</strong></td>
      <td>${t.crp}</td>
      <td>${t.whats}</td>
      <td>${t.esp || '—'}</td>
      <td><span class="selo-status ${t.status}">${rotuloStatusTerapeuta(t.status)}</span></td>
      <td>${pacientesDoTerapeuta(t.id)}</td>
    </tr>`).join('');
}

$('form-terapeuta').addEventListener('submit', (e) => {
  e.preventDefault();
  terapeutas.push({
    id: proximoId++,
    nome: $('t-nome').value.trim(),
    crp: $('t-crp').value.trim(),
    whats: $('t-whats').value.trim(),
    esp: $('t-esp').value.trim(),
    status: $('t-status').value,
  });
  e.target.reset();
  renderTudo();
});

/* ---------- Render: Pacientes ---------- */
function renderPacientes() {
  $('tabela-pacientes').innerHTML = pacientes.map((p) => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td>${p.whats}</td>
      <td>${fmtData(p.entrada)}</td>
      <td><span class="selo-status ${p.status}">${rotuloStatusPaciente(p.status)}</span></td>
      <td>${p.terapeutaId ? nomeTerapeuta(p.terapeutaId) : '—'}</td>
    </tr>`).join('');
}

$('form-paciente').addEventListener('submit', (e) => {
  e.preventDefault();
  pacientes.push({
    id: proximoId++,
    nome: $('p-nome').value.trim(),
    whats: $('p-whats').value.trim(),
    entrada: $('p-data').value,
    status: 'aguardando',
    terapeutaId: null,
  });
  e.target.reset();
  renderTudo();
});

/* ---------- Distribuição ---------- */
function terapeutasAtivos() {
  return terapeutas.filter((t) => t.status === 'ativo');
}

function sugestaoTerapeuta() {
  const ativos = terapeutasAtivos();
  if (!ativos.length) return null;
  return ativos.reduce((menor, t) =>
    pacientesDoTerapeuta(t.id) < pacientesDoTerapeuta(menor.id) ? t : menor
  );
}

function renderDistribuicao() {
  const aguardando = pacientes.filter((p) => !p.terapeutaId);
  const ativos = terapeutasAtivos();

  $('d-paciente').innerHTML = aguardando.length
    ? aguardando.map((p) => `<option value="${p.id}">${p.nome}</option>`).join('')
    : '<option value="">Nenhum paciente aguardando</option>';

  $('d-terapeuta').innerHTML = ativos.length
    ? ativos.map((t) => `<option value="${t.id}">${t.nome} (${pacientesDoTerapeuta(t.id)} pacientes)</option>`).join('')
    : '<option value="">Nenhum terapeuta ativo</option>';

  const sug = sugestaoTerapeuta();
  $('sugestao-terapeuta').textContent = sug
    ? `Sugestão: ${sug.nome} está com menos pacientes (${pacientesDoTerapeuta(sug.id)}).`
    : 'Cadastre um terapeuta ativo para distribuir.';

  $('tabela-encaminhamentos').innerHTML = encaminhamentos.length
    ? encaminhamentos.map((e) => `
      <tr>
        <td><strong>${nomePaciente(e.pacienteId)}</strong></td>
        <td>${nomeTerapeuta(e.terapeutaId)}</td>
        <td>${fmtData(e.data)}</td>
      </tr>`).join('')
    : '<tr><td colspan="3">Nenhum encaminhamento ainda.</td></tr>';
}

$('btn-distribuir').addEventListener('click', () => {
  const pacienteId = Number($('d-paciente').value);
  const terapeutaId = Number($('d-terapeuta').value);
  if (!pacienteId || !terapeutaId) return;

  const paciente = pacientes.find((p) => p.id === pacienteId);
  paciente.terapeutaId = terapeutaId;
  paciente.status = 'em-atendimento';

  encaminhamentos.push({ pacienteId, terapeutaId, data: hojeISO() });

  // Todo encaminhamento gera um repasse pendente da 1ª sessão
  repasses.push({
    id: proximoId++,
    pacienteId,
    terapeutaId,
    valor: Number(config.valorRepasse) || 0,
    status: 'pendente',
    dataPagamento: null,
  });

  renderTudo();
});

/* ---------- Financeiro ---------- */
function renderRepasses() {
  $('tabela-repasses').innerHTML = repasses.length
    ? repasses.map((r) => `
      <tr>
        <td><strong>${nomePaciente(r.pacienteId)}</strong></td>
        <td>${nomeTerapeuta(r.terapeutaId)}</td>
        <td>${fmtBRL(r.valor)}</td>
        <td>
          <span class="selo-status ${r.status}">${r.status === 'pago' ? 'Pago' : 'Pendente'}</span>
          ${r.status === 'pago' && r.dataPagamento ? `<br><small>pago em ${fmtData(r.dataPagamento)}</small>` : ''}
        </td>
        <td>
          ${r.status === 'pendente'
            ? `<button class="btn btn-oliva btn-pequeno" data-pagar="${r.id}">Marcar como pago</button>`
            : '—'}
        </td>
      </tr>`).join('')
    : '<tr><td colspan="5">Nenhum repasse registrado.</td></tr>';

  document.querySelectorAll('[data-pagar]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const repasse = repasses.find((r) => r.id === Number(btn.dataset.pagar));
      repasse.status = 'pago';
      repasse.dataPagamento = hojeISO();
      renderTudo();
    });
  });
}

/* ---------- Config ---------- */
$('btn-salvar-config').addEventListener('click', () => {
  config.whatsappOficial = $('cfg-whatsapp').value.trim();
  config.valorRepasse = Number($('cfg-repasse').value) || 0;
  alert('Configurações salvas (nesta sessão).');
});

/* ---------- Render geral ---------- */
function renderTudo() {
  renderResumo();
  renderTerapeutas();
  renderPacientes();
  renderDistribuicao();
  renderRepasses();
}
