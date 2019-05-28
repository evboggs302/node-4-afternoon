const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    const index = user.cart.findIndex(swag => swag.id === id);

    if (index === -1) {
      const item = swag.find(swag => swag.id == id);
      user.cart.push(item);
      user.total += item.price;
    }
    res.status(200).send(user);
  },
  remove: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    const index = user.cart.findIndex(swag => swag.id == id);
    const item = swag.find(swag => swag.id == id);

    if (index !== -1) {
      user.cart.splice(index, 1);
      user.total -= item.price;
    }
    res.status(200).send(user);
  },
  checkout: (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(user);
  }
};
