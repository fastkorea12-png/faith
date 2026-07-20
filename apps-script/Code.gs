function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'dashboard') {
    return jsonResponse(getDashboardData());
  }

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

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'saveProgress') {
      return jsonResponse(saveProgress(body.payload || {}));
    }
    return jsonResponse({ ok: false, error: 'Unknown action' });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function saveProgress(payload) {
  var sheet = getProgressSheet();
  var headers = getHeaders();
  var rows = sheet.getDataRange().getValues();
  var key = String(payload.teamName || '') + '::' + String(payload.teamPassword || '');
  var rowIndex = -1;

  for (var i = 1; i < rows.length; i += 1) {
    if (String(rows[i][1]) + '::' + String(rows[i][2]) === key) {
      rowIndex = i + 1;
      break;
    }
  }

  var values = [
    new Date(),
    payload.teamName || '',
    payload.teamPassword || '',
    payload.activeStageId || '',
    payload.activeStageTitle || '',
    Number(payload.completedCount || 0),
    Number(payload.totalStages || 6),
    JSON.stringify(payload.completedStages || []),
    JSON.stringify(payload.notes || {}),
    payload.eventType || '',
  ];

  if (rowIndex === -1) {
    sheet.appendRow(values);
  } else {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([values]);
  }

  return { ok: true };
}

function getDashboardData() {
  var sheet = getProgressSheet();
  var rows = sheet.getDataRange().getValues();
  var teams = [];

  for (var i = 1; i < rows.length; i += 1) {
    var notes = {};
    var completedStages = [];
    try {
      completedStages = JSON.parse(rows[i][7] || '[]');
    } catch (error) {
      completedStages = [];
    }
    try {
      notes = JSON.parse(rows[i][8] || '{}');
    } catch (error) {
      notes = {};
    }

    teams.push({
      id: String(rows[i][1]) + '-' + String(rows[i][2]),
      updatedAt: rows[i][0],
      teamName: rows[i][1],
      teamPassword: rows[i][2],
      activeStageId: rows[i][3],
      activeStageTitle: rows[i][4],
      completedCount: rows[i][5],
      totalStages: rows[i][6],
      completedStages: completedStages,
      notes: notes,
      note: notes[rows[i][3]] || '',
      eventType: rows[i][9],
    });
  }

  return {
    ok: true,
    spreadsheetUrl: SpreadsheetApp.openById(getSpreadsheetId()).getUrl(),
    teams: teams,
  };
}

function getProgressSheet() {
  var spreadsheet = SpreadsheetApp.openById(getSpreadsheetId());
  var sheet = spreadsheet.getSheetByName('progress') || spreadsheet.insertSheet('progress');
  var headers = getHeaders();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function getSpreadsheetId() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = properties.getProperty('PROGRESS_SPREADSHEET_ID');
  if (spreadsheetId) return spreadsheetId;

  var spreadsheet = SpreadsheetApp.create('본향 사건파일 진행현황');
  properties.setProperty('PROGRESS_SPREADSHEET_ID', spreadsheet.getId());
  return spreadsheet.getId();
}

function getHeaders() {
  return [
    'updatedAt',
    'teamName',
    'teamPassword',
    'activeStageId',
    'activeStageTitle',
    'completedCount',
    'totalStages',
    'completedStages',
    'notes',
    'eventType',
  ];
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
