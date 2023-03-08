const Sequelize = require('sequelize');
const sequelize = require('./connection.js');
const moment = require('moment');


const pendaftaran = sequelize.define(
  'pendaftaran',
  {
    pendaftaran_id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    pasien_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: {tableName: 'userdata', schema: 'public'},
        key: 'pasien_id',
      },
    },
    dokter_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: {tableName: 'dokter', schema: 'public'},
        key: 'dokter_id',
      },
    },
    klinik_id : {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model : {tableName: 'klinik', schema: 'public'},
        key: 'klinik_id'
      }
    },
    tanggal_pendaftaran: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      get() {
        return moment(this.getDataValue('tanggal_pendaftaran')).locale('id').format('dddd, DD MMMM YYYY h:mm:ss');
    }
    },
    tanggal_perjanjian: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      get() {
        return moment(this.getDataValue('tanggal_perjanjian')).locale('id').format('dddd, DD MMMM YYYY h:mm:ss');
    }
    },
    nomor_pendaftaran: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
  },
  {
    tableName: 'pendaftaran',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'pendaftaran_pkey',
        unique: true,
        fields: [{name: 'pendaftaran_id'}],
      },
    ],
  },
);

const antrian = sequelize.define(
  'antrian',
  {
    antrian_id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    pendaftaran_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: {tableName: 'pendaftaran', schema: 'public'},
        key: 'pendaftaran_id',
      },
    },
    pasien_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: {tableName: 'userdata', schema: 'public'},
        key: 'pasien_id',
      },
    },
    klinik_id : {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model : {tableName: 'klinik', schema: 'public'},
        key: 'klinik_id'
      }
    },
    waktu_antrian: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
    },
  },
  {
    tableName: 'antrian',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'antrian_pkey',
        unique: true,
        fields: [{name: 'antrian_id'}],
      },
    ],
  },
);

module.exports = {
  pendaftaran,
  antrian,
};
