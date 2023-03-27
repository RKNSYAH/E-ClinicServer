const {
  klinik,
  poliklinik,
  klinik_poliklinik,
  dokter,
  keahlian,
  klinik_dokter,
} = require('../models/dokterdata');
const sequelize = require('../models/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {body, validationResult} = require('express-validator');

exports.klinik = (req, res) => {
  //dapatkan data klinik setelah klien memilih klinik
  klinik.findOne({where : {nama_klinik: req.body.klinik}}).then(data_klinik => {
    if (!data_klinik) {
      return res.status(404).json({
        message: 'Klinik tidak ditemukan',
      });
    }
    return res.status(200).json({
      alamat: data_klinik.alamat,
      namaKlinik: data_klinik.nama_klinik,
      no_kontak: data_klinik.no_kontak,
      email: data_klinik.email,
      no_wa: data_klinik.no_wa,
      kode_pos: data_klinik.kode_pos,
      instagram: data_klinik.instagram,
      twitter: data_klinik.twitter,
      facebook: data_klinik.facebook,
    });
  });
};

exports.getKeahlian = (req, res) => {
  keahlian
    .findAll() 
    .then(result => {
      if (result) {;
        return res.json(result);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

//kode kode setelah ini mengambil data spesifik tergantung klinik yang dipilih
exports.getPoliklinik = (req, res) => {

  const klinikNama = req.params.namaKlinik

  klinik
    .findOne({
      where: {nama_klinik: klinikNama}, 
      include: [
        {
          model: klinik_poliklinik,
          attributes: ['klinik_id'],
          include: [
            {
              model: poliklinik,
              attributes: ['poliklinik_id', 'nama'],
            },
          ],
        },
      ],
      attributes: ['nama_klinik'],
    })
    .then(result => {
      if (result) {
        const klinikpoli = result.klinik_polikliniks;
        return res.status(200).json(klinikpoli);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

exports.getDokter = (req, res) => {
  klinik
    .findAll({
      where: {nama_klinik: req.body.klinik},
      raw: true,
      nest: true,
      include: {
        required: true,
        duplicating: false,
        model: klinik_dokter,
        attributes: ['klinik_id'],
        include: {
          model: dokter,
          attributes: ['nama_dokter'],
          raw: true,
          nest: true,
          include: {
            model: keahlian,
            attributes: ['nama_keahlian'],
          },
        },
      },

      attributes: ['nama_klinik'],
    })
    .then(result => {
      if (result) {
        const aray = result.map(item => item.dokter_kliniks.dokter);
        return res.status(200).json(aray);
      }
    })
    .catch(error => {
      console.error(error);
    });
};


exports.antrianDokter = (req, res) => {
  klinik
    .findAll({
      where: {
        nama_klinik: req.body.namaKlinik,
        $nama_keahlian$: {[Op.eq]: req.body.keahlian},
      },
      raw: true,
      nest: true,
      include: {
        required: true,
        duplicating: false,
        model: klinik_dokter,
        attributes: ['klinik_id'],
        include: {
          model: dokter,
          attributes: ['nama_dokter', 'dokter_id'],
          raw: true,
          nest: true,
          include: {
            model: keahlian,
            attributes: ['nama_keahlian'],
          },
        },
      },

      attributes: ['nama_klinik'],
    })
    .then(result => {
      if (result) {
        const aray = result.map(item => item.dokter_kliniks.dokter);
        return res.status(200).json(aray);
      }
    })
    .catch(error => {
      console.error(error);
    });
};
