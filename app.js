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
const dokter = require('./controller/DokterControl');
const multer = require('multer')
const WebSocket = require('ws')
var useragent = require('express-useragent');
const { pendaftaran, antrian } = require('./models/pendaftaranData');
const { v4: uuidv4 } = require('uuid');
const wss = new WebSocket.Server({port : 8080})
const userConnections = {};
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({storage});
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
wss.on('connection', (ws, req) => {

  ws.on('message', (message => {
    const data = JSON.parse(message)
    console.log(data);
    if(data.channel === 'confirmation')
    return userConnections[data.data] = ws
  }))
})

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
app.post('/update',upload.single('gambar'), profile.update);
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
app.post('/forgotPassword', data.forgotPassword)
app.get('/passwordReset', data.passwordReset)
app.post('/antrian', daftar.antrian)
app.post('/setPassword', data.setPassword)
app.post('/pasien', dokter.pasien)
app.post('/diagnosa', dokter.diagnosa)
app.post('/antri', (req, res) => {
  pendaftaran
    .findOne({
      where: {
        pendaftaran_id: req.body.pendaftaran_id,
      },
    })
    .then((daftar) => {
      if (!daftar) return;
      const message = JSON.stringify({
        type: "confirmation",
        data: "confirmed",
      });
      const nopendaftaran = req.body.noPendaftaran;

      const ws = userConnections[nopendaftaran];
      if (ws) {
        ws.send(message);    
      }
      pendaftaran.update({confirmed: true},
        {
          where: {pendaftaran_id: req.body.pendaftaran_id}
        })
      antrian.findOne({where: {pendaftaran_id: daftar.pendaftaran_id}}).then((antri) => {
        if(antri){
          return res.status(409).json({alert: 'Sudah Mengantri'})
        }
        antrian.create({
          pendaftaran_id: daftar.pendaftaran_id,
          pasien_id: daftar.pasien_id,
          klinik_id: daftar.klinik_id || null
        }).then(() => {
          res.sendStatus(200)
        })
      })
    });

})


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
