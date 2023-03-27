const express = require("express");
const profile = require('../controller/ProfileControl')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  const upload = multer({storage});

router.patch('/update',upload.single('image'), profile.updateData);
router.get('/updatetoken', profile.updatetoken);
router.post('/profilerefresh', profile.profilerefresh);

module.exports = router