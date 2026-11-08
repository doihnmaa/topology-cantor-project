let currentMode = "metric"; 
let currentStep = 0;
let isHelpOpen = false;

const dataModes = {
  metric: {
    name: "Повні метричні простори (X, d)",
    buttonLabel: "Перейти: Евклідів простір ℝⁿ",
    statement: "<b>Теорема:</b> Метричний простір $(X, d)$ є повним $\\iff$ для будь-якої спадної послідовності непорожніх замкнених множин $F_1 \\supseteq F_2 \\dots$ із $\\lim_{n \\to \\infty} \\operatorname{diam}(F_n) = 0$ перетин $\\bigcap_{n=1}^\\infty F_n$ містить рівно одну точку.",
    steps: [
      {
        title: "Вкладена послідовність (напрямок ⇒)",
        desc: "Припускаємо, що простір $(X, d)$ є повним. Нехай $F_1 \\supseteq F_2 \\dots$ — спадний ланцюг непорожніх замкнених множин, діаметри яких прямують до нуля.",
        math: "F_{n+1} \\subseteq F_n, \\quad F_n \\ne \\emptyset, \\quad F_n = \\overline{F_n}",
        setsToShow: 2,
        pointsToShow: 0,
        showDiameter: true
      },
      {
        title: "Звуження діаметра до нуля",
        desc: "За умовою теореми, геометричний розмір множин зменшується до нуля. Відрізок діаметра показує максимальну відстань між точками.",
        math: "\\operatorname{diam}(F_n) = \\sup \\{ d(u,v) : u,v \\in F_n \\} \\xrightarrow{n \\to \\infty} 0",
        setsToShow: 4,
        pointsToShow: 0,
        showDiameter: true
      },
      {
        title: "Побудова послідовності представників",
        desc: "Оскільки $F_n \\ne \\emptyset$, обираємо $x_n \\in F_n$. Для всіх $m, n \\ge N$ маємо $x_m, x_n \\in F_N$. Зі звуження діаметра випливає, що послідовність є фундаментальною (Коші).",
        math: "d(x_m, x_n) \\le \\operatorname{diam}(F_N) \\xrightarrow{N \\to \\infty} 0 \\implies (x_n)_{n=1}^\\infty \\text{ — Коші}",
        setsToShow: 4,
        pointsToShow: 3,
        showDiameter: true
      },
      {
        title: "Збіжність та єдиність точки",
        desc: "Оскільки $X$ повний, існує границя $x_n \\to x \\in X$. Оскільки кожна $F_N$ замкнена і містить хвіст $(x_n)_{n \\ge N}$, то $x \\in F_N$. Якщо є інша спільна точка $y$, то $d(x,y) \\le \\operatorname{diam}(F_n) \\to 0$, тому $x = y$",
        math: "x = \\lim_{n \\to \\infty} x_n \\in \\bigcap_{n=1}^\\infty F_n = \\{x\\}",
        setsToShow: 5,
        pointsToShow: 5,
        highlightLimit: true,
        showDiameter: false
      },
      {
        title: "Обернений напрямок (необхідність повноти ⇐)",
        desc: "Якщо $X$ неповний, існує незбіжна фундаментальна послідовність $(a_k)$. Хвости $F_n = \\overline{\\{a_k : k \\ge n\\}}$ непорожні, замкнені й мають $\\operatorname{diam}(F_n) \\to 0$, але $\\bigcap F_n = \\emptyset$: якби $x \\in \\bigcap F_n$, то $d(a_k, x) \\le \\operatorname{diam}(F_k) \\to 0$, тобто $a_k \\to x$ — суперечність. Приклад: інтервали $(0, 1/n]$ у неповному просторі $(0, 1]$",
        math: "\\bigcap_{n=1}^\\infty \\left(0, \\frac{1}{n}\\right] = \\emptyset \\quad \\text{у просторі } X = (0, 1]",
        showCounterExample: true
      }
    ]
  },
  euclidean: {
    name: "Евклідів простір ℝⁿ",
    buttonLabel: "Перейти: Загальний метричний простір",
    statement: "<b>Теорема:</b> Нехай $F_1 \\supseteq F_2 \\dots$ — спадна послідовність непорожніх замкнених і обмежених (компактних) підмножин $\\mathbb{R}^n$. Тоді перетин $\\bigcap_{n=1}^\\infty F_n \\ne \\emptyset$.",
    steps: [
      {
        title: "Вкладені компактні множини в ℝⁿ",
        desc: "Кожна множина $F_n$ у $\\mathbb{R}^n$ є непорожньою, замкненою та обмеженою. Зверніть увагу: умова $\\operatorname{diam}(F_n) \\to 0$ не вимагається, тому множини не обов'язково стискаються до точки.",
        math: "F_1 \\supseteq F_2 \\supseteq F_3 \\dots, \\quad F_n \\ne \\emptyset, \\quad F_n = \\overline{F_n}",
        setsToShow: 2,
        pointsToShow: 0
      },
      {
        title: "Вибір довільних точок xₖ",
        desc: "Обираємо довільні $x_k \\in F_k$. Усі точки містяться у вихідній множині $F_1$, яка є обмеженою. Отже, вся послідовність точок обмежена.",
        math: "\\forall k \\in \\mathbb{N}: \\; x_k \\in F_k \\subseteq F_1 \\implies (x_k)_{k=1}^\\infty \\text{ — обмежена в } \\mathbb{R}^n",
        setsToShow: 3,
        pointsToShow: 2
      },
      {
        title: "Збіжна підпослідовність (Больцано-Вейєрштрасс)",
        desc: "За теоремою Больцано-Вейєрштрасса для послідовностей у $\\mathbb{R}^n$, будь-яка обмежена послідовність має збіжну підпослідовність зі зростаючими номерами $k_1 < k_2 < \\dots$",
        math: "\\exists \\, (x_{k_j})_{j=1}^\\infty: \\quad k_1 < k_2 < \\dots, \\quad \\lim_{j \\to \\infty} x_{k_j} = x \\in \\mathbb{R}^n",
        setsToShow: 4,
        pointsToShow: 5,
        showSubsequence: true
      },
      {
        title: "Належність границі всім множинам",
        desc: "Для будь-якого фіксованого $m$, починаючи з номера $k_j \\ge m$, усі члени підпослідовності $x_{k_j}$ лежать у $F_{k_j} \\subseteq F_m$. Оскільки множина $F_m$ замкнена, її границя $x$ також належить $F_m$",
        math: "x_{k_j} \\in F_m \\; (\\forall k_j \\ge m), \\quad F_m = \\overline{F_m} \\implies x = \\lim_{j \\to \\infty} x_{k_j} \\in F_m",
        setsToShow: 5,
        pointsToShow: 5,
        highlightLimit: true,
        showSubsequence: true
      },
      {
        title: "Непорожність перетину",
        desc: "Оскільки $x \\in F_m$ для кожного $m$, маємо $x \\in \\bigcap_{m=1}^\\infty F_m$. Оскільки діаметр не прямує до 0, перетин не мусить складатися з однієї точки.",
        math: "x \\in \\bigcap_{m=1}^\\infty F_m \\implies \\bigcap_{m=1}^\\infty F_m \\ne \\emptyset",
        setsToShow: 5,
        pointsToShow: 5,
        highlightLimit: true
      }
    ]
  }
};
//еліпси для малюнку метричні
const metricEllipses = [
  { rx: 195, ry: 130, cx: 250, cy: 185, color: '#93c5fd', label: 'F₁', labelX: 85,  labelY: 95 },
  { rx: 140, ry: 90,  cx: 258, cy: 188, color: '#60a5fa', label: 'F₂', labelX: 140, labelY: 125 },
  { rx: 90,  ry: 55,  cx: 265, cy: 192, color: '#3b82f6', label: 'F₃', labelX: 195, labelY: 155 },
  { rx: 45,  ry: 28,  cx: 270, cy: 194, color: '#2563eb', label: 'F₄', labelX: 238, labelY: 180 },
  { rx: 8,   ry: 5,   cx: 275, cy: 195, color: '#1d4ed8', label: 'F₅', labelX: 290, labelY: 170 }
];

