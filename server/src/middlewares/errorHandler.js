/*--  Обработчик ошибок  --*/

export default function (err, req, res, next) {
  res.status( 500 ).send( 'Internal server error!' );
}