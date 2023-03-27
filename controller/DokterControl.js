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
const {diagnosa, obat_pasien} = require('../models/diagnosaData');
const { userConnections } = require('../userConnection');
const { antri } = require('./DaftarControl');
const { EventEmitter } = require('events');

const diagnosisEmitter = new EventEmitter();

exports.antriPasien = (req, res) => {
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
            attributes: ["nama_dokter", 'dokter_id'],
            where: { nama_dokter: req.body.dokter },
          },
        },
      ],
    })
    .then((data) => {
      const filterData = data.map((item) => {
        let dokter = null;
        let dokterID = null
        if (item.pendaftaran !== null) {
          dokter = item.pendaftaran.dokter.nama_dokter;
          dokterID = item.pendaftaran.dokter.dokter_id
        }
        return {
          Antrian_id: item.antrian_id,
          dokter_id: dokterID,
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

exports.diagnosa = async (req, res) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     return res.status(401).json({ alert: "Authentication Gagal" });
//   }
//   const token = authHeader.split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, secret_key);

//   } catch (err) {
//     return res
//       .status(500)
//       .json({ alert: "Error token expired. Silahkan login kembali" });
//   }
//   if (!decodedToken) {
//     return res.status(401).json({ alert: "Unauthorized" });
//   }
  const antrianId = req.body.antrian_id

//   const found = await user_controls.findOne({
//     where: { jwt_token: token },
//   });
//   if(!found) return res.status(404).json({alert: 'Tolong login lagi'})
  const sedangAntri = await antrian.findOne({where: {antrian_id: antrianId}})
  const data = req.body.pilihObat;
  if (!sedangAntri) return res.status(404).json({alert: 'Pasien sudah di diagnosa'})
  // const data = JSON.parse(datas)
  diagnosa.create({
    dokter_id: req.body.dokter_id,
    pasien_id: req.body.pasien_id,
    catatan: req.body.catatan,
    tanggal_diagnosis: Sequelize.Sequelize.fn('now')
  }).then(newDiagnosis => {
    if(!newDiagnosis) return res.status(500).json({alert: 'Gagal membuat diagnosa pasien'})

    for (let i = 0; i < data?.length; i++) {
      data[i].obat_nama = data[i].nama
      data[i].diagnosa_id = newDiagnosis.diagnosa_id
      delete data[i].nama
    }

    obat_pasien.bulkCreate(data).then(async newObat => {


      const ws = userConnections[antrianId];
      
      const message = JSON.stringify({
        data: newDiagnosis.diagnosa_id,
        type: 'Diagnosa' 
      })
      if(ws){
        ws.send(message)
      }
      antrian.destroy({where: {antrian_id : antrianId}}).then(() => {

        diagnosisEmitter.emit('newDiagnosis');

        res.status(200).json({alert: 'Diagnosa terkirim'})
      })

    }).catch(err => {
      console.log(err);
    })

  })

}

exports.sseDiagnosis = async (req, res) => {
  const namaKlinik = req.params.namaKlinik
  const hari = req.params.hari
  const dokterid = req.params.dokterid

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.flushHeaders();

  res.write(`data: ${await getLastDiagnosis(namaKlinik, hari, dokterid)}\n\n`); 

  const handleNewDiagnosis = async () => {
    res.write(`data: ${await getLastDiagnosis(namaKlinik, hari, dokterid)}\n\n`);
  };
  diagnosisEmitter.on('newDiagnosis', handleNewDiagnosis);

  // Remove event listener when client closes connection
  req.on('close', () => {
    diagnosisEmitter.off('newDiagnosis', handleNewDiagnosis);
    res.end()
  });
};

async function getLastDiagnosis(namaKlinik, hari, dokterid) {
 const datas = await antrian.findAll({
    order: [['waktu_antrian', 'ASC']],
    include: [
      {
        model: klinik,
        attributes: ["nama_klinik"],
        where: { nama_klinik: namaKlinik },
      },
      {
        model: data,
        attributes: ["namalengkap"],
      },
      {
        model: pendaftaran,
        where: {confirmed: true, tanggal_perjanjian: hari},
        include: {
          model: dokter,
          attributes: ["nama_dokter"],
          where: { dokter_id: dokterid},
        },
      },
    ],
  })
  let filterData = await datas.map((item) => {
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
  return JSON.stringify(filterData)
}
