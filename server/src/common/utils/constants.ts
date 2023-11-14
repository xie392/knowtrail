export enum HttpCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    MovedPermanently = 301,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    Conflict = 409,
    Gone = 410,
    PreconditionFailed = 412,
    UnprocessableEntity = 422
}

export enum ErrorMessage {
    Ok = 'OK',
    Created = 'Created',
    Accepted = 'Accepted',
    NoContent = 'No Content',
    MovedPermanently = 'Moved Permanently',
    BadRequest = 'Bad Request',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden',
    NotFound = 'Not Found',
    MethodNotAllowed = 'Method Not Allowed',
    NotAcceptable = 'Not Acceptable',
    Conflict = 'Conflict',
    Gone = 'Gone',
    PreconditionFailed = 'Precondition Failed',
    UnprocessableEntity = 'Unprocessable Entity'
}

export const secret = 'KnowTaril'
export const port = 3000