// евклідів еліпси
const euclideanEllipses = [
  { rx: 200, ry: 135, cx: 250, cy: 180, color: '#93c5fd', label: 'F₁', labelX: 85,  labelY: 95 },
  { rx: 155, ry: 105, cx: 255, cy: 180, color: '#60a5fa', label: 'F₂', labelX: 135, labelY: 115 },
  { rx: 115, ry: 80,  cx: 260, cy: 180, color: '#3b82f6', label: 'F₃', labelX: 180, labelY: 135 },
  { rx: 75,  ry: 55,  cx: 265, cy: 180, color: '#2563eb', label: 'F₄', labelX: 220, labelY: 155 },
  { rx: 40,  ry: 40,  cx: 270, cy: 180, color: '#1d4ed8', label: 'F₅', labelX: 245, labelY: 175 }
];

const pointConfigs = [
  { x: 105, y: 185, label: 'x₁', color: '#d97706' },
  { x: 160, y: 215, label: 'x₂', color: '#d97706' },
  { x: 210, y: 165, label: 'x₃', color: '#d97706' },
  { x: 245, y: 205, label: 'x₄', color: '#d97706' },
  { x: 275, y: 195, label: 'x',  color: '#dc2626', isLimit: true }
];

function initSVGDOM() {
  const setsGroup = document.getElementById("sets-group");
  const pointsGroup = document.getElementById("points-group");
  const subLines = document.getElementById("subsequence-lines");
  const diamGroup = document.getElementById("diameter-measure");
  if (!setsGroup || !pointsGroup) return;

  setsGroup.innerHTML = "";
  pointsGroup.innerHTML = "";
  subLines.innerHTML = "";
  diamGroup.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    el.setAttribute("id", `ellipse-${i}`);
    el.setAttribute("class", "nested-set");
    setsGroup.appendChild(el);

    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("id", `text-f-${i}`);
    txt.setAttribute("fill", "#1e3a8a");
    txt.setAttribute("font-size", "13px");
    txt.setAttribute("font-weight", "700");
    setsGroup.appendChild(txt);
  }

  // навколо х ореол
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("id", "limit-halo");
  halo.setAttribute("r", "18");
  halo.setAttribute("fill", "url(#grad-center)");
  halo.style.display = "none";
  pointsGroup.appendChild(halo);

  // точки
  pointConfigs.forEach((pt, i) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", `point-wrap-${i}`);
    g.style.display = "none";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("id", `point-dot-${i}`);
    circle.setAttribute("cx", pt.x);
    circle.setAttribute("cy", pt.y);
    circle.setAttribute("r", pt.isLimit ? "6" : "4.5");
    circle.setAttribute("fill", pt.color);
    circle.setAttribute("stroke", "#ffffff");
    circle.setAttribute("stroke-width", "1.5");
    circle.setAttribute("class", "point-dot");
    g.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("id", `point-txt-${i}`);
    text.setAttribute("x", pt.x + 7);
    text.setAttribute("y", pt.y - 7);
    text.setAttribute("fill", pt.isLimit ? "#b91c1c" : "#92400e");
    text.setAttribute("font-size", pt.isLimit ? "14px" : "12px");
    text.setAttribute("font-weight", "700");
    text.textContent = pt.label;
    g.appendChild(text);

    pointsGroup.appendChild(g);
  });
}

