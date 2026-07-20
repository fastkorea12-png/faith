(function () {
  const config = window.HOMEWARD_CONFIG || {};

  async function send(action, payload) {
    if (!config.apiUrl) return { ok: false, offline: true };
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, payload }),
    });
    return response.json();
  }

  async function getDashboard() {
    if (!config.apiUrl) return { ok: false, offline: true };
    const url = `${config.apiUrl}?action=dashboard`;
    const response = await fetch(url);
    return response.json();
  }

  window.HomewardSync = {
    config,
    send,
    getDashboard,
  };
})();
