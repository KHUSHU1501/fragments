// src/routes/api/index.js

/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

// get all fragments
router.get('/fragments', require('./get'));

// get a single fragment
router.get('/fragments/:id', require('./get'));

// post a new fragment
router.post('/fragments', require('./post'));

// Export the router so we can mount it in src/app.js
module.exports = router;
