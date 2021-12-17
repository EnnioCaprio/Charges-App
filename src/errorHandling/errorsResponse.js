
exports.errorName = {
    CONFLICT: 'CONFLICT',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

exports.errorType = {
    CONFLICT: {
        message: 'Entity already exists',
        statusCode: 409
    },
    NOT_FOUND: {
        message: 'Entity does not exist',
        statusCode: 404 
    },
    UNAUTHORIZED: {
        message: 'User is not authorized',
        statusCode: 401
    },
    INTERNAL_SERVER_ERROR: {
        message: 'Could not query the results',
        statusCode: 500
    }
}