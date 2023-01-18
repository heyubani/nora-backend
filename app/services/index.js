/* eslint-disable */
import db from '../db/setup/connection';
import query from '../query';

export const addBeads = async (d) => {
  const payload = [
    d.categories,
    d.name,
    d.color,
    d.status,
    d.price,
    d.image_url,
    d.quantity,
    d.description,
  ];
  return db.any(query.addBeads, payload);
};

export const fetchBeads = async () => db.any(query.getAllBeads);

export const getBeadById = (id) => db.one(query.getBeadById, [id]);
export const getBeadByName = (name) => db.any(query.getBeadByName, `%${name}%`);
export const updateBeadAvailableQty = (id, quantity) => {
  const payload = [id, quantity]
  return db.any(query.updateBeadAvailableQty, payload)
};
export const deleteBead = (id) => db.any(query.deleteBead, [id]);

export const createBeadOrder = (d) => {
  const payload = [
    d.name,
    d.quantity,
    d.total_price,
    d.is_delivered,
    d.cancelled_order,
    d.client_address,
  ];
  return db.any(query.createOrder, payload);
};

export const getAllBeadsOrder = async () => db.any(query.getAllBeadsOrder);
export const getBeadOrderById = (id) => db.any(query.getBeadOrderById, [id]);
export const deleteOrder = (id) => db.any(query.deleteBeadOrderById, [id]);
export const updateOrderQty = ([id, quantity]) => {
 return db.any(query.updateOrderQty, [id, quantity])
};
