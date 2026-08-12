const puzzles = {
  case: {
    step: "00 / 본관",
    title: "조작된 사건파일",
    intro: "본관 접수 기록의 이상한 문장을 해석해 첫 정체성을 찾으십시오.",
    code: "PILGRIM-00",
    keyword: "나그네",
    message: "첫 키워드 '나그네'를 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["접수 기록", "사건 메모", "미도착 명단"],
    objective: "현장 사건 메모를 근거로, 아직 목적지에 이르지 않은 조사팀의 정체성을 추리합니다.",
    render: renderCasePuzzle,
  },
  bag: {
    step: "01 / 야외 시설",
    title: "너무 오래 머문 자리",
    intro: "쉬는 자리를 집으로 착각하게 만든 네 표식을 찾아 잠긴 봉투를 여십시오.",
    code: "TENT-01",
    keyword: "장막",
    message: "봉투 속 '장막 카드'를 확보하십시오. 활동 페이지에 완료 코드를 입력하면 다음 장소가 열립니다.",
    evidence: ["그늘 표식", "벤치 표식", "돌 표식", "길목 표식", "4자리 자물쇠"],
    objective: "야외 시설에서 네 표식의 숫자를 찾고, 화면이 제시하는 순서대로 조합해 봉투 자물쇠를 엽니다.",
    render: renderFieldPuzzle,
  },
  name: {
    step: "02 / 숙소",
    title: "잠긴 휴대폰",
    intro: "잠금화면 알림과 숙소 문 앞 안내문을 대조해 휴대폰을 여십시오.",
    code: "PROMISE-02",
    keyword: "약속",
    message: "세 번째 키워드 '약속'을 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["알림 2개", "0316", "사진 3장", "원본 약속 카드", "메모"],
    objective: "알림과 현장 기록으로 휴대폰을 열고, 사진의 상태와 메모 수정 이력으로 원본을 판별합니다.",
    render: renderPhonePuzzleV2,
  },
  ledger: {
    step: "03 / 주방 및 기타 시설",
    title: "맡겨진 것을 바꾼 사람",
    intro: "원래 선반과 변경 기록, 담당 권한을 대조해 조작한 사람을 찾으십시오.",
    code: "STEWARD-03",
    keyword: "청지기",
    message: "네 번째 키워드 '청지기'를 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["역할 분담", "재고 카드 6장", "변경 기록", "권한표", "3자리 자물쇠"],
    objective: "카드의 원래 위치를 복원하고 기록과 권한을 감식해 물리 자물쇠의 순서를 찾습니다.",
    render: renderInventoryPuzzleV2,
  },
  road: {
    step: "04 / 비아 돌로로사",
    title: "돌아갈 수 있었던 길",
    intro: "네 사람의 기억으로 루프를 통과하고, 길처럼 보인 방향을 기록으로 다시 읽으십시오.",
    code: "BETTER-04",
    keyword: "더 나은 본향",
    message: "다섯 번째 키워드 '더 나은 본향'을 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["기억 담당 A~D", "4개 루프", "문장 조각", "방향 홈", "실제 자물쇠"],
    objective: "분담한 현장 기억으로 네 갈림길을 통과하고 문장과 방향 기록의 의미를 복원합니다.",
    render: renderLoopPuzzleV2,
  },
  home: {
    step: "05 / 예배당",
    title: "예비된 성",
    intro: "앞선 장소의 키워드를 모두 회수해 마지막 고백문을 완성하십시오.",
    code: "HOMEWARD-05",
    keyword: "예비된 성",
    message: "최종 사건파일이 열렸습니다. 활동 페이지에 마지막 코드를 입력하십시오.",
    evidence: ["키워드 5개", "색상 순서", "최종 선언문", "팀 이름"],
    objective: "앞선 키워드를 순서대로 배치하고 팀 이름으로 귀향 선언문을 완성합니다.",
    render: renderHomePuzzle,
  },
};

const params = new URLSearchParams(window.location.search);
const stageId = params.get("stage") || "case";
const qrToken = params.get("qr");
const expectedQrToken = window.HomewardSync?.config?.qrToken || window.HOMEWARD_CONFIG?.qrToken || "rodem-2026";
const adminPreview = params.get("admin") === "1" && localStorage.getItem("homeward-admin-preview") === "true";
const puzzle = puzzles[stageId] || puzzles.case;
const coreStageIds = ["case", "bag", "name", "ledger", "road"];
const finalPrerequisitesComplete = coreStageIds.every((id) => localStorage.getItem(`homeward-solved-${id}`) === "true");
const gameBoard = document.querySelector("#gameBoard");
const codePanel = document.querySelector("#codePanel");
const codeValue = document.querySelector("#codeValue");
const codeMessage = document.querySelector("#codeMessage");
const guideLink = document.querySelector("#guideLink");
const completeLink = document.querySelector("#completeLink");
let solved = false;

