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

/*
 /**
 *
 * @param {EntityType} entity
 * @returns {function(ActionType): function(...[*]=)}
 */

/**
 *
 * @param {Array<EntityType>} entities
 * @returns {function(*): function(...[*]=)}
 */
export default (entities) => {                          /*чтобы тут замкнуть ENTITY.USER (вызывает в src/routes/user.router.js и task.router.js). Основная суть проверки: можно ли сущности(entity) создать действие(action)*/
  return (action) => {                                /*тут вызвали с параметром ACTION.CREATE (или READ, DELETE ...)*/
    return (req, res, next) => {                      /*и тут теперь доступны параметры и из ENTITY.USER и из ACTION.CREATE (или READ, DELETE ...). Или также используем для Task, тоесть это универсальная проверка. Ф-ция в ф-ции в ф-ции для того чтобы в последней были лексические окружения из предыдущих ф-ций*/
      try {
        next( new appErrors.ForbiddenError() );
      } catch (e) {
        next( e );
      }
    };
  };
}