const mongoose = require('mongoose');

// Serving Schema
const ordersSchema = mongoose.Schema({
  id_phoneNumber: { type: Number, required: true },
  orders: [
    {
      name: { type: String, required: true },
      salads: {
        lettuce: { type: Object, required: true },
        tomato: { type: Object, required: true },
        cucumber: { type: Object, required: true },
        pickle: { type: Object, required: true },
        onion: { type: Object, required: true },
        friedOnion: { type: Object, required: true },
      },
      sauces: {
        garlic: { type: Object, required: true },
        garlicHoney: { type: Object, required: true },
        plums: { type: Object, required: true },
        sweetChilli: { type: Object, required: true },
      },
      breads: {
        burgerBun: { type: Object, required: true },
        fingerBun: { type: Object, required: true },
        baggt: { type: Object, required: true },
        plate: { type: Object, required: true },
      },
      extras: {
        onion_rings: { type: Object, required: true },
        mashed_potatoes: { type: Object, required: true },
        Fries: { type: Object, required: true },
        sweet_potato_chips: { type: Object, required: true },
      },
      mainDishes: {
        shnitzel: { type: Object, required: true },
        burger: { type: Object, required: true },
        hotDogs: { type: Object, required: true },
      },
    },
  ],
  orderTime: { type: Date, required: true },
  price: [
    {
      bread: { type: String, required: true },
      meet: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Orders = (module.exports = mongoose.model('Orders', ordersSchema));

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
