const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto')
const secret_key = process.env.JWT_SECRET
const { body, validationResult } = require('express-validator');
const {data, user_controls} = require('../models/datas');
const { pendaftaran } = require('../models/pendaftaranData');
const WebSocket = require('ws')

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
        pendaftaran.create({
            pasien_id : req.body.pasien_id,
            dokter_id : req.body.dokter_id,
            nomor_pendaftaran : Math.floor(Math.random() * 10000)  //nomor pendaftaran merupakan angka acak maks 4 digit
        }).then(data => {
            return res.status(200).json({alert: 'Daftar Berhasil'})
        })
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
  const wss = new WebSocket.Server({port : 5000})
  const clients = new Set()

  wss.on('connection', (ws) => {
    clients.add(ws)
    ws.on('message', (message => {
      const data = JSON.parse(message)
      if (data.type === 'subscribe' && data.channel === 'confirmation') {
        
      }
    }))
  })
}