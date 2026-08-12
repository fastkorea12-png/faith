const stages = [
  {
    id: "case",
    step: "00",
    place: "본관 / 접수",
    title: "조작된 사건파일",
    code: "PILGRIM-00",
    minutes: 18,
    hint1: "로비에 숨겨진 알파벳 카드 A~E를 먼저 모두 찾게 합니다. 카드의 4자리 숫자가 같은 알파벳 기록의 암호입니다.",
    hint2: "다섯 기록을 모두 복원했다면, 사건 메모의 '아직 길 위에 있는 팀' 문장과 어긋나는 기록 3건을 대조하게 합니다.",
    hostNote: "본관 로비 곳곳(소파, 책장, 게시판 뒷면 등)에 팀별 알파벳 카드 A~E(각 팀 전용 4자리 암호, print-materials.html 매트릭스 참고) 5장을 숨겨 둡니다. 정답은 절대 직접 말하지 않습니다.",
  },
  {
    id: "bag",
    step: "01",
    place: "야외 시설",
    title: "너무 오래 머문 자리",
    code: "TENT-01",
    minutes: 18,
    hint1: "발견한 메모를 목록이 아니라 이야기로 다시 천천히 읽게 합니다. 장소가 등장하는 순서가 곧 표식을 읽는 순서입니다.",
    hint2: "메모 속 순서는 그늘 → 벤치 → 돌베개 → 길목입니다. 이 순서로 표식을 읽으면 키박스 번호 2741이 나옵니다.",
    hostNote: "야외 표식 4개와 4자리 다이얼 키박스를 준비합니다. 우천 시 본관 로비 주변으로 옮길 수 있게 예비 위치를 정합니다.",
  },
  {
    id: "name",
    step: "02",
    place: "숙소",
    title: "잠긴 휴대폰",
    code: "PROMISE-02",
    minutes: 18,
    hint1: "잠금화면 알림 2개를 보게 합니다. 약속한 날은 문 앞 안내문에 있고, 비밀번호 형식은 MMDD입니다.",
    hint2: "휴대폰 잠금번호는 0316입니다.",
    hostNote: "실제 숙박객 동선과 분리하고 숙소 문 앞 안내문만 사용합니다. 웹에서는 가상 휴대폰을 열고 PROMISE-02 코드를 확인합니다.",
  },
  {
    id: "ledger",
    step: "03",
    place: "창고 및 물자 보관소(청지기실)",
    title: "맡겨진 것을 바꾼 사람",
    code: "STEWARD-03",
    minutes: 18,
    hint1: "현장 재고 카드 세트, 위치 변경 기록, 담당자 권한표를 대조하게 합니다. 수량을 계산하거나 세지 않습니다.",
    hint2: "위치와 권한 대조를 통해 조작자를 가려냅니다. 3자리 자물쇠 번호는 432입니다.",
    hostNote: "위생 구역에 들어가지 않도록 별도 테이블에 장부와 재고 카드를 둡니다.",
  },
  {
    id: "road",
    step: "04",
    place: "비아 돌로로사",
    title: "되돌아가는 길",
    code: "BETTER-04",
    minutes: 18,
    hint1: "편한 선택은 루프를 만들고, 불편한 선택이 다음 장면으로 보냅니다.",
    hint2: "문을 떠난다, 기억한다, 좁은 길, 더 나은 본향 순서입니다.",
    hostNote: "미끄럼 구간, 야간 조명, 발자국 카드 회수 위치를 확인합니다.",
  },
  {
    id: "home",
    step: "05",
    place: "예배당",
    title: "예비된 성",
    code: "HOMEWARD-05",
    minutes: 20,
    hint1: "앞에서 얻은 나그네, 장막, 약속, 청지기, 더 나은 본향을 다시 쓰게 합니다.",
    hint2: "순서는 스테이지 번호 순서입니다.",
    hostNote: "팀별 시간차로 입장시키고 마지막 10분은 해설과 나눔으로 연결합니다.",
  },
];

const storageKey = "homeward-host-dashboard";
const totalSeconds = 150 * 60;
const state = loadState();

