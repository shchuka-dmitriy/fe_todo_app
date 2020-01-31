import ApplicationError from './ApplicationError.js';

class MethodNotAllowedError extends ApplicationError {
  constructor (method = 'method', requestURI = 'Request-URI') {
    super( `The ${method} not allowed for the resource identified by the ${requestURI}.`, 405 );
  }
}

export default MethodNotAllowedError;