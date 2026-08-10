const puzzles = {
  case: {
    step: "00 / 본관",
    title: "찢어진 본향 지도",
    intro: "흩어진 지도 조각을 맞춰 첫 문장을 복원하십시오.",
    code: "MAP-1113",
    message: "첫 지도 조각이 복원되었습니다. 활동 페이지에 코드를 입력하십시오.",
    evidence: ["찢어진 지도", "비어 있는 말씀", "봉인된 사건파일"],
    objective: "문장 조각 9개를 순서대로 배치해 지도 뒷면의 문장을 완성합니다.",
    render: renderMapPuzzle,
  },
  bag: {
    step: "01 / 야외 시설",
    title: "남겨진 배낭",
    intro: "배낭 속 물건과 마음의 짐을 연결하십시오.",
    code: "EMPTY-240",
    message: "배낭이 가벼워졌습니다. 활동 페이지에 코드를 입력하십시오.",
    evidence: ["돌", "돈 봉투", "트로피", "거울", "시계"],
    objective: "각 증거물의 메모를 읽고, 그 물건이 붙잡게 하는 마음을 고릅니다.",
    render: renderBagPuzzle,
  },
  name: {
    step: "02 / 숙소",
    title: "찢어진 이름표",
    intro: "흩어진 이름표 사이에서 믿음의 이름을 복원하십시오.",
    code: "PILGRIM-313",
    message: "찢어진 이름표가 복원되었습니다. 활동 페이지에 코드를 입력하십시오.",
    evidence: ["문패", "찢어진 이름표", "투명 필름"],
    objective: "가짜 이름표 사이에서 히브리서 11:13의 고백을 순서대로 선택합니다.",
    render: renderNamePuzzle,
  },
  ledger: {
    step: "03 / 주방 및 기타 시설",
    title: "비어 있는 장부",
    intro: "내 것이라 적힌 항목을 맡겨진 장부로 옮기십시오.",
    code: "STEWARD-503",
    message: "장부의 주인이 드러났습니다. 활동 페이지에 코드를 입력하십시오.",
    evidence: ["시간 장부", "재능 장부", "관계 장부"],
    objective: "다섯 항목을 모두 맡겨진 것의 칸으로 옮겨 청지기의 장부를 복원합니다.",
    render: renderLedgerPuzzle,
  },
  road: {
    step: "04 / 비아 돌로로사",
    title: "돌아갈 수 있었던 길",
    intro: "흩어진 발자국을 따라 더 나은 본향으로 향하는 길을 여십시오.",
    code: "BETTER-1116",
    message: "길이 열렸습니다. 활동 페이지에 코드를 입력하십시오.",
    evidence: ["두 갈래 길", "발자국 표식", "돌아가는 길"],
    objective: "발자국 카드를 올바른 순서로 눌러 순례자의 선택을 따라갑니다.",
    render: renderRoadPuzzle,
  },
  home: {
    step: "05 / 예배당",
    title: "예비된 성",
    intro: "앞에서 얻은 키워드를 모아 마지막 고백을 완성하십시오.",
    code: "CITY-516",
    message: "사건의 진실이 열렸습니다. 활동 페이지에 마지막 코드를 입력하십시오.",
    evidence: ["지도 조각 6개", "히브리서 11장", "최종 고백문"],
    objective: "앞선 현장의 핵심 단어를 빈칸에 넣어 최종 고백을 완성합니다.",
    render: renderHomePuzzle,
  },
};

const params = new URLSearchParams(window.location.search);
const stageId = params.get("stage") || "case";
const qrToken = params.get("qr");
const expectedQrToken = window.HomewardSync?.config?.qrToken || window.HOMEWARD_CONFIG?.qrToken || "rodem-2026";
const puzzle = puzzles[stageId] || puzzles.case;
const gameBoard = document.querySelector("#gameBoard");
const codePanel = document.querySelector("#codePanel");
const codeValue = document.querySelector("#codeValue");
const codeMessage = document.querySelector("#codeMessage");
const guideLink = document.querySelector("#guideLink");
const completeLink = document.querySelector("#completeLink");
let solved = false;

