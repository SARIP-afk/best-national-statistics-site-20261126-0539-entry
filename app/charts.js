// Canvas charts for Nusantara Stats. No libraries: every chart is drawn with
// the 2D canvas API from the site's own data, so the site works offline.

export function drawLineChart(canvas, series, opts = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  // The height attribute is the intended display height; pin it in CSS so the
  // canvas keeps its aspect ratio instead of stretching to its 300px default.
  const h = Number(canvas.getAttribute("height")) || 260;
  canvas.style.height = h + "px";
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const padL = 56, padR = 14, padT = 14, padB = 30;
  const values = series.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (opts.zeroBaseline !== false) min = Math.min(min, 0);
  const span = max - min || 1;
  min -= span * 0.08;
  max += span * 0.08;
  const x = (i) => padL + ((w - padL - padR) * i) / (series.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);

  // Gridlines + y labels
  ctx.font = "11px system-ui, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(w - padR, yy);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(formatTick(v, opts.format), padL - 8, yy + 4);
  }

  // Area fill
  const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
  grad.addColorStop(0, (opts.color || "#0e7490") + "33");
  grad.addColorStop(1, (opts.color || "#0e7490") + "00");
  ctx.beginPath();
  ctx.moveTo(x(0), y(series[0].value));
  series.forEach((p, i) => ctx.lineTo(x(i), y(p.value)));
  ctx.lineTo(x(series.length - 1), h - padB);
  ctx.lineTo(x(0), h - padB);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  series.forEach((p, i) => (i === 0 ? ctx.moveTo(x(i), y(p.value)) : ctx.lineTo(x(i), y(p.value))));
  ctx.strokeStyle = opts.color || "#0e7490";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Points + labels
  ctx.fillStyle = opts.color || "#0e7490";
  series.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(p.value), 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x(i), y(p.value), 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = opts.color || "#0e7490";
  });

  // X labels
  ctx.fillStyle = "#64748b";
  ctx.textAlign = "center";
  series.forEach((p, i) => {
    if (i % 2 === 0 || i === series.length - 1) ctx.fillText(String(p.year), x(i), h - 10);
  });

  // Last value callout
  const last = series[series.length - 1];
  ctx.textAlign = "right";
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillStyle = "#0f172a";
  ctx.fillText(`${formatTick(last.value, opts.format)} (${last.year})`, w - padR, padT + 12);
}

export function drawBarChart(canvas, series, opts = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  // The height attribute is the intended display height; pin it in CSS so the
  // canvas keeps its aspect ratio instead of stretching to its 300px default.
  const h = Number(canvas.getAttribute("height")) || 260;
  canvas.style.height = h + "px";
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const padL = 56, padR = 14, padT = 14, padB = 30;
  const values = series.map((p) => p.value);
  const max = Math.max(...values, 0) * 1.1;
  const min = Math.min(...values, 0);
  const bw = (w - padL - padR) / series.length;
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  const zeroY = y(0);

  ctx.font = "11px system-ui, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.strokeStyle = "#e2e8f0";
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(w - padR, yy);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(formatTick(v, opts.format), padL - 8, yy + 4);
  }

  series.forEach((p, i) => {
    const bx = padL + i * bw + bw * 0.18;
    const bwid = bw * 0.64;
    const top = y(Math.max(p.value, 0));
    const bottom = p.value >= 0 ? zeroY : y(p.value);
    ctx.fillStyle = p.value < 0 ? "#dc2626" : opts.color || "#0e7490";
    ctx.beginPath();
    ctx.roundRect(bx, Math.min(top, bottom), bwid, Math.abs(bottom - top) || 1, [4, 4, 0, 0]);
    ctx.fill();
  });

  ctx.fillStyle = "#64748b";
  ctx.textAlign = "center";
  series.forEach((p, i) => {
    if (i % 2 === 0 || i === series.length - 1) ctx.fillText(String(p.year), padL + i * bw + bw / 2, h - 10);
  });
}

export function drawHBarChart(canvas, items, opts = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  // The height attribute is the intended display height; pin it in CSS so the
  // canvas keeps its aspect ratio instead of stretching to its 300px default.
  const h = Number(canvas.getAttribute("height")) || 260;
  canvas.style.height = h + "px";
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const padL = 150, padR = 64, padT = 8, padB = 8;
  const max = Math.max(...items.map((p) => p.value)) * 1.08;
  const rowH = (h - padT - padB) / items.length;
  ctx.font = "12px system-ui, sans-serif";
  items.forEach((p, i) => {
    const cy = padT + i * rowH + rowH / 2;
    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "right";
    ctx.fillText(p.name, padL - 10, cy + 4);
    const bw = ((w - padL - padR) * p.value) / max;
    ctx.fillStyle = opts.color || "#0e7490";
    ctx.beginPath();
    ctx.roundRect(padL, cy - 9, Math.max(bw, 2), 18, [0, 4, 4, 0]);
    ctx.fill();
    ctx.fillStyle = "#334155";
    ctx.textAlign = "left";
    ctx.fillText(formatTick(p.value, opts.format), padL + bw + 8, cy + 4);
  });
}

function formatTick(v, format) {
  if (format === "percent") return `${v.toFixed(1)}%`;
  if (format === "usd-bn") return `$${Math.round(v)}bn`;
  if (format === "millions") return `${Math.round(v)}m`;
  if (Math.abs(v) >= 1000) return v.toLocaleString("en-US");
  return String(Math.round(v * 10) / 10);
}
