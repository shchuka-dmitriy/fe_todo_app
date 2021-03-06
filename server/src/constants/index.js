export const NAME_PATTERN = /^[A-Z][a-z]{0,63}$/;
export const LOGIN_PATTERN = /^(?!.*?[ \\/\[\]:;|=,+*?<>]).{6,16}$/;
export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?^\-]{8,60}$/;

/*для Permissions:*/

/*@typedef {Symbol} ActionTyp - прописываем свой тип*/


/**
 * @typedef {String} RoleType
 */

/**
 * @readonly
 * @enum {RoleType}
 */
export const ROLE = Object.freeze( {
                                     USER: 'USER',
                                     ADMIN: 'ADMIN',
                                     MODERATOR: 'MODERATOR'
                                   } );


/**
 * @typedef {Symbol} ActionType
 */

/**
 * @readonly
 * @enum {ActionType}
 */
export const ACTION = Object.freeze( {               /*Object.freeze - ?????*/
                                       CREATE: Symbol( 'CREATE' ),
                                       READ: Symbol( 'READ' ),
                                       UPDATE: Symbol( 'UPDATE' ),
                                       DELETE: Symbol( 'DELETE' ),
                                     } );

/**
 * @typedef {Symbol} EntityType
 */

/**
 * @readonly
 * @enum {EntityType}
 */
export const ENTITY = Object.freeze( {
                                       USER: Symbol( 'USER' ),
                                       TASK: Symbol( 'TASK' ),
                                     } );

