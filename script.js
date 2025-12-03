// Versão do cache - atualize este número quando modificar os dados
const CACHE_VERSION = "1.0.2";

// Texto de atualização - modifique aqui
const UPDATE_TEXT = "03 de dezembro de 2025, 10:18<br><br> O Big Day RS é um evento independente inspirado no eBird (Big Day), com objetivo de observar aves gaúchas, fortalecer a ciência cidadã e a conexão com a natureza.";

// Dados centralizados - apenas aqui!
const RANKING_DATA = {
  // Observadores - Espécies
  observadores_species: [
  { nome: "Guillermo Andreo", quantidade: 79},
  { nome: "Rafael Juchem", quantidade: 78},
  { nome: "Rodrigo Rosito", quantidade: 75},
  { nome: "Andrei Langeloh Roos", quantidade: 67},
  { nome: "Cassiana Aguiar", quantidade: 66},
  { nome: "Filipe Bernardi", quantidade: 68},
  { nome: "Lucilene Jacoboski", quantidade: 67},
  { nome: "Ines Vasconcelos", quantidade: 54},
  { nome: "Augusto Huyer", quantidade: 76},
  { nome: "Eduarda Thaís dos Santos", quantidade: 58},
  { nome: "Gustavo Henrique Lambert", quantidade: 58},
  { nome: "Luiz Wittmann", quantidade: 49},
  { nome: "Rodrigo Santos", quantidade: 8},
  { nome: "Cláudio Jorge De Castro Filho", quantidade: 76},
  { nome: "Raphael Kurz - Aves do Sul", quantidade: 111},
  { nome: "Márcia Rodrigues", quantidade: 26},
  { nome: "Luis Weymar Junior", quantidade: 105},
  { nome: "Demétrius Lima", quantidade: 16},
  { nome: "Kassiane Gonçalves", quantidade: 10},
  { nome: "Vera Medeiros", quantidade: 50},
  { nome: "Letícia Matheus Baccarin", quantidade: 27},
  { nome: "Marisa Costa", quantidade: 24},
  { nome: "Rafael Antunes Dias", quantidade: 14},
  { nome: "Rafael Silveira Lopes", quantidade: 42},
  { nome: "Vitor Eduardo Frota Vasconcelos", quantidade: 72}
  ],
  
  // Observadores - Listas
  observadores_lists: [
  { nome: "Guillermo Andreo", quantidade: 2},
  { nome: "Rafael Juchem", quantidade: 4},
  { nome: "Rodrigo Rosito", quantidade: 4},
  { nome: "Andrei Langeloh Roos", quantidade: 5},
  { nome: "Cassiana Aguiar", quantidade: 5},
  { nome: "Filipe Bernardi", quantidade: 6},
  { nome: "Lucilene Jacoboski", quantidade: 5},
  { nome: "Ines Vasconcelos", quantidade: 6},
  { nome: "Augusto Huyer", quantidade: 3},
  { nome: "Eduarda Thaís dos Santos", quantidade: 7},
  { nome: "Gustavo Henrique Lambert", quantidade: 7},
  { nome: "Luiz Wittmann", quantidade: 1},
  { nome: "Rodrigo Santos", quantidade: 1},
  { nome: "Cláudio Jorge De Castro Filho", quantidade: 11},
  { nome: "Raphael Kurz - Aves do Sul", quantidade: 12},
  { nome: "Márcia Rodrigues", quantidade: 1},
  { nome: "Luis Weymar Junior", quantidade: 2},
  { nome: "Demétrius Lima", quantidade: 5},
  { nome: "Kassiane Gonçalves", quantidade: 2},
  { nome: "Vera Medeiros", quantidade: 7},
  { nome: "Letícia Matheus Baccarin", quantidade: 2},
  { nome: "Marisa Costa", quantidade: 2},
  { nome: "Rafael Antunes Dias", quantidade: 1},
  { nome: "Rafael Silveira Lopes", quantidade: 5},
  { nome: "Vitor Eduardo Frota Vasconcelos", quantidade: 1}
  ],
  
  // Municípios - Espécies
  municipios_species: [
  { nome: "Canoas", quantidade: 72},
  { nome: "Porto Alegre", quantidade: 82},
  { nome: "Caxias do Sul", quantidade: 94},
  { nome: "Hulha Negra", quantidade: 18},
  { nome: "Dois Irmãos", quantidade: 49},
  { nome: "Lajeado", quantidade: 8},
  { nome: "Pelotas", quantidade: 80},
  { nome: "Rio Grande", quantidade: 113},
  { nome: "Santo Ângelo", quantidade: 26},
  { nome: "Alvorada", quantidade: 16},
  { nome: "São Marcos", quantidade: 20},
  { nome: "Torres", quantidade: 27},
  { nome: "Tramandaí", quantidade: 24},
  { nome: "Capão do Leão", quantidade: 103},
  { nome: "Viamão", quantidade: 24},
  { nome: "Aceguá", quantidade: 42},
  { nome: "Eldorado do Sul", quantidade: 72},
  { nome: "Bagé", quantidade: 19}
  ],
  
  // Municípios - Listas
  municipios_lists: [
  { nome: "Canoas", quantidade: 4},
  { nome: "Porto Alegre", quantidade: 13},
  { nome: "Caxias do Sul", quantidade: 12},
  { nome: "Hulha Negra", quantidade: 1},
  { nome: "Dois Irmãos", quantidade: 1},
  { nome: "Lajeado", quantidade: 1},
  { nome: "Pelotas", quantidade: 13},
  { nome: "Rio Grande", quantidade: 12},
  { nome: "Santo Ângelo", quantidade: 1},
  { nome: "Alvorada", quantidade: 5},
  { nome: "São Marcos", quantidade: 1},
  { nome: "Torres", quantidade: 2},
  { nome: "Tramandaí", quantidade: 2},
  { nome: "Capão do Leão", quantidade: 1},
  { nome: "Viamão", quantidade: 2},
  { nome: "Aceguá", quantidade: 5},
  { nome: "Eldorado do Sul", quantidade: 1},
  { nome: "Bagé", quantidade: 1}
  ]
};

