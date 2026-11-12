/* ==========================================================================
   НАУКОВО-УЧНІВСЬКИЙ ЖУРНАЛ «ЕКОЛОГІЧНИЙ ВІСНИК» №7/2026
   Інтерактивна логіка сайту, карти, АСКРО-графіка та 14-слайдової презентації
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initReadingProgress();
  initMobileMenu();
  initNppFilters();
  initEnergyComplexMap();
  initRadiationSvgChart();
  initSettlementMonitor();
  initDefenseSimulator();
  initFaqAccordion();
  initQuiz();
  initLightbox();
  initPresentationDeck();

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
});

/* ==========================================================================
   1. ПЕРЕМИКАЧ ТЕМИ (СВІТЛА / ТЕМНА РЕАКТОРНА)
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;
  let saved = 'light';
  try {
    saved = localStorage.getItem('eco_visnyk_theme') || 'light';
  } catch (_) {}

  applyTheme(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(current);
      try {
        localStorage.setItem('eco_visnyk_theme', current);
      } catch (_) {}
    });
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему';
    }
  }
}

/* ==========================================================================
   2. ПРОГРЕС ЧИТАННЯ ТА АКТИВНА НАВІГАЦІЯ
   ========================================================================== */
function initReadingProgress() {
  const fill = document.getElementById('readingProgressFill');
  const navLinks = document.querySelectorAll('#desktopNav .nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (fill && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      fill.style.width = `${pct}%`;
    }

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 130;
      if (scrollTop >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

/* ==========================================================================
   3. МОБІЛЬНЕ МЕНЮ
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

/* ==========================================================================
   4. ФІЛЬТР АТОМНИХ ЕЛЕКТРОСТАНЦІЙ (ТАБЛИЦЯ 1.1)
   ========================================================================== */
function initNppFilters() {
  const filterGroup = document.getElementById('nppFilterGroup');
  const cards = document.querySelectorAll('#nppCardsGrid .npp-card');
  if (!filterGroup || !cards.length) return;

  filterGroup.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;

    filterGroup.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const mode = btn.getAttribute('data-filter');
    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      card.style.display = (mode === 'all' || status === mode) ? 'block' : 'none';
    });
  });
}

/* ==========================================================================
   5. ІНТЕРАКТИВНА СХЕМА ПІВДЕННОУКРАЇНСЬКОГО ЕНЕРГОКОМПЛЕКСУ (1-9)
   ========================================================================== */
function initEnergyComplexMap() {
  const pointsData = [
    {
      id: '1',
      title: '1. Південноукраїнська АЕС (ПАЕС)',
      desc: 'Три енергоблоки ВВЕР-1000 по 1000 МВт (введені в 1982, 1985, 1989 рр.). Базовий фундамент енергосистеми Півдня України; на майданчику постійно діє місія МАГАТЕ.'
    },
    {
      id: '2',
      title: '2. Ташлицький ставок-охолоджувач',
      desc: 'Ключовий елемент технологічного охолодження реакторів ПАЕС. Водний та температурний баланс перебуває під цілодобовим екологічним контролем.'
    },
    {
      id: '3',
      title: '3. Ташлицька ГАЕС',
      desc: 'Гідроакумулююча електростанція. Здатна за лічені хвилини запустити гідроагрегати при різкому падінні частоти через обстріли ЛЕП, рятуючи Південь від блек-ауту та захищаючи блоки АЕС від аварійної зупинки.'
    },
    {
      id: '4',
      title: '4. Олександрівський гідровузол (ГЕС)',
      desc: 'Регулює стік річки Південний Буг, забезпечуючи роботу каскаду, накопичення води у водосховищі та додаткову маневрову гідрогенерацію.'
    },
    {
      id: '5',
      title: '5. Олександрівське водосховище',
      desc: 'Нижній резервуар гідроакумулюючого циклу та джерело стабільного водопостачання енергокомплексу й регіону.'
    },
    {
      id: '6',
      title: '6. Прибузьке водосховище',
      desc: 'Складова водного господарства Південноукраїнського енергетичного вузла для підтримки екологічного балансу басейну.'
    },
    {
      id: '7',
      title: '7. м. Південноукраїнськ',
      desc: 'Місто-супутник ПАЕС, де проживають працівники комплексу та студенти-автори журналу «Екологічний вісник». Надійно захищене системою моніторингу АСКРО.'
    },
    {
      id: '8',
      title: '8. смт. Олександрівка',
      desc: 'Населений пункт у 30-кілометровій зоні спостереження АЕС, де контролюється стабільний гамма-фон (~0.110 мкЗв/год).'
    },
    {
      id: '9',
      title: '9. смт. Костянтинівка',
      desc: 'Сусіднє селище в зоні моніторингу ПАЕС (за даними SaveEcoBot показник становить 0.120–0.140 мкЗв/год, що у понад 2 рази нижче норми).'
    }
  ];

  const listEl = document.getElementById('complexPointsList');
  const mapButtons = document.querySelectorAll('.map-point-btn');
  const activeTitle = document.getElementById('complexActiveTitle');
  const activeDesc = document.getElementById('complexActiveDesc');
  if (!listEl || !mapButtons.length) return;

  listEl.innerHTML = pointsData.map((p, idx) => `
    <div class="point-item ${idx === 0 ? 'active' : ''}" data-point="${p.id}">
      <div class="point-item-header">
        <span>${p.title}</span>
        <span>▸</span>
      </div>
      <div class="point-item-body">${p.desc}</div>
    </div>
  `).join('');

  function selectPoint(id) {
    const found = pointsData.find(p => p.id === id);
    if (!found) return;

    if (activeTitle) activeTitle.textContent = found.title;
    if (activeDesc) activeDesc.textContent = found.desc;

    mapButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-point') === id));
    listEl.querySelectorAll('.point-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-point') === id);
    });
  }

  mapButtons.forEach(btn => {
    btn.addEventListener('click', () => selectPoint(btn.getAttribute('data-point')));
  });

  listEl.addEventListener('click', e => {
    const item = e.target.closest('.point-item');
    if (item) selectPoint(item.getAttribute('data-point'));
  });
}

