const { data, user_controls } = require("../models/datas");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const secret_key = process.env.JWT_SECRET;
const { wilayah } = require("../models/dokterdata");
const { body, validationResult } = require("express-validator");
const datauri = require('datauri');
const { link } = require("fs");
const cloudinary = require('cloudinary').v2;
const moment = require('moment');

exports.updatetoken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ alert: "Authentication Gagal" });
  }
  const gettoken = authHeader.split(" ")[1];
  user_controls.findOne({ where: { jwt_token: gettoken } }).then((data) => {
    //mengecek dengan token user yang didapat setelah login
    if (data) {
      //user_controls.findOne({where: {jwt_token: gettoken}}) setiap kode seperti ini berfungsi sama
      let decodedToken;
      try {
        decodedToken = jwt.verify(gettoken, secret_key);
      } catch (err) {
        return res
          .status(500)
          .json({ alert: "Error token expired. Silahkan login kembali" });
      }
      if (!decodedToken) {
        res.status(401).json({ alert: "Unauthorized" });
      } else {
        const token = jwt.sign({ nik: req.body.nik }, secret_key, {
          //generate token untuk meng update data yang berlaku 30 menit
          expiresIn: "30m", //(batas waktu edit profile 30menit)
        });
        if (token) {
          res.status(200).json({ token: token });
        } else {
          return res
            .status(500)
            .json({ alert: "Server error coba lagi nanti" });
        }
      }
    } else {
      res.status(404).json({ alert: "Akun terhubung pada perangkat lain" });
    }
  });
};

exports.updateData = [
  body("rw").isLength({ max: 3 }).withMessage("RT/RW Tidak Valid").isNumeric(),
  body("rt").isLength({ max: 3 }).withMessage("RT/RW Tidak Valid").isNumeric(),
  body("alamat").escape(true),
  body("kodepos").isNumeric().isLength({ max: 5 }).escape(true),
  body("tempatLahir").escape(true),
  body("namalengkap").escape(true),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res
        .status(400)
        .json({ alert: errors.array().map((items) => items.msg)[0] });
    }
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    });
    console.log(req.body);

    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ alert: "Authentication Gagal" });
    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret_key);
    } catch (err) {
      return res.status(500).json({ alert: "Error token expired." });
    }
    if (!decodedToken) {
      return res.status(401).json({ alert: "Unauthorized" });
    }
    if (
      !req.body.email ||
      !req.body.namalengkap ||
      !req.body.tanggalLahir ||
      !req.body.pekerjaan ||
      !req.body.rw ||
      !req.body.rt ||
      !req.body.alamat ||
      !req.body.jeniskelamin ||
      !req.body.kodewilayah ||
      !req.body.kodepos ||
      !req.body.tempatLahir
    ) {
      return res.status(400).json({ alert: "Tolong lengkapi data anda" });
    }
    const result = req.file
      ? (await cloudinary.uploader.upload(req.file.path)).secure_url
      : null;
    // Send the image URL back to the client
    const payload = {
      namalengkap: req.body.namalengkap,
      email: req.body.email,
      tanggallahir: moment(new Date(req.body.tanggalLahir)).toISOString(),
      tempatlahir: req.body.tempatLahir,
      pekerjaan: req.body.pekerjaan,
      golongandarah: req.body.golongandarah,
      rt: req.body.rt,
      rw: req.body.rw,
      alamat: req.body.alamat,
      jeniskelamin: req.body.jeniskelamin,
      kodepos: req.body.kodepos,
      kodewilayah: req.body.kodewilayah,
    }
    if (result) {
      payload.profile = result;
    }
    
    data
      .update(
        payload,
        {
          where: {
            pasien_id: req.body.id,
          },
          returning: true,
        },

      ).then((updates) => {
        return res.status(200).json({alert: 'berhasil'})
      })
      .catch((err) => {
        console.log(err);
      });
    },
];

exports.profilerefresh = (req, res, next) => {
  //refresh data yang tersimpan pada client dengan data terbaru
  console.log(req.body);
  data.findOne({ where: { pasien_id: req.body.id } }).then((nik) => {
    if (nik) {
      res.status(200).json({
        id: nik.pasien_id,
        namalengkap: nik.namalengkap,
        nik: nik.nik,
        email: nik.email,
        tanggalLahir: nik.tanggallahir,
        golongandarah: nik.golongandarah,
        tempatLahir: nik.tempatlahir,
        alamat: nik.alamat,
        rw: nik.rw,
        rt: nik.rt,
        kodepos: nik.kodepos,
        kodewilayah: nik.kodewilayah,
        pekerjaan: nik.pekerjaan,
        jeniskelamin: nik.jeniskelamin,
        profilePic: nik.profile,

      });
    }
  });
};
