// 'use strict';
//
// module.exports = (sequelize, DataTypes) => {
//
//   const CreditCard = sequelize.define( 'CreditCard'/*первыые параметр - название таблицы*/, {
//     number: {   /*второй параметр - поля (атрибуты модели)*/
//       type: DataTypes.STRING( 16 ),
//       allowNull: false,
//       validate: {
//         isCreditCard: true
//       }
//     },
//     cvc: DataTypes.STRING( 3 ),
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{3}$/,
//     },
//     expiry: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         isAfter: new Date(),
//       }
//     },
//     balance: {
//       type: DataTypes.DECIMAL(20, 2),
//       allowNull: false
//     }
//   }, {    /*это третий параматр - настройки*/
//                                          timestamps: false,       /*чтобы на создавал поля createdAt и updatedAt*/
//                                          schema: 'sandbox',
//                                          tableName: 'creditcards'  /*чтоб имя таблицы искал с маленькой буквы*/
//                                        } );
//
//   return CreditCard;
// };