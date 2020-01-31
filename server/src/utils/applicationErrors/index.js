import fs   from 'fs';
import path from 'path';

const basename = path.basename( __filename );

const errors = {};

fs
  .readdirSync( __dirname )
  .filter( file => {
    return (file.indexOf( '.' ) !== 0) && (file !== basename) && (file.slice( -3 ) === '.js');
  } )
  .forEach( async file => {
    const errorClass = (await (import (path.join( __dirname, file )))).default;
    errors[errorClass.name] = errorClass;
  } );

export default errors;