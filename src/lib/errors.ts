export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super("Too many requests. Please slow down.", "RATE_LIMITED", 429);
    this.name = "RateLimitError";
  }
}

/** Map any thrown value to a user-safe string. */
export function toUserMessage(err: unknown): string {
  if (err instanceof AppError) return err.message;
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred.";
}
