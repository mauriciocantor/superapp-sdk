"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SuperAppError: () => SuperAppError,
  SuperAppErrorCodes: () => SuperAppErrorCodes,
  getSuperApp: () => getSuperApp,
  isSuperAppAvailable: () => isSuperAppAvailable,
  onSuperAppReady: () => onSuperAppReady,
  waitForSuperApp: () => waitForSuperApp
});
module.exports = __toCommonJS(index_exports);

// src/errors.ts
var SuperAppErrorCodes = {
  SUCCESS: 1e4,
  PERMISSION_DENIED: 10001,
  USER_CANCELLED: 10002,
  TIMEOUT: 10003,
  INVALID_PARAMS: 10004,
  INTERNAL_ERROR: 10005,
  NOT_AVAILABLE: 10006
};
var SuperAppError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.errorMessage = message;
    this.name = "SuperAppError";
  }
};

// src/index.ts
function getSuperApp() {
  if (typeof window === "undefined") {
    throw new Error("SuperApp SDK solo est\xE1 disponible en el navegador");
  }
  if (!window.SuperApp) {
    throw new Error(
      "SuperApp SDK no est\xE1 disponible. \xBFEst\xE1s corriendo esta mini-app dentro del host de SuperApp?"
    );
  }
  return window.SuperApp;
}
function isSuperAppAvailable() {
  return typeof window !== "undefined" && !!window.SuperApp;
}
function waitForSuperApp(timeoutMs = 8e3) {
  return new Promise((resolve, reject) => {
    if (isSuperAppAvailable()) {
      resolve(getSuperApp());
      return;
    }
    const interval = setInterval(() => {
      if (isSuperAppAvailable()) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(getSuperApp());
      }
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject(new Error("SuperApp SDK timeout \u2014 no disponible despu\xE9s de " + timeoutMs + "ms"));
    }, timeoutMs);
  });
}
function onSuperAppReady(callback, timeoutMs = 8e3) {
  let cancelled = false;
  waitForSuperApp(timeoutMs).then((sdk) => {
    if (!cancelled) callback(sdk);
  }).catch(() => {
    if (!cancelled) {
      console.warn("[SuperApp SDK] No se pudo conectar al host");
    }
  });
  return () => {
    cancelled = true;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SuperAppError,
  SuperAppErrorCodes,
  getSuperApp,
  isSuperAppAvailable,
  onSuperAppReady,
  waitForSuperApp
});
//# sourceMappingURL=index.js.map