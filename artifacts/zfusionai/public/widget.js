/*!
 * ZFusionAI web chat widget
 * <script src="https://zfusionai.com/widget.js" data-agent="pub_xxx" async></script>
 */
(function () {
  "use strict";
  var script = document.currentScript;
  if (!script || window.__zfusionWidget) return;
  window.__zfusionWidget = true;

  var publicId = script.getAttribute("data-agent");
  if (!publicId) return console.warn("[ZFusionAI] data-agent attribute is missing.");
  var apiBase = new URL(script.src).origin + "/api/public/agents/" + encodeURIComponent(publicId);
  var storeKey = "zf_widget_" + publicId;

  function load() {
    try {
      return JSON.parse(sessionStorage.getItem(storeKey) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(state) {
    try {
      sessionStorage.setItem(storeKey, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable: keep in memory only */
    }
  }
  function randomId() {
    var a = new Uint8Array(12);
    crypto.getRandomValues(a);
    return "s_" + Array.prototype.map.call(a, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  var state = load() || { sessionId: randomId(), messages: [] };

  fetch(apiBase)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(mount)
    .catch(function () { console.warn("[ZFusionAI] Widget unavailable for this site."); });

  function mount(cfg) {
    var color = /^#[0-9a-f]{6}$/i.test(cfg.color) ? cfg.color : "#25D366";
    var host = document.createElement("div");
    host.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:2147483000";
    document.body.appendChild(host);
    var root = host.attachShadow({ mode: "open" });

    root.innerHTML =
      '<style>' +
      ':host{all:initial}*{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
      '.btn{width:56px;height:56px;border-radius:50%;border:0;background:' + color + ';color:#fff;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center}' +
      '.panel{position:absolute;right:0;bottom:72px;width:min(360px,calc(100vw - 32px));height:min(520px,calc(100vh - 120px));background:#fff;color:#0f172a;border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden}' +
      '.panel.open{display:flex}' +
      '.head{background:' + color + ';color:#fff;padding:14px 16px;font-weight:700;display:flex;justify-content:space-between;align-items:center}' +
      '.head button{background:none;border:0;color:#fff;font-size:20px;cursor:pointer;line-height:1}' +
      '.list{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f8fafc}' +
      '.msg{max-width:85%;padding:8px 12px;border-radius:12px;font-size:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}' +
      '.bot{background:#fff;border:1px solid #e2e8f0;align-self:flex-start}' +
      '.me{background:' + color + ';color:#fff;align-self:flex-end}' +
      '.typing{font-size:12px;color:#64748b}' +
      'form{display:flex;gap:8px;padding:10px;border-top:1px solid #e2e8f0;background:#fff}' +
      'input{flex:1;border:1px solid #cbd5e1;border-radius:10px;padding:10px;font-size:14px;outline:none}' +
      'input:focus{border-color:' + color + '}' +
      'form button{border:0;border-radius:10px;padding:0 14px;background:' + color + ';color:#fff;font-weight:700;cursor:pointer}' +
      'form button:disabled{opacity:.5}' +
      '.foot{font-size:10px;text-align:center;color:#94a3b8;padding:0 0 6px;background:#fff}' +
      '.foot a{color:inherit}' +
      '</style>' +
      '<div class="panel" role="dialog" aria-label="Chat"><div class="head"><span class="title"></span><button type="button" class="close" aria-label="Close chat">×</button></div>' +
      '<div class="list" aria-live="polite"></div>' +
      '<form><input type="text" maxlength="1000" placeholder="Type a message…" aria-label="Message" /><button type="submit">Send</button></form>' +
      '<div class="foot">Powered by <a href="https://zfusionai.com" target="_blank" rel="noopener">ZFusionAI</a></div></div>' +
      '<button class="btn" type="button" aria-label="Open chat"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z"/></svg></button>';

    var panel = root.querySelector(".panel");
    var list = root.querySelector(".list");
    var form = root.querySelector("form");
    var input = root.querySelector("input");
    var send = root.querySelector("form button");
    root.querySelector(".title").textContent = cfg.name || "Chat";

    function bubble(text, who) {
      var el = document.createElement("div");
      el.className = "msg " + who;
      el.textContent = text;
      list.appendChild(el);
      list.scrollTop = list.scrollHeight;
      return el;
    }
    function render() {
      list.textContent = "";
      bubble(cfg.welcome || "Hi! How can I help?", "bot");
      state.messages.forEach(function (m) { bubble(m.content, m.role === "user" ? "me" : "bot"); });
    }
    render();

    root.querySelector(".btn").addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) input.focus();
    });
    root.querySelector(".close").addEventListener("click", function () { panel.classList.remove("open"); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      state.messages.push({ role: "user", content: text });
      state.messages = state.messages.slice(-20);
      save(state);
      bubble(text, "me");
      var typing = document.createElement("div");
      typing.className = "typing";
      typing.textContent = "Typing…";
      list.appendChild(typing);
      send.disabled = true;

      fetch(apiBase + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: state.sessionId, messages: state.messages }),
      })
        .then(function (r) { return r.json().then(function (d) { if (!r.ok) throw new Error(d.message || "Error"); return d; }); })
        .then(function (d) {
          state.messages.push({ role: "assistant", content: d.reply });
          save(state);
          bubble(d.reply, "bot");
        })
        .catch(function (err) {
          state.messages.pop();
          save(state);
          bubble("Sorry, I couldn't reply right now. " + (err && err.message ? "(" + err.message + ")" : ""), "bot");
        })
        .finally(function () {
          typing.remove();
          send.disabled = false;
          input.focus();
        });
    });
  }
})();
