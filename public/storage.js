/**
 * storage.js — Production window.storage implementation
 *
 * Interface:
 *   get(key)        → Promise<{ value: string | null }>
 *   set(key, value) → Promise<void>
 *
 * Backed by localStorage. Wrapped in Promises to match the async
 * interface expected by the component — allows swapping the backend
 * later (e.g. IndexedDB) without touching component code.
 *
 * Must be loaded via <script> before any component script that
 * references window.storage.
 */
(function () {
  "use strict";

  function get(key) {
    if (typeof key !== "string" || key === "") {
      return Promise.reject(new TypeError("storage.get: key must be a non-empty string"));
    }
    try {
      return Promise.resolve({ value: localStorage.getItem(key) });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function set(key, value) {
    if (typeof key !== "string" || key === "") {
      return Promise.reject(new TypeError("storage.set: key must be a non-empty string"));
    }
    try {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (e) {
      // Catches QuotaExceededError and SecurityError (private browsing restrictions)
      return Promise.reject(e);
    }
  }

  window.storage = { get, set };
}());
