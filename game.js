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
    evidence: ["잠금화면 알림", "문 앞 안내문", "MMDD", "메모 앱"],
    objective: "잠금화면 알림이 가리키는 약속한 날짜를 문 앞 안내문에서 찾아 휴대폰 암호를 해제합니다.",
    render: renderPhonePuzzle,
  },
  ledger: {
    step: "03 / 주방 및 기타 시설",
    title: "사라진 식량 장부",
    intro: "장부의 기록과 실제 재고를 대조해 맡겨진 양식의 누락을 복원하십시오.",
    code: "STEWARD-03",
    keyword: "청지기",
    message: "네 번째 키워드 '청지기'를 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["식량 장부", "현장 재고 카드", "누락 기록", "3자리 자물쇠"],
    objective: "주방 곳곳의 재고 카드를 확인하고, 기록과 실제가 어긋난 품목을 찾아 장부를 복원합니다.",
    render: renderInventoryPuzzle,
  },
  road: {
    step: "04 / 비아 돌로로사",
    title: "되돌아가는 길",
    intro: "편한 선택은 계속 같은 곳으로 돌아옵니다. 반복 속에서 다른 길의 단서를 찾으십시오.",
    code: "BETTER-04",
    keyword: "더 나은 본향",
    message: "다섯 번째 키워드 '더 나은 본향'을 확보했습니다. 활동 페이지에 완료 코드를 입력하십시오.",
    evidence: ["갈림길", "반복 기록", "길목 문구", "히브리서 11:16"],
    objective: "루프의 기록을 기억하며 네 번의 선택을 올바른 순서로 통과합니다.",
    render: renderLoopPuzzle,
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

function renderPhonePuzzle() {
  const surface = getSurface();
  const apps = {
    notice: {
      label: "알림",
      icon: "!",
      html: `
        <div class="phone-app-title"><span>알림 센터</span><strong>오늘</strong></div>
        <article class="notification-card"><b>엄마</b><p>네 이름이 뭐가 되든, 약속한 날은 잊지 마. 숙소 문 앞 안내문에 남겨뒀어.</p></article>
        <article class="notification-card"><b>룸메이트</b><p>비밀번호 형식은 MMDD래. 이름 말고 날짜를 보래.</p></article>
        <article class="notification-card muted"><b>홍보팀</b><p>새 별명 추천: 성공한 사람, 인정받는 사람, 비교에서 이긴 사람</p></article>
      `,
    },
    photo: {
      label: "사진",
      icon: "□",
      html: `
        <div class="phone-app-title"><span>사진</span><strong>문 앞 안내문 백업</strong></div>
        <div class="photo-grid name-fragment-preview">
          <span data-color="blue">03/16</span><span data-color="green">약속</span><span data-color="red">성공</span><span data-color="gray">인정</span>
        </div>
        <p class="phone-caption">백업 사진: 문 앞 안내문에는 여러 이름이 있었지만, 약속 카드 수령일만 날짜로 남아 있었다.</p>
      `,
    },
    memo: {
      label: "메모",
      icon: "M",
      html: `
        <div class="phone-app-title"><span>메모</span><strong>잠긴 메모 일부</strong></div>
        <div class="memo-note">
          <p>빌린 이름은 자주 바뀐다.</p>
          <p>성공, 인정, 비교는 문 앞에 오래 붙어 있지 못했다.</p>
          <p>하지만 약속한 날은 바뀌지 않는다.</p>
          <p class="scribble">남겨야 할 이름은 약속 안에서 발견된다.</p>
        </div>
      `,
    },
    search: {
      label: "검색",
      icon: "?",
      html: `
        <div class="phone-app-title"><span>검색 기록</span><strong>삭제되지 않음</strong></div>
        <ul class="search-list">
          <li>좋아 보이는 이름</li>
          <li>인정받는 법</li>
          <li>약속을 잊지 않는 법</li>
          <li>비밀번호 MMDD 뜻</li>
        </ul>
      `,
    },
  };
  const doorNotices = [
    { id: "promise", label: "약속 카드 수령일", value: "03/16", code: "0316", type: "real" },
    { id: "success", label: "임시 이름표", value: "성공한 사람", code: "", type: "decoy" },
    { id: "approval", label: "임시 이름표", value: "인정받는 사람", code: "", type: "decoy" },
    { id: "checkout", label: "퇴실 안내", value: "11:13", code: "", type: "decoy" },
  ];
  let phoneUnlocked = false;
  let foundPromiseDate = "";

  surface.innerHTML = `
    <p class="instruction">목표: 잠긴 휴대폰을 열고 메모 앱에서 방 주인이 끝까지 붙든 단어를 확인하십시오.</p>
    <div class="phone-board">
      <section class="phone-device">
        <div class="phone-island"></div>
        <div class="phone-topbar"><span>11:13</span><span>숙소 Wi-Fi</span></div>
        <div class="phone-lockscreen">
          <p>잠긴 휴대폰</p>
          <strong>11:13</strong>
          <span>이름은 바뀌어도 약속은 남는다</span>
        </div>
        <div class="lock-notifications" id="lockNotifications">
          <article><b>엄마</b><p>약속한 날은 숙소 문 앞 안내문에 있어.</p></article>
          <article><b>룸메이트</b><p>비밀번호 형식은 MMDD. 이름 말고 날짜.</p></article>
        </div>
        <button class="phone-unlock-button" type="button" id="showPasscode">잠금 해제</button>
        <div class="phone-home-screen" id="phoneHomeScreen" hidden>
          <div class="phone-apps">
            ${Object.entries(apps).map(([id, app]) => `<button type="button" data-tab="${id}"><span>${app.icon}</span>${app.label}</button>`).join("")}
          </div>
          <div class="phone-screen" id="phoneScreen">
            <div class="empty-phone-app">
              <strong>앱을 선택하세요</strong>
              <p>사진, 메모, 검색 기록을 열어 문 앞 안내문을 확인하십시오.</p>
            </div>
          </div>
        </div>
        <form class="phone-passcode" id="phoneForm" hidden>
          <label for="phoneCode">암호</label>
          <input id="phoneCode" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="----" />
          <div class="passcode-dots" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
          <div class="phone-keypad" aria-label="숫자 키패드">
            ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "지움", "0", "확인"]
              .map((key) => `<button type="${key === "확인" ? "submit" : "button"}" data-key="${key}">${key}</button>`)
              .join("")}
          </div>
        </form>
        <div class="phone-homebar"></div>
      </section>
      <section class="phone-investigation">
        <div class="deduction-steps">
          <strong>풀어야 할 문제</strong>
          <ol>
            <li>잠금화면 알림 2개를 읽는다.</li>
            <li>숙소 문 앞 안내문에서 약속한 날짜를 찾는다.</li>
            <li>잠금 해제를 눌러 암호를 입력한다.</li>
            <li>휴대폰이 열리면 메모 앱을 열어 완료 단어를 확인한다.</li>
          </ol>
        </div>
        <div class="fragment-board">
          <p class="eyebrow">현장 안내문</p>
          <h3>숙소 문 앞 기록</h3>
          <p class="fragment-copy">알림은 “약속한 날”과 “MMDD”를 말합니다. 이름처럼 보이는 기록을 버리고 날짜 기록을 고르십시오.</p>
          <div class="fragment-grid">
            ${doorNotices.map((notice) => `<button type="button" data-notice="${notice.id}" data-code="${notice.code}" data-type="${notice.type}"><span>${notice.label}</span><strong>${notice.value}</strong></button>`).join("")}
          </div>
          <div class="fragment-result" id="fragmentResult">찾은 날짜: ----</div>
        </div>
        <div class="field-note">
          <strong>현장 행동</strong>
          <p>실제 운영에서는 이 안내문을 숙소 문 앞에 붙입니다. 화면의 기록 후보는 진행자 리허설용이며, 참가자는 현장 안내문을 보고 암호를 직접 눌러야 합니다.</p>
        </div>
      </section>
    </div>
    <p class="feedback" id="feedback">먼저 숙소 문 앞 안내문에서 약속한 날짜를 찾으십시오.</p>
  `;

  document.querySelector("#showPasscode").addEventListener("click", () => {
    document.querySelector("#phoneForm").hidden = false;
    document.querySelector("#showPasscode").hidden = true;
    document.querySelector("#feedback").textContent = foundPromiseDate
      ? `${foundPromiseDate}를 MMDD 형식으로 바꾸어 휴대폰 키패드에 직접 입력하십시오.`
      : "먼저 숙소 문 앞 안내문에서 약속한 날짜를 찾은 뒤 MMDD 형식으로 입력하십시오.";
  });

  surface.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      surface.querySelectorAll("[data-tab]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      document.querySelector("#phoneScreen").innerHTML = apps[button.dataset.tab].html;
      if (phoneUnlocked && button.dataset.tab === "memo") {
        document.querySelector("#feedback").textContent = "잠긴 메모가 열렸습니다. 방 주인이 붙든 단어는 약속이었습니다.";
        unlock();
      }
    });
  });

  function updateDoorNoticeResult(value) {
    foundPromiseDate = value;
    document.querySelector("#fragmentResult").textContent = `찾은 날짜: ${value} → MMDD`;
  }

  function updatePasscodeDots() {
    const length = document.querySelector("#phoneCode").value.length;
    surface.querySelectorAll(".passcode-dots span").forEach((dot, index) => {
      dot.classList.toggle("filled", index < length);
    });
  }

  surface.querySelectorAll("[data-notice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.type !== "real") {
        button.dataset.status = "miss";
        document.querySelector("#feedback").textContent = "그 기록은 빌린 이름이거나 시간 표시입니다. 알림이 말한 '약속한 날'을 찾으십시오.";
        return;
      }
      surface.querySelectorAll("[data-notice]").forEach((item) => item.removeAttribute("data-status"));
      button.dataset.status = "correct";
      updateDoorNoticeResult(button.querySelector("strong").textContent);
      document.querySelector("#feedback").textContent = "약속한 날을 찾았습니다. 날짜를 MMDD 형식으로 바꾸어 휴대폰 키패드에 직접 입력하십시오.";
    });
  });

  surface.querySelectorAll("[data-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector("#phoneCode");
      const key = button.dataset.key;
      if (key === "확인") return;
      if (key === "지움") {
        input.value = input.value.slice(0, -1);
        updatePasscodeDots();
        return;
      }
      if (input.value.length < 4) input.value += key;
      updatePasscodeDots();
    });
  });

  document.querySelector("#phoneForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (document.querySelector("#phoneCode").value.trim() === "0316") {
      phoneUnlocked = true;
      document.querySelector("#phoneForm").hidden = true;
      document.querySelector("#lockNotifications").hidden = true;
      document.querySelector(".phone-lockscreen").hidden = true;
      document.querySelector("#phoneHomeScreen").hidden = false;
      document.querySelector("#feedback").textContent = "휴대폰이 열렸습니다. 메모 앱을 열어 마지막 기록을 확인하십시오.";
      return;
    }
    document.querySelector("#feedback").textContent = "잠금이 풀리지 않습니다. 이름보다 날짜, 날짜보다 약속을 다시 보십시오.";
  });
}

