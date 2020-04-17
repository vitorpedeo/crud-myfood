const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const seller_id = req.headers.authorization;

    const foods = await connection("foods").where('seller_id', seller_id).select('*');

      return res.json(foods);
  }
};
