const mongoose = require('mongoose');

// Serving Schema
const fullOrderSchema = mongoose.Schema({
  id_phoneNumber: { type: String, required: true },
  orders: [
    {
      name: { type: String, required: true },
      salads: { type: Object, require: true },
      sauces: { type: Object, require: true },
      breads: { type: Object, require: true },
      extras: { type: Object, require: true },
      meat: { type: Object, require: true },
      drink: { type: Object, require: true },
    },
  ],
  orderTime: { type: Date, required: true },
  price: { type: Array, require: true },
});

const OnlineOrders = (module.exports = mongoose.model(
  'online_orders',
  fullOrderSchema
));

/*          המשך של רטבים
spicyChilli: { type: Number, required: true },
barbecue: { type: Number, required: true },
mayo: { type: Number, required: true },
ketchup: { type: Number, required: true },
garlicShifka: { type: Number, required: true },
elf: { type: Number, required: true },
curry: { type: Number, required: true },
mustard: { type: Number, required: true },
vinaigrette: { type: Number, required: true },*/

/*      המשך של סלטים
rocket: { type: Number, required: true },
salsa: { type: Number, required: true },
 koleslau: { type: Number, required: true },
 eggplant: { type: Number, required: true },
 pepper: { type: Number, required: true },
 spicy: { type: Number, required: true },
 avocado: { type: Number, required: true },
 pesto: { type: Number, required: true },
 chimichurri: { type: Number, required: true },
 halapniho: { type: Number, required: true },
 dijon: { type: Number, required: true },*/

/*       המשך של תוספות
   potato: { pos: 0, prices: [0, 12, 15] },
        survivors: { pos: 0, prices: [0, 15, 20] },
        kinds_of_sausages: { pos: 0, prices: [0, 10, 18] },
        fish: { pos: 0, prices: [0, 25] },
 
 */
