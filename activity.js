const stages = [
  {
    id: "case",
    step: "00",
    place: "본관 / 접수 지점",
    title: "찢어진 본향 지도",
    story:
      "본관 접수 지점에서 오래된 지도가 찢어진 채 발견되었습니다. 지도 가장자리에는 히브리서 11장의 일부 단어가 비어 있습니다.",
    mission:
      "QR을 찍어 지도 조각 퍼즐을 완료하십시오. 퍼즐이 열어 주는 완료 코드를 이 페이지에 입력하면 다음 현장으로 이동할 수 있습니다.",
    hint: "게임 화면의 조각을 맞추면 대문자와 숫자로 된 코드가 나타납니다.",
    answers: ["MAP-1113"],
    unlock: "접수 완료. 순례자는 길을 잃은 것이 아니라 누군가가 따라오도록 흔적을 남겼습니다.",
  },
  {
    id: "bag",
    step: "01",
    place: "야외 시설 / 마당",
    title: "남겨진 배낭",
    story:
      "마당 한쪽에 무거운 배낭이 놓여 있습니다. 안에는 돌, 돈 봉투, 트로피, 거울, 시계가 들어 있고 각각 짧은 메모가 붙어 있습니다.",
    mission:
      "QR 게임에서 배낭 속 물건과 마음의 짐을 바르게 연결하십시오. 완료 코드를 이 페이지에 입력합니다.",
    hint: "게임을 끝내면 EMPTY로 시작하는 코드가 나타납니다.",
    answers: ["EMPTY-240"],
    unlock: "그는 도망친 것이 아니라 가벼워지고 있었습니다. 지도 조각 하나를 획득하십시오.",
  },
  {
    id: "name",
    step: "02",
    place: "숙소 / 방문 앞",
    title: "찢어진 이름표",
    story:
      "숙소 문 앞에 찢어진 이름표가 흩어져 있습니다. 어떤 이름은 평가처럼 보이고, 어떤 이름은 믿음의 정체성처럼 보입니다.",
    mission:
      "QR 게임에서 찢어진 이름표 조각을 순서대로 선택하십시오. 완료 코드를 이 페이지에 입력합니다.",
    hint: "게임을 끝내면 PILGRIM으로 시작하는 코드가 나타납니다.",
    answers: ["PILGRIM-313"],
    unlock: "정체성 확인. 그들은 땅에서는 나그네였지만 방향을 잃지 않았습니다.",
  },
  {
    id: "ledger",
    step: "03",
    place: "주방 및 기타 시설",
    title: "비어 있는 장부",
    story:
      "섬김 테이블 위에 시간, 돈, 재능, 관계, 마음 장부가 놓여 있습니다. 주인 칸은 비어 있고 맡은 사람 칸만 남아 있습니다.",
    mission:
      "QR 게임에서 장부의 항목들을 맡겨진 것의 자리로 옮기십시오. 완료 코드를 이 페이지에 입력합니다.",
    hint: "게임을 끝내면 STEWARD로 시작하는 코드가 나타납니다.",
    answers: ["STEWARD-503"],
    unlock: "장부 복원. 순례자는 소유자가 아니라 맡은 사람이었습니다.",
  },
  {
    id: "road",
    step: "04",
    place: "비아 돌로로사 / 길",
    title: "돌아갈 수 있었던 길",
    story:
      "길 위에는 두 방향의 발자국이 있습니다. 하나는 익숙한 곳으로 돌아가고, 다른 하나는 아직 보이지 않는 곳을 향합니다.",
    mission:
      "QR 게임에서 발자국 순서를 맞춰 더 나은 본향으로 가는 길을 여십시오. 완료 코드를 이 페이지에 입력합니다.",
    hint: "게임을 끝내면 BETTER로 시작하는 코드가 나타납니다.",
    answers: ["BETTER-1116"],
    unlock: "길 확인. 그는 돌아갈 기회가 있었지만 더 나은 본향을 사모했습니다.",
  },
  {
    id: "home",
    step: "05",
    place: "예배당 / 마무리",
    title: "예비된 성",
    story:
      "모든 지도 조각이 예배당에 모였습니다. 찢어진 지도 뒤에는 마지막 고백이 숨겨져 있습니다.",
    mission:
      "QR 게임에서 앞 단계의 키워드로 마지막 고백을 완성하십시오. 완료 코드를 이 페이지에 입력하면 사건이 종결됩니다.",
    hint: "게임을 끝내면 CITY로 시작하는 코드가 나타납니다.",
    answers: ["CITY-516"],
    unlock: "사건 종결. 우리는 더 나은 본향을 향해 걷는 순례자입니다.",
  },
];

const storageKey = "homeward-case-progress";
const params = new URLSearchParams(window.location.search);
const initialStage = params.get("stage") || window.location.hash.replace("#", "") || "case";

const state = loadState();
let activeStageId = stages.some((stage) => stage.id === initialStage) ? initialStage : state.activeStageId;

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
const saveStatus = document.querySelector("#saveStatus");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const currentPlace = document.querySelector("#currentPlace");
const finalPanel = document.querySelector("#finalPanel");
const resetButton = document.querySelector("#resetButton");

teamName.value = state.teamName;
render();

teamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.teamName = teamName.value.trim();
  saveState();
  saveStatus.textContent = state.teamName
    ? `${state.teamName}의 사건파일을 저장했습니다.`
    : "팀 이름 없이 진행합니다.";
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
  moveToNextStage(stage.id);
  saveState();
  render();
});

teamNote.addEventListener("input", () => {
  state.notes[activeStageId] = teamNote.value;
  saveState();
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
  gameLink.href = `game.html?stage=${stage.id}`;
  currentPlace.textContent = stage.place;
  teamNote.value = state.notes[stage.id] || "";
  answerInput.value = "";

  const completedCount = stages.filter((item) => state.completed[item.id]).length;
  progressText.textContent = `${completedCount} / ${stages.length} 완료`;
  progressBar.style.width = `${(completedCount / stages.length) * 100}%`;
  finalPanel.hidden = completedCount !== stages.length;

  stageList.innerHTML = stages
    .map((item) => {
      const status = state.completed[item.id] ? "완료" : item.id === stage.id ? "진행 중" : "대기";
      return `
        <button type="button" class="${item.id === stage.id ? "active" : ""}" data-stage="${item.id}">
          <span>${item.step}</span>
          <strong>${item.title}</strong>
          <small>${status}</small>
        </button>
      `;
    })
    .join("");

  stageList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
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

function moveToNextStage(stageId) {
  const index = stages.findIndex((stage) => stage.id === stageId);
  if (index >= 0 && index < stages.length - 1) {
    activeStageId = stages[index + 1].id;
  }
}

function loadState() {
  const fallback = { teamName: "", activeStageId: "case", completed: {}, notes: {} };
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