function loadPuzzleState(id, fallback) {
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(`homeward-game-${id}`)) };
  } catch {
    return { ...fallback };
  }
}

function savePuzzleState(id, state) {
  localStorage.setItem(`homeward-game-${id}`, JSON.stringify(state));
}

if (qrToken !== expectedQrToken && !adminPreview) {
  document.querySelector("#gameStep").textContent = "Locked";
  document.querySelector("#gameTitle").textContent = "현장 QR이 필요합니다";
  document.querySelector("#gameIntro").textContent = "이 퍼즐은 현장에 숨겨진 QR을 스캔해야 열립니다.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <section class="locked-panel">
      <strong>잠긴 사건파일</strong>
      <p>활동 페이지로 돌아가 현재 현장의 QR을 찾으십시오. 진행자는 대시보드의 게임 실행 페이지에서 미리 열어볼 수 있습니다.</p>
      <a class="primary-button" href="activity.html">활동 페이지로 돌아가기</a>
    </section>
  `;
} else if (stageId === "home" && !finalPrerequisitesComplete && !adminPreview) {
  document.querySelector("#gameStep").textContent = "05 / 잠김";
  document.querySelector("#gameTitle").textContent = "아직 열리지 않은 예배당";
  document.querySelector("#gameIntro").textContent = "앞선 다섯 현장의 키워드를 모두 회수한 뒤 마지막 QR을 여십시오.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <section class="locked-panel">
      <strong>최종 사건파일 잠금</strong>
      <p>00~04 현장을 모두 완료하면 예배당의 마지막 기록이 열립니다. 활동 페이지에서 아직 찾지 못한 키워드를 확인하십시오.</p>
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
  localStorage.setItem(`homeward-keyword-${stageId}`, puzzle.keyword);
  codeValue.textContent = puzzle.code;
  codeMessage.textContent = puzzle.message;
  codePanel.hidden = false;
  codePanel.classList.add("revealed");
  codePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderCasePuzzle() {
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">본관 접수대의 사건 메모를 읽고, 우리 팀이 어떤 상태로 기록되었는지 추리하십시오.</p>
    <div class="reception-puzzle">
      <section class="reception-record">
        <span>현장 사건 메모</span>
        <h3>CASE H-11-13</h3>
        <dl>
          <div><dt>접수 시각</dt><dd>11:13</dd></div>
          <div><dt>조사팀 상태</dt><dd>미도착</dd></div>
          <div><dt>현재 위치</dt><dd>본관 접수대</dd></div>
          <div><dt>최종 목적지</dt><dd>미기록</dd></div>
        </dl>
        <div class="story-clue-list">
          <p>도착한 팀은 접수 명단에서 사라진다.</p>
          <p>아직 길 위에 있는 팀만 이름을 남긴다.</p>
          <p>기록자는 사건번호 앞의 <strong>H</strong>를 지우지 말라고 했다.</p>
          <p>11:13은 시간이 아니라, 기록을 여는 위치다.</p>
          <p>본관은 목적지가 아니라 접수 지점이다.</p>
        </div>
      </section>
      <section class="unlock-terminal">
        <div class="deduction-brief">
          <p class="eyebrow">Investigation</p>
          <h3>질문은 하나입니다</h3>
          <p>본관에 도착했지만, 최종 목적지는 아직 기록되지 않았습니다. 접수 명단에는 도착한 팀이 아니라 아직 길 위에 있는 팀만 남습니다.</p>
          <p class="verse-hint">H-11-13은 이 정체성을 나중에 확인해 줄 기록입니다. 지금은 사건 메모만으로 먼저 추리하십시오.</p>
        </div>
        <form id="identityForm">
          <label for="identityInput">아직 목적지에 이르지 않은 조사팀의 정체성</label>
          <input id="identityInput" autocomplete="off" placeholder="정체성 한 단어" />
          <button class="primary-button" type="submit">정체성 확인</button>
        </form>
        <div class="verse-panel" id="versePanel" hidden>
          <p class="eyebrow">Hebrews 11:13</p>
          <blockquote>또 땅에서는 나그네와 외국인임을 증언하였으니</blockquote>
          <p>사건번호 H-11-13은 이 정체성을 확인하는 기록이었습니다.</p>
        </div>
      </section>
    </div>
    <p class="feedback" id="feedback">입력은 하나입니다. 사건 메모의 의미를 팀끼리 먼저 말로 정리해 보십시오.</p>
  `;

  document.querySelector("#identityForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = normalize(document.querySelector("#identityInput").value);
    if (keyword === "나그네") {
      document.querySelector("#versePanel").hidden = false;
      document.querySelector("#feedback").textContent = "본관은 접수 지점이었습니다. 아직 길 위에 있는 첫 정체성 기록이 복원되었습니다.";
      unlock();
      return;
    }
    document.querySelector("#feedback").textContent = "아직 정체성이 맞지 않습니다. 도착하지 않았고, 목적지도 미기록인 채 길 위에 있는 사람을 떠올려 보십시오.";
  });
}

