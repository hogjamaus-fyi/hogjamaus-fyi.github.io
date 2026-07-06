/* Apply saved language before Google Translate loads */
try {
  var _lang = localStorage.getItem('preferredLang');
  if (_lang && _lang !== 'en') {
    var _v = '/en/' + _lang;
    document.cookie = 'googtrans=' + _v + '; path=/';
    document.cookie = 'googtrans=' + _v + '; path=/; domain=' + location.hostname;
  }
} catch (e) {}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false
  }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', function () {
  var yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  var select = document.getElementById('lang-select');
  try {
    var saved = localStorage.getItem('preferredLang') || 'en';
    if (select) select.value = saved;
  } catch (e) {}

  if (select) {
    select.addEventListener('change', function () {
      var lang = this.value;
      try { localStorage.setItem('preferredLang', lang); } catch (e) {}
      if (lang === 'en') {
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'googtrans=; path=/; domain=' + location.hostname + '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      } else {
        var v = '/en/' + lang;
        document.cookie = 'googtrans=' + v + '; path=/';
        document.cookie = 'googtrans=' + v + '; path=/; domain=' + location.hostname;
      }
      location.reload();
    });
  }

  var copyBtn = document.getElementById('share-copy-link');
  var copyStatus = document.getElementById('share-copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = window.location.href;
      var origText = copyBtn.textContent;
      function onCopied() {
        copyBtn.textContent = '✅ Copied!';
        if (copyStatus) copyStatus.textContent = 'Link copied to clipboard.';
        setTimeout(function () {
          copyBtn.textContent = origText;
          if (copyStatus) copyStatus.textContent = '';
        }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(onCopied).catch(function () {
          fallbackCopy(url, onCopied);
        });
      } else {
        fallbackCopy(url, onCopied);
      }
    });
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (cb) cb();
  }

  var nativeBtn = document.getElementById('share-native');
  if (nativeBtn && navigator.share) {
    nativeBtn.removeAttribute('hidden');
    nativeBtn.addEventListener('click', function () {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch(function () {});
    });
  }
});