const teamForm = document.querySelector("#teamForm");
const teamName = document.querySelector("#teamName");
const teamBoard = document.querySelector("#teamBoard");
const referenceGrid = document.querySelector("#referenceGrid");
const timerDisplay = document.querySelector("#timerDisplay");
const timerStatus = document.querySelector("#timerStatus");
const opsMessage = document.querySelector("#opsMessage");
const startTimer = document.querySelector("#startTimer");
const pauseTimer = document.querySelector("#pauseTimer");
const resetTimer = document.querySelector("#resetTimer");
const resetDashboard = document.querySelector("#resetDashboard");
const exportData = document.querySelector("#exportData");
const lockScreen = document.querySelector("#lockScreen");
const lockForm = document.querySelector("#lockForm");
const dashboardPassword = document.querySelector("#dashboardPassword");
const lockMessage = document.querySelector("#lockMessage");

let timer = null;
let polling = null;
render();
restoreRunningTimer();
restoreDashboardLock();

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expected = window.HomewardSync?.config?.dashboardPassword || "2010102017";
  if (dashboardPassword.value !== expected) {
    lockMessage.textContent = "비밀번호가 맞지 않습니다.";
    return;
  }
  sessionStorage.setItem("homeward-dashboard-unlocked", "true");
  lockScreen.hidden = true;
  startPolling();
});

teamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = teamName.value.trim();
  if (!name) return;
  state.teams.push({
    id: createId(),
    name,
    completed: {},
    hints: 0,
    current: "case",
    note: "",
    updatedAt: new Date().toISOString(),
  });
  teamName.value = "";
  saveState();
  render();
});

startTimer.addEventListener("click", () => {
  state.timer.running = true;
  state.timer.endsAt = Date.now() + state.timer.remaining * 1000;
  saveState();
  tickTimer();
  if (!timer) timer = setInterval(tickTimer, 1000);
});

pauseTimer.addEventListener("click", () => {
  tickTimer();
  state.timer.running = false;
  state.timer.endsAt = null;
  clearInterval(timer);
  timer = null;
  saveState();
  renderTimer();
});

resetTimer.addEventListener("click", () => {
  state.timer = { remaining: totalSeconds, running: false, endsAt: null };
  clearInterval(timer);
  timer = null;
  saveState();
  renderTimer();
});

resetDashboard.addEventListener("click", () => {
  if (!window.confirm("팀 진행 현황과 타이머를 모두 초기화할까요?")) return;
  localStorage.removeItem(storageKey);
  window.location.reload();
});

exportData.addEventListener("click", async () => {
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      teams: state.teams,
      timer: state.timer,
    },
    null,
    2,
  );
  try {
    await navigator.clipboard.writeText(payload);
    opsMessage.textContent = "진행 데이터가 클립보드에 복사되었습니다.";
  } catch {
    opsMessage.textContent = payload;
  }
});

function render() {
  renderTimer();
  renderTeams();
  renderReference();
  renderSummary();
}

function restoreDashboardLock() {
  if (sessionStorage.getItem("homeward-dashboard-unlocked") === "true") {
    lockScreen.hidden = true;
    startPolling();
  }
}

function renderTimer() {
  const remaining = Math.max(0, state.timer.remaining);
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  timerDisplay.textContent = [hours, minutes, seconds].map((item) => String(item).padStart(2, "0")).join(":");
  timerStatus.textContent = state.timer.running ? "진행 중" : remaining === totalSeconds ? "대기 중" : "일시정지";
}

const STUCK_WARNING_MINUTES = 15;
const STUCK_CRITICAL_MINUTES = 25;

function isTeamFinished(team) {
  return stages.every((stage) => team.completed[stage.id]);
}

function stagnantMinutes(team) {
  const ts = team.lastProgressAt || team.updatedAt;
  if (!ts) return 0;
  const elapsed = Date.now() - new Date(ts).getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) return 0;
  return Math.floor(elapsed / 60000);
}

