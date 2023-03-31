// dataRouter.js

const express = require('express');
const data = require('../controller/controller')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({alert: 'masuk'});
  });
router.get('/users', data.findAll);
router.post('/signup', data.signup);
router.get('/wilayah', data.wilayah);
router.post('/forgotPassword', data.forgotPassword)
router.get('/passwordReset', data.passwordReset)
router.post('/setPassword', data.setPassword)
router.get('/darah', data.getGolonganDarah)
router.get('/count/gDarah', data.countGDarah)

module.exports = router;
