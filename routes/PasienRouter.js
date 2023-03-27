const express = require("express");
const router = express.Router()
const pasien = require('../controller/PasienControl')

router.get('/diagnosa/:diagnosaId', pasien.hasilDiagnosa)
router.get('/hasil/:pasienId/:hari/:lihat', pasien.findDiagnosa)
router.get('/allDiagnosa/:userid', pasien.findAllDiagnosa)
module.exports = router