function renderInventoryPuzzle() {
  const records = [
    { id: "rice", item: "쌀", ledger: 14, actual: 10, clue: "가장 먼저 기록된 주식" },
    { id: "water", item: "물", ledger: 8, actual: 8, clue: "공동 사용 기록과 일치" },
    { id: "bread", item: "빵", ledger: 10, actual: 7, clue: "나눔표에 표시된 양식" },
    { id: "oil", item: "기름", ledger: 5, actual: 5, clue: "봉인된 채 남아 있음" },
    { id: "salt", item: "소금", ledger: 6, actual: 4, clue: "마지막으로 기록된 양념" },
  ];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">주방의 장부와 현장 재고 카드를 대조하십시오. 기록보다 실제가 부족한 품목만 찾아, 부족한 수량을 장부 순서대로 읽으십시오.</p>
    <section class="inventory-ledger" aria-label="식량 장부 복원">
      <div class="inventory-intro">
        <p class="eyebrow">맡겨진 양식 / 복원 중</p>
        <h3>사라진 식량 장부</h3>
        <p>장부는 누군가의 소유 목록이 아니라, 함께 맡겨진 것을 돌보는 기록입니다. 실제 재고 카드는 주방 곳곳에 놓여 있습니다.</p>
      </div>
      <div class="ledger-table" role="table" aria-label="장부 기록과 현장 재고">
        <div class="ledger-row ledger-head" role="row"><span>품목</span><span>장부 기록</span><span>현장 재고</span><span>부족분</span></div>
        ${records.map((record) => `
          <label class="ledger-row" data-record="${record.id}" role="row">
            <span><strong>${record.item}</strong><small>${record.clue}</small></span>
            <span>${record.ledger}</span>
            <span><input type="number" min="0" max="20" inputmode="numeric" data-stock="${record.id}" placeholder="?" aria-label="${record.item} 현장 재고" /></span>
            <span class="shortage" data-shortage="${record.id}">-</span>
          </label>
        `).join("")}
      </div>
      <div class="inventory-rule"><strong>복원 규칙</strong><span>장부보다 실제가 적은 품목만 숫자로 남긴다.</span></div>
    </section>
    <div class="check-line"><button class="primary-button" type="button" id="restoreLedger">장부 복원</button></div>
    <form class="code-entry pantry-lock" id="pantryLock" hidden>
      <label for="pantryCode">주방 보관함 자물쇠</label>
      <p id="sealResult">부족분을 장부 순서대로 읽으십시오.</p>
      <input id="pantryCode" inputmode="numeric" maxlength="3" autocomplete="off" placeholder="3자리 번호" />
      <button class="primary-button" type="submit">보관함 열기</button>
    </form>
    <p class="feedback" id="feedback">현장 재고 카드의 숫자를 먼저 기록하십시오. 장부에 없는 숫자를 추측하지 마십시오.</p>
  `;

  document.querySelector("#restoreLedger").addEventListener("click", () => {
    const values = Object.fromEntries(
      records.map((record) => [record.id, document.querySelector(`[data-stock="${record.id}"]`).value.trim()]),
    );
    const complete = records.every((record) => values[record.id] !== "");
    if (!complete) {
      document.querySelector("#feedback").textContent = "아직 확인하지 않은 현장 재고가 있습니다. 다섯 장의 재고 카드를 모두 찾아 입력하십시오.";
      return;
    }

    const shortages = records.map((record) => Math.max(0, record.ledger - Number(values[record.id])));
    records.forEach((record, index) => {
      const row = document.querySelector(`[data-record="${record.id}"]`);
      const shortage = document.querySelector(`[data-shortage="${record.id}"]`);
      const correct = Number(values[record.id]) === record.actual;
      row.dataset.status = correct ? "correct" : "miss";
      shortage.textContent = shortages[index] || "-";
    });

    const actualsCorrect = records.every((record) => Number(values[record.id]) === record.actual);
    if (!actualsCorrect) {
      document.querySelector("#feedback").textContent = "기록과 실제가 아직 맞지 않습니다. 카드의 품목과 수량을 다시 대조하십시오.";
      return;
    }

    const lockCode = shortages.filter((value) => value > 0).join("");
    document.querySelector("#pantryLock").hidden = false;
    document.querySelector("#sealResult").textContent = `부족분 확인: ${shortages.filter((value) => value > 0).join(" · ")} → 장부 순서대로 읽기`;
    document.querySelector("#feedback").textContent = "누락된 기록이 복원되었습니다. 부족분을 장부 순서대로 자물쇠에 입력하십시오.";
    document.querySelector("#pantryLock").dataset.code = lockCode;
  });

  document.querySelector("#pantryLock").addEventListener("submit", (event) => {
    event.preventDefault();
    if (document.querySelector("#pantryCode").value.trim() === document.querySelector("#pantryLock").dataset.code) {
      document.querySelector("#feedback").textContent = "보관함이 열렸습니다. 맡겨진 것을 돌보는 사람의 이름이 드러납니다.";
      unlock();
      return;
    }
    document.querySelector("#feedback").textContent = "자물쇠가 열리지 않습니다. 부족분만, 장부에 적힌 순서대로 읽으십시오.";
  });
}

function renderLoopPuzzle() {
  const sequence = ["문을떠난다", "기억한다", "좁은길", "더나은본향"];
  const directionSequence = ["right", "up", "left", "up"];
  const directionLabels = { up: "위", right: "오른쪽", down: "아래", left: "왼쪽" };
  const fragments = [
    { id: "return", text: "돌아갈 수 있었지만", dir: "right" },
    { id: "leave", text: "그 길을 떠나", dir: "up" },
    { id: "seek", text: "더 나은 본향을", dir: "left" },
    { id: "long", text: "사모하였다", dir: "up" },
  ];
  const scenes = [
    {
      title: "첫 번째 갈림길",
      text: "익숙한 문은 밝고 넓습니다. 이름을 불러 주는 길처럼 보입니다.",
      fragmentId: "return",
      choices: [
        { label: "익숙한 문으로 돌아간다", value: "return" },
        { label: "문을 떠난다", value: "문을떠난다" },
      ],
    },
    {
      title: "두 번째 갈림길",
      text: "길목 표지판에는 '본 것은 아직 답이 아니다. 기억한 것이 길이 된다'고 적혀 있습니다.",
      fragmentId: "leave",
      choices: [
        { label: "방금 본 문장을 기억한다", value: "기억한다" },
        { label: "가장 빠른 길을 고른다", value: "fast" },
      ],
    },
    {
      title: "세 번째 갈림길",
      text: "사람들이 많은 길에는 설명이 많고, 좁은 길에는 표식 하나만 남아 있습니다.",
      fragmentId: "seek",
      choices: [
        { label: "사람들이 많은 길", value: "crowd" },
        { label: "좁은 길", value: "좁은길" },
      ],
    },
    {
      title: "마지막 갈림길",
      text: "돌아갈 기회는 아직 있습니다. 하지만 표식은 보이지 않는 곳을 향합니다.",
      fragmentId: "long",
      choices: [
        { label: "돌아갈 수 있었던 고향", value: "old" },
        { label: "더 나은 본향", value: "더나은본향" },
      ],
    },
  ];
  let index = 0;
  let loopCount = 0;
  const history = [];
  const foundFragments = [];
  const sentenceSlots = [];
  const lockInput = [];
  const surface = getSurface();

  surface.innerHTML = `
    <p class="instruction">잘못된 선택은 처음 길로 돌아가게 합니다. 루프를 끊으며 문장 조각을 모으고, 완성한 문장의 방향 표식으로 자물쇠를 여십시오.</p>
    <div class="loop-board">
      <section class="loop-scene" id="loopScene"></section>
      <aside class="loop-log">
        <strong>반복 기록</strong>
        <div id="loopLog">아직 반복 기록이 없습니다.</div>
        <div class="direction-strip" id="fragmentStrip">문장 조각: ----</div>
      </aside>
    </div>
    <section class="sentence-lock" id="sentenceLock" hidden>
      <p class="eyebrow">Sentence Lock</p>
      <h3>흩어진 문장</h3>
      <p>조각을 눌러 고백문을 완성하십시오. 조각 위의 작은 표식이 방향 자물쇠의 순서가 됩니다.</p>
      <div class="sentence-slots" id="sentenceSlots"></div>
      <div class="sentence-pool" id="sentencePool"></div>
      <div class="check-line">
        <button class="primary-button" type="button" id="checkSentence">문장 확인</button>
        <button class="secondary-button" type="button" id="resetSentence">다시 배열</button>
      </div>
      <div class="direction-strip" id="sentenceDirection">문장 방향: ----</div>
    </section>
    <section class="direction-lock" id="directionLock" hidden>
      <p class="eyebrow">Direction Lock</p>
      <h3>방향 자물쇠</h3>
      <p>완성한 문장의 작은 표식을 순서대로 누르십시오.</p>
      <div class="direction-display" id="directionDisplay">입력: ----</div>
      <div class="direction-pad">
        <button type="button" data-dir="up">↑</button>
        <button type="button" data-dir="left">←</button>
        <button type="button" data-dir="right">→</button>
        <button type="button" data-dir="down">↓</button>
      </div>
      <button class="secondary-button" type="button" id="resetDirection">방향 다시 입력</button>
    </section>
    <p class="feedback" id="feedback">편한 길은 빠르지만, 같은 자리로 돌아오게 할 수 있습니다.</p>
  `;

  drawScene();

  function drawScene() {
    const scene = scenes[index];
    document.querySelector("#loopScene").innerHTML = `
      <span class="loop-count">Loop ${loopCount}</span>
      <h3>${scene.title}</h3>
      <p>${scene.text}</p>
      <div class="choice-grid">
        ${scene.choices.map((choice) => `<button type="button" data-choice="${choice.value}">${choice.label}</button>`).join("")}
      </div>
    `;
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.choice !== sequence[index]) {
          loopCount += 1;
          history.push(`${scene.title}: ${button.textContent.trim()} 때문에 처음으로 돌아옴`);
          index = 0;
          updateLoopLog();
          document.querySelector("#feedback").textContent = "같은 자리로 돌아왔습니다. 이전 루프의 문장을 기억하십시오.";
          drawScene();
          return;
        }
        history.push(`${scene.title}: ${button.textContent.trim()}`);
        const fragment = fragments.find((item) => item.id === scene.fragmentId);
        if (!foundFragments.some((item) => item.id === fragment.id)) foundFragments.push(fragment);
        index += 1;
        updateLoopLog();
        if (index === sequence.length) {
          document.querySelector("#sentenceLock").hidden = false;
          drawSentencePuzzle();
          document.querySelector("#feedback").textContent = "루프가 끊어졌습니다. 모은 문장 조각을 올바른 순서로 배열하십시오.";
          return;
        }
        document.querySelector("#feedback").textContent = "길이 이어졌습니다. 다음 표식을 확인하십시오.";
        drawScene();
      });
    });
  }

  function updateLoopLog() {
    document.querySelector("#loopLog").innerHTML = history.map((item) => `<p>${item}</p>`).join("");
    document.querySelector("#fragmentStrip").textContent = `문장 조각: ${
      foundFragments.length ? foundFragments.map((fragment) => fragment.text).join(" / ") : "----"
    }`;
  }

  function drawSentencePuzzle() {
    const poolOrder = ["seek", "return", "long", "leave"];
    const pool = foundFragments
      .filter((fragment) => !sentenceSlots.includes(fragment.id))
      .sort((a, b) => poolOrder.indexOf(a.id) - poolOrder.indexOf(b.id));
    document.querySelector("#sentenceSlots").innerHTML = fragments
      .map((_, order) => {
        const fragment = fragments.find((item) => item.id === sentenceSlots[order]);
        return `<button type="button" data-slot="${order}" class="${fragment ? "filled" : ""}">${fragment ? `<span>${directionLabels[fragment.dir]}</span>${fragment.text}` : order + 1}</button>`;
      })
      .join("");
    document.querySelector("#sentencePool").innerHTML = pool
      .map((fragment) => `<button type="button" data-fragment-id="${fragment.id}"><span>${directionLabels[fragment.dir]}</span>${fragment.text}</button>`)
      .join("");

    document.querySelectorAll("[data-fragment-id]").forEach((button) => {
      button.addEventListener("click", () => {
        if (sentenceSlots.length >= fragments.length) return;
        sentenceSlots.push(button.dataset.fragmentId);
        drawSentencePuzzle();
      });
    });

    document.querySelectorAll("[data-slot]").forEach((button) => {
      button.addEventListener("click", () => {
        const slot = Number(button.dataset.slot);
        if (!sentenceSlots[slot]) return;
        sentenceSlots.splice(slot, 1);
        drawSentencePuzzle();
      });
    });
  }

  document.querySelector("#checkSentence").addEventListener("click", () => {
    const sentenceCorrect = fragments.every((fragment, order) => sentenceSlots[order] === fragment.id);
    if (!sentenceCorrect) {
      document.querySelector("#feedback").textContent = "문장이 아직 어색합니다. 돌아갈 수 있었지만 어디를 사모했는지 다시 배열하십시오.";
      return;
    }
    document.querySelector("#sentenceDirection").textContent = `문장 방향: ${fragments.map((fragment) => directionLabels[fragment.dir]).join(" > ")}`;
    document.querySelector("#directionLock").hidden = false;
    document.querySelector("#feedback").textContent = "문장이 완성되었습니다. 작은 방향 표식을 자물쇠에 입력하십시오.";
  });

  document.querySelector("#resetSentence").addEventListener("click", () => {
    sentenceSlots.splice(0, sentenceSlots.length);
    document.querySelector("#directionLock").hidden = true;
    lockInput.splice(0, lockInput.length);
    updateDirectionDisplay();
    drawSentencePuzzle();
    document.querySelector("#sentenceDirection").textContent = "문장 방향: ----";
    document.querySelector("#feedback").textContent = "문장 조각을 다시 배열합니다.";
  });

  surface.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => {
      if (lockInput.length >= directionSequence.length) return;
      lockInput.push(button.dataset.dir);
      updateDirectionDisplay();
      if (lockInput.length !== directionSequence.length) return;
      const correct = directionSequence.every((dir, order) => lockInput[order] === dir);
      if (correct) {
        document.querySelector("#feedback").textContent = "방향 자물쇠가 열렸습니다. 더 나은 본향을 향한 길이 열렸습니다.";
        unlock();
        return;
      }
      document.querySelector("#feedback").textContent = "자물쇠가 열리지 않습니다. 반복 기록의 방향 표식을 다시 확인하십시오.";
    });
  });

  document.querySelector("#resetDirection").addEventListener("click", () => {
    lockInput.splice(0, lockInput.length);
    updateDirectionDisplay();
    document.querySelector("#feedback").textContent = "방향 입력을 초기화했습니다.";
  });

  function updateDirectionDisplay() {
    document.querySelector("#directionDisplay").textContent = `입력: ${
      lockInput.length ? lockInput.map((dir) => directionLabels[dir]).join(" > ") : "----"
    }`;
  }
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