if (qrToken !== expectedQrToken) {
  document.querySelector("#gameStep").textContent = "Locked";
  document.querySelector("#gameTitle").textContent = "현장 QR이 필요합니다";
  document.querySelector("#gameIntro").textContent = "이 퍼즐은 현장에 숨겨진 QR을 스캔해야 열립니다.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <section class="locked-panel">
      <strong>잠긴 사건파일</strong>
      <p>활동 페이지로 돌아가 현재 현장의 QR을 찾으십시오. 운영자 QR 카드에서 생성된 링크로만 퍼즐이 열립니다.</p>
      <a class="primary-button" href="activity.html">활동 페이지로 돌아가기</a>
    </section>
  `;
} else {
  document.querySelector("#gameStep").textContent = puzzle.step;
  document.querySelector("#gameTitle").textContent = puzzle.title;
  document.querySelector("#gameIntro").textContent = puzzle.intro;
  guideLink.href = `activity.html?stage=${stageId}`;
  completeLink.href = `activity.html?stage=${stageId}`;
  renderShell();
  puzzle.render();
}

function renderShell() {
  gameBoard.innerHTML = `
    <section class="case-brief">
      <div>
        <p class="eyebrow">Mission</p>
        <h2>${puzzle.objective}</h2>
      </div>
      <div class="evidence-strip">
        ${puzzle.evidence.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
    <section class="puzzle-surface" id="puzzleSurface"></section>
  `;
}

function unlock() {
  if (solved) return;
  solved = true;
  localStorage.setItem(`homeward-solved-${stageId}`, "true");
  codeValue.textContent = puzzle.code;
  codeMessage.textContent = puzzle.message;
  codePanel.hidden = false;
  codePanel.classList.add("revealed");
  codePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderMapPuzzle() {
  const target = ["본", "향", "을", "향", "한", "순", "례", "의", "길"];
  const pool = shuffle([...target]);
  const placed = Array(target.length).fill("");
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">조각을 눌러 빈 지도 칸에 올리십시오. 잘못 올린 조각은 칸을 누르면 다시 빠집니다.</p>
    <div class="map-workbench">
      <div class="map-slots" id="mapSlots" aria-label="지도 문장 칸"></div>
      <div class="map-pool" id="mapPool" aria-label="지도 조각"></div>
    </div>
    <div class="check-line">
      <button class="primary-button" type="button" id="checkPuzzle">문장 확인</button>
      <button class="secondary-button" type="button" id="resetPuzzle">다시 배치</button>
    </div>
    <p class="feedback" id="feedback">지도 뒷면에는 아홉 글자의 문장이 남아 있습니다.</p>
  `;

  const slots = document.querySelector("#mapSlots");
  const poolEl = document.querySelector("#mapPool");
  const feedback = document.querySelector("#feedback");

  function draw() {
    slots.innerHTML = placed
      .map((letter, index) => `<button type="button" class="${letter ? "filled" : ""}" data-slot="${index}">${letter || index + 1}</button>`)
      .join("");
    poolEl.innerHTML = pool
      .map((letter, index) => `<button type="button" ${letter ? "" : "disabled"} data-chip="${index}">${letter || ""}</button>`)
      .join("");

    slots.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const slot = Number(button.dataset.slot);
        if (!placed[slot]) return;
        const emptyIndex = pool.findIndex((item) => item === "");
        pool[emptyIndex] = placed[slot];
        placed[slot] = "";
        draw();
      });
    });

    poolEl.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const chip = Number(button.dataset.chip);
        const slot = placed.findIndex((item) => !item);
        if (slot === -1 || !pool[chip]) return;
        placed[slot] = pool[chip];
        pool[chip] = "";
        draw();
      });
    });
  }

  document.querySelector("#checkPuzzle").addEventListener("click", () => {
    if (placed.some((item) => !item)) {
      feedback.textContent = "아직 빈칸이 남아 있습니다.";
      return;
    }
    if (placed.join("") === target.join("")) {
      feedback.textContent = "지도 뒷면 문장이 복원되었습니다.";
      unlock();
      return;
    }
    feedback.textContent = "문장이 어색합니다. ‘본향’이 어디를 향하는지 다시 보십시오.";
  });

  document.querySelector("#resetPuzzle").addEventListener("click", () => {
    pool.splice(0, pool.length, ...shuffle([...target]));
    placed.fill("");
    feedback.textContent = "지도 조각을 다시 섞었습니다.";
    draw();
  });

  draw();
}

