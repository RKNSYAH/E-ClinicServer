
const express = require("express");
const dokter = require("../controller/DokterControl");
const router = express.Router()


router.post('/pasien', dokter.antriPasien)
router.post('/diagnosa', dokter.diagnosa)
router.get('/events/:namaKlinik/:hari/:dokterid', dokter.sseDiagnosis)

module.exports = router
