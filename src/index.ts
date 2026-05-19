import { SuperAppSDKImpl } from './impl';
import type { SuperAppSDK } from './types';

export * from './types';
export * from './errors';

// Tipos exportados para uso en mini-apps
export type {
  UserInfo,
  LocationResult,
  TradePayResult,
  ChooseImageResult,
  SystemInfo,
  SuperAppEvent,
  EventCallback,
} from './types';

/**
 * Obtiene la instancia del SDK de SuperApp.
 * Lanza un error si no está disponible (fuera del WebView del host).
 */
export function getSuperApp(): SuperAppSDK {
  if (typeof window === 'undefined') {
    throw new Error('SuperApp SDK solo está disponible en el navegador');
  }
  if (!(window as any).SuperApp) {
    throw new Error(
      'SuperApp SDK no está disponible. ¿Estás corriendo esta mini-app dentro del host de SuperApp?'
    );
  }
  return (window as any).SuperApp as SuperAppSDK;
}

/**
 * Verifica si el SDK está disponible.
 * Útil para detectar si la mini-app corre dentro del host.
 */
export function isSuperAppAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).SuperApp;
}

/**
 * Espera a que el SDK esté disponible y lo retorna.
 * Útil cuando se necesita el SDK inmediatamente al cargar.
 */
export function waitForSuperApp(timeoutMs = 8000): Promise<SuperAppSDK> {
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
      reject(new Error('SuperApp SDK timeout — no disponible después de ' + timeoutMs + 'ms'));
    }, timeoutMs);
  });
}

/**
 * Hook-style helper para usar en React con useEffect.
 * 
 * @example
 * useEffect(() => {
 *   const cleanup = onSuperAppReady((sdk) => {
 *     sdk.getOpenUserInfo({ success: setUser });
 *   });
 *   return cleanup;
 * }, []);
 */
export function onSuperAppReady(
  callback: (sdk: SuperAppSDK) => void,
  timeoutMs = 8000
): () => void {
  let cancelled = false;

  waitForSuperApp(timeoutMs)
    .then((sdk) => {
      if (!cancelled) callback(sdk);
    })
    .catch(() => {
      if (!cancelled) {
        console.warn('[SuperApp SDK] No se pudo conectar al host');
      }
    });

  return () => { cancelled = true; };
}