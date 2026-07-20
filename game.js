const puzzles = {
  case: {
    step: "00 / 본관",
    title: "찢어진 본향 지도",
    intro: "흩어진 지도 조각을 순서대로 맞추면 첫 번째 완료 코드가 열립니다.",
    code: "MAP-1113",
    message: "첫 지도 조각이 복원되었습니다. 활동 페이지에 코드를 입력하십시오.",
    render: renderMapPuzzle,
  },
  bag: {
    step: "01 / 야외 시설",
    title: "남겨진 배낭",
    intro: "배낭 속 물건이 상징하는 마음의 짐을 바르게 연결하십시오.",
    code: "EMPTY-240",
    message: "배낭이 가벼워졌습니다. 활동 페이지에 코드를 입력하십시오.",
    render: renderBagPuzzle,
  },
  name: {
    step: "02 / 숙소",
    title: "찢어진 이름표",
    intro: "가짜 이름표 사이에서 믿음의 사람들이 고백한 이름을 순서대로 선택하십시오.",
    code: "PILGRIM-313",
    message: "찢어진 이름표가 복원되었습니다. 활동 페이지에 코드를 입력하십시오.",
    render: renderNamePuzzle,
  },
  ledger: {
    step: "03 / 주방 및 기타 시설",
    title: "비어 있는 장부",
    intro: "내 것이라고 붙들던 항목을 맡겨진 것의 장부로 옮기십시오.",
    code: "STEWARD-503",
    message: "장부의 주인이 드러났습니다. 활동 페이지에 코드를 입력하십시오.",
    render: renderLedgerPuzzle,
  },
  road: {
    step: "04 / 비아 돌로로사",
    title: "돌아갈 수 있었던 길",
    intro: "발자국을 올바른 순서로 따라가 더 나은 본향으로 향하는 길을 여십시오.",
    code: "BETTER-1116",
    message: "길이 열렸습니다. 활동 페이지에 코드를 입력하십시오.",
    render: renderRoadPuzzle,
  },
  home: {
    step: "05 / 예배당",
    title: "예비된 성",
    intro: "앞에서 얻은 키워드를 넣어 마지막 고백을 완성하십시오.",
    code: "CITY-516",
    message: "사건의 진실이 열렸습니다. 활동 페이지에 마지막 코드를 입력하십시오.",
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

if (qrToken !== expectedQrToken) {
  document.querySelector("#gameStep").textContent = "Locked";
  document.querySelector("#gameTitle").textContent = "현장 QR이 필요합니다";
  document.querySelector("#gameIntro").textContent = "이 퍼즐은 현장에 숨겨진 QR을 스캔해야 열립니다.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <p class="instruction">활동 페이지로 돌아가 현재 현장의 QR을 찾으십시오. 운영자 QR 카드에서 생성된 링크로만 퍼즐이 열립니다.</p>
  `;
} else {
  document.querySelector("#gameStep").textContent = puzzle.step;
  document.querySelector("#gameTitle").textContent = puzzle.title;
  document.querySelector("#gameIntro").textContent = puzzle.intro;
  guideLink.href = `activity.html?stage=${stageId}`;
  completeLink.href = `activity.html?stage=${stageId}`;
  puzzle.render();
}

function unlock() {
  codeValue.textContent = puzzle.code;
  codeMessage.textContent = puzzle.message;
  codePanel.hidden = false;
  codePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderMapPuzzle() {
  let selected = null;
  const target = ["본", "향", "을", "향", "한", "순", "례", "의", "길"];
  let tiles = ["향", "순", "본", "길", "한", "을", "의", "례", "향"];
  gameBoard.innerHTML = `
    <p class="instruction">두 조각을 차례로 눌러 위치를 바꾸십시오. 문장이 완성되면 코드가 열립니다.</p>
    <div class="tile-grid" id="tileGrid"></div>
    <p class="feedback" id="feedback"></p>
  `;
  const grid = document.querySelector("#tileGrid");
  const feedback = document.querySelector("#feedback");

  function draw() {
    grid.innerHTML = tiles
      .map((tile, index) => `<button type="button" class="${selected === index ? "selected" : ""}" data-index="${index}">${tile}</button>`)
      .join("");
    grid.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        if (selected === null) {
          selected = index;
        } else {
          [tiles[selected], tiles[index]] = [tiles[index], tiles[selected]];
          selected = null;
        }
        draw();
        if (tiles.join("") === target.join("")) unlock();
      });
    });
  }

  feedback.textContent = "완성 문장: 본향을 향한 순례의 길";
  draw();
}

function renderBagPuzzle() {
  const pairs = {
    돌: "두려움",
    "돈 봉투": "소유",
    트로피: "인정",
    거울: "자기중심",
    시계: "조급함",
  };
  const options = ["선택", "두려움", "소유", "인정", "자기중심", "조급함"];
  gameBoard.innerHTML = `
    <p class="instruction">각 물건이 상징하는 마음의 짐을 선택하십시오.</p>
    <div class="match-list">
      ${Object.keys(pairs)
        .map(
          (item) => `
            <label class="match-row">
              <strong>${item}</strong>
              <select data-item="${item}">
                ${options.map((option) => `<option value="${option === "선택" ? "" : option}">${option}</option>`).join("")}
              </select>
            </label>
          `,
        )
        .join("")}
    </div>
    <div class="check-line"><button class="primary-button" type="button" id="checkPuzzle">확인</button></div>
    <p class="feedback" id="feedback"></p>
  `;
  document.querySelector("#checkPuzzle").addEventListener("click", () => {
    const correct = [...gameBoard.querySelectorAll("select")].every((select) => select.value === pairs[select.dataset.item]);
    document.querySelector("#feedback").textContent = correct ? "" : "아직 배낭이 무겁습니다. 물건의 메모를 다시 보십시오.";
    if (correct) unlock();
  });
}

function renderNamePuzzle() {
  const target = ["나", "그", "네"];
  const choices = ["성", "나", "공", "그", "비", "교", "네", "인", "기"];
  const picked = [];
  gameBoard.innerHTML = `
    <p class="instruction">믿음의 사람들이 스스로를 부른 이름을 순서대로 누르십시오.</p>
    <div class="choice-grid">
      ${choices.map((choice) => `<button type="button" data-choice="${choice}">${choice}</button>`).join("")}
    </div>
    <p class="feedback" id="feedback">선택: </p>
  `;
  gameBoard.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      picked.push(button.dataset.choice);
      button.classList.add("selected");
      document.querySelector("#feedback").textContent = `선택: ${picked.join(" ")}`;
      if (picked.length === target.length && picked.join("") === target.join("")) unlock();
      if (picked.length >= target.length && picked.join("") !== target.join("")) {
        picked.splice(0, picked.length);
        gameBoard.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
        document.querySelector("#feedback").textContent = "순서가 맞지 않습니다. 다시 선택하십시오.";
      }
    });
  });
}

function renderLedgerPuzzle() {
  const chips = ["시간", "돈", "재능", "관계", "마음"];
  const moved = new Set();
  gameBoard.innerHTML = `
    <p class="instruction">모든 항목을 눌러 “맡겨진 것” 장부로 옮기십시오.</p>
    <div class="chip-grid">
      ${chips.map((chip) => `<button class="chip" type="button" data-chip="${chip}">${chip}<br><small>내 것</small></button>`).join("")}
    </div>
    <p class="feedback" id="feedback">맡겨진 항목: 0 / ${chips.length}</p>
  `;
  gameBoard.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      moved.add(button.dataset.chip);
      button.classList.add("selected");
      button.innerHTML = `${button.dataset.chip}<br><small>맡겨진 것</small>`;
      document.querySelector("#feedback").textContent = `맡겨진 항목: ${moved.size} / ${chips.length}`;
      if (moved.size === chips.length) unlock();
    });
  });
}

function renderRoadPuzzle() {
  const sequence = ["믿음", "떠남", "사모함", "더 나은 본향"];
  const options = ["돌아감", "믿음", "안주", "떠남", "사모함", "비교", "더 나은 본향", "멈춤"];
  const picked = [];
  gameBoard.innerHTML = `
    <p class="instruction">발자국을 올바른 순서로 누르십시오.</p>
    <div class="path-grid">
      ${options.map((option) => `<button type="button" data-path="${option}">발자국<br><strong>${option}</strong></button>`).join("")}
    </div>
    <p class="feedback" id="feedback">길: </p>
  `;
  gameBoard.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const expected = sequence[picked.length];
      if (button.dataset.path !== expected) {
        picked.splice(0, picked.length);
        gameBoard.querySelectorAll("button").forEach((item) => item.classList.remove("done"));
        document.querySelector("#feedback").textContent = "길이 끊겼습니다. 첫 발자국부터 다시 가십시오.";
        return;
      }
      picked.push(button.dataset.path);
      button.classList.add("done");
      document.querySelector("#feedback").textContent = `길: ${picked.join(" → ")}`;
      if (picked.length === sequence.length) unlock();
    });
  });
}

function renderHomePuzzle() {
  gameBoard.innerHTML = `
    <p class="instruction">빈칸에 앞에서 얻은 핵심 단어를 입력하십시오.</p>
    <div class="blank-grid">
      <label>우리는 이 땅에서 <input data-answer="나그네" placeholder="두 번째 키워드" /></label>
      <label>내 삶은 주께 맡겨진 <input data-answer="청지기" placeholder="세 번째 키워드" />의 삶입니다.</label>
      <label>우리는 <input data-answer="더 나은 본향" placeholder="네 번째 키워드" />을 향해 걷습니다.</label>
    </div>
    <div class="check-line"><button class="primary-button" type="button" id="checkPuzzle">고백 완성</button></div>
    <p class="feedback" id="feedback"></p>
  `;
  document.querySelector("#checkPuzzle").addEventListener("click", () => {
    const correct = [...gameBoard.querySelectorAll("input")].every((input) => normalize(input.value) === normalize(input.dataset.answer));
    document.querySelector("#feedback").textContent = correct ? "" : "아직 고백이 완성되지 않았습니다. 앞에서 얻은 키워드를 다시 확인하십시오.";
    if (correct) unlock();
  });
}

function normalize(value) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}
