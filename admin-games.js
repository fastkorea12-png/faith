const adminStages = [
  { id: "case", step: "00", place: "본관", title: "조작된 사건파일", code: "PILGRIM-00" },
  { id: "bag", step: "01", place: "야외 시설", title: "가짜 안식처", code: "TENT-01" },
  { id: "name", step: "02", place: "숙소", title: "잠긴 휴대폰", code: "PROMISE-02" },
  { id: "ledger", step: "03", place: "주방 및 기타 시설", title: "사라진 식량 장부", code: "STEWARD-03" },
  { id: "road", step: "04", place: "비아 돌로로사", title: "되돌아가는 길", code: "BETTER-04" },
  { id: "home", step: "05", place: "예배당", title: "예비된 성", code: "HOMEWARD-05" },
];

const lockScreen = document.querySelector("#lockScreen");
const lockForm = document.querySelector("#lockForm");
const adminPassword = document.querySelector("#adminPassword");
const lockMessage = document.querySelector("#lockMessage");
const adminGameGrid = document.querySelector("#adminGameGrid");
const expectedPassword = window.HOMEWARD_CONFIG?.dashboardPassword || "2010102017";

restoreLock();
renderAdminGames();

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
            <a href="game.html?stage=${stage.id}&admin=1">게임 열기</a>
            <a class="secondary" href="activity.html?stage=${stage.id}">활동 페이지</a>
          </div>
        </article>
      `,
    )
    .join("");
}
