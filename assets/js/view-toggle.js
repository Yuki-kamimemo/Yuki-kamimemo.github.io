(function () {
  var STORAGE_KEY = 'preferredView';
  var BREAKPOINT = 768;

  function applyView(view) {
    document.documentElement.dataset.view = view;
    var btn = document.getElementById('viewToggle');
    if (btn) {
      btn.textContent = view === 'mobile' ? 'PC版に戻す' : 'スマホ版で見る';
    }
  }

  function updateButtonVisibility() {
    var btn = document.getElementById('viewToggle');
    if (!btn) return;
    btn.style.display = window.innerWidth <= BREAKPOINT ? '' : 'none';
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY) || 'desktop';
    applyView(saved);
    updateButtonVisibility();

    var btn = document.getElementById('viewToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.dataset.view || 'desktop';
        var next = current === 'mobile' ? 'desktop' : 'mobile';
        localStorage.setItem(STORAGE_KEY, next);
        applyView(next);
      });
    }

    window.addEventListener('resize', updateButtonVisibility);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
