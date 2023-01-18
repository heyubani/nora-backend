/* eslint-disable */
import dayjs from 'dayjs';
import { successResponse, Success, Error } from '../utils/helpers/response.helpers';

/**
 * Joi validation of request parameters
 * @param {function} schema - the Joi schema
 * @param {string} type - the request type
 * @returns {object} - Returns an object (error or response).
 * @memberof ModelMiddleware
 */
const Model = (schema, type) => async (req, res, next) => {
  try {
    const getType = {
      payload: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      file: req.files,
    };

    const options = { language: { key: '{{key}} ' } };
    const data = getType[type];

    const isValid = await schema.validate(data, options);
    if (!isValid.error) {
      logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}, Info: successfully validates request parameters validateData.middlewares.model.js`);
      return next();
    }
    logger.info(`${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}, Info: failed to validate request parameters validateData.middlewares.model.js`);
    const { message } = isValid.error.details[0];
    return Error('error', message.replace(/["]/gi, 422));
  } catch (error) {
    logger.error(`Joi validation for the incoming request failed::: index.middleware.js`, error.message);
    return next(error);
  }
};

export default Model;
