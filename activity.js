const stages = [
  {
    id: "case",
    step: "00",
    place: "본관 / 접수 지점",
    title: "조작된 사건파일",
    story:
      "본관 접수 기록에는 조사팀이 아직 도착하지 않았다고 적혀 있습니다. 사건 메모에는 지우면 안 되는 문자와 기록을 여는 위치가 남아 있습니다.",
    mission:
      "QR을 찍어 사건 메모를 해석하십시오. 입력은 하나입니다. 아직 목적지에 이르지 않은 조사팀의 정체성을 찾으십시오.",
    hint: "도착하지 않았고, 최종 목적지도 미기록인 채 길 위에 있는 사람을 무엇이라 부를지 생각해 보십시오.",
    answers: ["PILGRIM-00"],
    unlock: "접수 완료. 첫 키워드 '나그네'를 확보했습니다.",
  },
  {
    id: "bag",
    step: "01",
    place: "야외 시설 / 마당",
    title: "너무 오래 머문 자리",
    story:
      "야외 시설의 편안한 자리마다 숫자 표식이 남아 있습니다. 쉬는 자리는 필요하지만, 너무 오래 머물면 목적지가 됩니다.",
    mission:
      "QR 게임이 알려 주는 순서대로 표식 숫자를 읽고, 4자리 자물쇠 봉투를 여십시오.",
    hint: "그늘, 함께 앉는 자리, 낮은 무게, 길목의 순서로 숫자를 읽으십시오.",
    answers: ["TENT-01"],
    unlock: "두 번째 키워드 '장막'을 확보했습니다.",
  },
  {
    id: "name",
    step: "02",
    place: "숙소 / 방문 앞",
    title: "잠긴 휴대폰",
    story:
      "숙소 앞에 주인을 알 수 없는 휴대폰과 문 앞 안내문이 남겨져 있습니다. 잠금화면 알림은 약속한 날과 비밀번호 형식을 말합니다.",
    mission:
      "알림과 문 앞 기록으로 휴대폰을 연 뒤 사진 세 장의 상태를 대조하고 메모의 마지막 기록을 복원하십시오.",
    hint: "알림 두 개를 모두 읽고, 사진에서는 반복 횟수보다 임시·원본 상태 도장을 비교하십시오.",
    answers: ["PROMISE-02"],
    unlock: "세 번째 키워드 '약속'을 확보했습니다.",
  },
  {
    id: "ledger",
    step: "03",
    place: "주방 및 기타 시설",
    title: "맡겨진 것을 바꾼 사람",
    story:
      "세 품목의 위치와 인계 문장이 바뀌었습니다. 원본 선반과 변경 기록, 담당 권한을 대조해야 합니다.",
    mission:
      "현장 재고 카드 여섯 장을 원래 선반에 복원하고 조작 기록과 담당자를 찾아 실제 자물쇠를 여십시오.",
    hint: "수량은 계산하지 않습니다. 발견 위치와 원래 선반, ‘먼저 처리’ 문장과 기록자를 대조하십시오.",
    answers: ["STEWARD-03"],
    unlock: "네 번째 키워드 '청지기'를 확보했습니다.",
  },
  {
    id: "road",
    step: "04",
    place: "비아 돌로로사 / 길",
    title: "돌아갈 수 있었던 길",
    story:
      "네 현장 표식의 기억이 갈림길을 통과할 근거가 됩니다. 마지막에는 길의 방향이 기록의 방향으로 뒤집힙니다.",
    mission:
      "기억 담당을 나누어 네 갈림길을 통과하고, 문장 조각과 현장 카드의 방향 홈으로 실제 자물쇠를 여십시오.",
    hint: "조사 순서보다 자연스러운 문장 순서를 찾고, 화살표를 목적지가 아닌 지나온 선택 기록으로 읽으십시오.",
    answers: ["BETTER-04"],
    unlock: "다섯 번째 키워드 '더 나은 본향'을 확보했습니다.",
  },
  {
    id: "home",
    step: "05",
    place: "예배당 / 마무리",
    title: "예비된 성",
    story:
      "모든 사건 키워드가 예배당에 모였습니다. 앞선 장소의 단어들이 마지막 고백의 빈칸이 됩니다.",
    mission:
      "QR 게임에서 앞 단계의 키워드로 마지막 고백을 완성하십시오. 완료 코드를 이 페이지에 입력하면 사건이 종결됩니다.",
    hint: "나그네, 장막, 약속, 청지기, 더 나은 본향을 순서대로 확인하십시오.",
    answers: ["HOMEWARD-05"],
    unlock: "사건 종결. 우리는 더 나은 본향을 향해 걷는 순례자입니다.",
  },
];

const storageKey = "homeward-case-progress";
const params = new URLSearchParams(window.location.search);
const initialStage = params.get("stage") || window.location.hash.replace("#", "") || "case";

const state = loadState();
let activeStageId = stages.some((stage) => stage.id === initialStage) ? initialStage : state.activeStageId;
if (activeStageId === "home" && !allCoreStagesComplete()) activeStageId = "case";