function renderBagPuzzle() {
  const pairs = {
    stone: "두려움",
    money: "소유",
    trophy: "인정",
    mirror: "자기중심",
    clock: "조급함",
  };
  const items = [
    { id: "stone", name: "돌", memo: "넘어질까 봐 늘 품고 다닌 무게" },
    { id: "money", name: "돈 봉투", memo: "잃으면 끝이라고 믿게 한 봉투" },
    { id: "trophy", name: "트로피", memo: "사람들의 박수가 멈추면 불안해지는 증거" },
    { id: "mirror", name: "거울", memo: "내 모습만 계속 확인하게 만든 물건" },
    { id: "clock", name: "시계", memo: "기다림을 견디지 못하게 한 소리" },
  ];
  const options = ["선택", "두려움", "소유", "인정", "자기중심", "조급함"];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">증거 메모를 읽고 각 물건이 상징하는 마음의 짐을 선택하십시오.</p>
    <div class="evidence-match">
      ${items
        .map(
          (item) => `
            <article class="evidence-card">
              <strong>${item.name}</strong>
              <p>${item.memo}</p>
              <select data-item="${item.id}" aria-label="${item.name}의 마음의 짐">
                ${options.map((option) => `<option value="${option === "선택" ? "" : option}">${option}</option>`).join("")}
              </select>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="check-line"><button class="primary-button" type="button" id="checkPuzzle">배낭 무게 확인</button></div>
    <p class="feedback" id="feedback">모든 물건을 맞게 해석하면 배낭이 가벼워집니다.</p>
  `;

  document.querySelector("#checkPuzzle").addEventListener("click", () => {
    const selects = [...surface.querySelectorAll("select")];
    const correct = selects.every((select) => select.value === pairs[select.dataset.item]);
    selects.forEach((select) => {
      select.closest(".evidence-card").dataset.status = select.value === pairs[select.dataset.item] ? "correct" : "miss";
    });
    document.querySelector("#feedback").textContent = correct
      ? "배낭 속 짐의 이름을 모두 밝혔습니다."
      : "아직 무게가 남아 있습니다. 메모의 감정을 다시 읽어보십시오.";
    if (correct) unlock();
  });
}

function renderNamePuzzle() {
  const target = ["나", "그", "네"];
  const choices = [
    { value: "성", label: "성공한 사람" },
    { value: "나", label: "나" },
    { value: "공", label: "공로자" },
    { value: "그", label: "그" },
    { value: "비", label: "비교 대상" },
    { value: "교", label: "교만한 이름" },
    { value: "네", label: "네" },
    { value: "인", label: "인기 있는 사람" },
    { value: "기", label: "기록 보유자" },
  ];
  const picked = [];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">찢어진 조각을 순서대로 눌러 믿음의 사람들이 고백한 이름을 복원하십시오.</p>
    <div class="name-output" id="nameOutput">_ _ _</div>
    <div class="choice-grid name-grid">
      ${choices.map((choice) => `<button type="button" data-choice="${choice.value}"><strong>${choice.value}</strong><small>${choice.label}</small></button>`).join("")}
    </div>
    <div class="check-line"><button class="secondary-button" type="button" id="resetPuzzle">선택 초기화</button></div>
    <p class="feedback" id="feedback">히브리서 11:13의 자기 고백을 찾으십시오.</p>
  `;

  surface.querySelectorAll(".choice-grid button").forEach((button) => {
    button.addEventListener("click", () => {
      if (picked.length >= target.length || button.classList.contains("selected")) return;
      picked.push(button.dataset.choice);
      button.classList.add("selected");
      updateNameOutput();
      if (picked.length === target.length && picked.join("") === target.join("")) {
        document.querySelector("#feedback").textContent = "믿음의 이름표가 복원되었습니다.";
        unlock();
      } else if (picked.length === target.length) {
        document.querySelector("#feedback").textContent = "이 이름표는 순례자의 고백이 아닙니다. 다시 선택하십시오.";
      }
    });
  });

  document.querySelector("#resetPuzzle").addEventListener("click", () => {
    picked.splice(0, picked.length);
    surface.querySelectorAll(".choice-grid button").forEach((item) => item.classList.remove("selected"));
    updateNameOutput();
    document.querySelector("#feedback").textContent = "선택을 초기화했습니다.";
  });

  function updateNameOutput() {
    document.querySelector("#nameOutput").textContent = target.map((_, index) => picked[index] || "_").join(" ");
  }
}

function renderLedgerPuzzle() {
  const chips = [
    { id: "time", label: "시간", note: "나의 일정" },
    { id: "money", label: "돈", note: "나의 소유" },
    { id: "talent", label: "재능", note: "나의 능력" },
    { id: "relationship", label: "관계", note: "나의 사람" },
    { id: "heart", label: "마음", note: "나의 중심" },
  ];
  const moved = new Set();
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">왼쪽 장부의 항목을 눌러 오른쪽 “맡겨진 것” 장부로 옮기십시오.</p>
    <div class="ledger-board">
      <section>
        <h3>내 것이라고 적힌 장부</h3>
        <div class="ledger-list" id="ownedList">
          ${chips.map((chip) => `<button type="button" class="ledger-chip" data-chip="${chip.id}"><strong>${chip.label}</strong><small>${chip.note}</small></button>`).join("")}
        </div>
      </section>
      <section>
        <h3>맡겨진 것의 장부</h3>
        <div class="ledger-list received" id="receivedList"></div>
      </section>
    </div>
    <p class="feedback" id="feedback">맡겨진 항목: 0 / ${chips.length}</p>
  `;

  document.querySelectorAll(".ledger-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const chip = chips.find((item) => item.id === button.dataset.chip);
      moved.add(chip.id);
      button.remove();
      document.querySelector("#receivedList").insertAdjacentHTML(
        "beforeend",
        `<span class="received-chip"><strong>${chip.label}</strong><small>맡겨진 것</small></span>`,
      );
      document.querySelector("#feedback").textContent = `맡겨진 항목: ${moved.size} / ${chips.length}`;
      if (moved.size === chips.length) unlock();
    });
  });
}

