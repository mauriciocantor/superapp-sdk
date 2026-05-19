declare const SuperAppErrorCodes: {
    readonly SUCCESS: 10000;
    readonly PERMISSION_DENIED: 10001;
    readonly USER_CANCELLED: 10002;
    readonly TIMEOUT: 10003;
    readonly INVALID_PARAMS: 10004;
    readonly INTERNAL_ERROR: 10005;
    readonly NOT_AVAILABLE: 10006;
};
type SuperAppErrorCode = typeof SuperAppErrorCodes[keyof typeof SuperAppErrorCodes];
declare class SuperAppError extends Error {
    code: SuperAppErrorCode;
    errorMessage: string;
    constructor(code: SuperAppErrorCode, message: string);
}

interface SuperAppCallbacks<T = void> {
    success?: (res: T) => void;
    fail?: (err: SuperAppFailResult) => void;
    complete?: (res: T | SuperAppFailResult) => void;
}
interface SuperAppFailResult {
    error: SuperAppErrorCode;
    errorMessage: string;
}
type AuthScope = 'auth_user' | 'auth_base';
interface GetAuthCodeOptions extends SuperAppCallbacks<GetAuthCodeResult> {
    scopes: AuthScope[];
}
interface GetAuthCodeResult {
    authCode: string;
    userId: string;
}
interface GetOpenUserInfoOptions extends SuperAppCallbacks<UserInfo> {
}
interface UserInfo {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    role: string;
}
type ToastType = 'success' | 'fail' | 'exception' | 'none';
interface ShowToastOptions extends SuperAppCallbacks {
    content: string;
    type?: ToastType;
    duration?: number;
}
interface AlertOptions extends SuperAppCallbacks {
    title: string;
    content: string;
    buttonText?: string;
}
interface ConfirmOptions extends SuperAppCallbacks<ConfirmResult> {
    title: string;
    content: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}
interface ConfirmResult {
    confirmed: boolean;
}
interface TradePayOptions extends SuperAppCallbacks<TradePayResult> {
    amount: number;
    currency: string;
    description?: string;
    orderId?: string;
}
interface TradePayResult {
    success: boolean;
    transaction_id: string;
    amount: number;
    currency: string;
}
type LocationType = 'wgs84' | 'gcj02';
interface GetLocationOptions extends SuperAppCallbacks<LocationResult> {
    type?: LocationType;
}
interface LocationResult {
    lat: number;
    lng: number;
    accuracy: number;
    altitude?: number;
    city?: string;
}
type ImageSourceType = 'camera' | 'album';
interface ChooseImageOptions extends SuperAppCallbacks<ChooseImageResult> {
    count?: number;
    sourceType?: ImageSourceType[];
}
interface ChooseImageResult {
    success: boolean;
    base64: string;
    name: string;
    size: number;
}
interface SetStorageOptions extends SuperAppCallbacks {
    key: string;
    data: string;
}
interface GetStorageOptions extends SuperAppCallbacks<GetStorageResult> {
    key: string;
}
interface GetStorageResult {
    data: string | null;
}
interface RemoveStorageOptions extends SuperAppCallbacks {
    key: string;
}
interface SystemInfo {
    id: string;
    name: string;
    host_version: string;
}
interface GetSystemInfoOptions extends SuperAppCallbacks<SystemInfo> {
}
type SuperAppEvent = 'ready' | 'payment_result' | 'location_change' | 'app_show' | 'app_hide' | string;
type EventCallback<T = any> = (data: T) => void;
interface SuperAppSDK {
    ready(callback: () => void): void;
    on(event: SuperAppEvent, callback: EventCallback): void;
    off(event: SuperAppEvent, callback: EventCallback): void;
    getAuthCode(options: GetAuthCodeOptions): void;
    getOpenUserInfo(options: GetOpenUserInfoOptions): void;
    showToast(options: ShowToastOptions): void;
    alert(options: AlertOptions): void;
    confirm(options: ConfirmOptions): void;
    tradePay(options: TradePayOptions): void;
    getLocation(options: GetLocationOptions): void;
    chooseImage(options: ChooseImageOptions): void;
    setStorage(options: SetStorageOptions): void;
    getStorage(options: GetStorageOptions): void;
    removeStorage(options: RemoveStorageOptions): void;
    getAppIdSync(): string;
    getSystemInfo(options: GetSystemInfoOptions): void;
}

/**
 * Obtiene la instancia del SDK de SuperApp.
 * Lanza un error si no está disponible (fuera del WebView del host).
 */
declare function getSuperApp(): SuperAppSDK;
/**
 * Verifica si el SDK está disponible.
 * Útil para detectar si la mini-app corre dentro del host.
 */
declare function isSuperAppAvailable(): boolean;
/**
 * Espera a que el SDK esté disponible y lo retorna.
 * Útil cuando se necesita el SDK inmediatamente al cargar.
 */
declare function waitForSuperApp(timeoutMs?: number): Promise<SuperAppSDK>;
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
declare function onSuperAppReady(callback: (sdk: SuperAppSDK) => void, timeoutMs?: number): () => void;

export { type AlertOptions, type AuthScope, type ChooseImageOptions, type ChooseImageResult, type ConfirmOptions, type ConfirmResult, type EventCallback, type GetAuthCodeOptions, type GetAuthCodeResult, type GetLocationOptions, type GetOpenUserInfoOptions, type GetStorageOptions, type GetStorageResult, type GetSystemInfoOptions, type ImageSourceType, type LocationResult, type LocationType, type RemoveStorageOptions, type SetStorageOptions, type ShowToastOptions, type SuperAppCallbacks, SuperAppError, type SuperAppErrorCode, SuperAppErrorCodes, type SuperAppEvent, type SuperAppFailResult, type SuperAppSDK, type SystemInfo, type ToastType, type TradePayOptions, type TradePayResult, type UserInfo, getSuperApp, isSuperAppAvailable, onSuperAppReady, waitForSuperApp };
