/**
 * Custom API Error class that extends the built-in Error.
 * Used to create consistent, structured error responses.
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404, 500)
     * @param {string} message - Human-readable error message
     * @param {Array} errors - Optional array of validation or field errors
     */
    constructor(statusCode, message = "Something went wrong", errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;

        // Capture stack trace (V8 engines)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

export { ApiError };
