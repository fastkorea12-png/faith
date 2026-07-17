function doGet(e) {
  var page = 'Index';
  if (e && e.parameter && e.parameter.page === 'qr') page = 'Qr';
  if (e && e.parameter && e.parameter.page === 'activity') page = 'Activity';
  var template = HtmlService.createTemplateFromFile(page);
  template.appUrl = ScriptApp.getService().getUrl();

  return template
    .evaluate()
    .setTitle(page === 'Qr' ? '운영 QR 샘플 | 본향 사건파일' : page === 'Activity' ? '본향 사건파일 | 활동 페이지' : '본향 사건파일 | 야외 방탈출 제안서')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
