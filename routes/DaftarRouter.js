const express = require("express")
const daftar = require("../controller/DaftarControl")

const router = express.Router()
router.post('/daftar', daftar.daftar)
router.post('/nodaftar', daftar.nomorPendaftaran)
router.post('/antri', daftar.antri)
router.post('/antrian', daftar.antrian)

module.exports = router