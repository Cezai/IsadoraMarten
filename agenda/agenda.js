// CORREÇÃO DO MENU ATIVO
const links = document.querySelectorAll(".footer-nav a");
let currentPath = window.location.pathname;

if (currentPath === "/") {
  currentPath = "/index.html";
}

links.forEach(link => {
  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

// LOGICA DO CALENDÁRIO DINÂMICO DE 2026
const eventosAno = {
  "2026-02-17": { nome: "Carnaval (Suspensão de aulas em muitos locais)", tipo: "important" },
  "2026-02-18": { nome: "Quarta de Cinzas (Funcionamento parcial)", tipo: "important" },
  "2026-02-19": { nome: "Carnaval (Feriado Prolongado)", tipo: "important" },
  "2026-02-20": { nome: "Carnaval (Feriado Prolongado)", tipo: "important" },
  "2026-02-21": { nome: "Carnaval (Feriado Prolongado)", tipo: "important" },
  "2026-04-21": { nome: "Tiradentes", tipo: "event" },
  "2026-05-01": { nome: "Dia do Trabalhador", tipo: "event" },
  "2026-06-04": { nome: "Corpus Christi (Ponto facultativo na maioria das instituições)", tipo: "event" },
  "2026-06-06": { nome: "Festival do Studio de Dança", tipo: "special" },
  "2026-06-07": { nome: "Festival do Studio de Dança", tipo: "special" },
  "2026-09-07": { nome: "Independência do Brasil", tipo: "event" },
  "2026-10-12": { nome: "Nossa Senhora Aparecida", tipo: "event" },
  "2026-11-02": { nome: "Finados", tipo: "event" },
  "2026-11-15": { nome: "Proclamação da República", tipo: "event" },
  "2026-11-20": { nome: "Consciência Negra", tipo: "event" },
  "2026-12-25": { nome: "Natal", tipo: "event" },
  "2026-12-31": { nome: "Véspera de Ano Novo (Funcionamento reduzido após o meio-dia)", tipo: "event" }
};

let dataAtual = new Date(2026, 0, 1); // Inicializa no ano de 2026 (Mês 0 = Janeiro)

function renderCalendar() {
  const month = dataAtual.getMonth();
  const year = dataAtual.getFullYear();
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  document.getElementById("month-year").textContent = `${monthNames[month]} ${year}`;
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const grid = document.getElementById("calendar-grid");
  
  // Limpar dias e colocar o cabeçalho das semanas
  grid.innerHTML = `
    <span class="day-name">Dom</span><span class="day-name">Seg</span><span class="day-name">Ter</span>
    <span class="day-name">Qua</span><span class="day-name">Qui</span><span class="day-name">Sex</span><span class="day-name">Sáb</span>
  `;
  
  // Preencher espaços vazios do início do mês
  for(let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<span class="empty"></span>`;
  }
  
  const list = document.getElementById("month-events-list");
  list.innerHTML = "";
  let temEventoMes = false;
  
  // Condição especial para o recesso de Julho
  if(month === 6 && year === 2026) {
    list.innerHTML += `<div class="event-list-item"><span class="dot important"></span> <strong>Julho Inteiro:</strong> Recesso escolar de inverno (datas exatas variam por instituição)</div>`;
    temEventoMes = true;
  }

  // Preencher os dias do mês
  for(let i = 1; i <= daysInMonth; i++) {
    let dataStr = `${year}-${String(month+1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    let spanClass = "";
    
    // Verifica se tem evento nesse dia
    if(eventosAno[dataStr]) {
      spanClass = eventosAno[dataStr].tipo;
      list.innerHTML += `<div class="event-list-item"><span class="dot ${spanClass}"></span> <strong>${String(i).padStart(2, '0')}/${String(month+1).padStart(2, '0')}:</strong> ${eventosAno[dataStr].nome}</div>`;
      temEventoMes = true;
    }
    
    grid.innerHTML += `<span class="${spanClass}">${i}</span>`;
  }
  
  // Mensagem para quando não houver feriados/eventos no mês
  if(!temEventoMes) {
    list.innerHTML = `<p class="sem-eventos">Não há feriados ou eventos especiais registrados para este mês.</p>`;
  }
}

// Botões de Navegação
document.getElementById("prev-month").addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderCalendar();
});

// Executa na hora que a página carrega
renderCalendar();