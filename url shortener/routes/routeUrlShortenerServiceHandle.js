const express = require('express');
const router = express.Router();
const urlShortIdGenerateService = require('../services/url/serviceUrlShortIdGenerate');
const { urlAnalyticsService } = require('../services/url/serviceUrlAnalytics');
const { urlDeleteService } = require('../services/url/serviceUrlDelete');

//url shortid generate
router.post('/generate', urlShortIdGenerateService);

//url analytics
router.get('/analytics', urlAnalyticsService);

//url delete
router.post('/delete', urlDeleteService);

module.exports = router;