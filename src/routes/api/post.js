// src/routes/api/post.js

const response = require('../../response');
const { Fragment } = require('../../model/fragment');
require('dotenv').config();
const logger = require('../../logger');

const url = process.env.API_URL;

module.exports = async (req, res) => {
  logger.debug(`post called'`);
  try {
    const fragment = new Fragment({
      ownerId: req.user,
      type: req.get('content-type'),
    });

    logger.debug(`post got fragment'`);

    await fragment.save();
    await fragment.setData(req.body);

    logger.debug(`post saved fragment'`);

    res.setHeader('Content-type', fragment.type);
    res.setHeader('Location', url + '/v1/fragments/' + fragment.id);

    res.status(201).json(
      response.createSuccessResponse({
        status: 'ok',
        fragment: [fragment],
      })
    );
  } catch (err) {
    res.status(415).json(response.createErrorResponse(415, err));
  }
};
