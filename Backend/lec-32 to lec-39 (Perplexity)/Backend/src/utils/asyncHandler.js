/**
 * @description A wrapper function to handle asynchronous Express routes.
 * It replaces the need for continuous try-catch blocks in controllers.
 * @param {Function} requestHandler - The async function to be wrapped.
 * @returns {Function} - A function that catches errors and passes them to the next middleware.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };
