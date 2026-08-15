const puzzles = {
  case: {
    step: "00 / 본관",
    title: "조작된 사건파일",
    intro: "본관 로비에 숨겨진 알파벳 카드를 찾아 기록을 복원하고, 이상한 문장을 해석해 첫 정체성을 찾으십시오.",
    code: "PILGRIM-00",
    keyword: "나그네",
    message: "첫 키워드 '나그네'를 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["알파벳 카드 A~E", "사건 메모", "접수 기록 5건", "거짓 기록 3건", "정체성 입력"],
    objective: "본관 로비에서 알파벳 카드 5장을 찾아 암호로 기록을 복원하고, 사건 메모와 대조해 거짓 기록 3건을 가려낸 뒤, 아직 목적지에 이르지 않은 조사팀의 정체성을 추리합니다.",
    hints: {
      focus: "본관 로비 곳곳에 숨겨진 알파벳 카드 A~E를 먼저 모두 찾으십시오. 카드에 적힌 4자리 숫자가 같은 알파벳의 기록을 여는 암호입니다.",
      contrast: "다섯 기록을 모두 복원했다면, 현장 사건 메모의 '미도착', '본관 접수대는 출발 지점일 뿐', 'H를 절대로 지우지 말 것' 세 항목과 정면으로 모순되는 거짓 기록 3건을 가려내십시오.",
      action: "거짓 기록 3건을 모두 지목하면 열리는 정체성 입력창에 사건번호 H-11-13(히브리서 11:13 '나그네와 외국인임을 증언하였으니')이 가리키는 성경적 정체성을 입력하십시오.",
    },
    render: renderCasePuzzle,
  },
  bag: {
    step: "01 / 야외 시설",
    title: "너무 오래 머문 자리",
    intro: "현장에서 발견한 메모 한 장으로 쉬는 자리를 집으로 착각하게 만든 네 표식의 순서를 읽어내고, 실제 키박스를 여십시오.",
    code: "TENT-01",
    keyword: "장막",
    message: "키박스 속 '장막 카드'를 확보하십시오. 활동 페이지에 완료 코드를 입력하면 다음 장소가 열립니다.",
    evidence: ["발견된 메모", "그늘 표식", "벤치 표식", "돌 표식", "길목 표식", "4자리 키박스"],
    objective: "현장 메모에 등장한 순서대로 네 표식(그늘, 벤치, 돌, 길목)의 숫자를 찾아 조합해 키박스를 엽니다.",
    hints: {
      focus: "메모는 순서를 알려 주는 목록이 아닙니다. 문장을 다시 읽으며 장소가 언급되는 순서를 그대로 따라가십시오.",
      contrast: "메모 속 '그늘 → 벤치 → 돌베개 → 길목' 순서로 각 표식의 숫자를 읽어 대조하십시오.",
      action: "순서대로 읽은 4자리 번호 '2741'을 키박스에 맞춰 여십시오.",
    },
    render: renderFieldPuzzle,
  },
  name: {
    step: "02 / 숙소",
    title: "잠긴 휴대폰",
    intro: "잠금화면 알림과 숙소 문 앞 안내문을 대조해 휴대폰을 여십시오.",
    code: "PROMISE-02",
    keyword: "약속",
    message: "세 번째 키워드 '약속'을 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["알림 2개", "0316", "벽면 실물 사진 5장", "검색 기록", "원본 약속 카드", "메모"],
    objective: "알림과 현장 기록으로 휴대폰을 열고, 벽면 실물 사진에서 검색어를 확인해 검색 기록으로 코드를 추리하며 갤러리를 순서대로 채운 뒤 원본을 판별합니다.",
    hints: {
      focus: "휴대폰 잠금화면의 상단 알림 2개와 숙소 문 앞 안내문에 적힌 날짜 표시를 주시하십시오.",
      contrast: "알림 속 약속된 날짜와 문 앞 안내문의 월/일(MMDD) 형식을 대조하고, 잠금 해제 후 화면에 뜨는 다음 사진의 이름을 벽에서 실물로 찾아 그 사진에 적힌 검색어 태그를 확인하십시오.",
      action: "휴대폰 잠금 비밀번호 '0316'을 입력해 연 뒤, 벽면 사진 성공한 사람(검색어 '우승') → 인정받는 사람(검색어 '박수') → 이달의 새 가족(검색어 '환영') → 퇴실 안내 사본(검색어 '체크아웃') 순서로 찾아 각 검색어를 검색 기록에서 찾은 검색결과 숫자(64 → 52 → 19 → 36)를 입력하고, 도장 문구 '수정 없음'으로 원본을 확정한 뒤 검색 기록 마지막 줄 '약속을 지키는 사람'으로 메모를 복원하십시오.",
    },
    render: renderPhonePuzzleV2,
  },
  ledger: {
    step: "03 / 창고 및 물자 보관소(청지기실)",
    title: "맡겨진 것을 바꾼 사람",
    intro: "원래 선반과 변경 기록, 담당 권한을 대조해 조작한 사람을 찾으십시오.",
    code: "STEWARD-03",
    keyword: "청지기",
    message: "네 번째 키워드 '청지기'를 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["역할 분담", "재고 카드 6장", "변경 기록", "권한표", "3자리 자물쇠"],
    objective: "카드의 원래 위치를 복원하고 기록과 권한을 감식해 물리 자물쇠의 순서를 찾습니다.",
    hints: {
      focus: "물품 수량을 세거나 계산하려 하지 말고, 물품 배치 변경 기록과 담당 권한표에 시선을 맞추십시오.",
      contrast: "선반의 원래 위치와 위치 변경 기록, '먼저 처리' 지침의 권한 위반자를 서로 대조하여 조작자를 가려내십시오.",
      action: "권한을 남용하여 기록을 바꾼 조작자의 순서에 맞춰 3자리 자물쇠 번호 '432'를 맞추십시오.",
    },
    render: renderInventoryPuzzleV2,
  },
  road: {
    step: "04 / 비아 돌로로사",
    title: "돌아갈 수 있었던 길",
    intro: "네 사람의 기억으로 루프를 통과하고, 길처럼 보인 방향을 기록으로 다시 읽으십시오.",
    code: "BETTER-04",
    keyword: "더 나은 본향",
    message: "다섯 번째 키워드 '더 나은 본향'을 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["기억 담당 A~D", "4개 루프", "문장 조각", "방향 홈", "웹 방향 자물쇠"],
    objective: "분담한 현장 기억으로 네 갈림길을 통과하고 문장과 방향 기록의 의미를 복원한 뒤, 완성한 순서로 웹 방향 자물쇠를 해제합니다.",
    hints: {
      focus: "4개 루프 갈림길마다 기억 담당 A~D가 기록해 둔 현장 문장 조각에 집중하십시오.",
      contrast: "익숙하고 편안해 보이는 선택(루프) 대신, 말씀을 기억하며 나아가는 '불편하지만 진실된 길'의 순서를 대조하십시오.",
      action: "'문을 떠난다 → 기억한다 → 좁은 길 → 더 나은 본향' 순서로 길을 선택해 루프를 통과한 뒤, 문장 조각의 방향 홈을 읽어 화면의 방향 자물쇠를 순서대로 누르십시오.",
    },
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
    hints: {
      focus: "00~04 현장에서 회수한 5개의 디지털 키워드 카드(나그네, 장막, 약속, 청지기, 더 나은 본향)에 시선을 두십시오.",
      contrast: "스테이지 순서대로 회수된 키워드의 의미와 귀향 선언문의 빈칸 위치를 대조하십시오.",
      action: "5개 키워드를 순서대로 조합 및 배치하고 팀 이름을 작성하여 최종 귀향 선언을 완료하십시오.",
    },
    render: renderHomePuzzle,
  },
};

const params = new URLSearchParams(window.location.search);
const stageId = params.get("stage") || "case";
const expectedQrToken = window.HomewardSync?.config?.qrToken || window.HOMEWARD_CONFIG?.qrToken || "rodem-2026";
const qrToken = params.get("qr") || expectedQrToken;
const isLocalEnv = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const adminPreview = isLocalEnv || params.get("admin") === "1" || localStorage.getItem("homeward-admin-preview") === "true";
const puzzle = puzzles[stageId] || puzzles.case;
const registeredProgress = loadActivityProgress();
const registeredTeamKey = teamSessionKey(registeredProgress.teamName, registeredProgress.teamPassword);
const isTeamOnboarded = Boolean(registeredTeamKey) && localStorage.getItem("homeward-onboarded-team") === registeredTeamKey;
function isActivityCompleted(id) {
  try {
    const saved = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
    return Boolean(saved.completed && saved.completed[id]);
  } catch {
    return false;
  }
}

function isStageSolved(id) {
  return localStorage.getItem(`homeward-solved-${id}`) === "true" || isActivityCompleted(id);
}

const coreStageIds = ["case", "bag", "name", "ledger", "road"];
const isCaseComplete = isStageSolved("case");
const finalPrerequisitesComplete = coreStageIds.every((id) => isStageSolved(id));
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

function triggerShake(element) {
  if (!element) return;
  element.classList.remove("shake");
  void element.offsetWidth;
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 400);
}

function triggerFeedbackShake(feedbackEl, message) {
  const el = feedbackEl || document.querySelector("#feedback");
  if (el) {
    if (message) el.textContent = message;
    triggerShake(el);
  }
}

function updateHeaderKeywordBadge() {
  const headerKeywordBadge = document.querySelector("#headerKeywordBadge");
  if (!headerKeywordBadge) return;
  const count = coreStageIds.filter((id) => isStageSolved(id)).length;
  headerKeywordBadge.textContent = `🔑 키워드 ${count} / 5`;
}

