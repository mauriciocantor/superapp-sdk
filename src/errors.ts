export const SuperAppErrorCodes = {
  SUCCESS: 10000,
  PERMISSION_DENIED: 10001,
  USER_CANCELLED: 10002,
  TIMEOUT: 10003,
  INVALID_PARAMS: 10004,
  INTERNAL_ERROR: 10005,
  NOT_AVAILABLE: 10006,
} as const;

export type SuperAppErrorCode = typeof SuperAppErrorCodes[keyof typeof SuperAppErrorCodes];

export class SuperAppError extends Error {
  code: SuperAppErrorCode;
  errorMessage: string;

  constructor(code: SuperAppErrorCode, message: string) {
    super(message);
    this.code = code;
    this.errorMessage = message;
    this.name = 'SuperAppError';
  }
}