function updateSVGView(stepData) {
  const setsGroup = document.getElementById("sets-group");
  const subLines = document.getElementById("subsequence-lines");
  const diamGroup = document.getElementById("diameter-measure");
  const diamBadge = document.getElementById("diam-badge");

  subLines.innerHTML = "";
  diamGroup.innerHTML = "";

  // контрприклад
  if (stepData.showCounterExample) {
    setsGroup.innerHTML = "";
    diamBadge.textContent = "diam → 0, ∩ Fₙ = ∅";

    //чслова вісь
    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", "60"); axis.setAttribute("y1", "180");
    axis.setAttribute("x2", "440"); axis.setAttribute("y2", "180");
    axis.setAttribute("stroke", "#111827"); axis.setAttribute("stroke-width", "2");
    setsGroup.appendChild(axis);

    //виколота 0
    const zeroCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    zeroCircle.setAttribute("cx", "120"); zeroCircle.setAttribute("cy", "180");
    zeroCircle.setAttribute("r", "5.5");
    zeroCircle.setAttribute("fill", "#ffffff");
    zeroCircle.setAttribute("stroke", "#dc2626");
    zeroCircle.setAttribute("stroke-width", "2.5");
    setsGroup.appendChild(zeroCircle);

    const zeroTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    zeroTxt.setAttribute("x", "116"); zeroTxt.setAttribute("y", "205");
    zeroTxt.setAttribute("font-size", "14px"); zeroTxt.setAttribute("font-weight", "700");
    zeroTxt.setAttribute("fill", "#dc2626");
    zeroTxt.textContent = "0 ∉ X";
    setsGroup.appendChild(zeroTxt);

    //вкладені напівінтервали (0, 1/n]
    const intervals = [
      { x2: 400, label: "F₁ = (0, 1]", color: "#3b82f6", yOffset: 150 },
      { x2: 260, label: "F₂ = (0, 1/2]", color: "#2563eb", yOffset: 130 },
      { x2: 213, label: "F₃ = (0, 1/3]", color: "#1d4ed8", yOffset: 110 }
    ];

    intervals.forEach(it => {
      const seg = document.createElementNS("http://www.w3.org/2000/svg", "line");
      seg.setAttribute("x1", "126"); seg.setAttribute("y1", it.yOffset);
      seg.setAttribute("x2", it.x2); seg.setAttribute("y2", it.yOffset);
      seg.setAttribute("stroke", it.color); seg.setAttribute("stroke-width", "4");
      setsGroup.appendChild(seg);

      const cap = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cap.setAttribute("x", it.x2 - 2); cap.setAttribute("y", it.yOffset - 6);
      cap.setAttribute("width", "4"); cap.setAttribute("height", "12");
      cap.setAttribute("fill", it.color);
      setsGroup.appendChild(cap);

      const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      lbl.setAttribute("x", it.x2 + 8); lbl.setAttribute("y", it.yOffset + 4);
      lbl.setAttribute("font-size", "12px"); lbl.setAttribute("font-weight", "700");
      lbl.setAttribute("fill", it.color);
      lbl.textContent = it.label;
      setsGroup.appendChild(lbl);
    });

    //точки
    for (let i = 0; i < 5; i++) {
      const wrap = document.getElementById(`point-wrap-${i}`);
      if (wrap) wrap.style.display = "none";
    }
    const halo = document.getElementById("limit-halo");
    if (halo) halo.style.display = "none";
    return;
  }

  //геометорія
  const confs = (currentMode === "metric") ? metricEllipses : euclideanEllipses;
  
  confs.forEach((c, i) => {
    let el = document.getElementById(`ellipse-${i}`);
    let txt = document.getElementById(`text-f-${i}`);

    if (!el) {
      initSVGDOM();
      el = document.getElementById(`ellipse-${i}`);
      txt = document.getElementById(`text-f-${i}`);
    }

    const visible = i < stepData.setsToShow;
    el.setAttribute("cx", c.cx);
    el.setAttribute("cy", c.cy);
    el.setAttribute("rx", c.rx);
    el.setAttribute("ry", c.ry);
    el.setAttribute("fill", c.color);
    el.setAttribute("fill-opacity", "0.22");
    el.setAttribute("stroke", c.color);
    el.setAttribute("stroke-width", "2");
    el.style.opacity = visible ? "1" : "0";

    txt.setAttribute("x", c.labelX);
    txt.setAttribute("y", c.labelY);
    txt.textContent = c.label;
    txt.style.opacity = visible ? "1" : "0";
  });

  // вимірювання діаметра для поточної множини Fₙ
  const activeIdx = Math.min(stepData.setsToShow - 1, 4);
  const activeConf = confs[activeIdx];
  const diamVal = (activeConf.rx * 2 / 100).toFixed(2);
  diamBadge.textContent = `diam(F${"₁₂₃₄₅"[activeIdx]}) ≈ ${diamVal}`;

  if (stepData.showDiameter) {
    const dLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dLine.setAttribute("x1", activeConf.cx - activeConf.rx);
    dLine.setAttribute("y1", activeConf.cy);
    dLine.setAttribute("x2", activeConf.cx + activeConf.rx);
    dLine.setAttribute("y2", activeConf.cy);
    dLine.setAttribute("stroke", "#dc2626");
    dLine.setAttribute("stroke-dasharray", "4,3");
    dLine.setAttribute("stroke-width", "1.5");
    diamGroup.appendChild(dLine);
  }

  //підпослідовність
  if (stepData.showSubsequence) {
    const subIdxs = [1, 3, 4]; // k_1=2, k_2=4, границя x
    for (let j = 0; j < subIdxs.length - 1; j++) {
      const p1 = pointConfigs[subIdxs[j]];
      const p2 = pointConfigs[subIdxs[j+1]];
      const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
      l.setAttribute("x1", p1.x); l.setAttribute("y1", p1.y);
      l.setAttribute("x2", p2.x); l.setAttribute("y2", p2.y);
      l.setAttribute("stroke", "#059669");
      l.setAttribute("stroke-width", "1.5");
      l.setAttribute("stroke-dasharray", "3,3");
      subLines.appendChild(l);
    }
  }

  //точки і ореол
  const limitWrap = document.getElementById("point-wrap-4");
  const halo = document.getElementById("limit-halo");

  pointConfigs.forEach((_, i) => {
    const wrap = document.getElementById(`point-wrap-${i}`);
    if (!wrap) return;
    const show = i < stepData.pointsToShow;
    wrap.style.display = show ? "inline" : "none";
  });

  //ореол
  const limitVisible = (stepData.pointsToShow >= 5) && stepData.highlightLimit;
  if (halo) {
    halo.setAttribute("cx", pointConfigs[4].x);
    halo.setAttribute("cy", pointConfigs[4].y);
    halo.style.display = limitVisible ? "block" : "none";
  }
  if (limitWrap) {
    limitWrap.style.display = (stepData.pointsToShow >= 5) ? "inline" : "none";
  }
}

