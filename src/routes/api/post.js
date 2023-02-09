// src/routes/api/post.js

const response = require('../../response');

/**
 * Create a new fragment for the current user
 */
module.exports = (req, res) => {
  res.status(200).json(
    response.createSuccessResponse({
      fragment: req.body,
    })
  );
};
