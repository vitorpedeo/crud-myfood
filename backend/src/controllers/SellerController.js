const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async register(req, res) {
    const { name, cnpj, foodType, whatsapp, address, city, uf } = req.body;
    const id = crypto.randomBytes(8).toString("HEX");

    try {
      await connection("sellers").insert({
        id,
        name,
        cnpj,
        foodType,
        whatsapp,
        address,
        city,
        uf,
      });

      return res.status(200).json({ id });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async login(req, res) {
    const { id } = req.body;

    try {
      const seller = await connection("sellers")
        .where("id", id)
        .select("name")
        .first();

      if (!seller) {
        return res.status(401).json({ message: "You are not registered yet" });
      }

      return res.status(200).json(seller);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
