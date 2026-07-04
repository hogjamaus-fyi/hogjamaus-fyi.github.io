/* Apply saved language before Google Translate loads */
try {
  var _lang = localStorage.getItem('preferredLang');
  if (_lang && _lang !== 'en') {
    var _v = '/en/' + _lang;
    document.cookie = 'googtrans=' + _v + '; path=/';
    document.cookie = 'googtrans=' + _v + '; path=/; domain=' + location.hostname;
  }
} catch (e) {}

var yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false
  }, 'google_translate_element');
}

(function () {
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
})();
