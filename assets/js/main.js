/* Hub — shared main.js
 * Marks the current nav link active based on pathname. */
(function () {
  "use strict";

  function currentFile() {
    var path = window.location.pathname || "";
    var file = path.split("/").pop();
    if (!file || file === "") return "index.html";
    return file.toLowerCase();
  }

  function markActiveNav() {
    var here = currentFile();
    var links = document.querySelectorAll(".site-nav a[href]");
    links.forEach(function (a) {
      var target = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (target === here) a.classList.add("is-active");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markActiveNav);
  } else {
    markActiveNav();
  }
})();
