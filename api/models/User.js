/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user',
  attributes: {
    id: { type: 'number', columnName: 'ID', autoIncrement: true, },
    userName: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string', allowNull: true },
    mobileNumber: { type: 'number', allowNull: true },    
    address: { type: 'string', allowNull: true },
    lastName: { type: 'string', allowNull: true },
    otp: { type: 'number', allowNull: true },
    email: { type: 'string' },
    role_id: { type: 'number',defaultsTo:2, },
    fkPrifilePictureID: { type: 'number' },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    // DocumentData:{type:'ref', columnType: 'mediumblob'},
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

