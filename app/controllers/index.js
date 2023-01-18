/* eslint-disable */
import dayjs from 'dayjs';
import * as services from '../services';
import { successResponse, Success, Error } from '../utils/helpers/response.helpers';

/**
 * add new bead request
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns admin details.
 * @memberof BeadsController
 */
export const addBeads = async (req, res, next) => {
  try {
    const beads = await services.addBeads(req.body);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: 
    successfully created new beads in the DB addBeads.controller.index.js`);
    return successResponse(res, 'successfully added beads.', 201, beads);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * fetch all beads
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns beads details.
 * @memberof BeadsController
 */
export const fetchAllBeads = async (req, res, next) => {
  try {
    const fetchBeads = await services.fetchBeads();
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: 
    successfully fetched all beads in the DB fetchAllBeads.controller.index.js`);
    return successResponse(res, 'successfully fetched all beads.', 200, fetchBeads);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * delete bead by id
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns empty array
 * @memberof BeadsController
 */
export const deleteBeadById = async (req, res, next) => {
  try {
    const [data] = await services.getBeadById(req.params.bead_id);
    if (!data) {
      return successResponse(res, 'No bead with such id found', 404);
    }
    await services.deleteBead(req.params.bead_id);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: 
    beads successfully deleted in the DB deleteBeadById.controller.index.js`);
    return successResponse(res, 'Bead successfully deleted.', 200);
  } catch (error) {
    logger.error(error.message);
    Error('deleting bead by id failed', 500);
    return next(error);
  }
};

/**
 * bead order endpoint
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns success with request beads details
 * @memberof BeadsController
 */
export const beadOrder = async (req, res, next) => {
  try {
    const {quantity} = await services.getBeadById(req.params.bead_id);
    if (quantity && quantity > 1) {
    await services.updateBeadAvailableQty(req.params.bead_id, quantity - req.body.quantity);
    const beads = await services.createBeadOrder(req.body);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: 
      successfully created new beads in the DB addBeads.controller.index.js`);
    return successResponse(res, 'successfully placed order for beads.', 201, beads);
    }
    return successResponse(res, 'decoded that bead is out of stock.', 400);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * fetch all bead order
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns success with beads order details
 * @memberof BeadsController
 */
export const fetchAllBeadOrder = async (req, res, next) => {
  try {
    const fetchBeads = await services.getAllBeadsOrder();
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: 
      successfully fetched all beads in the DB fetchAllBeadOrder.controller.index.js`);
    return successResponse(res, 'successfully fetched all beads.', 200, fetchBeads);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * fetch single beadOrder
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns success response.
 * @memberof BeadsController
 */
export const fetchSingleBeadOrder = async (req, res, next) => {
  try {
    const order = await services.getBeadOrderById(req.params.order_id);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: successfully
     fetched single beads in the DB fetchAllBeadOrder.controller.index.js`);
    return successResponse(res, 'successfully fetched all beads.', 200, order);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * delete bead Order by id
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns success response.
 * @memberof BeadsController
 */
export const deleteBeadOrderById = async (req, res, next) => {
  try {
    const [order] = await services.getBeadOrderById(req.params.order_id);
    if (!order) {
      return successResponse(res, 'No order with such id found', 404);
    }
    await services.deleteOrder(req.params.order_id);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info:  beads successfully
     deleted bead order in the DB deleteBeadOrderById.controller.index.js`);
    return successResponse(res, 'Bead order successfully deleted.', 200);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

/**
 * update Order Quantity
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns success with beads order details.
 * @memberof BeadsController
 */
export const updateOrderQty = async (req, res, next) => {
  try {
    const [data] = await services.getBeadOrderById(req.params.order_id);
    if (!data) {
      return successResponse(res, `No bead order with id ${req.params.order_id} found`, 404);
    }
    const order = await services.updateOrderQty([req.params.order_id, req.body.quantity]);
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}:::Info: order quantity
     updated successfully in the DB updateOrderQty.controller.index.js`);
    return successResponse(res, 'Bead order updated successfully in the db.', 200, order);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
