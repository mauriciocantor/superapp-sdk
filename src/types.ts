import { SuperAppErrorCode } from './errors';

// ── Callbacks base ────────────────────────────────────────
export interface SuperAppCallbacks<T = void> {
  success?: (res: T) => void;
  fail?: (err: SuperAppFailResult) => void;
  complete?: (res: T | SuperAppFailResult) => void;
}

export interface SuperAppFailResult {
  error: SuperAppErrorCode;
  errorMessage: string;
}

// ── Auth ─────────────────────────────────────────────────
export type AuthScope = 'auth_user' | 'auth_base';

export interface GetAuthCodeOptions extends SuperAppCallbacks<GetAuthCodeResult> {
  scopes: AuthScope[];
}

export interface GetAuthCodeResult {
  authCode: string;
  userId: string;
}

export interface GetOpenUserInfoOptions extends SuperAppCallbacks<UserInfo> {}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: string;
}

// ── UI ───────────────────────────────────────────────────
export type ToastType = 'success' | 'fail' | 'exception' | 'none';

export interface ShowToastOptions extends SuperAppCallbacks {
  content: string;
  type?: ToastType;
  duration?: number;
}

export interface AlertOptions extends SuperAppCallbacks {
  title: string;
  content: string;
  buttonText?: string;
}

export interface ConfirmOptions extends SuperAppCallbacks<ConfirmResult> {
  title: string;
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface ConfirmResult {
  confirmed: boolean;
}

// ── Pagos ────────────────────────────────────────────────
export interface TradePayOptions extends SuperAppCallbacks<TradePayResult> {
  amount: number;
  currency: string;
  description?: string;
  orderId?: string;
}

export interface TradePayResult {
  success: boolean;
  transaction_id: string;
  amount: number;
  currency: string;
}

// ── Location ─────────────────────────────────────────────
export type LocationType = 'wgs84' | 'gcj02';

export interface GetLocationOptions extends SuperAppCallbacks<LocationResult> {
  type?: LocationType;
}

export interface LocationResult {
  lat: number;
  lng: number;
  accuracy: number;
  altitude?: number;
  city?: string;
}

// ── Cámara ───────────────────────────────────────────────
export type ImageSourceType = 'camera' | 'album';

export interface ChooseImageOptions extends SuperAppCallbacks<ChooseImageResult> {
  count?: number;
  sourceType?: ImageSourceType[];
}

export interface ChooseImageResult {
  success: boolean;
  base64: string;
  name: string;
  size: number;
}

// ── Storage ──────────────────────────────────────────────
export interface SetStorageOptions extends SuperAppCallbacks {
  key: string;
  data: string;
}

export interface GetStorageOptions extends SuperAppCallbacks<GetStorageResult> {
  key: string;
}

export interface GetStorageResult {
  data: string | null;
}

export interface RemoveStorageOptions extends SuperAppCallbacks {
  key: string;
}

// ── App Info ─────────────────────────────────────────────
export interface SystemInfo {
  id: string;
  name: string;
  host_version: string;
}

export interface GetSystemInfoOptions extends SuperAppCallbacks<SystemInfo> {}

// ── Eventos ──────────────────────────────────────────────
export type SuperAppEvent =
  | 'ready'
  | 'payment_result'
  | 'location_change'
  | 'app_show'
  | 'app_hide'
  | string;

export type EventCallback<T = any> = (data: T) => void;

// ── SDK principal ─────────────────────────────────────────
export interface SuperAppSDK {
  // Lifecycle
  ready(callback: () => void): void;

  // Eventos
  on(event: SuperAppEvent, callback: EventCallback): void;
  off(event: SuperAppEvent, callback: EventCallback): void;

  // Auth
  getAuthCode(options: GetAuthCodeOptions): void;
  getOpenUserInfo(options: GetOpenUserInfoOptions): void;

  // UI
  showToast(options: ShowToastOptions): void;
  alert(options: AlertOptions): void;
  confirm(options: ConfirmOptions): void;

  // Pagos
  tradePay(options: TradePayOptions): void;

  // Location
  getLocation(options: GetLocationOptions): void;

  // Camera
  chooseImage(options: ChooseImageOptions): void;

  // Storage
  setStorage(options: SetStorageOptions): void;
  getStorage(options: GetStorageOptions): void;
  removeStorage(options: RemoveStorageOptions): void;

  // App Info
  getAppIdSync(): string;
  getSystemInfo(options: GetSystemInfoOptions): void;
}