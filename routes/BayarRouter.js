const pembayaran = require('../controller/BayarControl')
const express = require("express")

const router = express.Router()

router.post('/findBayar', pembayaran.findBayar)
router.post('/confirmBayar', pembayaran.confirmBayar)