const HttpStatus = {
  // Successful responses
  OK: 200,
  CREATED: 201,

  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  // Server error responses
  INTERNAL_SERVER_ERROR: 500
}

module.exports = HttpStatus;