function renderRoadPuzzle() {
  const sequence = ["믿음", "떠남", "사모함", "더 나은 본향"];
  const options = ["돌아감", "믿음", "안주", "떠남", "사모함", "비교", "더 나은 본향", "멈춤"];
  const picked = [];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">발자국을 올바른 순서로 누르십시오. 틀린 길을 누르면 처음부터 다시 시작합니다.</p>
    <div class="path-progress" id="pathProgress">길: 아직 시작하지 않음</div>
    <div class="path-grid">
      ${options.map((option) => `<button type="button" data-path="${option}"><span>발자국</span><strong>${option}</strong></button>`).join("")}
    </div>
    <p class="feedback" id="feedback">순례자는 돌아갈 기회가 있었지만 다른 방향을 택했습니다.</p>
  `;

  surface.querySelectorAll(".path-grid button").forEach((button) => {
    button.addEventListener("click", () => {
      const expected = sequence[picked.length];
      if (button.dataset.path !== expected) {
        picked.splice(0, picked.length);
        surface.querySelectorAll(".path-grid button").forEach((item) => item.classList.remove("done"));
        document.querySelector("#pathProgress").textContent = "길: 다시 시작";
        document.querySelector("#feedback").textContent = "그 길은 본향을 향하지 않습니다. 첫 발자국부터 다시 가십시오.";
        return;
      }
      picked.push(button.dataset.path);
      button.classList.add("done");
      document.querySelector("#pathProgress").textContent = `길: ${picked.join(" > ")}`;
      document.querySelector("#feedback").textContent = `${picked.length}번째 발자국을 확인했습니다.`;
      if (picked.length === sequence.length) unlock();
    });
  });
}

function renderHomePuzzle() {
  const blanks = [
    { label: "우리는 이 땅에서", answer: "나그네", placeholder: "두 번째 현장 키워드" },
    { label: "삶은 주께 맡겨진", answer: "청지기", placeholder: "세 번째 현장 키워드" },
    { label: "우리가 사모하는 곳은", answer: "더 나은 본향", placeholder: "네 번째 현장 키워드" },
    { label: "그래서 우리는", answer: "순례자", placeholder: "최종 정체성" },
  ];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">앞에서 얻은 키워드를 넣어 마지막 고백문을 완성하십시오.</p>
    <div class="confession-card">
      ${blanks
        .map(
          (blank) => `
            <label>
              <span>${blank.label}</span>
              <input data-answer="${blank.answer}" placeholder="${blank.placeholder}" />
            </label>
          `,
        )
        .join("")}
    </div>
    <div class="check-line"><button class="primary-button" type="button" id="checkPuzzle">고백 완성</button></div>
    <p class="feedback" id="feedback">띄어쓰기는 달라도 괜찮습니다. 핵심 단어를 정확히 입력하십시오.</p>
  `;

  document.querySelector("#checkPuzzle").addEventListener("click", () => {
    const inputs = [...surface.querySelectorAll("input")];
    const correct = inputs.every((input) => normalize(input.value) === normalize(input.dataset.answer));
    inputs.forEach((input) => {
      input.dataset.status = normalize(input.value) === normalize(input.dataset.answer) ? "correct" : "miss";
    });
    document.querySelector("#feedback").textContent = correct
      ? "최종 고백이 완성되었습니다."
      : "아직 고백이 완성되지 않았습니다. 사건파일의 키워드를 다시 확인하십시오.";
    if (correct) unlock();
  });
}

function getSurface() {
  return document.querySelector("#puzzleSurface");
}

function normalize(value) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}

function shuffle(items) {
  return items
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}
