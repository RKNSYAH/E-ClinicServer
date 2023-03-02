const express = require('express');
const sequelize = require('./models/connection');
const app = express();
const data = require('./controller/controller.js');
const bodyParser = require('body-parser');
const dataDokter = require('./models/dokterdata');
const login = require('./controller/LoginControl');
const klinik = require('./controller/KlinikControl');
const profile = require('./controller/ProfileControl');
const daftar = require('./controller/DaftarControl');
const crypto = require('crypto')

var useragent = require('express-useragent');

app.use(express.urlencoded({extended: true}));
app.use(useragent.express());

app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({alert: 'masuk'});
});
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/users', data.findAll);
app.post('/signup', data.signup);
app.post('/login', login.login);
app.post('/auth', login.auth);
app.get('/rememberauth', login.rememberauth);
app.post('/update', profile.update);
app.get('/updatetoken', profile.updatetoken);
app.post('/profilerefresh', profile.profilerefresh);
app.post('/logout', login.logout);
app.get('/wilayah', data.wilayah);
app.post('/klinik', klinik.klinik);
app.get('/poliklinik', klinik.getPoliklinik);
app.post('/ambil', klinik.antrianDokter);
app.post('/dokter', klinik.getDokter)
app.get('/keahlian', klinik.getKeahlian)
app.get('/darah', data.getGolonganDarah)
app.post('/daftar', daftar.daftar)
app.post('/nodaftar', daftar.nomorPendaftaran)
app.post('/antri', daftar.antrian)


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
