const express = require('express');
const router = express.Router();
const programs = require('./programs');
const users = require('./users');


let apiVersion = '/v1/';
router.get(apiVersion + 'programs', programs.programs.getPrograms);
router.get(apiVersion + 'users', users.users.getUsers);

module.exports = router;
