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
export {
  SuperAppError,
  SuperAppErrorCodes,
  getSuperApp,
  isSuperAppAvailable,
  onSuperAppReady,
  waitForSuperApp
};
//# sourceMappingURL=index.mjs.map