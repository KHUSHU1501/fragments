// src/routes/index.js

const express = require('express');

// version and author from package.json
const { version, author } = require('../../package.json');

// a router that we can use to mount our API
const router = express.Router();
// Our authentication middleware
const { authenticate } = require('../authorization/index');
const response = require('../response');
const { hostname } = require('os');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 */
router.use(`/v1`, authenticate(), require('./api'));

/**
 * health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(
    response.createSuccessResponse({
      author: author,
      githubUrl: 'https://github.com/KHUSHU1501/fragments',
      version,
      // Include the hostname in the response
      hostname: hostname(),
    })
  );
});

module.exports = router;