function renderFieldPuzzle() {
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">야외 시설에 숨겨진 숫자 표식 4개를 찾으십시오. 이 화면은 자물쇠 번호를 입력하는 곳이 아니라, 표식을 읽는 순서를 알려 주는 현장 지시문입니다.</p>
    <div class="field-map">
      <article><span>첫 번째</span><strong>그늘 아래 오래 머문 자리</strong><p>가장 편한 곳부터 확인하고, 현장 표식의 숫자를 기록하십시오.</p></article>
      <article><span>두 번째</span><strong>둘이 앉지만 한 방향을 보는 자리</strong><p>벤치나 의자 주변에서 두 번째 숫자를 찾으십시오.</p></article>
      <article><span>세 번째</span><strong>무게가 놓인 낮은 자리</strong><p>돌 또는 낮은 구조물 주변의 표식을 확인하십시오.</p></article>
      <article><span>네 번째</span><strong>다시 길이 갈라지는 자리</strong><p>길목의 마지막 표식을 읽고 네 자리 번호를 완성하십시오.</p></article>
    </div>
    <div class="lock-result">
      <strong>다음 행동</strong>
      <p>네 자리 숫자를 찾았다면 실제 자물쇠 봉투를 여십시오. 봉투 안에 들어 있는 완료 코드를 활동 페이지에 입력하면 다음 장소가 열립니다.</p>
      <a class="primary-button" href="activity.html?stage=bag">활동 페이지로 돌아가기</a>
    </div>
    <p class="feedback" id="feedback">쉬는 자리는 필요하지만, 목적지가 되면 길을 멈추게 합니다.</p>
  `;
}

function renderPhonePuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("name", { notices: [], unlocked: false, photos: [], original: "", memo: false, solved: false, attempts: 0 });
  const photos = [
    { id: "success", title: "성공한 사람", stamp: "임시 발급 · 반납 대상" },
    { id: "approval", title: "인정받는 사람", stamp: "임시 발급 · 반납 대상" },
    { id: "promise", title: "약속 카드 03/16", stamp: "원본 · 수정 없음" },
  ];
  surface.innerHTML = `<p class="instruction">알림 → 현장 암호 → 사진 3장 대조 → 원본 선택 → 메모 복원 순서로 확인하십시오.</p><div class="phone-board"><section class="phone-device"><div class="phone-island"></div><div class="phone-topbar"><span>11:13</span><span>숙소 Wi-Fi</span></div><div id="phoneFlow"></div><div class="phone-homebar"></div></section><section class="phone-investigation"><div class="deduction-steps"><strong>포렌식 진행</strong><ol><li>엄마와 룸메이트 알림을 각각 펼친다.</li><li>문 앞의 약속한 날을 MMDD로 입력한다.</li><li>사진 세 장의 상태 도장을 모두 확대한다.</li><li>원본 기록을 골라 메모 마지막 줄을 복원한다.</li></ol></div>${adminPreview ? `<div class="fragment-board admin-preview-only"><p class="eyebrow">관리자 미리보기</p><h3>현장 기록 후보</h3><p>약속 카드 수령일 03/16 · 임시 이름표 2장 · 퇴실 안내 11:13</p><button class="secondary-button" id="resetStage" type="button">이 스테이지 초기화</button></div>` : ""}</section></div><p class="feedback" id="feedback" aria-live="polite"></p>`;
  const screen = document.querySelector("#phoneFlow");
  const feedback = document.querySelector("#feedback");
  const persist = () => savePuzzleState("name", state);
  function updatePasscodeDots() {
    const length = document.querySelector("#phoneCode")?.value.length || 0;
    screen.querySelectorAll(".passcode-dots span").forEach((dot, index) => dot.classList.toggle("filled", index < length));
  }
  function draw() {
    if (!state.unlocked) {
      const notices = [["mom", "엄마", "약속한 날은 숙소 문 앞 기록에 남겨뒀어."], ["roommate", "룸메이트", "비밀번호 형식은 MMDD야."]];
      screen.innerHTML = `<div class="phone-lockscreen"><p>잠긴 휴대폰</p><strong>11:13</strong><span>${state.notices.length}/2 알림 확인</span></div><div class="lock-notifications">${notices.map(([id, from, text]) => `<button type="button" data-notice="${id}" class="notification-button ${state.notices.includes(id) ? "read" : ""}"><b>${from}</b><p>${state.notices.includes(id) ? text : "탭해서 알림 펼치기"}</p></button>`).join("")}</div>${state.notices.length === 2 ? `<form class="phone-passcode" id="phoneForm"><label>문 앞 기록을 MMDD로 입력</label><input id="phoneCode" inputmode="numeric" maxlength="4" autocomplete="off"><div class="passcode-dots"><span></span><span></span><span></span><span></span></div><div class="phone-keypad">${["1","2","3","4","5","6","7","8","9","지움","0","확인"].map(k => `<button type="${k === "확인" ? "submit" : "button"}" data-key="${k}">${k}</button>`).join("")}</div></form>` : ""}`;
      bindLocked();
      feedback.textContent = state.notices.length < 2 ? "두 알림을 모두 펼쳐 자료와 형식을 확인하십시오." : "숙소 문 앞에서 ‘약속한 날’을 찾아 MMDD로 입력하십시오.";
      return;
    }
    screen.innerHTML = `<div class="phone-apps phone-apps-two"><button class="selected" type="button"><span>□</span>사진</button><button type="button" id="memoApp" ${state.original === "promise" ? "" : "disabled"}><span>${state.original === "promise" ? "M" : "🔒"}</span>메모</button></div><div class="phone-screen evidence-screen">${state.memo ? `<div class="memo-note"><p><s>성공한 사람</s> — 삭제됨</p><p><s>인정받는 사람</s> — 삭제됨</p><button id="restoreMemo" class="memo-final" type="button">${state.solved ? "빌린 이름은 바뀌지만, 바뀌지 않은 것은 약속이다." : "마지막 줄 복원"}</button></div>` : `<div class="phone-app-title"><span>사진 감식</span><strong>${state.photos.length}/3 확대</strong></div><div class="photo-evidence-grid">${photos.map(p => `<button type="button" data-photo="${p.id}" class="${state.photos.includes(p.id) ? "viewed" : ""}"><strong>${p.title}</strong><small>${state.photos.includes(p.id) ? p.stamp : "탭해 상태 도장 확대"}</small></button>`).join("")}</div>${state.photos.length === 3 ? `<p class="phone-caption">세 기록 중 원본으로 남은 기록을 선택하십시오.</p><div class="original-choice">${photos.map(p => `<button type="button" data-original="${p.id}">${p.title}</button>`).join("")}</div>` : ""}`}</div>`;
    bindUnlocked();
    feedback.textContent = state.memo ? "삭제된 두 이름과 마지막 줄을 대조해 복원하십시오." : state.photos.length < 3 ? "사진 세 장의 상태 도장을 모두 확대하십시오." : "반복 노출보다 ‘임시/반납’과 ‘원본/수정 없음’을 비교하십시오.";
  }
  function bindLocked() {
    screen.querySelectorAll("[data-notice]").forEach(b => b.addEventListener("click", () => { if (!state.notices.includes(b.dataset.notice)) state.notices.push(b.dataset.notice); persist(); draw(); }));
    const form = document.querySelector("#phoneForm");
    if (!form) return;
    form.querySelectorAll("[data-key]").forEach(b => b.addEventListener("click", () => { const input = document.querySelector("#phoneCode"); if (b.dataset.key === "확인") return; input.value = b.dataset.key === "지움" ? input.value.slice(0, -1) : (input.value + b.dataset.key).slice(0, 4); updatePasscodeDots(); }));
    form.addEventListener("submit", e => { e.preventDefault(); const value = document.querySelector("#phoneCode").value; state.attempts += 1; if (value === "0316") { state.unlocked = true; persist(); draw(); return; } feedback.textContent = value === "1113" ? "그 숫자는 날짜가 아니라 퇴실 시각입니다." : value.length !== 4 ? "잠금 기록은 네 자리 MMDD 형식입니다." : "숫자의 모양보다 출처가 중요합니다. ‘약속한 날’의 수령 기록을 찾으십시오."; document.querySelector("#phoneCode").value = ""; updatePasscodeDots(); persist(); });
  }
  function bindUnlocked() {
    screen.querySelectorAll("[data-photo]").forEach(b => b.addEventListener("click", () => { if (!state.photos.includes(b.dataset.photo)) state.photos.push(b.dataset.photo); persist(); draw(); }));
    screen.querySelectorAll("[data-original]").forEach(b => b.addEventListener("click", () => { state.original = b.dataset.original; if (state.original !== "promise") { feedback.textContent = "많이 찍힌 기록이 원본이라는 뜻은 아닙니다. 상태 도장을 다시 보십시오."; persist(); return; } persist(); draw(); }));
    document.querySelector("#memoApp")?.addEventListener("click", () => { state.memo = true; persist(); draw(); });
    document.querySelector("#restoreMemo")?.addEventListener("click", () => { state.solved = true; persist(); draw(); unlock(); });
  }
  document.querySelector("#resetStage")?.addEventListener("click", () => { localStorage.removeItem("homeward-game-name"); window.location.reload(); });
  draw();
  if (state.solved) unlock();
}

function renderInventoryPuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("ledger", { step: "briefing", found: [], suspects: [], culprit: "", checks: [], solved: false });
  const items = [
    { id: "wheat", mark: "○", item: "밀", found: "조리대", shelf: 2, text: "먼저 처리 — 조리대로 이동", author: "배급 담당", altered: true },
    { id: "oil", mark: "△", item: "기름", found: "출입구", shelf: 3, text: "먼저 처리 — 출입구로 이동", author: "배급 담당", altered: true },
    { id: "salt", mark: "□", item: "소금", found: "조리대", shelf: 4, text: "먼저 처리 — 조리대로 이동", author: "배급 담당", altered: true },
    { id: "bean", mark: "◇", item: "콩", found: "선반 5", shelf: 5, text: "확인 뒤 인계 — 원래 자리 유지", author: "장부 담당" },
    { id: "fruit", mark: "☆", item: "건과일", found: "선반 1", shelf: 1, text: "확인 뒤 인계 — 원래 자리 유지", author: "보관 담당" },
    { id: "water", mark: "+", item: "물", found: "선반 6", shelf: 6, text: "확인 뒤 인계 — 원래 자리 유지", author: "열쇠 담당" },
  ];
  surface.innerHTML = `<p class="instruction">역할을 나누고 원본 위치·변경 문장·권한을 대조해 실제 상자의 번호를 복원하십시오.</p>${adminPreview ? `<button class="secondary-button admin-reset" id="resetLedger" type="button">관리자: 이 스테이지 초기화</button>` : ""}<section class="case-flow" id="ledgerFlow"></section><p class="feedback" id="feedback" aria-live="polite"></p>`;
  const flow = document.querySelector("#ledgerFlow");
  const feedback = document.querySelector("#feedback");
  const persist = () => savePuzzleState("ledger", state);
  const advance = step => { state.step = step; persist(); draw(); };
  function draw() {
    const progress = `<div class="flow-progress">브리핑 · 수색 · 복원 · 기록 감식 · 용의자 · 실제 자물쇠</div>`;
    if (state.step === "briefing") flow.innerHTML = `${progress}<h3>식량 장부 사건 브리핑</h3><p>수색 A/B, 보관 복원, 기록 감식, 권한 확인, 반증·발표 역할을 나누십시오. 최소 세 역할이 결론 전에 근거를 확인해야 합니다.</p><div class="role-grid">${["수색 A", "수색 B", "보관 복원", "기록 감식", "권한 확인", "반증·발표"].map(x => `<span>${x}</span>`).join("")}</div><button class="primary-button" id="next" type="button">역할 배정 완료</button>`;
    if (state.step === "search") flow.innerHTML = `${progress}<h3>재고 카드 6장 회수</h3><p>발견 위치는 원래 위치가 아닐 수 있습니다. 찾은 카드만 체크하십시오.</p><div class="check-grid">${items.map(x => `<button data-found="${x.id}" class="${state.found.includes(x.id) ? "selected" : ""}">${x.mark} ${x.item}<small>${x.found}</small></button>`).join("")}</div><button class="primary-button" id="next" ${state.found.length === 6 ? "" : "disabled"}>6장 인계</button>`;
    if (state.step === "restore") flow.innerHTML = `${progress}<h3>봉인 전 원본 선반 안내도</h3><ol class="shelf-clues"><li>물은 가장 아래 선반</li><li>콩은 물 바로 위</li><li>소금은 콩 바로 위</li><li>기름은 소금 바로 위</li><li>밀은 기름 바로 위</li><li>건과일은 가장 위</li></ol><div class="shelf-stack">${[1,2,3,4,5,6].map(n => `<div><b>선반 ${n}</b><span>${items.find(x => x.shelf === n).mark} ${items.find(x => x.shelf === n).item}</span></div>`).join("")}</div><button class="primary-button" id="next">현장 매트 복원 완료</button>`;
    if (state.step === "audit") flow.innerHTML = `${progress}<h3>변경 기록 6건 감식</h3><p>원래 선반, 원본 문장 ‘확인 뒤 인계’, 담당 권한이 모두 어긋난 세 건을 선택하십시오.</p><div class="record-grid">${items.map(x => `<button data-suspect="${x.id}" class="${state.suspects.includes(x.id) ? "selected" : ""}"><b>${x.mark} ${x.item}</b><span>발견: ${x.found}</span><span>${x.text}</span><small>${x.author}</small></button>`).join("")}</div><button class="primary-button" id="audit">의심 기록 3건 확정</button>`;
    if (state.step === "accuse") flow.innerHTML = `${progress}<h3>사건 결론</h3><p>세 기록을 바꾼 사람을 고르기 전에 세 역할의 근거를 확인하십시오.</p><div class="check-grid">${["복원 위치 확인", "기록 문장 확인", "권한표 확인"].map(x => `<button data-check="${x}" class="${state.checks.includes(x) ? "selected" : ""}">${x}</button>`).join("")}</div><div class="choice-grid">${["보관 담당", "장부 담당", "열쇠 담당", "배급 담당"].map(x => `<button data-culprit="${x}">${x}</button>`).join("")}</div>`;
    if (state.step === "unlock") flow.innerHTML = `${progress}<h3>인계 표식 순서: □ → △ → ○</h3><p>해당 품목 카드를 복원 매트에서 찾아 <strong>원래 선반 번호</strong>를 순서대로 읽고 실제 3자리 자물쇠를 여십시오.</p><div class="physical-lock-note">웹에는 번호를 입력하지 않습니다. 상자를 열었으면 안의 결과 카드를 꺼내십시오.</div><button class="primary-button" id="opened">실제 상자를 열었다</button>`;
    if (state.step === "complete") flow.innerHTML = `${progress}<h3>결과 카드 확인</h3><p>상자 안 카드의 키워드와 완료 코드를 확인해 활동 페이지에 기록하십시오.</p><a class="primary-button" href="activity.html?stage=ledger">활동 페이지로 이동</a>`;
    bind();
  }
  function bind() {
    document.querySelector("#next")?.addEventListener("click", () => advance({ briefing: "search", search: "restore", restore: "audit" }[state.step]));
    flow.querySelectorAll("[data-found]").forEach(b => b.addEventListener("click", () => { state.found = state.found.includes(b.dataset.found) ? state.found.filter(x => x !== b.dataset.found) : [...state.found, b.dataset.found]; persist(); draw(); }));
    flow.querySelectorAll("[data-suspect]").forEach(b => b.addEventListener("click", () => { state.suspects = state.suspects.includes(b.dataset.suspect) ? state.suspects.filter(x => x !== b.dataset.suspect) : state.suspects.length < 3 ? [...state.suspects, b.dataset.suspect] : state.suspects; persist(); draw(); }));
    document.querySelector("#audit")?.addEventListener("click", () => { const correct = items.filter(x => x.altered).every(x => state.suspects.includes(x.id)) && state.suspects.length === 3; if (!correct) { feedback.textContent = state.suspects.length !== 3 ? "사라진 것은 세 건입니다. 같은 표현이 반복된 기록부터 찾으십시오." : "발견 장소만으로 판단하지 마십시오. 원래 선반, 문장, 권한을 모두 대조하십시오."; return; } advance("accuse"); });
    flow.querySelectorAll("[data-check]").forEach(b => b.addEventListener("click", () => { if (!state.checks.includes(b.dataset.check)) state.checks.push(b.dataset.check); persist(); draw(); }));
    flow.querySelectorAll("[data-culprit]").forEach(b => b.addEventListener("click", () => { if (state.checks.length < 3) { feedback.textContent = "최소 세 역할이 위치·문장·권한 근거를 모두 확인해야 합니다."; return; } if (b.dataset.culprit !== "배급 담당") { feedback.textContent = "그 담당자에게 위치와 인계 문장을 함께 바꿀 기회가 있었습니까?"; return; } state.culprit = b.dataset.culprit; advance("unlock"); }));
    document.querySelector("#opened")?.addEventListener("click", () => { state.step = "complete"; state.solved = true; persist(); draw(); unlock(); });
  }
  document.querySelector("#resetLedger")?.addEventListener("click", () => { localStorage.removeItem("homeward-game-ledger"); window.location.reload(); });
  draw();
  if (state.solved) unlock();
}

function renderLoopPuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("road", { phase: "briefing", index: 0, loops: 0, history: [], fragments: [], slots: [], interpretation: "", solved: false });
  const fragments = [{ id: "return", text: "돌아갈 수 있었지만" }, { id: "leave", text: "그 길을 떠나" }, { id: "seek", text: "더 나은 본향을" }, { id: "long", text: "사모하였다" }];
  const scenes = [
    { mark: "A 문", memory: "열려 있다는 것과 들어가야 한다는 것은 다르다.", answer: "leave", choices: [["return", "익숙한 문으로 돌아간다"], ["leave", "문을 떠난다"]], fragment: "return", fail: "문은 열렸지만 길은 제자리입니다. A 담당자의 기억을 다시 들으세요." },
    { mark: "B 눈", memory: "본 것은 답이 아니다. 사라진 뒤 말할 수 있어야 한다.", answer: "remember", choices: [["remember", "기억한다"], ["fast", "가장 빠른 길"]], fragment: "leave", fail: "빠르게 보았지만 남은 기록이 없습니다. B 담당자의 문장을 다시 들으세요." },
    { mark: "C 발자국", memory: "사람 수가 아니라 하나뿐인 발자국을 따른다.", answer: "narrow", choices: [["crowd", "사람들이 많은 길"], ["narrow", "좁은 길"]], fragment: "seek", fail: "사람 수는 길의 증거가 아닙니다. C 담당자의 모양을 다시 들으세요." },
    { mark: "D 별", memory: "돌아갈 수 있다는 말은 돌아가야 한다는 뜻이 아니다.", answer: "unseen", choices: [["old", "돌아갈 수 있었던 곳"], ["unseen", "아직 보이지 않는 곳을 택한다"]], fragment: "long", fail: "가능과 명령은 같은 뜻이 아닙니다. D 담당자의 기억을 다시 들으세요." },
  ];
  surface.innerHTML = `<p class="instruction">기억 담당의 증언으로 네 루프를 통과하고, 문장을 조합한 뒤 방향의 의미를 뒤집어 읽으십시오.</p>${adminPreview ? `<button class="secondary-button admin-reset" id="resetRoad" type="button">관리자: 이 스테이지 초기화</button>` : ""}<section class="case-flow" id="roadFlow"></section><p class="feedback" id="feedback" aria-live="polite"></p>`;
  const flow = document.querySelector("#roadFlow"); const feedback = document.querySelector("#feedback"); const persist = () => savePuzzleState("road", state);
  function draw() {
    if (state.phase === "briefing") flow.innerHTML = `<h3>기억 담당 브리핑</h3><p>A 문 · B 눈 · C 발자국 · D 별 담당을 나누십시오. 각자 20초 동안 촬영·필기 없이 관찰하고 합류한 뒤, 담당자가 기억을 말한 다음 선택합니다.</p><div class="role-grid">${scenes.map(s => `<span>${s.mark}</span>`).join("")}</div><button class="primary-button" id="startLoops">네 담당 준비 완료</button>`;
    if (state.phase === "loops") { const scene = scenes[state.index]; flow.innerHTML = `<div class="loop-board"><section class="loop-scene"><span class="loop-count">Loop ${state.loops} · ${scene.mark}</span><h3>${state.index + 1}번째 갈림길</h3><p class="memory-call">담당자가 기억한 문장을 팀에 먼저 말하십시오.</p><p>${scene.memory}</p><div class="choice-grid">${scene.choices.map(([v,l]) => `<button data-road-choice="${v}">${l}</button>`).join("")}</div></section><aside class="loop-log"><strong>반복 기록</strong>${state.history.length ? state.history.map(x => `<p>${x}</p>`).join("") : "<p>아직 기록 없음</p>"}<div class="direction-strip">회수 조각 ${state.fragments.length}/4</div></aside></div>`; }
    if (state.phase === "assemble") { const pool = ["seek","return","long","leave"].filter(id => !state.slots.includes(id)); flow.innerHTML = `<section class="sentence-lock"><h3>흩어진 문장</h3><p>방향은 아직 가려져 있습니다. 자연스러운 한 문장을 만드십시오.</p><div class="sentence-slots">${fragments.map((_,i) => { const f = fragments.find(x => x.id === state.slots[i]); return `<button data-slot="${i}" class="${f ? "filled" : ""}">${f ? f.text : i + 1}</button>`; }).join("")}</div><div class="sentence-pool">${pool.map(id => `<button data-fragment="${id}">${fragments.find(x => x.id === id).text}</button>`).join("")}</div><button class="primary-button" id="checkSentence">문장 확인</button></section>`; }
    if (state.phase === "interpret") flow.innerHTML = `<section class="sentence-lock"><h3>마지막 기록의 의미</h3><p>“표식은 목적지를 가리키지 않는다. 지나온 선택을 기록한다.” 화살표는 무엇입니까?</p><div class="choice-grid"><button data-meaning="road">지금 가야 할 길</button><button data-meaning="record">지나온 선택의 기록</button></div></section>`;
    if (state.phase === "physical") flow.innerHTML = `<section class="direction-lock physical-only"><p class="eyebrow">Physical Lock</p><h3>실제 방향 자물쇠</h3><p>완성한 문장 순서대로 현장 카드 가장자리의 방향 홈을 읽어 실제 자물쇠를 여십시오.</p><p class="physical-lock-note">방향은 웹에 입력하지 않습니다. 봉투 안 완료 코드를 활동 페이지에 기록하십시오.</p><button class="primary-button" id="opened">실제 봉투를 열었다</button></section>`;
    if (state.phase === "complete") flow.innerHTML = `<section class="sentence-lock"><h3>봉투의 사건 완료 코드</h3><p>봉투에서 키워드와 완료 코드를 확인한 뒤 활동 페이지에 입력하십시오.</p><a class="primary-button" href="activity.html?stage=road">활동 페이지로 이동</a></section>`;
    bind();
  }
  function bind() {
    document.querySelector("#startLoops")?.addEventListener("click", () => { state.phase = "loops"; persist(); draw(); });
    flow.querySelectorAll("[data-road-choice]").forEach(b => b.addEventListener("click", () => { const scene = scenes[state.index]; if (b.dataset.roadChoice !== scene.answer) { state.loops += 1; state.history.push(`${scene.mark}: ${b.textContent.trim()} → 처음으로 돌아옴`); state.index = 0; feedback.textContent = scene.fail; persist(); draw(); return; } if (!state.fragments.includes(scene.fragment)) state.fragments.push(scene.fragment); state.history.push(`${scene.mark}: 선택 통과 · 조각 회수`); state.index += 1; if (state.index === 4) state.phase = "assemble"; persist(); draw(); }));
    flow.querySelectorAll("[data-fragment]").forEach(b => b.addEventListener("click", () => { if (state.slots.length < 4) state.slots.push(b.dataset.fragment); persist(); draw(); }));
    flow.querySelectorAll("[data-slot]").forEach(b => b.addEventListener("click", () => { state.slots.splice(Number(b.dataset.slot), 1); persist(); draw(); }));
    document.querySelector("#checkSentence")?.addEventListener("click", () => { if (!fragments.every((f,i) => state.slots[i] === f.id)) { feedback.textContent = "무엇을 떠나 무엇을 사모했는지 한 문장으로 다시 읽으십시오."; return; } state.phase = "interpret"; persist(); draw(); });
    flow.querySelectorAll("[data-meaning]").forEach(b => b.addEventListener("click", () => { if (b.dataset.meaning !== "record") { feedback.textContent = "화살표가 목적지라면 반복 기록은 필요 없었을 겁니다. D 문구를 다시 확인하십시오."; return; } state.interpretation = "record"; state.phase = "physical"; persist(); draw(); }));
    document.querySelector("#opened")?.addEventListener("click", () => { state.phase = "complete"; state.solved = true; persist(); draw(); unlock(); });
  }
  document.querySelector("#resetRoad")?.addEventListener("click", () => { localStorage.removeItem("homeward-game-road"); window.location.reload(); });
  draw(); if (state.solved) unlock();
}

function renderHomePuzzle() {
  const answers = [
    { id: "case", label: "00 본관", answer: "나그네" },
    { id: "bag", label: "01 야외", answer: "장막" },
    { id: "name", label: "02 숙소", answer: "약속" },
    { id: "ledger", label: "03 식탁", answer: "청지기" },
    { id: "road", label: "04 길", answer: "더 나은 본향" },
  ];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">앞선 장소에서 얻은 키워드를 순서대로 입력하십시오. 마지막 선언문은 팀 이름으로 완성됩니다.</p>
    <div class="final-board">
      ${answers
        .map(
          (item) => `
            <label>
              <span>${item.label}</span>
              <input data-answer="${item.answer}" value="${localStorage.getItem(`homeward-keyword-${item.id}`) || ""}" />
            </label>
          `,
        )
        .join("")}
      <label>
        <span>팀 이름</span>
        <input id="teamDeclarationName" placeholder="예: 3조 순례자들" />
      </label>
    </div>
    <div class="declaration" id="declaration">
      우리는 이 땅에서 아직 도착하지 않은 사람들입니다.
    </div>
    <div class="check-line"><button class="primary-button" type="button" id="checkFinal">최종 고백 열기</button></div>
    <p class="feedback" id="feedback">단어는 맞아도 순서가 틀리면 고백이 열리지 않습니다.</p>
  `;

  document.querySelector("#checkFinal").addEventListener("click", () => {
    const inputs = [...surface.querySelectorAll("[data-answer]")];
    const correct = inputs.every((input) => normalize(input.value) === normalize(input.dataset.answer));
    inputs.forEach((input) => {
      input.dataset.status = normalize(input.value) === normalize(input.dataset.answer) ? "correct" : "miss";
    });
    if (!correct) {
      document.querySelector("#feedback").textContent = "앞선 사건파일의 키워드를 다시 확인하십시오.";
      return;
    }
    const team = document.querySelector("#teamDeclarationName").value.trim() || "우리 팀";
    document.querySelector("#declaration").textContent = `${team}은 장막을 집으로 착각했던 나그네였지만, 약속을 붙들고 청지기로 살아, 더 나은 본향을 향해 걷는 사람입니다.`;
    document.querySelector("#feedback").textContent = "귀향 선언문이 완성되었습니다.";
    unlock();
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
