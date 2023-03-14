const {user_controls} = require('../models/datas');
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
const { pendaftaran, antrian, klinik, data } = require('../models');
const { dokter } = require('../models/dokterdata');

exports.pasien = (req, res) => {
  antrian
    .findAll({
      order: [["waktu_antrian", "ASC"]],
      include: [
        {
          model: klinik,
          attributes: ["nama_klinik"],
          where: { nama_klinik: req.body.klinik },
        },
        {
          model: data,
          attributes: ["namalengkap", 'pasien_id'],
        },
        {
          model: pendaftaran,
          where: { confirmed: true, tanggal_perjanjian: req.body.hari },
          include: {
            model: dokter,
            attributes: ["nama_dokter"],
            where: { nama_dokter: req.body.dokter },
          },
        },
      ],
    })
    .then((data) => {
      const filterData = data.map((item) => {
        let dokter = null;
        if (item.pendaftaran !== null) {
          dokter = item.pendaftaran.dokter.nama_dokter;
        }
        return {
          Antrian_id: item.antrian_id,
          Pendaftaran_id: item.pendaftaran_id,
          namaPasien: item.userdatum.namalengkap,
          pasien_id: item.userdatum.pasien_id,
          dokter: dokter,
        };
      });
      console.log(filterData);
      res.status(200).json(filterData);
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.diagnosa = (req, res) => {
  const data = req.body.pilihObat;

  for (let i = 0; i < data.length; i++) {
    data[i].nama_obat = data[i].nama
    delete data[i].harga
    delete data[i].nama
  }
  
  res.send(data);
}
