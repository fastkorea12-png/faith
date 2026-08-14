const adminStages = [
  { id: "case", step: "00", place: "본관", title: "조작된 사건파일", code: "PILGRIM-00" },
  { id: "bag", step: "01", place: "야외 시설", title: "너무 오래 머문 자리", code: "TENT-01" },
  { id: "name", step: "02", place: "숙소", title: "잠긴 휴대폰", code: "PROMISE-02" },
  { id: "ledger", step: "03", place: "창고 및 물자 보관소(청지기실)", title: "맡겨진 것을 바꾼 사람", code: "STEWARD-03" },
  { id: "road", step: "04", place: "비아 돌로로사", title: "되돌아가는 길", code: "BETTER-04" },
  { id: "home", step: "05", place: "예배당", title: "예비된 성", code: "HOMEWARD-05" },
];

const lockScreen = document.querySelector("#lockScreen");
const lockForm = document.querySelector("#lockForm");
const adminPassword = document.querySelector("#adminPassword");
const lockMessage = document.querySelector("#lockMessage");
const adminGameGrid = document.querySelector("#adminGameGrid");
const resetAllButton = document.querySelector("#resetAllAdmin");
const resetAllMessage = document.querySelector("#resetAllMessage");
const expectedPassword = window.HOMEWARD_CONFIG?.dashboardPassword || "2010102017";

// 관리자가 리허설/점검용으로 게임을 열 때는 항상 이 고정된 팀 이름으로
// 사건 수첩에 진입한다. 실제 참가자 팀과 이름이 섞이지 않아 대시보드에서
// 바로 구분되고, 아래 "전체 초기화" 버튼으로 한 번에 지울 수 있다.
const ADMIN_TEAM_NAME = "관리자 테스트팀";
const ADMIN_TEAM_PASSWORD = "admin0000";

restoreLock();
renderAdminGames();
primeAdminTeam();

adminGameGrid.addEventListener("click", (event) => {
  if (event.target.closest("a")) primeAdminTeam();
});

function primeAdminTeam() {
  try {
    const progress = JSON.parse(localStorage.getItem("homeward-case-progress") || "{}");
    progress.teamName = ADMIN_TEAM_NAME;
    progress.teamPassword = ADMIN_TEAM_PASSWORD;
    localStorage.setItem("homeward-case-progress", JSON.stringify(progress));
  } catch (e) {
    console.error("Admin team priming error:", e);
  }
}

resetAllButton?.addEventListener("click", () => {
  if (!window.confirm(`"${ADMIN_TEAM_NAME}"의 00~05 전체 진행 상태를 초기화할까요?`)) return;
  adminStages.forEach((stage) => {
    localStorage.removeItem(`homeward-game-${stage.id}`);
    localStorage.removeItem(`homeward-solved-${stage.id}`);
    localStorage.removeItem(`homeward-keyword-${stage.id}`);
  });
  localStorage.setItem(
    "homeward-case-progress",
    JSON.stringify({ teamName: ADMIN_TEAM_NAME, teamPassword: ADMIN_TEAM_PASSWORD, activeStageId: "case", completed: {}, codes: {}, notes: {} }),
  );
  if (resetAllMessage) resetAllMessage.textContent = `"${ADMIN_TEAM_NAME}" 전체 초기화 완료.`;
});

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (adminPassword.value !== expectedPassword) {
    lockMessage.textContent = "비밀번호가 맞지 않습니다.";
    return;
  }
  localStorage.setItem("homeward-admin-preview", "true");
  lockScreen.hidden = true;
});

function restoreLock() {
  if (localStorage.getItem("homeward-admin-preview") === "true") {
    lockScreen.hidden = true;
  }
}

function renderAdminGames() {
  adminGameGrid.innerHTML = adminStages
    .map(
      (stage) => `
        <article class="admin-game-card">
          <p class="eyebrow">${stage.step} · ${stage.place}</p>
          <h2>${stage.title}</h2>
          <dl>
            <div><dt>완료 코드</dt><dd>${stage.code}</dd></div>
            <div><dt>관리자 실행</dt><dd>QR 없이 바로 열기</dd></div>
          </dl>
          <div class="admin-game-actions">
            <a href="game.html?stage=${stage.id}&qr=rodem-2026&admin=1" target="_blank">게임 열기</a>
            <a class="secondary" href="activity.html?stage=${stage.id}" target="_blank">활동 페이지</a>
          </div>
        </article>
      `,
    )
    .join("");
}
