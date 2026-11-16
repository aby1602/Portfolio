"use strict";
(function () {
  const $ = (id) => document.getElementById(id);
  const ZONE = "Australia/Melbourne";
  const storagePrefix = "arme:space:v1:";
  const tasks = [
    "Review fresh customer feedback",
    "Spot-check hot food at handoff",
    "Check drinks, sides and order accuracy",
    "Confirm portion consistency",
    "Recognise a team hospitality win"
  ];
  const metrics = [
    { key: "quality", name: "Food quality", hint: "Temperature, presentation, consistency" },
    { key: "accuracy", name: "Order accuracy", hint: "All items, drinks, requests checked" },
    { key: "service", name: "Guest experience", hint: "Hospitality, recoveries, friendly service" },
    { key: "flow", name: "Shift flow", hint: "Communication, readiness and team support" }
  ];
  const platforms = [
    { key: "google", name: "Google", badge: "G", color: "#91e9cd", className: "google" },
    { key: "uberEats", name: "Uber Eats", badge: "U", color: "#b2a4ff", className: "uber" },
    { key: "doorDash", name: "DoorDash", badge: "D", color: "#ffc57a", className: "dd" }
  ];
  let data = null;
  let chartRange = "7";
  let feedbackFilter = "all";
  let journalDate = null;
  let journalDraft = { metrics: {}, notes: "" };

  function text(value) { return String(value === null || value === undefined ? "" : value); }
  function escapeHtml(value) { return text(value).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function validUrl(value) { try { const u = new URL(value); return u.protocol === "https:" ? u.href : "#"; } catch (_) { return "#"; } }
  function readJSON(key, fallback) { try { const result = JSON.parse(localStorage.getItem(storagePrefix + key)); return result && typeof result === "object" ? result : fallback; } catch (_) { return fallback; } }
  function saveJSON(key, value) { try { localStorage.setItem(storagePrefix + key, JSON.stringify(value)); return true; } catch (_) { return false; } }
  function localDate() {
    const items = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const part = (type) => items.find((x) => x.type === type).value;
    return part("year") + "-" + part("month") + "-" + part("day");
  }
  function prettyDate(iso, options) {
    if (!iso) return "Unknown";
    const date = new Date(iso.slice(0, 10) + "T12:00:00+11:00");
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat("en-AU", Object.assign({ day: "numeric", month: "short", year: "numeric", timeZone: ZONE }, options || {})).format(date);
  }
  function score(row) {
    if (!data || !row || !row.ratings) return null;
    let weighted = 0;
    for (const entry of platforms) {
      const r = Number(row.ratings[entry.key] && row.ratings[entry.key].rating);
      if (!Number.isFinite(r) || r <= 0 || r > 5) return null;
      weighted += r * data.scoring.weights[entry.key];
    }
    return Math.round(20 * weighted);
  }
  function records() { return data ? data.snapshots.slice().sort((a, b) => a.date.localeCompare(b.date)) : []; }
  function latest() { return records().slice(-1)[0]; }
  function ratingScore(row, key) { const r = row.ratings[key]; return r && Number.isFinite(Number(r.rating)) ? r.rating * 20 : null; }
  function toast(msg) { const el = $("toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toast.timeout); toast.timeout = setTimeout(() => el.classList.remove("show"), 3000); }
  function clock() {
    const now = new Date();
    $("liveClock").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: ZONE, hour: "numeric", minute: "2-digit", hour12: true }).format(now).toUpperCase();
    $("todayLabel").textContent = new Intl.DateTimeFormat("en-AU", { timeZone: ZONE, weekday: "long", day: "numeric", month: "short" }).format(now).toUpperCase();
    const hr = Number(new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, hour: "numeric", hourCycle: "h23" }).format(now));
    const greeting = hr < 12 ? "Good morning," : hr < 17 ? "Good afternoon," : "Good evening,";
    const title = document.querySelector("#overview .page-heading h1");
    if (title) title.innerHTML = greeting + ' <em>Abi.</em> <span class="heading-spark">✳</span>';
  }
  function nav() {
    const requested = location.hash.replace("#", "");
    const target = ["overview", "feedback", "shift", "method"].includes(requested) ? requested : "overview";
    document.querySelectorAll("[data-view]").forEach((el) => { el.hidden = el.id !== target; });
    document.querySelectorAll(".nav-link").forEach((el) => { el.classList.toggle("active", el.dataset.viewLink === target); });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function renderOverview() {
    const rows = records();
    if (!rows.length) return;
    const current = rows[rows.length - 1];
    const previous = rows.length > 1 ? rows[rows.length - 2] : null;
    const currentScore = score(current);
    const prevScore = previous ? score(previous) : null;
    $("pulseScore").textContent = currentScore === null ? "—" : currentScore;
    $("scoreRing").style.background = "conic-gradient(#cef76b " + (currentScore || 0) * 3.6 + "deg, #294139 0deg)";
    $("scoreHeadline").textContent = currentScore >= 90 ? "A strong reputation." : currentScore >= 80 ? "Solid foundations." : currentScore >= 70 ? "Keep building trust." : "A chance to improve.";
    const delta = currentScore !== null && prevScore !== null ? currentScore - prevScore : null;
    $("scoreDelta").textContent = delta === null ? "◌  First verified baseline" : delta > 0 ? "↗  +" + delta + " points since " + prettyDate(previous.date, { year: undefined }) : delta < 0 ? "↘  " + delta + " points since " + prettyDate(previous.date, { year: undefined }) : "↔  No movement since " + prettyDate(previous.date, { year: undefined });
    $("scoreAsOf").textContent = "Last rating check: " + prettyDate(current.date) + " · " + new Intl.DateTimeFormat("en-AU", { timeZone: ZONE, hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short" }).format(new Date(current.checkedAt));
    $("channelsAsOf").textContent = "PUBLIC SNAPSHOT · " + prettyDate(current.date).toUpperCase();
    $("platformGrid").innerHTML = platforms.map((p) => {
      const r = current.ratings[p.key] || {};
      return '<a class="platform-card" href="' + validUrl(data.sourceLinks[p.key]) + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="platform-top"><div class="platform-name"><span class="platform-icon ' + p.className + '">' + p.badge + '</span>' + escapeHtml(p.name) + '</div><span class="external-caret">↗</span></div>' +
        '<div class="platform-rating"><strong>' + (Number.isFinite(Number(r.rating)) ? Number(r.rating).toFixed(1) : "—") + '</strong><span>/ 5 STARS</span></div>' +
        '<div class="platform-count">' + escapeHtml(r.countLabel || "Count unavailable") + '</div>' +
        '<div class="rating-track"><div class="rating-fill ' + p.className + '" style="width:' + ((Number(r.rating) || 0) * 20) + '%"></div></div></a>';
    }).join("");
    $("focusList").innerHTML = data.recommendations.map((item, index) => '<div class="focus-item"><span class="focus-index">0' + (index + 1) + '</span><div><strong>' + escapeHtml(item.title) + '</strong><p>' + escapeHtml(item.detail) + '</p></div></div>').join("");
    $("insightGrid").innerHTML = data.highlights.slice(0, 3).map(insightCard).join("");
    renderChart();
  }
  function insightCard(item) {
    const p = platforms.find((x) => x.key === item.platform);
    return '<article class="insight-card"><div class="insight-header"><span class="tone-pill ' + (item.tone === "watch" ? "watch" : "") + '">' + (item.tone === "positive" ? "✦ POSITIVE" : "↗ WATCH") + '</span><span class="insight-source">' + escapeHtml(p ? p.name : item.platform) + '</span></div><h3>' + escapeHtml(item.topic) + '</h3><p>' + escapeHtml(item.summary) + '</p><div class="insight-foot"><span>Historical · ' + escapeHtml(prettyDate(item.date, { year: undefined })) + '</span><a href="' + validUrl(item.source) + '" target="_blank" rel="noopener noreferrer">Source ↗</a></div></article>';
  }
  function renderChart() {
    const rows = records();
    if (!rows.length) return;
    const end = new Date(rows[rows.length - 1].date + "T12:00:00Z").getTime();
    const from = chartRange === "all" ? -Infinity : end - (Number(chartRange) - 1) * 86400000;
    const visible = rows.filter((r) => new Date(r.date + "T12:00:00Z").getTime() >= from);
    const svg = $("trendSvg");
    if (!visible.length) { svg.innerHTML = ""; $("chartCaption").textContent = "No verified observations in this date range."; return; }
    const W = 760, H = 260, left = 47, right = 17, top = 14, bottom = 39, innerW = W - left - right, innerH = H - top - bottom;
    const rangeMin = 60, rangeMax = 100;
    const x = (index) => visible.length === 1 ? left + innerW / 2 : left + (innerW * index / (visible.length - 1));
    const y = (value) => top + (rangeMax - value) / (rangeMax - rangeMin) * innerH;
    let markup = "";
    [60, 70, 80, 90, 100].forEach((v) => { const cy = y(v); markup += '<line class="chart-grid" x1="' + left + '" y1="' + cy + '" x2="' + (W - right) + '" y2="' + cy + '"/><text class="chart-axis-label" text-anchor="end" x="' + (left - 11) + '" y="' + (cy + 4) + '">' + v + '</text>'; });
    const series = [
      { key: "doorDash", color: "#ffc57a", convert: (r) => ratingScore(r, "doorDash") },
      { key: "uberEats", color: "#b2a4ff", convert: (r) => ratingScore(r, "uberEats") },
      { key: "google", color: "#91e9cd", convert: (r) => ratingScore(r, "google") },
      { key: "pulse", color: "#cef76b", convert: (r) => score(r) }
    ];
    series.forEach((s) => {
      const pts = visible.map((r, i) => ({ xv: x(i), val: s.convert(r), date: r.date })).filter((v) => v.val !== null);
      if (pts.length > 1) markup += '<path class="chart-series" stroke="' + s.color + '" d="' + pts.map((p, i) => (i ? "L" : "M") + p.xv.toFixed(1) + " " + y(p.val).toFixed(1)).join(" ") + '"/>';
      pts.forEach((pt) => {
        markup += '<circle class="chart-point" fill="' + s.color + '" cx="' + pt.xv.toFixed(1) + '" cy="' + y(pt.val).toFixed(1) + '" r="' + (s.key === "pulse" ? 5.5 : 4) + '"><title>' + escapeHtml(prettyDate(pt.date) + " · " + (s.key === "pulse" ? "Pulse score" : platforms.find((p) => p.key === s.key).name) + ": " + Math.round(pt.val) + "/100") + '</title></circle>';
      });
    });
    visible.forEach((v, i) => { if (visible.length <= 10 || i % Math.ceil(visible.length / 8) === 0 || i === visible.length - 1) markup += '<text class="chart-axis-label" text-anchor="middle" x="' + x(i).toFixed(1) + '" y="' + (H - 12) + '">' + escapeHtml(prettyDate(v.date, { month: "short", day: "numeric", year: undefined })) + '</text>'; });
    svg.innerHTML = markup;
    $("chartCaption").textContent = visible.length === 1 ? "One verified daily snapshot — a meaningful trend requires more observations." : visible.length + " verified daily observations · Last: " + prettyDate(visible[visible.length - 1].date) + " · Ratings may remain flat between checks.";
  }
  function renderReviews() {
    const checked = records().filter((r) => r.reviewCheck && r.reviewCheck.performed);
    const lastCheck = checked.slice(-1)[0];
    $("reviewCheckStatus").textContent = lastCheck ? prettyDate(lastCheck.date, { year: undefined }) + " · partial" : "Not yet performed";
    $("highlightCount").textContent = data.highlights.length + " selected";
    $("newCount").textContent = lastCheck && lastCheck.reviewCheck.verifiedNew !== null ? lastCheck.reviewCheck.verifiedNew + " verified (" + prettyDate(lastCheck.date, { year: undefined }) + ")" : "Not assessed";
    const shown = data.highlights.filter((h) => feedbackFilter === "all" || h.tone === feedbackFilter);
    $("feedbackGrid").innerHTML = shown.map((h) => {
      const p = platforms.find((x) => x.key === h.platform);
      return '<article class="feedback-card"><div class="feedback-card-top"><span class="platform-tag">' + escapeHtml(p ? p.name : h.platform) + ' · ' + escapeHtml(h.author || "Public reviewer") + '</span><span class="old-tag">' + (h.isNew ? "NEW" : "HISTORICAL") + '</span></div><div><span class="tone-pill ' + (h.tone === "watch" ? "watch" : "") + '">' + (h.tone === "positive" ? "✦ PRAISE" : "↗ OPPORTUNITY") + '</span></div><h3>' + escapeHtml(h.topic) + '</h3><p>' + escapeHtml(h.summary) + '</p><div class="feedback-card-bottom"><span>Published ' + escapeHtml(prettyDate(h.date)) + '</span><a target="_blank" rel="noopener noreferrer" href="' + validUrl(h.source) + '">View source ↗</a></div></article>';
    }).join("") || '<p class="journal-empty">Nothing in this filter yet.</p>';
  }
  function checklistDay() {
    const all = readJSON("checklists", {});
    return Array.isArray(all[localDate()]) ? all[localDate()] : [];
  }
  function renderChecklist() {
    const done = checklistDay();
    $("quickChecklist").innerHTML = tasks.map((name, i) => '<label class="task"><input type="checkbox" data-task="' + i + '" ' + (done.includes(i) ? "checked" : "") + '><span>' + escapeHtml(name) + '</span></label>').join("");
    const n = done.length;
    $("completionChip").textContent = n + "/" + tasks.length;
    $("checkProgressText").textContent = n === tasks.length ? "Ready to lead" : "Today's progress";
    $("checkPercent").textContent = Math.round(n / tasks.length * 100) + "%";
    $("checkFill").style.width = (n / tasks.length * 100) + "%";
    $("quickChecklist").querySelectorAll("input").forEach((input) => input.addEventListener("change", function () {
      const all = readJSON("checklists", {});
      const date = localDate(), current = new Set(Array.isArray(all[date]) ? all[date] : []);
      const id = Number(input.dataset.task);
      if (input.checked) current.add(id); else current.delete(id);
      all[date] = Array.from(current).sort();
      if (!saveJSON("checklists", all)) toast("Browser storage is unavailable.");
      renderChecklist();
    }));
  }
  function allJournal() { return readJSON("journal", {}); }
  function selectedScore() {
    if (!metrics.every((m) => Number.isInteger(journalDraft.metrics[m.key]) && journalDraft.metrics[m.key] >= 1 && journalDraft.metrics[m.key] <= 5)) return null;
    return Math.round(metrics.reduce((sum, m) => sum + journalDraft.metrics[m.key], 0) / (metrics.length * 5) * 100);
  }
  function loadJournalDate(date) {
    journalDate = date;
    $("journalDate").value = date;
    const saved = allJournal()[date] || {};
    journalDraft = { metrics: Object.assign({}, saved.metrics || {}), notes: saved.notes || "" };
    $("journalNotes").value = journalDraft.notes;
    $("saveStatus").textContent = "";
    renderMetrics();
    renderJournalHistory();
  }
  function renderMetrics() {
    $("metricControls").innerHTML = metrics.map((m) => {
      const val = journalDraft.metrics[m.key];
      return '<div class="metric-row"><div><strong>' + escapeHtml(m.name) + '</strong><small>' + escapeHtml(m.hint) + '</small></div><div class="metric-pills" role="group" aria-label="' + escapeHtml(m.name) + '">' + [1, 2, 3, 4, 5].map((i) => '<button type="button" data-metric="' + m.key + '" data-value="' + i + '" aria-pressed="' + (val === i) + '" class="' + (val === i ? "active" : "") + '">' + i + '</button>').join("") + '</div></div>';
    }).join("");
    $("metricControls").querySelectorAll("[data-metric]").forEach((btn) => btn.addEventListener("click", function () {
      journalDraft.metrics[btn.dataset.metric] = Number(btn.dataset.value);
      renderMetrics();
    }));
    const s = selectedScore();
    $("shiftScore").textContent = s === null ? "Not rated" : s + " / 100";
  }
  function renderJournalHistory() {
    const entries = Object.entries(allJournal()).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 12);
    $("journalHistory").innerHTML = entries.length ? entries.map(([date, item]) => {
      const nums = metrics.map((m) => Number(item.metrics && item.metrics[m.key]));
      const s = nums.every((v) => Number.isInteger(v) && v >= 1 && v <= 5) ? Math.round(nums.reduce((a, b) => a + b, 0) / 20 * 100) : null;
      return '<button type="button" class="journal-entry" data-journal-date="' + escapeHtml(date) + '"><span><strong>' + escapeHtml(prettyDate(date)) + '</strong><small>' + (item.notes ? "Shift notes saved" : "Scorecard only") + '</small></span><b>' + (s === null ? "—" : s) + '</b></button>';
    }).join("") : '<div class="journal-empty">No saved shifts yet. Start by rating one shift and recording one thing you learned.</div>';
    $("journalHistory").querySelectorAll("[data-journal-date]").forEach((btn) => btn.addEventListener("click", () => loadJournalDate(btn.dataset.journalDate)));
  }
  function saveJournal() {
    journalDraft.notes = $("journalNotes").value.trim();
    if (!journalDraft.notes && !Object.keys(journalDraft.metrics).length) { $("saveStatus").textContent = "Add a note or rate a metric first."; return; }
    const all = allJournal();
    all[journalDate] = { metrics: journalDraft.metrics, notes: journalDraft.notes, updatedAt: new Date().toISOString() };
    const success = saveJSON("journal", all);
    $("saveStatus").textContent = success ? "✓ Saved locally for " + prettyDate(journalDate) + "." : "Unable to save. Browser storage may be blocked.";
    if (success) toast("Shift log saved in this browser.");
    renderJournalHistory();
  }
  function exportJournal() {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), timezone: ZONE, journal: allJournal(), checklists: readJSON("checklists", {}) }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url; a.download = "arme-space-private-backup-" + localDate() + ".json"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast("Private backup exported.");
  }
  function renderMethod() {
    const rows = records().slice().reverse();
    $("snapshotRows").innerHTML = rows.map((row) => '<tr><td>' + escapeHtml(prettyDate(row.date)) + '</td>' + platforms.map((p) => '<td>' + escapeHtml(Number(row.ratings[p.key].rating).toFixed(1)) + '<br><span style="color:#8298a2;font-size:10px">' + escapeHtml(row.ratings[p.key].countLabel) + '</span></td>').join("") + '<td><strong>' + score(row) + '</strong></td><td>' + escapeHtml(row.reviewCheck && row.reviewCheck.performed ? "Partial review check" : "Ratings only") + '</td></tr>').join("");
  }
  function wireControls() {
    window.addEventListener("hashchange", nav);
    document.querySelectorAll("[data-range]").forEach((btn) => btn.addEventListener("click", function () {
      chartRange = btn.dataset.range;
      document.querySelectorAll("[data-range]").forEach((b) => b.classList.toggle("selected", b === btn));
      renderChart();
    }));
    document.querySelectorAll("[data-filter]").forEach((btn) => btn.addEventListener("click", function () {
      feedbackFilter = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("selected", b === btn));
      if (data) renderReviews();
    }));
    $("journalDate").addEventListener("change", function () {
      const d = $("journalDate").value;
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) loadJournalDate(d);
    });
    $("saveJournal").addEventListener("click", saveJournal);
    $("exportJournal").addEventListener("click", exportJournal);
  }
  async function start() {
    clock(); wireControls(); nav();
    journalDate = localDate(); loadJournalDate(journalDate); renderChecklist();
    try {
      const response = await fetch("./data/reviews.json?v=1", { cache: "no-store" });
      if (!response.ok) throw new Error("Review data unavailable: HTTP " + response.status);
      data = await response.json();
      if (!Array.isArray(data.snapshots) || !data.snapshots.length) throw new Error("No verified rating snapshots");
      renderOverview(); renderReviews(); renderMethod();
    } catch (err) {
      $("scoreHeadline").textContent = "Data unavailable";
      $("scoreAsOf").textContent = "Could not load public rating snapshots.";
      $("chartCaption").textContent = "Check your connection or the published data file.";
      $("platformGrid").innerHTML = '<div class="journal-empty">Public rating snapshots could not load.</div>';
      $("reviewCheckStatus").textContent = "Unavailable";
      console.error(err);
    }
  }
  start();
})();
