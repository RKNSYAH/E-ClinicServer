const {user_controls} = require('../models/datas');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.JWT_SECRET
const {wilayah, golongan_darah, dokter} = require('../models/dokterdata');
const { body, validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const { pendaftaran, antrian, klinik, data } = require('../models');
const {diagnosa, obat_pasien} = require('../models/diagnosaData')

exports.hasilDiagnosa = async (req, res) => {

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ alert: "Authentication Gagal" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret_key);
  } catch (err) {
    return res
      .status(500)
      .json({ alert: "Error token expired. Silahkan login kembali" });
  }
  if (!decodedToken) {
    return res.status(401).json({ alert: "Unauthorized" });
  }

  const found = await user_controls.findOne({
    where: { jwt_token: token },
  });
  if(!found) return
  const diagnosaId = req.params.diagnosaId

    diagnosa
      .findAll({
        where: { diagnosa_id: diagnosaId },
        duplicating: false,
        include: [
          {
            model: obat_pasien,
            attributes: ["obat_nama", "jumlah", 'harga'],
            duplicating: false
          },  
          {
            model: data,
            attributes: ["namalengkap"],
          },
          {
            model: dokter,
            attributes: ['nama_dokter']
          }
        ],
      })
      .then((data) => {
        
        const mergedData = data.reduce((acc, cur) => {
          const existing = acc.find((item) => item.diagnosa_id === cur.diagnosa_id);

          if (existing) {
            existing.obat_pasien.push(cur.obat_pasien);
          } else {
            acc.push({
              ...cur.dataValues,
              obat_pasien: [cur.obat_pasien],
            });
          }
          return acc;
        }, []);
        diagnosa.update({
          dilihat: true
        }, {
          where: {
            diagnosa_id: diagnosaId,
        }}).then(() => {
          res.status(200).send(mergedData)
        })
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.findAllDiagnosa = async (req, res) => {
  const id = req.params.userid;

  const datas = await diagnosa.findAll({where: {pasien_id: id}, order: [['tanggal_diagnosis', 'DESC']]})

  res.status(200).json(datas)
}

exports.findDiagnosa = async (req, res) => {
  
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ alert: "Authentication Gagal" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret_key);
  } catch (err) {
    return res
      .status(500)
      .json({ alert: "Error token expired. Silahkan login kembali" });
  }
  if (!decodedToken) {
    return res.status(401).json({ alert: "Unauthorized" });
  }

  const found = await user_controls.findOne({
    where: { jwt_token: token },
  });
  if(!found) return

  const pasienId = req.params.pasienId
  const hari = req.params.hari

    diagnosa
      .findAll({
        duplicating: false,
        where: {dilihat: false, tanggal_diagnosis: hari},
        include: [
          {
            model: obat_pasien,
            attributes: ["obat_nama", "jumlah", 'harga'],
            duplicating: false
          },  
          {
            model: data,
            attributes: ["namalengkap"],
            where: {pasien_id: pasienId}
          },
          {
            model: dokter,
            attributes: ['nama_dokter']
          }
        ],
      })
      .then((data_diagnosa) => {
        console.log(data_diagnosa);
        if (data_diagnosa[0] !== undefined)
          return res
            .status(200)
            .json({
              found: true,
              namaDok: data_diagnosa[0].dokter.nama_dokter,
              id: data_diagnosa[0].diagnosa_id,
            });
        else return res.status(404).json({ found: false });
      })
      .catch((err) => {
        console.log(err);
      });
}