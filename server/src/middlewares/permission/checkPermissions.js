import appErrors from '../../utils/applicationErrors';

/*

 actions:
 CREATE
 READ
 UPDATE
 DELETE


 objects:
 USER
 TASK


 role:
 ADMIN
 USER
 MODERATOR

 * */

/**
 *
 * @param {EntityType} entity
 * @returns {function(ActionType): function(...[*]=)}
 */
export default (entity) => {
  return (object) => {
    return (req, res, next) => {
      try {
        next( new appErrors.ForbiddenError() );
      } catch (e) {
        next( e );
      }
    };
  };
}