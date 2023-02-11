// src/routes/api/getById.js
const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');
/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  try {
    logger.debug(`getById called'`);
    const fragment = await Fragment.byId(req.user, req.params.id);
    logger.debug(`getById got fragment'`);
    const fragmentData = await fragment.getData();

    // Set the content type to the fragment's type
    res.set('Content-Type', fragment.type);
    res.status(200).send(fragmentData);
  } catch (error) {
    logger.warn('invalid fragment id');
    res.status(404).json(createErrorResponse(404, error));
  }
};
