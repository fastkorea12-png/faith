const stations = [
  {
    id: "case",
    step: "00 / 사건 접수",
    title: "찢어진 본향 지도",
    cue: "배낭과 사건파일을 수령하고, 사라진 말씀 빈칸을 확인합니다.",
  },
  {
    id: "bag",
    step: "01 / 증거",
    title: "남겨진 배낭",
    cue: "짐 카드와 물건 메모를 대조해 순례자가 무엇을 내려놓았는지 기록합니다.",
  },
  {
    id: "name",
    step: "02 / 증거",
    title: "찢어진 이름표",
    cue: "투명 필름을 겹쳐 세상이 붙인 이름과 믿음의 이름을 구분합니다.",
  },
  {
    id: "ledger",
    step: "03 / 증거",
    title: "비어 있는 장부",
    cue: "시간, 돈, 재능, 관계, 마음이 누구에게 맡겨졌는지 추론합니다.",
  },
  {
    id: "road",
    step: "04 / 증거",
    title: "돌아갈 수 있었던 길",
    cue: "두 갈래 발자국을 따라 순례자가 향한 방향을 밝혀냅니다.",
  },
  {
    id: "home",
    step: "05 / 결론",
    title: "예비된 성",
    cue: "지도 조각과 히브리서 빈칸을 완성하고 최종 고백으로 마무리합니다.",
  },
];

const qrGrid = document.querySelector("#qrGrid");

if (qrGrid) {
  const origin = `${window.location.origin}${window.location.pathname.replace("qr.html", "index.html")}`;
  qrGrid.innerHTML = stations
    .map((station) => {
      const url = `${origin}#${station.id}`;
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
