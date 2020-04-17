const { Joi } = require("celebrate");

const sellerRegister = Joi.object().keys({
  name: Joi.string().required(),
  cnpj: Joi.string().required(),
  foodType: Joi.string().required(),
  whatsapp: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  uf: Joi.string().length(2).required(),
});

const foodCreate = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const foodDelete = Joi.object().keys({
  id: Joi.number().required(),
});

module.exports = {
  sellerRegister,
  foodCreate,
  foodDelete,
};
