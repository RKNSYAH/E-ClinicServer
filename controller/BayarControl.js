const {user_controls} = require('../models/datas');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.JWT_SECRET
const {wilayah, golongan_darah, dokter} = require('../models/dokterdata');
const { pendaftaran, antrian, klinik, data } = require('../models');
const {diagnosa, obat_pasien, pembayaran} = require('../models/diagnosaData')

exports.confirmBayar = (req, res) => {
    const jumlah = req.body.jumlah
    const diagnosa = req.body.diagnosa
    const idPendaftaran = req.body.idPendaftaran

    pembayaran.create({
        pendaftaran_id: diagnosa,
        diagnosa_id: idPendaftaran,
        jumlah: jumlah,
    }).then((bayar) => {
        return res.status(200).json({alert: 'Bayar terkonfirmasi'})
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({alert: 'Gagal mengkonfirmasi pembayaran'})
    });
}

exports.findBayar = (req, res) => {
    pembayaran.findOne({
        where: {diagnosa_id: req.body.diagnosaId}
    }).then((found) => {
        if (found) return res.status(200).send(true)
    })
}