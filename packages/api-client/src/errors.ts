export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public errors?: Record<string, string[]>;
  public responseData?: unknown;

  constructor(
    message: string,
    options?: {
      status?: number;
      code?: string;
      errors?: Record<string, string[]>;
      responseData?: unknown;
    }
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.code = options?.code;
    this.errors = options?.errors;
    this.responseData = options?.responseData;

    if (typeof (Error as unknown as { captureStackTrace?: (target: object, constructorOpt?: Function) => void }).captureStackTrace === 'function') {
      (Error as unknown as { captureStackTrace: (target: object, constructorOpt?: Function) => void }).captureStackTrace(this, ApiError);
    }
  }
}
