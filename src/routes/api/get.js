// src/routes/api/get.js
// Our response handlers
const response = require('../../response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

module.exports = (req, res) => {
  logger.info(`GET v1/fragments called`);

  Fragment.byUser(req.user, req.query?.expand)
    .then((fragments) => {
      logger.debug(`Fragments found: ${JSON.stringify(fragments)}`);
      res.status(200).json(
        response.createSuccessResponse({
          status: 'ok',
          fragments: fragments,
        })
      );
    })
    .catch((error) => {
      logger.warn(`Failed to get fragments for user ${req.user.email}: ${error}`);
      res.status(400).json(
        response.createErrorResponse({
          message: `Something went wrong trying to get fragments for user ${req.user.email}`,
          code: 400,
        })
      );
    });
};
