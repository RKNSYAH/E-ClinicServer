const pembayaran = require('../controller/BayarControl')
const express = require("express")

const router = express.Router()

router.get('/findBayar/:diagnosaId', pembayaran.findBayar)
router.post('/confirmBayar', pembayaran.confirmBayar)

module.exports = router