// src/routes/api/getById.js
const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    const fragmentData = await fragment.getData();
    res.set('Content-Type', fragment.type);
    res.status(200).send(fragmentData);
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error));
  }
};
