// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/calendar_service_web/src/calendar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Classe MyCalendar : Un composant de calendrier simple qui affiche les événements au clic dans la console.
 * Peut être personnalisé avec des options : events (liste d'événements), eventClass (style).
 */
class MyCalendar {
  /**
   * Constructeur de MyCalendar
   * @param {string} targetElementId - L'ID de l'élément HTML cible où le calendrier sera injecté.
   * @param {Object} options - Options pour personnaliser le calendrier et ses comportements.
   */
  constructor(targetElementId, options = {}) {
    this.targetElement = document.getElementById(targetElementId);
    this.options = options;
    this.currentDate = new Date();
    this.events = options.events || {};
    this.eventClass = options.eventClass || "event";
    this.initialize();
  }

  /**
   * Génère le calendrier pour le mois de `this.currentDate` et l'injecte dans l'élément cible du DOM.
   */
  generateCalendar() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    // Construction de la structure HTML du calendrier
    let html = `<div id="calendar-container">
                    <div id="calendar-header">
                        <button id="prevMonth">Précédent</button>
                        <h3>${firstDay.toLocaleString("default", {
      month: "long"
    })} ${firstDay.getFullYear()}</h3>
                        <button id="nextMonth">Suivant</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th><th>Di</th>
                            </tr>
                        </thead>
                        <tbody>`;
    let day = firstDay;
    while (day.getDay() !== 1) {
      day.setDate(day.getDate() - 1);
    }
    let isCurrentMonth = true;
    while (isCurrentMonth) {
      html += "<tr>";
      for (let i = 0; i < 7; i++) {
        if (day.getMonth() === this.currentDate.getMonth()) {
          const eventKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
          const hasEvent = this.events[eventKey];
          // Gestion des jours avec ou sans événement
          html += `<td ${hasEvent ? 'class="' + this.eventClass + '" data-event-key="' + eventKey + '"' : ""}>${day.getDate()}</td>`;
        } else {
          html += "<td></td>";
        }
        day.setDate(day.getDate() + 1);
      }
      html += "</tr>";
      isCurrentMonth = day.getMonth() === this.currentDate.getMonth();
    }
    html += `   </tbody>
                    </table>
                </div>`;
    this.targetElement.innerHTML = html;

    // Attache des gestionnaires d'événements pour les boutons et les jours avec des événements.
    this.attachEventListeners();
  }

  /**
   * Attache des gestionnaires d'événements pour les interactions utilisateur avec le calendrier.
   */
  attachEventListeners() {
    this.targetElement.querySelector("#prevMonth").addEventListener("click", () => this.prevMonth());
    this.targetElement.querySelector("#nextMonth").addEventListener("click", () => this.nextMonth());
    this.targetElement.querySelectorAll("." + this.eventClass).forEach(dayElement => {
      dayElement.addEventListener("click", e => this.showEvent(e.currentTarget.dataset.eventKey));
    });
  }

  /**
   * Affiche les détails de l'événement dans la console.
   * @param {string} eventKey - La clé de l'événement dans l'objet `this.events`.
   */
  showEvent(eventKey) {
    const event = this.events[eventKey];
    if (event) {
      console.log(`Événement : ${event.title}`);
      console.log(`Description : ${event.description}`);
    }
  }

  /**
   * Passe au mois suivant et régénère le calendrier.
   */
  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  /**
   * Passe au mois précédent et régénère le calendrier.
   */
  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  /**
   * Initialisation du calendrier lors de la création de l'instance.
   */
  initialize() {
    this.generateCalendar();
  }
}
var _default = exports.default = MyCalendar;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _calendar_service_web = _interopRequireDefault(require("calendar_service_web"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
document.addEventListener("DOMContentLoaded", function () {
  var myCal = new _calendar_service_web.default("monCalendrier", {
    eventClass: "green-event",
    // utilisation de la classe CSS personnalisée
    events: {
      "2023-10-31": {
        // Vous pouvez changer la date, le titre ou la description pour tester avec des événements actuels
        title: "Halloween",
        description: "Une célébration festive"
      },
      "2023-10-11": {
        // Vous pouvez changer la date, le titre ou la description pour tester avec des événements actuels
        title: "Ydays",
        description: "Projet général"
      },
      "2023-10-18": {
        title: "Ydays",
        description: "Projet général"
      },
      "2023-10-25": {
        title: "Ydays",
        description: "Projet général"
      }
    }
  });
});
},{"calendar_service_web":"node_modules/calendar_service_web/src/calendar.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61616" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map