const {data, user_controls} = require('../models/datas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const {wilayah, golongan_darah} = require('../models/dokterdata');
const { body, validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  data
    .count('pasen_id')
    .then(id => { 
      res.json({id: id});
    })
    .catch(err => {
      console.log('error', err);
    });
};
exports.wilayah = (req, res) => {
  // search dari data yang ditampilkan menggunakan parameter query pada url
  // localhost/wilayah?query=bandung
  const query = req.query.query;
  wilayah.findAll({order: [['wilayah_id', 'ASC']]}).then(data => {
    let currentKota = null;
    let currentKec = null;
    let currentProv = null;
    const result = [];

    for (const item of data) {  //sortir wilayah menjadi {provinsi, kota, kecamatan, kelurahan, kodewilayah}
      if (item.id_level_wilayah === '1') {
        currentProv = item.nama;
      } else if (item.id_level_wilayah === '2') {
        currentKota = item.nama;
      } else if (item.id_level_wilayah === '3') {
        currentKec = item.nama;
      } else if (item.id_level_wilayah === '4') {
        result.push({
          Provinsi: currentProv,
          KabupatenKota: currentKota,
          Kecamatan: currentKec,
          Kelurahan: item.nama,
          kodeWilayah: item.kode_wilayah,
        });
      }
    }

    if (isNaN(query) && query) {
      let filterData = result.filter(item =>
        item.Kelurahan.toLowerCase().includes(query.toLowerCase()),
      );
      return res.json(filterData);
    }

    return res.json(result);
  });
};

exports.getGolonganDarah = (req, res) => {
  golongan_darah.findAll().then(darah => {
    return res.json(darah);
  })
}

exports.signup = [
  // Validasi data pendaftaran menggunakan express-validator untuk menghindari sql injection
  body('email').isEmail().withMessage('Email Tidak Valid'),
  body('sPassword')
    .isLength({min: 7})
    .withMessage('Password Minimal 7 Karakter'),
  body('sNamaLengkap').escape(true),
  body('sNik')
    .isLength({min: 16,max: 16})
    .isNumeric()
    .withMessage('NIK Tidak Valid')
    .escape(true),  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({alert: errors.array().map(items => items.msg)[0]});
    }

    data
      .findOne({where: {email: req.body.email}})
      .then(async user => {
        if (user) {
          return await res.status(409).json({alert: 'Email sudah dipakai'});
        } else if (
          req.body.sPassword &&
          req.body.email &&
          req.body.sNik &&
          req.body.sNamaLengkap
        ) {
          bcrypt.hash(req.body.sPassword, 12, (err, passwordHash) => {
            if (err) {
              return res
                .status(500)
                .json({alert: 'Gagal membuat akun coba lagi'});
            } else if (passwordHash) {
              return data
                .create({
                  email: req.body.email,
                  password: passwordHash,
                  nik: req.body.sNik,
                  namalengkap: req.body.sNamaLengkap,
                })
                .then(() => {
                  data.findOne({where : {email: req.body.email}}).then(user => {
                    user_controls.create({
                      id_user: user.pasen_id,
                      level: 1
                    })
                  })
                  res.status(200).json({alert: 'Berhasil membuat akun'});
                })
                .catch(err => {
                  console.log(err);
                  res.status(502).json({alert: 'Gagal membuat akun coba lagi'});
                });
            }
          });
        } else if (
          !req.body.email ||
          !req.body.sPassword ||
          !req.body.sNik ||
          !req.body.sNamaLengkap
        ) {
          return res.status(400).json({alert: 'Tolong lengkapi data anda'});
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  },
]; 

