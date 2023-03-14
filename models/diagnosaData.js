const Sequelize = require('sequelize');
const sequelize = require('./connection.js');


const diagnosa = sequelize.define(
    'diagnosa', {
        diagnosa_id: {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        dokter_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'dokter', schema: 'public' },
            key: 'dokter_id'
          }
        },
        pasien_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'userdata', schema: 'public' },
            key: 'pasien_id'
          }
        },
        penyakit: {

        },
        catatan: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        tanggal_diagnosis: {
          type: Sequelize.DATEONLY
        },
      }, {
        tableName: 'diagnosa',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "diagnosa_pkey",
            unique: true,
            fields: [
              { name: "diagnosa_id" },
            ]
          },
        ]
      }
  
);

const obat_pasien = sequelize.define(
  "obat_pasien",
  {
    diagnosa_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: { tableName: "diagnosa", schema: "public" },
        key: "diagnosa_id",
      },
    },
    obat_nama: {
      type: Sequelize.STRING,
    },
    jumlah: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "obat_pasien",
    schema: "public",
    timestamps: false,
  }
);

const pembayaran = sequelize.define(
    'pembayaran', {
        pembayaran_id: {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        pendaftaran_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'pendaftaran', schema: 'public' },
            key: 'pendaftaran_id'
          }
        },
        diagnosa_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'diagnosa', schema: 'public' },
            key: 'diagnosa_id'
          }
        },
        jumlah_rp: {
          type: Sequelize.DECIMAL(16, 15),
          allowNull: true
        },
      }, {
        tableName: 'pembayaran',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "pembayaran_pkey",
            unique: true,
            fields: [
              { name: "pembayaran_id" },
            ]
          },
        ]
      }
  );

const riwayat = sequelize.define(
  "riwayat",
  {
    riwayat_id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    pasien_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: { tableName: "userdata", schema: "public" },
        key: "pasien_id",
      },
    },
    diagnosa_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: { tableName: "diagnosa", schema: "public" },
        key: "diagnosa_id",
      },
    },
    jumlah_rp: {
      type: Sequelize.DECIMAL(16, 15),
      allowNull: true,
    },
  },
  {
    tableName: "riwayat",
    schema: "public",
    timestamps: false,
  }
);

module.exports = {diagnosa, obat_pasien, pembayaran, riwayat}