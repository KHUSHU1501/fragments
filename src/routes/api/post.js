// src/routes/api/post.js

const response = require('../../response');
const { Fragment } = require('../../model/fragment');
require('dotenv').config();
const logger = require('../../logger');

const url = process.env.API_URL;

module.exports = async (req, res) => {
  logger.debug(`post called'`);
  try {
    if (!Buffer.isBuffer(req.body)) {
      return res.status(415).json(
        response.createErrorResponse({
          status: 'error',
          error: {
            message: 'Body requires correct data that is supported.',
            code: 415,
          },
        })
      );
    }
    logger.debug(`post got body'`);

    const fragment = new Fragment({
      ownerId: req.user,
      type: req.get('Content-Type'),
    });

    logger.debug(`post got fragment'`);

    await fragment.save();
    await fragment.setData(req.body);

    logger.debug(`post saved fragment'`);

    res.setHeader('Location', url + '/v1/fragments/' + fragment.id);

    return res.status(201).json(
      response.createSuccessResponse({
        status: 'ok',
        fragment: fragment,
      })
    );
  } catch (err) {
    return res.status(500).json(response.createErrorResponse(500, 'Internal Server Error in POST'));
  }
};
