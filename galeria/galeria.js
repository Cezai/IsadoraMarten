document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GERAR OS CARDS AUTOMATICAMENTE EM LOTES
    // ==========================================
    const galeriaGrid = document.getElementById('galeria-grid');

    // Aqui está a sua "Tabela"! É só mudar o que está entre aspas!
    const lotesDeFotos = [
        { inicio: 1, fim: 81, titulo: "A Pequena Sereia e o Fundo do mar", categoria: "espetaculos" },
        { inicio: 82, fim: 103, titulo: "12º Dança Arroio Grande", categoria: "festivais" },
        { inicio: 104, fim: 107, titulo: "12º Dança Arroio Grande", categoria: "festivais" },
        { inicio: 108, fim: 108, titulo: "Mostra de Encerramento DIISMA", categoria: "apresentacoes" },
        { inicio: 109, fim: 111, titulo: "12º Dança Arroio Grande", categoria: "festivais" },
        { inicio: 112, fim: 116, titulo: "Prêmio Pelotas Di’Dança", categoria: "festivais" },
        { inicio: 117, fim: 121, titulo: "Festa Junina", categoria: "aulas" },
        { inicio: 122, fim: 124, titulo: "Workshop Jazz", categoria: "eventos" },
        { inicio: 125, fim: 140, titulo: "Aulões 2026", categoria: "eventos" },
        { inicio: 141, fim: 141, titulo: "115 anos do Clube Brilhante", categoria: "apresentacoes" }, // Foto única
        { inicio: 142, fim: 146, titulo: "Aulões Abertos 2025", categoria: "eventos" },
        { inicio: 147, fim: 153, titulo: "Carnaval", categoria: "aulas" },
        { inicio: 154, fim: 155, titulo: "Páscoa", categoria: "aulas" },
        { inicio: 156, fim: 182, titulo: "Final de Ano Dançante", categoria: "colonia" }
    ];

    // Esse código vai ler a sua tabela acima e criar os cards certinhos
    lotesDeFotos.forEach(lote => {
        for (let i = lote.inicio; i <= lote.fim; i++) {
            const card = document.createElement('div');
            
            // Adiciona a classe 'card' e a categoria (ex: 'espetaculos') para o filtro funcionar
            card.classList.add('card', lote.categoria);

            card.innerHTML = `
                <img src="/img/galeria/foto (${i}).jpeg" alt="${lote.titulo} - Foto ${i}" loading="lazy">
                <h3>${lote.titulo}</h3>
                <p>Registro ${i}</p>
            `;

            galeriaGrid.appendChild(card);
        }
    });
    // ==========================================
    // 2. SELEÇÃO DE ELEMENTOS PÓS-CRIAÇÃO
    // ==========================================
    const buttons = document.querySelectorAll(".filter");
    const cards = Array.from(document.querySelectorAll(".card"));
    const links = document.querySelectorAll(".footer-nav a");
    
    let visibleCards = [...cards];
    let currentIndex = 0;

    // ==========================================
    // 3. NAV ATIVA (Menu)
    // ==========================================
    let currentPath = window.location.pathname;
    if (currentPath === "/" || currentPath === "") currentPath = "/index.html";
    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath.includes(currentPath)) link.classList.add("active");
    });

    // ==========================================
    // 4. SISTEMA DE FILTROS
    // ==========================================
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            
            cards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
            visibleCards = cards.filter(card => card.style.display !== "none");
        });
    });

    // ==========================================
    // 5. CRIAÇÃO DA LIGHTBOX
    // ==========================================
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="close-lightbox">&times;</span>
            <button class="nav-btn prev" id="prevBtn">&#10094;</button>
            <img class="lightbox-img" src="" alt="">
            <button class="nav-btn next" id="nextBtn">&#10095;</button>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // ==========================================
    // 6. FUNÇÕES DA LIGHTBOX (Abrir e Passar)
    // ==========================================
    function updateLightbox(index) {
        if (visibleCards.length === 0) return;
        if (index < 0) index = visibleCards.length - 1;
        if (index >= visibleCards.length) index = 0;
        
        currentIndex = index;
        const imgSource = visibleCards[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSource;
    }

    // Evento de clique na Galeria (escuta os cards que criamos lá em cima)
    galeriaGrid.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card');
        if (clickedCard) {
            currentIndex = visibleCards.indexOf(clickedCard);
            updateLightbox(currentIndex);
            lightbox.classList.add('active');
        }
    });

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex + 1); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex - 1); });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox' || e.target.classList.contains('close-lightbox')) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === "ArrowRight") updateLightbox(currentIndex + 1);
        if (e.key === "ArrowLeft") updateLightbox(currentIndex - 1);
        if (e.key === "Escape") lightbox.classList.remove('active');
    });
});