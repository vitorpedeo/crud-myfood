const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const foods = await connection("foods")
      .join("sellers", "sellers.id", "=", "foods.seller_id")
      .select([
        "foods.*",
        "sellers.name",
        "sellers.whatsapp",
        "sellers.address",
        "sellers.city",
        "sellers.uf",
      ]);

    return res.json(foods);
  },

  async create(req, res) {
    const { title, description, price } = req.body;
    const seller_id = req.headers.authorization;

    try {
      const [id] = await connection("foods").insert({
        title,
        description,
        price,
        seller_id,
      });

      return res.status(200).json({ id });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const seller_id = req.headers.authorization;

    const food = await connection("foods")
      .where("id", id)
      .select("seller_id")
      .first();

      if (food.seller_id !== seller_id) {
        return res.status(401).json({ message: "Not Allowed" });
      }

      await connection("foods").where("id", id).update({
        title,
        description,
        price
      });

      return res.status(200).send();
  },

  async delete(req, res) {
    const { id } = req.params;
    const seller_id = req.headers.authorization;

    const food = await connection("foods")
      .where("id", id)
      .select("seller_id")
      .first();

    if (food.seller_id != seller_id) {
      return res.status(401).json({ message: "Not Allowed" });
    }

    await connection("foods").where("id", id).del();

    return res.status(200).send();
  },
};
