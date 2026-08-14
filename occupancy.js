const occupancyStages = [
  { id: "case", step: "00", place: "본관 / 접수" },
  { id: "bag", step: "01", place: "야외 시설" },
  { id: "name", step: "02", place: "숙소" },
  { id: "ledger", step: "03", place: "창고 및 물자 보관소" },
  { id: "road", step: "04", place: "비아 돌로로사" },
  { id: "home", step: "05", place: "예배당" },
];

const grid = document.querySelector("#occupancyGrid");
const connectionStatus = document.querySelector("#connectionStatus");
const updatedAt = document.querySelector("#updatedAt");
const refreshButton = document.querySelector("#refreshButton");
let refreshTimer = null;

render(occupancyStages.map((stage) => ({ ...stage, count: null, occupied: false })));
loadOccupancy();
refreshTimer = window.setInterval(loadOccupancy, 15000);

refreshButton.addEventListener("click", loadOccupancy);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") loadOccupancy();
});

async function loadOccupancy() {
  refreshButton.disabled = true;
  connectionStatus.textContent = "현장 정보를 갱신하는 중입니다.";
  try {
    let result = await window.HomewardSync?.getOccupancy?.();
    if (!result?.ok || !Array.isArray(result.occupancy)) {
      result = await loadFromDashboardFallback();
    }
    if (!result?.ok || !Array.isArray(result.occupancy)) throw new Error("Occupancy unavailable");

    render(result.occupancy);
    connectionStatus.textContent = "15초마다 자동으로 갱신됩니다.";
    updatedAt.textContent = `마지막 갱신: ${formatTime(result.updatedAt || new Date())}`;
  } catch {
    connectionStatus.textContent = "실시간 연결을 확인할 수 없습니다. 잠시 후 다시 시도하십시오.";
    updatedAt.textContent = "연결이 복구될 때까지 현장 진행자에게 사용 여부를 확인하십시오.";
  } finally {
    refreshButton.disabled = false;
  }
}

async function loadFromDashboardFallback() {
  const dashboard = await window.HomewardSync?.getDashboard?.();
  if (!dashboard?.ok || !Array.isArray(dashboard.teams)) return dashboard;
  const now = Date.now();
  const freshnessMs = 30 * 60 * 1000;
  return {
    ok: true,
    updatedAt: new Date(),
    occupancy: occupancyStages.map((stage) => {
      const count = dashboard.teams.filter((team) => {
        const updated = new Date(team.updatedAt).getTime();
        const completed = new Set(team.completedStages || []);
        return Number.isFinite(updated) && now - updated <= freshnessMs && team.activeStageId === stage.id && !completed.has(stage.id);
      }).length;
      return { ...stage, count, occupied: count > 0 };
    }),
  };
}

function render(items) {
  grid.innerHTML = items
    .map((item) => {
      const count = item.count;
      const level = count === null ? "unknown" : count >= 2 ? "busy" : count === 1 ? "occupied" : "free";
      const label = level === "unknown" ? "확인 중" : level === "busy" ? "혼잡" : level === "occupied" ? "사용 중" : "비어 있음";
      const detail = count === null ? "연결 대기" : count > 0 ? `${count}개 팀 이용 중` : "이동 가능";
      return `
        <article class="occupancy-card" data-level="${level}">
          <div class="stage-number">${item.step}</div>
          <div class="stage-copy">
            <h2>${escapeHtml(item.place)}</h2>
            <p>${detail}</p>
          </div>
          <strong class="status-badge">${label}</strong>
        </article>
      `;
    })
    .join("");
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "방금 전";
  return new Intl.DateTimeFormat("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
