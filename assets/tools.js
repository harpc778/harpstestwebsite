/* Small helpers shared by the /seo-aeo-tools pages. Everything runs locally. */
window.HT = (function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function flash(btn, text) {
    if (!btn) return;
    var original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = text;
    btn.classList.add('done');
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = original; btn.classList.remove('done'); }, 1600);
  }

  function copyText(text, btn) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      flash(btn, 'Copied');
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { flash(btn, 'Copied'); }, fallback);
    } else {
      fallback();
    }
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function isAbsoluteUrl(u) {
    try {
      var p = new URL(u);
      return p.protocol === 'http:' || p.protocol === 'https:';
    } catch (e) { return false; }
  }

  // Parses simple CSV or TSV lines, honouring double quoted fields.
  function parseDelimited(text) {
    var rows = [];
    text.split(/\r?\n/).forEach(function (line, i) {
      if (!line.trim()) return;
      var delim = line.indexOf('\t') !== -1 ? '\t' : ',';
      var cells = [], cur = '', q = false;
      for (var j = 0; j < line.length; j++) {
        var ch = line[j];
        if (q) {
          if (ch === '"' && line[j + 1] === '"') { cur += '"'; j++; }
          else if (ch === '"') q = false;
          else cur += ch;
        } else if (ch === '"') q = true;
        else if (ch === delim) { cells.push(cur); cur = ''; }
        else cur += ch;
      }
      cells.push(cur);
      rows.push({ line: i + 1, cells: cells.map(function (c) { return c.trim(); }), raw: line });
    });
    return rows;
  }

  function csvCell(v) {
    v = String(v == null ? '' : v);
    return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }

  // Tab and segmented control helper: buttons with data-value inside a container.
  function segmented(container, onChange) {
    var buttons = $$('button[data-value]', container);
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        onChange(b.dataset.value);
      });
    });
    return {
      set: function (value) {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o.dataset.value === value ? 'true' : 'false'); });
        onChange(value);
      },
      get: function () {
        var on = buttons.filter(function (o) { return o.getAttribute('aria-pressed') === 'true'; })[0];
        return on ? on.dataset.value : null;
      }
    };
  }

  function resultItem(level, html, lineSrc) {
    var labels = { pass: 'Pass', warn: 'Warning', error: 'Error', info: 'Note' };
    return '<li class="' + level + '"><span class="tag">' + labels[level] + '</span><span>' + html +
      (lineSrc != null ? '<span class="line-src">' + escapeHtml(lineSrc) + '</span>' : '') + '</span></li>';
  }

  return {
    $: $, $$: $$, escapeHtml: escapeHtml, flash: flash, copyText: copyText, download: download,
    isAbsoluteUrl: isAbsoluteUrl, parseDelimited: parseDelimited, csvCell: csvCell,
    segmented: segmented, resultItem: resultItem
  };
})();