// Log para verificar se o script carregou a versão correta
console.log(`Ranking Big Day - Versão ${CACHE_VERSION}`);

// Util: formata número (inteiro)
function fmt(n){ return Number(n)||0; }

// Orderna por quantidade decrescente e retorna com colocação
function prepareRanking(rows){
  const list = rows.map(item => ({
    nome: item.nome || item.Nome || "",
    quantidade: fmt(item.quantidade || item.Quantidade || 0)
  }));
  
  list.sort((a,b) => b.quantidade - a.quantidade);
  
  let rank = 0, lastQty = null;
  return list.map((item, i) => {
    if (item.quantidade !== lastQty) {
      rank = i + 1;
      lastQty = item.quantidade;
    }
    return { colocacao: rank, nome: item.nome, quantidade: item.quantidade };
  });
}

// Renderiza top N em tabela SEM thead
function renderTop(tableId, data, topN=10){
  const table = document.getElementById(tableId);
  if (!table) return;
  
  // Remove thead se existir
  const thead = table.querySelector('thead');
  if (thead) thead.remove();
  
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = "";
  const shown = data.slice(0, topN);
  for (const row of shown) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.colocacao}</td><td>${escapeHtml(row.nome)}</td><td>${row.quantidade}</td>`;
    tbody.appendChild(tr);
  }
}

// adiciona botão "Mais dados" se total > 10
function setupMoreButton(containerId, type, total){
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = "";
  if (total > 10) {
    const link = document.createElement('a');
    link.href = `full.html?type=${type}&v=${CACHE_VERSION}`;
    link.textContent = "Mais dados";
    container.appendChild(link);
  }
}

// Adiciona texto de atualização no rodapé
function setupUpdateFooter() {
  const footer = document.createElement('div');
  footer.className = 'update-footer';
  footer.innerHTML = `<p>Dados atualizados até: <strong>${UPDATE_TEXT}</strong></p>`;
  document.body.appendChild(footer);
}

// escape básico para inserir nomes
function escapeHtml(s){
  if (s == null) return "";
  return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

// Função global para acessar dados do full.html
function getRankingData(type) {
  return RANKING_DATA[type] || [];
}

// Função global para acessar texto de atualização
function getUpdateText() {
  return UPDATE_TEXT;
}

// Main: processar dados e renderizar
function init(){
  console.log('Iniciando carregamento...');
  
  // species
  const obsSpeciesRank = prepareRanking(RANKING_DATA.observadores_species);
  renderTop("observadores-species-table", obsSpeciesRank, 10);
  setupMoreButton("observadores-species-more", "observadores_species", obsSpeciesRank.length);

  // lists
  const obsListsRank = prepareRanking(RANKING_DATA.observadores_lists);
  renderTop("observadores-lists-table", obsListsRank, 10);
  setupMoreButton("observadores-lists-more", "observadores_lists", obsListsRank.length);

  // Municípios - Espécies
  const munSpeciesRank = prepareRanking(RANKING_DATA.municipios_species);
  renderTop("municipios-species-table", munSpeciesRank, 10);
  setupMoreButton("municipios-species-more", "municipios_species", munSpeciesRank.length);

  // Municípios - Listas
  const munListsRank = prepareRanking(RANKING_DATA.municipios_lists);
  renderTop("municipios-lists-table", munListsRank, 10);
  setupMoreButton("municipios-lists-more", "municipios_lists", munListsRank.length);
  
  // Adiciona rodapé com data de atualização
  setupUpdateFooter();
  
  console.log('Carregamento completo');
}

// Run
document.addEventListener("DOMContentLoaded", init);





