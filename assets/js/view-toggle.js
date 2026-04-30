(function () {
  var STORAGE_KEY = 'preferredView';
  var BREAKPOINT = 768;

  function applyView(view, btn) {
    document.documentElement.dataset.view = view;
    if (btn) {
      btn.textContent = view === 'mobile' ? 'PC版に戻す' : 'スマホ版で見る';
    }
  }

  function updateButtonVisibility(btn) {
    if (!btn) return;
    btn.style.display = window.innerWidth <= BREAKPOINT ? 'block' : 'none';
  }

  function init() {
    var btn = document.getElementById('viewToggle');
    var saved = localStorage.getItem(STORAGE_KEY) || 'desktop';
    applyView(saved, btn);
    updateButtonVisibility(btn);

    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.dataset.view || 'desktop';
        var next = current === 'mobile' ? 'desktop' : 'mobile';
        localStorage.setItem(STORAGE_KEY, next);
        applyView(next, btn);
      });
    }

    // resize は軽量処理のためデバウンスなし
    window.addEventListener('resize', function () {
      updateButtonVisibility(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