function setupAutonomousHintSystem() {
  const hintSystemPanel = document.querySelector("#hintSystemPanel");
  const hintStep1Content = document.querySelector("#hintStep1Content");
  const hintStep2Content = document.querySelector("#hintStep2Content");
  const hintStep3Content = document.querySelector("#hintStep3Content");
  const hintStatusBadge = document.querySelector("#hintStatusBadge");
  const hintTimerStatus = document.querySelector("#hintTimerStatus");

  if (!puzzle.hints) return;
  hintSystemPanel.hidden = false;

  if (hintStep1Content) hintStep1Content.textContent = puzzle.hints.focus;
  if (hintStep2Content) hintStep2Content.textContent = puzzle.hints.contrast;
  if (hintStep3Content) hintStep3Content.textContent = puzzle.hints.action;

  const detailsElements = [...document.querySelectorAll(".hint-steps-grid details")];
  const viewedSteps = new Set();
  const testMode = adminPreview && params.get("hintTest") === "1";
  const unlockMinutes = testMode ? [0, 0, 0] : [5, 10, 15];
  const progress = loadActivityProgress();
  const teamKey = String(progress.teamName || "local-team").trim().toLowerCase();
  const starts = loadHintStarts();
  const sessionKey = `${teamKey}::${stageId}`;
  const startedAt = Number(starts[sessionKey]) || Date.now();
  starts[sessionKey] = startedAt;
  localStorage.setItem("homeward-hint-starts", JSON.stringify(starts));

  detailsElements.forEach((details, idx) => {
    details.open = false;
    details.dataset.unlockMinutes = String(unlockMinutes[idx]);
    details.dataset.locked = "true";
    details.setAttribute("aria-disabled", "true");
    const summary = details.querySelector("summary");
    summary?.addEventListener("click", (event) => {
      if (details.dataset.locked === "true") {
        event.preventDefault();
        updateHintAvailability();
      }
    });
  });

  detailsElements.forEach((details, idx) => {
    details.addEventListener("toggle", () => {
      if (details.open && !viewedSteps.has(idx)) {
        viewedSteps.add(idx);
        if (hintStatusBadge) {
          hintStatusBadge.textContent = `힌트 열람 ${viewedSteps.size}건`;
        }
        try {
          const hintsUsed = Number(localStorage.getItem("homeward-team-hints") || "0") + 1;
          localStorage.setItem("homeward-team-hints", hintsUsed.toString());

          const progress = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
          progress.hintsCount = (progress.hintsCount || 0) + 1;
          localStorage.setItem("homeward-case-progress", JSON.stringify(progress));
        } catch (e) {
          console.error("Hint count save error:", e);
        }
      }
    });
  });

  const hintTimer = window.setInterval(updateHintAvailability, 1000);
  updateHintAvailability();

  function updateHintAvailability() {
    const elapsedMs = Math.max(0, Date.now() - startedAt);
    const elapsedMinutes = elapsedMs / 60000;
    let unlockedCount = 0;

    detailsElements.forEach((details, idx) => {
      const unlocked = elapsedMinutes >= unlockMinutes[idx];
      details.dataset.locked = unlocked ? "false" : "true";
      details.setAttribute("aria-disabled", unlocked ? "false" : "true");
      details.classList.toggle("hint-locked", !unlocked);
      details.classList.toggle("hint-unlocked", unlocked);
      const strong = details.querySelector("summary strong");
      if (strong) {
        const names = ["시선 (Focus) - 관찰 포인트", "대조 (Contrast) - 규칙 & 모순 감식", "행동 (Action) - 정답 & 자물쇠 해금"];
        strong.textContent = unlocked ? names[idx] : `${names[idx]} · ${unlockMinutes[idx]}분 후 공개`;
      }
      if (unlocked) unlockedCount += 1;
    });

    if (unlockedCount === detailsElements.length) {
      hintTimerStatus.textContent = "세 단계 힌트가 모두 열렸습니다. 필요한 단계만 확인하십시오.";
      window.clearInterval(hintTimer);
      return;
    }

    const nextIndex = unlockedCount;
    const remainingMs = Math.max(0, unlockMinutes[nextIndex] * 60000 - elapsedMs);
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.ceil((remainingMs % 60000) / 1000);
    hintTimerStatus.textContent = `${unlockedCount} / 3단계 공개 · 다음 힌트까지 ${minutes}:${String(seconds).padStart(2, "0")}`;
  }
}

function loadActivityProgress() {
  try {
    return JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
  } catch {
    return {};
  }
}

function loadHintStarts() {
  try {
    return JSON.parse(localStorage.getItem("homeward-hint-starts") || "{}");
  } catch {
    return {};
  }
}

function fallbackCopyText(text, statusEl) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    if (statusEl) {
      statusEl.textContent = "✅ 코드가 복사되었으며 사건 수첩에 자동 기록되었습니다!";
    }
  } catch (err) {
    if (statusEl) {
      statusEl.textContent = `코드 [ ${text} ] 사건 수첩에 자동 기록 완료!`;
    }
  }
  document.body.removeChild(textarea);
}

function setupCopyRecordAction() {
  const copyBtn = document.querySelector("#copyRecordBtn");
  const copyStatusMsg = document.querySelector("#copyStatusMsg");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    try {
      localStorage.setItem(`homeward-solved-${stageId}`, "true");
      localStorage.setItem(`homeward-keyword-${stageId}`, puzzle.keyword);
      const progress = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
      if (!progress.completed) progress.completed = {};
      progress.completed[stageId] = true;
      if (!progress.codes) progress.codes = {};
      progress.codes[stageId] = puzzle.code;
      localStorage.setItem("homeward-case-progress", JSON.stringify(progress));
      updateHeaderKeywordBadge();
    } catch (e) {
      console.error("Save progress error:", e);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(puzzle.code)
        .then(() => {
          if (copyStatusMsg) {
            copyStatusMsg.textContent = "✅ 코드가 클립보드에 복사되었으며 사건 수첩에 자동 기록되었습니다!";
          }
        })
        .catch(() => {
          fallbackCopyText(puzzle.code, copyStatusMsg);
        });
    } else {
      fallbackCopyText(puzzle.code, copyStatusMsg);
    }
  });
}