function renderMath(element) {
  if (window.renderMathInElement && element) {
    renderMathInElement(element, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

function updateUI() {
  const modeData = dataModes[currentMode];
  const stepData = modeData.steps[currentStep];

  const stmtEl = document.getElementById("statement-text");
  if (stmtEl) {
    stmtEl.innerHTML = modeData.statement;
    renderMath(stmtEl);
  }
  
  const toggleBtn = document.getElementById("mode-toggle-btn");
  if (toggleBtn) {
    toggleBtn.textContent = modeData.buttonLabel;
  }

  const badgeEl = document.getElementById("step-badge");
  if (badgeEl) badgeEl.textContent = `Крок ${currentStep + 1} з ${modeData.steps.length}`;
  
  const titleEl = document.getElementById("step-title");
  if (titleEl) titleEl.textContent = stepData.title;

  const descEl = document.getElementById("step-desc");
  if (descEl) {
    descEl.innerHTML = stepData.desc;
    renderMath(descEl);
  }

  const mathEl = document.getElementById("step-math");
  if (mathEl) {
    mathEl.innerHTML = `$$${stepData.math}$$`;
    renderMath(mathEl);
  }

  updateSVGView(stepData);
  renderIndicators();

  // повзунок 
  const slider = document.getElementById("step-slider");
  const sliderVal = document.getElementById("slider-val");
  if (slider && sliderVal) {
    slider.value = currentStep + 1;
    sliderVal.textContent = currentStep + 1;
  }

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (prevBtn) prevBtn.disabled = (currentStep === 0);
  if (nextBtn) nextBtn.disabled = (currentStep === modeData.steps.length - 1);
}

function renderIndicators() {
  const container = document.getElementById("indicators");
  if (!container) return;
  container.innerHTML = "";
  const steps = dataModes[currentMode].steps;
  steps.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `indicator-dot ${idx === currentStep ? "active" : ""}`;
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Крок ${idx + 1}`);
    dot.onclick = () => {
      currentStep = idx;
      updateUI();
    };
    dot.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        currentStep = idx;
        updateUI();
      }
    };
    container.appendChild(dot);
  });
}

function onSliderInput(val) {
  currentStep = parseInt(val, 10) - 1;
  updateUI();
}

function toggleMode() {
  currentMode = (currentMode === "metric") ? "euclidean" : "metric";
  currentStep = 0;
  updateUI();
}

function nextStep() {
  if (currentStep < dataModes[currentMode].steps.length - 1) {
    currentStep++;
    updateUI();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateUI();
  }
}

function openHelp() {
  const modal = document.getElementById("help-modal");
  if (modal) {
    modal.style.display = "flex";
    isHelpOpen = true;
    renderMath(modal);
  }
}

function closeHelp() {
  const modal = document.getElementById("help-modal");
  if (modal) {
    modal.style.display = "none";
    isHelpOpen = false;
  }
}

function onModalOverlayClick(e) {
  if (e.target.id === "help-modal") {
    closeHelp();
  }
}

//клавіатура для стрілок
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isHelpOpen) {
    closeHelp();
    return;
  }

  //фокус повзунка і стрілки
  if (e.target && e.target.type === "range") {
    return;
  }

  if (!isHelpOpen) {
    if (e.key === "ArrowRight") {
      nextStep();
    } else if (e.key === "ArrowLeft") {
      prevStep();
    }
  }
});

window.addEventListener("load", () => {
  initSVGDOM();
  updateUI();
  const footer = document.querySelector(".footer-bar");
  if (footer) renderMath(footer);
});