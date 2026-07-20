const stages = [
  {
    id: "case",
    step: "00",
    place: "본관 / 접수",
    title: "찢어진 본향 지도",
    code: "MAP-1113",
    minutes: 18,
    hint1: "지도 조각의 문장은 방향을 말합니다.",
    hint2: "완성 문장은 “본향을 향한 순례의 길”입니다.",
    hostNote: "배낭, 사건파일, 첫 지도 조각 지급. 팀별 출발 간격을 2-3분 둡니다.",
  },
  {
    id: "bag",
    step: "01",
    place: "야외 시설",
    title: "남겨진 배낭",
    code: "EMPTY-240",
    minutes: 18,
    hint1: "물건 자체보다 물건이 붙잡게 하는 마음을 보게 합니다.",
    hint2: "돌=두려움, 돈 봉투=소유, 트로피=인정, 거울=자기중심, 시계=조급함.",
    hostNote: "소품 회수 담당을 세우고 우천 시 본관 로비로 옮깁니다.",
  },
  {
    id: "name",
    step: "02",
    place: "숙소",
    title: "찢어진 이름표",
    code: "PILGRIM-313",
    minutes: 18,
    hint1: "히브리서 11:13에서 믿음의 사람들이 자신을 부른 이름을 찾게 합니다.",
    hint2: "정답 흐름은 나-그-네입니다.",
    hostNote: "실제 숙박객 동선과 분리하고 탈부착 이름표만 사용합니다.",
  },
  {
    id: "ledger",
    step: "03",
    place: "주방/기타",
    title: "비어 있는 장부",
    code: "STEWARD-503",
    minutes: 18,
    hint1: "내 것이라고 적힌 것을 맡겨진 것으로 옮기게 합니다.",
    hint2: "핵심 단어는 청지기입니다.",
    hostNote: "위생 구역 안으로 들어가지 않게 별도 테이블을 둡니다.",
  },
  {
    id: "road",
    step: "04",
    place: "비아 돌로로사",
    title: "돌아갈 수 있었던 길",
    code: "BETTER-1116",
    minutes: 18,
    hint1: "길은 믿음, 떠남, 사모함, 더 나은 본향 순서입니다.",
    hint2: "히브리서 11:16의 비교급 표현을 확인합니다.",
    hostNote: "미끄럼 구간, 야간 조명, 발자국 카드 회수 위치를 확인합니다.",
  },
  {
    id: "home",
    step: "05",
    place: "예배당",
    title: "예비된 성",
    code: "CITY-516",
    minutes: 20,
    hint1: "앞에서 얻은 나그네, 청지기, 더 나은 본향을 다시 쓰게 합니다.",
    hint2: "최종 고백은 우리가 본향을 향해 걷는 순례자라는 말로 모입니다.",
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

function renderTeams() {
  if (state.teams.length === 0) {
    teamBoard.innerHTML = `<article class="team-card"><p>아직 등록된 팀이 없습니다. 위에서 팀을 추가하십시오.</p></article>`;
    return;
  }

  teamBoard.innerHTML = state.teams
    .map((team) => {
      const completedCount = stages.filter((stage) => team.completed[stage.id]).length;
      const percent = Math.round((completedCount / stages.length) * 100);
      return `
        <article class="team-card" data-team="${team.id}">
          <div class="team-head">
            <div>
              <h3>${escapeHtml(team.name)}</h3>
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
