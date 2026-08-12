const stations = [
  {
    id: "case",
    step: "00 / 사건 접수",
    title: "조작된 사건파일",
    cue: "사건 메모를 해석해 아직 길 위에 있는 조사팀의 정체성을 찾습니다.",
  },
  {
    id: "bag",
    step: "01 / 야외 탐색",
    title: "너무 오래 머문 자리",
    cue: "야외 표식 숫자 4개를 순서대로 찾아 자물쇠 봉투를 엽니다.",
  },
  {
    id: "name",
    step: "02 / 숙소 조사",
    title: "잠긴 휴대폰",
    cue: "잠금화면 알림과 숙소 문 앞 안내문을 대조해 잠금번호를 풉니다.",
  },
  {
    id: "ledger",
    step: "03 / 주방",
    title: "사라진 식량 장부",
    cue: "현장 재고 카드와 장부를 대조해 누락된 기록을 복원합니다.",
  },
  {
    id: "road",
    step: "04 / 길",
    title: "되돌아가는 길",
    cue: "반복되는 갈림길에서 루프를 끊는 선택을 찾습니다.",
  },
  {
    id: "home",
    step: "05 / 결론",
    title: "예비된 성",
    cue: "앞선 키워드 5개를 모아 최종 귀향 선언문을 완성합니다.",
  },
];

const qrGrid = document.querySelector("#qrGrid");

if (qrGrid) {
  const qrToken = window.HOMEWARD_CONFIG?.qrToken || "rodem-2026";
  const origin = `${window.location.origin}${window.location.pathname.replace("qr.html", "game.html")}`;
  qrGrid.innerHTML = stations
    .map((station) => {
      const url = `${origin}?stage=${station.id}&qr=${encodeURIComponent(qrToken)}`;
      const qr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
      return `
        <article class="qr-card">
          <img src="${qr}" alt="${station.title} QR" />
          <p>${station.step}</p>
          <h2>${station.title}</h2>
          <span>${station.cue}</span>
        </article>
      `;
    })
    .join("");
}