function stuckLevel(team) {
  if (isTeamFinished(team)) return "none";
  const minutes = stagnantMinutes(team);
  if (minutes >= STUCK_CRITICAL_MINUTES) return "critical";
  if (minutes >= STUCK_WARNING_MINUTES) return "warning";
  return "none";
}

function renderTeams() {
  if (state.teams.length === 0) {
    teamBoard.innerHTML = `<article class="team-card"><p>아직 등록된 팀이 없습니다. 위에서 팀을 추가하십시오.</p></article>`;
    return;
  }

  // 순회하며 관리하는 진행자가 한눈에 우선순위를 파악할 수 있도록,
  // 가장 오래 정체된 팀이 맨 위로 오게 정렬한다(원본 state.teams 순서는 안 바꿈).
  const levelWeight = { critical: 2, warning: 1, none: 0 };
  const teamsForDisplay = [...state.teams].sort((a, b) => {
    const weightDiff = levelWeight[stuckLevel(b)] - levelWeight[stuckLevel(a)];
    if (weightDiff !== 0) return weightDiff;
    return stagnantMinutes(b) - stagnantMinutes(a);
  });

  teamBoard.innerHTML = teamsForDisplay
    .map((team) => {
      const completedCount = stages.filter((stage) => team.completed[stage.id]).length;
      const percent = Math.round((completedCount / stages.length) * 100);
      const level = stuckLevel(team);
      const minutes = stagnantMinutes(team);
      const stuckBadge =
        level === "critical"
          ? `<span class="stuck-badge critical">🚨 ${minutes}분째 정체</span>`
          : level === "warning"
          ? `<span class="stuck-badge warning">⚠ ${minutes}분째 정체</span>`
          : "";
      return `
        <article class="team-card" data-team="${team.id}" data-stuck="${level}">
          <div class="team-head">
            <div>
              <h3>${escapeHtml(team.name)} ${stuckBadge}</h3>
              <small>${completedCount} / ${stages.length} 완료 · 힌트 ${team.hints}회</small>
            </div>
            <button type="button" data-action="remove">삭제</button>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
          <div class="stage-checks">
            ${stages
              .map(
                (stage) => `
                  <label>
                    <input type="checkbox" data-stage="${stage.id}" ${team.completed[stage.id] ? "checked" : ""} />
                    <span>${stage.step}. ${stage.title}</span>
                    <small>${stage.code}</small>
                  </label>
                `,
              )
              .join("")}
          </div>
          <div class="team-tools">
            <select data-action="current">
              ${stages.map((stage) => `<option value="${stage.id}" ${team.current === stage.id ? "selected" : ""}>현재: ${stage.step} ${stage.title}</option>`).join("")}
            </select>
            <button class="hint-button" type="button" data-action="hint">힌트 +1</button>
            <button class="secondary" type="button" data-action="hintDown">힌트 -1</button>
          </div>
          <textarea class="team-note" data-action="note" rows="3" placeholder="운영 메모">${escapeHtml(team.note)}</textarea>
        </article>
      `;
    })
    .join("");

  teamBoard.querySelectorAll(".team-card").forEach((card) => {
    const team = state.teams.find((item) => item.id === card.dataset.team);
    card.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.addEventListener("change", () => {
        team.completed[input.dataset.stage] = input.checked;
        team.current = nextCurrentStage(team);
        if (input.checked) team.lastProgressAt = new Date().toISOString();
        touch(team);
      });
    });
    card.querySelector("[data-action='current']").addEventListener("change", (event) => {
      team.current = event.target.value;
      touch(team);
    });
    card.querySelector("[data-action='hint']").addEventListener("click", () => {
      team.hints += 1;
      touch(team);
    });
    card.querySelector("[data-action='hintDown']").addEventListener("click", () => {
      team.hints = Math.max(0, team.hints - 1);
      touch(team);
    });
    card.querySelector("[data-action='note']").addEventListener("input", (event) => {
      team.note = event.target.value;
      team.updatedAt = new Date().toISOString();
      saveState();
      renderSummary();
    });
    card.querySelector("[data-action='remove']").addEventListener("click", () => {
      state.teams = state.teams.filter((item) => item.id !== team.id);
      saveState();
      render();
    });
  });
}

