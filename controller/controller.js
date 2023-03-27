const {data, user_controls} = require('../models/datas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const {wilayah, golongan_darah} = require('../models/dokterdata');
const { body, validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');
const Sequelize = require('sequelize');
const useragent = require('express-useragent');
const NodeCache = require('node-cache')
const cache = new NodeCache()

exports.findAll = (req, res) => {
  data
    .count("pasien_id")
    .then(async (id) => {
      const datas = await data.findAll({
        attributes: ['pekerjaan', [Sequelize.fn('count', Sequelize.col('pekerjaan')), 'count']],
        group: ['pekerjaan'],
        raw: true,
        order: [[Sequelize.literal('count DESC')]]
      });
      res.json({ id: id, data: datas });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
exports.wilayah = (req, res) => {
  // search dari data yang ditampilkan menggunakan parameter query pada url
  // localhost/wilayah?query=bandung
  const query = req.query.query;

  const cachedData = cache.get(query);
  if (cachedData) {
    return res.json(cachedData);
  }


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
      cache.set(query, filterData);

      return res.json(filterData);
    }

    // Cache the response for future requests
    cache.set(query, result);

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
  body("email").isEmail().withMessage("Email Tidak Valid"),
  body("sPassword")
    .isLength({ min: 8})
    .withMessage("Password Minimal 7 Karakter"),
  body("sNamaLengkap").trim().escape(true),
  body("sNik")
    .isLength({min:16, max: 16 })
    .isNumeric()
    .escape(true)
    .withMessage("NIK Tidak Valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ alert: errors.array().map((items) => items.msg)[0] });
    }

    data
      .findOne({ where: { email: req.body.email } })
      .then(async (user) => {
        if (user) {
          return await res.status(409).json({ alert: "Email sudah dipakai" });
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
                .json({ alert: "Gagal membuat akun coba lagi" });
            } else if (passwordHash) {
              return data
                .create({
                  email: req.body.email,
                  password: passwordHash,
                  nik: req.body.sNik,
                  namalengkap: req.body.sNamaLengkap,
                  no_telp: req.body.noTelp || null
                })
                .then((user) => {
                      user_controls.create({
                        id_user: user.pasien_id,
                        level: 1,
                      });
                  res.status(200).json({ alert: "Berhasil membuat akun" });
                })
                .catch((err) => {
                  console.log(err);
                  res
                    .status(502)
                    .json({ alert: "Gagal membuat akun coba lagi" });
                });
            }
          });
        } else if (
          !req.body.email ||
          !req.body.sPassword ||
          !req.body.sNik ||
          !req.body.sNamaLengkap
        ) {
          return res.status(400).json({ alert: "Tolong lengkapi data anda" });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  },
];

exports.forgotPassword = [
  body("email").isEmail().withMessage("Email Tidak Valid"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ alert: errors.array().map((items) => items.msg)[0] });
    }
    data.findOne({where : Sequelize.where(Sequelize.Sequelize.fn('lower', Sequelize.col('email')), Sequelize.Sequelize.fn('lower', req.body.email))}).then(async (data) => {
      if (!data) {return res.status(404).json({ alert: 'Akun tidak ditemukan'})}
      const token = jwt.sign({id: data.pasien_id}, secret_key, {
        expiresIn: '30m',
      })
      const link = `10.10.10.91:5000/passwordReset?token=${token}`
      sendEmail(data.email,"Password Reset Request",{name: data.namalengkap,link: link,},"../utils/template/forgotPassword.handlebars");
      res.status(200).json({ alert: 'Email terkirim'});
      return link
    })
  },
];

exports.passwordReset = (req, res) => {
  const token = req.query.token
  const agent = req.useragent
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret_key);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({alert: 'Tautan sudah kadaluarsa. Silakan buat permintaan reset kata sandi baru.'});
  }
  if (!decodedToken) {
    return res.status(401).json({alert: 'Unauthorized'});
  }
  if(agent.platform === 'Android'){
    return res.redirect(`eclinic://resetPassword/${decodedToken.id}`)
  }
}

exports.setPassword = [
  body('password').isLength({min: 8}).withMessage('Password Minimal 8 Karakter'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({alert: errors.array().map(items => items.msg)[0]});
    }
    const passwordHash = await bcrypt.hash(req.body.password, 12)
    if(passwordHash){
      return data.update(
        {
          password: passwordHash
        },
        {
          where: {pasien_id : req.body.id}
        }
      ).then((data) => {
        if (data){
          res.status(200).json({alert: 'Berhasil update pasword'})
        }
      }).catch(err => {
        console.log(err);
      })
    }

  }
]