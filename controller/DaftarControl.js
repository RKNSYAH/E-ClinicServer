const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const { body, validationResult } = require('express-validator');
const { user_controls} = require('../models/datas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const WebSocket = require('ws');
const main = require('../app');
const { pendaftaran, antrian, klinik, data } = require('../models');
const { dokter } = require('../models/dokterdata');


exports.daftar = (req, res) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        return res.status(401).json({alert: 'Authentication Gagal'});
      }
      const token = authHeader.split(' ')[1]
      user_controls.findOne({where: {jwt_token: token}}).then(data => {
        if (!data) {
          return res.status(404).json({alert: 'Akun Terhubung Pada Perangkat Lain'});
        }
        let decodedToken
        try {
          decodedToken = jwt.verify(token, secret_key)
        } catch (err) {
          return res.status(500).json({alert: 'Daftar Error Coba Lagi Nanti'});
        }
        klinik.findOne({where: {nama_klinik: req.body.klinik}}).then((klinik) => {
          pendaftaran.create({
              pasien_id : req.body.pasien_id,
              dokter_id : req.body.dokter_id,
              klinik_id : klinik.klinik_id,
              tanggal_perjanjian : req.body.hari,
              nomor_pendaftaran : Math.floor(Math.random() * 100000)  //nomor pendaftaran merupakan angka acak maks 5 digit
        })
        }).then(data => {
            return res.status(200).json({alert: 'Daftar Berhasil'})
        }).catch(err => console.log(err))
      })
}

exports.nomorPendaftaran = (req, res) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        return res.status(401).json({alert: 'Authentication Gagal'});
      }
      const token = authHeader.split(' ')[1]
      user_controls.findOne({where: {jwt_token: token}}).then(data => {
        if (!data) {
          return res.status(404).json({alert: 'Akun Terhubung Pada Perangkat Lain'});
        }
        let decodedToken
        try {
          decodedToken = jwt.verify(token, secret_key)
        } catch (err) {
          return res.status(500).json({alert: 'Daftar Error Coba Lagi Nanti'});
        }
        pendaftaran.findOne({where: {
            pasien_id : req.body.pasien_id
        },
        order: [ [ 'tanggal_pendaftaran', 'DESC' ]],
    }
    ).then(data => { //ambil no pendaftaran yang baru dibuat oleh klien
            return res.status(200).json({noDaftar: data.nomor_pendaftaran, tanggal_pendaftaran: data.tanggal_pendaftaran})
        })
      })
}

exports.antrian = (req, res) => {
  console.log(req.body.hari);
  antrian
    .findAll({
      order: [['waktu_antrian', 'ASC']],
      include: [
        {
          model: klinik,
          attributes: ["nama_klinik"],
          where: { nama_klinik: req.body.klinik },
        },
        {
          model: data,
          attributes: ["namalengkap"],
        },
        {
          model: pendaftaran,
          where: {confirmed: true, tanggal_perjanjian: req.body.hari},
          include: {
            model: dokter,
            attributes: ["nama_dokter"],
            where: { dokter_id: req.body.dokter},
          },
        },
      ],
    })
    .then((data) => {
      let filterData = data.map((item) => {
        let dokter = null
        if(item.pendaftaran !== null){
          dokter = item.pendaftaran.dokter.nama_dokter
        }
        return {
          Antrian_id: item.antrian_id,
          Pendaftaran_id: item.pendaftaran_id,
          namaKlinik: item.klinik.nama_klinik,
          namaPasien: item.userdatum.namalengkap,
          dokter: dokter
        };
      });
      res.status(200).json(filterData);
    })
    .catch((err) => {
      console.log(err);
    });
};