const stageList = document.querySelector("#stageList");
const stageStep = document.querySelector("#stageStep");
const stagePlace = document.querySelector("#stagePlace");
const stageTitle = document.querySelector("#stageTitle");
const stageStory = document.querySelector("#stageStory");
const stageMission = document.querySelector("#stageMission");
const stageHint = document.querySelector("#stageHint");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const gameLink = document.querySelector("#gameLink");
const recorderMessage = document.querySelector("#recorderMessage");
const teamNote = document.querySelector("#teamNote");
const teamForm = document.querySelector("#teamForm");
const teamName = document.querySelector("#teamName");
const teamPassword = document.querySelector("#teamPassword");
const saveStatus = document.querySelector("#saveStatus");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const currentPlace = document.querySelector("#currentPlace");
const finalPanel = document.querySelector("#finalPanel");
const resetButton = document.querySelector("#resetButton");

teamName.value = state.teamName;
teamPassword.value = state.teamPassword;
render();

teamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.teamName = teamName.value.trim();
  state.teamPassword = teamPassword.value.trim();
  saveState();
  if (!state.teamName || !state.teamPassword) {
    saveStatus.textContent = "팀 이름과 팀 비밀번호를 모두 입력하십시오.";
    return;
  }
  syncProgress("team_saved");
  saveStatus.textContent = `${state.teamName}의 사건파일을 저장했습니다.`;
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const stage = getActiveStage();
  const answer = normalize(answerInput.value);
  const matched = stage.answers.some((item) => answer === normalize(item));

  if (!matched) {
    recorderMessage.textContent = "기록자: 코드가 맞지 않습니다. QR 게임을 완료한 뒤 열린 코드를 그대로 입력하십시오.";
    recorderMessage.dataset.status = "warn";
    return;
  }

  state.completed[stage.id] = true;
  recorderMessage.textContent = `기록자: ${stage.unlock}`;
  recorderMessage.dataset.status = "success";
  saveState();
  syncProgress("stage_completed");
  render();
});

teamNote.addEventListener("input", () => {
  state.notes[activeStageId] = teamNote.value;
  saveState();
  window.clearTimeout(teamNote.syncTimer);
  teamNote.syncTimer = window.setTimeout(() => syncProgress("note_updated"), 500);
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  window.location.href = "activity.html";
});

function render() {
  const stage = getActiveStage();
  state.activeStageId = stage.id;
  stageStep.textContent = stage.step;
  stagePlace.textContent = stage.place;
  stageTitle.textContent = stage.title;
  stageStory.textContent = stage.story;
  stageMission.textContent = stage.mission;
  stageHint.textContent = stage.hint;
  gameLink.textContent = `${stage.place}에 숨겨진 QR을 찾아 스캔하십시오. 직접 주소 입력으로는 게임이 열리지 않습니다.`;
  currentPlace.textContent = stage.place;
  teamNote.value = state.notes[stage.id] || "";
  answerInput.value = "";

  const completedCount = stages.filter((item) => state.completed[item.id]).length;
  progressText.textContent = `${completedCount} / ${stages.length} 완료`;
  progressBar.style.width = `${(completedCount / stages.length) * 100}%`;
  finalPanel.hidden = completedCount !== stages.length;

  stageList.innerHTML = stages
    .map((item) => {
      const locked = item.id === "home" && !allCoreStagesComplete();
      const status = state.completed[item.id] ? "완료" : locked ? "앞 단계 필요" : item.id === stage.id ? "진행 중" : "대기";
      return `
        <button type="button" class="${item.id === stage.id ? "active" : ""}" data-stage="${item.id}" ${locked ? "disabled" : ""}>
          <span>${item.step}</span>
          <strong>${item.title}</strong>
          <small>${status}</small>
        </button>
      `;
    })
    .join("");

  stageList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      activeStageId = button.dataset.stage;
      recorderMessage.textContent = "기록자: 선택한 현장의 사건기록을 불러왔습니다.";
      recorderMessage.dataset.status = "";
      render();
      updateUrl(activeStageId);
    });
  });

  updateUrl(stage.id);
}

function getActiveStage() {
  return stages.find((stage) => stage.id === activeStageId) || stages[0];
}

function allCoreStagesComplete() {
  return stages.filter((stage) => stage.id !== "home").every((stage) => state.completed[stage.id]);
}

function loadState() {
  const fallback = { teamName: "", teamPassword: "", activeStageId: "case", completed: {}, notes: {} };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function normalize(value) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}

function updateUrl(stageId) {
  const next = `${window.location.pathname}?stage=${stageId}`;
  window.history.replaceState(null, "", next);
}

async function syncProgress(eventType) {
  if (!window.HomewardSync || !state.teamName || !state.teamPassword) return;
  const completedStages = stages.filter((stage) => state.completed[stage.id]).map((stage) => stage.id);
  const current = getActiveStage();
  try {
    const result = await window.HomewardSync.send("saveProgress", {
      eventType,
      teamName: state.teamName,
      teamPassword: state.teamPassword,
      activeStageId: state.activeStageId,
      activeStageTitle: current.title,
      completedStages,
      completedCount: completedStages.length,
      totalStages: stages.length,
      notes: state.notes,
      updatedAt: new Date().toISOString(),
    });
    if (result.ok) saveStatus.textContent = "대시보드에 진행 상황을 반영했습니다.";
    if (result.offline) saveStatus.textContent = "로컬 저장 중입니다. config.js에 Apps Script URL을 넣으면 대시보드와 동기화됩니다.";
  } catch {
    saveStatus.textContent = "로컬 저장 중입니다. 네트워크 연결 후 다시 저장하면 동기화됩니다.";
  }
}
