const express = require("express");
const klinik = require('../controller/KlinikControl')
const router = express.Router()

router.post('/klinik', klinik.klinik);
router.get('/poliklinik/:namaKlinik', klinik.getPoliklinik);
router.post('/ambil', klinik.antrianDokter);
router.post('/dokter', klinik.getDokter)
router.get('/keahlian', klinik.getKeahlian)

module.exports = router