async function startPolling() {
  await loadRemoteDashboard();
  if (!polling) polling = setInterval(loadRemoteDashboard, 5000);
}

async function loadRemoteDashboard() {
  if (!window.HomewardSync) return;
  try {
    const result = await window.HomewardSync.getDashboard();
    if (!result.ok || !Array.isArray(result.teams)) {
      if (result.offline) opsMessage.textContent = "로컬 대시보드 모드입니다. config.js에 Apps Script URL을 넣으면 실시간 동기화됩니다.";
      return;
    }
    state.teams = result.teams.map((team) => ({
      id: team.id || `${team.teamName}-${team.teamPassword}`,
      name: team.teamName,
      completed: Object.fromEntries((team.completedStages || []).map((stageId) => [stageId, true])),
      hints: Number(team.hints || 0),
      current: team.activeStageId || nextRemoteStage(team.completedStages || []),
      note: team.note || "",
      updatedAt: team.updatedAt || "",
      lastProgressAt: team.lastProgressAt || team.updatedAt || "",
      password: team.teamPassword || "",
    }));
    saveState();
    render();
    opsMessage.textContent = "Google Sheets 진행 데이터를 불러왔습니다.";
  } catch {
    opsMessage.textContent = "실시간 데이터를 불러오지 못해 로컬 대시보드를 유지합니다.";
  }
}

function renderReference() {
  referenceGrid.innerHTML = stages
    .map(
      (stage) => `
        <article class="reference-card">
          <p class="eyebrow">${stage.step} · ${stage.place} · ${stage.minutes}분</p>
          <h3>${stage.title}</h3>
          <dl>
            <div><dt>완료 코드</dt><dd class="code">${stage.code}</dd></div>
            <div><dt>1차 힌트</dt><dd>${stage.hint1}</dd></div>
            <div><dt>2차 힌트</dt><dd>${stage.hint2}</dd></div>
            <div><dt>운영 메모</dt><dd>${stage.hostNote}</dd></div>
          </dl>
        </article>
      `,
    )
    .join("");
}

function renderSummary() {
  const teams = state.teams;
  const completedTotals = teams.map((team) => stages.filter((stage) => team.completed[stage.id]).length);
  const avg = teams.length ? Math.round((completedTotals.reduce((sum, count) => sum + count, 0) / (teams.length * stages.length)) * 100) : 0;
  document.querySelector("#teamCount").textContent = teams.length;
  document.querySelector("#avgProgress").textContent = `${avg}%`;
  document.querySelector("#hintCount").textContent = teams.reduce((sum, team) => sum + team.hints, 0);
  document.querySelector("#finishedCount").textContent = teams.filter((team) => stages.every((stage) => team.completed[stage.id])).length;
  const stuckCount = teams.filter((team) => stuckLevel(team) !== "none").length;
  document.querySelector("#stuckCount").textContent = stuckCount;
  document.querySelector("#stuckStat")?.classList.toggle("has-stuck", stuckCount > 0);
}

function tickTimer() {
  if (!state.timer.running || !state.timer.endsAt) return;
  state.timer.remaining = Math.max(0, Math.round((state.timer.endsAt - Date.now()) / 1000));
  if (state.timer.remaining === 0) {
    state.timer.running = false;
    state.timer.endsAt = null;
    clearInterval(timer);
    timer = null;
  }
  saveState();
  renderTimer();
}

function restoreRunningTimer() {
  if (!state.timer.running || !state.timer.endsAt) return;
  tickTimer();
  if (!timer) timer = setInterval(tickTimer, 1000);
}

function nextCurrentStage(team) {
  const next = stages.find((stage) => !team.completed[stage.id]);
  return next ? next.id : "home";
}

function nextRemoteStage(completedStages) {
  const done = new Set(completedStages);
  const next = stages.find((stage) => !done.has(stage.id));
  return next ? next.id : "home";
}

function touch(team) {
  team.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function loadState() {
  const fallback = {
    teams: [],
    timer: { remaining: totalSeconds, running: false, endsAt: null },
  };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