updateHeaderKeywordBadge();
setupCopyRecordAction();

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
} else if (!isTeamOnboarded && !adminPreview) {
  renderTeamOnboarding();
} else if (stageId === "case" && !hasSeenPrologue(registeredTeamKey) && !adminPreview) {
  renderCasePrologue(registeredTeamKey);
} else if (stageId !== "case" && coreStageIds.includes(stageId) && !isCaseComplete && !adminPreview) {
  document.querySelector("#gameStep").textContent = puzzle.step + " / 잠김";
  document.querySelector("#gameTitle").textContent = "아직 열리지 않은 현장";
  document.querySelector("#gameIntro").textContent = "00 본관 사건을 먼저 완료한 뒤 이 현장의 조사를 진행하십시오.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <section class="locked-panel">
      <strong>현장 사건파일 잠금</strong>
      <p>00 본관 사건파일을 완료해야 01~04 현장이 해금됩니다. 활동 페이지에서 00 본관을 먼저 확인하십시오.</p>
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
  setupAutonomousHintSystem();
  puzzle.render();
  if (isStageSolved(stageId)) {
    unlock();
  }
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

function renderTeamOnboarding() {
  document.querySelector("#gameStep").textContent = "PROLOGUE / 팀 등록";
  document.querySelector("#gameTitle").textContent = "본향 사건파일이 도착했습니다";
  document.querySelector("#gameIntro").textContent = "첫 현장을 열기 전에 이번 조사팀의 이름과 전용 비밀번호를 등록하십시오.";
  guideLink.href = "activity.html";
  gameBoard.innerHTML = `
    <section class="onboarding-panel">
      <p class="eyebrow">Case 11-13 · Prologue</p>
      <h2>도착하지 않은 사람들의 기록</h2>
      <p class="prologue-copy">본관 접수대에서 주인을 알 수 없는 사건파일이 발견되었습니다. 파일에는 목적지에 도착했다는 기록과 아직 길 위에 있다는 기록이 동시에 남아 있습니다.</p>
      <p class="prologue-copy">지금부터 여러분은 한 조사팀이 되어 여섯 현장을 추적합니다. 먼저 조 이름을 정하고, 다른 휴대폰에서도 같은 기록을 불러올 수 있도록 팀 비밀번호를 등록하십시오.</p>
      <form class="onboarding-form" id="onboardingForm">
        <label for="onboardingTeamName">조 이름</label>
        <input id="onboardingTeamName" type="text" placeholder="예: 3조 나그네들" autocomplete="off" required />
        <label for="onboardingTeamPassword">팀 비밀번호</label>
        <input id="onboardingTeamPassword" type="password" placeholder="팀원끼리 기억할 비밀번호" autocomplete="off" required />
        <button class="primary-button" type="submit">팀 등록하고 프롤로그 계속하기</button>
        <p class="onboarding-status" id="onboardingStatus" aria-live="polite">새 팀은 이 기기의 이전 테스트 기록을 지우고 시작합니다. 기존 팀은 같은 이름과 비밀번호로 진행 기록을 이어갑니다.</p>
      </form>
    </section>
  `;

  document.querySelector("#onboardingForm").addEventListener("submit", registerTeamFromOnboarding);
}

async function registerTeamFromOnboarding(event) {
  event.preventDefault();
  const name = document.querySelector("#onboardingTeamName").value.trim();
  const password = document.querySelector("#onboardingTeamPassword").value.trim();
  const status = document.querySelector("#onboardingStatus");
  const submit = event.currentTarget.querySelector("button[type='submit']");
  if (!name || !password) {
    status.textContent = "조 이름과 팀 비밀번호를 모두 입력하십시오.";
    return;
  }

  submit.disabled = true;
  status.textContent = "기존 팀 기록이 있는지 확인하는 중입니다.";
  let remote = null;
  try {
    remote = await window.HomewardSync?.getTeamProgress(name, password);
  } catch {
    remote = null;
  }

  clearLocalTeamProgress();
  const nextProgress = {
    teamName: name,
    teamPassword: password,
    activeStageId: "case",
    completed: {},
    notes: {},
    hintsCount: Number(remote?.hints || 0),
  };

  if (remote?.ok && remote.found) {
    (remote.completedStages || []).forEach((id) => {
      nextProgress.completed[id] = true;
      localStorage.setItem(`homeward-solved-${id}`, "true");
    });
    nextProgress.notes = remote.notes || {};
  }

  localStorage.setItem("homeward-case-progress", JSON.stringify(nextProgress));
  const nextTeamKey = teamSessionKey(name, password);
  localStorage.setItem("homeward-onboarded-team", nextTeamKey);
  localStorage.removeItem(prologueStorageKey(nextTeamKey));

  if (!remote?.found) {
    await window.HomewardSync?.send("saveProgress", {
      eventType: "team_registered",
      teamName: name,
      teamPassword: password,
      activeStageId: "case",
      activeStageTitle: puzzles.case.title,
      completedStages: [],
      completedCount: 0,
      totalStages: Object.keys(puzzles).length,
      notes: {},
      hintsCount: 0,
    });
  }

  window.location.reload();
}

function renderCasePrologue(teamKey) {
  document.querySelector("#gameStep").textContent = "PROLOGUE / 등록 완료";
  document.querySelector("#gameTitle").textContent = `${registeredProgress.teamName} 조사 시작`;
  document.querySelector("#gameIntro").textContent = "팀 등록을 마쳤습니다. 사건의 첫 모순을 확인하십시오.";
  guideLink.href = "activity.html?stage=case";
  gameBoard.innerHTML = `
    <section class="onboarding-panel prologue-panel">
      <p class="eyebrow">Investigation Briefing</p>
      <h2>사건번호 H-11-13</h2>
      <blockquote>“도착 확인 기록을 믿지 마십시오. 본관은 목적지가 아니라 출발 지점입니다.”</blockquote>
      <p class="prologue-copy">로비에는 다섯 개의 접수 기록과 그것을 여는 알파벳 카드가 흩어져 있습니다. 팀원들과 역할을 나누어 기록을 복원하고, 사건 메모와 맞지 않는 기록을 찾아내십시오.</p>
      <div class="onboarding-team-chip">등록 팀 · ${escapeHtml(registeredProgress.teamName)}</div>
      <button class="primary-button" id="startCaseInvestigation" type="button">00 본관 사건파일 시작</button>
    </section>
  `;
  document.querySelector("#startCaseInvestigation").addEventListener("click", () => {
    localStorage.setItem(prologueStorageKey(teamKey), "true");
    window.location.reload();
  });
}

function clearLocalTeamProgress() {
  localStorage.removeItem("homeward-case-progress");
  localStorage.removeItem("homeward-hint-starts");
  localStorage.removeItem("homeward-team-hints");
  localStorage.removeItem("homeward-onboarded-team");
  Object.keys(puzzles).forEach((id) => {
    localStorage.removeItem(`homeward-game-${id}`);
    localStorage.removeItem(`homeward-solved-${id}`);
    localStorage.removeItem(`homeward-keyword-${id}`);
  });
}

function teamSessionKey(name, password) {
  if (!name || !password) return "";
  return `${String(name).trim().toLowerCase()}::${String(password).trim()}`;
}

function prologueStorageKey(teamKey) {
  return `homeward-prologue-seen-${teamKey}`;
}

function hasSeenPrologue(teamKey) {
  return Boolean(teamKey) && localStorage.getItem(prologueStorageKey(teamKey)) === "true";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function unlock() {
  if (solved) return;
  solved = true;
  localStorage.setItem(`homeward-solved-${stageId}`, "true");
  localStorage.setItem(`homeward-keyword-${stageId}`, puzzle.keyword);

  try {
    const progress = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
    if (!progress.completed) progress.completed = {};
    progress.completed[stageId] = true;
    if (!progress.codes) progress.codes = {};
    progress.codes[stageId] = puzzle.code;
    localStorage.setItem("homeward-case-progress", JSON.stringify(progress));
  } catch (e) {
    console.error("Auto record progress error:", e);
  }

  updateHeaderKeywordBadge();

  codeValue.textContent = puzzle.code;
  codeMessage.textContent = puzzle.message;
  codePanel.hidden = false;
  codePanel.classList.remove("revealed");
  void codePanel.offsetWidth;
  codePanel.classList.add("revealed");
  codePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// unlock()이 남기는 모든 흔적을 되돌린다. 스테이지 자체 상태(homeward-game-*)만
// 지우면 homeward-solved-*, homeward-keyword-*, homeward-case-progress에는
// 완료 기록이 그대로 남아 "초기화했는데 여전히 완료로 보인다"는 문제가 생긴다.
function resetStageProgress(id) {
  localStorage.removeItem(`homeward-game-${id}`);
  localStorage.removeItem(`homeward-solved-${id}`);
  localStorage.removeItem(`homeward-keyword-${id}`);
  try {
    const activityProgress = loadActivityProgress();
    const teamKey = String(activityProgress.teamName || "local-team").trim().toLowerCase();
    const starts = loadHintStarts();
    delete starts[`${teamKey}::${id}`];
    localStorage.setItem("homeward-hint-starts", JSON.stringify(starts));
  } catch (e) {
    console.error("Reset hint timer error:", e);
  }
  try {
    const progress = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
    if (progress.completed) delete progress.completed[id];
    if (progress.codes) delete progress.codes[id];
    localStorage.setItem("homeward-case-progress", JSON.stringify(progress));
  } catch (e) {
    console.error("Reset progress error:", e);
  }
  window.location.reload();
}

function renderCasePuzzle() {
  const surface = getSurface();
  const state = loadPuzzleState("case", { selected: [], revealed: [], teamSlot: null, contradictionsConfirmed: false, solved: false });
  const records = [
    { id: "stampA", label: "기록 A", source: "도장 기록", text: "조사팀은 11:13에 목적지 본향 도착 확인 도장을 받았다.", false: true },
    { id: "listB", label: "기록 B", source: "명단 기록", text: "미도착 명단에는 아직 길 위에 있는 조사팀의 이름만 남는다.", false: false },
    { id: "deskC", label: "기록 C", source: "접수대 기록", text: "본관 접수대는 조사팀의 최종 목적지로 등록되었다.", false: true },
    { id: "numberD", label: "기록 D", source: "사건 번호 기록", text: "사건 번호 H-11-13의 H는 오기이므로 지워도 된다.", false: true },
    { id: "timeE", label: "기록 E", source: "시각 기록", text: "11:13은 조사팀이 도착한 시각이 아니라, 기록을 여는 위치다.", false: false },
  ];
  // 5개 팀 각각 서로 다른 4자리 암호를 쓰지만, 웹은 어느 팀 카드든 인정한다(팀 식별 없이도 동작).
  // 값은 print-materials.html "00 본관 5개 팀별 독자 보물찾기 암호 카드 마스터"의 A1~E5 매트릭스와 동일하다.
  const passcodes = {
    stampA: ["1113", "1114", "1115", "1116", "1117"],
    listB: ["2026", "2027", "2028", "2029", "2030"],
    deskC: ["3154", "3155", "3156", "3157", "3158"],
    numberD: ["4891", "4892", "4893", "4894", "4895"],
    timeE: ["5207", "5208", "5209", "5210", "5211"],
  };
  const falseIds = records.filter((r) => r.false).map((r) => r.id).sort().join(",");
  const allRevealed = () => records.every((r) => state.revealed.includes(r.id));
  const persist = () => savePuzzleState("case", state);

  function draw() {
    surface.innerHTML = `
      <p class="instruction">본관 로비에 숨겨진 알파벳 카드 A~E를 찾아, 카드에 적힌 4자리 암호로 각 기록을 복원하십시오. 다섯 기록을 모두 복원해야 사건 메모와의 대조를 시작할 수 있습니다.</p>
      ${adminPreview ? `<button class="secondary-button admin-reset" id="resetCase" type="button">관리자: 이 스테이지 초기화</button>` : ""}
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
            <p class="eyebrow">${allRevealed() ? "Cross-check" : "Field Recovery"}</p>
            <h3>접수 기록 5건 (${state.revealed.length}/5 복원)</h3>
            <p>${allRevealed() ? "사건 메모와 어긋나는 거짓 기록을 정확히 3건 고르십시오." : "현장 카드의 4자리 암호를 입력해 기록을 복원하십시오."}</p>
          </div>
          <div class="record-grid" id="recordGrid">
            ${records
              .map((r) => {
                const revealed = state.revealed.includes(r.id);
                if (!revealed) {
                  return `
                    <form class="record-locked" data-passcode-form="${r.id}">
                      <b>🔒 ${r.label} · ${r.source}</b>
                      <span class="locked-caption">현장 카드의 4자리 암호를 입력하십시오.</span>
                      <div class="passcode-row">
                        <input data-passcode-input="${r.id}" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="0000" />
                        <button type="submit" class="secondary-button">복원</button>
                      </div>
                    </form>
                  `;
                }
                return `
                  <button type="button" data-record="${r.id}" class="${state.selected.includes(r.id) ? "selected" : ""}" ${state.contradictionsConfirmed ? "disabled" : ""}>
                    <b>${r.label} · ${r.source}</b>
                    <span>${r.text}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
          ${
            !allRevealed()
              ? `<p class="locked-hint">아직 복원하지 못한 기록이 ${5 - state.revealed.length}건 남았습니다. 로비를 더 수색하십시오.</p>`
              : state.contradictionsConfirmed
              ? ""
              : `<button class="primary-button" id="confirmRecords" type="button">거짓 기록 3건 확정 (${state.selected.length}/3)</button>`
          }
          ${
            state.contradictionsConfirmed
              ? `
                <form id="identityForm">
                  <label for="identityInput">아직 목적지에 이르지 않은 조사팀의 정체성</label>
                  <input id="identityInput" autocomplete="off" placeholder="정체성 한 단어" />
                  <button class="primary-button" type="submit">정체성 확인</button>
                </form>
              `
              : ""
          }
          <div class="verse-panel" id="versePanel" ${state.solved ? "" : "hidden"}>
            <p class="eyebrow">Hebrews 11:13</p>
            <blockquote>또 땅에서는 나그네와 외국인임을 증언하였으니</blockquote>
            <p>사건번호 H-11-13은 이 정체성을 확인하는 기록이었습니다.</p>
          </div>
        </section>
      </div>
      <p class="feedback" id="feedback">${
        state.solved
          ? "본관은 접수 지점이었습니다. 아직 길 위에 있는 첫 정체성 기록이 복원되었습니다."
          : state.contradictionsConfirmed
          ? "거짓 기록 3건이 확정되었습니다. 이제 정체성을 입력하십시오."
          : !allRevealed()
          ? "본관 로비에서 알파벳 카드를 찾아 암호로 기록을 복원하십시오."
          : "다섯 기록 중 사건 메모와 어긋나는 거짓 기록 3건을 고르십시오."
      }</p>
    `;
    bind();
  }

  function bind() {
    const feedback = document.querySelector("#feedback");

    document.querySelectorAll("[data-passcode-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const id = form.dataset.passcodeForm;
        const input = form.querySelector(`[data-passcode-input="${id}"]`);
        const value = input.value.trim();

        // 첫 암호를 입력하는 순간 그 팀의 슬롯(1~5)이 고정된다. 이후 기록은
        // 반드시 같은 슬롯의 암호만 인정해, 다른 팀 카드가 섞여도 통과되지 않는다.
        if (state.teamSlot === null) {
          const matchedSlot = passcodes[id].indexOf(value);
          if (matchedSlot !== -1) {
            state.teamSlot = matchedSlot;
            state.revealed = [...state.revealed, id];
            persist();
            draw();
            return;
          }
          triggerFeedbackShake(feedback, "그 암호로는 이 기록이 열리지 않습니다. 카드의 알파벳과 기록 이름이 맞는지 다시 확인하십시오.");
          input.value = "";
          return;
        }

        if (value === passcodes[id][state.teamSlot]) {
          state.revealed = [...state.revealed, id];
          persist();
          draw();
          return;
        }

        const belongsToOtherTeam = passcodes[id].includes(value);
        triggerFeedbackShake(
          feedback,
          belongsToOtherTeam
            ? "그 암호는 다른 팀의 카드입니다. 우리 팀 카드가 맞는지 다시 확인하십시오."
            : "그 암호로는 이 기록이 열리지 않습니다. 카드의 알파벳과 기록 이름이 맞는지 다시 확인하십시오.",
        );
        input.value = "";
      });
    });

    document.querySelectorAll("[data-record]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.contradictionsConfirmed) return;
        const id = button.dataset.record;
        if (state.selected.includes(id)) {
          state.selected = state.selected.filter((x) => x !== id);
        } else if (state.selected.length < 3) {
          state.selected = [...state.selected, id];
        }
        persist();
        draw();
      });
    });

    document.querySelector("#confirmRecords")?.addEventListener("click", () => {
      if (state.selected.length !== 3) {
        triggerFeedbackShake(feedback, "정확히 3건을 선택해야 확정할 수 있습니다.");
        return;
      }
      const correct = [...state.selected].sort().join(",") === falseIds;
      if (!correct) {
        triggerFeedbackShake(feedback, "선택 중 일부는 사건 메모와 어긋나지 않습니다. 접수 시각, 위치, 목적지, 사건 번호 기록을 다시 대조하십시오.");
        return;
      }
      state.contradictionsConfirmed = true;
      persist();
      draw();
    });

    document.querySelector("#identityForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = normalize(document.querySelector("#identityInput").value);
      if (keyword === "나그네") {
        state.solved = true;
        persist();
        draw();
        unlock();
        return;
      }
      triggerFeedbackShake(feedback, "아직 정체성이 맞지 않습니다. 도착하지 않았고, 목적지도 미기록인 채 길 위에 있는 사람을 떠올려 보십시오.");
    });

    document.querySelector("#resetCase")?.addEventListener("click", () => resetStageProgress("case"));
  }

  draw();
  if (state.solved) unlock();
}

function renderFieldPuzzle() {
  const surface = getSurface();
  const state = loadPuzzleState("bag", { solved: false });
  const persist = () => savePuzzleState("bag", state);
  const memoHtml = `
    <div class="field-memo">
      <span class="eyebrow">발견된 메모</span>
      <p>"그늘에 앉아 벤치를 보니, 저곳이 더 편해 보이는구나. 내가 머물 곳은 돌베개를 베고 자는 것처럼 불편한 곳이고 싶지는 않다. 하지만 저 길목이 나를 부른다."</p>
    </div>
  `;

  function draw() {
    if (state.solved) {
      surface.innerHTML = `
        <section class="lock-result">
          <strong>키박스 개방 완료</strong>
          <p>완료 코드 <strong>TENT-01</strong>을 확인했습니다. 활동 페이지에 입력하십시오.</p>
        </section>
        <p class="feedback" id="feedback">쉬는 자리는 필요하지만, 목적지가 되면 길을 멈추게 합니다.</p>
        <a class="primary-button" href="activity.html?stage=bag">활동 페이지로 돌아가기</a>
        ${adminPreview ? `<button class="secondary-button admin-reset" id="resetField" type="button">관리자: 이 스테이지 초기화</button>` : ""}
      `;
      document.querySelector("#resetField")?.addEventListener("click", () => resetStageProgress("bag"));
      return;
    }

    surface.innerHTML = `
      <p class="instruction">현장에 떨어진 메모 한 장을 발견했습니다. 순서를 알려 주는 목록이 아니라, 문장 속에서 스스로 장소의 순서를 읽어내야 합니다.</p>
      ${adminPreview ? `<button class="secondary-button admin-reset" id="resetField" type="button">관리자: 이 스테이지 초기화</button>` : ""}
      ${memoHtml}
      <div class="lock-result">
        <strong>다음 행동</strong>
        <p>메모에 등장한 순서대로 현장 표식의 숫자를 읽어 네 자리 번호를 완성하고, 실제 키박스를 여십시오. 상자 안에서 발견한 완료 코드를 아래에 입력하십시오.</p>
        <form id="fieldCodeForm" class="code-entry">
          <input id="fieldCodeInput" autocomplete="off" placeholder="상자 안 완료 코드" />
          <button class="primary-button" type="submit">코드 확인</button>
        </form>
      </div>
      <p class="feedback" id="feedback">쉬는 자리는 필요하지만, 목적지가 되면 길을 멈추게 합니다.</p>
    `;

    document.querySelector("#fieldCodeForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.querySelector("#fieldCodeInput");
      if (normalize(input.value) === normalize("TENT-01")) {
        state.solved = true;
        persist();
        draw();
        unlock();
        return;
      }
      triggerFeedbackShake(document.querySelector("#feedback"), "그 코드는 아직 아닙니다. 실제 키박스를 열어 안에서 완료 코드를 확인하십시오.");
      input.value = "";
    });

    document.querySelector("#resetField")?.addEventListener("click", () => resetStageProgress("bag"));
  }

  draw();
  if (state.solved) unlock();
}

function renderPhonePuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("name", {
    notices: [],
    unlocked: false,
    wrongStreak: 0,
    lockedUntil: 0,
    photos: [],
    photoWrongStreak: 0,
    photoLockedUntil: 0,
    zoomedPhoto: null,
    original: "",
    originalWrongStreak: 0,
    originalLockedUntil: 0,
    memo: false,
    memoWrongStreak: 0,
    memoLockedUntil: 0,
    solved: false,
    attempts: 0,
  });
  // 사진 5장은 실물로도 인쇄해 현장에 걸어둔다(§GPT 목업 이미지, assets/stage-02/).
  // 웹 갤러리는 한 번에 다 안 보여주고 한 장씩만 순서대로 연다. 첫 장(성공한
  // 사람)도 예외 없이 코드로 열어야 한다 — 자동으로 확보되는 사진이 있으면
  // 그 사진만 웹 화면 확대로 코드가 새어 나갈 수 있기 때문이다. 사진 자체에는
  // 잠금해제 숫자를 넣지 않는다. keyword는 화면에 표시되지 않는다 — 실물
  // 인쇄본에만 태그로 인쇄되는 검색어라, 현장에서 그 사진을 직접 찾아야만
  // 알 수 있고, 그 단어를 검색 기록에서 찾으면 옆에 뜨는 "검색결과 N건"의
  // N이 코드다.
  const photos = [
    { id: "success", title: "성공한 사람", img: "assets/stage-02/photo-success.jpg", stamp: "임시 발급 · 반납 대상", real: false, code: "64", keyword: "우승" },
    { id: "approval", title: "인정받는 사람", img: "assets/stage-02/photo-approval.jpg", stamp: "임시 발급 · 반납 대상", real: false, code: "52", keyword: "박수" },
    { id: "welcome", title: "이달의 새 가족", img: "assets/stage-02/photo-welcome.jpg", stamp: "임시 발급 · 행사용", real: false, code: "19", keyword: "환영" },
    { id: "checkout", title: "퇴실 안내 사본", img: "assets/stage-02/photo-checkout.jpg", stamp: "사본 · 재발급", real: false, code: "36", keyword: "체크아웃" },
    { id: "promise", title: "약속 카드 03/16", img: "assets/stage-02/photo-promise.jpg", stamp: "원본 · 수정 없음", real: true, code: "07" },
  ];
  // 원래 기획(GAME_DEVELOPMENT_PLAN.md)엔 있었지만 구현에서 빠졌던 "검색 기록" 앱.
  // 정답을 설명하는 힌트체가 아니라, 나흘에 걸쳐 무너져가는 이 사람의 속마음을
  // 그대로 옮긴 일기/메모에 가깝게 쓴다: 우승 강박 → 빌린 정체성에 대한 불안
  // → 인정받을 때만 사는 것 같은 마음 → 소속감의 유효기간 → 이곳을 떠나야
  // 한다는 두려움 → 자신에 대한 회의, 그리고 마지막 줄에서 '약속을 지키는
  // 사람'이라는 조용한 답에 이르는 흐름.
  // 사진 잠금해제 코드(64/52/19/36/07)도 이 목록 안에 숨겨져 있지만, 코드를
  // 찾는 열쇠(검색어)는 웹이 아니라 실물 인쇄 사진에만 작은 태그로 인쇄된다
  // (stage-packets/stage-02.md 참고) — 그래서 참가자는 반드시 벽에 걸린 실물
  // 사진을 찾아가 태그를 확인해야만 이 목록에서 맞는 항목을 짚어낼 수 있다.
  const searchHistory = [
    { query: "이번에도 우승 못 하면 나는 뭐가 되는 걸까", time: "4일 전", results: 64 },
    { query: "이름표는 행사 끝나면 반납하라던데, 그다음엔 내가 뭐가 되지", time: "3일 전", results: 141 },
    { query: "다들 박수 쳐줄 때만 내가 나로 느껴진다", time: "3일 전", results: 52 },
    { query: "여기 말고 대체 어디가 본향이라는 걸까", time: "2일 전", results: 203 },
    { query: "환영받는다는 게 이렇게 빨리 식는 감정이었나", time: "2일 전", results: 19 },
    { query: "이 카드는 왜 반납 안 해도 된다는 걸까, 나머지는 다 반납해야 하는데", time: "어제", results: 6 },
    { query: "체크아웃 시간까지 남은 게 왜 이렇게 무섭지", time: "어제", results: 36 },
    { query: "나는 대체 뭘 좇고 있었던 걸까", time: "오늘", results: 4 },
    { query: "약속을 지키는 사람", time: "오늘", results: "07" },
  ];
  surface.innerHTML = `<p class="instruction">알림 → 현장 암호 → 벽면 사진에서 검색어 확인 → 검색 기록에서 코드 추리 → 원본 판별 → 메모 복원 순서로 확인하십시오.</p><div class="phone-board"><section class="phone-device"><div class="phone-island"></div><div class="phone-topbar"><span>11:13</span><span>숙소 Wi-Fi</span></div><div id="phoneFlow"></div><div class="phone-homebar"></div></section><section class="phone-investigation"><div class="deduction-steps"><strong>포렌식 진행</strong><ol><li>엄마와 룸메이트 알림을 각각 펼친다.</li><li>문 앞의 약속한 날을 MMDD로 입력한다.</li><li>화면에 뜨는 다음 사진의 이름을 보고 벽에서 그 실물 사진을 찾아, 적힌 검색어 태그를 확인한다.</li><li>그 검색어가 들어간 항목을 검색 기록에서 찾아 검색결과 숫자를 입력해 한 장씩 연다.</li><li>다섯 장을 다 열면 원본 도장 문구를 입력하고, 메모 마지막 줄을 복원한다.</li></ol></div>${adminPreview ? `<div class="fragment-board admin-preview-only"><p class="eyebrow">관리자 미리보기</p><h3>현장 기록 후보</h3><p>약속 카드 수령일 03/16 · 임시 이름표 2장 · 퇴실 안내 11:13 · 사진 5장 실물 인쇄본을 벽에 순서 무관하게 게시. 인쇄본에만 작은 검색어 태그(성공한 사람=우승, 인정받는 사람=박수, 이달의 새 가족=환영, 퇴실 안내 사본=체크아웃)를 추가 인쇄해, 그 단어로 검색 기록에서 코드를 찾게 한다(사진 파일 자체엔 태그 없음, 웹에도 노출 안 됨)</p><button class="secondary-button" id="resetStage" type="button">이 스테이지 초기화</button></div>` : ""}</section></div><p class="feedback" id="feedback" aria-live="polite"></p>`;
  const screen = document.querySelector("#phoneFlow");
  const feedback = document.querySelector("#feedback");
  const persist = () => savePuzzleState("name", state);
  let lockTimer = null;
  function updatePasscodeDots() {
    const length = document.querySelector("#phoneCode")?.value.length || 0;
    screen.querySelectorAll(".passcode-dots span").forEach((dot, index) => dot.classList.toggle("filled", index < length));
  }
  const noticeDetails = [["mom", "엄마", "약속한 날은 숙소 문 앞 기록에 남겨뒀어."], ["roommate", "룸메이트", "비밀번호 형식은 MMDD야."]];
  let activeApp = state.memo ? "memo" : "photo";
  function draw() {
    clearTimeout(lockTimer);
    if (!state.unlocked) {
      const remaining = Math.ceil((state.lockedUntil - Date.now()) / 1000);
      if (remaining > 0) {
        screen.innerHTML = `<div class="phone-lockscreen"><p>잠긴 휴대폰</p><strong>11:13</strong><span>입력 잠김</span></div><div class="phone-locked-warning"><p>비밀번호를 여러 번 잘못 입력했습니다.</p><p class="lock-countdown">${remaining}초 후 다시 시도할 수 있습니다.</p></div>`;
        feedback.textContent = "실제 휴대폰처럼 반복 오답 시 잠시 잠깁니다. 그동안 문 앞 기록을 다시 확인하십시오.";
        lockTimer = setTimeout(draw, 1000);
        return;
      }
      screen.innerHTML = `<div class="phone-lockscreen"><p>잠긴 휴대폰</p><strong>11:13</strong><span>${state.notices.length}/2 알림 확인</span></div><div class="lock-notifications">${noticeDetails.map(([id, from, text]) => `<button type="button" data-notice="${id}" class="notification-button ${state.notices.includes(id) ? "read" : ""}"><b>${from}</b><p>${state.notices.includes(id) ? text : "탭해서 알림 펼치기"}</p></button>`).join("")}</div>${state.notices.length === 2 ? `<form class="phone-passcode" id="phoneForm"><label>문 앞 기록을 MMDD로 입력</label><input id="phoneCode" inputmode="numeric" maxlength="4" autocomplete="off"><div class="passcode-dots"><span></span><span></span><span></span><span></span></div><div class="phone-keypad">${["1","2","3","4","5","6","7","8","9","지움","0","확인"].map(k => `<button type="${k === "확인" ? "submit" : "button"}" data-key="${k}">${k}</button>`).join("")}</div></form>` : ""}`;
      bindLocked();
      feedback.textContent = state.notices.length < 2 ? "두 알림을 모두 펼쳐 자료와 형식을 확인하십시오." : "숙소 문 앞에서 ‘약속한 날’을 찾아 MMDD로 입력하십시오.";
      return;
    }
    const memoReady = state.original === "promise";
    if (activeApp === "memo" && !memoReady) activeApp = "photo";
    screen.innerHTML = `<div class="phone-screen evidence-screen">${renderAppBody(memoReady)}</div><div class="phone-apps phone-apps-four"><button type="button" data-app="notices" class="${activeApp === "notices" ? "selected" : ""}"><span>✉</span>알림</button><button type="button" data-app="photo" class="${activeApp === "photo" ? "selected" : ""}"><span>□</span>사진</button><button type="button" data-app="search" class="${activeApp === "search" ? "selected" : ""}"><span>⌕</span>검색</button><button type="button" data-app="memo" class="${activeApp === "memo" ? "selected" : ""} ${memoReady ? "" : "app-locked"}" ${memoReady ? "" : 'aria-disabled="true"'}><span>${memoReady ? "M" : "🔒"}</span>메모</button></div>`;
    bindUnlocked(memoReady);
    feedback.textContent = activeApp === "notices" ? "이미 확인한 알림입니다. 사진 감식으로 돌아가 상태 도장을 비교하십시오." : activeApp === "search" ? "검색 기록만으로는 정답을 특정할 수 없습니다. 벽에 걸린 실물 사진에 적힌 검색어를 먼저 확인하십시오." : activeApp === "memo" ? "삭제된 두 이름 대신 들어갈 표현을 검색 기록에서 찾아 그대로 입력하십시오." : state.photos.length < 5 ? "다음 사진을 벽에서 찾아 적힌 검색어를 확인하고, 그 단어를 검색 기록에서 찾아 검색결과 숫자를 입력하십시오." : state.original === "promise" ? "원본이 확정되었습니다. 메모 탭으로 이동하십시오." : "다섯 장의 도장 문구를 직접 옮겨 적어 보십시오. 반복해서 등장하는 문구는 정답이 아닙니다.";
    const subLockRemaining = activeApp === "photo" ? (state.photos.length < 5 ? state.photoLockedUntil - Date.now() : state.originalLockedUntil - Date.now()) : activeApp === "memo" ? state.memoLockedUntil - Date.now() : 0;
    if (subLockRemaining > 0) lockTimer = setTimeout(draw, 1000);
  }
  function renderAppBody(memoReady) {
    if (activeApp === "notices") {
      return `<div class="phone-app-title"><span>알림 보관함</span><strong>읽기 전용</strong></div><div class="lock-notifications">${noticeDetails.map(([, from, text]) => `<article><b>${from}</b><p>${text}</p></article>`).join("")}</div>`;
    }
    if (activeApp === "search") {
      return `<div class="phone-app-title"><span>검색 기록</span><strong>최근 순</strong></div><div class="search-history-list">${searchHistory.map((s) => `<article><p>${s.query}</p><small>${s.time} · 검색결과 ${s.results}건</small></article>`).join("")}</div>`;
    }
    if (activeApp === "memo" && memoReady) {
      const deleted = `<p><s>성공한 사람</s> — 삭제됨</p><p><s>인정받는 사람</s> — 삭제됨</p>`;
      if (state.solved) {
        return `<div class="memo-note">${deleted}<p class="memo-final">빌린 이름은 바뀌지만, 그가 끝까지 찾던 말은 ‘약속을 지키는 사람’이었다.</p></div>`;
      }
      const remaining = Math.max(0, Math.ceil((state.memoLockedUntil - Date.now()) / 1000));
      if (remaining > 0) {
        return `<div class="memo-note">${deleted}<div class="phone-answer-locked"><strong>입력이 잠겼습니다.</strong><p class="lock-countdown">${remaining}초 후 다시 시도하십시오.</p></div></div>`;
      }
      return `<div class="memo-note">${deleted}<form id="memoForm" class="phone-answer-form"><label>지워진 두 이름 대신 마지막 줄에 들어갈 표현을, 검색 기록에서 찾아 그대로 입력하십시오.</label><input id="memoAnswer" autocomplete="off" placeholder="검색 기록의 마지막 문구" /><button type="submit" class="primary-button">복원</button></form></div>`;
    }
    const zoomed = photos.find((p) => p.id === state.zoomedPhoto);
    if (zoomed) {
      const unlockedPhotos = photos.filter((p) => state.photos.includes(p.id));
      const zoomedIndex = unlockedPhotos.findIndex((p) => p.id === zoomed.id);
      const canSwipe = unlockedPhotos.length > 1;
      return `<div class="photo-lightbox" id="photoLightbox"><button type="button" class="lightbox-close" id="closeLightbox">✕ 닫기</button><div class="polaroid-large"><div class="polaroid-image-wrap"><img src="${zoomed.img}" alt="${zoomed.title}" onerror="this.style.display='none'" /><span class="photo-stamp ${zoomed.real ? "stamp-real" : "stamp-fake"}">${zoomed.stamp}</span></div><p class="polaroid-caption">${zoomed.title}</p></div>${canSwipe ? `<div class="lightbox-nav"><button type="button" class="lightbox-arrow" id="lightboxPrev">‹ 이전</button><span class="lightbox-counter">${zoomedIndex + 1} / ${unlockedPhotos.length}</span><button type="button" class="lightbox-arrow" id="lightboxNext">다음 ›</button></div>` : ""}</div>`;
    }
    let sequencePanel = "";
    if (state.photos.length < 5) {
      const next = photos[state.photos.length];
      const remaining = Math.max(0, Math.ceil((state.photoLockedUntil - Date.now()) / 1000));
      sequencePanel = `<p class="phone-caption">다음 사진 ‘${next.title}’을 벽에서 찾아 적힌 검색어를 확인하고, 그 단어가 들어간 검색 기록의 검색결과 숫자를 입력하십시오.</p>` + (remaining > 0
        ? `<div class="phone-answer-locked"><strong>입력이 잠겼습니다.</strong><p class="lock-countdown">${remaining}초 후 다시 시도하십시오.</p></div>`
        : `<form id="photoCodeForm" class="phone-answer-form"><label>‘${next.title}’ 실물 사진의 검색어로 찾은 검색결과 숫자 입력</label><input id="photoCodeAnswer" inputmode="numeric" autocomplete="off" placeholder="숫자" /><button type="submit" class="primary-button">확인</button></form>`);
    } else if (state.original === "promise") {
      sequencePanel = `<p class="phone-caption">원본이 확정되었습니다. 메모 탭에서 마지막 줄을 복원하십시오.</p>`;
    } else {
      const remaining = Math.max(0, Math.ceil((state.originalLockedUntil - Date.now()) / 1000));
      sequencePanel = remaining > 0
        ? `<div class="phone-answer-locked"><strong>입력이 잠겼습니다.</strong><p class="lock-countdown">${remaining}초 후 다시 시도하십시오.</p></div>`
        : `<form id="originalForm" class="phone-answer-form"><label>다섯 기록 중 원본에만 있는 도장 문구를 그대로 입력하십시오.</label><input id="originalAnswer" autocomplete="off" placeholder="도장 문구" /><button type="submit" class="primary-button">제출</button></form>`;
    }
    return `<div class="phone-app-title"><span>사진 감식</span><strong>${state.photos.length}/5 확보</strong></div><div class="photo-evidence-grid photo-evidence-grid-5">${photos.map(p => state.photos.includes(p.id) ? `<button type="button" data-photo="${p.id}" class="polaroid-thumb viewed"><div class="polaroid-image-wrap"><img src="${p.img}" alt="" onerror="this.style.display='none'" /></div><small>${p.title}</small></button>` : `<div class="polaroid-thumb locked"><div class="polaroid-image-wrap locked-wrap"><span>🔒</span></div><small>???</small></div>`).join("")}</div>${sequencePanel}`;
  }
  function bindLocked() {
    screen.querySelectorAll("[data-notice]").forEach(b => b.addEventListener("click", () => { if (!state.notices.includes(b.dataset.notice)) state.notices.push(b.dataset.notice); persist(); draw(); }));
    const form = document.querySelector("#phoneForm");
    if (!form) return;
    form.querySelectorAll("[data-key]").forEach(b => b.addEventListener("click", () => { const input = document.querySelector("#phoneCode"); if (b.dataset.key === "확인") return; input.value = b.dataset.key === "지움" ? input.value.slice(0, -1) : (input.value + b.dataset.key).slice(0, 4); updatePasscodeDots(); }));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const value = document.querySelector("#phoneCode").value;
      state.attempts += 1;
      if (value === "0316") {
        state.unlocked = true;
        state.wrongStreak = 0;
        persist();
        draw();
        return;
      }
      state.wrongStreak = (state.wrongStreak || 0) + 1;
      if (state.wrongStreak >= 3) {
        state.lockedUntil = Date.now() + 15000;
        state.wrongStreak = 0;
        persist();
        draw();
        return;
      }
      triggerFeedbackShake(feedback, value === "1113" ? "그 숫자는 날짜가 아니라 퇴실 시각입니다." : value.length !== 4 ? "잠금 기록은 네 자리 MMDD 형식입니다." : "숫자의 모양보다 출처가 중요합니다. ‘약속한 날’의 수령 기록을 찾으십시오.");
      document.querySelector("#phoneCode").value = "";
      updatePasscodeDots();
      persist();
    });
  }
  function bindUnlocked(memoReady) {
    screen.querySelectorAll("[data-app]").forEach(b => b.addEventListener("click", () => {
      if (b.dataset.app === "memo" && !memoReady) { triggerFeedbackShake(feedback, "메모의 봉인이 남아 있습니다. 사진 기록의 진위를 먼저 확정하세요."); return; }
      activeApp = b.dataset.app;
      state.zoomedPhoto = null;
      if (activeApp === "memo") state.memo = true;
      persist();
      draw();
    }));
    screen.querySelectorAll("[data-photo]").forEach(b => b.addEventListener("click", () => {
      state.zoomedPhoto = b.dataset.photo;
      persist();
      draw();
    }));
    document.querySelector("#closeLightbox")?.addEventListener("click", () => { state.zoomedPhoto = null; persist(); draw(); });
    function navigateLightbox(direction) {
      const unlockedPhotos = photos.filter((p) => state.photos.includes(p.id));
      const index = unlockedPhotos.findIndex((p) => p.id === state.zoomedPhoto);
      if (index === -1 || unlockedPhotos.length < 2) return;
      const nextIndex = (index + direction + unlockedPhotos.length) % unlockedPhotos.length;
      state.zoomedPhoto = unlockedPhotos[nextIndex].id;
      persist();
      draw();
    }
    document.querySelector("#lightboxPrev")?.addEventListener("click", () => navigateLightbox(-1));
    document.querySelector("#lightboxNext")?.addEventListener("click", () => navigateLightbox(1));
    const lightboxEl = document.querySelector("#photoLightbox");
    if (lightboxEl) {
      let touchStartX = null;
      lightboxEl.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
      lightboxEl.addEventListener("touchend", (e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) navigateLightbox(dx > 0 ? -1 : 1);
        touchStartX = null;
      }, { passive: true });
    }
    document.querySelector("#photoCodeForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#photoCodeAnswer");
      const next = photos[state.photos.length];
      if (next && normalize(input.value) === normalize(next.code)) {
        state.photos.push(next.id);
        state.photoWrongStreak = 0;
        state.zoomedPhoto = next.id;
        persist();
        draw();
        return;
      }
      state.photoWrongStreak = (state.photoWrongStreak || 0) + 1;
      if (state.photoWrongStreak >= 3) {
        state.photoLockedUntil = Date.now() + 10000;
        state.photoWrongStreak = 0;
        persist();
        draw();
        return;
      }
      triggerFeedbackShake(document.querySelector("#feedback"), "그 숫자가 아닙니다. 벽면 실물 사진에 적힌 검색어를 다시 확인하십시오.");
      input.value = "";
      persist();
    });
    document.querySelector("#originalForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#originalAnswer");
      if (normalize(input.value) === normalize("수정 없음")) {
        state.original = "promise";
        state.originalWrongStreak = 0;
        persist();
        draw();
        return;
      }
      state.originalWrongStreak = (state.originalWrongStreak || 0) + 1;
      if (state.originalWrongStreak >= 3) {
        state.originalLockedUntil = Date.now() + 10000;
        state.originalWrongStreak = 0;
        persist();
        draw();
        return;
      }
      triggerFeedbackShake(document.querySelector("#feedback"), "많이 찍힌 기록이 원본이라는 뜻은 아닙니다. 다섯 장의 도장 문구를 다시 대조하십시오.");
      input.value = "";
      persist();
    });
    document.querySelector("#memoForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#memoAnswer");
      if (normalize(input.value) === normalize("약속을 지키는 사람")) {
        state.solved = true;
        persist();
        draw();
        unlock();
        return;
      }
      state.memoWrongStreak = (state.memoWrongStreak || 0) + 1;
      if (state.memoWrongStreak >= 3) {
        state.memoLockedUntil = Date.now() + 10000;
        state.memoWrongStreak = 0;
        persist();
        draw();
        return;
      }
      triggerFeedbackShake(document.querySelector("#feedback"), "이 이름들이 아닙니다. 검색 기록의 가장 최근 문구를 그대로 옮겨 적으십시오.");
      input.value = "";
      persist();
    });
  }
  document.querySelector("#resetStage")?.addEventListener("click", () => resetStageProgress("name"));
  draw();
  if (state.solved) unlock();
}

function renderInventoryPuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("ledger", {
    step: "briefing",
    roles: [],
    found: [],
    suspects: [],
    culprit: "",
    checks: [],
    solved: false,
  });
  const items = [
    { id: "wheat", mark: "○", item: "밀", found: "조리대", shelf: 2, text: "먼저 처리 — 조리대로 이동", author: "배급 담당", altered: true },
    { id: "oil", mark: "△", item: "기름", found: "출입구", shelf: 3, text: "먼저 처리 — 출입구로 이동", author: "배급 담당", altered: true },
    { id: "salt", mark: "□", item: "소금", found: "조리대", shelf: 4, text: "먼저 처리 — 조리대로 이동", author: "배급 담당", altered: true },
    { id: "bean", mark: "◇", item: "콩", found: "선반 5", shelf: 5, text: "확인 뒤 인계 — 원래 자리 유지", author: "장부 담당", altered: false },
    { id: "fruit", mark: "☆", item: "건과일", found: "선반 1", shelf: 1, text: "확인 뒤 인계 — 원래 자리 유지", author: "보관 담당", altered: false },
    { id: "water", mark: "+", item: "물", found: "선반 6", shelf: 6, text: "확인 뒤 인계 — 원래 자리 유지", author: "열쇠 담당", altered: false },
  ];
  const roleList = [
    { name: "수색 담당 A", task: "조리대와 홀수 선반의 재고 카드 3장 회수" },
    { name: "수색 담당 B", task: "출입구와 짝수 선반의 재고 카드 3장 회수" },
    { name: "보관 복원 담당", task: "원본 선반 안내도 지침으로 카드 6장 위치 복원" },
    { name: "기록 감식 담당", task: "웹 변경 기록 6건 감식 및 반복 문구 포착" },
    { name: "권한 확인 담당", task: "네 담당자 권한표 대조해 직권 오남용 판단" },
    { name: "반증·발표 담당", task: "사실·추론·결론 정리 및 최종 지목" },
  ];
  const authorityList = [
    { role: "보관 담당", perm: "봉인 전 선반 배치", forbid: "장부 문장 수정", quote: "“원본 안내도대로 여섯 자리를 채웠다.”" },
    { role: "장부 담당", perm: "인계 완료 뒤 문장 확정", forbid: "혼자 위치 변경", quote: "“`확인 뒤 인계`가 원래 문장이다.”" },
    { role: "열쇠 담당", perm: "두 사람 입회 때 창고 개방", forbid: "카드·장부 단독 변경", quote: "“봉인 뒤에는 혼자 문을 연 적이 없다.”" },
    { role: "배급 담당", perm: "확정된 장부대로 전달", forbid: "위치·조건 임의 변경", quote: "“급한 품목은 먼저 처리해도 된다고 판단했다.”" },
  ];

  surface.innerHTML = `<p class="instruction">역할을 나누고 원본 위치·변경 문장·권한을 대조해 실제 상자의 번호를 복원하십시오.</p>${adminPreview ? `<button class="secondary-button admin-reset" id="resetLedger" type="button">관리자: 이 스테이지 초기화</button>` : ""}<section class="case-flow" id="ledgerFlow"></section><p class="feedback" id="feedback" aria-live="polite"></p>`;
  const flow = document.querySelector("#ledgerFlow");
  const feedback = document.querySelector("#feedback");
  const persist = () => savePuzzleState("ledger", state);
  const advance = (step) => {
    state.step = step;
    persist();
    draw();
  };

  function draw() {
    const progress = `<div class="flow-progress">1. 브리핑 · 2. 수색 · 3. 복원 · 4. 기록 감식 · 5. 용의자 · 6. 자물쇠 · 7. 완료</div>`;

    if (state.step === "briefing") {
      flow.innerHTML = `${progress}<h3>03 식량 장부 사건 브리핑</h3><p>수색 A/B, 보관 복원, 기록 감식, 권한 확인, 반증·발표 역할을 나누십시오. 최소 세 역할이 결론 전에 근거를 확인해야 합니다.</p><div class="role-grid">${roleList.map((r) => `<button type="button" data-role="${r.name}" class="role-card ${state.roles.includes(r.name) ? "selected" : ""}"><strong>${r.name}</strong><small>${r.task}</small></button>`).join("")}</div><button class="primary-button" id="next" type="button">역할 배정 완료 (${state.roles.length}/6)</button>`;
    }
    if (state.step === "search") {
      flow.innerHTML = `${progress}<h3>재고 카드 6장 회수</h3><p>조리대, 출입구, 선반 주변에서 찾은 흑백 재고 카드를 체크하십시오. 발견 위치는 원래 자리가 아닐 수 있습니다.</p><div class="check-grid">${items.map((x) => `<button type="button" data-found="${x.id}" class="${state.found.includes(x.id) ? "selected" : ""}"><b>${x.mark} ${x.item}</b><small>발견 장소: ${x.found}</small></button>`).join("")}</div><button class="primary-button" id="next" ${state.found.length === 6 ? "" : "disabled"}>6장 인계 (${state.found.length}/6)</button>`;
    }
    if (state.step === "restore") {
      flow.innerHTML = `${progress}<h3>봉인 전 원본 선반 안내도 (웹 화면 A)</h3><p class="eyebrow">보관 복원 담당 지침</p><ol class="shelf-clues"><li>물은 가장 아래 선반에 둔다 (선반 6).</li><li>콩은 물 바로 위에 둔다 (선반 5).</li><li>소금은 콩 바로 위에 둔다 (선반 4).</li><li>기름은 소금 바로 위에 둔다 (선반 3).</li><li>밀은 기름 바로 위에 둔다 (선반 2).</li><li>건과일은 가장 위 선반에 둔다 (선반 1).</li></ol><div class="shelf-stack"><strong>복원된 원래 선반 위치 (현장 매트 대조용)</strong>${[1, 2, 3, 4, 5, 6].map((n) => { const item = items.find((x) => x.shelf === n); return `<div><b>선반 ${n}</b><span>${item.mark} ${item.item}</span></div>`; }).join("")}</div><p class="phone-caption">보관 복원 담당자는 현장 매트의 선반 1~6에 카드를 올바르게 배치했는지 확인하십시오.</p><button class="primary-button" id="next" type="button">현장 매트 복원 완료</button>`;
    }
    if (state.step === "audit") {
      flow.innerHTML = `${progress}<h3>변경 기록 6건 감식 (웹 화면 B)</h3><p>원래 선반, 원본 문장 ‘확인 뒤 인계’, 담당 권한이 모두 어긋난 <strong>세 건의 조작 기록</strong>을 고르십시오.</p><div class="authority-summary"><strong>담당별 권한표 요약</strong>${authorityList.map((a) => `<div><b>${a.role}:</b> ${a.perm} | <small>금지: ${a.forbid}</small> <em>${a.quote}</em></div>`).join("")}</div><div class="record-grid">${items.map((x) => `<button type="button" data-suspect="${x.id}" class="${state.suspects.includes(x.id) ? "selected" : ""}"><b>${x.mark} ${x.item}</b><span>발견 장소: ${x.found}</span><span>기록 문장: ${x.text}</span><small>기록자: ${x.author}</small></button>`).join("")}</div><button class="primary-button" id="audit" type="button">의심 기록 3건 확정 (${state.suspects.length}/3)</button>`;
    }
    if (state.step === "accuse") {
      flow.innerHTML = `${progress}<h3>사건 결론 (웹 화면 C)</h3><p>맡겨진 위치와 인계 원칙을 자기 판단으로 바꾼 담당자는 누구인가?</p><p class="eyebrow">세 역할의 근거 확인 (필수)</p><div class="check-grid">${["복원 위치 확인", "기록 문장 확인", "권한표 확인"].map((x) => `<button type="button" data-check="${x}" class="${state.checks.includes(x) ? "selected" : ""}">✓ ${x}</button>`).join("")}</div><p class="eyebrow">용의자 지목</p><div class="choice-grid">${["보관 담당", "장부 담당", "열쇠 담당", "배급 담당"].map((x) => `<button type="button" data-culprit="${x}">${x}</button>`).join("")}</div>`;
    }
    if (state.step === "unlock") {
      flow.innerHTML = `${progress}<h3>실제 자물쇠 개방 지시</h3><div class="lock-sequence-box"><div class="lock-sequence-item"><span class="mark">□</span><span class="item-name">소금</span><span class="shelf-num">선반 4</span></div><div>→</div><div class="lock-sequence-item"><span class="mark">△</span><span class="item-name">기름</span><span class="shelf-num">선반 3</span></div><div>→</div><div class="lock-sequence-item"><span class="mark">○</span><span class="item-name">밀</span><span class="shelf-num">선반 2</span></div></div><p>복원 매트의 <strong>원래 선반 번호</strong>를 인계 표식 순서(<strong>□ → △ → ○</strong>)대로 읽어 실제 3자리 자물쇠를 여십시오.</p><div class="physical-lock-note">웹에는 번호를 입력하지 않습니다. 상자를 열었으면 안의 결과 카드를 꺼내십시오.</div><button class="primary-button" id="opened" type="button">실제 상자를 열었다</button>`;
    }
    if (state.step === "complete") {
      flow.innerHTML = `${progress}<h3>결과 카드 확인</h3><p>배급 담당은 빠르게 나누려는 자기 판단으로 맡겨진 위치와 인계 원칙을 바꾸었습니다. 여러분은 수량을 맞춘 것이 아니라, 원래 뜻대로 자리를 복원하고 변경의 책임을 밝혔습니다. 맡은 것을 주인의 뜻대로 지키고 설명하는 사람이 청지기입니다.</p><div class="evidence-strip"><span>결과 키워드: 청지기</span><span>완료 코드: STEWARD-03</span></div><a class="primary-button" href="activity.html?stage=ledger">활동 페이지로 이동</a>`;
    }
    bind();
  }

  function bind() {
    flow.querySelectorAll("[data-role]").forEach((b) =>
      b.addEventListener("click", () => {
        const role = b.dataset.role;
        state.roles = state.roles.includes(role) ? state.roles.filter((r) => r !== role) : [...state.roles, role];
        persist();
        draw();
      })
    );
    document.querySelector("#next")?.addEventListener("click", () => {
      if (state.step === "search" && state.found.length < 6) {
        triggerFeedbackShake(feedback, "현장에서 6장의 재고 카드를 모두 발견한 뒤 다음으로 진행하십시오.");
        return;
      }
      advance({ briefing: "search", search: "restore", restore: "audit" }[state.step]);
    });
    flow.querySelectorAll("[data-found]").forEach((b) =>
      b.addEventListener("click", () => {
        state.found = state.found.includes(b.dataset.found) ? state.found.filter((x) => x !== b.dataset.found) : [...state.found, b.dataset.found];
        persist();
        draw();
      })
    );
    flow.querySelectorAll("[data-suspect]").forEach((b) =>
      b.addEventListener("click", () => {
        state.suspects = state.suspects.includes(b.dataset.suspect)
          ? state.suspects.filter((x) => x !== b.dataset.suspect)
          : state.suspects.length < 3
          ? [...state.suspects, b.dataset.suspect]
          : state.suspects;
        persist();
        draw();
      })
    );
    document.querySelector("#audit")?.addEventListener("click", () => {
      const correct = items.filter((x) => x.altered).every((x) => state.suspects.includes(x.id)) && state.suspects.length === 3;
      if (!correct) {
        triggerFeedbackShake(
          feedback,
          state.suspects.length !== 3
            ? "사라진 것은 세 건입니다. 같은 표현이 반복된 기록부터 찾으십시오."
            : "발견 장소만으로 판단하지 마십시오. 원래 선반, 문장, 권한이 모두 어긋나는지 확인하십시오."
        );
        return;
      }
      advance("accuse");
    });
    flow.querySelectorAll("[data-check]").forEach((b) =>
      b.addEventListener("click", () => {
        if (!state.checks.includes(b.dataset.check)) state.checks.push(b.dataset.check);
        persist();
        draw();
      })
    );
    flow.querySelectorAll("[data-culprit]").forEach((b) =>
      b.addEventListener("click", () => {
        if (state.checks.length < 3) {
          triggerFeedbackShake(feedback, "최소 세 역할이 위치·문장·권한 근거를 모두 확인해야 합니다.");
          return;
        }
        if (b.dataset.culprit !== "배급 담당") {
          triggerFeedbackShake(feedback, "그 담당자에게 위치와 인계 문장을 함께 바꿀 기회가 있었습니까? 권한표와 서명을 다시 대조하십시오.");
          return;
        }
        state.culprit = b.dataset.culprit;
        advance("unlock");
      })
    );
    document.querySelector("#opened")?.addEventListener("click", () => {
      state.step = "complete";
      state.solved = true;
      persist();
      draw();
      unlock();
    });
  }

  document.querySelector("#resetLedger")?.addEventListener("click", () => resetStageProgress("ledger"));

  draw();
  if (state.solved) unlock();
}

function renderLoopPuzzleV2() {
  const surface = getSurface();
  const state = loadPuzzleState("road", { phase: "briefing", index: 0, loops: 0, history: [], fragments: [], slots: [], interpretation: "", directionInput: [], solved: false });
  // 방향 자물쇠는 실물 하드웨어(방향 자물쇠 봉투) 없이 웹에서 직접 입력한다.
  // 04는 이미 루프 탐색·장면 카드·문장 조각 조합으로 현장 물리 활동이 충분해서,
  // 마지막 방향 입력만 웹으로 옮겨도 스테이지의 물리성이 사라지지 않는다(02와 동일한 예외).
  const correctDirection = ["오른쪽", "위", "왼쪽", "위"];
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
    if (state.phase === "direction") {
      const dirLabels = [
        ["오른쪽", "→"],
        ["위", "↑"],
        ["왼쪽", "←"],
        ["아래", "↓"],
      ];
      flow.innerHTML = `<section class="direction-lock"><p class="eyebrow">Direction Lock</p><h3>방향 자물쇠</h3><p>완성한 문장 순서대로 현장 카드 가장자리의 방향 홈을 읽고, 같은 순서로 아래 방향을 눌러 자물쇠를 여십시오.</p><div class="direction-slots">${[0, 1, 2, 3].map((i) => `<span class="direction-slot ${state.directionInput[i] ? "filled" : ""}">${state.directionInput[i] || i + 1}</span>`).join("")}</div><div class="direction-pad">${dirLabels.map(([label, arrow]) => `<button type="button" data-direction="${label}" ${state.directionInput.length >= 4 ? "disabled" : ""}>${arrow}<small>${label}</small></button>`).join("")}</div><button class="secondary-button" id="resetDirection" type="button">다시 입력</button></section>`;
    }
    if (state.phase === "complete") flow.innerHTML = `<section class="sentence-lock"><h3>방향 자물쇠 해제 완료</h3><p>완료 코드 <strong>BETTER-04</strong>를 확인했습니다. 활동 페이지에 입력하십시오.</p><a class="primary-button" href="activity.html?stage=road">활동 페이지로 이동</a></section>`;
    bind();
  }
  function bind() {
    document.querySelector("#startLoops")?.addEventListener("click", () => { state.phase = "loops"; persist(); draw(); });
    flow.querySelectorAll("[data-road-choice]").forEach(b => b.addEventListener("click", () => { const scene = scenes[state.index]; if (b.dataset.roadChoice !== scene.answer) { state.loops += 1; state.history.push(`${scene.mark}: ${b.textContent.trim()} → 처음으로 돌아옴`); state.index = 0; persist(); draw(); const fb = document.querySelector("#feedback"); triggerFeedbackShake(fb, scene.fail); return; } if (!state.fragments.includes(scene.fragment)) state.fragments.push(scene.fragment); state.history.push(`${scene.mark}: 선택 통과 · 조각 회수`); state.index += 1; if (state.index === 4) state.phase = "assemble"; persist(); draw(); }));
    flow.querySelectorAll("[data-fragment]").forEach(b => b.addEventListener("click", () => { if (state.slots.length < 4) state.slots.push(b.dataset.fragment); persist(); draw(); }));
    flow.querySelectorAll("[data-slot]").forEach(b => b.addEventListener("click", () => { state.slots.splice(Number(b.dataset.slot), 1); persist(); draw(); }));
    document.querySelector("#checkSentence")?.addEventListener("click", () => { if (!fragments.every((f,i) => state.slots[i] === f.id)) { triggerFeedbackShake(feedback, "무엇을 떠나 무엇을 사모했는지 한 문장으로 다시 읽으십시오."); return; } state.phase = "interpret"; persist(); draw(); });
    flow.querySelectorAll("[data-meaning]").forEach(b => b.addEventListener("click", () => { if (b.dataset.meaning !== "record") { triggerFeedbackShake(feedback, "화살표가 목적지라면 반복 기록은 필요 없었을 겁니다. D 문구를 다시 확인하십시오."); return; } state.interpretation = "record"; state.phase = "direction"; persist(); draw(); }));
    flow.querySelectorAll("[data-direction]").forEach(b => b.addEventListener("click", () => {
      if (state.directionInput.length >= 4) return;
      state.directionInput = [...state.directionInput, b.dataset.direction];
      if (state.directionInput.length === 4) {
        const correct = correctDirection.every((d, i) => state.directionInput[i] === d);
        if (correct) {
          state.phase = "complete";
          state.solved = true;
          persist();
          draw();
          unlock();
          return;
        }
        persist();
        draw();
        triggerFeedbackShake(feedback, "그 방향으로는 자물쇠가 열리지 않습니다. 완성한 문장 순서를 다시 떠올려 보십시오.");
        window.setTimeout(() => { state.directionInput = []; persist(); draw(); }, 900);
        return;
      }
      persist();
      draw();
    }));
    document.querySelector("#resetDirection")?.addEventListener("click", () => { state.directionInput = []; persist(); draw(); });
  }
  document.querySelector("#resetRoad")?.addEventListener("click", () => resetStageProgress("road"));
  draw(); if (state.solved) unlock();
}

function renderHomePuzzle() {
  const answers = [
    { id: "case", label: "00 본관 키워드", answer: "나그네" },
    { id: "bag", label: "01 야외 키워드", answer: "장막" },
    { id: "name", label: "02 숙소 키워드", answer: "약속" },
    { id: "ledger", label: "03 창고 키워드", answer: "청지기" },
    { id: "road", label: "04 길 키워드", answer: "더 나은 본향" },
  ];
  const surface = getSurface();
  const state = loadPuzzleState("home", { phase: "assemble", teamName: "", solved: false });

  // 활동 페이지에 저장된 팀 이름 가져오기
  try {
    const activityState = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
    if (activityState.teamName && !state.teamName) {
      state.teamName = activityState.teamName;
    }
  } catch {
    // fallback
  }

  const persist = () => savePuzzleState("home", state);
  const declarationText = (team) =>
    `${team}은 장막을 집으로 착각했던 나그네였지만, 약속을 붙들고 청지기로 살아, 더 나은 본향을 향해 걷는 사람입니다.`;

  function draw() {
    if (state.phase === "physical") {
      surface.innerHTML = `
        <section class="direction-lock physical-only">
          <p class="eyebrow">Physical Lock Verification</p>
          <h3>실제 최종 상자 개방</h3>
          <div class="declaration-preview-box" style="margin: 16px 0; padding: 18px; border: 2px solid var(--gold); border-radius: 8px; background: rgba(185,138,53,0.1); color: var(--forest); font-weight: 900; font-size: 18px; line-height: 1.6;">
            ✨ ${declarationText(state.teamName || "우리 팀")}
          </div>
          <p>웹에서 완성한 귀향 선언문과 5개 키워드 카드를 최종 상자 앞에 나란히 놓고, 상자의 실제 4자리 자물쇠(1116)를 열어 상자를 개방하십시오.</p>
          <p class="physical-lock-note">상자를 열었다면 내부에서 종결 완료 코드 <strong>HOMEWARD-05</strong>를 확인하십시오.</p>
          <button class="primary-button" id="opened" type="button">실제 최종 상자를 열었다</button>
        </section>
        <p class="feedback" id="feedback">상자를 열고 안의 완료 코드를 활동 페이지 수첩에 입력하십시오.</p>
        ${adminPreview ? `<button class="secondary-button admin-reset" id="resetHome" type="button">관리자: 이 스테이지 초기화</button>` : ""}
      `;
      document.querySelector("#opened").addEventListener("click", () => {
        state.phase = "complete";
        state.solved = true;
        persist();
        draw();
        unlock();
      });
      document.querySelector("#resetHome")?.addEventListener("click", () => resetStageProgress("home"));
      return;
    }

    if (state.phase === "complete") {
      surface.innerHTML = `
        <div class="declaration" id="declaration" style="padding: 24px; border: 2px solid var(--gold); border-radius: 10px; background: #16261f; color: #fffdf6; font-size: 22px; font-weight: 900; line-height: 1.6; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
          ${declarationText(state.teamName || "우리 팀")}
        </div>
        <p class="feedback" id="feedback" style="color: var(--leaf); font-weight: 900; margin-top: 16px;">
          🎉 최종 사건파일이 종결되었습니다! 수첩(활동 페이지)으로 돌아가 최종 완료 코드 <strong>HOMEWARD-05</strong>를 입력하십시오.
        </p>
        ${adminPreview ? `<button class="secondary-button admin-reset" id="resetHome" type="button">관리자: 이 스테이지 초기화</button>` : ""}
      `;
      document.querySelector("#resetHome")?.addEventListener("click", () => resetStageProgress("home"));
      return;
    }

    // 회수된 키워드 확인
    const savedKeywords = {};
    answers.forEach((item) => {
      savedKeywords[item.id] = localStorage.getItem(`homeward-keyword-${item.id}`) || "";
    });

    surface.innerHTML = `
      <p class="instruction">수첩에 모은 5개 디지털 키워드를 순서대로 확인하고 조합하여 마지막 귀향 선언문을 완성하십시오.</p>
      ${adminPreview ? `<button class="secondary-button admin-reset" id="resetHome" type="button">관리자: 이 스테이지 초기화</button>` : ""}
      <div class="keyword-auto-fill-strip" style="margin-bottom: 16px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <span style="font-weight: 900; color: var(--forest); font-size: 14px;">보관된 키워드 뱃지:</span>
        ${answers
          .map((item) => {
            const kw = savedKeywords[item.id];
            return kw
              ? `<button type="button" class="secondary-button autofill-btn" data-target="${item.id}" data-val="${kw}" style="padding: 4px 10px; font-size: 13px;">${item.label.split(" ")[0]}: ${kw}</button>`
              : `<span style="font-size: 12px; color: var(--muted); padding: 4px 8px; border: 1px dashed var(--line); border-radius: 6px;">${item.label.split(" ")[0]}: 미회수</span>`;
          })
          .join("")}
      </div>

      <div class="final-board">
        ${answers
          .map(
            (item) => `
              <label>
                <span>${item.label}</span>
                <input id="input-${item.id}" data-answer="${item.answer}" autocomplete="off" placeholder="예: ${item.answer}" value="${savedKeywords[item.id] || ""}" />
              </label>
            `,
          )
          .join("")}
        <label>
          <span>조사팀 이름</span>
          <input id="teamDeclarationName" autocomplete="off" placeholder="예: 3조 순례자들" value="${state.teamName || ""}" />
        </label>
      </div>

      <div class="declaration" id="declaration" style="margin-top: 16px; padding: 18px; border: 1px dashed var(--gold); border-radius: 8px; background: rgba(185,138,53,0.08); color: var(--forest); font-weight: 900; text-align: center;">
        "[팀 이름]은 장막을 집으로 착각했던 나그네였지만, 약속을 붙들고 청지기로 살아, 더 나은 본향을 향해 걷는 사람입니다."
      </div>

      <div class="check-line" style="margin-top: 18px;">
        <button class="primary-button" type="button" id="checkFinal">귀향 선언문 조합 검증</button>
      </div>
      <p class="feedback" id="feedback">5개 단어와 순서가 모두 일치해야 클라이맥스 검증 단계로 넘어갑니다.</p>
    `;

    // autofill 버튼 이벤트
    surface.querySelectorAll(".autofill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const val = btn.dataset.val;
        const input = surface.querySelector(`#input-${targetId}`);
        if (input) input.value = val;
      });
    });

    document.querySelector("#checkFinal").addEventListener("click", () => {
      const inputs = [...surface.querySelectorAll("[data-answer]")];
      const correct = inputs.every((input) => normalize(input.value) === normalize(input.dataset.answer));
      inputs.forEach((input) => {
        input.dataset.status = normalize(input.value) === normalize(input.dataset.answer) ? "correct" : "miss";
      });

      if (!correct) {
        triggerFeedbackShake(document.querySelector("#feedback"), "키워드 단어나 순서가 올바르지 않습니다. 수집 보드의 단서들을 다시 확인하십시오.");
        triggerShake(surface.querySelector(".final-board"));
        return;
      }

      state.teamName = document.querySelector("#teamDeclarationName").value.trim() || state.teamName || "우리 팀";
      state.phase = "physical";
      persist();
      draw();
    });

    document.querySelector("#resetHome")?.addEventListener("click", () => resetStageProgress("home"));
  }

  draw();
  if (state.solved) unlock();
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
