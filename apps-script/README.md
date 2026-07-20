# Google Apps Script 배포 방법

1. <https://script.google.com> 에서 `새 프로젝트`를 만듭니다.
2. 기본 `Code.gs` 내용을 이 폴더의 `Code.gs` 내용으로 교체합니다.
3. 왼쪽 `+` 버튼으로 HTML 파일을 만듭니다.
   - `Index`
   - `Qr`
   - `Activity`
   - `Styles`
   - `Script`
   - `ActivityStyles`
   - `ActivityScript`
4. 각 파일에 이 폴더의 같은 이름 파일 내용을 붙여 넣습니다.
5. `배포` > `새 배포` > 유형 `웹 앱`을 선택합니다.
6. 실행 권한은 `나`, 액세스 권한은 필요에 따라 `모든 사용자` 또는 `링크가 있는 모든 사용자`로 설정합니다.
7. 배포 URL이 제안서 웹 주소입니다.

활동 페이지는 배포 URL 뒤에 `?page=activity`를 붙이면 열립니다.
QR 샘플 페이지는 배포 URL 뒤에 `?page=qr`을 붙이면 열립니다.

## GitHub Pages와 진행 대시보드 연결

1. Apps Script를 웹 앱으로 배포합니다.
2. 첫 배포 URL을 복사합니다. 예: `https://script.google.com/macros/s/.../exec`
3. 저장소 루트의 `config.js`에서 `apiUrl` 값을 배포 URL로 바꿉니다.
4. `activity.html`에서 팀 이름과 비밀번호를 저장하거나 코드를 제출하면 Apps Script가 자동으로 `본향 사건파일 진행현황` Google Spreadsheet를 만들고 진행 내용을 저장합니다.
5. `dashboard.html`은 5초마다 해당 데이터를 불러옵니다.

대시보드 비밀번호 기본값은 `2010102017`입니다.
