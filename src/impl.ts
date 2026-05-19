import type { SuperAppSDK } from './types';

// Mock para desarrollo fuera del WebView
export const SuperAppSDKImpl: SuperAppSDK = {
  ready: (cb) => cb(),
  on: () => {},
  off: () => {},

  getAuthCode: (opts) => opts.success?.({
    authCode: 'mock_auth_code',
    userId: 'mock_user_id',
  }),

  getOpenUserInfo: (opts) => opts.success?.({
    id: 'mock_001',
    name: 'Usuario Demo',
    email: 'demo@superapp.com',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    role: 'user',
  }),

  showToast: (opts) => {
    console.log(`[SuperApp Mock Toast] ${opts.content}`);
    opts.success?.();
  },

  alert: (opts) => {
    console.log(`[SuperApp Mock Alert] ${opts.title}: ${opts.content}`);
    opts.success?.();
  },

  confirm: (opts) => {
    const confirmed = window.confirm(`${opts.title}\n\n${opts.content}`);
    opts.success?.({ confirmed });
  },

  tradePay: (opts) => {
    const confirmed = window.confirm(
      `[Mock Pago] ${opts.description || ''}\nMonto: ${opts.currency} ${opts.amount}`
    );
    if (confirmed) {
      opts.success?.({
        success: true,
        transaction_id: `mock_txn_${Date.now()}`,
        amount: opts.amount,
        currency: opts.currency,
      });
    } else {
      opts.fail?.({ error: 10002, errorMessage: 'Usuario canceló' });
    }
    opts.complete?.({ confirmed } as any);
  },

  getLocation: (opts) => opts.success?.({
    lat: 4.7110,
    lng: -74.0721,
    accuracy: 10,
    city: 'Bogotá (mock)',
  }),

  chooseImage: (opts) => opts.fail?.({
    error: 10006,
    errorMessage: 'No disponible en modo desarrollo',
  }),

  setStorage: (opts) => {
    localStorage.setItem(`superapp:${opts.key}`, opts.data);
    opts.success?.();
  },

  getStorage: (opts) => {
    const data = localStorage.getItem(`superapp:${opts.key}`) ?? null;
    opts.success?.({ data });
  },

  removeStorage: (opts) => {
    localStorage.removeItem(`superapp:${opts.key}`);
    opts.success?.();
  },

  getAppIdSync: () => 'mock_app_id',

  getSystemInfo: (opts) => opts.success?.({
    id: 'mock_app_id',
    name: 'Mock App',
    host_version: '1.0.0',
  }),
};