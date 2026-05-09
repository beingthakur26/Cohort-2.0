/**
 * Wraps an async route handler to automatically catch errors
 * and pass them to Express's next() error handler.
 * @param {Function} fn - The async route handler function.
 * @returns {Function} - A new function that catches any thrown errors.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };
