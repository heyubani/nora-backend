const Joi = require('joi').extend(require('@joi/date'));

const addBeads = Joi.object().keys({
  category: Joi.string().required(),
  name: Joi.string().required(),
  color: Joi.string().optional(),
  price: Joi.number().required(),
  image_url: Joi.string().required(),
  quantity: Joi.number().required(),
  description: Joi.string().optional(),
});

const createBeadOrder = Joi.object().keys({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  total_price: Joi.number().required(),
  is_delivered: Joi.boolean().required(),
  cancelled_order: Joi.boolean().required(),
  client_address: Joi.string().required(),
});

const beadId = Joi.object().keys({
  bead_id: Joi.string().required(),
});

const orderId = Joi.object().keys({
  order_id: Joi.string().required(),
});

const editQty = Joi.object().keys({
  quantity: Joi.number().required(),
});

export default {
  addBeads,
  beadId,
  orderId,
  createBeadOrder,
  editQty,
};
