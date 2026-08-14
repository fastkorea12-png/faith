function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'occupancy') {
    var occupancy = getOccupancyData();
    if (e.parameter.callback) {
      return jsonpResponse(e.parameter.callback, occupancy);
    }
    return jsonResponse(occupancy);
  }

  if (e && e.parameter && e.parameter.action === 'dashboard') {
    if (e.parameter.callback) {
      return jsonpResponse(e.parameter.callback, getDashboardData());
    }
    return jsonResponse(getDashboardData());
  }

  if (e && e.parameter && e.parameter.action === 'teamProgress') {
    var progress = getTeamProgressData(e.parameter.teamName, e.parameter.teamPassword);
    if (e.parameter.callback) {
      return jsonpResponse(e.parameter.callback, progress);
    }
    return jsonResponse(progress);
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
  var previousCompletedCount = -1;
  var previousProgressAt = '';

  for (var i = 1; i < rows.length; i += 1) {
    if (String(rows[i][1]) + '::' + String(rows[i][2]) === key) {
      rowIndex = i + 1;
      previousCompletedCount = Number(rows[i][5] || 0);
      previousProgressAt = rows[i][10] || '';
      break;
    }
  }

  var now = new Date();
  var newCompletedCount = Number(payload.completedCount || 0);
  // lastProgressAt만 따로 추적한다: "정체 시간"은 팀이 마지막으로 실제 스테이지를
  // 완료한 시점부터 측정해야 의미가 있다. updatedAt은 메모 입력 등으로도 계속
  // 갱신되므로, 그것만으로는 진짜 막힌 팀과 활발히 메모만 쓰는 팀을 구분할 수 없다.
  var lastProgressAt = newCompletedCount > previousCompletedCount || rowIndex === -1 ? now : previousProgressAt;

  var values = [
    now,
    payload.teamName || '',
    payload.teamPassword || '',
    payload.activeStageId || '',
    payload.activeStageTitle || '',
    newCompletedCount,
    Number(payload.totalStages || 6),
    JSON.stringify(payload.completedStages || []),
    JSON.stringify(payload.notes || {}),
    payload.eventType || '',
    lastProgressAt,
    Number(payload.hintsCount || 0),
  ];

  if (rowIndex === -1) {
    sheet.appendRow(values);
  } else {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([values]);
  }

  return { ok: true };
}

function getTeamProgressData(teamName, teamPassword) {
  var sheet = getProgressSheet();
  var rows = sheet.getDataRange().getValues();
  var key = String(teamName || '') + '::' + String(teamPassword || '');

  for (var i = 1; i < rows.length; i += 1) {
    if (String(rows[i][1]) + '::' + String(rows[i][2]) === key) {
      var completedStages = [];
      var notes = {};
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

      return {
        ok: true,
        found: true,
        updatedAt: rows[i][0],
        activeStageId: rows[i][3],
        completedStages: completedStages,
        notes: notes,
        hints: Number(rows[i][11] || 0),
      };
    }
  }

  return { ok: true, found: false, completedStages: [], notes: {} };
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
      id: 'team-' + i,
      updatedAt: rows[i][0],
      teamName: rows[i][1],
      activeStageId: rows[i][3],
      activeStageTitle: rows[i][4],
      completedCount: rows[i][5],
      totalStages: rows[i][6],
      completedStages: completedStages,
      notes: notes,
      note: notes[rows[i][3]] || '',
      eventType: rows[i][9],
      lastProgressAt: rows[i][10] || rows[i][0],
      hints: Number(rows[i][11] || 0),
    });
  }

  return {
    ok: true,
    spreadsheetUrl: SpreadsheetApp.openById(getSpreadsheetId()).getUrl(),
    teams: teams,
  };
}

function getOccupancyData() {
  var stages = [
    { id: 'case', step: '00', place: '본관 / 접수' },
    { id: 'bag', step: '01', place: '야외 시설' },
    { id: 'name', step: '02', place: '숙소' },
    { id: 'ledger', step: '03', place: '창고 및 물자 보관소' },
    { id: 'road', step: '04', place: '비아 돌로로사' },
    { id: 'home', step: '05', place: '예배당' },
  ];
  var dashboard = getDashboardData();
  var now = new Date().getTime();
  var freshnessMs = 30 * 60 * 1000;

  var occupancy = stages.map(function(stage) {
    var users = dashboard.teams.filter(function(team) {
      var updatedAt = new Date(team.updatedAt).getTime();
      var isFresh = isFinite(updatedAt) && now - updatedAt <= freshnessMs;
      var alreadyCompleted = team.completedStages.indexOf(stage.id) !== -1;
      return isFresh && !alreadyCompleted && team.activeStageId === stage.id;
    });
    return {
      id: stage.id,
      step: stage.step,
      place: stage.place,
      count: users.length,
      occupied: users.length > 0,
    };
  });

  return {
    ok: true,
    updatedAt: new Date(),
    refreshSeconds: 15,
    occupancy: occupancy,
  };
}

function getProgressSheet() {
  var spreadsheet = SpreadsheetApp.openById(getSpreadsheetId());
  var sheet = spreadsheet.getSheetByName('progress') || spreadsheet.insertSheet('progress');
  var headers = getHeaders();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else if (sheet.getLastColumn() < headers.length) {
    // 기존 시트에 lastProgressAt 같은 새 컬럼이 추가된 경우 헤더 행만 보강한다.
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
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
    'lastProgressAt',
    'hintsCount',
  ];
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonpResponse(callback, payload) {
  var safeCallback = String(callback || '').replace(/[^\w$.]/g, '');
  if (!safeCallback) return jsonResponse({ ok: false, error: 'Invalid callback' });

  return ContentService
    .createTextOutput(safeCallback + '(' + JSON.stringify(payload) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
