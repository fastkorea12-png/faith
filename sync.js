(function () {
  const config = window.HOMEWARD_CONFIG || {};

  async function send(action, payload) {
    if (!config.apiUrl) return { ok: false, offline: true };
    await fetch(config.apiUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, payload }),
    });
    return { ok: true, opaque: true };
  }

  async function getDashboard() {
    if (!config.apiUrl) return { ok: false, offline: true };
    return jsonp(`${config.apiUrl}?action=dashboard`);
  }

  async function getTeamProgress(teamName, teamPassword) {
    if (!config.apiUrl || !teamName || !teamPassword) return { ok: false, offline: true };
    const query = new URLSearchParams({
      action: "teamProgress",
      teamName,
      teamPassword,
    });
    return jsonp(`${config.apiUrl}?${query.toString()}`);
  }

  function jsonp(url) {
    return new Promise((resolve, reject) => {
      const callbackName = `homewardDashboard_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const script = document.createElement("script");
      const separator = url.includes("?") ? "&" : "?";

      window[callbackName] = (payload) => {
        resolve(payload);
        cleanup();
      };

      script.onerror = () => {
        reject(new Error("Dashboard JSONP load failed"));
        cleanup();
      };

      script.src = `${url}${separator}callback=${encodeURIComponent(callbackName)}`;
      document.head.appendChild(script);

      function cleanup() {
        delete window[callbackName];
        script.remove();
      }
    });
  }

  window.HomewardSync = {
    config,
    send,
    getDashboard,
    getTeamProgress,
  };
})();
