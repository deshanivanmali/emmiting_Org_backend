/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'product',
  attributes: {
    id: { type: 'number', autoIncrement: true, },
    name: { type: 'string' },
    price: { type: 'string' },
    size:{type:"String"},
    type: { type: 'string' },
    salePrice: { type: 'string' },
    discount: { type: 'string' , allowNull: true},
    shortDetails: { type: 'string', allowNull: true },
    description: { type: 'string', allowNull: true },
    stock: { type: 'string', allowNull: true },
    brand: { type: 'string',defaultsTo: "Brand-1", allowNull: true },//"Brand-1"

    newPro: { type: 'boolean', defaultsTo: true, },//true
    sale: { type: 'boolean', defaultsTo: true, },///true
    // state: { type: 'string', allowNull: true },//"small"
    // category: { type: 'string', allowNull: true },//"Vegetables"

    isAmazoneOrFlipcart: { type: 'boolean', defaultsTo: false, },//true
    amazoneLink: { type: 'string', allowNull: true },
    flipCartLink: { type: 'string', allowNull: true },

    smallImg1: { type: 'number', allowNull: true },
    smallImg2: { type: 'number', allowNull: true },
    smallImg3: { type: 'number', allowNull: true },
    bigImg: { type: 'number', allowNull: false },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },

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