/* ==========================================================================
   6. ІНТЕРАКТИВНИЙ SVG-ГРАФІК АСКРО (ПРАКТИЧНА РОБОТА)
   ========================================================================== */
function initRadiationSvgChart() {
  const container = document.getElementById('radiationSvgChart');
  const detailEl = document.getElementById('chartHoverDetail');
  const origBtn = document.getElementById('showOriginalChartBtn');
  if (!container) return;

  const data = [
    {
      label: 'Природний фон',
      short: 'Природний фон',
      val: 0.12,
      color: '#2563eb',
      note: 'Історичний фон регіону (0,10–0,14 мкЗв/год) через гранітні відкладення та природні ізотопи.'
    },
    {
      label: 'Штатний режим (серпень 2026)',
      short: 'Штатний режим',
      val: 0.12,
      color: '#10b981',
      note: 'Серпень 2026 р.: стабільна робота блоків ПАЕС — Південноукраїнськ 0,11, Костянтинівка 0,12, Бузьке 0,13 мкЗв/год.'
    },
    {
      label: 'Обстріли підстанцій (жовтень 2026)',
      short: 'Обстріли / тривоги',
      val: 0.12,
      color: '#0284c7',
      note: 'Кінець жовтня 2026 р., під час масованих атак та повітряних тривог: фон 0,10–0,12 мкЗв/год (абсолютно стабільний).'
    },
    {
      label: 'Допустима межа НРБУ-97',
      short: 'Межа НРБУ-97',
      val: 0.30,
      color: '#ea580c',
      note: 'Гранично допустимий безпечний рівень радіаційного фону для населення України згідно з нормами НРБУ-97.'
    }
  ];

  const width = 560;
  const height = 265;
  const padL = 48;
  const padB = 46;
  const padT = 26;
  const chartW = width - padL - 20;
  const chartH = height - padT - padB;
  const maxY = 0.35;

  const yPos = v => padT + chartH - (v / maxY) * chartH;
  const limitY = yPos(0.30);

  let gridSvg = '';
  [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35].forEach(tick => {
    const y = yPos(tick);
    gridSvg += `
      <line x1="${padL}" y1="${y}" x2="${width - 15}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>
      <text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor" opacity="0.65">${tick.toFixed(2)}</text>
    `;
  });

  const barW = 68;
  const gap = (chartW - data.length * barW) / (data.length + 1);
  let barsSvg = '';

  data.forEach((d, idx) => {
    const x = padL + gap + idx * (barW + gap);
    const y = yPos(d.val);
    const h = padT + chartH - y;
    barsSvg += `
      <g class="svg-bar" data-idx="${idx}">
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="${d.color}"/>
        <text x="${x + barW / 2}" y="${y - 7}" text-anchor="middle" font-size="12" font-weight="800" fill="${d.color}">${d.val.toFixed(2)}</text>
        <text x="${x + barW / 2}" y="${padT + chartH + 18}" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">${d.short}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="color: var(--text-main); overflow: visible;">
      ${gridSvg}
      ${barsSvg}
      <line x1="${padL}" y1="${limitY}" x2="${width - 15}" y2="${limitY}" stroke="#ea580c" stroke-width="3" stroke-dasharray="6 4"/>
      <circle cx="${padL + 10}" cy="${limitY}" r="4" fill="#ea580c"/>
      <text x="${width - 18}" y="${limitY - 8}" text-anchor="end" font-size="11" font-weight="800" fill="#ea580c">Санітарна межа 0.30 мкЗв/год</text>
    </svg>
  `;

  container.querySelectorAll('.svg-bar').forEach(g => {
    const showNote = () => {
      const idx = Number(g.getAttribute('data-idx'));
      if (detailEl && data[idx]) {
        detailEl.textContent = `${data[idx].label}: ${data[idx].note}`;
      }
    };
    g.addEventListener('mouseenter', showNote);
    g.addEventListener('click', showNote);
  });

  if (origBtn) {
    origBtn.addEventListener('click', () => {
      openLightbox('assets/images/radiation_barchart.png', 'Оригінальний порівняльний графік радіаційного фону з наукового журналу «Екологічний вісник»');
    });
  }
}

/* ==========================================================================
   7. ІНТЕРАКТИВНИЙ МОНІТОР НАСЕЛЕНИХ ПУНКТІВ МИКОЛАЇВЩИНИ
   ========================================================================== */
function initSettlementMonitor() {
  const settlements = [
    { name: 'Південноукраїнськ', type: 'місто-супутник ПАЕС', val: 0.110 },
    { name: 'Костянтинівка', type: 'селище', val: 0.140 },
    { name: 'Вознесенськ', type: 'місто', val: 0.122 },
    { name: 'Бузьке', type: 'село', val: 0.140 },
    { name: 'Олександрівка', type: 'село', val: 0.110 },
    { name: 'Первомайськ', type: 'місто', val: 0.149 },
    { name: 'Арбузинка', type: 'селище', val: 0.165 },
    { name: 'Баштанка', type: 'місто', val: 0.133 },
    { name: 'Врадіївка', type: 'селище', val: 0.135 },
    { name: 'Благодатне', type: 'село', val: 0.140 },
    { name: 'Іванівка', type: 'село', val: 0.130 },
    { name: 'Нова Одеса', type: 'місто', val: 0.130 },
    { name: 'Очаків', type: 'місто', val: 0.122 },
    { name: 'Акмечетські Ставки', type: 'село', val: 0.120 },
    { name: 'Новоселівка', type: 'село', val: 0.130 },
    { name: 'Кузнецове', type: 'село', val: 0.090 },
    { name: 'Миколаїв', type: 'місто', val: 0.087 }
  ];

  const grid = document.getElementById('settlementChipsGrid');
  const nameEl = document.getElementById('selSettlementName');
  const valEl = document.getElementById('selSettlementVal');
  const barEl = document.getElementById('selSafetyBar');
  const compEl = document.getElementById('selComparisonText');
  if (!grid) return;

  grid.innerHTML = settlements.map((s, idx) => `
    <button type="button" class="settlement-chip ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
      <div style="text-align: left;">
        <div class="chip-name">${s.name}</div>
        <div class="chip-type">${s.type}</div>
      </div>
      <div class="chip-val">${s.val.toFixed(3)}</div>
    </button>
  `).join('');

  grid.addEventListener('click', e => {
    const chip = e.target.closest('.settlement-chip');
    if (!chip) return;
    const idx = Number(chip.getAttribute('data-idx'));
    const s = settlements[idx];
    if (!s) return;

    grid.querySelectorAll('.settlement-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    if (nameEl) nameEl.textContent = `${s.name} (${s.type})`;
    if (valEl) valEl.textContent = s.val.toFixed(3);

    const pctOfLimit = Math.min(100, Math.round((s.val / 0.30) * 100));
    const ratio = (0.30 / s.val).toFixed(1);
    if (barEl) barEl.style.width = `${pctOfLimit}%`;
    if (compEl) compEl.textContent = `Становить ${pctOfLimit}% від ліміту — у ${ratio} раза нижче межі НРБУ-97 (0.30 мкЗв/год)`;
  });
}

/* ==========================================================================
   8. ІНТЕРАКТИВНИЙ СИМУЛЯТОР ТРИРІВНЕВОГО ЗАХИСТУ
   ========================================================================== */
function initDefenseSimulator() {
  const tabs = document.getElementById('tierTabs');
  const badge = document.getElementById('simTierBadge');
  const title = document.getElementById('simTierTitle');
  const target = document.getElementById('simTierTarget');
  const desc = document.getElementById('simTierDesc');
  const visual = document.getElementById('simTierVisual');
  if (!tabs || !visual) return;

  const tiers = {
    '1': {
      badge: 'РІВЕНЬ ІНЖЕНЕРНОГО ЗАХИСТУ №1',
      title: 'Захист від уламків та вибухової хвилі (Габіони та блоки)',
      target: 'Об’єкт захисту: Силові трансформатори та елементи ВРП',
      desc: 'Трансформатори обносять масивними стінами із залізобетонних блоків та габіонів, заповнених піском або гранітним відсівом. Такий бар’єр повністю нівелює дію уламків ракет чи дронів у разі близького вибуху та гасить ударну хвилю.',
      svg: `
        <svg viewBox="0 0 320 170" width="100%" style="max-width: 300px;">
          <rect x="20" y="140" width="280" height="12" rx="3" fill="#64748b"/>
          <rect x="55" y="65" width="32" height="75" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
          <rect x="233" y="65" width="32" height="75" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
          <rect x="115" y="75" width="90" height="65" rx="5" fill="#0284c7"/>
          <text x="160" y="112" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Трансформатор</text>
          <path d="M22 45 L50 75 M20 65 L48 88" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 3"/>
          <text x="160" y="25" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">Габіони й бетонні блоки відбивають уламки</text>
        </svg>
      `
    },
    '2': {
      badge: 'РІВЕНЬ ІНЖЕНЕРНОГО ЗАХИСТУ №2',
      title: 'Захист від прямих ударів БПЛА (Антидронові сітки та каркаси)',
      target: 'Призначення: Протидія дронам-камікадзе типу «Shahed-136»',
      desc: 'Над трансформаторними майданчиками зводяться масивні металеві конструкції з натягнутими міцними сталевими сітками («сітками-вловлювачами»). Вони не дозволяють ударному БПЛА влучити безпосередньо в маслонаповнений бак трансформатора.',
      svg: `
        <svg viewBox="0 0 320 170" width="100%" style="max-width: 300px;">
          <rect x="20" y="142" width="280" height="10" rx="3" fill="#64748b"/>
          <path d="M55 142 L55 48 L265 48 L265 142" fill="none" stroke="#f59e0b" stroke-width="4"/>
          <line x1="55" y1="56" x2="265" y2="56" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3"/>
          <rect x="115" y="82" width="90" height="60" rx="5" fill="#0284c7"/>
          <text x="160" y="116" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">ВРП / Блок</text>
          <path d="M160 12 L160 44" stroke="#ef4444" stroke-width="3"/>
          <circle cx="160" cy="46" r="6" fill="#ef4444"/>
          <text x="160" y="164" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">Металевий каркас і сталева антидронова сітка</text>
        </svg>
      `
    },
    '3': {
      badge: 'РІВЕНЬ ІНЖЕНЕРНОГО ЗАХИСТУ №3',
      title: 'Комплексний захист від ракет (Бункери / Саркофаги)',
      target: 'Призначення: Критичні вузли — дизель-генератори та системи управління',
      desc: 'Найбільш капітальні підземні або напівзаглиблені залізобетонні укриття для захисту резервних дизель-генераторів та апаратури керування. Водночас повністю сховати під землю магістральні трансформатори 750 кВ технічно майже неможливо через габарити і потребу в охолодженні.',
      svg: `
        <svg viewBox="0 0 320 170" width="100%" style="max-width: 300px;">
          <path d="M40 142 L40 62 Q160 28 280 62 L280 142 Z" fill="#334155" stroke="#10b981" stroke-width="3"/>
          <rect x="105" y="85" width="110" height="50" rx="5" fill="#10b981"/>
          <text x="160" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Дизель-генератор</text>
          <path d="M160 8 L160 36" stroke="#ef4444" stroke-width="4"/>
          <text x="160" y="162" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">Підземне залізобетонне укриття</text>
        </svg>
      `
    }
  };

  function renderTier(id) {
    const t = tiers[id];
    if (!t) return;
    badge.textContent = t.badge;
    title.textContent = t.title;
    target.textContent = t.target;
    desc.textContent = t.desc;
    visual.innerHTML = t.svg;
  }

  renderTier('1');

  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.tier-tab-btn');
    if (!btn) return;
    tabs.querySelectorAll('.tier-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTier(btn.getAttribute('data-tier'));
  });
}

/* ==========================================================================
   9. ДОВІДНИК ЧИТАЧА (FAQ АКОРДЕОН)
   ========================================================================== */
function initFaqAccordion() {
  const container = document.getElementById('faqAccordion');
  if (!container) return;

  container.addEventListener('click', e => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    const item = header.closest('.accordion-item');
    if (item) {
      item.classList.toggle('active');
    }
  });
}

/* ==========================================================================
   10. МІНІ-ВІКТОРИНА ДЛЯ ПОКАЗУ ЗНАНЬ
   ========================================================================== */
function initQuiz() {
  const body = document.getElementById('quizBody');
  const scoreBadge = document.getElementById('quizScoreBadge');
  if (!body || !scoreBadge) return;

  const questions = [
    {
      q: 'Скільки енергоблоків зараз стабільно працює на підконтрольних Україні АЕС?',
      options: ['6 енергоблоків', '9 енергоблоків', '15 енергоблоків', '12 енергоблоків'],
      correct: 1,
      explain: 'Під контролем України працюють Рівненська (4), Південноукраїнська (3) та Хмельницька (2) АЕС — загалом 9 енергоблоків.'
    },
    {
      q: 'Який об’єкт Південноукраїнського енергокомплексу рятує мережу від блек-ауту за лічені хвилини?',
      options: ['Ташлицька ГАЕС', 'Сонячна станція', 'Тільки градирні', 'Дизельний потяг'],
      correct: 0,
      explain: 'Гідроагрегати Ташлицької ГАЕС здатні миттєво набирати потужність і балансувати частоту в Південному регіоні.'
    },
    {
      q: 'Яка допустима санітарна норма гамма-фону для населення за НРБУ-97 (у мкЗв/год)?',
      options: ['0,12 мкЗв/год', '0,30 мкЗв/год', '0,90 мкЗв/год', '1,50 мкЗв/год'],
      correct: 1,
      explain: 'Санітарна межа — 0,30 мкЗв/год. Фактичний фон у Південноукраїнську (0,10–0,13 мкЗв/год) у понад 2 рази нижчий.'
    },
    {
      q: 'На ядерне паливо якої компанії повністю перейшов «Енергоатом»?',
      options: ['Росатом (РФ)', 'Westinghouse (США)', 'Siemens (Німеччина)', 'Mitsubishi (Японія)'],
      correct: 1,
      explain: 'Україна повністю відмовилась від російського палива та перейшла на збірки американської компанії Westinghouse; також плануються нові блоки AP1000.'
    }
  ];

  let idx = 0;
  let score = 0;

  function renderQuestion() {
    if (idx >= questions.length) {
      scoreBadge.textContent = `Завершено • ${score} / ${questions.length}`;
      body.innerHTML = `
        <div style="text-align: center; padding: 18px 0;">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🏆</div>
          <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;">Вітаємо! Ваш результат: ${score} з ${questions.length}</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 16px;">Ви впевнено орієнтуєтеся в матеріалах випуску №7/2026 журналу «Екологічний вісник».</p>
          <button type="button" class="btn-primary" id="restartQuizBtn">Пройти ще раз</button>
        </div>
      `;
      document.getElementById('restartQuizBtn').addEventListener('click', () => {
        idx = 0;
        score = 0;
        renderQuestion();
      });
      return;
    }

    const item = questions[idx];
    scoreBadge.textContent = `Питання ${idx + 1} з ${questions.length} • Бали: ${score}`;
    body.innerHTML = `
      <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">${item.q}</div>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `<button type="button" class="quiz-option-btn" data-opt="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
    `;

    const opts = body.querySelectorAll('.quiz-option-btn');
    const feedback = document.getElementById('quizFeedback');

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = Number(btn.getAttribute('data-opt'));
        opts.forEach(b => b.disabled = true);

        if (chosen === item.correct) {
          btn.classList.add('correct');
          score++;
          feedback.style.background = 'rgba(16, 185, 129, 0.14)';
          feedback.innerHTML = `<strong>Правильно!</strong> ${item.explain}`;
        } else {
          btn.classList.add('wrong');
          opts[item.correct].classList.add('correct');
          feedback.style.background = 'rgba(239, 68, 68, 0.12)';
          feedback.innerHTML = `<strong>Зверніть увагу:</strong> ${item.explain}`;
        }

        scoreBadge.textContent = `Питання ${idx + 1} з ${questions.length} • Бали: ${score}`;
        feedback.classList.add('show');

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn-primary';
        nextBtn.style.marginTop = '12px';
        nextBtn.textContent = idx === questions.length - 1 ? 'Показати результат' : 'Наступне питання →';
        nextBtn.addEventListener('click', () => {
          idx++;
          renderQuestion();
        });
        feedback.appendChild(nextBtn);
      });
    });
  }

  renderQuestion();
}

/* ==========================================================================
   11. LIGHTBOX ДЛЯ ЗБІЛЬШЕННЯ ЗОБРАЖЕНЬ І ОРИГІНАЛЬНОЇ ОБКЛАДИНКИ
   ========================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;
  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';
  modal.classList.add('active');
}

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const coverBtn = document.getElementById('viewOriginalCoverBtn');

  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.getAttribute('src'), img.getAttribute('data-caption') || img.getAttribute('alt'));
    });
  });

  if (coverBtn) {
    coverBtn.addEventListener('click', () => {
      openLightbox('assets/images/journal_cover_scan.png', 'Оригінальна обкладинка друкованого науково-учнівського журналу «Екологічний вісник» №7/2026');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   12. РЕЖИМ ПРЕЗЕНТАЦІЇ (14 СЛАЙДІВ ПРОЄКТУ «АНТОНЮК ЄГОР»)
   ========================================================================== */
function initPresentationDeck() {
  const modal = document.getElementById('presentationModal');
  const canvas = document.getElementById('slideCanvas');
  const counterText = document.getElementById('slideCounterText');
  const progressFill = document.getElementById('slideProgressFill');
  const thumbsStrip = document.getElementById('slideThumbnailsStrip');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const closeBtn = document.getElementById('closePresentationBtn');
  const fullBtn = document.getElementById('fullscreenDeckBtn');
  const timerBtn = document.getElementById('toggleTimerBtn');
  const timerEl = document.getElementById('deckTimer');

  if (!modal || !canvas) return;

  const slides = [
    {
      kicker: 'Слайд 1 • Титул конкурсного проєкту',
      title: 'Роль АЕС під час воєнного стану в Україні',
      body: `
        <div class="slide-2col">
          <div>
            <p style="font-size: 1.15rem; color: #fde68a; font-style: italic; margin-bottom: 18px;">
              «Не думки слід навчати, а думати!» — І. Кант
            </p>
            <ul class="slide-list">
              <li><strong>Видання:</strong> Науково-учнівський журнал №7/2026 «Екологічний вісник»</li>
              <li><strong>Конкурс:</strong> Всеукраїнський конкурс рефератів серед учнівської молоді «Ядерна енергетика і світ»</li>
              <li><strong>Виконавець:</strong> Антонюк Єгор Іванович, студент гр. 67-р/к ЗП(ПТ)О «Південноукраїнський професійний коледж»</li>
              <li><strong>Науковий керівник:</strong> Мітченко Олена Анатоліївна</li>
            </ul>
          </div>
          <div class="slide-img-frame" style="background: transparent; border: none;">
            <img src="assets/images/triptych_npp.png" alt="Українські АЕС" style="border-radius: 12px; border: 2px solid rgba(255,255,255,0.2);">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 2 • Актуальність та мета',
      title: 'Ефективна атомна енергетика — фундамент життєзабезпечення країни',
      body: `
        <div class="slide-2col">
          <div>
            <p style="color: #93c5fd; font-weight: 700; margin-bottom: 10px;">
              Об’єкт дослідження: атомна енергетика України в умовах воєнного стану з акцентом на Південноукраїнський енергокомплекс.
            </p>
            <h4 style="color: #fde68a; margin-bottom: 10px;">Мета дослідження:</h4>
            <ul class="slide-list">
              <li>Дослідити функціонування атомної енергетики України під час війни;</li>
              <li>Дати оцінку ролі ПАЕС у забезпеченні стійкості та екологічної безпеки Південного регіону;</li>
              <li>Визначити шляхи підвищення надійності енергосистеми ПАЕС та ознайомити з ними мешканців міста на сторінках журналу.</li>
            </ul>
          </div>
          <div class="slide-img-frame">
            <img src="assets/images/paes_rainbow_banner.png" alt="ПАЕС">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 3 • Завдання проєкту',
      title: 'Ключові дослідницькі завдання журналу «Екологічний вісник»',
      body: `
        <div class="slide-2col">
          <ul class="slide-list">
            <li>Проаналізувати стан атомної енергетики України в умовах війни та наслідки ударів по мережах;</li>
            <li>Оцінити стабілізуючу роль ПАЕС (у зв’язці з Олександрівською ГЕС та Ташлицькою ГАЕС) для Південного регіону;</li>
            <li>Провести практичний аналіз динаміки радіаційного фону за даними системи АСКРО та SaveEcoBot;</li>
            <li>Визначити перспективні напрямки розвитку (трирівневий захист, нові блоки AP1000, комбінація з ВДЕ).</li>
          </ul>
          <div class="slide-img-frame" style="background: transparent; border: none;">
            <img src="assets/images/yehor_antoniuk_author.jpg" alt="Єгор Антонюк" style="border-radius: 12px; border: 2px solid #f59e0b;">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 4 • Рубрика 1',
      title: 'Атомна енергетика України в умовах воєнного стану',
      body: `
        <div class="slide-2col">
          <div>
            <table class="slide-table">
              <thead>
                <tr><th>АЕС</th><th>Місто</th><th>Блоки</th><th>Потужність</th></tr>
              </thead>
              <tbody>
                <tr><td>Запорізька</td><td>Енергодар</td><td>6 ВВЕР-1000</td><td>6000 МВт (окупована)</td></tr>
                <tr><td>Рівненська</td><td>Вараш</td><td>2 ВВЕР-440, 2 ВВЕР-1000</td><td>~2835 МВт</td></tr>
                <tr><td>Хмельницька</td><td>Нетішин</td><td>2 ВВЕР-1000</td><td>2000 МВт</td></tr>
                <tr><td>Південноукраїнська</td><td>Південноукраїнськ</td><td>3 ВВЕР-1000</td><td>3000 МВт</td></tr>
              </tbody>
            </table>
            <p style="margin-top: 12px; font-size: 0.9rem; color: #34d399; font-weight: 700;">
              За І півріччя 2026 р. підконтрольні АЕС (9 блоків) виробили 26,82 млрд кВт·год (+163 млн кВт·год до минулого року) — понад 60–67% генерації України.
            </p>
          </div>
          <div class="slide-img-frame">
            <img src="assets/images/slide_4_npps.png" alt="4 АЕС України">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 5 • Рубрика 1 (Енергокомплекс Півдня)',
      title: 'Роль енергокомплексу ПАЕС у забезпеченні стійкості енергосистеми',
      body: `
        <div class="slide-2col">
          <div>
            <p style="font-size: 0.96rem; color: #e2e8f0; margin-bottom: 12px;">
              Унікальне поєднання в одному вузлі: <strong>ПАЕС + Олександрівська ГЕС + Ташлицька ГАЕС</strong>.
            </p>
            <h4 style="color: #fde68a; margin-bottom: 8px;">Ташлицька ГАЕС дає змогу:</h4>
            <ul class="slide-list">
              <li>Виробляти електроенергію в години ранкових та вечірніх пікових навантажень (коли блокам ВВЕР-1000 складно швидко маневрувати);</li>
              <li>Балансувати частоту в мережі за лічені хвилини після ворожих обстрілів ЛЕП;</li>
              <li>Забезпечувати резерв потужності для захисту енергоблоків ПАЕС від аварійної зупинки.</li>
            </ul>
          </div>
          <div class="slide-img-frame">
            <img src="assets/images/energy_complex_map.jpg" alt="Схема Південноукраїнського енергокомплексу">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 6 • Рубрика 2 (Технічні виклики)',
      title: 'Технічні аспекти експлуатації АЕС під час війни',
      body: `
        <div>
          <table class="slide-table" style="font-size: 0.9rem;">
            <thead>
              <tr><th style="width:24%;">Технічний виклик</th><th style="width:38%;">Опис та наслідки</th><th style="width:38%;">Шляхи протидії / Захист</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Удари по видачі потужності</strong></td><td>Атаки на відкриті розподільчі пристрої (ВРП-330/750) та підстанції блокують передачу струму.</td><td>Посилення ППО навколо вузлів, зведення 1-го та 2-го рівнів інженерного захисту.</td></tr>
              <tr><td><strong>Загроза знеструмлення</strong></td><td>Втрата зовнішнього живлення систем охолодження реакторів через пошкодження ЛЕП.</td><td>Автоматичний перехід на резервні дизель-генератори з тривалим запасом палива.</td></tr>
              <tr><td><strong>Криза охолодження (ЗАЕС)</strong></td><td>Руйнування Каховської ГЕС створило загрозу для ставка-охолоджувача ЗАЕС.</td><td>Режим «холодного зупину» 6 блоків та буріння додаткових підземних свердловин.</td></tr>
              <tr><td><strong>Прольоти ракет та БПЛА</strong></td><td>Понад 100 ворожих цілей щомісяця пролітають у безпосередній близькості до ядерних об’єктів.</td><td>Цілодобовий моніторинг, фіксація траєкторій та передача даних до МАГАТЕ.</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      kicker: 'Слайд 7 • Рубрика 2 (Екологічні загрози)',
      title: 'Екологічні аспекти та захист водної екосистеми регіону',
      body: `
        <div class="slide-2col">
          <ul class="slide-list">
            <li><strong>Радіаційний фон:</strong> стабільний на підконтрольних АЕС завдяки АСКРО; на окупованій ЗАЕС періодичні ризики втрати зв’язку з постами.</li>
            <li><strong>Поводження з ВЯП та РАВ:</strong> ускладнена логістика вивезення змушує організовувати безпечне зберігання на майданчиках.</li>
            <li><strong>Водні екосистеми:</strong> посилений контроль температури скидної води та хімічного складу р. Південний Буг і Ташлицького водосховища проти теплового забруднення та цвітіння вод.</li>
            <li><strong>Охорона праці та МАГАТЕ:</strong> суворі регламенти захисту персоналу та міжнародний контроль.</li>
          </ul>
          <div class="slide-img-frame">
            <img src="assets/images/safety_labor_protection.png" alt="Заходи з охорони праці на АЕС">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 8 • Практична робота (АСКРО)',
      title: 'Аналіз радіаційного фону Південноукраїнська та 30-км зони',
      body: `
        <div class="slide-2col">
          <div>
            <ul class="slide-list">
              <li>Джерела: платформи <strong>SaveEcoBot</strong>, «ЕкоЗагроза», стаціонарні пости АСКРО.</li>
              <li><strong>Природний фон регіону:</strong> 0,10–0,14 мкЗв/год (гранітні відкладення).</li>
              <li><strong>Штатний режим (серпень 2026):</strong> 0,11–0,13 мкЗв/год (Південноукраїнськ — 0,11, Костянтинівка — 0,12, Бузьке — 0,13).</li>
              <li><strong>Період обстрілів підстанцій (жовтень 2026):</strong> 0,10–0,12 мкЗв/год.</li>
              <li><strong>Санітарна норма НРБУ-97:</strong> 0,30 мкЗв/год.</li>
            </ul>
          </div>
          <div class="slide-img-frame">
            <img src="assets/images/radiation_map_saveecobot.png" alt="Карта SaveEcoBot Південноукраїнськ">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 9 • Висновок практичної роботи',
      title: 'Стабільність радіаційного стану в умовах воєнних загроз',
      body: `
        <div class="slide-2col">
          <div class="slide-img-frame">
            <img src="assets/images/radiation_barchart.png" alt="Графік радіаційного фону">
          </div>
          <div>
            <ul class="slide-list">
              <li>На графіку крива реального радіаційного стану є абсолютно стабільною (<strong>~0,12 мкЗв/год</strong>).</li>
              <li>Показники більш ніж <strong>удвічі нижчі за критичну санітарну межу (0,30 мкЗв/год)</strong> і повністю відповідають природному фону.</li>
              <li>Попри ракетні загрози, повітряні тривоги та маневрування потужностями, система захисних бар’єрів АЕС гарантує <strong>100% екологічну безпеку регіону</strong>.</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 10 • Рубрика 3 (Відповіді фахівця)',
      title: 'Заходи протидії загрозам та інтерв’ю зі спеціалістом ПАЕС',
      body: `
        <div class="slide-2col">
          <div>
            <p style="color: #fde68a; font-weight: 700; margin-bottom: 10px;">
              Інтерв’ю з Начальником зміни черги ЕБ №2 ПАЕС Пікусом Артемом Олександровичем:
            </p>
            <ul class="slide-list">
              <li><strong>Зони ППО:</strong> щільна протиповітряна та протидронова оборона навколо АЕС;</li>
              <li><strong>Моніторинг МАГАТЕ:</strong> постійна присутність експертів та 44 пости в 30-км зоні (+ с. Рябоконеве, 33,5 км);</li>
              <li><strong>Автономність:</strong> 3 системи безпеки на енергоблоці + аварійні дизель-генератори;</li>
              <li><strong>Незалежність:</strong> повний перехід «Енергоатому» на американське паливо Westinghouse.</li>
            </ul>
          </div>
          <div class="slide-img-frame">
            <img src="assets/images/interview_artem_pikus.jpg" alt="Інтерв'ю з Артемом Пікусом">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 11 • Рубрика 3 (Інженерна стійкість)',
      title: 'Трирівневий підхід до захисту енергооб’єктів',
      body: `
        <div class="slide-2col">
          <ul class="slide-list">
            <li><strong>Перший рівень (Габіони та бетонні блоки):</strong> захист трансформаторів від уламків та ударної хвилі за допомогою заповнених піском/відсівом блоків.</li>
            <li><strong>Другий рівень (Антидронові сітки та каркаси):</strong> металеві конструкції зі сталевими сітками-вловлювачами проти прямих влучань БПЛА «Shahed-136».</li>
            <li><strong>Третій рівень (Бункери / Саркофаги):</strong> залізобетонні підземні укриття для найкритичніших вузлів (дизель-генераторів, систем управління).</li>
          </ul>
          <div class="slide-img-frame">
            <img src="assets/images/civil_defense_measures.png" alt="Цивільний захист та аварійна готовність">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 12 • Рубрика 3 (Майбутнє)',
      title: 'Плани розвитку: нові блоки AP1000 та «Зелений» перехід',
      body: `
        <div class="slide-2col">
          <ul class="slide-list">
            <li><strong>Технологія AP1000 Westinghouse:</strong> добудова 3-го і 4-го блоків ХАЕС та підготовчі роботи для будівництва блоків №4 та №5 на Південноукраїнській АЕС.</li>
            <li><strong>Малі модульні реактори (SMR):</strong> опрацювання розміщення додаткових потужностей.</li>
            <li><strong>«Зелений» перехід:</strong> АЕС забезпечують понад половину безвуглецевої генерації; модель <strong>АЕС + ВДЕ + ГАЕС</strong> формує стійку систему майбутнього.</li>
            <li><strong>Стратегічна мета:</strong> досягти 25 ГВт атомної генерації до 2050 року.</li>
          </ul>
          <div class="slide-img-frame" style="background: transparent; border: none;">
            <img src="assets/images/green_transition_co2.png" alt="Зниження CO2" style="border-radius: 12px;">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 13 • Післямова',
      title: 'Підсумок журналістської та дослідницької роботи',
      body: `
        <div class="slide-2col">
          <div>
            <p style="color: #e2e8f0; margin-bottom: 14px; font-size: 1rem;">
              Українська енергосистема щодня адаптується до ракетних атак і дефіциту потужностей. Населення повинно знати правду про її захист.
            </p>
            <h4 style="color: #fde68a; margin-bottom: 8px;">Що зробила наша редакція:</h4>
            <ul class="slide-list">
              <li>Опрацювали наукові й офіційні джерела (теоретична частина);</li>
              <li>Провели власний аналіз радіаційного фону за даними АСКРО (практична частина);</li>
              <li>Взяли опитування на вулицях міста, інтерв’ю у спеціаліста ПАЕС та створили довідник для громади.</li>
            </ul>
          </div>
          <div class="slide-img-frame" style="background: transparent; border: none;">
            <img src="assets/images/yehor_control_room.jpg" alt="Єгор Антонюк у навчальному центрі ПАЕС" style="border-radius: 12px; border: 2px solid #38bdf8;">
          </div>
        </div>
      `
    },
    {
      kicker: 'Слайд 14 • Висновки',
      title: 'Дякуємо за увагу! Головні висновки проєкту',
      body: `
        <div>
          <ul class="slide-list" style="font-size: 1.05rem;">
            <li><strong>Альтернативи атомній генерації сьогодні немає:</strong> АЕС стримали енергетичний колапс України під час війни.</li>
            <li><strong>Синергія Півдня:</strong> поєднання ПАЕС, Ташлицької ГАЕС та Олександрівської ГЕС дає життєво важливу маневровість.</li>
            <li><strong>Геополітична безпека:</strong> повний перехід на паливо Westinghouse гарантував технологічну незалежність від РФ.</li>
            <li><strong>100% екологічна безпека:</strong> дані АСКРО (0,10–0,13 мкЗв/год) доводять абсолютну надійність захисних бар’єрів.</li>
            <li><strong>Шляхи розвитку доведено до громади</strong> на сторінках журналу «Екологічний вісник» №7/2026.</li>
          </ul>
          <div style="margin-top: 22px; text-align: center; font-size: 1.35rem; font-weight: 900; color: #fde68a;">
            Автор: Антонюк Єгор • Науковий керівник: Мітченко О.А. • ЗП(ПТ)О «ППК»
          </div>
        </div>
      `
    }
  ];

  let currentSlide = 0;
  let timerSec = 0;
  let timerInterval = null;

  thumbsStrip.innerHTML = slides.map((_, i) => `
    <button type="button" class="slide-thumb ${i === 0 ? 'active' : ''}" data-slide="${i}">${i + 1}</button>
  `).join('');

  function renderSlide(idx) {
    currentSlide = Math.max(0, Math.min(slides.length - 1, idx));
    const s = slides[currentSlide];

    canvas.innerHTML = `
      <div class="slide-header-bar">
        <span class="slide-kicker-pill">${s.kicker}</span>
        <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 700;">Журнал «Екологічний вісник» №7/2026</span>
      </div>
      <div class="slide-content-body">
        <h2 class="slide-title-lg">${s.title}</h2>
        ${s.body}
      </div>
      <div class="slide-footer-bar">
        <span>ЗП(ПТ)О «Південноукраїнський професійний коледж» • Конкурс «Ядерна енергетика і світ»</span>
        <span>Слайд ${currentSlide + 1} / ${slides.length}</span>
      </div>
    `;

    counterText.textContent = `Слайд ${currentSlide + 1} з ${slides.length}`;
    progressFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;

    thumbsStrip.querySelectorAll('.slide-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentSlide);
    });
  }

  function openDeck(startIndex = 0) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderSlide(startIndex);
  }

  function closeDeck() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    stopTimer();
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      if (timerBtn) timerBtn.textContent = '▶ Старт таймера';
    }
  }

  if (timerBtn) {
    timerBtn.addEventListener('click', () => {
      if (timerInterval) {
        stopTimer();
      } else {
        timerBtn.textContent = '⏸ Пауза таймера';
        timerInterval = setInterval(() => {
          timerSec++;
          const m = String(Math.floor(timerSec / 60)).padStart(2, '0');
          const s = String(timerSec % 60).padStart(2, '0');
          timerEl.textContent = `${m}:${s}`;
        }, 1000);
      }
    });
  }

  if (fullBtn) {
    fullBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  ['openPresentationBtn', 'heroPresentationBtn', 'footerPresentationBtn', 'footerSlideLink'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', e => {
        e.preventDefault();
        openDeck(0);
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDeck);
  if (prevBtn) prevBtn.addEventListener('click', () => renderSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderSlide(currentSlide + 1));

  thumbsStrip.addEventListener('click', e => {
    const t = e.target.closest('.slide-thumb');
    if (t) renderSlide(Number(t.getAttribute('data-slide')));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const lb = document.getElementById('lightboxModal');
      if (lb && lb.classList.contains('active')) {
        lb.classList.remove('active');
        return;
      }
      if (modal.classList.contains('active')) {
        closeDeck();
      }
      return;
    }

    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      renderSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      renderSlide(currentSlide - 1);
    } else if (e.key.toLowerCase() === 'f') {
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  });
}
