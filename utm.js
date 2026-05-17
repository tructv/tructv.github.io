/* =========================================================================
   utm.js — Campaign attribution for 3dSen / Geod Studio
   =========================================================================
   Captures UTM parameters from incoming URLs, persists them across page
   navigation, and appends them to outbound Steam links so Steam's UTM
   Analytics dashboard sees the campaign attribution.

   - sessionStorage only (no cookies, expires when tab closes)
   - First-party only (no third-party calls, no consent banner needed)
   - No GA, no external analytics, no tracking pixels
   ========================================================================= */

(function () {
  'use strict';

  // ---- Config ----------------------------------------------------------
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var STORAGE_KEY = 'geod_utm';
  var STEAM_HOSTS = ['store.steampowered.com', 'steamcommunity.com'];

  // ---- Capture on landing ---------------------------------------------
  function captureUTMs() {
    try {
      var params = new URLSearchParams(window.location.search);
      var captured = {};
      var hasAny = false;

      UTM_KEYS.forEach(function (key) {
        var val = params.get(key);
        if (val) {
          captured[key] = val.toLowerCase().trim();
          hasAny = true;
        }
      });

      // If this page-load had no UTMs, keep whatever's already stored.
      // If this page-load DID have UTMs, replace stored values (last touch).
      if (!hasAny) return getStoredUTMs();

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
      return captured;
    } catch (e) {
      return null;
    }
  }

  function getStoredUTMs() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  // ---- Steam link enrichment ------------------------------------------
  function isSteamLink(url) {
    if (!url) return false;
    try {
      var u = new URL(url, window.location.origin);
      return STEAM_HOSTS.indexOf(u.hostname) !== -1;
    } catch (e) {
      return false;
    }
  }

  function enrichSteamLink(url, utms) {
    if (!utms || !isSteamLink(url)) return url;

    try {
      var u = new URL(url, window.location.origin);

      // Pass every UTM parameter we have to Steam.
      // Steam's UTM Analytics reads utm_source, utm_medium, utm_campaign,
      // utm_content, and utm_term. Existing query params on the Steam URL
      // (like ?snr=) are preserved.
      UTM_KEYS.forEach(function (key) {
        if (utms[key]) {
          u.searchParams.set(key, utms[key]);
        }
      });

      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function enrichAllSteamLinks() {
    var utms = getStoredUTMs();
    if (!utms) return;

    var anchors = document.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      var href = a.getAttribute('href');
      if (isSteamLink(href) && !a.hasAttribute('data-utm-enriched')) {
        a.setAttribute('href', enrichSteamLink(href, utms));
        a.setAttribute('data-utm-enriched', '1');
      }
    }
  }

  // ---- Re-enrich after dynamic DOM changes ---------------------------
  // Catches new links inserted by client-side JS, just in case.
  function watchForNewLinks() {
    if (typeof MutationObserver !== 'function') return;
    var observer = new MutationObserver(function () {
      enrichAllSteamLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ---- Public API ------------------------------------------------------
  window.GeodUTM = {
    capture: captureUTMs,
    current: getStoredUTMs,
    enrichLinks: enrichAllSteamLinks,
    isSteamLink: isSteamLink
  };

  // ---- Initialize -----------------------------------------------------
  function init() {
    captureUTMs();
    enrichAllSteamLinks();
    watchForNewLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
